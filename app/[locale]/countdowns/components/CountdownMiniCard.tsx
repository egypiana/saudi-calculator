"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CountdownMiniCardProps {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  href: string;
  targetDate?: string | null;
  badge?: string;
  locale: string;
}

function toArabicDigits(num: number): string {
  return num.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

function getMiniCountdown(targetDate: string): { days: number; hours: number } | null {
  const target = new Date(targetDate);
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
  };
}

export default function CountdownMiniCard({
  title,
  subtitle,
  icon,
  color,
  href,
  targetDate,
  badge,
  locale,
}: CountdownMiniCardProps) {
  const [countdown, setCountdown] = useState<{ days: number; hours: number } | null>(null);

  useEffect(() => {
    if (!targetDate) return;

    const update = () => {
      const result = getMiniCountdown(targetDate);
      setCountdown(result);
    };

    update();
    // Update every 60 seconds for performance
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <Link
      href={`/${locale}${href}`}
      className="group block bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Gradient top bar */}
      <div
        className="h-1.5"
        style={{ background: `linear-gradient(to right, ${color}, ${color}88)` }}
      />

      <div className="p-4 relative">
        {/* Badge */}
        {badge && (
          <span
            className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: color }}
          >
            {badge}
          </span>
        )}

        {/* Icon */}
        <span className="text-3xl mb-3 block">{icon}</span>

        {/* Title & subtitle */}
        <h3 className="font-bold text-gray-800 dark:text-white text-sm leading-tight mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
          {subtitle}
        </p>

        {/* Mini countdown or fallback */}
        {targetDate && countdown ? (
          <div className="text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-lg px-3 py-1.5 inline-block">
            {toArabicDigits(countdown.days)} يوم &middot; {toArabicDigits(countdown.hours)} ساعة
          </div>
        ) : (
          <div className="text-xs text-gray-400 dark:text-gray-500">
            عرض التفاصيل &larr;
          </div>
        )}
      </div>
    </Link>
  );
}
