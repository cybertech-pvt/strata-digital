import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

const getStatusMessage = (status: string, candidateName: string, position: string) => {
  const messages: Record<string, { subject: string; body: string }> = {
    reviewed: {
      subject: `Your application for ${position} is being reviewed`,
      body: `
        <h1>Hi ${candidateName},</h1>
        <p>Great news! Your application for the <strong>${position}</strong> position is now being reviewed by our hiring team.</p>
        <p>We appreciate your patience and will get back to you soon with further updates.</p>
        <p>Best regards,<br>The Hiring Team</p>
      `,
    },
    accepted: {
      subject: `Congratulations! Your application for ${position} has been accepted`,
      body: `
        <h1>Congratulations ${candidateName}!</h1>
        <p>We are thrilled to inform you that your application for the <strong>${position}</strong> position has been accepted!</p>
        <p>Our team will be in touch shortly to discuss the next steps in the hiring process.</p>
        <p>Welcome aboard!</p>
        <p>Best regards,<br>The Hiring Team</p>
      `,
    },
    rejected: {
      subject: `Update on your application for ${position}`,
      body: `
        <h1>Hi ${candidateName},</h1>
        <p>Thank you for your interest in the <strong>${position}</strong> position and for taking the time to apply.</p>
        <p>After careful consideration, we have decided to move forward with other candidates whose experience more closely matches our current needs.</p>
        <p>We encourage you to apply for future openings that match your skills and experience.</p>
        <p>Best wishes in your job search.</p>
        <p>Best regards,<br>The Hiring Team</p>
      `,
    },
    interview_scheduled: {
      subject: `Interview Scheduled for ${position}`,
      body: `
        <h1>Hi ${candidateName},</h1>
        <p>Your interview for the <strong>${position}</strong> position has been scheduled!</p>
        <p>Please check your candidate dashboard for the interview details including date, time, and location.</p>
        <p>We look forward to meeting you!</p>
        <p>Best regards,<br>The Hiring Team</p>
      `,
    },
  };

  return messages[status] || {
    subject: `Application Status Update: ${position}`,
    body: `
      <h1>Hi ${candidateName},</h1>
      <p>Your application for the <strong>${position}</strong> position has been updated to: <strong>${status}</strong>.</p>
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
    const { application_id, new_status, candidate_email, candidate_name, position }: NotificationRequest = await req.json();

    console.log("Processing notification:", { application_id, new_status, candidate_email, position });

    if (!candidate_email || !new_status || !position) {
      throw new Error("Missing required fields");
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
