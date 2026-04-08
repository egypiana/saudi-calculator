/**
 * Comprehensive Profit Margin Calculator
 * Gross, Operating, Net margins + Markup + Target pricing + Multi-product
 */

export type MarginMode = "gross" | "operating" | "net";
export type CalcDirection = "from-revenue" | "from-margin" | "from-markup";

export interface ProfitMarginInput {
  mode: MarginMode;
  direction: CalcDirection;
  // From revenue
  revenue: number;
  cogs: number;               // Cost of Goods Sold
  operatingExpenses: number;   // Selling & admin expenses
  otherExpenses: number;       // Taxes, interest, etc.
  // From margin (target)
  targetMargin: number;        // %
  knownCost: number;
  // From markup
  targetMarkup: number;        // %
  markupCost: number;
  // VAT
  includeVAT: boolean;
  vatRate: number;             // default 15%
}

export interface ProfitMarginResult {
  revenue: number;
  cogs: number;
  grossProfit: number;
  grossMargin: number;          // %
  grossMarkup: number;          // %
  operatingProfit: number;
  operatingMargin: number;      // %
  netProfit: number;
  netMargin: number;            // %
  // VAT
  revenueWithVAT: number;
  vatAmount: number;
  profitAfterVAT: number;
  // Target calculations
  targetSellingPrice: number;
  targetRevenue: number;
  // Breakeven
  breakevenUnits: number;       // if unit cost known
  // Summary
  costRatio: number;            // cost as % of revenue
  profitPerUnit: number;        // if quantity provided
}

export interface ProductItem {
  id: string;
  name: string;
  cost: number;
  sellingPrice: number;
  quantity: number;
}

export interface MultiProductResult {
  products: {
    name: string;
    cost: number;
    sellingPrice: number;
    quantity: number;
    totalCost: number;
    totalRevenue: number;
    profit: number;
    margin: number;
    markup: number;
  }[];
  totalCost: number;
  totalRevenue: number;
  totalProfit: number;
  overallMargin: number;
  overallMarkup: number;
}

export function calculateProfitMargin(input: ProfitMarginInput): ProfitMarginResult {
  let revenue = 0;
  let cogs = 0;

  if (input.direction === "from-revenue") {
    revenue = input.revenue;
    cogs = input.cogs;
  } else if (input.direction === "from-margin") {
    // Given cost and target margin, find selling price
    // margin = (price - cost) / price => price = cost / (1 - margin/100)
    cogs = input.knownCost;
    if (input.targetMargin < 100) {
      revenue = cogs / (1 - input.targetMargin / 100);
    }
  } else if (input.direction === "from-markup") {
    // Given cost and markup %, find selling price
    // markup = (price - cost) / cost => price = cost * (1 + markup/100)
    cogs = input.markupCost;
    revenue = cogs * (1 + input.targetMarkup / 100);
  }

  const grossProfit = revenue - cogs;
  const grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
  const grossMarkup = cogs > 0 ? (grossProfit / cogs) * 100 : 0;

  const operatingProfit = grossProfit - input.operatingExpenses;
  const operatingMargin = revenue > 0 ? (operatingProfit / revenue) * 100 : 0;

  const netProfit = operatingProfit - input.otherExpenses;
  const netMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;

  // VAT
  const vatAmount = input.includeVAT ? revenue * (input.vatRate / 100) : 0;
  const revenueWithVAT = revenue + vatAmount;
  const profitAfterVAT = grossProfit; // VAT is pass-through

  // Cost ratio
  const totalCosts = cogs + input.operatingExpenses + input.otherExpenses;
  const costRatio = revenue > 0 ? (totalCosts / revenue) * 100 : 0;

  return {
    revenue,
    cogs,
    grossProfit,
    grossMargin,
    grossMarkup,
    operatingProfit,
    operatingMargin,
    netProfit,
    netMargin,
    revenueWithVAT,
    vatAmount,
    profitAfterVAT,
    targetSellingPrice: revenue,
    targetRevenue: revenue,
    costRatio,
    breakevenUnits: 0,
    profitPerUnit: 0,
  };
}

export function calculateMultiProduct(products: ProductItem[]): MultiProductResult {
  const results = products.filter(p => p.cost > 0 || p.sellingPrice > 0).map((p) => {
    const totalCost = p.cost * (p.quantity || 1);
    const totalRevenue = p.sellingPrice * (p.quantity || 1);
    const profit = totalRevenue - totalCost;
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
    const markup = totalCost > 0 ? (profit / totalCost) * 100 : 0;
    return { name: p.name, cost: p.cost, sellingPrice: p.sellingPrice, quantity: p.quantity || 1, totalCost, totalRevenue, profit, margin, markup };
  });

  const totalCost = results.reduce((s, p) => s + p.totalCost, 0);
  const totalRevenue = results.reduce((s, p) => s + p.totalRevenue, 0);
  const totalProfit = totalRevenue - totalCost;
  const overallMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  const overallMarkup = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;

  return { products: results, totalCost, totalRevenue, totalProfit, overallMargin, overallMarkup };
}

// Margin ↔ Markup conversion
export function marginToMarkup(margin: number): number {
  if (margin >= 100) return Infinity;
  return (margin / (100 - margin)) * 100;
}

export function markupToMargin(markup: number): number {
  return (markup / (100 + markup)) * 100;
}

// Utilities
export const fmt = (n: number) => n.toLocaleString("ar-SA", { maximumFractionDigits: 0 });
export const fmtDec = (n: number) => n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });
export const fmtPct = (n: number) => n.toLocaleString("ar-SA", { maximumFractionDigits: 1 });

export const QUICK_COSTS = [100, 500, 1000, 5000, 10000, 50000];
export const QUICK_REVENUES = [150, 750, 1500, 7500, 15000, 75000];
export const QUICK_MARGINS = [5, 10, 15, 20, 25, 30, 40, 50];
export const QUICK_MARKUPS = [10, 20, 30, 50, 75, 100, 150, 200];

export const INDUSTRY_BENCHMARKS = [
  { nameAr: "تجارة التجزئة (سوبرماركت)", margin: "2% — 5%", icon: "🛒" },
  { nameAr: "المطاعم والمقاهي", margin: "5% — 15%", icon: "🍽️" },
  { nameAr: "الملابس والأزياء", margin: "10% — 20%", icon: "👔" },
  { nameAr: "الإلكترونيات", margin: "5% — 10%", icon: "📱" },
  { nameAr: "البرمجيات والتقنية", margin: "15% — 30%", icon: "💻" },
  { nameAr: "الخدمات الاستشارية", margin: "20% — 40%", icon: "📋" },
  { nameAr: "العقارات", margin: "15% — 25%", icon: "🏠" },
  { nameAr: "المقاولات والبناء", margin: "5% — 15%", icon: "🏗️" },
];

export const MARGIN_VS_MARKUP_TABLE = [
  { margin: 10, markup: 11.1 },
  { margin: 15, markup: 17.6 },
  { margin: 20, markup: 25.0 },
  { margin: 25, markup: 33.3 },
  { margin: 30, markup: 42.9 },
  { margin: 33.3, markup: 50.0 },
  { margin: 40, markup: 66.7 },
  { margin: 50, markup: 100.0 },
  { margin: 60, markup: 150.0 },
  { margin: 75, markup: 300.0 },
];

let _productId = 0;
export function newProductId(): string {
  return `p_${++_productId}_${Date.now()}`;
}
