export interface SalaryEvent {
  id: string;
  nameKey: string;
  icon: string;
  gradient: string;
  dayOfMonth: number;
}

export const SALARY_EVENTS: SalaryEvent[] = [
  {
    id: "salaries-dates",
    nameKey: "nextSalary",
    icon: "💵",
    gradient: "from-green-500 to-emerald-600",
    dayOfMonth: 27,
  },
  {
    id: "citizen-account",
    nameKey: "citizenAccount",
    icon: "🏦",
    gradient: "from-blue-500 to-blue-700",
    dayOfMonth: 10,
  },
  {
    id: "social-security",
    nameKey: "socialSecurity",
    icon: "🛡️",
    gradient: "from-teal-500 to-teal-700",
    dayOfMonth: 1,
  },
  {
    id: "pension-salaries",
    nameKey: "pension",
    icon: "👴",
    gradient: "from-indigo-500 to-indigo-700",
    dayOfMonth: 25,
  },
  {
    id: "saned-payment",
    nameKey: "saned",
    icon: "📋",
    gradient: "from-cyan-500 to-cyan-700",
    dayOfMonth: 5,
  },
  {
    id: "university-stipend",
    nameKey: "universityStipend",
    icon: "🎓",
    gradient: "from-violet-500 to-violet-700",
    dayOfMonth: 28,
  },
];

export function getNextMonthlyDate(dayOfMonth: number): Date {
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), dayOfMonth);

  if (thisMonth > now) return thisMonth;

  // إذا مضى اليوم في الشهر الحالي، ننتقل للشهر القادم
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, dayOfMonth);
  return nextMonth;
}

export function getSalaryEventById(eventId: string): SalaryEvent | undefined {
  return SALARY_EVENTS.find((e) => e.id === eventId);
}
