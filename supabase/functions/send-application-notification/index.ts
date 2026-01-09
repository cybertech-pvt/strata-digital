import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  application_id: string;
  new_status: string;
  candidate_email: string;
  candidate_name: string;
  position: string;
}

// HTML escape function to prevent XSS in email templates
const escapeHtml = (unsafe: string): string => {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const getStatusMessage = (status: string, candidateName: string, position: string) => {
  // Escape user inputs to prevent XSS
  const safeName = escapeHtml(candidateName);
  const safePosition = escapeHtml(position);
  const messages: Record<string, { subject: string; body: string }> = {
    reviewed: {
      subject: `Your application for ${safePosition} is being reviewed`,
      body: `
        <h1>Hi ${safeName},</h1>
        <p>Great news! Your application for the <strong>${safePosition}</strong> position is now being reviewed by our hiring team.</p>
        <p>We appreciate your patience and will get back to you soon with further updates.</p>
        <p>Best regards,<br>The Hiring Team</p>
      `,
    },
    accepted: {
      subject: `Congratulations! Your application for ${safePosition} has been accepted`,
      body: `
        <h1>Congratulations ${safeName}!</h1>
        <p>We are thrilled to inform you that your application for the <strong>${safePosition}</strong> position has been accepted!</p>
        <p>Our team will be in touch shortly to discuss the next steps in the hiring process.</p>
        <p>Welcome aboard!</p>
        <p>Best regards,<br>The Hiring Team</p>
      `,
    },
    rejected: {
      subject: `Update on your application for ${safePosition}`,
      body: `
        <h1>Hi ${safeName},</h1>
        <p>Thank you for your interest in the <strong>${safePosition}</strong> position and for taking the time to apply.</p>
        <p>After careful consideration, we have decided to move forward with other candidates whose experience more closely matches our current needs.</p>
        <p>We encourage you to apply for future openings that match your skills and experience.</p>
        <p>Best wishes in your job search.</p>
        <p>Best regards,<br>The Hiring Team</p>
      `,
    },
    interview_scheduled: {
      subject: `Interview Scheduled for ${safePosition}`,
      body: `
        <h1>Hi ${safeName},</h1>
        <p>Your interview for the <strong>${safePosition}</strong> position has been scheduled!</p>
        <p>Please check your candidate dashboard for the interview details including date, time, and location.</p>
        <p>We look forward to meeting you!</p>
        <p>Best regards,<br>The Hiring Team</p>
      `,
    },
  };

  return messages[status] || {
    subject: `Application Status Update: ${safePosition}`,
    body: `
      <h1>Hi ${safeName},</h1>
      <p>Your application for the <strong>${safePosition}</strong> position has been updated to: <strong>${escapeHtml(status)}</strong>.</p>
      <p>Please log in to your dashboard for more details.</p>
      <p>Best regards,<br>The Hiring Team</p>
    `,
  };
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request:", req.method);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authentication check - require valid JWT
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      console.error("Missing or invalid Authorization header");
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Missing authorization header' }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify the JWT and get claims
    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      console.error("JWT verification failed:", claimsError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Invalid token' }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const userId = claimsData.claims.sub;
    console.log("Authenticated user:", userId);

    // Check if user has admin role
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (roleError) {
      console.error("Error checking admin role:", roleError);
      return new Response(
        JSON.stringify({ error: 'Error verifying permissions' }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!roleData) {
      console.error("User is not an admin:", userId);
      return new Response(
        JSON.stringify({ error: 'Forbidden - Admin access required' }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Admin access verified for user:", userId);

    const { application_id, new_status, candidate_email, candidate_name, position }: NotificationRequest = await req.json();

    console.log("Processing notification:", { application_id, new_status, candidate_email, position });

    // Input validation
    if (!candidate_email || !new_status || !position) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: candidate_email, new_status, and position are required' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate input lengths and formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(candidate_email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (candidate_name && candidate_name.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Candidate name must be 100 characters or less' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (position.length > 200) {
      return new Response(
        JSON.stringify({ error: 'Position must be 200 characters or less' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { subject, body } = getStatusMessage(new_status, candidate_name || "Candidate", position);

    // Use fetch to call Resend API directly
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Career Updates <onboarding@resend.dev>",
        to: [candidate_email],
        subject,
        html: body,
      }),
    });

    const emailData = await emailResponse.json();
    console.log("Email response:", emailData);

    if (!emailResponse.ok) {
      throw new Error(emailData.message || "Failed to send email");
    }

    return new Response(JSON.stringify({ success: true, emailData }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
