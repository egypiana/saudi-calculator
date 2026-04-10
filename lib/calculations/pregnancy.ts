/**
 * Pregnancy & Due Date Calculator
 * حاسبة الحمل والولادة + العقيقة
 * Naegele's rule + weekly milestones + Aqiqah dates
 */

/* ═══════════════ Types ═══════════════ */

export type CalcMethod = "lmp" | "ultrasound" | "ivf";

export interface PregnancyInput {
  method: CalcMethod;
  lmpDate: string;           // yyyy-mm-dd (for LMP method)
  ultrasoundDate: string;    // yyyy-mm-dd (for ultrasound)
  ultrasoundWeeks: number;   // weeks at ultrasound
  ultrasoundDays: number;    // days at ultrasound
  ivfDate: string;           // yyyy-mm-dd (for IVF transfer)
  ivfDayTransfer: 3 | 5;     // Day 3 or Day 5 embryo
}

export interface TrimesterInfo {
  number: 1 | 2 | 3;
  nameAr: string;
  weeksRange: string;
  color: string;
  icon: string;
  descAr: string;
}

export interface WeekMilestone {
  week: number;
  sizeAr: string;
  weightGrams: string;
  lengthCm: string;
  developmentAr: string;
  trimester: 1 | 2 | 3;
}

export interface AqiqahInfo {
  day7: string;         // 7th day after birth
  day14: string;        // 14th day
  day21: string;        // 21st day
  descAr: string;
  rulesAr: string[];
}

export interface PregnancyResult {
  dueDate: Date;
  conceptionDate: Date;
  currentWeek: number;
  currentDay: number;          // day within current week (0-6)
  totalDaysPassed: number;
  totalDaysLeft: number;
  progressPercent: number;
  trimester: TrimesterInfo;
  // Key dates
  firstTrimesterEnd: Date;     // End of week 12
  secondTrimesterEnd: Date;    // End of week 27
  // Aqiqah
  aqiqah: AqiqahInfo;
  // Medical milestones
  firstUltrasound: { start: Date; end: Date };      // Week 6-8
  nuchalScan: { start: Date; end: Date };           // Week 11-14
  anatomyScan: { start: Date; end: Date };           // Week 18-22
  glucoseTest: { start: Date; end: Date };           // Week 24-28
  gbs: { start: Date; end: Date };                   // Week 35-37
  fullTerm: Date;                                    // Week 37
  // Weekly milestone
  currentMilestone: WeekMilestone | null;
  // Calculation details
  methodUsed: CalcMethod;
}

/* ═══════════════ Constants ═══════════════ */

export const TRIMESTERS: TrimesterInfo[] = [
  {
    number: 1, nameAr: "الثلث الأول", weeksRange: "1 - 12",
    color: "#ec4899", icon: "🌸",
    descAr: "تكوّن الأعضاء الرئيسية — القلب ينبض من الأسبوع 6",
  },
  {
    number: 2, nameAr: "الثلث الثاني", weeksRange: "13 - 27",
    color: "#f59e0b", icon: "🌻",
    descAr: "نمو سريع — تشعرين بحركة الجنين من الأسبوع 18-20",
  },
  {
    number: 3, nameAr: "الثلث الثالث", weeksRange: "28 - 40",
    color: "#6366f1", icon: "👶",
    descAr: "اكتمال الرئتين — استعدّي للولادة",
  },
];

export const WEEK_MILESTONES: WeekMilestone[] = [
  { week: 4, sizeAr: "بذرة خشخاش", weightGrams: "< 1", lengthCm: "0.1", developmentAr: "انغراس البويضة المخصبة في جدار الرحم", trimester: 1 },
  { week: 5, sizeAr: "حبة سمسم", weightGrams: "< 1", lengthCm: "0.2", developmentAr: "بداية تشكّل الجهاز العصبي والقلب", trimester: 1 },
  { week: 6, sizeAr: "حبة عدس", weightGrams: "< 1", lengthCm: "0.5", developmentAr: "القلب يبدأ بالنبض — يمكن سماعه بالسونار", trimester: 1 },
  { week: 7, sizeAr: "حبة توت", weightGrams: "< 1", lengthCm: "1.0", developmentAr: "تشكّل اليدين والقدمين", trimester: 1 },
  { week: 8, sizeAr: "حبة فاصوليا", weightGrams: "1", lengthCm: "1.6", developmentAr: "تشكّل ملامح الوجه والأصابع", trimester: 1 },
  { week: 9, sizeAr: "حبة عنب", weightGrams: "2", lengthCm: "2.3", developmentAr: "اختفاء الذيل الجنيني — بداية التحرّك", trimester: 1 },
  { week: 10, sizeAr: "زيتونة", weightGrams: "4", lengthCm: "3.1", developmentAr: "اكتمال أصابع اليدين والقدمين", trimester: 1 },
  { week: 11, sizeAr: "تينة", weightGrams: "7", lengthCm: "4.1", developmentAr: "بداية تشكّل الأظافر والشعر", trimester: 1 },
  { week: 12, sizeAr: "ليمونة", weightGrams: "14", lengthCm: "5.4", developmentAr: "اكتمال الأعضاء — يمكن سماع نبض القلب بوضوح", trimester: 1 },
  { week: 13, sizeAr: "خوخة", weightGrams: "23", lengthCm: "7.4", developmentAr: "بداية الثلث الثاني — بصمات الأصابع تتشكّل", trimester: 2 },
  { week: 14, sizeAr: "نكتارينة", weightGrams: "43", lengthCm: "8.7", developmentAr: "الجنين يبدأ بتعابير وجهه", trimester: 2 },
  { week: 16, sizeAr: "أفوكادو", weightGrams: "100", lengthCm: "11.6", developmentAr: "يمكن معرفة جنس الجنين", trimester: 2 },
  { week: 18, sizeAr: "فلفل حلو", weightGrams: "190", lengthCm: "14.2", developmentAr: "بداية الإحساس بحركة الجنين (الحمل الأول)", trimester: 2 },
  { week: 20, sizeAr: "موزة", weightGrams: "300", lengthCm: "25", developmentAr: "منتصف الحمل — فحص التشوهات (Anomaly Scan)", trimester: 2 },
  { week: 22, sizeAr: "بابايا صغيرة", weightGrams: "430", lengthCm: "27", developmentAr: "تطور حاسة السمع — يسمع صوتك!", trimester: 2 },
  { week: 24, sizeAr: "كوز ذرة", weightGrams: "600", lengthCm: "30", developmentAr: "فرصة البقاء خارج الرحم تزداد (حد الحياة)", trimester: 2 },
  { week: 26, sizeAr: "خس", weightGrams: "760", lengthCm: "35", developmentAr: "فتح العينين لأول مرة", trimester: 2 },
  { week: 28, sizeAr: "باذنجانة", weightGrams: "1000", lengthCm: "37", developmentAr: "بداية الثلث الثالث — يحلم الجنين!", trimester: 3 },
  { week: 30, sizeAr: "ملفوفة", weightGrams: "1300", lengthCm: "39", developmentAr: "نمو سريع للدماغ", trimester: 3 },
  { week: 32, sizeAr: "جيكاما", weightGrams: "1700", lengthCm: "42", developmentAr: "تمارين التنفس — رئتين شبه مكتملتين", trimester: 3 },
  { week: 34, sizeAr: "شمام", weightGrams: "2100", lengthCm: "44", developmentAr: "الجهاز المناعي يتطوّر", trimester: 3 },
  { week: 36, sizeAr: "رومين (خس كبير)", weightGrams: "2600", lengthCm: "47", developmentAr: "نزول الرأس للحوض استعداداً للولادة", trimester: 3 },
  { week: 37, sizeAr: "شمام كبير", weightGrams: "2900", lengthCm: "48", developmentAr: "اكتمال النمو — يُعتبر مكتمل النضج (Full Term)", trimester: 3 },
  { week: 38, sizeAr: "بطيخة صغيرة", weightGrams: "3100", lengthCm: "49", developmentAr: "اكتمال الرئتين بالكامل", trimester: 3 },
  { week: 39, sizeAr: "بطيخة", weightGrams: "3300", lengthCm: "50", developmentAr: "الجنين جاهز للولادة في أي لحظة", trimester: 3 },
  { week: 40, sizeAr: "بطيخة كبيرة", weightGrams: "3500", lengthCm: "51", developmentAr: "موعد الولادة المتوقع — مبروك! 🎉", trimester: 3 },
];

export const CALC_METHODS: { value: CalcMethod; labelAr: string; descAr: string; icon: string }[] = [
  { value: "lmp", labelAr: "آخر دورة شهرية", descAr: "الطريقة الأكثر شيوعاً — قاعدة نيغل", icon: "📅" },
  { value: "ultrasound", labelAr: "السونار (الموجات فوق الصوتية)", descAr: "بناءً على قياس الجنين في السونار", icon: "🔬" },
  { value: "ivf", labelAr: "أطفال الأنابيب (IVF)", descAr: "بناءً على تاريخ نقل الأجنّة", icon: "🧬" },
];

/* ═══════════════ Medical Appointments ═══════════════ */

export interface MedicalAppointment {
  id: string;
  nameAr: string;
  weekStart: number;
  weekEnd: number;
  icon: string;
  descAr: string;
  color: string;
}

export const MEDICAL_APPOINTMENTS: MedicalAppointment[] = [
  { id: "first-visit", nameAr: "أول زيارة للطبيب", weekStart: 6, weekEnd: 8, icon: "👩‍⚕️", descAr: "تأكيد الحمل + سونار مبكر + تحاليل دم", color: "#ec4899" },
  { id: "nuchal", nameAr: "فحص الشفافية القفوية", weekStart: 11, weekEnd: 14, icon: "🔍", descAr: "فحص تشوهات كروموسومية (داون)", color: "#f43f5e" },
  { id: "anatomy", nameAr: "فحص التشوهات التفصيلي", weekStart: 18, weekEnd: 22, icon: "📋", descAr: "Anomaly Scan — فحص شامل لأعضاء الجنين", color: "#f59e0b" },
  { id: "glucose", nameAr: "فحص سكر الحمل", weekStart: 24, weekEnd: 28, icon: "🩸", descAr: "اختبار تحمّل الجلوكوز (GTT)", color: "#10b981" },
  { id: "tdap", nameAr: "تطعيم الكزاز والسعال الديكي", weekStart: 27, weekEnd: 36, icon: "💉", descAr: "Tdap vaccine — حماية للأم والطفل", color: "#3b82f6" },
  { id: "gbs", nameAr: "فحص بكتيريا GBS", weekStart: 35, weekEnd: 37, icon: "🧫", descAr: "مسحة مهبلية لبكتيريا المجموعة ب", color: "#8b5cf6" },
  { id: "weekly", nameAr: "متابعة أسبوعية", weekStart: 36, weekEnd: 40, icon: "📊", descAr: "NST + قياس نبض الجنين + ضغط الدم", color: "#6366f1" },
];

/* ═══════════════ Core Calculation ═══════════════ */

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

function formatDateISO(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function calculatePregnancy(input: PregnancyInput): PregnancyResult | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let lmpDate: Date;

  switch (input.method) {
    case "lmp": {
      if (!input.lmpDate) return null;
      lmpDate = new Date(input.lmpDate);
      break;
    }
    case "ultrasound": {
      if (!input.ultrasoundDate) return null;
      const usDate = new Date(input.ultrasoundDate);
      const totalDaysAtUS = input.ultrasoundWeeks * 7 + input.ultrasoundDays;
      // Calculate back to LMP
      lmpDate = addDays(usDate, -totalDaysAtUS);
      break;
    }
    case "ivf": {
      if (!input.ivfDate) return null;
      const transferDate = new Date(input.ivfDate);
      // IVF: Day 3 embryo = LMP is 17 days before transfer
      //       Day 5 embryo = LMP is 19 days before transfer
      const daysBack = input.ivfDayTransfer === 5 ? 19 : 17;
      lmpDate = addDays(transferDate, -daysBack);
      break;
    }
    default:
      return null;
  }

  lmpDate.setHours(0, 0, 0, 0);

  // Core dates
  const dueDate = addDays(lmpDate, 280);        // 40 weeks
  const conceptionDate = addDays(lmpDate, 14);   // ~ovulation day

  // Progress
  const totalDaysPassed = Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalDaysLeft = Math.max(0, Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  const currentWeek = Math.max(0, Math.floor(totalDaysPassed / 7));
  const currentDay = Math.max(0, totalDaysPassed % 7);
  const progressPercent = Math.min(100, Math.max(0, (totalDaysPassed / 280) * 100));

  // Trimester
  let trimester: TrimesterInfo;
  if (currentWeek <= 12) {
    trimester = TRIMESTERS[0];
  } else if (currentWeek <= 27) {
    trimester = TRIMESTERS[1];
  } else {
    trimester = TRIMESTERS[2];
  }

  // Key dates
  const firstTrimesterEnd = addDays(lmpDate, 12 * 7);
  const secondTrimesterEnd = addDays(lmpDate, 27 * 7);

  // Aqiqah dates (from due date)
  const aqiqah: AqiqahInfo = {
    day7: formatDateISO(addDays(dueDate, 7)),
    day14: formatDateISO(addDays(dueDate, 14)),
    day21: formatDateISO(addDays(dueDate, 21)),
    descAr: "العقيقة سُنّة مؤكدة عن النبي ﷺ — تُذبح في اليوم السابع أو الرابع عشر أو الحادي والعشرين من الولادة",
    rulesAr: [
      "شاتان عن الذكر وشاة عن الأنثى",
      "يُستحب الذبح في اليوم السابع",
      "يُسمّى المولود ويُحلق رأسه ويُتصدّق بوزن شعره فضة",
      "تُوزّع: ثلث للأهل، ثلث للأقارب والجيران، ثلث للفقراء",
      "يجوز تأخيرها عن اليوم السابع لعذر",
    ],
  };

  // Medical windows
  const weekToDate = (w: number) => addDays(lmpDate, w * 7);

  // Current milestone
  const currentMilestone = WEEK_MILESTONES.reduce<WeekMilestone | null>((best, m) => {
    if (m.week <= currentWeek) return m;
    return best;
  }, null);

  return {
    dueDate,
    conceptionDate,
    currentWeek,
    currentDay,
    totalDaysPassed,
    totalDaysLeft,
    progressPercent,
    trimester,
    firstTrimesterEnd,
    secondTrimesterEnd,
    aqiqah,
    firstUltrasound: { start: weekToDate(6), end: weekToDate(8) },
    nuchalScan: { start: weekToDate(11), end: weekToDate(14) },
    anatomyScan: { start: weekToDate(18), end: weekToDate(22) },
    glucoseTest: { start: weekToDate(24), end: weekToDate(28) },
    gbs: { start: weekToDate(35), end: weekToDate(37) },
    fullTerm: weekToDate(37),
    currentMilestone,
    methodUsed: input.method,
  };
}

/* ═══════════════ Helpers ═══════════════ */

export function formatDateAr(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
}

export function formatDateArShort(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("ar-SA", { month: "short", day: "numeric" });
}

export function getDayNameAr(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("ar-SA", { weekday: "long" });
}
