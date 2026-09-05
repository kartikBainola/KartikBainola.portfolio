/**
 * Cloudflare Worker that sends contact-form emails via Resend.
 * Deploy: cd workers/contact && npx wrangler deploy
 * Secrets: wrangler secret put RESEND_API_KEY
 * Vars: CONTACT_EMAIL, RESEND_FROM_EMAIL (wrangler.toml or dashboard)
 */

export interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL?: string;
  RESEND_FROM_EMAIL?: string;
  ALLOWED_ORIGINS?: string;
}

const DEFAULT_TO = "kartikbainola1303@gmail.com";
const DEFAULT_FROM = "Portfolio <onboarding@resend.dev>";

const contactSchema = {
  parse(body: unknown) {
    if (!body || typeof body !== "object") throw new Error("Invalid body");
    const data = body as Record<string, unknown>;
    const name = String(data.name ?? "");
    const email = String(data.email ?? "");
    const subject = String(data.subject ?? "");
    const message = String(data.message ?? "");
    if (name.length < 2) throw new Error("Invalid name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Invalid email");
    if (subject.length < 3) throw new Error("Invalid subject");
    if (message.length < 10) throw new Error("Invalid message");
    return { name, email, subject, message };
  },
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function corsHeaders(request: Request, env: Env): HeadersInit {
  const origin = request.headers.get("Origin") ?? "";
  const allowed = (env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  const defaults = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://kartikbainola.github.io",
  ];

  const list = allowed.length > 0 ? allowed : defaults;
  const allowOrigin = list.includes(origin) ? origin : list[0];

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(data: unknown, status: number, request: Request, env: Env) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(request, env),
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, request, env);
    }

    try {
      const body = await request.json();
      const data = contactSchema.parse(body);

      const apiKey = env.RESEND_API_KEY;
      const toEmail = env.CONTACT_EMAIL || DEFAULT_TO;
      const fromEmail = env.RESEND_FROM_EMAIL || DEFAULT_FROM;

      if (!apiKey) {
        return json(
          { error: "Email service is not configured", code: "MISSING_API_KEY" },
          503,
          request,
          env
        );
      }

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: data.email,
          subject: `[Portfolio] ${data.subject}`,
          html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
        `,
        }),
      });

      if (!res.ok) {
        const details = await res.text().catch(() => "");
        console.error("Resend API error:", res.status, details);
        return json({ error: "Failed to send email" }, 500, request, env);
      }

      return json({ success: true }, 200, request, env);
    } catch (error) {
      console.error("Contact worker error:", error);
      return json({ error: "Invalid request" }, 400, request, env);
    }
  },
};
