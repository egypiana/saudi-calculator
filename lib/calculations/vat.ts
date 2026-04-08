/**
 * Comprehensive VAT Calculator
 * Supports multiple countries, custom rates, comparison tables
 */

export interface VATCountry {
  id: string;
  nameAr: string;
  nameEn: string;
  flag: string;
  rate: number;
  currency: string;
  currencyAr: string;
  note?: string;
}

export const VAT_COUNTRIES: VATCountry[] = [
  { id: "sa", nameAr: "السعودية", nameEn: "Saudi Arabia", flag: "🇸🇦", rate: 15, currency: "SAR", currencyAr: "ريال", note: "منذ يوليو 2020" },
  { id: "ae", nameAr: "الإمارات", nameEn: "UAE", flag: "🇦🇪", rate: 5, currency: "AED", currencyAr: "درهم" },
  { id: "bh", nameAr: "البحرين", nameEn: "Bahrain", flag: "🇧🇭", rate: 10, currency: "BHD", currencyAr: "دينار", note: "منذ يناير 2022" },
  { id: "om", nameAr: "عُمان", nameEn: "Oman", flag: "🇴🇲", rate: 5, currency: "OMR", currencyAr: "ريال عماني" },
  { id: "eg", nameAr: "مصر", nameEn: "Egypt", flag: "🇪🇬", rate: 14, currency: "EGP", currencyAr: "جنيه" },
  { id: "jo", nameAr: "الأردن", nameEn: "Jordan", flag: "🇯🇴", rate: 16, currency: "JOD", currencyAr: "دينار" },
  { id: "ma", nameAr: "المغرب", nameEn: "Morocco", flag: "🇲🇦", rate: 20, currency: "MAD", currencyAr: "درهم" },
  { id: "tn", nameAr: "تونس", nameEn: "Tunisia", flag: "🇹🇳", rate: 19, currency: "TND", currencyAr: "دينار" },
  { id: "tr", nameAr: "تركيا", nameEn: "Turkey", flag: "🇹🇷", rate: 20, currency: "TRY", currencyAr: "ليرة" },
  { id: "gb", nameAr: "بريطانيا", nameEn: "UK", flag: "🇬🇧", rate: 20, currency: "GBP", currencyAr: "جنيه" },
  { id: "de", nameAr: "ألمانيا", nameEn: "Germany", flag: "🇩🇪", rate: 19, currency: "EUR", currencyAr: "يورو" },
  { id: "fr", nameAr: "فرنسا", nameEn: "France", flag: "🇫🇷", rate: 20, currency: "EUR", currencyAr: "يورو" },
  { id: "custom", nameAr: "نسبة مخصصة", nameEn: "Custom Rate", flag: "⚙️", rate: 0, currency: "", currencyAr: "" },
];

export type VATMode = "add" | "remove";

export interface VATResult {
  mode: VATMode;
  originalAmount: number;
  vatRate: number;
  beforeVAT: number;
  vatAmount: number;
  afterVAT: number;
  country: VATCountry;
}

export function calculateVAT(amount: number, rate: number, mode: VATMode): { before: number; vat: number; after: number } {
  const rateFraction = rate / 100;
  if (mode === "add") {
    const vat = amount * rateFraction;
    return { before: amount, vat, after: amount + vat };
  } else {
    const before = amount / (1 + rateFraction);
    const vat = amount - before;
    return { before, vat, after: amount };
  }
}

export function generateComparisonTable(amount: number, mode: VATMode): { country: VATCountry; before: number; vat: number; after: number }[] {
  return VAT_COUNTRIES
    .filter((c) => c.id !== "custom" && c.rate > 0)
    .map((country) => ({
      country,
      ...calculateVAT(amount, country.rate, mode),
    }))
    .sort((a, b) => a.country.rate - b.country.rate);
}

export const QUICK_AMOUNTS = [100, 500, 1000, 2000, 5000, 10000, 50000, 100000];

export const fmt = (n: number) => n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });

// Saudi VAT exempt/zero-rated items
export const EXEMPT_ITEMS = [
  { category: "معفاة من الضريبة", items: ["الخدمات المالية المنظمة", "التأمين على الحياة", "تأجير العقارات السكنية", "إصدار جوازات السفر والرخص", "بعض الخدمات الحكومية"] },
  { category: "خاضعة بنسبة صفر (0%)", items: ["الصادرات خارج دول الخليج", "النقل الدولي", "الأدوية والمعدات الطبية المعتمدة", "المعادن الاستثمارية (الذهب والفضة النقية)", "التوريدات لدول مجلس التعاون"] },
];
