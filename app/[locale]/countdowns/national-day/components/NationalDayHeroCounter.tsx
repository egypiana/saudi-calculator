"use client";

import { useState, useEffect, useMemo } from "react";
import { NATIONAL_DAY_DATA, getNextNationalDayYear, getTimeUntilNationalDay, formatDateAr } from "@/lib/data/nationalDayData";

function toAr(num: number): string {
  return num.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

export default function NationalDayHeroCounter() {
  const nextYear = getNextNationalDayYear();
  const ndData = NATIONAL_DAY_DATA[nextYear];
  const [time, setTime] = useState(getTimeUntilNationalDay(nextYear));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeUntilNationalDay(nextYear)), 1000);
    return () => clearInterval(interval);
  }, [nextYear]);

  const progress = useMemo(() => {
    if (!ndData) return 0;
    const yearStart = new Date(`${new Date().getFullYear()}-01-01`).getTime();
    const nd = new Date(ndData.date + "T00:00:00").getTime();
    const now = Date.now();
    const total = nd - yearStart;
    if (total <= 0) return 100;
    return Math.min(100, Math.max(0, ((now - yearStart) / total) * 100));
  }, [ndData]);

  if (!ndData) return null;

  return (
    <section className="relative min-h-[75vh] sm:min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-[#003c1f] via-[#006633] to-[#004d2a] overflow-hidden px-4 py-12 sm:py-16">
      {/* Stars pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${1.5 + Math.random() * 2.5}px`,
              height: `${1.5 + Math.random() * 2.5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 3}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center w-full max-w-2xl mx-auto" dir="rtl">
        {/* National Day icons */}
        <div className="flex items-center justify-center gap-4 mb-5">
          <span className="text-4xl sm:text-5xl">🇸🇦</span>
          <span className="text-4xl sm:text-5xl">🏰</span>
          <span className="text-4xl sm:text-5xl">🇸🇦</span>
        </div>

        {/* Title */}
        <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
          كم باقي على اليوم الوطني السعودي؟
        </h1>

        {/* National Day Number */}
        <div className="mb-2">
          <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 text-xl sm:text-2xl font-bold text-green-200">
            اليوم الوطني {toAr(ndData.nationalDayNumber)}
          </span>
        </div>

        {/* Date info */}
        <p className="text-green-200 text-lg sm:text-xl font-semibold mb-1">
          {ndData.dayOfWeek}، {formatDateAr(ndData.date)}
        </p>

        {/* Theme badge */}
        <div className="mb-7 px-4 py-2 bg-green-400/15 border border-green-400/30 rounded-full text-green-200 text-xs sm:text-sm text-center max-w-md mx-auto inline-block">
          🎯 {ndData.theme}
        </div>

        {/* Countdown units */}
        <div className="flex gap-2.5 sm:gap-4 justify-center mb-7">
          {[
            { value: time.days, label: "يوماً" },
            { value: time.hours, label: "ساعة" },
            { value: time.minutes, label: "دقيقة" },
            { value: time.seconds, label: "ثانية" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center bg-white/[0.08] backdrop-blur-sm border border-white/15 rounded-2xl w-[70px] h-[85px] sm:w-[100px] sm:h-[115px] justify-center gap-1"
            >
              <span className="text-white font-bold text-2xl sm:text-4xl tabular-nums leading-none">
                {String(value).padStart(2, "0")}
              </span>
              <span className="text-white/60 text-[10px] sm:text-xs">{label}</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-lg mx-auto mb-6">
          <div className="flex justify-between text-[10px] sm:text-xs text-gray-300 mb-1 px-1">
            <span>1 يناير {new Date().getFullYear()}</span>
            <span>{Math.round(progress)}% مضى</span>
            <span>اليوم الوطني</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-green-400 to-emerald-500 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Share buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: `كم باقي على اليوم الوطني السعودي ${nextYear}؟`, url: window.location.href });
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-sm transition-all"
          >
            <span>📤</span>
            <span>مشاركة</span>
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-sm transition-all"
          >
            <span>📋</span>
            <span>نسخ الرابط</span>
          </button>
        </div>
      </div>

      {/* Green line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-l from-transparent via-green-500 to-transparent" />
    </section>
  );
}
