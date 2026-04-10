/**
 * Advanced Age Calculator — حاسبة العمر المتقدمة
 * Supports Hijri + Gregorian, life stats, zodiac, planetary ages
 */

import { gregorianToHijri, formatHijriDate, type HijriDate } from "@/lib/hijri";

/* ═══════════════ Types ═══════════════ */

export interface AgeBreakdown {
  years: number;
  months: number;
  days: number;
}

export interface AgeInUnits {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface BirthInfo {
  dayOfWeek: string;
  dayOfWeekAr: string;
  season: string;
  seasonAr: string;
  zodiacSign: string;
  zodiacSignAr: string;
  zodiacEmoji: string;
  chineseZodiac: string;
  chineseZodiacAr: string;
  chineseZodiacEmoji: string;
  birthGregorian: string;
  birthHijri: string;
  hijriDate: HijriDate;
}

export interface LifeStats {
  heartbeats: number;
  breaths: number;
  sleepHours: number;
  mealsEaten: number;
  stepsWalked: number;
  wordsSpoken: number;
  blinks: number;
  laughs: number;
}

export interface NextBirthdayInfo {
  daysUntil: number;
  nextAge: number;
  nextDate: Date;
  nextDateFormatted: string;
  isToday: boolean;
}

export interface PlanetaryAge {
  planet: string;
  planetAr: string;
  emoji: string;
  age: number;
  yearDays: number;
}

export interface AgeResult {
  age: AgeBreakdown;
  ageHijri: AgeBreakdown;
  units: AgeInUnits;
  birthInfo: BirthInfo;
  lifeStats: LifeStats;
  nextBirthday: NextBirthdayInfo;
  planetaryAges: PlanetaryAge[];
  percentOfYear: number;
  percentOfLife: number; // assuming 75 years avg
  birthDate: Date;
}

/* ═══════════════ Constants ═══════════════ */

const DAYS_OF_WEEK_AR = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const DAYS_OF_WEEK_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const SEASONS = [
  { months: [12, 1, 2], en: "Winter", ar: "الشتاء" },
  { months: [3, 4, 5], en: "Spring", ar: "الربيع" },
  { months: [6, 7, 8], en: "Summer", ar: "الصيف" },
  { months: [9, 10, 11], en: "Autumn", ar: "الخريف" },
];

const ZODIAC_SIGNS = [
  { from: [1, 20], to: [2, 18], en: "Aquarius", ar: "الدلو", emoji: "♒" },
  { from: [2, 19], to: [3, 20], en: "Pisces", ar: "الحوت", emoji: "♓" },
  { from: [3, 21], to: [4, 19], en: "Aries", ar: "الحمل", emoji: "♈" },
  { from: [4, 20], to: [5, 20], en: "Taurus", ar: "الثور", emoji: "♉" },
  { from: [5, 21], to: [6, 20], en: "Gemini", ar: "الجوزاء", emoji: "♊" },
  { from: [6, 21], to: [7, 22], en: "Cancer", ar: "السرطان", emoji: "♋" },
  { from: [7, 23], to: [8, 22], en: "Leo", ar: "الأسد", emoji: "♌" },
  { from: [8, 23], to: [9, 22], en: "Virgo", ar: "العذراء", emoji: "♍" },
  { from: [9, 23], to: [10, 22], en: "Libra", ar: "الميزان", emoji: "♎" },
  { from: [10, 23], to: [11, 21], en: "Scorpio", ar: "العقرب", emoji: "♏" },
  { from: [11, 22], to: [12, 21], en: "Sagittarius", ar: "القوس", emoji: "♐" },
  { from: [12, 22], to: [1, 19], en: "Capricorn", ar: "الجدي", emoji: "♑" },
];

const CHINESE_ZODIAC = [
  { en: "Rat", ar: "الفأر", emoji: "🐀" },
  { en: "Ox", ar: "الثور", emoji: "🐂" },
  { en: "Tiger", ar: "النمر", emoji: "🐅" },
  { en: "Rabbit", ar: "الأرنب", emoji: "🐇" },
  { en: "Dragon", ar: "التنين", emoji: "🐉" },
  { en: "Snake", ar: "الأفعى", emoji: "🐍" },
  { en: "Horse", ar: "الحصان", emoji: "🐎" },
  { en: "Goat", ar: "الماعز", emoji: "🐐" },
  { en: "Monkey", ar: "القرد", emoji: "🐒" },
  { en: "Rooster", ar: "الديك", emoji: "🐓" },
  { en: "Dog", ar: "الكلب", emoji: "🐕" },
  { en: "Pig", ar: "الخنزير", emoji: "🐷" },
];

const PLANETS: { planet: string; planetAr: string; emoji: string; yearDays: number }[] = [
  { planet: "Mercury", planetAr: "عطارد", emoji: "☿️", yearDays: 87.97 },
  { planet: "Venus", planetAr: "الزهرة", emoji: "♀️", yearDays: 224.7 },
  { planet: "Earth", planetAr: "الأرض", emoji: "🌍", yearDays: 365.25 },
  { planet: "Mars", planetAr: "المريخ", emoji: "♂️", yearDays: 687 },
  { planet: "Jupiter", planetAr: "المشتري", emoji: "♃", yearDays: 4333 },
  { planet: "Saturn", planetAr: "زحل", emoji: "♄", yearDays: 10759 },
  { planet: "Uranus", planetAr: "أورانوس", emoji: "⛢", yearDays: 30687 },
  { planet: "Neptune", planetAr: "نبتون", emoji: "♆", yearDays: 60190 },
];

/* ═══════════════ Hijri to Gregorian (approximate) ═══════════════ */

export function hijriToGregorian(hYear: number, hMonth: number, hDay: number): Date {
  // Approximate conversion using the Julian Day Number algorithm
  const a = Math.floor((11 * hYear + 3) / 30);
  const jdn = hDay + Math.ceil(29.5001 * (hMonth - 1)) + (hYear - 1) * 354 + a + 1948440 - 385;

  // JDN to Gregorian
  const z = jdn;
  const aa = z;
  const alpha = Math.floor((aa - 1867216.25) / 36524.25);
  const aaa = aa + 1 + alpha - Math.floor(alpha / 4);
  const bb = aaa + 1524;
  const c = Math.floor((bb - 122.1) / 365.25);
  const d = Math.floor(365.25 * c);
  const e = Math.floor((bb - d) / 30.6001);

  const day = bb - d - Math.floor(30.6001 * e);
  const month = e < 14 ? e - 1 : e - 13;
  const year = month > 2 ? c - 4716 : c - 4715;

  return new Date(year, month - 1, day);
}

/* ═══════════════ Helper Functions ═══════════════ */

function getZodiacSign(month: number, day: number) {
  for (const sign of ZODIAC_SIGNS) {
    const [fm, fd] = sign.from;
    const [tm, td] = sign.to;

    if (fm === 12 && tm === 1) {
      // Capricorn wraps around year
      if ((month === 12 && day >= fd) || (month === 1 && day <= td)) return sign;
    } else {
      if ((month === fm && day >= fd) || (month === tm && day <= td)) return sign;
      if (month > fm && month < tm) return sign;
    }
  }
  return ZODIAC_SIGNS[0]; // fallback
}

function getChineseZodiac(year: number) {
  const index = ((year - 4) % 12 + 12) % 12;
  return CHINESE_ZODIAC[index];
}

function getSeason(month: number) {
  return SEASONS.find((s) => s.months.includes(month)) ?? SEASONS[0];
}

function calcAgeBreakdown(birth: Date, today: Date): AgeBreakdown {
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function calcHijriAge(birthHijri: HijriDate, todayHijri: HijriDate): AgeBreakdown {
  let years = todayHijri.year - birthHijri.year;
  let months = todayHijri.month - birthHijri.month;
  let days = todayHijri.day - birthHijri.day;

  if (days < 0) {
    months--;
    days += 30; // approximate Hijri month length
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

/* ═══════════════ Main Calculation ═══════════════ */

export function calculateAge(birthDate: Date): AgeResult | null {
  const today = new Date();
  if (birthDate > today) return null;

  // Age breakdown (Gregorian)
  const age = calcAgeBreakdown(birthDate, today);

  // Hijri dates & age
  const birthHijri = gregorianToHijri(birthDate);
  const todayHijri = gregorianToHijri(today);
  const ageHijri = calcHijriAge(birthHijri, todayHijri);

  // Total time in different units
  const totalMs = today.getTime() - birthDate.getTime();
  const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor(totalMs / (1000 * 60));
  const totalSeconds = Math.floor(totalMs / 1000);

  const units: AgeInUnits = {
    years: age.years,
    months: age.years * 12 + age.months,
    weeks: Math.floor(totalDays / 7),
    days: totalDays,
    hours: totalHours,
    minutes: totalMinutes,
    seconds: totalSeconds,
  };

  // Birth info
  const birthMonth = birthDate.getMonth() + 1;
  const birthDay = birthDate.getDate();
  const zodiac = getZodiacSign(birthMonth, birthDay);
  const chinese = getChineseZodiac(birthDate.getFullYear());
  const season = getSeason(birthMonth);

  const birthInfo: BirthInfo = {
    dayOfWeek: DAYS_OF_WEEK_EN[birthDate.getDay()],
    dayOfWeekAr: DAYS_OF_WEEK_AR[birthDate.getDay()],
    season: season.en,
    seasonAr: season.ar,
    zodiacSign: zodiac.en,
    zodiacSignAr: zodiac.ar,
    zodiacEmoji: zodiac.emoji,
    chineseZodiac: chinese.en,
    chineseZodiacAr: chinese.ar,
    chineseZodiacEmoji: chinese.emoji,
    birthGregorian: birthDate.toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" }),
    birthHijri: formatHijriDate(birthHijri),
    hijriDate: birthHijri,
  };

  // Life statistics (approximate averages)
  const lifeStats: LifeStats = {
    heartbeats: totalMinutes * 72,          // avg 72 bpm
    breaths: totalMinutes * 16,             // avg 16 breaths/min
    sleepHours: Math.floor(totalDays * 8),  // avg 8 hours/day
    mealsEaten: totalDays * 3,              // 3 meals/day
    stepsWalked: totalDays * 7500,          // avg 7500 steps/day
    wordsSpoken: totalDays * 16000,         // avg 16000 words/day
    blinks: totalDays * 15000,             // avg 15000 blinks/day
    laughs: totalDays * 15,                // avg 15 laughs/day
  };

  // Next birthday
  let nextBday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBday <= today) {
    nextBday = new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
  }
  const daysUntil = Math.ceil((nextBday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isToday = daysUntil === 0 || (today.getMonth() === birthDate.getMonth() && today.getDate() === birthDate.getDate());

  const nextBirthday: NextBirthdayInfo = {
    daysUntil: isToday ? 0 : daysUntil,
    nextAge: age.years + 1,
    nextDate: nextBday,
    nextDateFormatted: nextBday.toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric", weekday: "long" }),
    isToday,
  };

  // Planetary ages
  const planetaryAges: PlanetaryAge[] = PLANETS.map((p) => ({
    ...p,
    age: parseFloat((totalDays / p.yearDays).toFixed(2)),
  }));

  // Percent of current year lived
  const yearStart = new Date(today.getFullYear(), 0, 1);
  const yearEnd = new Date(today.getFullYear() + 1, 0, 1);
  const percentOfYear = Math.round(((today.getTime() - yearStart.getTime()) / (yearEnd.getTime() - yearStart.getTime())) * 100);

  // Percent of average life (75 years)
  const percentOfLife = Math.min(100, Math.round((age.years / 75) * 100));

  return {
    age,
    ageHijri,
    units,
    birthInfo,
    lifeStats,
    nextBirthday,
    planetaryAges,
    percentOfYear,
    percentOfLife,
    birthDate,
  };
}

/* ═══════════════ Formatting ═══════════════ */

export function fmtNum(value: number): string {
  return value.toLocaleString("ar-SA");
}

export function fmtBigNum(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)} مليار`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} مليون`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)} ألف`;
  return fmtNum(value);
}
