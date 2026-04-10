"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Wallet,
  Calendar,
  Users,
  Calculator as CalculatorIcon,
  ExternalLink,
  Info,
  Sparkles,
  TrendingDown,
  Shield,
  ArrowLeft,
  BellRing,
  FileText,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import ShareButtons from "@/components/shared/ShareButtons";
import {
  HEAD_SUPPORT,
  DEPENDENT_OVER_18,
  DEPENDENT_UNDER_18,
  PAYMENT_DAY,
  ELIGIBILITY_CONDITIONS,
  EXCLUDED_CATEGORIES,
  SUPPORT_TABLE,
  fmt,
} from "@/lib/calculations/citizen-account";
import { getNextMonthlyDate } from "@/lib/events/salary-events";

/* ═══════════════ Hero Countdown ═══════════════ */

function HeroCountdown({ target }: { target: Date }) {
  const [now, setNow] = useState<number>(() => Date.now());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const total = Math.max(0, target.getTime() - now);
  const days = Math.floor(total / 86_400_000);
  const hours = Math.floor((total / 3_600_000) % 24);
  const minutes = Math.floor((total / 60_000) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  const monthLabel = target.toLocaleDateString("ar-SA", { month: "long", year: "numeric" });
  const dayLabel = target.toLocaleDateString("ar-SA", { weekday: "long", day: "numeric", month: "long" });

  const units = [
    { v: days, label: "يوم" },
    { v: hours, label: "ساعة" },
    { v: minutes, label: "دقيقة" },
    { v: seconds, label: "ثانية" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16" dir="rtl">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-white/20">
            <Sparkles className="h-4 w-4" />
            <span>الدفعة القادمة — {monthLabel}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 drop-shadow">
            كم باقي على حساب المواطن؟
          </h1>

          <p className="text-emerald-50 text-base sm:text-lg max-w-2xl mb-8">
            عدّاد تنازلي مباشر لموعد صرف دعم حساب المواطن — يُصرف يوم{" "}
            <span className="font-bold">{PAYMENT_DAY}</span> من كل شهر ميلادي.
          </p>

          {/* Countdown grid */}
          <div
            className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-2xl"
            dir="ltr"
            suppressHydrationWarning
          >
            {units.map((u, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-4 sm:py-6 shadow-2xl"
              >
                <div className="text-3xl sm:text-5xl md:text-6xl font-black text-white tabular-nums">
                  {mounted ? String(u.v).padStart(2, "0") : "--"}
                </div>
                <div className="text-[11px] sm:text-sm text-emerald-100 mt-1 font-medium">
                  {u.label}
                </div>
              </div>
            ))}
          </div>

          {/* Date chip */}
          <div className="mt-6 inline-flex items-center gap-2 bg-white/15 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
            <Calendar className="h-4 w-4" />
            <span suppressHydrationWarning>{mounted ? dayLabel : ""}</span>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href="/calculators/citizen-account"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <CalculatorIcon className="h-5 w-5" />
              احسب مبلغ دعمك التقديري
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <a
              href="https://ca.gov.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold px-6 py-3.5 rounded-xl backdrop-blur-sm transition-all"
            >
              <ExternalLink className="h-5 w-5" />
              البوابة الرسمية
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ Stats Cards ═══════════════ */

function StatsCards() {
  const cards = [
    {
      icon: <Users className="h-6 w-6" />,
      label: "رب الأسرة / مستقل",
      value: `${fmt(HEAD_SUPPORT)} ريال`,
      desc: "الحد الأقصى شهرياً",
      color: "emerald",
    },
    {
      icon: <Users className="h-6 w-6" />,
      label: "تابع 18 سنة فأكثر",
      value: `${fmt(DEPENDENT_OVER_18)} ريال`,
      desc: "لكل فرد شهرياً",
      color: "teal",
    },
    {
      icon: <Users className="h-6 w-6" />,
      label: "تابع أقل من 18 سنة",
      value: `${fmt(DEPENDENT_UNDER_18)} ريال`,
      desc: "لكل طفل شهرياً",
      color: "cyan",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      label: "يوم الصرف",
      value: `${PAYMENT_DAY} من كل شهر`,
      desc: "تقويم ميلادي",
      color: "blue",
    },
  ];

  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    teal: "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800",
    cyan: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  };

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <div
          key={i}
          className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-shadow"
        >
          <div className={`inline-flex items-center justify-center rounded-xl p-2.5 border ${colorMap[c.color]}`}>
            {c.icon}
          </div>
          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 font-medium">{c.label}</div>
          <div className="text-xl sm:text-2xl font-extrabold text-gray-800 dark:text-white mt-1">
            {c.value}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{c.desc}</div>
        </div>
      ))}
    </section>
  );
}

/* ═══════════════ Calculator CTA Banner ═══════════════ */

function CalculatorBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 sm:p-10 shadow-xl">
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

      <div className="relative flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0 bg-white/15 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
          <CalculatorIcon className="h-12 w-12 text-white" />
        </div>
        <div className="flex-1 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>أداة مجانية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            احسب مبلغ دعمك التقديري الآن
          </h2>
          <p className="text-emerald-50 text-sm sm:text-base max-w-xl">
            أدخل دخلك الشهري وعدد أفراد أسرتك لمعرفة مبلغ الدعم المتوقع، والتحقق من أهليتك
            للاستحقاق والحد المانع للدخل.
          </p>
        </div>
        <Link
          href="/calculators/citizen-account"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-2xl transition-all whitespace-nowrap"
        >
          ابدأ الحساب
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

/* ═══════════════ Eligibility Conditions ═══════════════ */

function EligibilityGrid() {
  return (
    <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-2.5">
          <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          شروط الأهلية لحساب المواطن
        </h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        يجب توفّر جميع الشروط التالية للحصول على دعم حساب المواطن:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ELIGIBILITY_CONDITIONS.map((c) => (
          <div
            key={c.id}
            className="flex items-start gap-3 p-4 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-900/30"
          >
            <div className="flex-shrink-0 text-2xl">{c.icon}</div>
            <div>
              <div className="font-bold text-gray-800 dark:text-white text-sm">{c.nameAr}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                {c.descAr}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Excluded */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
          <Info className="h-4 w-4 text-amber-600" />
          الفئات المستثناة (يحق لهم التقديم)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {EXCLUDED_CATEGORIES.map((e, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-3 bg-amber-50/50 dark:bg-amber-900/10 rounded-lg border border-amber-100 dark:border-amber-900/30"
            >
              <span className="text-xl">{e.icon}</span>
              <div>
                <div className="font-semibold text-gray-800 dark:text-white text-sm">{e.nameAr}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{e.descAr}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ Support Amounts Table ═══════════════ */

function SupportTable() {
  return (
    <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-2.5">
          <TrendingDown className="h-6 w-6 text-teal-600 dark:text-teal-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          جدول الحد الأقصى للدعم حسب حجم الأسرة
        </h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm">
        المبالغ أدناه تمثّل الحد الأقصى للدعم قبل خصم نسبة التناقص بناءً على الدخل الشهري.
        للحصول على التقدير الدقيق لدعمك،{" "}
        <Link
          href="/calculators/citizen-account"
          className="text-emerald-600 dark:text-emerald-400 font-bold underline"
        >
          استخدم الحاسبة
        </Link>
        .
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="bg-gradient-to-l from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
              <th className="p-3 text-sm font-bold text-gray-700 dark:text-gray-300 rounded-r-lg">
                تركيبة الأسرة
              </th>
              <th className="p-3 text-sm font-bold text-gray-700 dark:text-gray-300 text-center">
                عدد الأفراد
              </th>
              <th className="p-3 text-sm font-bold text-gray-700 dark:text-gray-300 text-center rounded-l-lg">
                الحد الأقصى (شهرياً)
              </th>
            </tr>
          </thead>
          <tbody>
            {SUPPORT_TABLE.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="p-3 text-sm text-gray-800 dark:text-gray-200">{row.members}</td>
                <td className="p-3 text-center text-sm font-bold text-gray-600 dark:text-gray-400">
                  {row.count}
                </td>
                <td className="p-3 text-center">
                  <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-lg font-bold text-sm">
                    {fmt(row.maxSupport)} ريال
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-lg flex items-start gap-2">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
          يتناقص الدعم تدريجياً إذا تجاوز الدخل الشهري حد الإعفاء، ويتوقف نهائياً عند تجاوز الحد
          المانع للاستحقاق. الحاسبة تُظهر لك هذه القيم تلقائياً.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════ How to Check Status ═══════════════ */

function HowToCheck() {
  const steps = [
    {
      icon: "1",
      title: "ادخل إلى البوابة الرسمية",
      desc: "قم بزيارة ca.gov.sa أو افتح تطبيق حساب المواطن على جوالك.",
    },
    {
      icon: "2",
      title: "سجّل الدخول عبر النفاذ الوطني",
      desc: "استخدم رقم الهوية وكلمة المرور، أو الدخول عبر تطبيق توكلنا / نفاذ.",
    },
    {
      icon: "3",
      title: "اطّلع على حالة الدفعة",
      desc: "ستجد مبلغ الدفعة القادمة وتاريخ الصرف المتوقع وحالة الأهلية.",
    },
    {
      icon: "4",
      title: "حدّث بياناتك",
      desc: "تأكد من تحديث بيانات الدخل والتابعين قبل اليوم 25 من الشهر السابق.",
    },
  ];

  return (
    <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-2.5">
          <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          كيف تستعلم عن دفعة حساب المواطن؟
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {steps.map((s, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold flex items-center justify-center shadow-md">
              {s.icon}
            </div>
            <div>
              <div className="font-bold text-gray-800 dark:text-white">{s.title}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                {s.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ SEO Content ═══════════════ */

function SeoContent() {
  return (
    <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        كل ما تحتاج معرفته عن برنامج حساب المواطن
      </h2>

      <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
        <p>
          <strong>برنامج حساب المواطن</strong> هو أحد أبرز برامج الدعم الحكومي في المملكة العربية
          السعودية، أُطلق في ديسمبر 2017 ضمن مستهدفات رؤية المملكة 2030. يهدف البرنامج إلى حماية
          الأسر السعودية ذات الدخل المنخفض والمتوسط من الآثار المباشرة وغير المباشرة للإصلاحات
          الاقتصادية، خصوصاً ما يتعلق بإعادة هيكلة أسعار الطاقة والمياه وضريبة القيمة المضافة.
        </p>

        <p>
          يُصرف دعم حساب المواطن في <strong>اليوم العاشر من كل شهر ميلادي</strong> عبر الحسابات
          البنكية للمستفيدين. وإذا وافق يوم الصرف عطلة رسمية أو نهاية أسبوع، يُقدَّم الصرف إلى
          آخر يوم عمل قبله. يمكنك متابعة العدّاد التنازلي أعلى هذه الصفحة لمعرفة الوقت المتبقي
          حتى الدفعة القادمة بدقة.
        </p>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white mt-6">
          كيف يُحسب مبلغ الدعم؟
        </h3>
        <p>
          يعتمد مبلغ الدعم الشهري على عاملين رئيسيين: <strong>حجم الأسرة</strong> (رب الأسرة،
          التابعون فوق 18 سنة، الأطفال دون 18 سنة)، و<strong>إجمالي الدخل الشهري</strong>. يبدأ
          المبلغ المعياري من 720 ريال لرب الأسرة ويُضاف إليه 360 ريال لكل تابع بالغ و216 ريال
          لكل طفل. وعندما يتجاوز الدخل حد الإعفاء، يتناقص الدعم تدريجياً حتى يتوقف عند الحد
          المانع.
        </p>

        <p>
          للتحقق من أهليتك ومعرفة المبلغ التقديري الذي تستحقه،{" "}
          <Link
            href="/calculators/citizen-account"
            className="text-emerald-600 dark:text-emerald-400 font-bold underline"
          >
            استخدم حاسبة حساب المواطن
          </Link>{" "}
          المجانية التي توفر لك تقديراً فورياً بناءً على بياناتك.
        </p>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white mt-6">
          من يستحق الدعم؟
        </h3>
        <p>
          يشمل الدعم المواطنين السعوديين المقيمين في المملكة ممن تجاوزت أعمارهم 18 سنة، بشرط ألا
          يتجاوز إجمالي دخل الأسرة الحد المانع المحدد. كما يشمل البرنامج بعض الفئات المستثناة
          مثل أبناء المواطنة السعودية من أب غير سعودي، والزوجة غير السعودية لمواطن سعودي،
          وحاملي بطاقات التنقل من أفراد القبائل النازحة.
        </p>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white mt-6">
          نصائح لضمان استلام الدعم
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>حدّث بيانات الدخل والتابعين في حسابك بانتظام.</li>
          <li>تأكّد من صحة رقم الآيبان المسجّل وأنه نشط.</li>
          <li>راجع الرسائل الإلكترونية والإشعارات من البرنامج باستمرار.</li>
          <li>استجب لطلبات التحقق من البيانات خلال المدة المحددة.</li>
          <li>لا تُدخل معلومات غير صحيحة لأن ذلك قد يؤدي إلى إيقاف الدعم.</li>
        </ul>
      </div>
    </section>
  );
}

/* ═══════════════ FAQ ═══════════════ */

function FAQ() {
  const faqs = [
    {
      q: "متى ينزل حساب المواطن هذا الشهر؟",
      a: "يُصرف دعم حساب المواطن في اليوم العاشر من كل شهر ميلادي. إذا وافق يوم الصرف عطلة رسمية أو نهاية أسبوع، يُقدَّم الصرف إلى آخر يوم عمل قبله. استخدم العدّاد أعلى الصفحة لمعرفة الوقت المتبقي بدقة.",
    },
    {
      q: "كيف أسجّل في حساب المواطن؟",
      a: "ادخل إلى البوابة الرسمية ca.gov.sa، انقر على \"تسجيل جديد\"، وأدخل رقم الهوية وبيانات رب الأسرة والتابعين، ثم أرفق المستندات المطلوبة (صك الزواج، شهادات الميلاد، إثبات الدخل)، وبعد المراجعة سيصلك إشعار القبول والمبلغ المستحق.",
    },
    {
      q: "ما هو الحد المانع لاستحقاق الدعم؟",
      a: "الحد المانع هو الحد الأقصى للدخل الشهري الذي يوقف استحقاق الدعم. يختلف حسب حجم الأسرة وعدد التابعين، ويتراوح عادة بين 5,000 ريال للفرد المستقل وحتى 20,000 ريال للأسر الكبيرة. الحاسبة تُظهر لك القيمة الدقيقة بناءً على بياناتك.",
    },
    {
      q: "كم مبلغ الدعم لرب الأسرة؟",
      a: "يبلغ الحد الأقصى لدعم رب الأسرة 720 ريال شهرياً، ويُضاف إليه 360 ريال لكل تابع 18 سنة فأكثر و216 ريال لكل طفل دون 18 سنة. يتناقص المبلغ تدريجياً إذا تجاوز الدخل حد الإعفاء.",
    },
    {
      q: "هل الدعم يصل للحساب نفسه أم لرب الأسرة فقط؟",
      a: "يُصرف كامل الدعم في حساب رب الأسرة، ما لم تطلب الزوجة استقلال الحساب عبر البوابة. في هذه الحالة، يُقسَّم الدعم بين الطرفين حسب التابعين المسجَّلين لكل منهما.",
    },
    {
      q: "ماذا أفعل إذا تأخر نزول الدعم؟",
      a: "إذا تأخر الدعم عن اليوم العاشر، تحقق من: (1) صحة بيانات الآيبان في حسابك، (2) عدم وجود طلبات تحقق معلّقة، (3) عدم تجاوز الدخل للحد المانع. إن لم تجد مشكلة، تواصل مع خدمة العملاء على 199090.",
    },
    {
      q: "هل يمكن الاستفادة من حساب المواطن مع الضمان الاجتماعي؟",
      a: "لا، المستفيدون من الضمان الاجتماعي المطوّر لا يحق لهم الاستفادة من حساب المواطن في نفس الوقت. يجب الاختيار بين أحد البرنامجين حسب الأنسب لوضع الأسرة.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">
        الأسئلة الشائعة عن حساب المواطن
      </h2>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <details
            key={i}
            className="group bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700 open:bg-emerald-50/50 dark:open:bg-emerald-900/10 open:border-emerald-300 dark:open:border-emerald-800"
          >
            <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-gray-800 dark:text-white list-none">
              <span className="flex-1">{f.q}</span>
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-sm group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {f.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ Sidebar ═══════════════ */

function Sidebar({ target }: { target: Date }) {
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const days = Math.max(0, Math.floor((target.getTime() - now) / 86_400_000));

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Mini countdown */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-100 mb-2">
          <BellRing className="h-4 w-4" />
          <span>الدفعة القادمة</span>
        </div>
        <div className="text-5xl font-black tabular-nums" suppressHydrationWarning>
          {days}
        </div>
        <div className="text-emerald-100 text-sm">يوم متبقي</div>
        <div className="mt-3 pt-3 border-t border-white/20 text-xs text-emerald-50" suppressHydrationWarning>
          {target.toLocaleDateString("ar-SA", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>

      {/* Calculator link */}
      <Link
        href="/calculators/citizen-account"
        className="block bg-white dark:bg-dark-surface rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 p-5 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-lg transition-all group"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-2.5 group-hover:scale-110 transition-transform">
            <CalculatorIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="font-bold text-gray-800 dark:text-white">حاسبة حساب المواطن</div>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          احسب مبلغ دعمك التقديري بناءً على دخلك وعدد أفراد أسرتك.
        </p>
        <div className="mt-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          ابدأ الحساب
          <ArrowLeft className="h-3 w-3" />
        </div>
      </Link>

      {/* Quick facts */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
          <Wallet className="h-4 w-4 text-emerald-600" />
          أرقام سريعة
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-600 dark:text-gray-400">يوم الصرف</span>
            <span className="font-bold text-gray-800 dark:text-white">10 من كل شهر</span>
          </li>
          <li className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-600 dark:text-gray-400">رب الأسرة</span>
            <span className="font-bold text-emerald-600">720 ريال</span>
          </li>
          <li className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-600 dark:text-gray-400">تابع ≥18</span>
            <span className="font-bold text-emerald-600">360 ريال</span>
          </li>
          <li className="flex items-center justify-between py-2">
            <span className="text-gray-600 dark:text-gray-400">تابع &lt;18</span>
            <span className="font-bold text-emerald-600">216 ريال</span>
          </li>
        </ul>
      </div>

      {/* Related */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3">عدّادات ذات صلة</h3>
        <div className="space-y-2">
          {[
            { label: "مواعيد الرواتب", href: "/countdowns/salaries-dates", icon: "💵" },
            { label: "الضمان الاجتماعي", href: "/countdowns/social-security", icon: "🛡️" },
            { label: "معاشات التقاعد", href: "/countdowns/pension-salaries", icon: "👴" },
            { label: "ساند", href: "/countdowns/saned-payment", icon: "📋" },
          ].map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <span>{r.icon}</span>
              <span className="flex-1">{r.label}</span>
              <ArrowLeft className="h-3 w-3 opacity-50" />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

/* ═══════════════ Related Calculators ═══════════════ */

function RelatedCalculators() {
  const items = [
    { title: "حاسبة حساب المواطن", desc: "احسب مبلغ دعمك التقديري", href: "/calculators/citizen-account", icon: "🏦", primary: true },
    { title: "حاسبة الراتب", desc: "احسب راتبك الصافي بعد الخصومات", href: "/calculators/salary", icon: "💼" },
    { title: "حاسبة رسوم المرافقين", desc: "رسوم التابعين الشهرية", href: "/calculators/dependents-fee", icon: "👨‍👩‍👧" },
    { title: "حاسبة الضمان الاجتماعي", desc: "تقدير مستحقاتك الشهرية", href: "/calculators", icon: "🛡️" },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">
        حاسبات قد تهمّك
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((it, i) => (
          <Link
            key={i}
            href={it.href}
            className={`group flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
              it.primary
                ? "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-300 dark:border-emerald-700 hover:border-emerald-500 dark:hover:border-emerald-500"
                : "bg-white dark:bg-dark-surface border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700"
            } hover:shadow-lg`}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-2xl shadow-sm">
              {it.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-gray-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {it.title}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{it.desc}</div>
            </div>
            <ArrowLeft className="h-4 w-4 text-gray-400 group-hover:text-emerald-600 group-hover:-translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ Main Page ═══════════════ */

export default function CitizenAccountCountdownPage() {
  const target = useMemo(() => getNextMonthlyDate(PAYMENT_DAY), []);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "عدّاد حساب المواطن — الدفعة القادمة",
        applicationCategory: "FinanceApplication",
        inLanguage: "ar",
        description:
          "عداد تنازلي مباشر لموعد صرف دعم حساب المواطن في المملكة العربية السعودية، مع حاسبة لتقدير المبلغ المستحق.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://calculatorvip.com/ar" },
          { "@type": "ListItem", position: 2, name: "العدّادات", item: "https://calculatorvip.com/ar/countdowns" },
          { "@type": "ListItem", position: 3, name: "حساب المواطن" },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroCountdown target={target} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb
          items={[
            { labelAr: "العدّادات", labelEn: "Countdowns", href: "/countdowns" },
            { labelAr: "حساب المواطن", labelEn: "Citizen Account" },
          ]}
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <div className="space-y-8 min-w-0">
            <ShareButtons title="كم باقي على حساب المواطن؟" />

            <StatsCards />

            <AdSlot id="ca-countdown-top" size="leaderboard" />

            <CalculatorBanner />

            <EligibilityGrid />

            <SupportTable />

            <AdSlot id="ca-countdown-mid" size="rectangle" />

            <HowToCheck />

            <SeoContent />

            <FAQ />

            <AdSlot id="ca-countdown-bottom" size="leaderboard" />

            <RelatedCalculators />
          </div>

          <div className="hidden lg:block">
            <Sidebar target={target} />
          </div>
        </div>
      </div>
    </main>
  );
}
