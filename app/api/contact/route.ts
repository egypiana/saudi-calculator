import { NextResponse } from "next/server";
import { Resend } from "resend";

// ═══════════════════════════════════════════════════════════════════
//  Contact Form API Route
//  يستقبل بيانات نموذج "اتصل بنا" ويرسلها إلى info@calculatorvip.com
//  عبر Resend (يحتاج RESEND_API_KEY في متغيرات البيئة)
// ═══════════════════════════════════════════════════════════════════

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "info@calculatorvip.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Calculator VIP <onboarding@resend.dev>";

// Rate limiting بسيط في الذاكرة (لكل IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // 5 رسائل
const RATE_WINDOW = 60 * 60 * 1000; // في الساعة

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  entry.count++;
  if (entry.count > RATE_LIMIT) return true;
  return false;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    // ═════ Rate limiting ═════
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "too_many_requests", message: "تم تجاوز الحد المسموح. حاول لاحقاً." },
        { status: 429 }
      );
    }

    // ═════ Parse body ═════
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "invalid_body", message: "بيانات غير صالحة." },
        { status: 400 }
      );
    }

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();
    const honeypot = String(body.website || "").trim(); // Honeypot field

    // ═════ Honeypot check (anti-spam) ═════
    if (honeypot) {
      // تم اكتشاف بوت — نعيد نجاح لإخفاء الحقيقة
      return NextResponse.json({ ok: true });
    }

    // ═════ Validation ═════
    if (!name || name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { ok: false, error: "invalid_name", message: "الرجاء إدخال اسم صحيح (2-100 حرف)." },
        { status: 400 }
      );
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "invalid_email", message: "الرجاء إدخال بريد إلكتروني صحيح." },
        { status: 400 }
      );
    }
    if (!message || message.length < 5 || message.length > 5000) {
      return NextResponse.json(
        { ok: false, error: "invalid_message", message: "الرجاء كتابة رسالة (5-5000 حرف)." },
        { status: 400 }
      );
    }

    // ═════ تحقق من وجود RESEND_API_KEY ═════
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[contact] RESEND_API_KEY not configured");
      return NextResponse.json(
        {
          ok: false,
          error: "server_not_configured",
          message: "خدمة الإرسال غير متاحة حالياً. الرجاء مراسلتنا مباشرة على info@calculatorvip.com",
        },
        { status: 503 }
      );
    }

    // ═════ إرسال البريد عبر Resend ═════
    const resend = new Resend(apiKey);

    const subjectMap: Record<string, string> = {
      suggestion: "اقتراح",
      technical: "مشكلة تقنية",
      partnership: "شراكة",
      other: "أخرى",
    };
    const subjectLabel = subjectMap[subject] || subject || "رسالة من نموذج التواصل";

    const html = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, 'Segoe UI', sans-serif; background:#f3f4f6; padding:20px; margin:0;">
  <table style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e5e7eb;">
    <tr>
      <td style="background:linear-gradient(135deg,#059669,#047857); padding:24px; text-align:center;">
        <h1 style="color:#ffffff; margin:0; font-size:20px;">📬 رسالة جديدة من حاسبة VIP</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:24px;">
        <table style="width:100%; border-collapse:collapse;">
          <tr>
            <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; width:120px; color:#6b7280; font-weight:bold;">الاسم</td>
            <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; color:#111827;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; color:#6b7280; font-weight:bold;">البريد</td>
            <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; color:#111827;"><a href="mailto:${escapeHtml(email)}" style="color:#059669; text-decoration:none;">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; color:#6b7280; font-weight:bold;">الموضوع</td>
            <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; color:#111827;">${escapeHtml(subjectLabel)}</td>
          </tr>
          <tr>
            <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; color:#6b7280; font-weight:bold;">IP</td>
            <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; color:#9ca3af; font-size:12px;">${escapeHtml(ip)}</td>
          </tr>
        </table>
        <div style="margin-top:24px; padding:16px; background:#f9fafb; border-radius:8px; border-right:4px solid #059669;">
          <p style="margin:0 0 8px 0; color:#6b7280; font-size:12px; font-weight:bold;">الرسالة:</p>
          <p style="margin:0; color:#111827; line-height:1.8; white-space:pre-wrap;">${escapeHtml(message)}</p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background:#f9fafb; padding:16px; text-align:center; color:#6b7280; font-size:12px;">
        تم الإرسال من نموذج التواصل على <a href="https://calculatorvip.com" style="color:#059669;">calculatorvip.com</a>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const text = `رسالة جديدة من حاسبة VIP

الاسم: ${name}
البريد: ${email}
الموضوع: ${subjectLabel}
IP: ${ip}

الرسالة:
${message}
    `;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `[حاسبة VIP] ${subjectLabel} — من ${name}`,
      html,
      text,
    });

    if (error) {
      console.error("[contact] Resend error:", JSON.stringify(error));
      const errMsg = (error as { message?: string })?.message || "";
      const errName = (error as { name?: string })?.name || "";

      // كشف قيود دومين الاختبار في Resend
      const isTestDomainLimit =
        /can only send testing emails/i.test(errMsg) ||
        /verify a domain/i.test(errMsg) ||
        /validation_error/i.test(errName);

      return NextResponse.json(
        {
          ok: false,
          error: "send_failed",
          message: isTestDomainLimit
            ? "خدمة الإرسال تعمل في الوضع التجريبي. الرجاء مراسلتنا مباشرة على info@calculatorvip.com"
            : `تعذّر الإرسال: ${errMsg || "خطأ غير معروف"}`,
          debug: { name: errName, message: errMsg },
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "internal_error", message: "حدث خطأ غير متوقع. حاول لاحقاً." },
      { status: 500 }
    );
  }
}
