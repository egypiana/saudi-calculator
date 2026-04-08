"use client";

import { useState } from "react";
import CountdownMiniCard from "./CountdownMiniCard";

interface SaudiSalaryCountdownsProps {
  locale: string;
}

type Category = "الكل" | "رواتب" | "دعم حكومي" | "مواسم" | "وطني";

const TABS: Category[] = ["الكل", "رواتب", "دعم حكومي", "مواسم", "وطني"];

interface SaudiEvent {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  href: string;
  category: Category;
  targetDate?: string | null;
  badge?: string;
}

const saudiEvents: SaudiEvent[] = [
  {
    id: "salary-day",
    title: "موعد الراتب الشهري",
    subtitle: "راتب الموظفين الحكوميين والقطاع الخاص",
    icon: "💰",
    color: "#16a34a",
    href: "/countdowns/salaries-dates",
    category: "رواتب",
    targetDate: null,
  },
  {
    id: "university-stipend",
    title: "مكافأة الجامعة",
    subtitle: "موعد صرف مكافأة الطلاب الجامعيين",
    icon: "🎓",
    color: "#2563eb",
    href: "/countdowns/university-stipend",
    category: "رواتب",
    targetDate: null,
  },
  {
    id: "social-insurance",
    title: "التأمينات الاجتماعية",
    subtitle: "موعد صرف معاشات التأمينات",
    icon: "🏦",
    color: "#0891b2",
    href: "/countdowns/social-security",
    category: "رواتب",
    targetDate: null,
  },
  {
    id: "pension",
    title: "معاشات التقاعد",
    subtitle: "موعد صرف رواتب المتقاعدين",
    icon: "👴",
    color: "#7c3aed",
    href: "/countdowns/pension-salaries",
    category: "رواتب",
    targetDate: null,
  },
  {
    id: "citizen-account",
    title: "حساب المواطن",
    subtitle: "موعد إيداع دعم حساب المواطن",
    icon: "🏠",
    color: "#059669",
    href: "/countdowns/citizen-account",
    category: "دعم حكومي",
    targetDate: null,
    badge: "شائع",
  },
  {
    id: "sand",
    title: "ساند",
    subtitle: "موعد صرف دعم ساند للعاطلين عن العمل",
    icon: "🤝",
    color: "#d97706",
    href: "/countdowns/saned-payment",
    category: "دعم حكومي",
    targetDate: null,
  },
  {
    id: "hafiz",
    title: "حافز",
    subtitle: "موعد صرف إعانة حافز للباحثين عن عمل",
    icon: "📋",
    color: "#dc2626",
    href: "/countdowns/saned-payment",
    category: "دعم حكومي",
    targetDate: null,
  },
  {
    id: "rehabilitation",
    title: "إعانة التأهيل الشامل",
    subtitle: "موعد صرف إعانة ذوي الإعاقة",
    icon: "♿",
    color: "#4f46e5",
    href: "/countdowns/social-security",
    category: "دعم حكومي",
    targetDate: null,
  },
  {
    id: "insurance-pension",
    title: "معاش التأمينات",
    subtitle: "موعد صرف المعاش التأميني الشهري",
    icon: "📊",
    color: "#0d9488",
    href: "/countdowns/pension-salaries",
    category: "دعم حكومي",
    targetDate: null,
  },
  {
    id: "housing-support",
    title: "دعم سكني",
    subtitle: "موعد صرف الدعم السكني من وزارة الإسكان",
    icon: "🏗️",
    color: "#b45309",
    href: "/countdowns/citizen-account",
    category: "دعم حكومي",
    targetDate: null,
  },
  {
    id: "agriculture-support",
    title: "دعم ريف",
    subtitle: "موعد صرف دعم الأسر المنتجة والريفية",
    icon: "🌾",
    color: "#65a30d",
    href: "/countdowns/citizen-account",
    category: "دعم حكومي",
    targetDate: null,
  },
  {
    id: "winter-season",
    title: "موسم الشتاء",
    subtitle: "بداية فعاليات موسم الشتاء في السعودية",
    icon: "❄️",
    color: "#0ea5e9",
    href: "/countdowns/national-day",
    category: "مواسم",
    targetDate: "2026-12-21",
  },
  {
    id: "autumn-season",
    title: "موسم الخريف",
    subtitle: "بداية فعاليات موسم الخريف",
    icon: "🍂",
    color: "#c2410c",
    href: "/countdowns/national-day",
    category: "مواسم",
    targetDate: "2026-09-22",
  },
  {
    id: "summer-season",
    title: "موسم الصيف",
    subtitle: "بداية فعاليات موسم صيف السعودية",
    icon: "☀️",
    color: "#eab308",
    href: "/countdowns/national-day",
    category: "مواسم",
    targetDate: "2026-06-21",
  },
  {
    id: "spring-season",
    title: "موسم الربيع",
    subtitle: "بداية فعاليات موسم ربيع السعودية",
    icon: "🌸",
    color: "#ec4899",
    href: "/countdowns/national-day",
    category: "مواسم",
    targetDate: "2027-03-20",
  },
  {
    id: "marbaaniya",
    title: "المربعانية",
    subtitle: "بداية فترة المربعانية وموسم البرد",
    icon: "🌧️",
    color: "#6366f1",
    href: "/countdowns/national-day",
    category: "مواسم",
    targetDate: "2026-12-07",
  },
  {
    id: "national-day",
    title: "اليوم الوطني السعودي",
    subtitle: "ذكرى توحيد المملكة العربية السعودية",
    icon: "🇸🇦",
    color: "#16a34a",
    href: "/countdowns/national-day",
    category: "وطني",
    targetDate: "2026-09-23",
  },
  {
    id: "founding-day",
    title: "يوم التأسيس",
    subtitle: "ذكرى تأسيس الدولة السعودية الأولى",
    icon: "🏰",
    color: "#7c3aed",
    href: "/countdowns/foundation-day",
    category: "وطني",
    targetDate: "2027-02-22",
  },
  {
    id: "flag-day",
    title: "يوم العلم",
    subtitle: "الاحتفال بيوم العلم السعودي",
    icon: "🏴",
    color: "#047857",
    href: "/countdowns/flag-day",
    category: "وطني",
    targetDate: "2027-03-11",
  },
];

export default function SaudiSalaryCountdowns({ locale }: SaudiSalaryCountdownsProps) {
  const [activeTab, setActiveTab] = useState<Category>("الكل");

  const filteredEvents =
    activeTab === "الكل"
      ? saudiEvents
      : saudiEvents.filter((e) => e.category === activeTab);

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        💰 عدادات الرواتب والمناسبات السعودية
      </h2>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-primary-600 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredEvents.map((event) => (
          <CountdownMiniCard
            key={event.id}
            id={event.id}
            title={event.title}
            subtitle={event.subtitle}
            icon={event.icon}
            color={event.color}
            href={event.href}
            targetDate={event.targetDate}
            badge={event.badge}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}
