/**
 * Currency Converter — حاسبة تحويل العملات
 * SAR-centric with 25+ currencies, static rates with live fetch option
 */

/* ═══════════════ Types ═══════════════ */

export interface CurrencyInfo {
  code: string;
  nameAr: string;
  nameEn: string;
  flag: string;
  symbol: string;
  /** How many units of this currency = 1 SAR */
  ratePerSAR: number;
  /** Country/region in Arabic */
  countryAr: string;
  /** Category for grouping */
  category: "remittance" | "western" | "gulf" | "arab" | "other";
  /** Is this a popular/frequent pair? */
  popular: boolean;
}

export interface ConversionResult {
  fromAmount: number;
  toAmount: number;
  fromCurrency: CurrencyInfo;
  toCurrency: CurrencyInfo;
  rate: number;
  inverseRate: number;
}

export interface MultiConversionResult {
  amount: number;
  baseCurrency: CurrencyInfo;
  conversions: { currency: CurrencyInfo; amount: number; rate: number }[];
}

/* ═══════════════ Currency Data ═══════════════ */

export const CURRENCIES: CurrencyInfo[] = [
  // ── SAR (base) ──
  { code: "SAR", nameAr: "ريال سعودي", nameEn: "Saudi Riyal", flag: "🇸🇦", symbol: "ر.س", ratePerSAR: 1, countryAr: "السعودية", category: "gulf", popular: true },

  // ── Remittance currencies (highest demand from expats) ──
  { code: "EGP", nameAr: "جنيه مصري", nameEn: "Egyptian Pound", flag: "🇪🇬", symbol: "ج.م", ratePerSAR: 13.28, countryAr: "مصر", category: "remittance", popular: true },
  { code: "PKR", nameAr: "روبية باكستانية", nameEn: "Pakistani Rupee", flag: "🇵🇰", symbol: "₨", ratePerSAR: 74.40, countryAr: "باكستان", category: "remittance", popular: true },
  { code: "INR", nameAr: "روبية هندية", nameEn: "Indian Rupee", flag: "🇮🇳", symbol: "₹", ratePerSAR: 22.71, countryAr: "الهند", category: "remittance", popular: true },
  { code: "BDT", nameAr: "تاكا بنغلاديشية", nameEn: "Bangladeshi Taka", flag: "🇧🇩", symbol: "৳", ratePerSAR: 32.73, countryAr: "بنغلاديش", category: "remittance", popular: true },
  { code: "PHP", nameAr: "بيسو فلبيني", nameEn: "Philippine Peso", flag: "🇵🇭", symbol: "₱", ratePerSAR: 15.21, countryAr: "الفلبين", category: "remittance", popular: true },
  { code: "IDR", nameAr: "روبية إندونيسية", nameEn: "Indonesian Rupiah", flag: "🇮🇩", symbol: "Rp", ratePerSAR: 4533, countryAr: "إندونيسيا", category: "remittance", popular: true },
  { code: "NPR", nameAr: "روبية نيبالية", nameEn: "Nepalese Rupee", flag: "🇳🇵", symbol: "₨", ratePerSAR: 36.31, countryAr: "نيبال", category: "remittance", popular: false },
  { code: "LKR", nameAr: "روبية سريلانكية", nameEn: "Sri Lankan Rupee", flag: "🇱🇰", symbol: "₨", ratePerSAR: 80.0, countryAr: "سريلانكا", category: "remittance", popular: false },
  { code: "ETB", nameAr: "بير إثيوبي", nameEn: "Ethiopian Birr", flag: "🇪🇹", symbol: "Br", ratePerSAR: 33.87, countryAr: "إثيوبيا", category: "remittance", popular: false },

  // ── Western currencies ──
  { code: "USD", nameAr: "دولار أمريكي", nameEn: "US Dollar", flag: "🇺🇸", symbol: "$", ratePerSAR: 0.2667, countryAr: "أمريكا", category: "western", popular: true },
  { code: "EUR", nameAr: "يورو", nameEn: "Euro", flag: "🇪🇺", symbol: "€", ratePerSAR: 0.2340, countryAr: "أوروبا", category: "western", popular: true },
  { code: "GBP", nameAr: "جنيه إسترليني", nameEn: "British Pound", flag: "🇬🇧", symbol: "£", ratePerSAR: 0.1988, countryAr: "بريطانيا", category: "western", popular: true },
  { code: "CHF", nameAr: "فرنك سويسري", nameEn: "Swiss Franc", flag: "🇨🇭", symbol: "CHF", ratePerSAR: 0.2178, countryAr: "سويسرا", category: "western", popular: false },
  { code: "CAD", nameAr: "دولار كندي", nameEn: "Canadian Dollar", flag: "🇨🇦", symbol: "C$", ratePerSAR: 0.3680, countryAr: "كندا", category: "western", popular: false },
  { code: "AUD", nameAr: "دولار أسترالي", nameEn: "Australian Dollar", flag: "🇦🇺", symbol: "A$", ratePerSAR: 0.4080, countryAr: "أستراليا", category: "western", popular: false },

  // ── Gulf / GCC currencies ──
  { code: "AED", nameAr: "درهم إماراتي", nameEn: "UAE Dirham", flag: "🇦🇪", symbol: "د.إ", ratePerSAR: 0.9793, countryAr: "الإمارات", category: "gulf", popular: true },
  { code: "KWD", nameAr: "دينار كويتي", nameEn: "Kuwaiti Dinar", flag: "🇰🇼", symbol: "د.ك", ratePerSAR: 0.0822, countryAr: "الكويت", category: "gulf", popular: true },
  { code: "BHD", nameAr: "دينار بحريني", nameEn: "Bahraini Dinar", flag: "🇧🇭", symbol: "د.ب", ratePerSAR: 0.1003, countryAr: "البحرين", category: "gulf", popular: false },
  { code: "OMR", nameAr: "ريال عماني", nameEn: "Omani Rial", flag: "🇴🇲", symbol: "ر.ع", ratePerSAR: 0.1026, countryAr: "عُمان", category: "gulf", popular: false },
  { code: "QAR", nameAr: "ريال قطري", nameEn: "Qatari Riyal", flag: "🇶🇦", symbol: "ر.ق", ratePerSAR: 0.9707, countryAr: "قطر", category: "gulf", popular: false },

  // ── Arab currencies ──
  { code: "JOD", nameAr: "دينار أردني", nameEn: "Jordanian Dinar", flag: "🇯🇴", symbol: "د.أ", ratePerSAR: 0.1889, countryAr: "الأردن", category: "arab", popular: false },
  { code: "YER", nameAr: "ريال يمني", nameEn: "Yemeni Rial", flag: "🇾🇪", symbol: "ر.ي", ratePerSAR: 63.57, countryAr: "اليمن", category: "arab", popular: true },
  { code: "SDG", nameAr: "جنيه سوداني", nameEn: "Sudanese Pound", flag: "🇸🇩", symbol: "ج.س", ratePerSAR: 160.0, countryAr: "السودان", category: "arab", popular: true },
  { code: "SYP", nameAr: "ليرة سورية", nameEn: "Syrian Pound", flag: "🇸🇾", symbol: "ل.س", ratePerSAR: 3467, countryAr: "سوريا", category: "arab", popular: true },
  { code: "IQD", nameAr: "دينار عراقي", nameEn: "Iraqi Dinar", flag: "🇮🇶", symbol: "ع.د", ratePerSAR: 349.6, countryAr: "العراق", category: "arab", popular: false },
  { code: "LBP", nameAr: "ليرة لبنانية", nameEn: "Lebanese Pound", flag: "🇱🇧", symbol: "ل.ل", ratePerSAR: 23867, countryAr: "لبنان", category: "arab", popular: false },
  { code: "MAD", nameAr: "درهم مغربي", nameEn: "Moroccan Dirham", flag: "🇲🇦", symbol: "د.م", ratePerSAR: 2.52, countryAr: "المغرب", category: "arab", popular: false },
  { code: "TND", nameAr: "دينار تونسي", nameEn: "Tunisian Dinar", flag: "🇹🇳", symbol: "د.ت", ratePerSAR: 0.828, countryAr: "تونس", category: "arab", popular: false },
  { code: "DZD", nameAr: "دينار جزائري", nameEn: "Algerian Dinar", flag: "🇩🇿", symbol: "د.ج", ratePerSAR: 35.73, countryAr: "الجزائر", category: "arab", popular: false },

  // ── Other popular ──
  { code: "TRY", nameAr: "ليرة تركية", nameEn: "Turkish Lira", flag: "🇹🇷", symbol: "₺", ratePerSAR: 10.27, countryAr: "تركيا", category: "other", popular: true },
  { code: "MYR", nameAr: "رينغيت ماليزي", nameEn: "Malaysian Ringgit", flag: "🇲🇾", symbol: "RM", ratePerSAR: 1.14, countryAr: "ماليزيا", category: "other", popular: false },
  { code: "CNY", nameAr: "يوان صيني", nameEn: "Chinese Yuan", flag: "🇨🇳", symbol: "¥", ratePerSAR: 1.93, countryAr: "الصين", category: "other", popular: false },
  { code: "JPY", nameAr: "ين ياباني", nameEn: "Japanese Yen", flag: "🇯🇵", symbol: "¥", ratePerSAR: 38.67, countryAr: "اليابان", category: "other", popular: false },
  { code: "KRW", nameAr: "وون كوري", nameEn: "South Korean Won", flag: "🇰🇷", symbol: "₩", ratePerSAR: 386.4, countryAr: "كوريا", category: "other", popular: false },
];

/** Last updated date for static rates */
export const RATES_LAST_UPDATED = "2026-04-10";

/** Popular pairs for hero section */
export const POPULAR_PAIRS = CURRENCIES.filter((c) => c.popular && c.code !== "SAR");

/** Quick amounts for conversion */
export const QUICK_AMOUNTS = [100, 500, 1000, 2000, 5000, 10000];

/** Category labels */
export const CATEGORY_LABELS: Record<CurrencyInfo["category"], { labelAr: string; icon: string }> = {
  remittance: { labelAr: "عملات التحويلات", icon: "💸" },
  western: { labelAr: "العملات الغربية", icon: "🌍" },
  gulf: { labelAr: "عملات الخليج", icon: "🏜️" },
  arab: { labelAr: "العملات العربية", icon: "🌙" },
  other: { labelAr: "عملات أخرى", icon: "🌐" },
};

/* ═══════════════ Conversion Functions ═══════════════ */

export function getCurrency(code: string): CurrencyInfo | undefined {
  return CURRENCIES.find((c) => c.code === code);
}

export function convert(amount: number, fromCode: string, toCode: string): ConversionResult | null {
  const from = getCurrency(fromCode);
  const to = getCurrency(toCode);
  if (!from || !to || amount <= 0) return null;

  // Convert: from → SAR → to
  const amountInSAR = amount / from.ratePerSAR;
  const toAmount = amountInSAR * to.ratePerSAR;

  // Direct rate: 1 FROM = ? TO
  const rate = to.ratePerSAR / from.ratePerSAR;
  const inverseRate = from.ratePerSAR / to.ratePerSAR;

  return { fromAmount: amount, toAmount, fromCurrency: from, toCurrency: to, rate, inverseRate };
}

export function convertMulti(amount: number, fromCode: string, toCodes: string[]): MultiConversionResult | null {
  const base = getCurrency(fromCode);
  if (!base || amount <= 0) return null;

  const conversions = toCodes
    .map((code) => {
      const result = convert(amount, fromCode, code);
      if (!result) return null;
      return { currency: result.toCurrency, amount: result.toAmount, rate: result.rate };
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);

  return { amount, baseCurrency: base, conversions };
}

/** Generate quick conversion table: [amount] → converted amounts */
export function quickTable(fromCode: string, toCode: string): { amount: number; converted: number }[] {
  return QUICK_AMOUNTS.map((amount) => {
    const result = convert(amount, fromCode, toCode);
    return { amount, converted: result?.toAmount ?? 0 };
  });
}

/* ═══════════════ Formatting ═══════════════ */

export function fmtCurrency(value: number, decimals?: number): string {
  const dec = decimals ?? (value < 1 ? 4 : value < 100 ? 2 : 0);
  return value.toLocaleString("ar-SA", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export function fmtRate(value: number): string {
  if (value >= 1000) return value.toLocaleString("ar-SA", { maximumFractionDigits: 0 });
  if (value >= 100) return value.toLocaleString("ar-SA", { maximumFractionDigits: 2 });
  if (value >= 1) return value.toLocaleString("ar-SA", { maximumFractionDigits: 4 });
  return value.toLocaleString("ar-SA", { minimumFractionDigits: 4, maximumFractionDigits: 6 });
}
