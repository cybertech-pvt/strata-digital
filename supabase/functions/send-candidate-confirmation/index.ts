import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const EMPLOYER_EMAIL = "cybervibetech.pvt@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ConfirmationRequest {
  candidate_email: string;
  candidate_name: string;
  position: string;
  phone?: string;
  experience_years?: number;
  current_company?: string;
  linkedin_url?: string;
  cover_letter?: string;
}

const escapeHtml = (unsafe: string): string => {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const buildCandidateEmail = (safeName: string, safePosition: string): string => `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
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
      <p style="font-size: 16px; margin-bottom: 5px;">Best regards,</p>
      <p style="font-size: 16px; margin-top: 0;"><strong>The CYBERVIBE Hiring Team</strong></p>
    </div>
    <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
      <p style="margin: 0;">&copy; ${new Date().getFullYear()} CYBERVIBE Global Solutions. All rights reserved.</p>
    </div>
  </body>
  </html>
`;

const buildEmployerEmail = (data: ConfirmationRequest): string => {
  const safeName = escapeHtml(data.candidate_name || "Not provided");
  const safePosition = escapeHtml(data.position);
  const safeEmail = escapeHtml(data.candidate_email);
  const safePhone = escapeHtml(data.phone || "Not provided");
  const safeCompany = escapeHtml(data.current_company || "Not provided");
  const safeLinkedin = data.linkedin_url ? escapeHtml(data.linkedin_url) : "";
  const safeCoverLetter = escapeHtml(data.cover_letter || "Not provided");
  const experience = data.experience_years !== undefined ? `${data.experience_years} years` : "Not provided";

  return `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #1e3a5f 0%, #0d9488 100%); padding: 30px; border-radius: 12px 12px 0 0;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">📋 New Job Application Received</h1>
    </div>
    <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
      <p style="font-size: 16px; margin-bottom: 20px;">
        A new application has been submitted for the <strong>${safePosition}</strong> position.
      </p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 8px; font-weight: bold; color: #374151; width: 140px;">Name</td>
          <td style="padding: 12px 8px; color: #4b5563;">${safeName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb; background: #f9fafb;">
          <td style="padding: 12px 8px; font-weight: bold; color: #374151;">Email</td>
          <td style="padding: 12px 8px; color: #4b5563;"><a href="mailto:${safeEmail}" style="color: #0d9488;">${safeEmail}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 8px; font-weight: bold; color: #374151;">Phone</td>
          <td style="padding: 12px 8px; color: #4b5563;">${safePhone}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb; background: #f9fafb;">
          <td style="padding: 12px 8px; font-weight: bold; color: #374151;">Experience</td>
          <td style="padding: 12px 8px; color: #4b5563;">${experience}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 8px; font-weight: bold; color: #374151;">Current Company</td>
          <td style="padding: 12px 8px; color: #4b5563;">${safeCompany}</td>
        </tr>
        ${safeLinkedin ? `
        <tr style="border-bottom: 1px solid #e5e7eb; background: #f9fafb;">
          <td style="padding: 12px 8px; font-weight: bold; color: #374151;">LinkedIn</td>
          <td style="padding: 12px 8px;"><a href="${safeLinkedin}" style="color: #0d9488;">${safeLinkedin}</a></td>
        </tr>` : ''}
      </table>

      <div style="margin: 20px 0;">
        <p style="font-weight: bold; color: #374151; margin-bottom: 8px;">Cover Letter:</p>
        <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; color: #4b5563; white-space: pre-wrap;">${safeCoverLetter}</div>
      </div>

      <div style="margin-top: 25px; text-align: center;">
        <p style="font-size: 14px; color: #6b7280;">
          Log in to the admin dashboard to review and manage this application.
        </p>
      </div>
    </div>
    <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
      <p style="margin: 0;">&copy; ${new Date().getFullYear()} CYBERVIBE Global Solutions. All rights reserved.</p>
    </div>
  </body>
  </html>
  `;
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

    const requestData: ConfirmationRequest = await req.json();
    const { candidate_email, candidate_name, position } = requestData;

    console.log("Processing confirmation email:", { candidate_email, position });

    if (!candidate_email || !position) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: candidate_email and position are required' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(candidate_email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const safeName = escapeHtml(candidate_name || "Candidate");
    const safePosition = escapeHtml(position);

    // 1. Send confirmation to candidate
    const candidateEmailHtml = buildCandidateEmail(safeName, safePosition);
    const candidateResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "CYBERVIBE Careers <careers@cybervibeglobal.com>",
        to: [candidate_email],
        subject: `Application Received: ${safePosition} - CYBERVIBE Global Solutions`,
        html: candidateEmailHtml,
      }),
    });

    const candidateData = await candidateResponse.json();
    console.log("Candidate email response:", candidateData);

    if (!candidateResponse.ok) {
      console.error("Failed to send candidate email:", candidateData);
    }

    // 2. Send application details to employer
    const employerEmailHtml = buildEmployerEmail(requestData);
    const employerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "CYBERVIBE Careers <careers@cybervibeglobal.com>",
        to: [EMPLOYER_EMAIL],
        subject: `New Application: ${safePosition} - ${safeName}`,
        html: employerEmailHtml,
      }),
    });

    const employerData = await employerResponse.json();
    console.log("Employer email response:", employerData);

    if (!employerResponse.ok) {
      console.error("Failed to send employer email:", employerData);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      candidateEmail: candidateData,
      employerEmail: employerData 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error("Error sending emails:", error);
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
