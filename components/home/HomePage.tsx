"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { lp } from "@/lib/utils/locale";
import {
  Search,
  ArrowLeft,
  Calculator,
  Clock,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  BookOpen,
  ChevronLeft,
  Star,
  Users,
  Zap,
  Award,
} from "lucide-react";
import CountdownCard from "@/components/countdown/CountdownCard";
import AdSlot from "@/components/ads/AdSlot";
import { getNextEventDate } from "@/lib/events/islamic-events";
import { getNextMonthlyDate } from "@/lib/events/salary-events";
import { ALL_ARTICLES } from "@/lib/blog/articles";

// ═════════════════════════════════════════════════════
// البيانات الثابتة — الحاسبات الأكثر استخداماً
// ═════════════════════════════════════════════════════
const TOP_CALCULATORS = [
  {
    href: "/calculators/zakat",
    icon: "💰",
    title: "حاسبة الزكاة",
    desc: "احسب زكاة المال والذهب والأسهم والتجارة بدقة وفق الأحكام الشرعية",
    color: "from-emerald-500 to-green-700",
    badge: "الأكثر استخداماً",
  },
  {
    href: "/calculators/salary",
    icon: "💵",
    title: "حاسبة الراتب",
    desc: "احسب صافي راتبك بعد الضرائب والاشتراكات والتأمينات والبدلات",
    color: "from-blue-500 to-cyan-700",
    badge: "شائع",
  },
  {
    href: "/calculators/end-of-service",
    icon: "📋",
    title: "مكافأة نهاية الخدمة",
    desc: "احسب مستحقاتك عند انتهاء العقد وفق نظام العمل السعودي",
    color: "from-purple-500 to-indigo-700",
  },
  {
    href: "/calculators/mortgage",
    icon: "🏠",
    title: "حاسبة التمويل العقاري",
    desc: "احسب القسط الشهري للقرض العقاري ومدته وفوائده في السعودية",
    color: "from-orange-500 to-red-700",
    badge: "جديد",
  },
  {
    href: "/calculators/citizen-account",
    icon: "👨‍👩‍👧",
    title: "حساب المواطن",
    desc: "احسب استحقاقك من الدعم الشهري لبرنامج حساب المواطن",
    color: "from-teal-500 to-emerald-700",
  },
  {
    href: "/calculators/age",
    icon: "🎂",
    title: "حاسبة العمر",
    desc: "احسب عمرك بالهجري والميلادي بدقة — السنوات والأشهر والأيام",
    color: "from-pink-500 to-rose-700",
    badge: "محدّثة",
  },
  {
    href: "/calculators/vat",
    icon: "🧾",
    title: "حاسبة ضريبة القيمة المضافة",
    desc: "احسب 15% ضريبة القيمة المضافة VAT بسهولة للفواتير والمبيعات",
    color: "from-amber-500 to-yellow-700",
  },
  {
    href: "/calculators/bmi",
    icon: "⚖️",
    title: "حاسبة كتلة الجسم BMI",
    desc: "احسب مؤشر كتلة الجسم واعرف وزنك المثالي بدقة علمية",
    color: "from-rose-500 to-pink-700",
  },
  {
    href: "/calculators/inheritance",
    icon: "📜",
    title: "حاسبة الميراث",
    desc: "احسب الميراث الشرعي وفق أحكام الفرائض الإسلامية",
    color: "from-slate-600 to-gray-800",
  },
  {
    href: "/calculators/dependents-fee",
    icon: "👥",
    title: "رسوم المرافقين",
    desc: "احسب رسوم المرافقين والتابعين الشهرية والسنوية",
    color: "from-violet-500 to-purple-700",
  },
  {
    href: "/calculators/labor-fee",
    icon: "🏢",
    title: "المقابل المالي للعمالة",
    desc: "احسب رسوم مكتب العمل للعمالة الوافدة ونسبة السعودة",
    color: "from-indigo-500 to-blue-700",
  },
  {
    href: "/calculators/electricity",
    icon: "⚡",
    title: "حاسبة فاتورة الكهرباء",
    desc: "احسب فاتورة الكهرباء الشهرية وفق الشرائح الجديدة في السعودية",
    color: "from-yellow-500 to-amber-700",
  },
];

const CATEGORIES = [
  {
    href: "/calculators",
    icon: "🧮",
    title: "جميع الحاسبات",
    desc: "22+ حاسبة دقيقة",
    bg: "bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    iconBg: "bg-emerald-500",
  },
  {
    href: "/countdowns",
    icon: "⏰",
    title: "العدادات التنازلية",
    desc: "كم باقي على المناسبات",
    bg: "bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20",
    iconBg: "bg-purple-500",
  },
  {
    href: "/countdowns/salaries-dates",
    icon: "💰",
    title: "مواعيد الرواتب",
    desc: "كل الرواتب الحكومية",
    bg: "bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20",
    iconBg: "bg-amber-500",
  },
  {
    href: "/countdowns/ramadan",
    icon: "🌙",
    title: "رمضان والعيد",
    desc: "عدادات إسلامية",
    bg: "bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/20",
    iconBg: "bg-teal-500",
  },
  {
    href: "/hijri-calendar",
    icon: "📅",
    title: "التقويم الهجري",
    desc: "تحويل التواريخ",
    bg: "bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20",
    iconBg: "bg-rose-500",
  },
  {
    href: "/blog",
    icon: "📚",
    title: "المدونة",
    desc: "مقالات ودروس مفيدة",
    bg: "bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20",
    iconBg: "bg-blue-500",
  },
  {
    href: "/calculators/inheritance",
    icon: "⚖️",
    title: "حاسبات شرعية",
    desc: "زكاة وميراث وصدقة",
    bg: "bg-gradient-to-br from-lime-50 to-green-100 dark:from-lime-900/20 dark:to-green-900/20",
    iconBg: "bg-lime-600",
  },
  {
    href: "/calculators/bmi",
    icon: "❤️",
    title: "حاسبات صحية",
    desc: "BMI والحمل والسعرات",
    bg: "bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/20 dark:to-rose-900/20",
    iconBg: "bg-red-500",
  },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "نتائج دقيقة وموثوقة",
    desc: "كل حاسباتنا مبنية على أحدث الأنظمة والقوانين السعودية ويتم تحديثها باستمرار.",
  },
  {
    icon: Zap,
    title: "سرعة ومجانية تامة",
    desc: "احسب أي شيء في ثوانٍ دون الحاجة إلى تسجيل أو اشتراك — مجاناً بالكامل.",
  },
  {
    icon: Users,
    title: "مصممة للسوق السعودي",
    desc: "كل أداة تراعي القوانين والأنظمة المحلية في المملكة العربية السعودية.",
  },
  {
    icon: Award,
    title: "واجهة سهلة وجميلة",
    desc: "تجربة مستخدم فائقة على الجوال والحاسوب، مع دعم كامل للعربية.",
  },
];

const FAQS = [
  {
    q: "ما هو موقع حاسبة VIP وما الذي يقدمه؟",
    a: "حاسبة VIP (calculatorvip.com) هي المنصة السعودية الشاملة التي تقدم أكثر من 22 حاسبة مالية وشرعية وصحية بدقة عالية، بالإضافة إلى عدادات تنازلية لأهم المناسبات الإسلامية والوطنية ومواعيد الرواتب الحكومية. جميع الخدمات مجانية تماماً ومتوفرة باللغة العربية.",
  },
  {
    q: "هل استخدام الحاسبات مجاني بالكامل؟",
    a: "نعم، جميع الحاسبات والعدادات على موقعنا مجانية 100% ولا تحتاج إلى تسجيل أو اشتراك. يمكنك استخدامها بلا حدود من الجوال أو الحاسوب في أي وقت.",
  },
  {
    q: "ما مدى دقة نتائج الحاسبات؟",
    a: "نحرص على أن تكون كل النتائج دقيقة ومطابقة للأنظمة المعتمدة في المملكة العربية السعودية. حاسبة الزكاة تعتمد على الأحكام الشرعية، وحاسبة الراتب على نظام العمل السعودي، وحاسبة التمويل العقاري على أنظمة البنوك المحلية. ومع ذلك، تبقى النتائج إرشادية ويُنصح بمراجعة الجهة الرسمية للتأكيد.",
  },
  {
    q: "هل يمكنني معرفة كم باقي على رمضان أو عيد الفطر؟",
    a: "نعم، نوفر عدادات تنازلية دقيقة لكل المناسبات الإسلامية الكبرى: رمضان، عيد الفطر، عيد الأضحى، الحج، ليلة القدر، المولد النبوي، رأس السنة الهجرية، وغيرها. كما نوفر عدادات للمناسبات الوطنية السعودية مثل اليوم الوطني ويوم التأسيس.",
  },
  {
    q: "هل توفرون حاسبات للرسوم الحكومية السعودية؟",
    a: "بالتأكيد. نقدم حاسبات متخصصة لحساب رسوم المرافقين (400 ريال شهرياً)، المقابل المالي للعمالة الوافدة (700 أو 800 ريال)، فاتورة الكهرباء، ضريبة القيمة المضافة 15%، ومكافأة نهاية الخدمة، وبرنامج حساب المواطن.",
  },
  {
    q: "هل الموقع متاح على الهاتف الجوال؟",
    a: "نعم، الموقع مصمم بأسلوب Mobile-First ويعمل بسلاسة على جميع الأجهزة: الهواتف الذكية، الأجهزة اللوحية، والحواسيب. الواجهة سريعة ومتجاوبة وتدعم اللغة العربية بشكل كامل من اليمين إلى اليسار.",
  },
];

// ═════════════════════════════════════════════════════
// المكوّن الرئيسي
// ═════════════════════════════════════════════════════
export default function HomePage() {
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");

  // أحدث 6 مقالات من المدونة
  const latestArticles = useMemo(() => {
    return [...ALL_ARTICLES]
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, 6);
  }, []);

  // تواريخ العدادات
  const ramadanDate = getNextEventDate("ramadan") || new Date("2027-02-17");
  const eidFitrDate = getNextEventDate("eid-fitr") || new Date("2026-03-20");
  const hajjDate = getNextEventDate("hajj") || new Date("2026-05-26");
  const salaryDate = getNextMonthlyDate(27);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          ❶ HERO SECTION — عصري بخلفية مُتدرّجة وعناصر تفاعلية
          ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-green-700 to-teal-900 pt-16 pb-20 sm:pt-20 sm:pb-24 md:pt-24 md:pb-28">
        {/* نقش زخرفي خلفي */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-rule='evenodd'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm10 0c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30z'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        {/* توهج ذهبي */}
        <div className="absolute top-0 start-1/4 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 end-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 text-center">
          {/* شارة علوية */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>المنصة السعودية الرائدة للحاسبات والعدادات</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-[1.2] tracking-tight">
            حاسبة VIP — كل ما تحتاجه
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-l from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
              للحساب والتخطيط في مكان واحد
            </span>
          </h1>

          <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            أكثر من <strong className="text-amber-300">22 حاسبة دقيقة</strong> للزكاة والراتب والتمويل العقاري
            ونهاية الخدمة، بالإضافة إلى عدادات تنازلية لرمضان والعيد والحج ومواعيد الرواتب الحكومية في المملكة العربية السعودية.
          </p>

          {/* شريط البحث */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = lp(locale, `/search?q=${encodeURIComponent(searchQuery)}`);
              }
            }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative group">
              <Search className="absolute top-1/2 -translate-y-1/2 start-5 h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن حاسبة أو عداد... مثال: زكاة، راتب، رمضان"
                className="w-full ps-14 pe-32 py-4 sm:py-5 rounded-2xl text-gray-800 bg-white shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-300/50 text-base sm:text-lg"
                aria-label="البحث في الحاسبات والعدادات"
              />
              <button
                type="submit"
                className="absolute top-1/2 -translate-y-1/2 end-2 px-5 py-2.5 bg-gradient-to-l from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold rounded-xl shadow-lg transition-all text-sm"
              >
                بحث
              </button>
            </div>
          </form>

          {/* أزرار CTA */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-12">
            <Link
              href={lp(locale, "/calculators")}
              className="group px-6 py-3.5 bg-white hover:bg-gray-50 text-emerald-800 font-bold rounded-xl shadow-xl transition-all hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2"
            >
              <Calculator className="h-5 w-5" />
              استكشف الحاسبات
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <Link
              href={lp(locale, "/countdowns/salaries-dates")}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border-2 border-white/30 backdrop-blur-sm transition-all inline-flex items-center gap-2"
            >
              <Clock className="h-5 w-5" />
              مواعيد الرواتب
            </Link>
          </div>

          {/* شريط الثقة والإحصائيات */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {[
              { num: "22+", label: "حاسبة دقيقة", icon: "🧮" },
              { num: "15+", label: "عدّاد تنازلي", icon: "⏰" },
              { num: "100%", label: "مجاني بالكامل", icon: "🎁" },
              { num: "24/7", label: "متاح دائماً", icon: "⚡" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-3 py-4 hover:bg-white/15 transition-all"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-white font-extrabold text-xl sm:text-2xl">{stat.num}</div>
                <div className="text-white/80 text-xs sm:text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          ❷ FEATURED COUNTDOWNS — العدادات المميزة
          ════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
              <Clock className="h-3.5 w-3.5" />
              الأكثر متابعة
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
              كم باقي على أهم المناسبات؟
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              تابع العدّ التنازلي لرمضان والعيد والحج وموعد الراتب القادم بالدقيقة والثانية
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            <CountdownCard
              eventId="ramadan"
              icon="🌙"
              titleKey="ramadan"
              questionKey="ramadanQuestion"
              targetDate={ramadanDate}
              gradient="from-purple-600 via-indigo-700 to-purple-900"
              href="/countdowns/ramadan"
            />
            <CountdownCard
              eventId="eid-fitr"
              icon="🎉"
              titleKey="eidFitr"
              questionKey="eidFitrQuestion"
              targetDate={eidFitrDate}
              gradient="from-emerald-500 via-teal-600 to-emerald-800"
              href="/countdowns/eid-fitr"
            />
            <CountdownCard
              eventId="hajj"
              icon="🕋"
              titleKey="hajj"
              questionKey="hajjQuestion"
              targetDate={hajjDate}
              gradient="from-amber-500 via-orange-600 to-red-700"
              href="/countdowns/hajj"
            />
            <CountdownCard
              eventId="salary"
              icon="💵"
              titleKey="nextSalary"
              questionKey="nextSalaryQuestion"
              targetDate={salaryDate}
              gradient="from-green-500 via-emerald-600 to-teal-700"
              href="/countdowns/salaries-dates"
            />
          </div>
        </div>
      </section>

      {/* إعلان */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <AdSlot id="home-top" size="leaderboard" />
      </div>

      {/* ════════════════════════════════════════════════════════════
          ❸ TOP CALCULATORS — الحاسبات الأكثر استخداماً
          ════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
                <TrendingUp className="h-3.5 w-3.5" />
                الأكثر بحثاً
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                الحاسبات الأكثر استخداماً
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-base sm:text-lg">
                أدوات دقيقة ومجانية لحساب كل ما تحتاجه في ثوانٍ
              </p>
            </div>
            <Link
              href={lp(locale, "/calculators")}
              className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 font-bold text-sm sm:text-base group"
            >
              عرض جميع الحاسبات
              <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {TOP_CALCULATORS.map((calc, i) => (
              <Link
                key={i}
                href={lp(locale, calc.href)}
                className="group relative overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* تأثير التدرج على التحويم */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${calc.color} opacity-0 group-hover:opacity-[0.04] dark:group-hover:opacity-[0.08] transition-opacity`}
                />

                {calc.badge && (
                  <span className="absolute top-3 end-3 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-[10px] font-bold px-2 py-1 rounded-full">
                    {calc.badge}
                  </span>
                )}

                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${calc.color} text-white text-3xl mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform`}
                >
                  {calc.icon}
                </div>
                <h3 className="font-extrabold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {calc.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                  {calc.desc}
                </p>
                <div className="flex items-center gap-1 mt-4 text-emerald-700 dark:text-emerald-400 text-sm font-bold">
                  احسب الآن
                  <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          ❹ CATEGORIES — الأقسام الرئيسية
          ════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
              تصفح الأقسام الرئيسية
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              اختر القسم المناسب واكتشف مئات الأدوات والمعلومات المفيدة
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={i}
                href={lp(locale, cat.href)}
                className={`group ${cat.bg} border border-white/60 dark:border-white/5 rounded-2xl p-5 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 ${cat.iconBg} rounded-2xl text-white text-2xl sm:text-3xl shadow-lg mb-4 group-hover:scale-110 transition-transform`}
                >
                  {cat.icon}
                </div>
                <h3 className="font-extrabold text-gray-900 dark:text-white text-base sm:text-lg mb-1">
                  {cat.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          ❺ LATEST ARTICLES — أحدث المقالات من المدونة
          ════════════════════════════════════════════════════════════ */}
      {latestArticles.length > 0 && (
        <section className="py-14 sm:py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div>
                <span className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
                  <BookOpen className="h-3.5 w-3.5" />
                  المدوّنة
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                  أحدث المقالات
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-base sm:text-lg">
                  دروس ومقالات شاملة لمساعدتك على فهم الحاسبات والقوانين السعودية
                </p>
              </div>
              <Link
                href={lp(locale, "/blog")}
                className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 font-bold text-sm sm:text-base group"
              >
                عرض جميع المقالات
                <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {latestArticles.map((article, i) => (
                <Link
                  key={article.slug}
                  href={lp(locale, `/blog/${article.slug}`)}
                  className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 dark:hover:border-emerald-700"
                >
                  {/* هيدر بصري */}
                  <div
                    className={`h-32 sm:h-40 flex items-center justify-center text-6xl relative overflow-hidden ${
                      i % 3 === 0
                        ? "bg-gradient-to-br from-emerald-400 to-green-600"
                        : i % 3 === 1
                        ? "bg-gradient-to-br from-purple-400 to-indigo-600"
                        : "bg-gradient-to-br from-amber-400 to-orange-600"
                    }`}
                  >
                    <span className="drop-shadow-lg">{article.icon}</span>
                    <div className="absolute top-3 end-3 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-bold px-2 py-1 rounded-full">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime} دقائق قراءة
                      </span>
                      <span>•</span>
                      <span>{new Date(article.publishDate).toLocaleDateString("ar-SA")}</span>
                    </div>
                    <h3 className="font-extrabold text-gray-900 dark:text-white text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                      {article.titleAr}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
                      {article.descriptionAr}
                    </p>
                    <div className="flex items-center gap-1 mt-4 text-emerald-700 dark:text-emerald-400 text-sm font-bold">
                      اقرأ المقال
                      <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          ❻ FEATURES — لماذا حاسبة VIP
          ════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
              لماذا ملايين المستخدمين يثقون بـ حاسبة VIP؟
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              نحن نقدّم تجربة حاسبات لا مثيل لها في المملكة العربية السعودية
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {FEATURES.map((feat, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-all"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl text-white shadow-lg mb-4">
                  <feat.icon className="h-7 w-7" />
                </div>
                <h3 className="font-extrabold text-gray-900 dark:text-white text-lg mb-2">
                  {feat.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          ❼ SEO CONTENT — محتوى غني لمحركات البحث
          ════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-8">
            حاسبة VIP — بوّابتك الشاملة للحاسبات والمواعيد في السعودية
          </h2>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-[1.9] mb-5">
              يُعدّ موقع <strong>حاسبة VIP (calculatorvip.com)</strong> المنصة الرقمية الأشمل والأدق في المملكة العربية
              السعودية لكل ما يتعلق بالحاسبات والعدادات التنازلية. سواء كنت مواطناً سعودياً، مقيماً، أو صاحب عمل، ستجد
              عندنا الأداة المناسبة لحساب احتياجاتك اليومية بدقة فائقة ومجاناً تماماً.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
              🧮 حاسبات مالية واقتصادية دقيقة
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-[1.9] mb-5">
              نقدّم مجموعة متكاملة من الحاسبات المالية المصمّمة خصيصاً للسوق السعودي:{" "}
              <Link href={lp(locale, "/calculators/salary")} className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                حاسبة الراتب
              </Link>
              ،{" "}
              <Link href={lp(locale, "/calculators/end-of-service")} className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                مكافأة نهاية الخدمة
              </Link>
              ،{" "}
              <Link href={lp(locale, "/calculators/mortgage")} className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                التمويل العقاري
              </Link>
              ،{" "}
              <Link href={lp(locale, "/calculators/vat")} className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                ضريبة القيمة المضافة 15%
              </Link>
              ،{" "}
              <Link href={lp(locale, "/calculators/citizen-account")} className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                حساب المواطن
              </Link>
              ،{" "}
              <Link href={lp(locale, "/calculators/dependents-fee")} className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                رسوم المرافقين
              </Link>
              ، و
              <Link href={lp(locale, "/calculators/labor-fee")} className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                {" "}المقابل المالي للعمالة
              </Link>
              . كل حاسبة مبنية على أحدث الأنظمة السعودية وتعطيك نتائج فورية وموثوقة.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
              ⏰ عدادات تنازلية لأهم المناسبات
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-[1.9] mb-5">
              هل تتساءل <strong>كم باقي على رمضان؟</strong> أو <strong>متى موعد عيد الفطر؟</strong> أو{" "}
              <strong>كم يوماً على الراتب القادم؟</strong> نوفّر لك عدادات تنازلية حية ودقيقة لجميع المناسبات
              الإسلامية الكبرى (
              <Link href={lp(locale, "/countdowns/ramadan")} className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                رمضان
              </Link>
              ،{" "}
              <Link href={lp(locale, "/countdowns/eid-fitr")} className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                عيد الفطر
              </Link>
              ،{" "}
              <Link href={lp(locale, "/countdowns/eid-adha")} className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                عيد الأضحى
              </Link>
              ،{" "}
              <Link href={lp(locale, "/countdowns/hajj")} className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                الحج
              </Link>
              )، والمناسبات الوطنية السعودية (
              <Link href={lp(locale, "/countdowns/national-day")} className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                اليوم الوطني
              </Link>
              )، وكل{" "}
              <Link href={lp(locale, "/countdowns/salaries-dates")} className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                مواعيد الرواتب الحكومية
              </Link>{" "}
              (التقاعد، الضمان الاجتماعي، حساب المواطن، ساند، ومكافأة الطلاب).
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
              🕌 حاسبات شرعية وإسلامية
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-[1.9] mb-5">
              لأن الدين يسر، وفّرنا{" "}
              <Link href={lp(locale, "/calculators/zakat")} className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                حاسبة الزكاة
              </Link>{" "}
              الشاملة (زكاة المال، الذهب، الأسهم، التجارة، والأنعام) وفق الأحكام الشرعية المعتمدة، وكذلك{" "}
              <Link href={lp(locale, "/calculators/inheritance")} className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                حاسبة الميراث
              </Link>{" "}
              وفق علم الفرائض. كما يمكنك استخدام{" "}
              <Link href={lp(locale, "/hijri-calendar")} className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                التقويم الهجري
              </Link>{" "}
              لتحويل التواريخ بين الهجري والميلادي.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
              🎂 حاسبات شخصية وصحية
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-[1.9] mb-5">
              اكتشف نفسك أكثر مع{" "}
              <Link href={lp(locale, "/calculators/age")} className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                حاسبة العمر المطوّرة
              </Link>{" "}
              التي تعرض عمرك بالهجري والميلادي، برجك، وإحصائيات مدهشة عن حياتك. اهتم بصحتك مع{" "}
              <Link href={lp(locale, "/calculators/bmi")} className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                حاسبة مؤشر كتلة الجسم (BMI)
              </Link>{" "}
              و
              <Link href={lp(locale, "/calculators/pregnancy")} className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                {" "}حاسبة الحمل
              </Link>
              .
            </p>

            <div className="bg-emerald-50 dark:bg-emerald-900/20 border-r-4 border-emerald-500 p-5 rounded-xl my-8">
              <p className="text-gray-800 dark:text-gray-200 leading-[1.9] mb-0">
                <strong>💡 لماذا حاسبة VIP؟</strong> لأننا نُحدّث جميع الحاسبات بشكل مستمر لتتوافق مع أحدث الأنظمة
                والقوانين السعودية، ونعطي الأولوية لسرعة الأداء وسهولة الاستخدام على الجوال. جميع خدماتنا مجانية
                100% ولا تحتاج إلى تسجيل.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          ❽ FAQ — الأسئلة الشائعة
          ════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
              ❓ مساعدة
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
              الأسئلة الشائعة
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
              إجابات على أكثر الأسئلة شيوعاً حول موقعنا وخدماتنا
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
              >
                <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer list-none">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg flex-1">
                    {faq.q}
                  </h3>
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center group-open:rotate-45 transition-transform">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold text-xl leading-none">+</span>
                  </div>
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-700 dark:text-gray-300 leading-[1.9] text-sm sm:text-base">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* إعلان سفلي */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <AdSlot id="home-bottom" size="rectangle" />
      </div>

      {/* ════════════════════════════════════════════════════════════
          ❾ FINAL CTA — دعوة نهائية للعمل
          ════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-emerald-700 via-green-700 to-teal-800 relative overflow-hidden">
        <div className="absolute top-0 start-0 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 end-0 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-5 w-5 fill-amber-300 text-amber-300" />
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4">
            ابدأ الحساب الآن — مجاناً وبدون تسجيل
          </h2>
          <p className="text-white/90 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            انضم إلى ملايين المستخدمين الذين يعتمدون على حاسبة VIP يومياً في حساباتهم المالية والشرعية ومتابعة المناسبات.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href={lp(locale, "/calculators")}
              className="px-7 py-4 bg-white hover:bg-gray-50 text-emerald-800 font-extrabold rounded-xl shadow-2xl transition-all hover:scale-105 inline-flex items-center gap-2"
            >
              <Calculator className="h-5 w-5" />
              استكشف كل الحاسبات
            </Link>
            <Link
              href={lp(locale, "/countdowns")}
              className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-extrabold rounded-xl border-2 border-white/30 backdrop-blur-sm transition-all inline-flex items-center gap-2"
            >
              <Clock className="h-5 w-5" />
              شاهد كل العدادات
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
