"use client";

import { useState, useEffect, useCallback } from "react";

const ICONS = ["🎉", "✈️", "💍", "🎓", "🏠", "💼", "🏥", "⚽"];

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string, targetTime: string): TimeLeft | null {
  const target = new Date(`${targetDate}T${targetTime || "00:00"}:00`);
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function toArabicDigits(num: number): string {
  return num.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

export default function CustomCountdownBuilder() {
  const [eventName, setEventName] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [targetTime, setTargetTime] = useState("00:00");
  const [selectedIcon, setSelectedIcon] = useState("🎉");
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [copied, setCopied] = useState(false);

  // Load from URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const date = params.get("date");
    const icon = params.get("icon");
    const time = params.get("time");

    if (name) setEventName(decodeURIComponent(name));
    if (date) setTargetDate(date);
    if (time) setTargetTime(time);
    if (icon && ICONS.includes(icon)) setSelectedIcon(icon);

    if (name && date) {
      setIsActive(true);
    }
  }, []);

  // Countdown interval
  useEffect(() => {
    if (!isActive || !targetDate) return;

    const tick = () => {
      const tl = calculateTimeLeft(targetDate, targetTime);
      setTimeLeft(tl);
      if (!tl) setIsActive(false);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isActive, targetDate, targetTime]);

  const handleStart = useCallback(() => {
    if (!eventName.trim() || !targetDate) return;
    setIsActive(true);
  }, [eventName, targetDate]);

  const handleReset = useCallback(() => {
    setIsActive(false);
    setTimeLeft(null);
    setEventName("");
    setTargetDate("");
    setTargetTime("00:00");
    setSelectedIcon("🎉");
    // Clear URL params
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  const handleShare = useCallback(() => {
    const params = new URLSearchParams({
      name: eventName,
      date: targetDate,
      icon: selectedIcon,
      ...(targetTime !== "00:00" && { time: targetTime }),
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [eventName, targetDate, targetTime, selectedIcon]);

  return (
    <div className="bg-white dark:bg-dark-surface border border-green-100 dark:border-green-900/30 rounded-2xl p-6 sm:p-8 shadow-sm bg-gradient-to-br from-green-50/50 to-white dark:from-green-950/10 dark:to-dark-surface">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        ⏱️ أنشئ عدادك التنازلي
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        حدد تاريخاً ووصفاً وشاهد العد ينطلق فوراً
      </p>

      {!isActive ? (
        <div className="space-y-4">
          {/* Event name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              اسم المناسبة
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="اكتب اسم مناسبتك..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Date and time row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                التاريخ المستهدف
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                الوقت (اختياري)
              </label>
              <input
                type="time"
                value={targetTime}
                onChange={(e) => setTargetTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Icon selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              اختر أيقونة
            </label>
            <div className="flex flex-wrap gap-2">
              {ICONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setSelectedIcon(icon)}
                  className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all ${
                    selectedIcon === icon
                      ? "border-2 border-primary-500 bg-primary-50 dark:bg-primary-900/30 shadow-md scale-110"
                      : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Start button */}
          <button
            type="button"
            onClick={handleStart}
            disabled={!eventName.trim() || !targetDate}
            className="w-full sm:w-auto px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            ابدأ العداد &larr;
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active countdown header */}
          <div className="text-center">
            <span className="text-4xl mb-2 block">{selectedIcon}</span>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {eventName}
            </h3>
          </div>

          {/* Countdown boxes */}
          {timeLeft ? (
            <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-lg mx-auto">
              {[
                { value: timeLeft.days, label: "يوم" },
                { value: timeLeft.hours, label: "ساعة" },
                { value: timeLeft.minutes, label: "دقيقة" },
                { value: timeLeft.seconds, label: "ثانية" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-4 text-center backdrop-blur-sm"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-primary-700 dark:text-primary-300">
                    {toArabicDigits(item.value)}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-lg font-bold text-primary-600 dark:text-primary-400">
              انتهى الوقت! 🎊
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-md"
            >
              {copied ? "تم النسخ ✓" : "مشاركة الرابط 🔗"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-xl transition-all"
            >
              إعادة تعيين
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
