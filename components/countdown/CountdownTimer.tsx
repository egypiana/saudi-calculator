"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface CountdownTimerProps {
  targetDate: Date;
  size?: "sm" | "md" | "lg";
  className?: string;
  onComplete?: () => void;
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

const sizeClasses = {
  sm: {
    container: "gap-2",
    box: "w-14 h-14 sm:w-16 sm:h-16",
    digit: "text-lg sm:text-xl",
    label: "text-[10px]",
  },
  md: {
    container: "gap-3",
    box: "w-18 h-18 sm:w-20 sm:h-20",
    digit: "text-2xl sm:text-3xl",
    label: "text-xs",
  },
  lg: {
    container: "gap-3 sm:gap-4",
    box: "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28",
    digit: "text-3xl sm:text-4xl md:text-5xl",
    label: "text-xs sm:text-sm",
  },
};

export default function CountdownTimer({
  targetDate,
  size = "lg",
  className = "",
  onComplete,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("countdown");

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      const tl = calculateTimeLeft(targetDate);
      setTimeLeft(tl);
      if (tl.total <= 0) {
        clearInterval(timer);
        onComplete?.();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const s = sizeClasses[size];

  if (!mounted) {
    return (
      <div className={`flex items-center justify-center ${s.container} ${className}`}>
        {["--", "--", "--", "--"].map((v, i) => (
          <div
            key={i}
            className={`countdown-box flex flex-col items-center justify-center ${s.box}`}
          >
            <span className={`countdown-digit ${s.digit}`}>{v}</span>
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft.total <= 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 animate-countdown-pulse">
          {t("eventArrived")}
        </p>
      </div>
    );
  }

  const units = [
    { value: timeLeft.days, label: t("days") },
    { value: timeLeft.hours, label: t("hours") },
    { value: timeLeft.minutes, label: t("minutes") },
    { value: timeLeft.seconds, label: t("seconds") },
  ];

  return (
    <div className={`flex items-center justify-center ${s.container} ${className}`} dir="ltr">
      {units.map((unit, i) => (
        <div
          key={i}
          className={`countdown-box flex flex-col items-center justify-center ${s.box} shadow-lg`}
        >
          <span className={`countdown-digit ${s.digit}`}>
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className={`text-white/70 font-medium mt-0.5 ${s.label}`}>
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
