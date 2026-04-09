/**
 * Mortgage / Home Finance Calculator
 * التمويل العقاري — مرابحة، إجارة، تقليدي
 * Updated with Saudi bank rates 2025-2026
 */

/* ═══════════════ Types ═══════════════ */

export type FinanceType = "murabaha" | "ijara" | "conventional";

export interface MortgageInput {
  propertyPrice: number;
  downPaymentPercent: number;    // 5-50%
  annualRate: number;            // APR %
  years: number;                 // 1-30
  financeType: FinanceType;
  redfSupport: boolean;          // REDF subsidy
  redfSupportPercent: number;    // 35-100% profit coverage
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  profit: number;             // "interest" in Islamic finance = "profit"
  balance: number;
}

export interface YearSummary {
  year: number;
  totalPayment: number;
  totalPrincipal: number;
  totalProfit: number;
  endBalance: number;
}

export interface MortgageResult {
  loanAmount: number;
  downPayment: number;
  monthlyPayment: number;
  totalPayment: number;
  totalProfit: number;        // Total cost of financing
  effectiveRate: number;      // Effective annual rate after REDF
  monthlyRate: number;
  totalMonths: number;
  profitToPrice: number;      // Total profit as % of property price
  yearSummaries: YearSummary[];
  // REDF
  monthlySavings: number;     // Monthly savings from REDF
  totalRedfSavings: number;
  paymentWithoutRedf: number;
}

/* ═══════════════ Core Calculation ═══════════════ */

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const {
    propertyPrice, downPaymentPercent, annualRate, years,
    redfSupport, redfSupportPercent,
  } = input;

  const downPayment = propertyPrice * (downPaymentPercent / 100);
  const loanAmount = propertyPrice - downPayment;
  const totalMonths = years * 12;
  const monthlyRate = annualRate / 100 / 12;

  // PMT calculation
  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / totalMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyPayment = loanAmount * (monthlyRate * factor) / (factor - 1);
  }

  const paymentWithoutRedf = monthlyPayment;

  // REDF support calculation
  let monthlySavings = 0;
  let effectiveRate = annualRate;

  if (redfSupport && redfSupportPercent > 0) {
    // REDF covers a percentage of the profit portion
    const monthlyProfit = loanAmount * monthlyRate;
    monthlySavings = monthlyProfit * (redfSupportPercent / 100);
    // Recalculate effective rate
    const effectiveMonthlyRate = monthlyRate * (1 - redfSupportPercent / 100);
    effectiveRate = effectiveMonthlyRate * 12 * 100;
    if (effectiveMonthlyRate === 0) {
      monthlyPayment = loanAmount / totalMonths;
    } else {
      const factor2 = Math.pow(1 + effectiveMonthlyRate, totalMonths);
      monthlyPayment = loanAmount * (effectiveMonthlyRate * factor2) / (factor2 - 1);
    }
  }

  const totalPayment = monthlyPayment * totalMonths;
  const totalProfit = totalPayment - loanAmount;
  const totalRedfSavings = (paymentWithoutRedf - monthlyPayment) * totalMonths;
  const profitToPrice = propertyPrice > 0 ? (totalProfit / propertyPrice) * 100 : 0;

  // Generate year summaries
  const usedMonthlyRate = redfSupport
    ? (annualRate / 100 / 12) * (1 - redfSupportPercent / 100)
    : monthlyRate;
  const yearSummaries = generateYearSummaries(loanAmount, usedMonthlyRate, monthlyPayment, years);

  return {
    loanAmount,
    downPayment,
    monthlyPayment,
    totalPayment,
    totalProfit,
    effectiveRate,
    monthlyRate: usedMonthlyRate,
    totalMonths,
    profitToPrice,
    yearSummaries,
    monthlySavings,
    totalRedfSavings,
    paymentWithoutRedf,
  };
}

function generateYearSummaries(
  loanAmount: number,
  monthlyRate: number,
  monthlyPayment: number,
  years: number
): YearSummary[] {
  const summaries: YearSummary[] = [];
  let balance = loanAmount;

  for (let y = 1; y <= years; y++) {
    let yearPayment = 0;
    let yearPrincipal = 0;
    let yearProfit = 0;

    for (let m = 0; m < 12; m++) {
      if (balance <= 0) break;
      const profitPortion = balance * monthlyRate;
      const principalPortion = Math.min(monthlyPayment - profitPortion, balance);
      balance = Math.max(0, balance - principalPortion);

      yearPayment += monthlyPayment;
      yearPrincipal += principalPortion;
      yearProfit += profitPortion;
    }

    summaries.push({
      year: y,
      totalPayment: yearPayment,
      totalPrincipal: yearPrincipal,
      totalProfit: yearProfit,
      endBalance: Math.max(0, balance),
    });
  }

  return summaries;
}

/* ═══════════════ Finance Types Info ═══════════════ */

export const FINANCE_TYPES: {
  value: FinanceType;
  labelAr: string;
  descAr: string;
  icon: string;
  detailsAr: string[];
  rateType: string;
}[] = [
  {
    value: "murabaha",
    labelAr: "مرابحة",
    descAr: "البنك يشتري العقار ويبيعه لك بربح معلوم",
    icon: "🏠",
    detailsAr: [
      "سعر ثابت طوال مدة العقد",
      "الملكية تنتقل فوراً للمشتري",
      "الأقساط ثابتة لا تتغير",
      "الأكثر شيوعاً في السعودية",
    ],
    rateType: "ثابت",
  },
  {
    value: "ijara",
    labelAr: "إجارة منتهية بالتمليك",
    descAr: "البنك يشتري العقار ويؤجره لك حتى نهاية المدة",
    icon: "🔑",
    detailsAr: [
      "سعر متغير (يُراجع كل 2 سنة)",
      "الملكية تبقى للبنك حتى نهاية العقد",
      "صيانة المبنى قد تكون على البنك",
      "مرونة أكبر في السداد المبكر",
    ],
    rateType: "متغير",
  },
  {
    value: "conventional",
    labelAr: "تورّق (تقليدي)",
    descAr: "تمويل عبر شراء وبيع سلع لتحويل المبلغ نقداً",
    icon: "💰",
    detailsAr: [
      "ثابت أو متغير حسب البنك",
      "يُستخدم للتمويل النقدي وإعادة التمويل",
      "مرونة في استخدام المبلغ",
      "أقل شيوعاً في التمويل العقاري المباشر",
    ],
    rateType: "ثابت/متغير",
  },
];

/* ═══════════════ Bank Data ═══════════════ */

export interface BankInfo {
  id: string;
  nameAr: string;
  nameEn: string;
  logo: string;          // emoji
  subsidizedRate: string; // range string
  unsubsidizedRate: string;
  subsidizedMin: number;  // for sorting
  unsubsidizedMin: number;
  maxTenure: number;      // years
  maxFinancing: number;   // SAR
  minDownPayment: number; // %
  financeTypes: FinanceType[];
  specialAr: string;
}

export const SAUDI_BANKS: BankInfo[] = [
  {
    id: "rajhi", nameAr: "مصرف الراجحي", nameEn: "Al Rajhi", logo: "🟢",
    subsidizedRate: "3.25% - 4.25%", unsubsidizedRate: "~4.50%",
    subsidizedMin: 3.25, unsubsidizedMin: 4.50,
    maxTenure: 30, maxFinancing: 5000000, minDownPayment: 10,
    financeTypes: ["murabaha"],
    specialAr: "دعم صندوق التنمية العقارية",
  },
  {
    id: "snb", nameAr: "البنك الأهلي", nameEn: "SNB", logo: "🔵",
    subsidizedRate: "2.99% - 3.49%", unsubsidizedRate: "~4.75% - 6.86%",
    subsidizedMin: 2.99, unsubsidizedMin: 4.75,
    maxTenure: 25, maxFinancing: 7000000, minDownPayment: 10,
    financeTypes: ["murabaha"],
    specialAr: "أعلى سقف تمويل + تمويل مشترك",
  },
  {
    id: "riyad", nameAr: "بنك الرياض", nameEn: "Riyad Bank", logo: "🟣",
    subsidizedRate: "2.59% - 3.75%", unsubsidizedRate: "~5.25% - 5.74%",
    subsidizedMin: 2.59, unsubsidizedMin: 5.25,
    maxTenure: 30, maxFinancing: 5000000, minDownPayment: 10,
    financeTypes: ["murabaha"],
    specialAr: "أقل نسبة مدعومة في السوق",
  },
  {
    id: "bilad", nameAr: "بنك البلاد", nameEn: "Bank Albilad", logo: "🟠",
    subsidizedRate: "~3.99%", unsubsidizedRate: "~5.79%",
    subsidizedMin: 3.99, unsubsidizedMin: 5.79,
    maxTenure: 25, maxFinancing: 5000000, minDownPayment: 10,
    financeTypes: ["murabaha"],
    specialAr: "نقل تمويل من بنك آخر",
  },
  {
    id: "alinma", nameAr: "مصرف الإنماء", nameEn: "Alinma", logo: "🟤",
    subsidizedRate: "4.37% - 4.41%", unsubsidizedRate: "~5.62%",
    subsidizedMin: 4.37, unsubsidizedMin: 5.62,
    maxTenure: 30, maxFinancing: 10000000, minDownPayment: 10,
    financeTypes: ["murabaha", "ijara"],
    specialAr: "أعلى حد تمويل (10 مليون) + تمويل بناء ذاتي",
  },
  {
    id: "bsf", nameAr: "السعودي الفرنسي", nameEn: "BSF", logo: "🔴",
    subsidizedRate: "3.90% - 4.40%", unsubsidizedRate: "~6.91%",
    subsidizedMin: 3.90, unsubsidizedMin: 6.91,
    maxTenure: 25, maxFinancing: 5000000, minDownPayment: 10,
    financeTypes: ["murabaha"],
    specialAr: "رسوم إدارية 1% أو 5,000 ريال",
  },
  {
    id: "sabb", nameAr: "ساب", nameEn: "SABB", logo: "🟡",
    subsidizedRate: "2.94% - 3.99%", unsubsidizedRate: "5.68% - 7.44%",
    subsidizedMin: 2.94, unsubsidizedMin: 5.68,
    maxTenure: 25, maxFinancing: 7000000, minDownPayment: 10,
    financeTypes: ["murabaha", "ijara"],
    specialAr: "مرابحة مرنة (سعرين) + إجارة",
  },
  {
    id: "jazira", nameAr: "بنك الجزيرة", nameEn: "AlJazira", logo: "⚪",
    subsidizedRate: "3.10% - 3.89%", unsubsidizedRate: "~4.50% - 5.50%",
    subsidizedMin: 3.10, unsubsidizedMin: 4.50,
    maxTenure: 20, maxFinancing: 5000000, minDownPayment: 10,
    financeTypes: ["murabaha"],
    specialAr: "من أقل النسب غير المدعومة",
  },
];

/* ═══════════════ REDF Info ═══════════════ */

export const REDF_INFO = {
  maxLoan: 500000,
  maxGrant: 150000,
  minIncome: 4000,
  maxPropertyValue: 800000,
  supportRange: "35% - 100%",
  supportDuration: 20, // years
  downPaymentPercent: 5, // for REDF beneficiaries
};

/* ═══════════════ Helpers ═══════════════ */

export const fmt = (n: number) => n.toLocaleString("ar-SA", { maximumFractionDigits: 0 });
export const fmtDec = (n: number) => n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });

export const QUICK_PRICES = [500000, 750000, 1000000, 1500000, 2000000, 3000000];
