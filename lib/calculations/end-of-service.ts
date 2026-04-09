/**
 * End of Service Reward Calculator
 * Saudi Labor Law — Articles 84, 85, 86, 87
 * محدّث وفق تعديلات نظام العمل فبراير 2025
 */

export type TerminationReason =
  | "employer-termination"   // فصل من صاحب العمل
  | "contract-end"           // انتهاء العقد
  | "resignation"            // استقالة
  | "retirement"             // تقاعد
  | "force-majeure"          // قوة قاهرة (مادة 83)
  | "article-81"             // استقالة بسبب مخالفة صاحب العمل (مادة 81)
  | "death-disability"       // وفاة أو عجز
  | "bankruptcy"             // إفلاس صاحب العمل (تعديل 2025)
  | "woman-marriage"         // استقالة المرأة بعد الزواج (مادة 87)
  | "woman-childbirth";      // استقالة المرأة بعد الولادة (مادة 87)

export type ContractType = "limited" | "unlimited";

export interface EndOfServiceInput {
  lastSalary: number;         // الراتب الأخير (أساسي + بدلات)
  years: number;
  months: number;
  days: number;
  reason: TerminationReason;
  contractType: ContractType;
}

export interface CalculationStep {
  periodAr: string;
  years: number;
  rate: number;    // fraction of monthly salary per year
  rateAr: string;
  amount: number;
}

export interface EndOfServiceResult {
  totalReward: number;
  baseReward: number;          // before resignation multiplier
  resignationMultiplier: number; // 0, 1/3, 2/3, or 1
  totalYears: number;
  steps: CalculationStep[];
  ruleAr: string;
  articleAr: string;
  isEligible: boolean;
  ineligibleReasonAr: string;
  monthlyEquivalent: number;   // how many months salary
}

export const TERMINATION_REASONS: { value: TerminationReason; labelAr: string; descAr: string; icon: string }[] = [
  { value: "employer-termination", labelAr: "فصل / إنهاء خدمات", descAr: "إنهاء من صاحب العمل", icon: "🏢" },
  { value: "contract-end", labelAr: "انتهاء العقد", descAr: "انتهاء مدة العقد المحدد", icon: "📄" },
  { value: "resignation", labelAr: "استقالة", descAr: "استقالة من الموظف", icon: "✋" },
  { value: "retirement", labelAr: "تقاعد", descAr: "بلوغ سن التقاعد (60 سنة)", icon: "👴" },
  { value: "article-81", labelAr: "استقالة (مادة 81)", descAr: "بسبب مخالفة صاحب العمل", icon: "⚖️" },
  { value: "force-majeure", labelAr: "قوة قاهرة", descAr: "ظرف خارج عن الإرادة", icon: "🌊" },
  { value: "death-disability", labelAr: "وفاة أو عجز", descAr: "وفاة الموظف أو عجز كلي", icon: "🕊️" },
  { value: "bankruptcy", labelAr: "إفلاس صاحب العمل", descAr: "إغلاق المنشأة بسبب إفلاس", icon: "📉" },
  { value: "woman-marriage", labelAr: "استقالة بعد الزواج", descAr: "خلال 6 أشهر من الزواج (مادة 87)", icon: "💍" },
  { value: "woman-childbirth", labelAr: "استقالة بعد الولادة", descAr: "خلال 3 أشهر من الولادة (مادة 87)", icon: "👶" },
];

export function calculateEndOfService(input: EndOfServiceInput): EndOfServiceResult {
  const { lastSalary, years, months, days, reason } = input;
  const totalYears = years + months / 12 + days / 365;

  if (lastSalary <= 0 || totalYears <= 0) {
    return emptyResult(totalYears);
  }

  // Step 1: Calculate base reward
  const first5 = Math.min(totalYears, 5);
  const after5 = Math.max(totalYears - 5, 0);

  const step1Amount = first5 * (lastSalary / 2);  // نصف شهر عن كل سنة
  const step2Amount = after5 * lastSalary;         // شهر كامل عن كل سنة

  const baseReward = step1Amount + step2Amount;

  const steps: CalculationStep[] = [];
  if (first5 > 0) {
    steps.push({
      periodAr: `أول ${first5 > 5 ? 5 : first5.toFixed(2)} سنة`,
      years: first5,
      rate: 0.5,
      rateAr: "نصف شهر عن كل سنة",
      amount: step1Amount,
    });
  }
  if (after5 > 0) {
    steps.push({
      periodAr: `ما بعد 5 سنوات (${after5.toFixed(2)} سنة)`,
      years: after5,
      rate: 1,
      rateAr: "شهر كامل عن كل سنة",
      amount: step2Amount,
    });
  }

  // Step 2: Apply resignation rules (Article 85)
  let multiplier = 1;
  let ruleAr = "";
  let articleAr = "";
  let isEligible = true;
  let ineligibleReasonAr = "";

  switch (reason) {
    case "resignation":
      if (totalYears < 2) {
        multiplier = 0;
        isEligible = false;
        ineligibleReasonAr = "لا يستحق مكافأة — الخدمة أقل من سنتين (مادة 85)";
        ruleAr = "لا مكافأة";
        articleAr = "مادة 85";
      } else if (totalYears < 5) {
        multiplier = 1 / 3;
        ruleAr = "ثلث المكافأة (2-5 سنوات)";
        articleAr = "مادة 85";
      } else if (totalYears < 10) {
        multiplier = 2 / 3;
        ruleAr = "ثلثا المكافأة (5-10 سنوات)";
        articleAr = "مادة 85";
      } else {
        multiplier = 1;
        ruleAr = "المكافأة كاملة (10+ سنوات)";
        articleAr = "مادة 85";
      }
      break;

    case "employer-termination":
      ruleAr = "المكافأة كاملة — إنهاء من صاحب العمل";
      articleAr = "مادة 84";
      break;

    case "contract-end":
      ruleAr = "المكافأة كاملة — انتهاء مدة العقد";
      articleAr = "مادة 84";
      break;

    case "retirement":
      ruleAr = "المكافأة كاملة — تقاعد";
      articleAr = "مادة 84";
      break;

    case "article-81":
      ruleAr = "المكافأة كاملة — استقالة بموجب مادة 81 (مخالفة صاحب العمل)";
      articleAr = "مادة 81 + 84";
      break;

    case "force-majeure":
      ruleAr = "المكافأة كاملة — قوة قاهرة (مادة 83)";
      articleAr = "مادة 83 + 84";
      break;

    case "death-disability":
      ruleAr = "المكافأة كاملة — وفاة أو عجز كلي";
      articleAr = "مادة 84";
      break;

    case "bankruptcy":
      ruleAr = "المكافأة كاملة — إفلاس صاحب العمل (تعديل 2025)";
      articleAr = "مادة 74 + 84";
      break;

    case "woman-marriage":
      ruleAr = "المكافأة كاملة — استقالة المرأة خلال 6 أشهر من الزواج";
      articleAr = "مادة 87";
      break;

    case "woman-childbirth":
      ruleAr = "المكافأة كاملة — استقالة المرأة خلال 3 أشهر من الولادة";
      articleAr = "مادة 87";
      break;
  }

  const totalReward = baseReward * multiplier;
  const monthlyEquivalent = lastSalary > 0 ? totalReward / lastSalary : 0;

  return {
    totalReward,
    baseReward,
    resignationMultiplier: multiplier,
    totalYears,
    steps,
    ruleAr,
    articleAr,
    isEligible,
    ineligibleReasonAr,
    monthlyEquivalent,
  };
}

function emptyResult(totalYears: number): EndOfServiceResult {
  return {
    totalReward: 0, baseReward: 0, resignationMultiplier: 1,
    totalYears, steps: [], ruleAr: "", articleAr: "",
    isEligible: false, ineligibleReasonAr: "أدخل الراتب ومدة الخدمة",
    monthlyEquivalent: 0,
  };
}

export const fmt = (n: number) => n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });

export const QUICK_SALARIES = [5000, 7000, 10000, 15000, 20000, 30000, 50000];

// Resignation rules summary
export const RESIGNATION_RULES = [
  { range: "أقل من سنتين", multiplier: "لا مكافأة", fraction: 0, color: "bg-red-500" },
  { range: "2 — 5 سنوات", multiplier: "ثلث المكافأة", fraction: 1/3, color: "bg-orange-500" },
  { range: "5 — 10 سنوات", multiplier: "ثلثا المكافأة", fraction: 2/3, color: "bg-amber-500" },
  { range: "10 سنوات فأكثر", multiplier: "المكافأة كاملة", fraction: 1, color: "bg-emerald-500" },
];

// Notice period rules (2025 amendment)
export const NOTICE_PERIOD_RULES = [
  { partyAr: "الموظف (عقد غير محدد)", daysRequired: 30, noteAr: "إشعار كتابي قبل 30 يوماً" },
  { partyAr: "صاحب العمل (عقد غير محدد)", daysRequired: 60, noteAr: "إشعار كتابي قبل 60 يوماً" },
  { partyAr: "الموظف (أجر غير شهري)", daysRequired: 30, noteAr: "إشعار كتابي قبل 30 يوماً" },
];

// 2025 Amendment highlights
export const AMENDMENT_2025_HIGHLIGHTS = [
  { icon: "📝", titleAr: "الاستقالة أصبحت رسمية", descAr: "الاستقالة معترف بها صراحةً كسبب لإنهاء العقد — تُقبل تلقائياً بعد 30 يوماً" },
  { icon: "⏰", titleAr: "فترة الإشعار", descAr: "30 يوماً للموظف و60 يوماً لصاحب العمل في العقود غير محددة المدة" },
  { icon: "↩️", titleAr: "سحب الاستقالة", descAr: "يحق للموظف سحب استقالته خلال 7 أيام من تقديمها ما لم تُقبل" },
  { icon: "📉", titleAr: "الإفلاس سبب مشروع", descAr: "إفلاس صاحب العمل أصبح سبباً قانونياً لإنهاء العقد مع استحقاق المكافأة" },
  { icon: "📱", titleAr: "العقود الرقمية إلزامية", descAr: "يجب توثيق جميع العقود عبر منصة قوى (Qiwa) لتكون نافذة" },
  { icon: "🔄", titleAr: "فترة التجربة 180 يوماً", descAr: "تمديد فترة التجربة من 90 إلى 180 يوماً قابلة للتمديد باتفاق الطرفين" },
  { icon: "🤱", titleAr: "إجازة أمومة 12 أسبوعاً", descAr: "إجازة أمومة مدفوعة بالكامل لمدة 12 أسبوعاً + إجازة أبوة 3 أيام" },
  { icon: "⚖️", titleAr: "مدة المطالبة 12 شهراً", descAr: "يجب المطالبة بمستحقات نهاية الخدمة خلال 12 شهراً من انتهاء العلاقة" },
];

// Example scenarios
export const EXAMPLE_SCENARIOS = [
  { labelAr: "استقالة بعد 3 سنوات", salary: 10000, years: 3, months: 0, days: 0, reason: "resignation" as TerminationReason },
  { labelAr: "فصل بعد 8 سنوات", salary: 15000, years: 8, months: 0, days: 0, reason: "employer-termination" as TerminationReason },
  { labelAr: "تقاعد بعد 25 سنة", salary: 20000, years: 25, months: 0, days: 0, reason: "retirement" as TerminationReason },
  { labelAr: "انتهاء عقد سنتين", salary: 8000, years: 2, months: 0, days: 0, reason: "contract-end" as TerminationReason },
  { labelAr: "إفلاس بعد 5 سنوات", salary: 12000, years: 5, months: 0, days: 0, reason: "bankruptcy" as TerminationReason },
  { labelAr: "استقالة بعد الزواج", salary: 9000, years: 1, months: 6, days: 0, reason: "woman-marriage" as TerminationReason },
];
