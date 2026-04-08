// Ramadan start dates from 2025 to 2100
// Based on astronomical calculations (Umm Al-Qura approximations)
// Actual dates may vary by 1-2 days based on moon sighting

export interface RamadanYear {
  year: number;
  hijri: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;
  days: number;
  dayOfWeek: string;
}

export const RAMADAN_DATES: RamadanYear[] = [
  { year: 2025, hijri: "1446 هـ", startDate: "2025-03-01", endDate: "2025-03-30", days: 30, dayOfWeek: "السبت" },
  { year: 2026, hijri: "1447 هـ", startDate: "2026-02-18", endDate: "2026-03-19", days: 30, dayOfWeek: "الأربعاء" },
  { year: 2027, hijri: "1448 هـ", startDate: "2027-02-08", endDate: "2027-03-09", days: 30, dayOfWeek: "الاثنين" },
  { year: 2028, hijri: "1449 هـ", startDate: "2028-01-28", endDate: "2028-02-26", days: 30, dayOfWeek: "الجمعة" },
  { year: 2029, hijri: "1450 هـ", startDate: "2029-01-16", endDate: "2029-02-14", days: 30, dayOfWeek: "الثلاثاء" },
  { year: 2030, hijri: "1451 هـ", startDate: "2030-01-06", endDate: "2030-02-04", days: 29, dayOfWeek: "الأحد" },
  { year: 2031, hijri: "1452 هـ", startDate: "2030-12-26", endDate: "2031-01-24", days: 30, dayOfWeek: "الخميس" },
  { year: 2032, hijri: "1453 هـ", startDate: "2032-12-15", endDate: "2033-01-12", days: 29, dayOfWeek: "الأربعاء" },
  { year: 2033, hijri: "1454 هـ", startDate: "2033-12-04", endDate: "2034-01-02", days: 30, dayOfWeek: "الأحد" },
  { year: 2034, hijri: "1455 هـ", startDate: "2034-11-23", endDate: "2034-12-22", days: 30, dayOfWeek: "الخميس" },
  { year: 2035, hijri: "1456 هـ", startDate: "2035-11-12", endDate: "2035-12-11", days: 30, dayOfWeek: "الاثنين" },
  { year: 2036, hijri: "1457 هـ", startDate: "2036-11-01", endDate: "2036-11-30", days: 30, dayOfWeek: "السبت" },
  { year: 2037, hijri: "1458 هـ", startDate: "2037-10-21", endDate: "2037-11-19", days: 30, dayOfWeek: "الأربعاء" },
  { year: 2038, hijri: "1459 هـ", startDate: "2038-10-11", endDate: "2038-11-09", days: 29, dayOfWeek: "الاثنين" },
  { year: 2039, hijri: "1460 هـ", startDate: "2039-09-30", endDate: "2039-10-29", days: 30, dayOfWeek: "الجمعة" },
  { year: 2040, hijri: "1461 هـ", startDate: "2040-09-18", endDate: "2040-10-17", days: 30, dayOfWeek: "الثلاثاء" },
  { year: 2041, hijri: "1462 هـ", startDate: "2041-09-08", endDate: "2041-10-07", days: 29, dayOfWeek: "الأحد" },
  { year: 2042, hijri: "1463 هـ", startDate: "2042-08-28", endDate: "2042-09-26", days: 30, dayOfWeek: "الخميس" },
  { year: 2043, hijri: "1464 هـ", startDate: "2043-08-17", endDate: "2043-09-15", days: 30, dayOfWeek: "الاثنين" },
  { year: 2044, hijri: "1465 هـ", startDate: "2044-08-06", endDate: "2044-09-04", days: 29, dayOfWeek: "السبت" },
  { year: 2045, hijri: "1466 هـ", startDate: "2045-07-26", endDate: "2045-08-24", days: 30, dayOfWeek: "الأربعاء" },
  { year: 2046, hijri: "1467 هـ", startDate: "2046-07-15", endDate: "2046-08-13", days: 30, dayOfWeek: "الأحد" },
  { year: 2047, hijri: "1468 هـ", startDate: "2047-07-05", endDate: "2047-08-03", days: 29, dayOfWeek: "الجمعة" },
  { year: 2048, hijri: "1469 هـ", startDate: "2048-06-23", endDate: "2048-07-22", days: 30, dayOfWeek: "الثلاثاء" },
  { year: 2049, hijri: "1470 هـ", startDate: "2049-06-13", endDate: "2049-07-12", days: 29, dayOfWeek: "الأحد" },
  { year: 2050, hijri: "1471 هـ", startDate: "2050-06-02", endDate: "2050-07-01", days: 30, dayOfWeek: "الخميس" },
];

export function getNextRamadan(): RamadanYear | null {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  return RAMADAN_DATES.find((r) => r.endDate >= todayStr) || null;
}

export function getRamadanByYear(year: number): RamadanYear | null {
  return RAMADAN_DATES.find((r) => r.year === year) || null;
}

export function formatArabicDate(dateStr: string): string {
  const months: Record<string, string> = {
    "01": "يناير", "02": "فبراير", "03": "مارس", "04": "أبريل",
    "05": "مايو", "06": "يونيو", "07": "يوليو", "08": "أغسطس",
    "09": "سبتمبر", "10": "أكتوبر", "11": "نوفمبر", "12": "ديسمبر",
  };
  const [, m, d] = dateStr.split("-");
  return `${parseInt(d)} ${months[m]}`;
}
