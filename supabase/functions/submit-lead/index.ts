import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

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
  form_rendered_at?: number;
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

    // Honeypot check -- if 'website' field has content, it's a bot
    if (payload.website) {
      return new Response(
        JSON.stringify({ success: true, message: "Lead captured successfully" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Timing check -- form submitted too fast (< 2 seconds) is likely a bot
    if (payload.form_rendered_at) {
      const elapsed = Date.now() - payload.form_rendered_at;
      if (elapsed < 2000) {
        return new Response(
          JSON.stringify({ success: true, message: "Lead captured successfully" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Required field validation
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

    const sanitizedData = {
      parent_name: parentName,
      phone: sanitize(payload.phone),
      email,
      child_age_grade: sanitize(payload.child_age_grade),
      main_concern: sanitize(payload.main_concern),
      interested_service: sanitize(payload.interested_service),
      message: sanitize(payload.message),
      source: sanitize(payload.source) || "website",
    };

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: dbError } = await supabase.from("leads").insert(sanitizedData);

    if (dbError) {
      return new Response(
        JSON.stringify({ error: "Failed to save lead" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email notification via Resend if configured
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      const emailBody = [
        `NEW LEAD - Future Foundations Education`,
        ``,
        `Source: ${sanitizedData.source}`,
        `Date: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`,
        ``,
        `--- Parent Information ---`,
        `Name: ${sanitizedData.parent_name}`,
        `Email: ${sanitizedData.email}`,
        `Phone: ${sanitizedData.phone || "Not provided"}`,
        ``,
        `--- Child Information ---`,
        `Age/Grade: ${sanitizedData.child_age_grade || "Not provided"}`,
        `Main Concern: ${sanitizedData.main_concern || "Not provided"}`,
        `Interested Service: ${sanitizedData.interested_service || "Not provided"}`,
        ``,
        `--- Message ---`,
        sanitizedData.message || "No additional message",
      ].join("\n");

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Future Foundations <leads@futurefoundationsedu.com>",
          to: ["tutoring@futurefoundationsedu.com"],
          subject: `New Lead: ${sanitizedData.parent_name} - ${sanitizedData.source}`,
          text: emailBody,
        }),
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: "Lead captured successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
