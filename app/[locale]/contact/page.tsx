import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr ? "اتصل بنا — حاسبة VIP" : "Contact Us — Calculator VIP";
  const description = isAr
    ? "تواصل مع فريق حاسبة VIP — أرسل لنا اقتراحاتك أو استفساراتك عبر البريد الإلكتروني أو النموذج."
    : "Get in touch with the Calculator VIP team — send us your suggestions or questions via email or contact form.";
  return {
    title,
    description,
    ...generatePageSEO(locale, "/contact", { title, description }),
  };
}

function PageContent({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  const contactMethods = [
    {
      icon: "\u{1F4E7}",
      titleAr: "البريد الإلكتروني",
      titleEn: "Email",
      valueAr: "contact@calculatorvip.com",
      valueEn: "contact@calculatorvip.com",
      href: "mailto:contact@calculatorvip.com",
    },
    {
      icon: "\u{1F426}",
      titleAr: "تويتر / X",
      titleEn: "Twitter / X",
      valueAr: "@calculatorvip",
      valueEn: "@calculatorvip",
      href: "https://x.com/calculatorvip",
    },
    {
      icon: "\u{1F4AC}",
      titleAr: "اقتراحات وملاحظات",
      titleEn: "Suggestions & Feedback",
      valueAr: "نرحب بأفكاركم لتطوير الموقع",
      valueEn: "We welcome your ideas to improve the site",
      href: null,
    },
  ];

  const faqs = isAr
    ? [
        { question: "كم وقت الرد على الرسائل؟", answer: "نحرص على الرد خلال 24 إلى 48 ساعة من استلام رسالتك." },
        { question: "هل الموقع مجاني بالكامل؟", answer: "نعم، جميع أدوات حاسبة VIP مجانية تماماً ولا تتطلب تسجيل دخول." },
        { question: "كيف أقترح ميزة جديدة؟", answer: "يمكنك استخدام نموذج التواصل أعلاه واختيار \"اقتراح\" كموضوع الرسالة، أو مراسلتنا عبر البريد الإلكتروني مباشرة." },
      ]
    : [
        { question: "How long does it take to get a reply?", answer: "We aim to respond within 24 to 48 hours of receiving your message." },
        { question: "Is the site completely free?", answer: "Yes, all Calculator VIP tools are completely free and require no sign-up." },
        { question: "How can I suggest a new feature?", answer: "Use the contact form above and select \"Suggestion\" as the subject, or email us directly." },
      ];

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

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ labelAr: "اتصل بنا", labelEn: "Contact Us" }]} />

        {/* Hero */}
        <section className="mt-8 text-center py-12 sm:py-16 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            {isAr ? "نسعد بتواصلكم" : "We'd Love to Hear From You"}
          </h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto px-4">
            {isAr
              ? "لديك سؤال، اقتراح، أو ملاحظة؟ فريق حاسبة VIP هنا لمساعدتك."
              : "Have a question, suggestion, or feedback? The Calculator VIP team is here to help."}
          </p>
        </section>

        {/* Contact Methods Grid */}
        <section className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {contactMethods.map((method) => (
            <div
              key={method.titleEn}
              className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center hover:border-green-400 dark:hover:border-green-500 transition-colors"
            >
              <div className="text-4xl mb-3">{method.icon}</div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                {isAr ? method.titleAr : method.titleEn}
              </h2>
              {method.href ? (
                <a
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 dark:text-green-400 hover:underline font-medium text-sm"
                >
                  {isAr ? method.valueAr : method.valueEn}
                </a>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {isAr ? method.valueAr : method.valueEn}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* Contact Form */}
        <section className="mt-10 bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            {isAr ? "أرسل لنا رسالة" : "Send Us a Message"}
          </h2>
          <form action="mailto:contact@calculatorvip.com" method="POST" encType="text/plain" className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  {isAr ? "الاسم" : "Name"}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                  placeholder={isAr ? "أدخل اسمك" : "Enter your name"}
                />
              </div>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  {isAr ? "البريد الإلكتروني" : "Email"}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                  placeholder={isAr ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                />
              </div>
            </div>
            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {isAr ? "الموضوع" : "Subject"}
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
              >
                {subjectOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {isAr ? "الرسالة" : "Message"}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors resize-y"
                placeholder={isAr ? "اكتب رسالتك هنا..." : "Write your message here..."}
              />
            </div>
            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl transition-colors"
              >
                {isAr ? "إرسال" : "Send"}
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isAr ? "سيتم الرد خلال 24-48 ساعة" : "We'll respond within 24-48 hours"}
              </p>
            </div>
          </form>
        </section>

        {/* FAQ Mini-Section */}
        <section className="mt-10 bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            {isAr ? "أسئلة شائعة" : "Frequently Asked Questions"}
          </h2>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                <h3 className="font-bold text-gray-800 dark:text-white mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <PageContent locale={locale} />;
}
