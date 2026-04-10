/**
 * Saudi Electricity Bill Calculator — حاسبة فاتورة الكهرباء
 * Based on SEC/SERA official tariff rates (2025-2026)
 */

/* ═══════════════ Types ═══════════════ */

export type SectorType = "residential" | "commercial" | "industrial" | "government" | "agricultural" | "charitable" | "healthcare" | "schools";

export interface TariffTier {
  from: number;
  to: number;          // Infinity for last tier
  rate: number;        // Halalas per kWh
  rateSAR: number;     // SAR per kWh
}

export interface SectorInfo {
  id: SectorType;
  nameAr: string;
  icon: string;
  tiers: TariffTier[];
  meterFee: number;    // SAR/month (average)
  descAr: string;
}

export interface BillBreakdown {
  tier: number;
  from: number;
  to: number;
  kWh: number;
  rateHalalas: number;
  cost: number;
}

export interface ElectricityResult {
  sector: SectorInfo;
  consumption: number;         // kWh
  breakdown: BillBreakdown[];
  consumptionCost: number;     // SAR before fees
  meterFee: number;
  subtotal: number;            // before VAT
  vat: number;                 // 15%
  total: number;               // final bill
  avgCostPerKwh: number;       // SAR
  dailyCost: number;           // SAR/day
}

export interface ApplianceInfo {
  id: string;
  nameAr: string;
  icon: string;
  watts: number;
  defaultHours: number;   // hours/day
  defaultQty: number;
  category: "cooling" | "heating" | "kitchen" | "laundry" | "lighting" | "other";
}

export interface ApplianceCalc {
  appliance: ApplianceInfo;
  qty: number;
  hoursPerDay: number;
  monthlyKwh: number;
  monthlyCost: number;
}

/* ═══════════════ Tariff Data ═══════════════ */

export const SECTORS: SectorInfo[] = [
  {
    id: "residential", nameAr: "سكني", icon: "🏠",
    meterFee: 15, descAr: "المنازل والشقق السكنية",
    tiers: [
      { from: 1, to: 6000, rate: 18, rateSAR: 0.18 },
      { from: 6001, to: Infinity, rate: 30, rateSAR: 0.30 },
    ],
  },
  {
    id: "commercial", nameAr: "تجاري", icon: "🏪",
    meterFee: 25, descAr: "المحلات والمكاتب والمنشآت التجارية",
    tiers: [
      { from: 1, to: 6000, rate: 22, rateSAR: 0.22 },
      { from: 6001, to: Infinity, rate: 32, rateSAR: 0.32 },
    ],
  },
  {
    id: "industrial", nameAr: "صناعي", icon: "🏭",
    meterFee: 30, descAr: "المصانع والمنشآت الصناعية",
    tiers: [
      { from: 1, to: Infinity, rate: 20, rateSAR: 0.20 },
    ],
  },
  {
    id: "government", nameAr: "حكومي", icon: "🏛️",
    meterFee: 30, descAr: "الجهات والمباني الحكومية",
    tiers: [
      { from: 1, to: Infinity, rate: 32, rateSAR: 0.32 },
    ],
  },
  {
    id: "agricultural", nameAr: "زراعي", icon: "🌾",
    meterFee: 15, descAr: "المزارع والمنشآت الزراعية",
    tiers: [
      { from: 1, to: 6000, rate: 18, rateSAR: 0.18 },
      { from: 6001, to: Infinity, rate: 22, rateSAR: 0.22 },
    ],
  },
  {
    id: "charitable", nameAr: "خيري", icon: "🤝",
    meterFee: 15, descAr: "الجمعيات والمؤسسات الخيرية",
    tiers: [
      { from: 1, to: 6000, rate: 16, rateSAR: 0.16 },
      { from: 6001, to: Infinity, rate: 20, rateSAR: 0.20 },
    ],
  },
  {
    id: "healthcare", nameAr: "صحي خاص", icon: "🏥",
    meterFee: 25, descAr: "المستشفيات والمراكز الصحية الخاصة",
    tiers: [
      { from: 1, to: Infinity, rate: 18, rateSAR: 0.18 },
    ],
  },
  {
    id: "schools", nameAr: "تعليمي خاص", icon: "🏫",
    meterFee: 25, descAr: "المدارس والمعاهد الخاصة",
    tiers: [
      { from: 1, to: Infinity, rate: 18, rateSAR: 0.18 },
    ],
  },
];

export const VAT_RATE = 0.15;

/* ═══════════════ Appliances ═══════════════ */

export const APPLIANCES: ApplianceInfo[] = [
  // Cooling
  { id: "split-ac", nameAr: "مكيّف سبليت", icon: "❄️", watts: 1500, defaultHours: 10, defaultQty: 1, category: "cooling" },
  { id: "window-ac", nameAr: "مكيّف شباك", icon: "🌬️", watts: 1000, defaultHours: 10, defaultQty: 1, category: "cooling" },
  { id: "central-ac", nameAr: "تكييف مركزي", icon: "🏢", watts: 3500, defaultHours: 10, defaultQty: 1, category: "cooling" },
  { id: "fan", nameAr: "مروحة", icon: "💨", watts: 75, defaultHours: 8, defaultQty: 1, category: "cooling" },
  // Heating
  { id: "water-heater", nameAr: "سخّان ماء كهربائي", icon: "🚿", watts: 2000, defaultHours: 2, defaultQty: 1, category: "heating" },
  { id: "heater", nameAr: "دفاية كهربائية", icon: "🔥", watts: 1500, defaultHours: 4, defaultQty: 1, category: "heating" },
  // Kitchen
  { id: "fridge", nameAr: "ثلاجة", icon: "🧊", watts: 150, defaultHours: 24, defaultQty: 1, category: "kitchen" },
  { id: "freezer", nameAr: "فريزر", icon: "🥶", watts: 200, defaultHours: 24, defaultQty: 1, category: "kitchen" },
  { id: "oven", nameAr: "فرن كهربائي", icon: "🍳", watts: 2000, defaultHours: 1, defaultQty: 1, category: "kitchen" },
  { id: "microwave", nameAr: "مايكروويف", icon: "📡", watts: 1000, defaultHours: 0.5, defaultQty: 1, category: "kitchen" },
  { id: "dishwasher", nameAr: "غسالة أطباق", icon: "🍽️", watts: 1800, defaultHours: 1, defaultQty: 1, category: "kitchen" },
  // Laundry
  { id: "washer", nameAr: "غسالة ملابس", icon: "👕", watts: 500, defaultHours: 1, defaultQty: 1, category: "laundry" },
  { id: "dryer", nameAr: "نشافة ملابس", icon: "🌀", watts: 3000, defaultHours: 1, defaultQty: 1, category: "laundry" },
  { id: "iron", nameAr: "مكواة", icon: "👔", watts: 1200, defaultHours: 0.5, defaultQty: 1, category: "laundry" },
  // Lighting
  { id: "led-bulb", nameAr: "لمبة LED", icon: "💡", watts: 10, defaultHours: 8, defaultQty: 10, category: "lighting" },
  { id: "old-bulb", nameAr: "لمبة عادية", icon: "🔆", watts: 60, defaultHours: 8, defaultQty: 5, category: "lighting" },
  // Other
  { id: "tv", nameAr: "تلفزيون", icon: "📺", watts: 100, defaultHours: 6, defaultQty: 1, category: "other" },
  { id: "computer", nameAr: "كمبيوتر", icon: "💻", watts: 300, defaultHours: 6, defaultQty: 1, category: "other" },
  { id: "router", nameAr: "راوتر إنترنت", icon: "📶", watts: 12, defaultHours: 24, defaultQty: 1, category: "other" },
  { id: "charger", nameAr: "شاحن جوال", icon: "🔌", watts: 20, defaultHours: 3, defaultQty: 2, category: "other" },
];

export const APPLIANCE_CATEGORIES: { id: ApplianceInfo["category"]; labelAr: string }[] = [
  { id: "cooling", labelAr: "تبريد وتكييف" },
  { id: "heating", labelAr: "تسخين" },
  { id: "kitchen", labelAr: "مطبخ" },
  { id: "laundry", labelAr: "غسيل" },
  { id: "lighting", labelAr: "إضاءة" },
  { id: "other", labelAr: "أخرى" },
];

/** Quick consumption presets */
export const QUICK_CONSUMPTION = [
  { label: "شقة صغيرة (صيف)", kWh: 2000, icon: "🏠" },
  { label: "شقة متوسطة (صيف)", kWh: 3500, icon: "🏘️" },
  { label: "فيلا صغيرة (صيف)", kWh: 5000, icon: "🏡" },
  { label: "فيلا كبيرة (صيف)", kWh: 8000, icon: "🏰" },
  { label: "شقة صغيرة (شتاء)", kWh: 800, icon: "❄️" },
  { label: "شقة متوسطة (شتاء)", kWh: 1500, icon: "🌨️" },
];

/* ═══════════════ Calculation ═══════════════ */

export function calculateBill(consumption: number, sectorId: SectorType): ElectricityResult | null {
  const sector = SECTORS.find((s) => s.id === sectorId);
  if (!sector || consumption <= 0) return null;

  const breakdown: BillBreakdown[] = [];
  let remaining = consumption;
  let consumptionCost = 0;

  sector.tiers.forEach((tier, i) => {
    if (remaining <= 0) return;
    const tierMax = tier.to === Infinity ? remaining : tier.to - tier.from + 1;
    const kWh = Math.min(remaining, tierMax);
    const cost = kWh * tier.rateSAR;

    breakdown.push({
      tier: i + 1,
      from: tier.from,
      to: tier.to === Infinity ? tier.from + kWh - 1 : tier.to,
      kWh,
      rateHalalas: tier.rate,
      cost,
    });

    consumptionCost += cost;
    remaining -= kWh;
  });

  const meterFee = sector.meterFee;
  const subtotal = consumptionCost + meterFee;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;
  const avgCostPerKwh = consumption > 0 ? total / consumption : 0;
  const dailyCost = total / 30;

  return {
    sector,
    consumption,
    breakdown,
    consumptionCost,
    meterFee,
    subtotal,
    vat,
    total,
    avgCostPerKwh,
    dailyCost,
  };
}

export function calculateAppliance(
  appliance: ApplianceInfo,
  qty: number,
  hoursPerDay: number,
  sectorId: SectorType = "residential"
): ApplianceCalc {
  const monthlyKwh = (appliance.watts / 1000) * qty * hoursPerDay * 30;
  // Estimate cost using first tier rate for simplicity
  const sector = SECTORS.find((s) => s.id === sectorId);
  const rate = sector?.tiers[0]?.rateSAR ?? 0.18;
  const monthlyCost = monthlyKwh * rate * (1 + VAT_RATE);

  return { appliance, qty, hoursPerDay, monthlyKwh, monthlyCost };
}

/* ═══════════════ Formatting ═══════════════ */

export function fmt(value: number): string {
  return value.toLocaleString("ar-SA", { maximumFractionDigits: 2 });
}

export function fmtInt(value: number): string {
  return Math.round(value).toLocaleString("ar-SA");
}
