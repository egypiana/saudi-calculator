"use client";

import { useState, useEffect, useRef, useMemo } from "react";

interface ArafahHeroCounterProps {
  targetDate: string;
  year: number;
  hijri: string;
  eidAdhaDate: string;
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

export default function ArafahHeroCounter({
  targetDate,
  year,
  hijri,
  eidAdhaDate,
}: ArafahHeroCounterProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));
  const [copied, setCopied] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const prevSecondsRef = useRef<number>(timeLeft.seconds);

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        top: `${Math.floor(Math.random() * 100)}%`,
        left: `${Math.floor(Math.random() * 100)}%`,
        delay: `${(Math.random() * 3).toFixed(2)}s`,
        size: `${(Math.random() * 2.5 + 1).toFixed(1)}px`,
      })),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = calculateTimeLeft(targetDate);
      setTimeLeft(newTime);

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
    const text = `العد التنازلي ليوم عرفة ${year} - باقي ${timeLeft.days} يوم و ${timeLeft.hours} ساعة`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `يوم عرفة ${year}`, text });
      } catch {
        // user cancelled
      }
    }
  };

  const handleCopy = async () => {
    const text = `العد التنازلي ليوم عرفة ${year}\nباقي ${timeLeft.days} يوم و ${timeLeft.hours} ساعة و ${timeLeft.minutes} دقيقة\nيوم عرفة: ${formatArabicDate(targetDate)}\nعيد الأضحى: ${formatArabicDate(eidAdhaDate)}`;
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
      className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-amber-600 via-orange-700 to-orange-800 rounded-3xl px-6 py-16 md:py-20"
    >
      {/* Animated Sun Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="sun-particle absolute rounded-full bg-yellow-300 opacity-50"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Icon */}
      <div className="relative mb-8">
        <span className="text-6xl md:text-7xl drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">
          ⛰️
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold text-white text-center mb-3">
        الوقت المتبقي حتى يوم عرفة {year}
      </h1>

      {/* Subtitle */}
      <p className="text-white/60 text-sm md:text-base text-center mb-4">
        {hijri} &middot; ٩ ذو الحجة &middot; {formatArabicDate(targetDate)}
      </p>

      {/* Eid Al-Adha badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-sm mb-10">
        <span>🐑</span>
        <span>عيد الأضحى بعد يوم عرفة بيوم واحد &middot; {formatArabicDate(eidAdhaDate)}</span>
      </div>

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

      {/* Key Dates */}
      <div className="w-full max-w-xl mb-10">
        <h3 className="text-white/80 text-sm font-medium text-center mb-4">
          المواعيد المهمة
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "بداية الحج", date: formatArabicDate(targetDate).replace(/ \d{4}$/, ""), icon: "🕋" },
            { label: "يوم عرفة", date: formatArabicDate(targetDate).replace(/ \d{4}$/, ""), icon: "⛰️", highlight: true },
            { label: "عيد الأضحى", date: formatArabicDate(eidAdhaDate).replace(/ \d{4}$/, ""), icon: "🐑" },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex flex-col items-center bg-white/[0.06] backdrop-blur-sm border rounded-xl py-3 px-2 ${
                item.highlight
                  ? "border-yellow-400/50 bg-yellow-400/10"
                  : "border-white/[0.1]"
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className={`text-xs font-bold mb-1 ${
                item.highlight ? "text-yellow-300" : "text-white/80"
              }`}>
                {item.label}
              </span>
              <span className="text-[10px] md:text-xs text-white/60">
                {item.date}
              </span>
            </div>
          ))}
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

      {/* CSS for particle and flip animations */}
      <style jsx>{`
        .sun-particle {
          animation: float 3s ease-in-out infinite alternate;
        }
        @keyframes float {
          0% {
            opacity: 0.2;
            transform: scale(0.8) translateY(0);
          }
          100% {
            opacity: 0.7;
            transform: scale(1.3) translateY(-10px);
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
