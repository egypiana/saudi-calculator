/**
 * Comprehensive Time Calculator
 * Time difference, duration math, date difference, work hours, unit conversion
 */

export type TimeCalcMode = "difference" | "add-subtract" | "date-diff" | "work-hours" | "converter";

export interface TimeValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimeDifferenceInput {
  startHour: number;
  startMinute: number;
  startSecond: number;
  startPeriod: "AM" | "PM";
  endHour: number;
  endMinute: number;
  endSecond: number;
  endPeriod: "AM" | "PM";
}

export interface TimeDifferenceResult {
  totalSeconds: number;
  totalMinutes: number;
  totalHours: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
  crossesMidnight: boolean;
}

export interface DateDifferenceInput {
  startDate: string; // YYYY-MM-DD
  endDate: string;
}

export interface DateDifferenceResult {
  totalDays: number;
  years: number;
  months: number;
  days: number;
  weeks: number;
  remainingDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  totalWeeks: number;
  formatted: string;
  formattedDetailed: string;
}

export interface AddSubtractInput {
  baseHour: number;
  baseMinute: number;
  baseSecond: number;
  basePeriod: "AM" | "PM";
  operation: "add" | "subtract";
  addDays: number;
  addHours: number;
  addMinutes: number;
  addSeconds: number;
}

export interface AddSubtractResult {
  resultHour: number;
  resultMinute: number;
  resultSecond: number;
  resultPeriod: "AM" | "PM";
  formatted12: string;
  formatted24: string;
  daysDiff: number;
  dayLabel: string;
}

export interface WorkHoursInput {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  breakMinutes: number;
  daysPerWeek: number;
  hourlyRate: number;
}

export interface WorkHoursResult {
  dailyHours: number;
  dailyMinutes: number;
  weeklyHours: number;
  monthlyHours: number;
  dailyPay: number;
  weeklyPay: number;
  monthlyPay: number;
  netDailyHours: number;
  breakHours: number;
  formatted: string;
}

export interface ConversionResult {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
  years: number;
}

// ====== Calculations ======

function to24Hour(hour: number, period: "AM" | "PM"): number {
  if (period === "AM") return hour === 12 ? 0 : hour;
  return hour === 12 ? 12 : hour + 12;
}

function to12Hour(hour24: number): { hour: number; period: "AM" | "PM" } {
  if (hour24 === 0) return { hour: 12, period: "AM" };
  if (hour24 < 12) return { hour: hour24, period: "AM" };
  if (hour24 === 12) return { hour: 12, period: "PM" };
  return { hour: hour24 - 12, period: "PM" };
}

export function calculateTimeDifference(input: TimeDifferenceInput): TimeDifferenceResult {
  const startSec = to24Hour(input.startHour, input.startPeriod) * 3600 + input.startMinute * 60 + input.startSecond;
  const endSec = to24Hour(input.endHour, input.endPeriod) * 3600 + input.endMinute * 60 + input.endSecond;

  let diffSec = endSec - startSec;
  const crossesMidnight = diffSec < 0;
  if (diffSec < 0) diffSec += 86400; // add 24 hours

  const days = Math.floor(diffSec / 86400);
  const hours = Math.floor((diffSec % 86400) / 3600);
  const minutes = Math.floor((diffSec % 3600) / 60);
  const seconds = diffSec % 60;

  return {
    totalSeconds: diffSec,
    totalMinutes: +(diffSec / 60).toFixed(2),
    totalHours: +(diffSec / 3600).toFixed(4),
    days,
    hours,
    minutes,
    seconds,
    formatted: `${hours} ساعة و ${minutes} دقيقة و ${seconds} ثانية`,
    crossesMidnight,
  };
}

export function calculateDateDifference(input: DateDifferenceInput): DateDifferenceResult | null {
  if (!input.startDate || !input.endDate) return null;

  const start = new Date(input.startDate);
  const end = new Date(input.endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

  const diffMs = Math.abs(end.getTime() - start.getTime());
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = +(totalDays / 7).toFixed(2);

  // Calculate years, months, days
  const earlier = start < end ? start : end;
  const later = start < end ? end : start;

  let years = later.getFullYear() - earlier.getFullYear();
  let months = later.getMonth() - earlier.getMonth();
  let days = later.getDate() - earlier.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(later.getFullYear(), later.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "سنة" : "سنوات"}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? "شهر" : "أشهر"}`);
  if (days > 0) parts.push(`${days} ${days === 1 ? "يوم" : "أيام"}`);

  return {
    totalDays,
    years,
    months,
    days,
    weeks,
    remainingDays,
    totalHours: totalDays * 24,
    totalMinutes: totalDays * 24 * 60,
    totalSeconds: totalDays * 24 * 60 * 60,
    totalWeeks,
    formatted: parts.join(" و ") || "0 أيام",
    formattedDetailed: `${totalDays} يوم (${weeks} أسبوع و ${remainingDays} يوم)`,
  };
}

export function calculateAddSubtract(input: AddSubtractInput): AddSubtractResult {
  const baseSec = to24Hour(input.baseHour, input.basePeriod) * 3600 + input.baseMinute * 60 + input.baseSecond;
  const addSec = input.addDays * 86400 + input.addHours * 3600 + input.addMinutes * 60 + input.addSeconds;

  let resultSec: number;
  if (input.operation === "add") {
    resultSec = baseSec + addSec;
  } else {
    resultSec = baseSec - addSec;
  }

  const daysDiff = Math.floor(resultSec / 86400);
  resultSec = ((resultSec % 86400) + 86400) % 86400; // normalize to 0-86399

  const hour24 = Math.floor(resultSec / 3600);
  const minute = Math.floor((resultSec % 3600) / 60);
  const second = resultSec % 60;
  const { hour, period } = to12Hour(hour24);

  let dayLabel = "";
  if (daysDiff > 0) dayLabel = `(+${daysDiff} يوم)`;
  else if (daysDiff < 0) dayLabel = `(${daysDiff} يوم)`;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return {
    resultHour: hour,
    resultMinute: minute,
    resultSecond: second,
    resultPeriod: period,
    formatted12: `${pad(hour)}:${pad(minute)}:${pad(second)} ${period === "AM" ? "ص" : "م"}`,
    formatted24: `${pad(hour24)}:${pad(minute)}:${pad(second)}`,
    daysDiff,
    dayLabel,
  };
}

export function calculateWorkHours(input: WorkHoursInput): WorkHoursResult {
  const startMin = input.startHour * 60 + input.startMinute;
  const endMin = input.endHour * 60 + input.endMinute;

  let totalMin = endMin - startMin;
  if (totalMin < 0) totalMin += 24 * 60;

  const netMin = Math.max(0, totalMin - input.breakMinutes);
  const netHours = +(netMin / 60).toFixed(2);

  const dailyHours = Math.floor(netMin / 60);
  const dailyMinutes = netMin % 60;
  const weeklyHours = +(netHours * input.daysPerWeek).toFixed(2);
  const monthlyHours = +(weeklyHours * 4.33).toFixed(2);

  const dailyPay = netHours * input.hourlyRate;
  const weeklyPay = dailyPay * input.daysPerWeek;
  const monthlyPay = weeklyPay * 4.33;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return {
    dailyHours,
    dailyMinutes,
    weeklyHours,
    monthlyHours,
    dailyPay,
    weeklyPay,
    monthlyPay,
    netDailyHours: netHours,
    breakHours: +(input.breakMinutes / 60).toFixed(2),
    formatted: `${pad(dailyHours)}:${pad(dailyMinutes)}`,
  };
}

export function convertTimeUnits(value: number, fromUnit: string): ConversionResult {
  let totalSeconds = 0;

  switch (fromUnit) {
    case "seconds": totalSeconds = value; break;
    case "minutes": totalSeconds = value * 60; break;
    case "hours": totalSeconds = value * 3600; break;
    case "days": totalSeconds = value * 86400; break;
    case "weeks": totalSeconds = value * 604800; break;
    case "months": totalSeconds = value * 2629746; break; // avg month
    case "years": totalSeconds = value * 31556952; break; // avg year
  }

  return {
    seconds: +totalSeconds.toFixed(2),
    minutes: +(totalSeconds / 60).toFixed(4),
    hours: +(totalSeconds / 3600).toFixed(4),
    days: +(totalSeconds / 86400).toFixed(4),
    weeks: +(totalSeconds / 604800).toFixed(4),
    months: +(totalSeconds / 2629746).toFixed(4),
    years: +(totalSeconds / 31556952).toFixed(6),
  };
}

// Utilities
export const fmt = (n: number) => n.toLocaleString("ar-SA", { maximumFractionDigits: 0 });
export const fmtDec = (n: number) => n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });
export const pad = (n: number) => n.toString().padStart(2, "0");

export const TIME_UNITS = [
  { value: "seconds", labelAr: "ثوانٍ", icon: "⏱️" },
  { value: "minutes", labelAr: "دقائق", icon: "⏲️" },
  { value: "hours", labelAr: "ساعات", icon: "🕐" },
  { value: "days", labelAr: "أيام", icon: "📅" },
  { value: "weeks", labelAr: "أسابيع", icon: "📆" },
  { value: "months", labelAr: "أشهر", icon: "🗓️" },
  { value: "years", labelAr: "سنوات", icon: "📊" },
];

export const WORK_PRESETS = [
  { labelAr: "دوام حكومي", start: "07:30", end: "14:30", breakMin: 0, days: 5 },
  { labelAr: "دوام خاص (8 ساعات)", start: "08:00", end: "17:00", breakMin: 60, days: 5 },
  { labelAr: "دوام خاص (9 ساعات)", start: "08:00", end: "18:00", breakMin: 60, days: 6 },
  { labelAr: "وردية صباحية", start: "06:00", end: "14:00", breakMin: 30, days: 6 },
  { labelAr: "وردية مسائية", start: "14:00", end: "22:00", breakMin: 30, days: 6 },
];
