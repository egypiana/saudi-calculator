// Saudi Salary & Payment Dates Data
// Government salaries: 27th Hijri month (adjusted for weekends)
// حساب المواطن: 10th Gregorian month
// التقاعد/التأمينات: 25th Gregorian month
// حافز: ~5th Hijri month

export interface SalaryMonth {
  month: number; // 1-12
  hijriMonth: string;
  hijriYear: number;
  gregorianDate: string; // YYYY-MM-DD (actual deposit date after weekend adjustment)
  originalDate: string; // Before weekend adjustment
  dayOfWeek: string;
  isAdjusted: boolean; // Was it moved due to weekend/holiday?
  note?: string;
}

export interface PaymentType {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  dayRule: string;
  authority: string;
  authorityUrl: string;
}

export const PAYMENT_TYPES: PaymentType[] = [
  {
    id: "government",
    nameAr: "الراتب الحكومي",
    nameEn: "Government Salary",
    icon: "💵",
    color: "#059669",
    gradient: "from-emerald-600 via-green-700 to-emerald-800",
    description: "رواتب موظفي القطاع الحكومي تُصرف يوم 27 من كل شهر هجري. إذا صادف يوم الجمعة أو السبت يُقدَّم ليوم الخميس.",
    dayRule: "٢٧ من كل شهر هجري",
    authority: "وزارة المالية",
    authorityUrl: "https://www.mof.gov.sa",
  },
  {
    id: "citizen-account",
    nameAr: "حساب المواطن",
    nameEn: "Citizen Account",
    icon: "🏦",
    color: "#7c3aed",
    gradient: "from-violet-600 via-purple-700 to-violet-800",
    description: "دعم حساب المواطن يُصرف يوم 10 من كل شهر ميلادي. إذا صادف عطلة نهاية الأسبوع يُقدَّم.",
    dayRule: "١٠ من كل شهر ميلادي",
    authority: "برنامج حساب المواطن",
    authorityUrl: "https://www.ca.gov.sa",
  },
  {
    id: "pension",
    nameAr: "التقاعد والتأمينات",
    nameEn: "Pension & Social Insurance",
    icon: "🏛️",
    color: "#0284c7",
    gradient: "from-sky-600 via-blue-700 to-sky-800",
    description: "معاشات التقاعد والتأمينات الاجتماعية تُصرف يوم 25 من كل شهر ميلادي. إذا صادف عطلة يُقدَّم.",
    dayRule: "٢٥ من كل شهر ميلادي",
    authority: "التأمينات الاجتماعية (GOSI)",
    authorityUrl: "https://www.gosi.gov.sa",
  },
  {
    id: "hafiz",
    nameAr: "حافز",
    nameEn: "Hafiz",
    icon: "📋",
    color: "#d97706",
    gradient: "from-amber-600 via-orange-700 to-amber-800",
    description: "إعانة حافز للباحثين عن عمل تُصرف في بداية كل شهر هجري تقريباً (حوالي اليوم 5). المبلغ 2,000 ريال شهرياً لمدة 12 شهراً.",
    dayRule: "~٥ من كل شهر هجري",
    authority: "صندوق تنمية الموارد البشرية (هدف)",
    authorityUrl: "https://www.hrdf.org.sa",
  },
];

const DAYS_AR: Record<number, string> = {
  0: "الأحد", 1: "الاثنين", 2: "الثلاثاء", 3: "الأربعاء",
  4: "الخميس", 5: "الجمعة", 6: "السبت",
};

const MONTHS_AR: Record<number, string> = {
  1: "يناير", 2: "فبراير", 3: "مارس", 4: "أبريل",
  5: "مايو", 6: "يونيو", 7: "يوليو", 8: "أغسطس",
  9: "سبتمبر", 10: "أكتوبر", 11: "نوفمبر", 12: "ديسمبر",
};

const HIJRI_MONTHS: Record<number, string> = {
  1: "محرم", 2: "صفر", 3: "ربيع الأول", 4: "ربيع الثاني",
  5: "جمادى الأولى", 6: "جمادى الآخرة", 7: "رجب", 8: "شعبان",
  9: "رمضان", 10: "شوال", 11: "ذو القعدة", 12: "ذو الحجة",
};

export function formatDateAr(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${parseInt(d)} ${MONTHS_AR[parseInt(m)]} ${y}`;
}

export function getDayName(dateStr: string): string {
  return DAYS_AR[new Date(dateStr + "T00:00:00").getDay()];
}

export function getMonthNameAr(month: number): string {
  return MONTHS_AR[month] || "";
}

export function getHijriMonthName(month: number): string {
  return HIJRI_MONTHS[month] || "";
}

// Adjust date to last working day if falls on weekend (Fri=5, Sat=6)
function adjustForWeekend(dateStr: string): { adjusted: string; isAdjusted: boolean } {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDay();
  if (day === 5) { // Friday → Thursday
    d.setDate(d.getDate() - 1);
    return { adjusted: d.toISOString().slice(0, 10), isAdjusted: true };
  }
  if (day === 6) { // Saturday → Thursday
    d.setDate(d.getDate() - 2);
    return { adjusted: d.toISOString().slice(0, 10), isAdjusted: true };
  }
  return { adjusted: dateStr, isAdjusted: false };
}

// Government salary dates — 27th Hijri of each month mapped to Gregorian
// Based on Umm Al-Qura calendar approximations for 1447-1449 AH
// Format: [hijriMonth, hijriYear, gregorianEquivalent]
const GOV_SALARY_RAW: [number, number, string][] = [
  // 1447 AH (2025-2026)
  [1, 1447, "2025-07-22"],   // 27 Muharram 1447
  [2, 1447, "2025-08-20"],   // 27 Safar 1447
  [3, 1447, "2025-09-19"],   // 27 Rabi I 1447
  [4, 1447, "2025-10-18"],   // 27 Rabi II 1447
  [5, 1447, "2025-11-17"],   // 27 Jumada I 1447
  [6, 1447, "2025-12-16"],   // 27 Jumada II 1447
  [7, 1447, "2026-01-15"],   // 27 Rajab 1447
  [8, 1447, "2026-02-13"],   // 27 Shaban 1447
  [9, 1447, "2026-03-15"],   // 27 Ramadan 1447
  [10, 1447, "2026-04-13"],  // 27 Shawwal 1447
  [11, 1447, "2026-05-13"],  // 27 Dhul Qi'dah 1447
  [12, 1447, "2026-06-11"],  // 27 Dhul Hijjah 1447
  // 1448 AH (2026-2027)
  [1, 1448, "2026-07-11"],   // 27 Muharram 1448
  [2, 1448, "2026-08-09"],   // 27 Safar 1448
  [3, 1448, "2026-09-08"],   // 27 Rabi I 1448
  [4, 1448, "2026-10-07"],   // 27 Rabi II 1448
  [5, 1448, "2026-11-06"],   // 27 Jumada I 1448
  [6, 1448, "2026-12-05"],   // 27 Jumada II 1448
  [7, 1448, "2027-01-04"],   // 27 Rajab 1448
  [8, 1448, "2027-02-02"],   // 27 Shaban 1448
  [9, 1448, "2027-03-04"],   // 27 Ramadan 1448
  [10, 1448, "2027-04-02"],  // 27 Shawwal 1448
  [11, 1448, "2027-05-02"],  // 27 Dhul Qi'dah 1448
  [12, 1448, "2027-05-31"],  // 27 Dhul Hijjah 1448
];

export interface ProcessedSalaryDate {
  hijriMonth: number;
  hijriMonthName: string;
  hijriYear: number;
  originalDate: string;
  depositDate: string;
  dayOfWeek: string;
  isAdjusted: boolean;
  isPast: boolean;
}

function buildGovDates(): ProcessedSalaryDate[] {
  return GOV_SALARY_RAW.map(([hijriMonth, hijriYear, gregDate]) => {
    const { adjusted, isAdjusted } = adjustForWeekend(gregDate);
    const now = new Date();
    const depositD = new Date(adjusted + "T00:00:00");
    return {
      hijriMonth,
      hijriMonthName: HIJRI_MONTHS[hijriMonth],
      hijriYear,
      originalDate: gregDate,
      depositDate: adjusted,
      dayOfWeek: getDayName(adjusted),
      isAdjusted,
      isPast: now > depositD,
    };
  });
}

export const GOV_SALARY_DATES = buildGovDates();

// Get next government salary date
export function getNextGovSalary(): ProcessedSalaryDate | null {
  const today = new Date().toISOString().slice(0, 10);
  return GOV_SALARY_DATES.find((d) => d.depositDate >= today) || null;
}

// Get next N upcoming government salary dates
export function getUpcomingGovSalaries(count: number): ProcessedSalaryDate[] {
  const today = new Date().toISOString().slice(0, 10);
  return GOV_SALARY_DATES.filter((d) => d.depositDate >= today).slice(0, count);
}

// Calculate next monthly payment date (for Gregorian-based payments)
export function getNextMonthlyDate(dayOfMonth: number): string {
  const now = new Date();
  let target = new Date(now.getFullYear(), now.getMonth(), dayOfMonth);
  if (target <= now) {
    target = new Date(now.getFullYear(), now.getMonth() + 1, dayOfMonth);
  }
  const { adjusted } = adjustForWeekend(target.toISOString().slice(0, 10));
  return adjusted;
}

// Generate 12 months of Gregorian-based payment dates
export function generateMonthlyDates(dayOfMonth: number, startYear: number): ProcessedSalaryDate[] {
  const results: ProcessedSalaryDate[] = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const d = new Date(startYear, i, dayOfMonth);
    const dateStr = d.toISOString().slice(0, 10);
    const { adjusted, isAdjusted } = adjustForWeekend(dateStr);
    const depositD = new Date(adjusted + "T00:00:00");

    results.push({
      hijriMonth: i + 1,
      hijriMonthName: MONTHS_AR[i + 1],
      hijriYear: startYear,
      originalDate: dateStr,
      depositDate: adjusted,
      dayOfWeek: getDayName(adjusted),
      isAdjusted,
      isPast: now > depositD,
    });
  }
  return results;
}

// Citizen Account dates (10th Gregorian)
export function getCitizenAccountDates(year: number) {
  return generateMonthlyDates(10, year);
}

// Pension dates (25th Gregorian)
export function getPensionDates(year: number) {
  return generateMonthlyDates(25, year);
}

// Time until a specific date
export function getTimeUntil(dateStr: string): { days: number; hours: number; minutes: number; seconds: number } {
  const target = new Date(dateStr + "T00:00:00").getTime();
  const now = new Date().getTime();
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}
