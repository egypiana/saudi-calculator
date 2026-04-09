"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocale } from "next-intl";
import {
  PAYMENT_TYPES,
  getNextGovSalary,
  getNextMonthlyDate,
  getTimeUntil,
  formatDateAr,
  getDayName,
} from "@/lib/data/salaryDatesData";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TabData {
  depositDate: string;
  isAdjusted: boolean;
  originalDate?: string;
}

function getTabData(tabId: string): TabData | null {
  switch (tabId) {
    case "government": {
      const next = getNextGovSalary();
      if (!next) return null;
      return {
        depositDate: next.depositDate,
        isAdjusted: next.isAdjusted,
        originalDate: next.originalDate,
      };
    }
    case "citizen-account": {
      const date = getNextMonthlyDate(10);
      return { depositDate: date, isAdjusted: false };
    }
    case "pension": {
      const date = getNextMonthlyDate(25);
      return { depositDate: date, isAdjusted: false };
    }
    case "hafiz": {
      const date = getNextMonthlyDate(5);
      return { depositDate: date, isAdjusted: false };
    }
    default:
      return null;
  }
}

function DigitBox({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  const displayValue = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative group"
        style={{ "--accent-color": color } as React.CSSProperties}
      >
        {/* Glow effect behind the box */}
        <div
          className="absolute -inset-1 rounded-2xl opacity-30 blur-md transition-opacity group-hover:opacity-50"
          style={{ backgroundColor: color }}
        />
        <div className="relative flex items-center justify-center w-[72px] h-[88px] sm:w-[90px] sm:h-[110px] md:w-[100px] md:h-[120px] rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden">
          {/* Subtle inner gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          {/* Digit */}
          <span
            className="relative text-3xl sm:text-4xl md:text-5xl font-bold tabular-nums tracking-tight text-white drop-shadow-lg transition-all duration-300"
            style={{ textShadow: `0 0 20px ${color}40` }}
          >
            {displayValue}
          </span>
          {/* Bottom shine line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] opacity-50"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            }}
          />
        </div>
      </div>
      <span className="text-xs sm:text-sm font-medium text-white/70">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 pb-7">
      <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
      <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse [animation-delay:500ms]" />
    </div>
  );
}

export default function SalaryHeroCounter() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [activeTab, setActiveTab] = useState("government");
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  const activePayment = PAYMENT_TYPES.find((p) => p.id === activeTab)!;
  const tabData = useMemo(() => getTabData(activeTab), [activeTab]);

  const updateCountdown = useCallback(() => {
    if (!tabData) return;
    const time = getTimeUntil(tabData.depositDate);
    setCountdown(time);
  }, [tabData]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [updateCountdown]);

  const digitLabels = isAr
    ? { days: "يوم", hours: "ساعة", minutes: "دقيقة", seconds: "ثانية" }
    : { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" };

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="relative w-full overflow-hidden bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-950 dark:from-gray-950 dark:via-emerald-950 dark:to-gray-950"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(5,150,105,0.1),transparent_50%)]" />

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Floating decorative circles */}
        <div className="absolute top-10 start-[10%] w-64 h-64 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute bottom-10 end-[5%] w-80 h-80 rounded-full bg-green-400/5 blur-3xl" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-600/[0.03] blur-3xl" />

        {/* Diagonal lines */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, white 0px, white 1px, transparent 1px, transparent 40px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* Pulsing status indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <span className="text-sm sm:text-base font-semibold text-emerald-300 tracking-wide">
            {isAr ? "الراتب القادم" : "Next Payment"}
          </span>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {PAYMENT_TYPES.map((pt) => {
            const isActive = activeTab === pt.id;
            return (
              <button
                key={pt.id}
                onClick={() => setActiveTab(pt.id)}
                className={`
                  relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl
                  text-xs sm:text-sm font-medium transition-all duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                  ${
                    isActive
                      ? "bg-white/15 text-white shadow-lg border border-white/20 scale-105"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-transparent"
                  }
                `}
                style={
                  isActive
                    ? {
                        boxShadow: `0 0 20px ${pt.color}30, 0 4px 12px rgba(0,0,0,0.3)`,
                      }
                    : undefined
                }
              >
                <span className="text-base sm:text-lg" role="img" aria-hidden="true">
                  {pt.icon}
                </span>
                <span>{isAr ? pt.nameAr : pt.nameEn}</span>
                {isActive && (
                  <span
                    className="absolute -bottom-[1px] left-1/4 right-1/4 h-[2px] rounded-full"
                    style={{ backgroundColor: pt.color }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Main countdown area */}
        {!tabData ? (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">
              {isAr
                ? "لا يوجد موعد قادم حالياً"
                : "No upcoming date available"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Payment type title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 text-center">
              {isAr ? activePayment.nameAr : activePayment.nameEn}
            </h1>
            <p className="text-sm text-white/50 mb-8 sm:mb-10 text-center">
              {activePayment.dayRule}
            </p>

            {/* Countdown boxes */}
            <div
              className={`flex items-center justify-center gap-2 sm:gap-3 md:gap-4 transition-opacity duration-500 ${
                mounted ? "opacity-100" : "opacity-0"
              }`}
            >
              <DigitBox
                value={countdown.days}
                label={digitLabels.days}
                color={activePayment.color}
              />
              <Separator />
              <DigitBox
                value={countdown.hours}
                label={digitLabels.hours}
                color={activePayment.color}
              />
              <Separator />
              <DigitBox
                value={countdown.minutes}
                label={digitLabels.minutes}
                color={activePayment.color}
              />
              <Separator />
              <DigitBox
                value={countdown.seconds}
                label={digitLabels.seconds}
                color={activePayment.color}
              />
            </div>

            {/* Date info below countdown */}
            <div className="mt-8 sm:mt-10 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-white/80">
                <svg
                  className="w-4 h-4 text-white/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-base sm:text-lg font-semibold">
                  {formatDateAr(tabData.depositDate)}
                </span>
              </div>

              <span className="text-sm text-white/50">
                {getDayName(tabData.depositDate)}
              </span>

              {/* Weekend adjustment note */}
              {tabData.isAdjusted && (
                <div className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <svg
                    className="w-4 h-4 text-amber-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                    />
                  </svg>
                  <span className="text-xs sm:text-sm text-amber-300">
                    {isAr
                      ? "تم تقديم الموعد بسبب عطلة نهاية الأسبوع"
                      : "Date adjusted due to weekend"}
                  </span>
                </div>
              )}
            </div>

            {/* Authority badge */}
            <div className="mt-6 text-xs text-white/30 text-center">
              {isAr ? "المصدر: " : "Source: "}
              <a
                href={activePayment.authorityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/20 hover:text-white/50 transition-colors"
              >
                {activePayment.authority}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/5 to-transparent dark:from-black/10 pointer-events-none" />
    </section>
  );
}
