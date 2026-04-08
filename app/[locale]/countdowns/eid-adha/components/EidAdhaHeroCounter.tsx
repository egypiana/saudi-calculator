"use client";

import { useState, useEffect, useMemo } from "react";
import { EID_ADHA_DATA, getNextEidAdhaYear, getTimeUntilEidAdha, formatDateAr } from "@/lib/data/eidAdhaData";

function toAr(num: number): string {
  return num.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

export default function EidAdhaHeroCounter() {
  const nextYear = getNextEidAdhaYear();
  const eidData = EID_ADHA_DATA[nextYear];
  const [time, setTime] = useState(getTimeUntilEidAdha(nextYear));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeUntilEidAdha(nextYear)), 1000);
    return () => clearInterval(interval);
  }, [nextYear]);

  const progress = useMemo(() => {
    if (!eidData) return 0;
    const yearStart = new Date(`${new Date().getFullYear()}-01-01`).getTime();
    const eid = new Date(eidData.date + "T00:00:00").getTime();
    const now = Date.now();
    const total = eid - yearStart;
    if (total <= 0) return 100;
    return Math.min(100, Math.max(0, ((now - yearStart) / total) * 100));
  }, [eidData]);

  if (!eidData) return null;

  return (
    <section className="relative min-h-[75vh] sm:min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-[#1a0f00] via-[#2a1500] to-[#1a0a00] overflow-hidden px-4 py-12 sm:py-16">
      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: `${1.5 + Math.random() * 2.5}px`,
              height: `${1.5 + Math.random() * 2.5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              ["--delay" as string]: `${Math.random() * 3}s`,
              ["--duration" as string]: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center w-full max-w-2xl mx-auto" dir="rtl">
        {/* Eid icons */}
        <div className="flex items-center justify-center gap-4 mb-5">
          <span className="text-4xl sm:text-5xl">🕋</span>
          <span className="text-4xl sm:text-5xl">🐑</span>
          <span className="text-4xl sm:text-5xl">🕋</span>
        </div>

        {/* Title */}
        <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
          كم باقي على عيد الأضحى المبارك؟
        </h1>

        {/* Date info */}
        <p className="text-amber-300 text-lg sm:text-xl font-semibold mb-1">
          {eidData.dayOfWeek}، {formatDateAr(eidData.date)}
        </p>
        <p className="text-gray-400 text-sm sm:text-base mb-4">
          {eidData.hijriMonth} {toAr(eidData.hijriYear)} هـ
        </p>

        {/* Unique fact badge */}
        <div className="mb-7 px-4 py-2 bg-amber-500/15 border border-amber-500/30 rounded-full text-amber-300 text-xs sm:text-sm text-center max-w-md mx-auto inline-block">
          🐑 {eidData.content.uniqueFact}
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
          <div className="flex justify-between text-[10px] sm:text-xs text-gray-400 mb-1 px-1">
            <span>1 يناير {new Date().getFullYear()}</span>
            <span>{Math.round(progress)}% مضى</span>
            <span>عيد الأضحى</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-amber-400 to-orange-600 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Share buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: `كم باقي على عيد الأضحى ${nextYear}؟`, url: window.location.href });
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

      {/* Amber line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-l from-transparent via-amber-500 to-transparent" />
    </section>
  );
}
