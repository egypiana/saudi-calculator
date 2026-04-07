"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import CountdownTimer from "./CountdownTimer";

interface CountdownCardProps {
  eventId: string;
  icon: string;
  titleKey: string;
  questionKey: string;
  targetDate: Date;
  gradient?: string;
  href: string;
}

export default function CountdownCard({
  icon,
  titleKey,
  questionKey,
  targetDate,
  gradient = "from-primary-600 to-primary-800",
  href,
}: CountdownCardProps) {
  const locale = useLocale();
  const t = useTranslations("events");
  const tc = useTranslations("countdown");

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
    >
      <div className="text-center">
        <span className="text-4xl mb-3 block">{icon}</span>
        <h3 className="text-white text-xl font-bold mb-1">{t(questionKey)}</h3>
        <p className="text-white/70 text-sm mb-4">{t(titleKey)}</p>
        <CountdownTimer targetDate={targetDate} size="sm" />
        <Link
          href={`/${locale}${href}`}
          className="inline-block mt-4 text-sm text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all"
        >
          {tc("moreDetails")}
        </Link>
      </div>
    </div>
  );
}
