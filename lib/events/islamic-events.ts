export interface IslamicEvent {
  id: string;
  nameKey: string;
  questionKey: string;
  icon: string;
  gradient: string;
  dates: { hijriYear: number; gregorianStart: Date; gregorianEnd?: Date }[];
}

// تواريخ المناسبات الإسلامية المحسوبة فلكياً (تقريبية)
// يتم تحديثها سنوياً بناءً على إعلان أم القرى
export const ISLAMIC_EVENTS: IslamicEvent[] = [
  {
    id: "ramadan",
    nameKey: "ramadan",
    questionKey: "ramadanQuestion",
    icon: "🌙",
    gradient: "from-purple-600 to-indigo-700",
    dates: [
      { hijriYear: 1446, gregorianStart: new Date("2025-03-01"), gregorianEnd: new Date("2025-03-30") },
      { hijriYear: 1447, gregorianStart: new Date("2026-02-18"), gregorianEnd: new Date("2026-03-19") },
      { hijriYear: 1448, gregorianStart: new Date("2027-02-07"), gregorianEnd: new Date("2027-03-08") },
    ],
  },
  {
    id: "eid-fitr",
    nameKey: "eidFitr",
    questionKey: "eidFitrQuestion",
    icon: "🎉",
    gradient: "from-emerald-500 to-teal-600",
    dates: [
      { hijriYear: 1446, gregorianStart: new Date("2025-03-30") },
      { hijriYear: 1447, gregorianStart: new Date("2026-03-20") },
      { hijriYear: 1448, gregorianStart: new Date("2027-03-09") },
    ],
  },
  {
    id: "eid-adha",
    nameKey: "eidAdha",
    questionKey: "eidAdhaQuestion",
    icon: "🐑",
    gradient: "from-amber-500 to-orange-600",
    dates: [
      { hijriYear: 1446, gregorianStart: new Date("2025-06-06") },
      { hijriYear: 1447, gregorianStart: new Date("2026-05-27") },
      { hijriYear: 1448, gregorianStart: new Date("2027-05-16") },
    ],
  },
  {
    id: "hajj",
    nameKey: "hajj",
    questionKey: "hajj",
    icon: "🕋",
    gradient: "from-stone-600 to-stone-800",
    dates: [
      { hijriYear: 1446, gregorianStart: new Date("2025-06-04") },
      { hijriYear: 1447, gregorianStart: new Date("2026-05-25") },
      { hijriYear: 1448, gregorianStart: new Date("2027-05-14") },
    ],
  },
  {
    id: "laylatul-qadr",
    nameKey: "lailatulQadr",
    questionKey: "lailatulQadr",
    icon: "✨",
    gradient: "from-violet-600 to-purple-800",
    dates: [
      { hijriYear: 1446, gregorianStart: new Date("2025-03-27") },
      { hijriYear: 1447, gregorianStart: new Date("2026-03-16") },
      { hijriYear: 1448, gregorianStart: new Date("2027-03-05") },
    ],
  },
];

export function getNextEventDate(eventId: string): Date | null {
  const event = ISLAMIC_EVENTS.find((e) => e.id === eventId);
  if (!event) return null;
  const now = new Date();
  for (const d of event.dates) {
    if (d.gregorianStart > now) return d.gregorianStart;
  }
  return null;
}

export function getEventById(eventId: string): IslamicEvent | undefined {
  return ISLAMIC_EVENTS.find((e) => e.id === eventId);
}
