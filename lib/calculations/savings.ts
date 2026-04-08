/**
 * Comprehensive Savings Calculator
 * Compound interest, goal planning, year-by-year breakdown
 */

export type CompoundFrequency = "monthly" | "quarterly" | "semi-annually" | "annually";
export type CalculationMode = "growth" | "goal";

export interface SavingsInput {
  mode: CalculationMode;
  // Growth mode
  initialDeposit: number;
  monthlyContribution: number;
  annualRate: number;          // % annual return
  years: number;
  compounding: CompoundFrequency;
  annualContributionIncrease: number; // % yearly increase in contributions
  // Goal mode
  targetAmount: number;
}

export interface YearlyBreakdown {
  year: number;
  startBalance: number;
  totalContributions: number;    // contributions this year
  interestEarned: number;        // interest earned this year
  endBalance: number;
  cumulativeContributions: number;
  cumulativeInterest: number;
}

export interface SavingsResult {
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
  initialDeposit: number;
  effectiveRate: number;
  yearlyBreakdown: YearlyBreakdown[];
  // Goal mode extras
  requiredMonthly?: number;
}

export const COMPOUND_OPTIONS: { value: CompoundFrequency; labelAr: string; periodsPerYear: number }[] = [
  { value: "monthly", labelAr: "شهرياً (12 مرة)", periodsPerYear: 12 },
  { value: "quarterly", labelAr: "ربع سنوي (4 مرات)", periodsPerYear: 4 },
  { value: "semi-annually", labelAr: "نصف سنوي (مرتين)", periodsPerYear: 2 },
  { value: "annually", labelAr: "سنوياً (مرة واحدة)", periodsPerYear: 1 },
];

function getPeriodsPerYear(freq: CompoundFrequency): number {
  return COMPOUND_OPTIONS.find((c) => c.value === freq)?.periodsPerYear || 12;
}

export function calculateSavings(input: SavingsInput): SavingsResult {
  const { initialDeposit, annualRate, years, compounding, annualContributionIncrease, mode, targetAmount } = input;
  let { monthlyContribution } = input;

  // Goal mode: calculate required monthly contribution
  let requiredMonthly: number | undefined;
  if (mode === "goal" && targetAmount > 0 && years > 0) {
    requiredMonthly = calculateRequiredMonthly(initialDeposit, targetAmount, annualRate, years, compounding);
    monthlyContribution = requiredMonthly;
  }

  const n = getPeriodsPerYear(compounding);
  const ratePerPeriod = annualRate / 100 / n;
  const yearlyBreakdown: YearlyBreakdown[] = [];

  let balance = initialDeposit;
  let cumulativeContributions = initialDeposit;
  let cumulativeInterest = 0;
  let currentMonthlyContribution = monthlyContribution;

  for (let year = 1; year <= years; year++) {
    const startBalance = balance;
    let yearContributions = 0;
    let yearInterest = 0;

    // Simulate each compounding period within the year
    const periodsThisYear = n;
    const monthsPerPeriod = 12 / n;

    for (let period = 0; period < periodsThisYear; period++) {
      // Add contributions for this period
      const periodContributions = currentMonthlyContribution * monthsPerPeriod;
      balance += periodContributions;
      yearContributions += periodContributions;

      // Apply interest
      const interest = balance * ratePerPeriod;
      balance += interest;
      yearInterest += interest;
    }

    cumulativeContributions += yearContributions;
    cumulativeInterest += yearInterest;

    yearlyBreakdown.push({
      year,
      startBalance,
      totalContributions: yearContributions,
      interestEarned: yearInterest,
      endBalance: balance,
      cumulativeContributions,
      cumulativeInterest,
    });

    // Increase contribution for next year
    if (annualContributionIncrease > 0) {
      currentMonthlyContribution *= (1 + annualContributionIncrease / 100);
    }
  }

  const totalContributions = cumulativeContributions;
  const totalInterest = cumulativeInterest;
  const effectiveRate = totalContributions > 0 ? (totalInterest / totalContributions) * 100 : 0;

  return {
    finalBalance: balance,
    totalContributions,
    totalInterest,
    initialDeposit,
    effectiveRate,
    yearlyBreakdown,
    requiredMonthly,
  };
}

function calculateRequiredMonthly(
  initial: number,
  target: number,
  annualRate: number,
  years: number,
  compounding: CompoundFrequency
): number {
  // Binary search for required monthly contribution
  let low = 0;
  let high = target;
  const tolerance = 1;

  for (let iter = 0; iter < 100; iter++) {
    const mid = (low + high) / 2;
    const result = calculateSavings({
      mode: "growth",
      initialDeposit: initial,
      monthlyContribution: mid,
      annualRate,
      years,
      compounding,
      annualContributionIncrease: 0,
      targetAmount: 0,
    });

    if (Math.abs(result.finalBalance - target) < tolerance) return mid;
    if (result.finalBalance < target) low = mid;
    else high = mid;
  }

  return (low + high) / 2;
}

export const fmt = (n: number) => n.toLocaleString("ar-SA", { maximumFractionDigits: 0 });
export const fmtDec = (n: number) => n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });

export const QUICK_DEPOSITS = [0, 5000, 10000, 25000, 50000, 100000];
export const QUICK_MONTHLY = [500, 1000, 2000, 3000, 5000, 10000];
export const QUICK_RATES = [3, 5, 7, 10, 12, 15];
export const QUICK_YEARS = [1, 3, 5, 10, 15, 20, 25, 30];

// Saudi investment context
export const SAUDI_RATES_REFERENCE = [
  { typeAr: "حساب ادخار بنكي", rateRange: "1% — 3%", riskAr: "منخفض جداً", icon: "🏦" },
  { typeAr: "صكوك حكومية", rateRange: "4% — 6%", riskAr: "منخفض", icon: "📜" },
  { typeAr: "صناديق استثمارية متحفظة", rateRange: "5% — 8%", riskAr: "متوسط", icon: "📊" },
  { typeAr: "صناديق أسهم سعودية", rateRange: "8% — 15%", riskAr: "مرتفع", icon: "📈" },
  { typeAr: "عقارات (REITs)", rateRange: "6% — 10%", riskAr: "متوسط-مرتفع", icon: "🏠" },
];
