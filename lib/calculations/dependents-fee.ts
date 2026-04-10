/**
 * Saudi Dependents Fee Calculator — حاسبة رسوم المرافقين والتابعين
 * Based on official Saudi Jawazat / MOI regulations (2025-2026)
 */

/* ═══════════════ Types ═══════════════ */

export interface DependentCategory {
  id: string;
  nameAr: string;
  icon: string;
  type: "تابع" | "مرافق";
  descAr: string;
  monthlyFee: number; // SAR
}

export interface DependentEntry {
  categoryId: string;
  count: number;
}

export type DurationPeriod = "monthly" | "quarterly" | "semi-annual" | "annual" | "two-years";

export interface DurationOption {
  id: DurationPeriod;
  nameAr: string;
  months: number;
}

export interface ExemptCategory {
  id: string;
  nameAr: string;
  icon: string;
  descAr: string;
}

export interface FeeBreakdown {
  category: DependentCategory;
  count: number;
  monthlyTotal: number;
  periodTotal: number;
}

export interface DependentsFeeResult {
  entries: FeeBreakdown[];
  totalDependents: number;
  totalCompanions: number;
  totalPersons: number;
  monthlyTotal: number;
  periodMonths: number;
  periodTotal: number;
  annualTotal: number;
  dailyCost: number;
}

/* ═══════════════ Constants ═══════════════ */

/** Current monthly fee per dependent/companion (SAR) */
export const MONTHLY_FEE = 400;

/** Historical fee progression */
export const FEE_HISTORY = [
  { year: "يوليو 2017", fee: 100, descAr: "بداية تطبيق الرسوم" },
  { year: "يناير 2018", fee: 200, descAr: "الزيادة الأولى" },
  { year: "يناير 2019", fee: 300, descAr: "الزيادة الثانية" },
  { year: "يوليو 2019", fee: 400, descAr: "الزيادة الأخيرة (المعمول بها حالياً)" },
];

/* ═══════════════ Categories ═══════════════ */

export const DEPENDENT_CATEGORIES: DependentCategory[] = [
  {
    id: "wife",
    nameAr: "زوجة",
    icon: "👩",
    type: "تابع",
    descAr: "الزوجة أو الزوجات",
    monthlyFee: MONTHLY_FEE,
  },
  {
    id: "son-under-18",
    nameAr: "ابن (أقل من 18 سنة)",
    icon: "👦",
    type: "تابع",
    descAr: "الأبناء الذكور دون 18 سنة",
    monthlyFee: MONTHLY_FEE,
  },
  {
    id: "daughter",
    nameAr: "ابنة",
    icon: "👧",
    type: "تابع",
    descAr: "البنات غير المتزوجات",
    monthlyFee: MONTHLY_FEE,
  },
  {
    id: "son-over-18",
    nameAr: "ابن (18 سنة فأكثر)",
    icon: "👨",
    type: "مرافق",
    descAr: "الأبناء الذكور 18 سنة فأكثر",
    monthlyFee: MONTHLY_FEE,
  },
  {
    id: "parent",
    nameAr: "أب أو أم",
    icon: "👴",
    type: "مرافق",
    descAr: "الوالدين (أب أو أم)",
    monthlyFee: MONTHLY_FEE,
  },
  {
    id: "domestic-worker",
    nameAr: "عامل/ة منزلي/ة",
    icon: "🏠",
    type: "مرافق",
    descAr: "العمالة المنزلية على كفالة المقيم",
    monthlyFee: MONTHLY_FEE,
  },
];

/* ═══════════════ Duration Options ═══════════════ */

export const DURATION_OPTIONS: DurationOption[] = [
  { id: "monthly", nameAr: "شهر واحد", months: 1 },
  { id: "quarterly", nameAr: "3 أشهر", months: 3 },
  { id: "semi-annual", nameAr: "6 أشهر", months: 6 },
  { id: "annual", nameAr: "سنة كاملة", months: 12 },
  { id: "two-years", nameAr: "سنتان", months: 24 },
];

/* ═══════════════ Exemptions ═══════════════ */

export const EXEMPT_CATEGORIES: ExemptCategory[] = [
  {
    id: "gcc",
    nameAr: "مواطنو دول مجلس التعاون الخليجي",
    icon: "🏛️",
    descAr: "المقيمون من دول الخليج العربي معفون من الرسوم",
  },
  {
    id: "saudi-mother",
    nameAr: "أبناء المواطنات السعوديات",
    icon: "🇸🇦",
    descAr: "أبناء الأم السعودية من أب غير سعودي",
  },
  {
    id: "premium-residency",
    nameAr: "حاملو الإقامة المميزة",
    icon: "⭐",
    descAr: "حاملو الإقامة المميزة ومرافقوهم معفون",
  },
  {
    id: "diplomatic",
    nameAr: "حاملو الجوازات الدبلوماسية",
    icon: "📋",
    descAr: "الدبلوماسيون وعائلاتهم",
  },
  {
    id: "scholarship",
    nameAr: "طلاب المنح الدراسية",
    icon: "🎓",
    descAr: "الطلاب المبتعثون على حساب الحكومة السعودية",
  },
  {
    id: "military-students",
    nameAr: "الطلاب العسكريون",
    icon: "🎖️",
    descAr: "الطلاب في الكليات والمعاهد العسكرية",
  },
  {
    id: "gov-retirees",
    nameAr: "المتقاعدون من الجهات الحكومية",
    icon: "🏢",
    descAr: "المتقاعدون من العمل في الجهات الحكومية السعودية",
  },
  {
    id: "married-saudi",
    nameAr: "المتزوجون من سعوديين/سعوديات",
    icon: "💍",
    descAr: "الأجانب المتزوجون من مواطنين سعوديين",
  },
  {
    id: "newborn",
    nameAr: "المواليد الجدد (أول 90 يوم)",
    icon: "👶",
    descAr: "المواليد الجدد خلال أول 90 يوماً من الولادة",
  },
  {
    id: "industrial",
    nameAr: "العاملون في القطاع الصناعي",
    icon: "🏭",
    descAr: "الشركات الحاملة لرخصة صناعية (تم إلغاء الرسوم ديسمبر 2025)",
  },
];

/* ═══════════════ Calculation ═══════════════ */

export function calculateDependentsFee(
  entries: DependentEntry[],
  duration: DurationPeriod
): DependentsFeeResult | null {
  const durationOption = DURATION_OPTIONS.find((d) => d.id === duration);
  if (!durationOption) return null;

  const breakdown: FeeBreakdown[] = [];
  let totalDependents = 0;
  let totalCompanions = 0;

  for (const entry of entries) {
    if (entry.count <= 0) continue;
    const category = DEPENDENT_CATEGORIES.find((c) => c.id === entry.categoryId);
    if (!category) continue;

    const monthlyTotal = entry.count * category.monthlyFee;
    const periodTotal = monthlyTotal * durationOption.months;

    breakdown.push({
      category,
      count: entry.count,
      monthlyTotal,
      periodTotal,
    });

    if (category.type === "تابع") {
      totalDependents += entry.count;
    } else {
      totalCompanions += entry.count;
    }
  }

  const totalPersons = totalDependents + totalCompanions;
  if (totalPersons === 0) return null;

  const monthlyTotal = totalPersons * MONTHLY_FEE;
  const periodTotal = monthlyTotal * durationOption.months;
  const annualTotal = monthlyTotal * 12;
  const dailyCost = monthlyTotal / 30;

  return {
    entries: breakdown,
    totalDependents,
    totalCompanions,
    totalPersons,
    monthlyTotal,
    periodMonths: durationOption.months,
    periodTotal,
    annualTotal,
    dailyCost,
  };
}

/* ═══════════════ Formatting ═══════════════ */

export function fmt(value: number): string {
  return value.toLocaleString("ar-SA", { maximumFractionDigits: 2 });
}

export function fmtInt(value: number): string {
  return Math.round(value).toLocaleString("ar-SA");
}
