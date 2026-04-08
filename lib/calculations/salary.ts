/**
 * Comprehensive Saudi Salary Calculator
 * GOSI deductions, Saudi vs Non-Saudi, employer cost, overtime, salary conversion
 */

export type Nationality = "saudi" | "nonSaudi";

export interface SalaryInput {
  basicSalary: number;
  housingAllowance: number;
  transportAllowance: number;
  foodAllowance: number;
  phoneAllowance: number;
  otherAllowances: number;
  nationality: Nationality;
  overtime: number;       // hours per month
  overtimeRate: number;   // 1.5 or 2.0
  otherDeductions: number; // loans, advances etc
}

export interface GOSIBreakdown {
  employeeRate: number;
  employerRate: number;
  employeeAmount: number;
  employerAmount: number;
  totalRate: number;
  totalAmount: number;
  baseSalaryUsed: number; // capped at 45,000
}

export interface SalaryResult {
  // Components
  basicSalary: number;
  housingAllowance: number;
  transportAllowance: number;
  foodAllowance: number;
  phoneAllowance: number;
  otherAllowances: number;
  totalAllowances: number;

  // Gross
  grossSalary: number;

  // Overtime
  overtimeAmount: number;
  overtimeHours: number;

  // GOSI
  gosi: GOSIBreakdown;

  // Deductions
  otherDeductions: number;
  totalDeductions: number;

  // Net
  netSalary: number;

  // Employer
  totalEmployerCost: number;

  // Conversion
  annual: number;
  daily: number;
  hourly: number;

  // Meta
  nationality: Nationality;
}

// GOSI Rates (2024-2026)
export const GOSI_RATES = {
  saudi: {
    employee: 0.0975,    // 9.75% (retirement 9% + SANED 0.75%)
    employer: 0.1175,    // 11.75% (retirement 9% + SANED 0.75% + occupational hazards 2%)
  },
  nonSaudi: {
    employee: 0,         // 0% — non-Saudi doesn't contribute
    employer: 0.02,      // 2% (occupational hazards only)
  },
} as const;

export const GOSI_MAX_SALARY = 45000; // Maximum salary subject to GOSI

// GOSI detail breakdown
export const GOSI_COMPONENTS = {
  saudi: [
    { nameAr: "معاشات (تقاعد)", rate: 0.09, employee: 0.09, employer: 0.09 },
    { nameAr: "ساند (تعطل)", rate: 0.015, employee: 0.0075, employer: 0.0075 },
    { nameAr: "أخطار مهنية", rate: 0.02, employee: 0, employer: 0.02 },
  ],
  nonSaudi: [
    { nameAr: "أخطار مهنية", rate: 0.02, employee: 0, employer: 0.02 },
  ],
} as const;

export function calculateSalary(input: SalaryInput): SalaryResult {
  const {
    basicSalary, housingAllowance, transportAllowance,
    foodAllowance, phoneAllowance, otherAllowances,
    nationality, overtime, overtimeRate, otherDeductions,
  } = input;

  const totalAllowances = housingAllowance + transportAllowance + foodAllowance + phoneAllowance + otherAllowances;
  const grossSalary = basicSalary + totalAllowances;

  // Overtime: based on basic salary / 30 days / 8 hours × rate × hours
  const hourlyRate = basicSalary > 0 ? (basicSalary / 30 / 8) : 0;
  const overtimeAmount = hourlyRate * overtimeRate * overtime;

  // GOSI - capped at 45,000
  const gosiBaseSalary = Math.min(basicSalary, GOSI_MAX_SALARY);
  const rates = GOSI_RATES[nationality];
  const employeeGOSI = gosiBaseSalary * rates.employee;
  const employerGOSI = gosiBaseSalary * rates.employer;

  const gosi: GOSIBreakdown = {
    employeeRate: rates.employee,
    employerRate: rates.employer,
    employeeAmount: employeeGOSI,
    employerAmount: employerGOSI,
    totalRate: rates.employee + rates.employer,
    totalAmount: employeeGOSI + employerGOSI,
    baseSalaryUsed: gosiBaseSalary,
  };

  const totalDeductions = employeeGOSI + otherDeductions;
  const netSalary = grossSalary + overtimeAmount - totalDeductions;
  const totalEmployerCost = grossSalary + overtimeAmount + employerGOSI;

  // Conversion (based on net monthly)
  const annual = netSalary * 12;
  const daily = netSalary / 30;
  const hourly = daily / 8;

  return {
    basicSalary, housingAllowance, transportAllowance,
    foodAllowance, phoneAllowance, otherAllowances, totalAllowances,
    grossSalary,
    overtimeAmount, overtimeHours: overtime,
    gosi,
    otherDeductions, totalDeductions,
    netSalary,
    totalEmployerCost,
    annual, daily, hourly,
    nationality,
  };
}

export const fmt = (n: number) => n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });

export const QUICK_SALARIES = [3000, 5000, 7000, 10000, 15000, 20000, 30000, 50000];

export const SALARY_STRUCTURE_TIPS = [
  { labelAr: "بدل السكن", tip: "يُحسب عادةً 25% من الراتب الأساسي" },
  { labelAr: "بدل النقل", tip: "يتراوح بين 500 إلى 1,500 ريال حسب المنطقة" },
  { labelAr: "بدل الطعام", tip: "بين 300 إلى 1,000 ريال شهرياً" },
];

// Saudi minimum wage
export const MINIMUM_WAGE = {
  saudi: 4000,
  nonSaudi: 0, // no legal minimum for non-Saudis (market-driven)
};

// Common salary scales reference
export const SALARY_SCALES = [
  { levelAr: "مبتدئ (حديث تخرج)", range: "4,000 — 7,000", avg: 5500 },
  { levelAr: "خبرة 2-5 سنوات", range: "7,000 — 12,000", avg: 9500 },
  { levelAr: "خبرة 5-10 سنوات", range: "12,000 — 20,000", avg: 16000 },
  { levelAr: "خبرة 10+ سنوات / إداري", range: "20,000 — 35,000", avg: 27500 },
  { levelAr: "مدير / تنفيذي", range: "35,000 — 70,000+", avg: 50000 },
];
