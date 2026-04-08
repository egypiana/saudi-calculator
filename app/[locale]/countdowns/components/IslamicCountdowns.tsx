"use client";

import CountdownMiniCard from "./CountdownMiniCard";

interface IslamicCountdownsProps {
  locale: string;
}

const islamicEvents = [
  {
    id: "ramadan",
    title: "شهر رمضان المبارك",
    subtitle: "موعد بداية شهر الصيام والعبادة",
    icon: "🌙",
    color: "#7c3aed",
    href: "/countdowns/ramadan",
    targetDate: "2027-02-08",
    badge: "الأعلى زيارةً",
  },
  {
    id: "eid-fitr",
    title: "عيد الفطر",
    subtitle: "موعد أول أيام عيد الفطر المبارك",
    icon: "🎉",
    color: "#059669",
    href: "/countdowns/eid-fitr",
    targetDate: "2027-03-10",
  },
  {
    id: "eid-adha",
    title: "عيد الأضحى",
    subtitle: "موعد أول أيام عيد الأضحى المبارك",
    icon: "🐑",
    color: "#d97706",
    href: "/countdowns/eid-adha",
    targetDate: "2027-05-17",
  },
  {
    id: "hajj",
    title: "موسم الحج",
    subtitle: "موعد بداية مناسك الحج",
    icon: "🕋",
    color: "#1d4ed8",
    href: "/countdowns/hajj",
    targetDate: "2027-05-13",
  },
  {
    id: "laylatul-qadr",
    title: "ليلة القدر",
    subtitle: "الليلة المباركة خير من ألف شهر",
    icon: "✨",
    color: "#6d28d9",
    href: "/countdowns/laylatul-qadr",
    targetDate: "2027-03-05",
  },
  {
    id: "arafah",
    title: "يوم عرفة",
    subtitle: "خير يوم طلعت عليه الشمس",
    icon: "⛰️",
    color: "#0891b2",
    href: "/countdowns/eid-adha",
    targetDate: "2027-05-16",
  },
  {
    id: "hijri-new-year",
    title: "رأس السنة الهجرية",
    subtitle: "بداية العام الهجري الجديد",
    icon: "🗓️",
    color: "#4f46e5",
    href: "/countdowns/national-day",
    targetDate: "2027-07-07",
  },
  {
    id: "new-year",
    title: "رأس السنة الميلادية",
    subtitle: "بداية العام الميلادي الجديد",
    icon: "🎆",
    color: "#be185d",
    href: "/countdowns/national-day",
    targetDate: "2028-01-01",
  },
  {
    id: "ashura",
    title: "يوم عاشوراء",
    subtitle: "اليوم العاشر من شهر محرم",
    icon: "📿",
    color: "#047857",
    href: "/countdowns/national-day",
    targetDate: "2027-07-16",
  },
  {
    id: "mawlid",
    title: "المولد النبوي",
    subtitle: "ذكرى مولد النبي محمد ﷺ",
    icon: "🕌",
    color: "#0d9488",
    href: "/countdowns/national-day",
    targetDate: "2027-09-20",
  },
];

export default function IslamicCountdowns({ locale }: IslamicCountdownsProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        🌙 عدادات الأحداث الإسلامية
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {islamicEvents.map((event) => (
          <CountdownMiniCard
            key={event.id}
            id={event.id}
            title={event.title}
            subtitle={event.subtitle}
            icon={event.icon}
            color={event.color}
            href={event.href}
            targetDate={event.targetDate}
            badge={event.badge}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}
