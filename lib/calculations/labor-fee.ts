/**
 * Saudi Expat Labor Levy Calculator — حاسبة المقابل المالي (رسوم العمالة الوافدة)
 * Based on HRSD / Ministry of Labor official regulations (2025-2026)
 */

/* ═══════════════ Types ═══════════════ */

export type BusinessSize = "small" | "medium-large";
export type SectorType = "general" | "industrial";

export interface SmallBizExemption {
  id: string;
  nameAr: string;
  descAr: string;
  exemptWorkers: number;
}

export interface DurationOption {
  id: string;
  nameAr: string;
  months: number;
}

export interface LaborFeeResult {
  totalExpats: number;
  totalSaudis: number;
  saudizationRatio: number;        // percentage of Saudis
  expatsExceedSaudis: boolean;
  monthlyRatePerWorker: number;    // 700 or 800
  exemptWorkers: number;
  chargeableWorkers: number;
  monthlyTotal: number;
  periodMonths: number;
  periodTotal: number;
  annualTotal: number;
  workPermitFee: number;           // 100 SAR per worker
  totalWithPermit: number;
  dailyCost: number;
  savingsIfBalanced: number;       // savings if ratio balanced (700 vs 800)
}

/* ═══════════════ Constants ═══════════════ */

/** Monthly levy when expats ≤ Saudis */
export const RATE_BALANCED = 700;

/** Monthly levy when expats > Saudis */
export const RATE_EXCEEDING = 800;

/** Work permit issuance fee (per worker) */
export const WORK_PERMIT_FEE = 100;

/** Historical fee progression */
export const FEE_HISTORY = [
  { year: "يناير 2018", balanced: 300, exceeding: 400, descAr: "بداية تطبيق المقابل المالي" },
  { year: "يناير 2019", balanced: 500, exceeding: 600, descAr: "الزيادة الأولى" },
  { year: "يوليو 2019", balanced: 600, exceeding: 700, descAr: "الزيادة الثانية" },
  { year: "يناير 2020", balanced: 700, exceeding: 800, descAr: "المعمول به حالياً" },
];

/* ═══════════════ Duration Options ═══════════════ */

export const DURATION_OPTIONS: DurationOption[] = [
  { id: "quarterly", nameAr: "3 أشهر (الحد الأدنى)", months: 3 },
  { id: "semi-annual", nameAr: "6 أشهر", months: 6 },
  { id: "nine-months", nameAr: "9 أشهر", months: 9 },
  { id: "annual", nameAr: "سنة كاملة", months: 12 },
];

/* ═══════════════ Small Business Exemptions ═══════════════ */

export const SMALL_BIZ_EXEMPTIONS: SmallBizExemption[] = [
  {
    id: "owner-only",
    nameAr: "مالك فقط مسجل بالتأمينات",
    descAr: "المالك مسجل في التأمينات الاجتماعية ومتفرغ للعمل",
    exemptWorkers: 2,
  },
  {
    id: "owner-plus-saudi",
    nameAr: "مالك + موظف سعودي",
    descAr: "المالك + موظف سعودي واحد على الأقل مسجلين بالتأمينات",
    exemptWorkers: 4,
  },
];

/* ═══════════════ Exempted Sectors ═══════════════ */

export const EXEMPT_INFO = [
  { icon: "🏭", nameAr: "المنشآت الصناعية", descAr: "إلغاء كامل للمقابل المالي منذ ديسمبر 2025 للمنشآت الحاملة لرخصة صناعية" },
  { icon: "🏪", nameAr: "المنشآت الصغيرة (9 عمال فأقل)", descAr: "إعفاء 2-4 وافدين حسب تسجيل المالك والموظفين السعوديين بالتأمينات" },
  { icon: "🌾", nameAr: "القطاع الزراعي والصيد", descAr: "إعفاء حتى 6 عمال في المنشآت الزراعية ومنشآت الصيد" },
  { icon: "🏛️", nameAr: "مواطنو دول الخليج", descAr: "معفون من المقابل المالي بالكامل" },
  { icon: "🏠", nameAr: "العمالة المنزلية", descAr: "أول 4 عمال للسعوديين معفون، وأول 2 لغير السعوديين" },
  { icon: "⭐", nameAr: "الإقامة المميزة", descAr: "حاملو الإقامة المميزة معفون من المقابل المالي" },
];

/* ═══════════════ Calculation ═══════════════ */

export function calculateLaborFee(
  totalExpats: number,
  totalSaudis: number,
  duration: string,
  isSmallBiz: boolean,
  smallBizType: string,
  isIndustrial: boolean
): LaborFeeResult | null {
  if (totalExpats <= 0) return null;

  const durationOption = DURATION_OPTIONS.find((d) => d.id === duration);
  if (!durationOption) return null;

  // Industrial sector = fully exempt
  if (isIndustrial) {
    return {
      totalExpats,
      totalSaudis,
      saudizationRatio: totalSaudis / (totalExpats + totalSaudis) * 100,
      expatsExceedSaudis: totalExpats > totalSaudis,
      monthlyRatePerWorker: 0,
      exemptWorkers: totalExpats,
      chargeableWorkers: 0,
      monthlyTotal: 0,
      periodMonths: durationOption.months,
      periodTotal: 0,
      annualTotal: 0,
      workPermitFee: totalExpats * WORK_PERMIT_FEE,
      totalWithPermit: totalExpats * WORK_PERMIT_FEE,
      dailyCost: 0,
      savingsIfBalanced: 0,
    };
  }

  const expatsExceedSaudis = totalExpats > totalSaudis;
  const monthlyRate = expatsExceedSaudis ? RATE_EXCEEDING : RATE_BALANCED;

  // Small business exemption
  let exemptWorkers = 0;
  if (isSmallBiz && (totalExpats + totalSaudis) <= 9) {
    const exemption = SMALL_BIZ_EXEMPTIONS.find((e) => e.id === smallBizType);
    if (exemption) {
      exemptWorkers = Math.min(exemption.exemptWorkers, totalExpats);
    }
  }

  const chargeableWorkers = Math.max(0, totalExpats - exemptWorkers);
  const monthlyTotal = chargeableWorkers * monthlyRate;
  const periodTotal = monthlyTotal * durationOption.months;
  const annualTotal = monthlyTotal * 12;
  const workPermitFee = totalExpats * WORK_PERMIT_FEE;
  const dailyCost = monthlyTotal / 30;

  // Savings if the business balances its ratio
  let savingsIfBalanced = 0;
  if (expatsExceedSaudis && chargeableWorkers > 0) {
    savingsIfBalanced = chargeableWorkers * (RATE_EXCEEDING - RATE_BALANCED) * 12;
  }

  const saudizationRatio = (totalExpats + totalSaudis) > 0
    ? (totalSaudis / (totalExpats + totalSaudis)) * 100
    : 0;

  return {
    totalExpats,
    totalSaudis,
    saudizationRatio,
    expatsExceedSaudis,
    monthlyRatePerWorker: monthlyRate,
    exemptWorkers,
    chargeableWorkers,
    monthlyTotal,
    periodMonths: durationOption.months,
    periodTotal,
    annualTotal,
    workPermitFee,
    totalWithPermit: periodTotal + workPermitFee,
    dailyCost,
    savingsIfBalanced,
  };
}

/* ═══════════════ Formatting ═══════════════ */

export function fmt(value: number): string {
  return value.toLocaleString("ar-SA", { maximumFractionDigits: 2 });
}

export function fmtInt(value: number): string {
  return Math.round(value).toLocaleString("ar-SA");
}
