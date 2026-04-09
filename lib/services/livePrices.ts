/**
 * Live Prices Service
 * Fetches real-time gold, silver, and crypto prices
 */

export interface PriceData {
  goldPricePerGram: number; // SAR per gram (24K)
  silverPricePerGram: number; // SAR per gram
  lastUpdated: string; // ISO timestamp
  source: string;
}

export interface CryptoPrice {
  symbol: string;
  name: string;
  nameAr: string;
  priceUSD: number;
  priceSAR: number;
  change24h: number;
  icon: string;
}

export interface TadawulStock {
  symbol: string;
  name: string;
  nameAr: string;
  price: number; // SAR
  change: number; // percentage
  sector: string;
}

// USD to SAR exchange rate (approximate, updated periodically)
const USD_TO_SAR = 3.75;

// Fallback prices (updated April 2026 approximate)
const FALLBACK_GOLD_PRICE = 330; // SAR/gram 24K
const FALLBACK_SILVER_PRICE = 3.8; // SAR/gram

/**
 * Fetch live gold and silver prices
 * Uses multiple free API sources with fallbacks
 */
export async function fetchMetalPrices(): Promise<PriceData> {
  try {
    // Try fetching from metals API (free tier)
    const res = await fetch(
      "https://api.metalpriceapi.com/v1/latest?api_key=demo&base=XAU&currencies=SAR",
      { signal: AbortSignal.timeout(5000) }
    );

    if (res.ok) {
      const data = await res.json();
      if (data.rates?.SAR) {
        // XAU is price per troy ounce, convert to per gram
        const goldPerOzSAR = data.rates.SAR;
        const goldPerGram = goldPerOzSAR / 31.1035;
        return {
          goldPricePerGram: Math.round(goldPerGram * 100) / 100,
          silverPricePerGram: FALLBACK_SILVER_PRICE,
          lastUpdated: new Date().toISOString(),
          source: "metalpriceapi.com",
        };
      }
    }
  } catch {
    // Fallback
  }

  try {
    // Alternative: Gold API
    const res2 = await fetch(
      "https://www.goldapi.io/api/XAU/SAR",
      {
        headers: { "x-access-token": "goldapi-demo" },
        signal: AbortSignal.timeout(5000),
      }
    );
    if (res2.ok) {
      const data2 = await res2.json();
      if (data2.price_gram_24k) {
        return {
          goldPricePerGram: Math.round(data2.price_gram_24k * 100) / 100,
          silverPricePerGram: data2.price_gram_silver
            ? Math.round(data2.price_gram_silver * 100) / 100
            : FALLBACK_SILVER_PRICE,
          lastUpdated: new Date().toISOString(),
          source: "goldapi.io",
        };
      }
    }
  } catch {
    // Fallback
  }

  // Return fallback prices
  return {
    goldPricePerGram: FALLBACK_GOLD_PRICE,
    silverPricePerGram: FALLBACK_SILVER_PRICE,
    lastUpdated: new Date().toISOString(),
    source: "offline",
  };
}

/**
 * Fetch cryptocurrency prices
 * Uses CoinGecko free API
 */
export async function fetchCryptoPrices(): Promise<CryptoPrice[]> {
  const CRYPTO_LIST = [
    { id: "bitcoin", symbol: "BTC", name: "Bitcoin", nameAr: "بيتكوين", icon: "₿" },
    { id: "ethereum", symbol: "ETH", name: "Ethereum", nameAr: "إيثريوم", icon: "Ξ" },
    { id: "tether", symbol: "USDT", name: "Tether", nameAr: "تيثر", icon: "₮" },
    { id: "binancecoin", symbol: "BNB", name: "BNB", nameAr: "بي إن بي", icon: "◆" },
    { id: "solana", symbol: "SOL", name: "Solana", nameAr: "سولانا", icon: "◎" },
    { id: "ripple", symbol: "XRP", name: "XRP", nameAr: "ريبل", icon: "✕" },
    { id: "cardano", symbol: "ADA", name: "Cardano", nameAr: "كاردانو", icon: "₳" },
    { id: "dogecoin", symbol: "DOGE", name: "Dogecoin", nameAr: "دوجكوين", icon: "Ð" },
  ];

  try {
    const ids = CRYPTO_LIST.map((c) => c.id).join(",");
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
      { signal: AbortSignal.timeout(8000) }
    );

    if (res.ok) {
      const data = await res.json();
      return CRYPTO_LIST.map((coin) => {
        const priceData = data[coin.id];
        return {
          symbol: coin.symbol,
          name: coin.name,
          nameAr: coin.nameAr,
          priceUSD: priceData?.usd || 0,
          priceSAR: Math.round((priceData?.usd || 0) * USD_TO_SAR * 100) / 100,
          change24h: priceData?.usd_24h_change || 0,
          icon: coin.icon,
        };
      });
    }
  } catch {
    // Fallback
  }

  // Fallback approximate prices (April 2026)
  return CRYPTO_LIST.map((coin) => {
    const fallbackPrices: Record<string, number> = {
      bitcoin: 85000,
      ethereum: 3500,
      tether: 1,
      binancecoin: 600,
      solana: 180,
      ripple: 2.5,
      cardano: 0.8,
      dogecoin: 0.15,
    };
    const usd = fallbackPrices[coin.id] || 0;
    return {
      symbol: coin.symbol,
      name: coin.name,
      nameAr: coin.nameAr,
      priceUSD: usd,
      priceSAR: Math.round(usd * USD_TO_SAR * 100) / 100,
      change24h: 0,
      icon: coin.icon,
    };
  });
}

/**
 * Popular Tadawul (Saudi Stock Exchange) stocks
 * Users can look up and add these to their portfolio
 */
export const TADAWUL_STOCKS: TadawulStock[] = [
  { symbol: "2222", name: "Saudi Aramco", nameAr: "أرامكو السعودية", price: 28.5, change: 0, sector: "طاقة" },
  { symbol: "1180", name: "Al Rajhi Bank", nameAr: "مصرف الراجحي", price: 95, change: 0, sector: "بنوك" },
  { symbol: "1010", name: "Riyad Bank", nameAr: "بنك الرياض", price: 28, change: 0, sector: "بنوك" },
  { symbol: "1150", name: "Alinma Bank", nameAr: "مصرف الإنماء", price: 30, change: 0, sector: "بنوك" },
  { symbol: "1120", name: "Al Rajhi REIT", nameAr: "الراجحي ريت", price: 10, change: 0, sector: "صناديق" },
  { symbol: "2010", name: "SABIC", nameAr: "سابك", price: 75, change: 0, sector: "بتروكيماويات" },
  { symbol: "2350", name: "Saudi Kayan", nameAr: "كيان السعودية", price: 12, change: 0, sector: "بتروكيماويات" },
  { symbol: "7010", name: "STC", nameAr: "الاتصالات السعودية", price: 42, change: 0, sector: "اتصالات" },
  { symbol: "4030", name: "Al Baik", nameAr: "البيك", price: 0, change: 0, sector: "غذاء" },
  { symbol: "2280", name: "Almarai", nameAr: "المراعي", price: 58, change: 0, sector: "غذاء" },
  { symbol: "2020", name: "SAFCO", nameAr: "سافكو", price: 90, change: 0, sector: "بتروكيماويات" },
  { symbol: "1211", name: "Ma'aden", nameAr: "معادن", price: 52, change: 0, sector: "تعدين" },
  { symbol: "4200", name: "Aldawaa", nameAr: "الدواء", price: 120, change: 0, sector: "صيدلة" },
  { symbol: "4001", name: "Abdullah Al Othaim", nameAr: "العثيم", price: 90, change: 0, sector: "تجزئة" },
  { symbol: "4190", name: "Jarir", nameAr: "جرير", price: 145, change: 0, sector: "تجزئة" },
  { symbol: "2060", name: "National Industrialization", nameAr: "التصنيع", price: 15, change: 0, sector: "صناعة" },
  { symbol: "8200", name: "Bupa Arabia", nameAr: "بوبا العربية", price: 185, change: 0, sector: "تأمين" },
  { symbol: "4003", name: "Extra", nameAr: "إكسترا", price: 65, change: 0, sector: "تجزئة" },
  { symbol: "2381", name: "Petro Rabigh", nameAr: "بترو رابغ", price: 14, change: 0, sector: "بتروكيماويات" },
  { symbol: "1140", name: "Bank AlBilad", nameAr: "بنك البلاد", price: 38, change: 0, sector: "بنوك" },
];
