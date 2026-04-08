"use client";

import { useState, useEffect, useRef, useMemo } from "react";

interface RamadanHeroCounterProps {
  targetDate: string;
  year: number;
  hijri: string;
  dayOfWeek: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const target = new Date(targetDate + "T00:00:00").getTime();
  const now = new Date().getTime();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function getYearProgress(): number {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1).getTime();
  const endOfYear = new Date(now.getFullYear() + 1, 0, 1).getTime();
  return ((now.getTime() - startOfYear) / (endOfYear - startOfYear)) * 100;
}

export default function RamadanHeroCounter({
  targetDate,
  year,
  hijri,
  dayOfWeek,
}: RamadanHeroCounterProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));
  const [yearProgress, setYearProgress] = useState<number>(getYearProgress());
  const [copied, setCopied] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const prevSecondsRef = useRef<number>(timeLeft.seconds);

  const stars = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        top: `${Math.floor(Math.random() * 100)}%`,
        left: `${Math.floor(Math.random() * 100)}%`,
        delay: `${(Math.random() * 3).toFixed(2)}s`,
        size: `${(Math.random() * 2 + 1).toFixed(1)}px`,
      })),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = calculateTimeLeft(targetDate);
      setTimeLeft(newTime);
      setYearProgress(getYearProgress());

      if (newTime.seconds !== prevSecondsRef.current) {
        setFlipping(true);
        setTimeout(() => setFlipping(false), 300);
      }
      prevSecondsRef.current = newTime.seconds;
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const formatArabicDate = (dateStr: string): string => {
    const months: Record<string, string> = {
      "01": "يناير",
      "02": "فبراير",
      "03": "مارس",
      "04": "أبريل",
      "05": "مايو",
      "06": "يونيو",
      "07": "يوليو",
      "08": "أغسطس",
      "09": "سبتمبر",
      "10": "أكتوبر",
      "11": "نوفمبر",
      "12": "ديسمبر",
    };
    const [y, m, d] = dateStr.split("-");
    return `${parseInt(d)} ${months[m]} ${y}`;
  };

  const handleShare = async () => {
    const text = `العد التنازلي لرمضان ${year} - باقي ${timeLeft.days} يوم و ${timeLeft.hours} ساعة`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `رمضان ${year}`, text });
      } catch {
        // user cancelled
      }
    }
  };

  const handleCopy = async () => {
    const text = `العد التنازلي لرمضان ${year}\nباقي ${timeLeft.days} يوم و ${timeLeft.hours} ساعة و ${timeLeft.minutes} دقيقة\nتاريخ البدء: ${formatArabicDate(targetDate)} (${dayOfWeek})`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  const units: { label: string; value: number }[] = [
    { label: "يوم", value: timeLeft.days },
    { label: "ساعة", value: timeLeft.hours },
    { label: "دقيقة", value: timeLeft.minutes },
    { label: "ثانية", value: timeLeft.seconds },
  ];

  return (
    <section
      dir="rtl"
      className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#1a0a2e] to-[#24243e] rounded-3xl px-6 py-16 md:py-20"
    >
      {/* Animated Stars */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="star absolute rounded-full bg-white opacity-70"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
          }}
        />
      ))}

      {/* Crescent Moon SVG */}
      <div className="relative mb-8">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_20px_rgba(201,168,76,0.4)]"
        >
          <path
            d="M60 40C60 54.36 48.36 66 34 66C26.28 66 19.38 62.48 14.8 56.94C18.48 59.6 23.04 61.16 28 61.16C41.26 61.16 52 50.42 52 37.16C52 28.56 47.42 21.04 40.56 16.88C44.86 15.04 49.56 14 54.5 14C54.5 14 60 26 60 40Z"
            fill="#c9a84c"
          />
          <circle cx="22" cy="20" r="1.5" fill="#c9a84c" opacity="0.6" />
          <circle cx="58" cy="25" r="1" fill="#c9a84c" opacity="0.4" />
          <circle cx="15" cy="50" r="1.2" fill="#c9a84c" opacity="0.5" />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold text-white text-center mb-3">
        الوقت المتبقي حتى رمضان {year}
      </h1>

      {/* Subtitle */}
      <p className="text-white/60 text-sm md:text-base text-center mb-10">
        {hijri} &middot; {formatArabicDate(targetDate)} &middot; {dayOfWeek}
      </p>

      {/* Countdown Boxes */}
      <div className="grid grid-cols-4 gap-3 md:gap-5 w-full max-w-xl mb-10">
        {units.map((unit) => (
          <div
            key={unit.label}
            className={`flex flex-col items-center justify-center bg-white/[0.08] backdrop-blur-sm border border-white/[0.15] rounded-2xl py-5 md:py-7 transition-transform duration-300 ${
              unit.label === "ثانية" && flipping ? "animate-flip" : ""
            }`}
          >
            <span className="text-4xl md:text-6xl font-bold text-white tabular-nums leading-none">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-white/70 text-xs md:text-sm mt-2">{unit.label}</span>
          </div>
        ))}
      </div>

      {/* Year Progress Bar */}
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center justify-between text-white/50 text-xs mb-2">
          <span>تقدم السنة</span>
          <span>{yearProgress.toFixed(1)}%</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-l from-[#c9a84c] to-[#e8d48b] rounded-full transition-all duration-1000"
            style={{ width: `${yearProgress}%` }}
          />
        </div>
      </div>

      {/* Share / Copy Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm rounded-xl transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          مشاركة
        </button>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm rounded-xl transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {copied ? "تم النسخ!" : "نسخ"}
        </button>
      </div>

      {/* CSS for star twinkle and flip animations */}
      <style jsx>{`
        .star {
          animation: twinkle 2s ease-in-out infinite alternate;
        }
        @keyframes twinkle {
          0% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        .animate-flip {
          animation: flip 0.3s ease-in-out;
        }
        @keyframes flip {
          0% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.85);
          }
          100% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </section>
  );
}
