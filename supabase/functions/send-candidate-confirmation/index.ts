import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ConfirmationRequest {
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

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request:", req.method);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { candidate_email, candidate_name, position }: ConfirmationRequest = await req.json();

    console.log("Processing confirmation email:", { candidate_email, position });

    // Input validation
    if (!candidate_email || !position) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: candidate_email and position are required' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(candidate_email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Escape user inputs
    const safeName = escapeHtml(candidate_name || "Candidate");
    const safePosition = escapeHtml(position);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0d9488 0%, #84cc16 100%); padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Application Received!</h1>
        </div>
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="font-size: 16px; margin-bottom: 20px;">Hi ${safeName},</p>
          <p style="font-size: 16px; margin-bottom: 20px;">
            Thank you for applying for the <strong>${safePosition}</strong> position at CYBERVIBE Global Solutions.
          </p>
          <p style="font-size: 16px; margin-bottom: 20px;">
            We have successfully received your application and our hiring team will review it carefully. 
            If your qualifications match our requirements, we will contact you to discuss the next steps.
          </p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <p style="margin: 0; font-size: 14px; color: #6b7280;">
              <strong>What happens next?</strong><br>
              Our team typically reviews applications within 5-7 business days. 
              You'll receive an email update on your application status.
            </p>
          </div>
          <p style="font-size: 16px; margin-bottom: 20px;">
            In the meantime, feel free to explore more about us on our website.
          </p>
          <p style="font-size: 16px; margin-bottom: 5px;">Best regards,</p>
          <p style="font-size: 16px; margin-top: 0;"><strong>The CYBERVIBE Hiring Team</strong></p>
        </div>
        <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} CYBERVIBE Global Solutions. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;

    // Send email via Resend
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "CYBERVIBE Careers <careers@cybervibeglobal.com>",
        to: [candidate_email],
        subject: `Application Received: ${safePosition} - CYBERVIBE Global Solutions`,
        html: emailHtml,
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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error("Error sending confirmation email:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
