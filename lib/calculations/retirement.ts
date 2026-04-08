/**
 * Comprehensive Saudi Retirement Calculator
 * Civil, Military, Private (GOSI) sectors
 * Pension calculation, early retirement, gap analysis
 */

export type EmployeeSector = "civil" | "military" | "private";
export type Gender = "male" | "female";
export type RetirementType = "normal" | "early";

export interface RetirementInput {
  sector: EmployeeSector;
  gender: Gender;
  retirementType: RetirementType;
  currentAge: number;
  lastSalary: number;            // SAR
  yearsOfService: number;
  monthsOfService: number;       // additional months
  dependents: number;            // 0-3+
  expectedAnnualRaise: number;   // % salary increase per year
  personalSavings: number;       // current savings
  monthlySavingsContribution: number; // monthly savings
  savingsReturnRate: number;     // % annual return on savings
}

export interface RetirementResult {
  // Pension
  monthlyPension: number;
  annualPension: number;
  pensionRatio: number;          // % of final salary
  dependentsSupplement: number;  // additional amount
  totalMonthlyWithSupplements: number;

  // Final salary at retirement
  finalSalary: number;
  yearsUntilRetirement: number;
  retirementAge: number;
  totalServiceMonths: number;

  // Early retirement
  isEarlyRetirement: boolean;
  earlyRetirementPenalty: number; // % deduction
  normalPensionComparison: number; // what they'd get at normal retirement

  // Savings projection
  projectedSavings: number;
  monthlySavingsIncome: number;  // withdrawal over 20 years

  // Gap analysis
  totalMonthlyRetirementIncome: number;
  incomeGap: number;             // gap vs final salary
  replacementRatio: number;      // % of final salary covered
  readinessScore: number;        // 0-100

  // Eligibility
  isEligible: boolean;
  eligibilityMessage: string;

  // Year-by-year projection
  yearlyProjection: YearlyRetirementProjection[];
}

export interface YearlyRetirementProjection {
  year: number;
  age: number;
  salary: number;
  cumulativeContributions: number;
  savingsBalance: number;
  estimatedPension: number;
}

// Saudi pension system constants
export const PENSION_DIVISOR = 480; // months divisor for pension formula

export const SECTOR_CONFIG: Record<EmployeeSector, {
  nameAr: string;
  icon: string;
  normalRetirementAge: { male: number; female: number };
  earlyRetirementMinYears: number;
  earlyRetirementMinAge: number;
  maxPensionRatio: number;       // max % of salary
  accrualRate: number;           // % per year
  minPension: number;            // minimum monthly pension SAR
  descAr: string;
  salaryCap: number;
}> = {
  civil: {
    nameAr: "القطاع المدني (الحكومي)",
    icon: "🏛️",
    normalRetirementAge: { male: 60, female: 55 },
    earlyRetirementMinYears: 20,
    earlyRetirementMinAge: 0,
    maxPensionRatio: 80,
    accrualRate: 2.5,             // 1/480 per month = 2.5% per year
    minPension: 1984,
    descAr: "موظفو الوزارات والهيئات الحكومية",
    salaryCap: 0,                 // no cap
  },
  military: {
    nameAr: "القطاع العسكري",
    icon: "⭐",
    normalRetirementAge: { male: 55, female: 55 },
    earlyRetirementMinYears: 18,
    earlyRetirementMinAge: 44,
    maxPensionRatio: 80,
    accrualRate: 2.5,
    minPension: 1984,
    descAr: "العسكريون في القوات المسلحة والأمن",
    salaryCap: 0,
  },
  private: {
    nameAr: "القطاع الخاص (التأمينات)",
    icon: "🏢",
    normalRetirementAge: { male: 60, female: 55 },
    earlyRetirementMinYears: 25,
    earlyRetirementMinAge: 0,
    maxPensionRatio: 100,
    accrualRate: 2.5,
    minPension: 1984,
    descAr: "موظفو الشركات المسجلون في التأمينات الاجتماعية",
    salaryCap: 45000,
  },
};

export const DEPENDENTS_SUPPLEMENT: Record<number, { ratio: number; labelAr: string }> = {
  0: { ratio: 0, labelAr: "بدون معالين" },
  1: { ratio: 10, labelAr: "معال واحد (+10%)" },
  2: { ratio: 15, labelAr: "معالان (+15%)" },
  3: { ratio: 20, labelAr: "3 معالين أو أكثر (+20%)" },
};

export const EARLY_RETIREMENT_RULES: {
  sector: EmployeeSector;
  ruleAr: string;
  penaltyAr: string;
  minYears: number;
}[] = [
  { sector: "civil", ruleAr: "الحد الأدنى 20 سنة خدمة", penaltyAr: "خصم 5% لكل سنة قبل السن النظامي (بحد أقصى 2 سنة)", minYears: 20 },
  { sector: "military", ruleAr: "الحد الأدنى 18 سنة خدمة، والعمر 44+", penaltyAr: "خصم 5% لكل سنة قبل السن النظامي", minYears: 18 },
  { sector: "private", ruleAr: "الحد الأدنى 25 سنة اشتراك (300 شهر)", penaltyAr: "خصم 5% لكل سنة قبل سن 60", minYears: 25 },
];

export function calculateRetirement(input: RetirementInput): RetirementResult {
  const config = SECTOR_CONFIG[input.sector];
  const normalRetAge = config.normalRetirementAge[input.gender];
  const yearsUntilRetirement = Math.max(0, normalRetAge - input.currentAge);
  const totalServiceMonths = (input.yearsOfService * 12) + input.monthsOfService;

  // Calculate final salary at retirement (with expected raises)
  let projectedYears = yearsUntilRetirement;
  if (input.retirementType === "early") {
    projectedYears = Math.max(0, Math.min(yearsUntilRetirement, projectedYears));
  }
  const finalSalary = input.lastSalary * Math.pow(1 + input.expectedAnnualRaise / 100, projectedYears);

  // Cap salary for private sector
  const cappedSalary = config.salaryCap > 0 ? Math.min(finalSalary, config.salaryCap) : finalSalary;

  // Total service at retirement
  const totalServiceAtRetirement = totalServiceMonths + (projectedYears * 12);

  // Pension calculation: (Salary × Months) / 480
  let rawMonthlyPension = (cappedSalary * totalServiceAtRetirement) / PENSION_DIVISOR;

  // Cap at max pension ratio
  const maxPension = cappedSalary * (config.maxPensionRatio / 100);
  rawMonthlyPension = Math.min(rawMonthlyPension, maxPension);

  // Ensure minimum pension
  rawMonthlyPension = Math.max(rawMonthlyPension, config.minPension);

  // Early retirement penalty
  const isEarlyRetirement = input.retirementType === "early";
  let earlyRetirementPenalty = 0;
  let retirementAge = normalRetAge;

  if (isEarlyRetirement) {
    const yearsEarly = yearsUntilRetirement;
    earlyRetirementPenalty = Math.min(yearsEarly * 5, 10); // 5% per year, max ~10%
    rawMonthlyPension *= (1 - earlyRetirementPenalty / 100);
    retirementAge = input.currentAge;
  }

  // Normal pension comparison (for early retirement)
  const normalServiceMonths = totalServiceMonths + (yearsUntilRetirement * 12);
  const normalFinalSalary = input.lastSalary * Math.pow(1 + input.expectedAnnualRaise / 100, yearsUntilRetirement);
  const normalCapped = config.salaryCap > 0 ? Math.min(normalFinalSalary, config.salaryCap) : normalFinalSalary;
  let normalPensionComparison = (normalCapped * normalServiceMonths) / PENSION_DIVISOR;
  normalPensionComparison = Math.min(normalPensionComparison, normalCapped * (config.maxPensionRatio / 100));
  normalPensionComparison = Math.max(normalPensionComparison, config.minPension);

  // Dependents supplement
  const depKey = Math.min(input.dependents, 3);
  const supplementRatio = DEPENDENTS_SUPPLEMENT[depKey]?.ratio || 0;
  const dependentsSupplement = rawMonthlyPension * (supplementRatio / 100);
  const totalMonthlyWithSupplements = rawMonthlyPension + dependentsSupplement;

  // Pension ratio
  const pensionRatio = cappedSalary > 0 ? (totalMonthlyWithSupplements / cappedSalary) * 100 : 0;

  // Savings projection
  const yearsToProject = isEarlyRetirement ? 0 : yearsUntilRetirement;
  let savingsBalance = input.personalSavings;
  const monthlyReturn = input.savingsReturnRate / 100 / 12;
  for (let m = 0; m < yearsToProject * 12; m++) {
    savingsBalance += input.monthlySavingsContribution;
    savingsBalance *= (1 + monthlyReturn);
  }

  // Monthly savings income (withdraw over 20 years)
  const withdrawalYears = 20;
  const monthlySavingsIncome = savingsBalance > 0 ? savingsBalance / (withdrawalYears * 12) : 0;

  // Total retirement income
  const totalMonthlyRetirementIncome = totalMonthlyWithSupplements + monthlySavingsIncome;

  // Gap analysis
  const referenceSalary = isEarlyRetirement ? input.lastSalary : finalSalary;
  const incomeGap = Math.max(0, referenceSalary - totalMonthlyRetirementIncome);
  const replacementRatio = referenceSalary > 0 ? (totalMonthlyRetirementIncome / referenceSalary) * 100 : 0;

  // Readiness score (0-100)
  let readinessScore = Math.min(100, Math.round(replacementRatio * 1.25)); // 80% replacement = 100 score
  if (readinessScore < 0) readinessScore = 0;

  // Eligibility check
  const { isEligible, eligibilityMessage } = checkEligibility(input, config, totalServiceAtRetirement, normalRetAge);

  // Year-by-year projection
  const yearlyProjection = generateYearlyProjection(input, config, normalRetAge);

  return {
    monthlyPension: rawMonthlyPension,
    annualPension: rawMonthlyPension * 12,
    pensionRatio,
    dependentsSupplement,
    totalMonthlyWithSupplements,
    finalSalary: isEarlyRetirement ? input.lastSalary : finalSalary,
    yearsUntilRetirement: isEarlyRetirement ? 0 : yearsUntilRetirement,
    retirementAge,
    totalServiceMonths: isEarlyRetirement ? totalServiceMonths : totalServiceAtRetirement,
    isEarlyRetirement,
    earlyRetirementPenalty,
    normalPensionComparison,
    projectedSavings: savingsBalance,
    monthlySavingsIncome,
    totalMonthlyRetirementIncome,
    incomeGap,
    replacementRatio,
    readinessScore,
    isEligible,
    eligibilityMessage,
    yearlyProjection,
  };
}

function checkEligibility(
  input: RetirementInput,
  config: typeof SECTOR_CONFIG[EmployeeSector],
  totalServiceAtRetirement: number,
  normalRetAge: number
): { isEligible: boolean; eligibilityMessage: string } {
  const totalServiceYears = totalServiceAtRetirement / 12;

  if (input.retirementType === "early") {
    const currentServiceYears = input.yearsOfService + input.monthsOfService / 12;
    if (currentServiceYears < config.earlyRetirementMinYears) {
      return {
        isEligible: false,
        eligibilityMessage: `تحتاج ${config.earlyRetirementMinYears} سنة خدمة على الأقل للتقاعد المبكر. خدمتك الحالية: ${currentServiceYears.toFixed(1)} سنة`,
      };
    }
    if (input.sector === "military" && input.currentAge < config.earlyRetirementMinAge) {
      return {
        isEligible: false,
        eligibilityMessage: `يجب أن يكون عمرك ${config.earlyRetirementMinAge} سنة على الأقل للتقاعد العسكري المبكر`,
      };
    }
    return { isEligible: true, eligibilityMessage: "مؤهل للتقاعد المبكر" };
  }

  // Normal retirement
  if (input.currentAge >= normalRetAge && totalServiceYears >= 1) {
    return { isEligible: true, eligibilityMessage: "مؤهل للتقاعد" };
  }

  if (input.currentAge < normalRetAge) {
    const yearsLeft = normalRetAge - input.currentAge;
    return {
      isEligible: false,
      eligibilityMessage: `متبقي ${yearsLeft} سنة للوصول لسن التقاعد النظامي (${normalRetAge} سنة)`,
    };
  }

  return { isEligible: true, eligibilityMessage: "مؤهل للتقاعد" };
}

function generateYearlyProjection(
  input: RetirementInput,
  config: typeof SECTOR_CONFIG[EmployeeSector],
  normalRetAge: number
): YearlyRetirementProjection[] {
  const projection: YearlyRetirementProjection[] = [];
  const yearsToProject = Math.max(1, normalRetAge - input.currentAge);
  let salary = input.lastSalary;
  let savings = input.personalSavings;
  let totalContributions = input.personalSavings;
  const monthlyReturn = input.savingsReturnRate / 100 / 12;
  const totalServiceMonths = (input.yearsOfService * 12) + input.monthsOfService;

  for (let y = 0; y <= Math.min(yearsToProject, 40); y++) {
    const age = input.currentAge + y;
    const serviceAtYear = totalServiceMonths + (y * 12);
    const cappedSalary = config.salaryCap > 0 ? Math.min(salary, config.salaryCap) : salary;
    let estimatedPension = (cappedSalary * serviceAtYear) / PENSION_DIVISOR;
    estimatedPension = Math.min(estimatedPension, cappedSalary * (config.maxPensionRatio / 100));
    estimatedPension = Math.max(estimatedPension, config.minPension > 0 && serviceAtYear > 0 ? config.minPension : 0);

    projection.push({
      year: y,
      age,
      salary: Math.round(salary),
      cumulativeContributions: Math.round(totalContributions),
      savingsBalance: Math.round(savings),
      estimatedPension: Math.round(estimatedPension),
    });

    // Update for next year
    salary *= (1 + input.expectedAnnualRaise / 100);
    for (let m = 0; m < 12; m++) {
      savings += input.monthlySavingsContribution;
      savings *= (1 + monthlyReturn);
      totalContributions += input.monthlySavingsContribution;
    }
  }

  return projection;
}

// Utility
export const fmt = (n: number) => n.toLocaleString("ar-SA", { maximumFractionDigits: 0 });
export const fmtPct = (n: number) => n.toLocaleString("ar-SA", { maximumFractionDigits: 1 });

export const QUICK_SALARIES = [5000, 8000, 10000, 15000, 20000, 30000, 45000];
export const QUICK_AGES = [25, 30, 35, 40, 45, 50, 55];
export const QUICK_SERVICE_YEARS = [5, 10, 15, 20, 25, 30, 35];

export const RETIREMENT_AGES_REF = [
  { sectorAr: "مدني (ذكر)", age: 60, icon: "🏛️" },
  { sectorAr: "مدني (أنثى)", age: 55, icon: "🏛️" },
  { sectorAr: "عسكري", age: 55, icon: "⭐" },
  { sectorAr: "خاص (ذكر)", age: 60, icon: "🏢" },
  { sectorAr: "خاص (أنثى)", age: 55, icon: "🏢" },
];

export const PENSION_MILESTONES = [
  { years: 10, ratio: 25, labelAr: "10 سنوات = 25%" },
  { years: 15, ratio: 37.5, labelAr: "15 سنة = 37.5%" },
  { years: 20, ratio: 50, labelAr: "20 سنة = 50%" },
  { years: 25, ratio: 62.5, labelAr: "25 سنة = 62.5%" },
  { years: 30, ratio: 75, labelAr: "30 سنة = 75%" },
  { years: 32, ratio: 80, labelAr: "32 سنة = 80% (الحد الأقصى)" },
];
