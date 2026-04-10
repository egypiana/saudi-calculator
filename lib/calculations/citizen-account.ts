/**
 * Saudi Citizen Account Calculator — حاسبة حساب المواطن
 * Based on official program guidelines (2025-2026)
 * Note: This is an ESTIMATE. Official calculator: portal.ca.gov.sa
 */

/* ═══════════════ Types ═══════════════ */

export type ApplicantType = "independent" | "head-of-household";

export interface CitizenAccountInput {
  applicantType: ApplicantType;
  monthlyIncome: number;
  dependentsOver18: number;
  dependentsUnder18: number;
}

export interface CitizenAccountResult {
  eligible: boolean;
  applicantType: ApplicantType;
  totalMembers: number;
  standardAmount: number;          // المبلغ المعياري
  exemptionThreshold: number;     // حد الإعفاء من التناقص
  incomeLimit: number;            // الحد المانع
  monthlySupport: number;         // الدعم الشهري
  annualSupport: number;          // الدعم السنوي
  supportPercentage: number;      // نسبة الاستحقاق (0-100)
  headAmount: number;
  dependentsOver18Amount: number;
  dependentsUnder18Amount: number;
  monthlyIncome: number;
}

export interface EligibilityCondition {
  id: string;
  nameAr: string;
  icon: string;
  descAr: string;
}

/* ═══════════════ Constants ═══════════════ */

/** Maximum monthly support amounts (SAR) */
export const HEAD_SUPPORT = 720;           // رب الأسرة أو مستقل
export const DEPENDENT_OVER_18 = 360;      // تابع 18 سنة فأكثر
export const DEPENDENT_UNDER_18 = 216;     // تابع أقل من 18 سنة

/** Maximum household income (SAR) */
export const MAX_INCOME_LIMIT = 20000;

/** Payment day of month */
export const PAYMENT_DAY = 10;

/* ═══════════════ Eligibility Conditions ═══════════════ */

export const ELIGIBILITY_CONDITIONS: EligibilityCondition[] = [
  { id: "nationality", nameAr: "الجنسية السعودية", icon: "🇸🇦", descAr: "أن يكون المتقدم سعودي الجنسية (أو من الفئات المستثناة)" },
  { id: "residency", nameAr: "الإقامة في المملكة", icon: "🏠", descAr: "أن يكون مقيماً إقامة دائمة في المملكة العربية السعودية" },
  { id: "age", nameAr: "العمر 18 سنة فأكثر", icon: "🎂", descAr: "أن يكون عمر المتقدم 18 سنة فأكثر" },
  { id: "income", nameAr: "الدخل أقل من الحد المانع", icon: "💰", descAr: "أن يكون إجمالي دخل الأسرة أقل من الحد المانع للاستحقاق" },
  { id: "not-detained", nameAr: "غير محتجز", icon: "📋", descAr: "ألا يكون مسجوناً أو محتجزاً في دور إيواء حكومية" },
  { id: "no-duplicate", nameAr: "عدم الازدواج", icon: "🔄", descAr: "ألا يكون مسجلاً كتابع ومستقل في نفس الوقت" },
];

/* ═══════════════ Excluded Categories (مستثناة) ═══════════════ */

export const EXCLUDED_CATEGORIES = [
  { icon: "👩", nameAr: "أبناء المواطنة السعودية", descAr: "من أب غير سعودي" },
  { icon: "💍", nameAr: "الزوجة غير السعودية", descAr: "المتزوجة من مواطن سعودي" },
  { icon: "👴", nameAr: "حاملو بطاقات التنقل", descAr: "أفراد القبائل النازحة" },
];

/* ═══════════════ Quick Presets ═══════════════ */

export const PRESETS = [
  { label: "فرد مستقل", desc: "بدون دخل", icon: "👤", type: "independent" as ApplicantType, income: 0, over18: 0, under18: 0 },
  { label: "فرد مستقل بدخل", desc: "راتب 5,000", icon: "💼", type: "independent" as ApplicantType, income: 5000, over18: 0, under18: 0 },
  { label: "أسرة صغيرة", desc: "زوجة + طفلين", icon: "👨‍👩‍👦", type: "head-of-household" as ApplicantType, income: 6000, over18: 1, under18: 2 },
  { label: "أسرة متوسطة", desc: "زوجة + 4 أطفال", icon: "👨‍👩‍👧‍👦", type: "head-of-household" as ApplicantType, income: 8000, over18: 1, under18: 4 },
  { label: "أسرة كبيرة", desc: "زوجة + 6 أطفال", icon: "👨‍👩‍👧‍👦", type: "head-of-household" as ApplicantType, income: 10000, over18: 1, under18: 6 },
];

/* ═══════════════ Support Table (for reference) ═══════════════ */

export const SUPPORT_TABLE = [
  { members: "فرد مستقل", count: 1, maxSupport: HEAD_SUPPORT },
  { members: "فردان (رب أسرة + تابع ≥18)", count: 2, maxSupport: HEAD_SUPPORT + DEPENDENT_OVER_18 },
  { members: "3 أفراد (رب + تابع ≥18 + طفل)", count: 3, maxSupport: HEAD_SUPPORT + DEPENDENT_OVER_18 + DEPENDENT_UNDER_18 },
  { members: "4 أفراد (رب + تابع ≥18 + طفلين)", count: 4, maxSupport: HEAD_SUPPORT + DEPENDENT_OVER_18 + DEPENDENT_UNDER_18 * 2 },
  { members: "5 أفراد (رب + تابع ≥18 + 3 أطفال)", count: 5, maxSupport: HEAD_SUPPORT + DEPENDENT_OVER_18 + DEPENDENT_UNDER_18 * 3 },
  { members: "6 أفراد (رب + تابع ≥18 + 4 أطفال)", count: 6, maxSupport: HEAD_SUPPORT + DEPENDENT_OVER_18 + DEPENDENT_UNDER_18 * 4 },
];

/* ═══════════════ Calculation ═══════════════ */

export function calculateCitizenAccount(input: CitizenAccountInput): CitizenAccountResult {
  const { applicantType, monthlyIncome, dependentsOver18, dependentsUnder18 } = input;

  const totalMembers = 1 + dependentsOver18 + dependentsUnder18;

  // Calculate standard amount (المبلغ المعياري)
  const headAmount = HEAD_SUPPORT;
  const dependentsOver18Amount = dependentsOver18 * DEPENDENT_OVER_18;
  const dependentsUnder18Amount = dependentsUnder18 * DEPENDENT_UNDER_18;
  const standardAmount = headAmount + dependentsOver18Amount + dependentsUnder18Amount;

  // Calculate income limits
  // الحد المانع = المبلغ المعياري / 0.084 (approximate multiplier from official data)
  const rawIncomeLimit = standardAmount / 0.084;
  const incomeLimit = Math.min(Math.round(rawIncomeLimit), MAX_INCOME_LIMIT);

  // حد الإعفاء من التناقص ≈ 50% of الحد المانع
  const exemptionThreshold = Math.round(incomeLimit * 0.5);

  // Calculate support
  let monthlySupport = 0;
  let supportPercentage = 0;

  if (monthlyIncome <= 0) {
    // No income = full support
    monthlySupport = standardAmount;
    supportPercentage = 100;
  } else if (monthlyIncome <= exemptionThreshold) {
    // Below exemption threshold = full support
    monthlySupport = standardAmount;
    supportPercentage = 100;
  } else if (monthlyIncome < incomeLimit) {
    // Partial support - linear decrease
    supportPercentage = ((incomeLimit - monthlyIncome) / (incomeLimit - exemptionThreshold)) * 100;
    monthlySupport = Math.round(standardAmount * (supportPercentage / 100));
  } else {
    // Above income limit = no support
    monthlySupport = 0;
    supportPercentage = 0;
  }

  const eligible = monthlySupport > 0;

  return {
    eligible,
    applicantType,
    totalMembers,
    standardAmount,
    exemptionThreshold,
    incomeLimit,
    monthlySupport,
    annualSupport: monthlySupport * 12,
    supportPercentage: Math.round(supportPercentage),
    headAmount,
    dependentsOver18Amount,
    dependentsUnder18Amount,
    monthlyIncome,
  };
}

/* ═══════════════ Formatting ═══════════════ */

export function fmt(value: number): string {
  return value.toLocaleString("ar-SA", { maximumFractionDigits: 0 });
}
