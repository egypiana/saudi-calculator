"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ isAr = true }: { isAr?: boolean }) {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });

  const subjectOptions = isAr
    ? [
        { value: "", label: "اختر الموضوع" },
        { value: "suggestion", label: "اقتراح" },
        { value: "technical", label: "مشكلة تقنية" },
        { value: "partnership", label: "شراكة" },
        { value: "other", label: "أخرى" },
      ]
    : [
        { value: "", label: "Select a subject" },
        { value: "suggestion", label: "Suggestion" },
        { value: "technical", label: "Technical Issue" },
        { value: "partnership", label: "Partnership" },
        { value: "other", label: "Other" },
      ];

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (state === "submitting") return;

    // Validation
    if (!form.name.trim() || form.name.trim().length < 2) {
      setErrorMessage(isAr ? "الرجاء إدخال الاسم" : "Please enter your name");
      setState("error");
      return;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrorMessage(isAr ? "الرجاء إدخال بريد إلكتروني صحيح" : "Please enter a valid email");
      setState("error");
      return;
    }
    if (!form.message.trim() || form.message.trim().length < 5) {
      setErrorMessage(isAr ? "الرجاء كتابة رسالتك" : "Please write your message");
      setState("error");
      return;
    }

    setState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setState("success");
        setForm({ name: "", email: "", subject: "", message: "", website: "" });
        // إعادة الحالة إلى idle بعد 10 ثوانٍ
        setTimeout(() => setState("idle"), 10000);
      } else {
        setErrorMessage(
          data?.message ||
            (isAr
              ? "تعذّر إرسال الرسالة. الرجاء مراسلتنا على info@calculatorvip.com"
              : "Failed to send. Please email us at info@calculatorvip.com")
        );
        setState("error");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(
        isAr
          ? "تعذّر الاتصال بالخادم. الرجاء التحقق من اتصالك بالإنترنت."
          : "Could not reach the server. Please check your connection."
      );
      setState("error");
    }
  }

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors disabled:opacity-50";
  const labelCls = "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — مخفي عن المستخدمين الحقيقيين */}
      <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
        <label>
          Website (do not fill):
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelCls}>
            {isAr ? "الاسم *" : "Name *"}
          </label>
          <input
            type="text"
            id="name"
            required
            disabled={state === "submitting"}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputCls}
            placeholder={isAr ? "أدخل اسمك" : "Enter your name"}
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            {isAr ? "البريد الإلكتروني *" : "Email *"}
          </label>
          <input
            type="email"
            id="email"
            required
            disabled={state === "submitting"}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputCls}
            placeholder={isAr ? "example@email.com" : "example@email.com"}
            maxLength={200}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={labelCls}>
          {isAr ? "الموضوع" : "Subject"}
        </label>
        <select
          id="subject"
          disabled={state === "submitting"}
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className={inputCls}
        >
          {subjectOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          {isAr ? "الرسالة *" : "Message *"}
        </label>
        <textarea
          id="message"
          required
          disabled={state === "submitting"}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={6}
          className={inputCls + " resize-y"}
          placeholder={isAr ? "اكتب رسالتك هنا..." : "Write your message here..."}
          maxLength={5000}
        />
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-left" dir="ltr">
          {form.message.length} / 5000
        </div>
      </div>

      {/* رسائل الحالة */}
      {state === "success" && (
        <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-emerald-800 dark:text-emerald-300">
              {isAr ? "✅ تم إرسال رسالتك بنجاح!" : "Message sent successfully!"}
            </p>
            <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-1">
              {isAr
                ? "سنرد عليك في أقرب وقت ممكن على البريد الذي أدخلته."
                : "We will reply to you as soon as possible."}
            </p>
          </div>
        </div>
      )}

      {state === "error" && errorMessage && (
        <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex items-center gap-2 bg-gradient-to-l from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
        >
          {state === "submitting" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {isAr ? "جارٍ الإرسال..." : "Sending..."}
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              {isAr ? "إرسال الرسالة" : "Send Message"}
            </>
          )}
        </button>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {isAr ? "سنرد خلال 24-48 ساعة" : "We'll respond within 24-48 hours"}
        </p>
      </div>
    </form>
  );
}
