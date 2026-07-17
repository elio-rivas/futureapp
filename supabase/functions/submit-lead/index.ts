import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = "re_bhrhJqjq_EEbAHuCb5ciyHLudFxUZTUK6";
const NOTIFICATION_TO = ["futurefoundations.edu@gmail.com"];

interface LeadPayload {
  parent_name: string;
  phone?: string;
  email: string;
  child_age_grade?: string;
  main_concern?: string;
  interested_service?: string;
  message?: string;
  source?: string;
  website?: string;
}

function sanitize(str: string | undefined): string {
  if (!str) return "";
  return str.trim().slice(0, 500).replace(/<[^>]*>/g, "");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const payload: LeadPayload = await req.json();

    // Honeypot — bots fill this hidden field
    if (payload.website) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const parentName = sanitize(payload.parent_name);
    const email = sanitize(payload.email);

    if (!parentName || parentName.length < 2) {
      return new Response(
        JSON.stringify({ error: "A valid name is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "A valid email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = {
      parent_name: parentName,
      phone: sanitize(payload.phone),
      email,
      child_age_grade: sanitize(payload.child_age_grade),
      main_concern: sanitize(payload.main_concern),
      interested_service: sanitize(payload.interested_service),
      message: sanitize(payload.message),
      source: sanitize(payload.source) || "website",
    };

    // Persist lead to database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase.from("leads").insert(data);
    if (dbError) {
      console.error("DB insert error:", JSON.stringify(dbError));
      return new Response(
        JSON.stringify({ error: "Failed to save lead" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "full",
      timeStyle: "short",
    });

    const emailHtml = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);">

        <!-- Header -->
        <tr>
          <td style="background:#1a1a2e;padding:28px 36px;">
            <p style="margin:0;color:#d97706;font-size:11px;text-transform:uppercase;letter-spacing:.12em;font-weight:700;">New Inquiry</p>
            <h1 style="margin:8px 0 4px;color:#ffffff;font-size:22px;font-weight:700;">Future Foundations Education</h1>
            <p style="margin:0;color:#9ca3af;font-size:13px;">${submittedAt} ET &nbsp;·&nbsp; ${data.source}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 36px;">

            <h2 style="margin:0 0 14px;font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:#6b7280;font-weight:700;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">Parent / Guardian</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;font-size:14px;">
              <tr>
                <td style="padding:5px 0;color:#6b7280;width:120px;">Name</td>
                <td style="padding:5px 0;font-weight:600;color:#111827;">${data.parent_name}</td>
              </tr>
              <tr>
                <td style="padding:5px 0;color:#6b7280;">Email</td>
                <td style="padding:5px 0;"><a href="mailto:${data.email}" style="color:#d97706;text-decoration:none;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding:5px 0;color:#6b7280;">Phone</td>
                <td style="padding:5px 0;color:#111827;">${data.phone || "<span style='color:#9ca3af;'>Not provided</span>"}</td>
              </tr>
            </table>

            <h2 style="margin:0 0 14px;font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:#6b7280;font-weight:700;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">Student</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;font-size:14px;">
              <tr>
                <td style="padding:5px 0;color:#6b7280;width:120px;">Age / Grade</td>
                <td style="padding:5px 0;color:#111827;">${data.child_age_grade || "<span style='color:#9ca3af;'>Not provided</span>"}</td>
              </tr>
              <tr>
                <td style="padding:5px 0;color:#6b7280;">Main Concern</td>
                <td style="padding:5px 0;color:#111827;">${data.main_concern || "<span style='color:#9ca3af;'>Not provided</span>"}</td>
              </tr>
              <tr>
                <td style="padding:5px 0;color:#6b7280;">Interested In</td>
                <td style="padding:5px 0;color:#111827;">${data.interested_service || "<span style='color:#9ca3af;'>Not provided</span>"}</td>
              </tr>
            </table>

            ${data.message ? `
            <h2 style="margin:0 0 14px;font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:#6b7280;font-weight:700;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">Message</h2>
            <p style="margin:0 0 28px;padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;font-size:14px;line-height:1.7;color:#374151;">${data.message}</p>
            ` : ""}

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-top:8px;border-top:1px solid #e5e7eb;">
                  <a href="mailto:${data.email}?subject=Re%3A%20Your%20inquiry%20to%20Future%20Foundations%20Education"
                     style="display:inline-block;background:#d97706;color:#ffffff;padding:13px 28px;border-radius:7px;text-decoration:none;font-weight:700;font-size:14px;margin-top:16px;">
                    Reply to ${data.parent_name}
                  </a>
                  <p style="margin:12px 0 0;font-size:12px;color:#9ca3af;">
                    Replying to this email will send your message directly to the parent.
                  </p>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:16px 36px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">
              Future Foundations Education &nbsp;·&nbsp; 944 E Osceola Pkwy, Kissimmee FL 34744
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Future Foundations Education <onboarding@resend.dev>",
        to: NOTIFICATION_TO,
        reply_to: data.email,
        subject: `New Inquiry: ${data.parent_name}${data.interested_service ? " — " + data.interested_service : ""}`,
        html: emailHtml,
      }),
    });

    const resendBody = await resendRes.text();
    if (!resendRes.ok) {
      console.error("Resend error:", resendRes.status, resendBody);
    } else {
      console.log("Resend OK:", resendBody);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Lead captured successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
