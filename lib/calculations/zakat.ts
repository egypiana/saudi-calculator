/**
 * Comprehensive Zakat Calculator
 * Supports 14 zakat categories based on Islamic jurisprudence
 */

/* ───────────── Category Definitions ───────────── */

export interface ZakatCategory {
  id: string;
  labelAr: string;
  icon: string;
  color: string;
  fields: ZakatField[];
  nisabType: "gold" | "silver" | "custom" | "none";
  rate: number; // default rate (0.025 = 2.5%)
  description: string;
}

export interface ZakatField {
  id: string;
  labelAr: string;
  type: "currency" | "weight" | "number" | "select";
  unit?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  helpText?: string;
  isDeduction?: boolean;
}

export const ZAKAT_CATEGORIES: ZakatCategory[] = [
  {
    id: "money",
    labelAr: "زكاة المال",
    icon: "💰",
    color: "#059669",
    nisabType: "gold",
    rate: 0.025,
    description: "النقود والأرصدة البنكية والودائع",
    fields: [
      { id: "cash", labelAr: "النقد في اليد", type: "currency", unit: "ريال" },
      { id: "bank_current", labelAr: "الحساب الجاري", type: "currency", unit: "ريال" },
      { id: "bank_savings", labelAr: "حساب التوفير", type: "currency", unit: "ريال" },
      { id: "deposits", labelAr: "الودائع الثابتة", type: "currency", unit: "ريال" },
      { id: "receivables", labelAr: "ديون لك عند الغير (مرجوّة)", type: "currency", unit: "ريال" },
      { id: "money_debts", labelAr: "الديون المستحقة عليك", type: "currency", unit: "ريال", isDeduction: true },
    ],
  },
  {
    id: "gold",
    labelAr: "زكاة الذهب",
    icon: "🥇",
    color: "#ca8a04",
    nisabType: "gold",
    rate: 0.025,
    description: "الذهب بجميع عياراته",
    fields: [
      { id: "gold_24", labelAr: "ذهب عيار 24", type: "weight", unit: "غرام", helpText: "ذهب خالص" },
      { id: "gold_22", labelAr: "ذهب عيار 22", type: "weight", unit: "غرام" },
      { id: "gold_21", labelAr: "ذهب عيار 21", type: "weight", unit: "غرام" },
      { id: "gold_18", labelAr: "ذهب عيار 18", type: "weight", unit: "غرام" },
      { id: "gold_price", labelAr: "سعر غرام الذهب عيار 24", type: "currency", unit: "ريال/غرام", helpText: "السعر الحالي في السوق السعودي" },
    ],
  },
  {
    id: "silver",
    labelAr: "زكاة الفضة",
    icon: "🪙",
    color: "#6b7280",
    nisabType: "silver",
    rate: 0.025,
    description: "الفضة بجميع أنواعها",
    fields: [
      { id: "silver_pure", labelAr: "فضة نقية (999)", type: "weight", unit: "غرام" },
      { id: "silver_925", labelAr: "فضة إسترليني (925)", type: "weight", unit: "غرام" },
      { id: "silver_other", labelAr: "فضة أخرى", type: "weight", unit: "غرام" },
      { id: "silver_price", labelAr: "سعر غرام الفضة النقية", type: "currency", unit: "ريال/غرام", helpText: "السعر الحالي" },
    ],
  },
  {
    id: "stocks",
    labelAr: "زكاة الأسهم",
    icon: "📈",
    color: "#2563eb",
    nisabType: "gold",
    rate: 0.025,
    description: "الأسهم في السوق المالية",
    fields: [
      { id: "stocks_value", labelAr: "القيمة السوقية للأسهم", type: "currency", unit: "ريال", helpText: "قيمة أسهمك بسعر اليوم" },
      { id: "stocks_dividends", labelAr: "أرباح الأسهم غير المقبوضة", type: "currency", unit: "ريال" },
    ],
  },
  {
    id: "company_shares",
    labelAr: "المشاركة بأسهم في شركات",
    icon: "🏭",
    color: "#7c3aed",
    nisabType: "gold",
    rate: 0.025,
    description: "حصص الشراكة في الشركات",
    fields: [
      { id: "share_value", labelAr: "قيمة الحصة في الشركة", type: "currency", unit: "ريال" },
      { id: "share_profits", labelAr: "الأرباح غير الموزعة", type: "currency", unit: "ريال" },
    ],
  },
  {
    id: "business",
    labelAr: "زكاة الأعمال التجارية",
    icon: "🏪",
    color: "#dc2626",
    nisabType: "gold",
    rate: 0.025,
    description: "عروض التجارة والبضائع",
    fields: [
      { id: "inventory", labelAr: "قيمة البضائع والمخزون", type: "currency", unit: "ريال", helpText: "بسعر السوق الحالي" },
      { id: "trade_receivables", labelAr: "ديون العملاء (مرجوّة)", type: "currency", unit: "ريال" },
      { id: "trade_cash", labelAr: "النقد في صندوق المحل", type: "currency", unit: "ريال" },
      { id: "trade_debts", labelAr: "ديون الموردين عليك", type: "currency", unit: "ريال", isDeduction: true },
    ],
  },
  {
    id: "real_estate",
    labelAr: "زكاة الاستثمارات العقارية",
    icon: "🏠",
    color: "#0891b2",
    nisabType: "gold",
    rate: 0.025,
    description: "العقارات المُعدة للتجارة أو الاستثمار",
    fields: [
      { id: "property_trade", labelAr: "قيمة العقارات المعدة للبيع", type: "currency", unit: "ريال", helpText: "عقارات تملكها بنية البيع والتجارة" },
      { id: "rental_savings", labelAr: "إيرادات الإيجار المدخرة", type: "currency", unit: "ريال", helpText: "الإيجارات المجمعة التي مر عليها الحول" },
    ],
  },
  {
    id: "precious_stones",
    labelAr: "زكاة الأحجار الكريمة",
    icon: "💎",
    color: "#be185d",
    nisabType: "gold",
    rate: 0.025,
    description: "الألماس والياقوت والزمرد المُعد للتجارة",
    fields: [
      { id: "stones_value", labelAr: "القيمة السوقية للأحجار الكريمة", type: "currency", unit: "ريال", helpText: "تجب الزكاة إذا كانت مُعدة للتجارة" },
    ],
  },
  {
    id: "crops",
    labelAr: "زكاة الزروع والثمار",
    icon: "🌾",
    color: "#65a30d",
    nisabType: "custom",
    rate: 0.10,
    description: "الحبوب والثمار عند الحصاد",
    fields: [
      { id: "crop_weight", labelAr: "وزن المحصول", type: "weight", unit: "كيلوغرام", helpText: "نصاب الزروع 653 كغ (5 أوسق)" },
      { id: "crop_price", labelAr: "سعر الكيلوغرام", type: "currency", unit: "ريال/كغ" },
      {
        id: "irrigation",
        labelAr: "طريقة الري",
        type: "select",
        options: [
          { value: "rain", label: "مطر / عيون طبيعية (10%)" },
          { value: "machine", label: "ري صناعي / آلات (5%)" },
          { value: "mixed", label: "مختلط (7.5%)" },
        ],
      },
    ],
  },
  {
    id: "dates",
    labelAr: "زكاة التمور",
    icon: "🌴",
    color: "#92400e",
    nisabType: "custom",
    rate: 0.10,
    description: "التمور والرطب عند الحصاد",
    fields: [
      { id: "dates_weight", labelAr: "وزن التمور", type: "weight", unit: "كيلوغرام", helpText: "نصاب التمور 653 كغ" },
      { id: "dates_price", labelAr: "سعر الكيلوغرام", type: "currency", unit: "ريال/كغ" },
      {
        id: "dates_irrigation",
        labelAr: "طريقة السقي",
        type: "select",
        options: [
          { value: "rain", label: "مطر / آبار سطحية (10%)" },
          { value: "machine", label: "ري صناعي (5%)" },
          { value: "mixed", label: "مختلط (7.5%)" },
        ],
      },
    ],
  },
  {
    id: "livestock",
    labelAr: "زكاة الأنعام",
    icon: "🐄",
    color: "#a16207",
    nisabType: "custom",
    rate: 0,
    description: "الإبل والبقر والغنم السائمة",
    fields: [
      { id: "camels", labelAr: "عدد الإبل", type: "number", helpText: "نصاب الإبل: 5 رؤوس" },
      { id: "cows", labelAr: "عدد البقر", type: "number", helpText: "نصاب البقر: 30 رأساً" },
      { id: "sheep", labelAr: "عدد الغنم (ضأن وماعز)", type: "number", helpText: "نصاب الغنم: 40 رأساً" },
    ],
  },
  {
    id: "poultry_fish",
    labelAr: "طيور داجنة وأسماك",
    icon: "🐔",
    color: "#ea580c",
    nisabType: "gold",
    rate: 0.025,
    description: "الدواجن والأسماك المُعدة للتجارة",
    fields: [
      { id: "poultry_value", labelAr: "قيمة الدواجن المعدة للبيع", type: "currency", unit: "ريال" },
      { id: "fish_value", labelAr: "قيمة الأسماك والمزرعة السمكية", type: "currency", unit: "ريال" },
      { id: "poultry_expenses", labelAr: "تكاليف التشغيل المستحقة", type: "currency", unit: "ريال", isDeduction: true },
    ],
  },
  {
    id: "companies",
    labelAr: "زكاة الشركات",
    icon: "🏢",
    color: "#4f46e5",
    nisabType: "gold",
    rate: 0.025,
    description: "أصول الشركة الزكوية",
    fields: [
      { id: "company_cash", labelAr: "النقد وما يعادله", type: "currency", unit: "ريال" },
      { id: "company_inventory", labelAr: "المخزون بسعر السوق", type: "currency", unit: "ريال" },
      { id: "company_receivables", labelAr: "المدينون (ديون مرجوّة)", type: "currency", unit: "ريال" },
      { id: "company_investments", labelAr: "استثمارات قصيرة الأجل", type: "currency", unit: "ريال" },
      { id: "company_debts", labelAr: "الالتزامات قصيرة الأجل", type: "currency", unit: "ريال", isDeduction: true },
    ],
  },
  {
    id: "liabilities",
    labelAr: "المسؤوليات الكلية",
    icon: "📋",
    color: "#dc2626",
    nisabType: "none",
    rate: 0,
    description: "الخصومات من إجمالي الزكاة",
    fields: [
      { id: "personal_debts", labelAr: "ديون شخصية مستحقة", type: "currency", unit: "ريال", isDeduction: true },
      { id: "installments", labelAr: "أقساط مستحقة (سنة واحدة)", type: "currency", unit: "ريال", isDeduction: true },
      { id: "taxes_due", labelAr: "ضرائب مستحقة", type: "currency", unit: "ريال", isDeduction: true },
    ],
  },
];

/* ───────────── Calculation Logic ───────────── */

export interface ZakatCategoryResult {
  categoryId: string;
  labelAr: string;
  icon: string;
  color: string;
  totalAssets: number;
  totalDeductions: number;
  netAmount: number;
  zakatRate: number;
  zakatAmount: number;
  isAboveNisab: boolean;
  details: string;
}

export interface ZakatResult {
  categories: ZakatCategoryResult[];
  totalAssets: number;
  totalDeductions: number;
  totalLiabilities: number;
  netWealth: number;
  nisabGold: number;
  nisabSilver: number;
  goldPrice: number;
  silverPrice: number;
  isAboveNisab: boolean;
  totalZakat: number;
}

// Livestock zakat tables
function calculateCamelZakat(count: number): number {
  if (count < 5) return 0;
  if (count <= 9) return 1; // 1 sheep
  if (count <= 14) return 2;
  if (count <= 19) return 3;
  if (count <= 24) return 4;
  if (count <= 35) return 1; // 1 bint makhad (1-year she-camel)
  if (count <= 45) return 1;
  if (count <= 60) return 1;
  if (count <= 75) return 2;
  if (count <= 90) return 2;
  if (count <= 120) return 2;
  return Math.floor(count / 40) + Math.floor((count % 40) / 50);
}

function calculateCowZakat(count: number): number {
  if (count < 30) return 0;
  return Math.floor(count / 30) + Math.floor((count % 30) / 40);
}

function calculateSheepZakat(count: number): number {
  if (count < 40) return 0;
  if (count <= 120) return 1;
  if (count <= 200) return 2;
  if (count <= 399) return 3;
  return Math.floor(count / 100);
}

export function calculateZakat(
  values: Record<string, number>,
  goldPrice24: number,
  silverPrice: number
): ZakatResult {
  const nisabGold = 85 * goldPrice24;
  const nisabSilver = 595 * silverPrice;

  const categoryResults: ZakatCategoryResult[] = [];
  let totalAssets = 0;
  let totalDeductions = 0;
  let totalLiabilities = 0;

  for (const cat of ZAKAT_CATEGORIES) {
    let catAssets = 0;
    let catDeductions = 0;
    let zakatAmount = 0;
    let zakatRate = cat.rate;
    let details = "";

    if (cat.id === "liabilities") {
      // Liabilities are purely deductions
      for (const field of cat.fields) {
        const val = values[field.id] || 0;
        catDeductions += val;
      }
      totalLiabilities += catDeductions;
      categoryResults.push({
        categoryId: cat.id,
        labelAr: cat.labelAr,
        icon: cat.icon,
        color: cat.color,
        totalAssets: 0,
        totalDeductions: catDeductions,
        netAmount: -catDeductions,
        zakatRate: 0,
        zakatAmount: 0,
        isAboveNisab: false,
        details: catDeductions > 0 ? `إجمالي الخصومات: ${catDeductions.toLocaleString("ar-SA")} ريال` : "",
      });
      continue;
    }

    if (cat.id === "gold") {
      const gp = values["gold_price"] || goldPrice24;
      const g24 = (values["gold_24"] || 0);
      const g22 = (values["gold_22"] || 0) * (22 / 24);
      const g21 = (values["gold_21"] || 0) * (21 / 24);
      const g18 = (values["gold_18"] || 0) * (18 / 24);
      const totalPureGrams = g24 + g22 + g21 + g18;
      catAssets = totalPureGrams * gp;
      const isNisab = totalPureGrams >= 85;
      zakatAmount = isNisab ? catAssets * 0.025 : 0;
      details = `إجمالي الذهب الصافي: ${totalPureGrams.toFixed(1)} غرام (النصاب: 85 غرام)`;

      categoryResults.push({
        categoryId: cat.id, labelAr: cat.labelAr, icon: cat.icon, color: cat.color,
        totalAssets: catAssets, totalDeductions: 0, netAmount: catAssets,
        zakatRate: 0.025, zakatAmount, isAboveNisab: isNisab, details,
      });
      totalAssets += catAssets;
      continue;
    }

    if (cat.id === "silver") {
      const sp = values["silver_price"] || silverPrice;
      const sPure = (values["silver_pure"] || 0);
      const s925 = (values["silver_925"] || 0) * 0.925;
      const sOther = (values["silver_other"] || 0) * 0.8;
      const totalPureGrams = sPure + s925 + sOther;
      catAssets = totalPureGrams * sp;
      const isNisab = totalPureGrams >= 595;
      zakatAmount = isNisab ? catAssets * 0.025 : 0;
      details = `إجمالي الفضة الصافية: ${totalPureGrams.toFixed(1)} غرام (النصاب: 595 غرام)`;

      categoryResults.push({
        categoryId: cat.id, labelAr: cat.labelAr, icon: cat.icon, color: cat.color,
        totalAssets: catAssets, totalDeductions: 0, netAmount: catAssets,
        zakatRate: 0.025, zakatAmount, isAboveNisab: isNisab, details,
      });
      totalAssets += catAssets;
      continue;
    }

    if (cat.id === "crops" || cat.id === "dates") {
      const weightKey = cat.id === "crops" ? "crop_weight" : "dates_weight";
      const priceKey = cat.id === "crops" ? "crop_price" : "dates_price";
      const irrigKey = cat.id === "crops" ? "irrigation" : "dates_irrigation";

      const weight = values[weightKey] || 0;
      const price = values[priceKey] || 0;
      const irrigVal = values[irrigKey] || 0;

      catAssets = weight * price;
      const isNisab = weight >= 653;

      // Irrigation determines rate
      if (irrigVal === 2) zakatRate = 0.05; // machine
      else if (irrigVal === 3) zakatRate = 0.075; // mixed
      else zakatRate = 0.10; // rain (default)

      zakatAmount = isNisab ? catAssets * zakatRate : 0;
      details = `الوزن: ${weight} كغ (النصاب: 653 كغ) — نسبة الزكاة: ${(zakatRate * 100)}%`;

      categoryResults.push({
        categoryId: cat.id, labelAr: cat.labelAr, icon: cat.icon, color: cat.color,
        totalAssets: catAssets, totalDeductions: 0, netAmount: catAssets,
        zakatRate, zakatAmount, isAboveNisab: isNisab, details,
      });
      totalAssets += catAssets;
      continue;
    }

    if (cat.id === "livestock") {
      const camels = values["camels"] || 0;
      const cows = values["cows"] || 0;
      const sheep = values["sheep"] || 0;

      // Livestock zakat is in kind, we estimate monetary value
      const camelZakat = calculateCamelZakat(camels);
      const cowZakat = calculateCowZakat(cows);
      const sheepZakat = calculateSheepZakat(sheep);

      // Approximate values in SAR
      const camelValue = camelZakat * 3000; // ~3000 SAR per head
      const cowValue = cowZakat * 2500;
      const sheepValue = sheepZakat * 800;

      zakatAmount = camelValue + cowValue + sheepValue;
      catAssets = camels * 5000 + cows * 4000 + sheep * 1000; // approximate herd values

      const parts = [];
      if (camels > 0) parts.push(`إبل: ${camels} (زكاة: ${camelZakat} رأس)`);
      if (cows > 0) parts.push(`بقر: ${cows} (زكاة: ${cowZakat} رأس)`);
      if (sheep > 0) parts.push(`غنم: ${sheep} (زكاة: ${sheepZakat} رأس)`);
      details = parts.join(" — ") || "لا أنعام";

      categoryResults.push({
        categoryId: cat.id, labelAr: cat.labelAr, icon: cat.icon, color: cat.color,
        totalAssets: catAssets, totalDeductions: 0, netAmount: catAssets,
        zakatRate: 0, zakatAmount, isAboveNisab: zakatAmount > 0, details,
      });
      totalAssets += catAssets;
      continue;
    }

    // Default: currency-based categories (money, stocks, business, real_estate, etc.)
    for (const field of cat.fields) {
      const val = values[field.id] || 0;
      if (field.isDeduction) {
        catDeductions += val;
      } else {
        catAssets += val;
      }
    }

    const net = catAssets - catDeductions;
    zakatAmount = net > 0 ? net * zakatRate : 0;

    categoryResults.push({
      categoryId: cat.id, labelAr: cat.labelAr, icon: cat.icon, color: cat.color,
      totalAssets: catAssets, totalDeductions: catDeductions, netAmount: net,
      zakatRate, zakatAmount: zakatAmount > 0 ? zakatAmount : 0,
      isAboveNisab: true, // checked globally
      details: "",
    });

    totalAssets += catAssets;
    totalDeductions += catDeductions;
  }

  // Calculate total net wealth and apply nisab check for money-based categories
  const netWealth = totalAssets - totalDeductions - totalLiabilities;
  const isAboveNisab = netWealth >= nisabGold;

  // If total net wealth is below nisab, zero out money-based zakat
  let totalZakat = 0;
  for (const cr of categoryResults) {
    if (cr.categoryId === "livestock" || cr.categoryId === "crops" || cr.categoryId === "dates" ||
        cr.categoryId === "gold" || cr.categoryId === "silver") {
      // These have their own nisab, already calculated
      totalZakat += cr.zakatAmount;
    } else if (cr.categoryId === "liabilities") {
      // Skip
    } else {
      // Money-based: apply global nisab
      if (!isAboveNisab) {
        cr.zakatAmount = 0;
        cr.isAboveNisab = false;
      }
      totalZakat += cr.zakatAmount;
    }
  }

  return {
    categories: categoryResults,
    totalAssets,
    totalDeductions: totalDeductions + totalLiabilities,
    totalLiabilities,
    netWealth,
    nisabGold,
    nisabSilver,
    goldPrice: goldPrice24,
    silverPrice,
    isAboveNisab,
    totalZakat,
  };
}

export const fmt = (n: number) => n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });
