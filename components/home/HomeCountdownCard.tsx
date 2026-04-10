"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { lp } from "@/lib/utils/locale";
import { ChevronLeft } from "lucide-react";

interface HomeCountdownCardProps {
  icon: string;
  title: string;
  subtitle: string;
  targetDate: Date;
  href: string;
  accentColor: "emerald" | "amber" | "purple" | "rose";
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const now = new Date().getTime();
  const total = target.getTime() - now;
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
    total,
  };
}

// الألوان المميزة لكل بطاقة — تبقى موحّدة مع هوية الموقع (الأخضر الزمردي)
const ACCENT_STYLES = {
  emerald: {
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    ring: "group-hover:ring-emerald-200 dark:group-hover:ring-emerald-800",
    text: "text-emerald-700 dark:text-emerald-400",
    bar: "bg-emerald-500",
    hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-700",
  },
  amber: {
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
    ring: "group-hover:ring-amber-200 dark:group-hover:ring-amber-800",
    text: "text-amber-700 dark:text-amber-400",
    bar: "bg-amber-500",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
  },
  purple: {
    iconBg: "bg-gradient-to-br from-purple-500 to-indigo-600",
    ring: "group-hover:ring-purple-200 dark:group-hover:ring-purple-800",
    text: "text-purple-700 dark:text-purple-400",
    bar: "bg-purple-500",
    hoverBorder: "hover:border-purple-300 dark:hover:border-purple-700",
  },
  rose: {
    iconBg: "bg-gradient-to-br from-rose-500 to-pink-600",
    ring: "group-hover:ring-rose-200 dark:group-hover:ring-rose-800",
    text: "text-rose-700 dark:text-rose-400",
    bar: "bg-rose-500",
    hoverBorder: "hover:border-rose-300 dark:hover:border-rose-700",
  },
};

export default function HomeCountdownCard({
  icon,
  title,
  subtitle,
  targetDate,
  href,
  accentColor,
}: HomeCountdownCardProps) {
  const locale = useLocale();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));
  const [mounted, setMounted] = useState(false);
  const accent = ACCENT_STYLES[accentColor];

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { value: timeLeft.days, label: "يوم" },
    { value: timeLeft.hours, label: "ساعة" },
    { value: timeLeft.minutes, label: "دقيقة" },
    { value: timeLeft.seconds, label: "ثانية" },
  ];

  return (
    <Link
      href={lp(locale, href)}
      className={`group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${accent.hoverBorder} flex flex-col`}
    >
      {/* شريط علوي ملوّن */}
      <div className={`absolute top-0 start-0 end-0 h-1 rounded-t-2xl ${accent.bar}`} />

      {/* الرأس: أيقونة + عنوان */}
      <div className="flex items-start gap-4 mb-5">
        <div
          className={`flex-shrink-0 w-14 h-14 ${accent.iconBg} rounded-2xl flex items-center justify-center text-3xl shadow-lg ring-4 ring-transparent ${accent.ring} transition-all group-hover:scale-110`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-extrabold text-gray-900 dark:text-white text-base sm:text-lg leading-tight mb-1">
            {title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">{subtitle}</p>
        </div>
      </div>

      {/* أرقام العدّاد */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-5" dir="ltr">
        {units.map((unit, i) => (
          <div
            key={i}
            className="bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl py-2.5 text-center"
          >
            <div
              className={`font-extrabold text-lg sm:text-xl md:text-2xl ${accent.text} tabular-nums leading-none`}
            >
              {mounted ? String(unit.value).padStart(2, "0") : "--"}
            </div>
            <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">
              {unit.label}
            </div>
          </div>
        ))}
      </div>

      {/* زر التفاصيل */}
      <div
        className={`mt-auto inline-flex items-center justify-center gap-1 text-sm font-bold ${accent.text} opacity-80 group-hover:opacity-100 transition-opacity`}
      >
        عرض التفاصيل
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
