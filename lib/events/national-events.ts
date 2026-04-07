export interface NationalEvent {
  id: string;
  nameKey: string;
  icon: string;
  gradient: string;
  month: number; // 1-based
  day: number;
}

export const NATIONAL_EVENTS: NationalEvent[] = [
  {
    id: "national-day",
    nameKey: "nationalDay",
    icon: "🇸🇦",
    gradient: "from-green-600 to-green-800",
    month: 9,
    day: 23,
  },
  {
    id: "foundation-day",
    nameKey: "foundationDay",
    icon: "🏛️",
    gradient: "from-amber-600 to-yellow-700",
    month: 2,
    day: 22,
  },
  {
    id: "flag-day",
    nameKey: "flagDay",
    icon: "🏴",
    gradient: "from-green-700 to-emerald-800",
    month: 3,
    day: 11,
  },
];

export function getNextNationalEventDate(eventId: string): Date | null {
  const event = NATIONAL_EVENTS.find((e) => e.id === eventId);
  if (!event) return null;

  const now = new Date();
  const thisYear = now.getFullYear();
  const thisYearDate = new Date(thisYear, event.month - 1, event.day);

  if (thisYearDate > now) return thisYearDate;
  return new Date(thisYear + 1, event.month - 1, event.day);
}
