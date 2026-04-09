"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import {
  fetchMetalPrices,
  fetchCryptoPrices,
  TADAWUL_STOCKS,
  type PriceData,
  type CryptoPrice,
} from "@/lib/services/livePrices";

interface LivePricesPanelProps {
  goldPrice: number;
  silverPrice: number;
  onGoldPriceChange: (price: number) => void;
  onSilverPriceChange: (price: number) => void;
  onStockValueAdd: (value: number) => void;
  onCryptoValueSet: (fieldId: string, value: number) => void;
}

type TabId = "metals" | "stocks" | "crypto";

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "metals", label: "أسعار المعادن", icon: "🥇" },
  { id: "stocks", label: "أسهم تداول", icon: "📈" },
  { id: "crypto", label: "العملات الرقمية", icon: "₿" },
];

const CRYPTO_FIELD_MAP: Record<string, string> = {
  BTC: "crypto_btc_value",
  ETH: "crypto_eth_value",
  USDT: "crypto_usdt_value",
  BNB: "crypto_bnb_value",
  SOL: "crypto_sol_value",
};

function formatNumber(n: number): string {
  return new Intl.NumberFormat("ar-SA", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(n);
}

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "--:--";
  }
}

// ---------------------------------------------------------------------------
// Skeleton placeholder
// ---------------------------------------------------------------------------
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-gray-200 dark:bg-gray-700 ${className}`}
    />
  );
}

// ---------------------------------------------------------------------------
// Spinner
// ---------------------------------------------------------------------------
function Spinner({ size = 16 }: { size?: number }) {
  return (
    <svg
      className="animate-spin text-green-600 dark:text-green-400"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function LivePricesPanel({
  goldPrice,
  silverPrice,
  onGoldPriceChange,
  onSilverPriceChange,
  onStockValueAdd,
  onCryptoValueSet,
}: LivePricesPanelProps) {
  useLocale();
  const [activeTab, setActiveTab] = useState<TabId>("metals");

  // Metals state
  const [metalLoading, setMetalLoading] = useState(false);
  const [metalData, setMetalData] = useState<PriceData | null>(null);
  const [metalError, setMetalError] = useState(false);

  // Stocks state
  const [stockSearch, setStockSearch] = useState("");
  const [stockQuantities, setStockQuantities] = useState<Record<string, number>>({});

  // Crypto state
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  const [cryptoLoading, setCryptoLoading] = useState(false);
  const [cryptoLoaded, setCryptoLoaded] = useState(false);
  const [cryptoQuantities, setCryptoQuantities] = useState<Record<string, number>>({});
  const [cryptoAdded, setCryptoAdded] = useState<Record<string, boolean>>({});

  // ------- Metals -------
  const handleFetchMetals = useCallback(async () => {
    setMetalLoading(true);
    setMetalError(false);
    try {
      const data = await fetchMetalPrices();
      setMetalData(data);
      onGoldPriceChange(data.goldPricePerGram);
      onSilverPriceChange(data.silverPricePerGram);
      if (data.source === "offline") {
        setMetalError(true);
      }
    } catch {
      setMetalError(true);
    } finally {
      setMetalLoading(false);
    }
  }, [onGoldPriceChange, onSilverPriceChange]);

  // ------- Crypto -------
  const handleFetchCrypto = useCallback(async () => {
    setCryptoLoading(true);
    try {
      const prices = await fetchCryptoPrices();
      setCryptoPrices(prices);
      setCryptoLoaded(true);
    } catch {
      // fallback handled inside service
    } finally {
      setCryptoLoading(false);
    }
  }, []);

  // Auto-fetch crypto on mount
  useEffect(() => {
    handleFetchCrypto();
  }, [handleFetchCrypto]);

  // ------- Stocks helpers -------
  const filteredStocks = stockSearch.trim()
    ? TADAWUL_STOCKS.filter(
        (s) =>
          s.name.toLowerCase().includes(stockSearch.toLowerCase()) ||
          s.nameAr.includes(stockSearch) ||
          s.symbol.includes(stockSearch)
      )
    : TADAWUL_STOCKS;

  const stockPortfolioTotal = Object.entries(stockQuantities).reduce(
    (sum, [symbol, qty]) => {
      const stock = TADAWUL_STOCKS.find((s) => s.symbol === symbol);
      return sum + (stock ? stock.price * qty : 0);
    },
    0
  );

  const handleAddStocks = useCallback(() => {
    if (stockPortfolioTotal > 0) {
      onStockValueAdd(stockPortfolioTotal);
    }
  }, [stockPortfolioTotal, onStockValueAdd]);

  // ------- Crypto helpers -------
  const handleCryptoAdd = useCallback(
    (coin: CryptoPrice) => {
      const qty = cryptoQuantities[coin.symbol] || 0;
      if (qty <= 0) return;
      const value = Math.round(qty * coin.priceSAR * 100) / 100;
      const fieldId = CRYPTO_FIELD_MAP[coin.symbol] || "crypto_other_value";

      if (fieldId === "crypto_other_value") {
        // For "other" coins, we accumulate
        onCryptoValueSet(fieldId, value);
      } else {
        onCryptoValueSet(fieldId, value);
      }
      setCryptoAdded((prev) => ({ ...prev, [coin.symbol]: true }));
      setTimeout(() => {
        setCryptoAdded((prev) => ({ ...prev, [coin.symbol]: false }));
      }, 2000);
    },
    [cryptoQuantities, onCryptoValueSet]
  );

  // ------- Render -------
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      {/* Tab Bar */}
      <div className="flex border-b border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-xs font-semibold transition-colors relative ${
              activeTab === tab.id
                ? "text-green-700 dark:text-green-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <span className="absolute bottom-0 inset-x-3 h-0.5 bg-green-600 dark:bg-green-400 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-5">
        {/* ======================== METALS TAB ======================== */}
        {activeTab === "metals" && (
          <div className="space-y-4">
            {/* Header row */}
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-800 dark:text-white">
                أسعار الذهب والفضة
              </h4>
              <button
                onClick={handleFetchMetals}
                disabled={metalLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors disabled:opacity-50"
              >
                {metalLoading ? (
                  <Spinner size={14} />
                ) : metalData && !metalError ? (
                  <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : null}
                تحديث لحظي
              </button>
            </div>

            {/* Gold input */}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                سعر جرام الذهب (24 قيراط) — ريال سعودي
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={goldPrice || ""}
                  onChange={(e) => onGoldPriceChange(Number(e.target.value) || 0)}
                  placeholder="330"
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500/30 focus:border-green-500 outline-none transition-all tabular-nums text-left"
                  dir="ltr"
                  min={0}
                  step={0.01}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
                  ر.س/جرام
                </span>
              </div>
            </div>

            {/* Silver input */}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                سعر جرام الفضة — ريال سعودي
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={silverPrice || ""}
                  onChange={(e) => onSilverPriceChange(Number(e.target.value) || 0)}
                  placeholder="3.8"
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500/30 focus:border-green-500 outline-none transition-all tabular-nums text-left"
                  dir="ltr"
                  min={0}
                  step={0.01}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
                  ر.س/جرام
                </span>
              </div>
            </div>

            {/* Nisab info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200/60 dark:border-amber-800/30 p-3">
                <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mb-0.5">
                  نصاب الذهب (85 جرام)
                </div>
                <div className="text-sm font-bold text-amber-800 dark:text-amber-300 tabular-nums" dir="ltr">
                  {goldPrice > 0 ? formatNumber(85 * goldPrice) : "—"}{" "}
                  <span className="text-[11px] font-normal">ر.س</span>
                </div>
              </div>
              <div className="rounded-xl bg-gray-100 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/30 p-3">
                <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mb-0.5">
                  نصاب الفضة (595 جرام)
                </div>
                <div className="text-sm font-bold text-gray-700 dark:text-gray-300 tabular-nums" dir="ltr">
                  {silverPrice > 0 ? formatNumber(595 * silverPrice) : "—"}{" "}
                  <span className="text-[11px] font-normal">ر.س</span>
                </div>
              </div>
            </div>

            {/* Status footer */}
            {metalData && (
              <div className="flex items-center gap-2 text-[11px] text-gray-400 dark:text-gray-500">
                {metalError ? (
                  <span className="inline-flex items-center gap-1 text-amber-500">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    أسعار تقريبية (غير متصل)
                  </span>
                ) : (
                  <>
                    <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>آخر تحديث: {formatTime(metalData.lastUpdated)}</span>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <span>المصدر: {metalData.source}</span>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* ======================== STOCKS TAB ======================== */}
        {activeTab === "stocks" && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={stockSearch}
                onChange={(e) => setStockSearch(e.target.value)}
                placeholder="ابحث عن سهم بالاسم أو الرمز..."
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white pr-10 pl-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500/30 focus:border-green-500 outline-none transition-all"
              />
            </div>

            {/* Stock list */}
            <div className="max-h-72 overflow-y-auto space-y-1.5 scrollbar-thin">
              {filteredStocks.map((stock) => {
                const qty = stockQuantities[stock.symbol] || 0;
                const value = qty * stock.price;

                return (
                  <div
                    key={stock.symbol}
                    className="flex items-center gap-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 px-3 py-2 transition-colors hover:border-green-200 dark:hover:border-green-800/40"
                  >
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">
                          {stock.symbol}
                        </span>
                        <span className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">
                          {stock.nameAr}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-gray-500 dark:text-gray-400 tabular-nums" dir="ltr">
                          {stock.price > 0 ? `${formatNumber(stock.price)} ر.س` : "—"}
                        </span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500">
                          {stock.sector}
                        </span>
                      </div>
                    </div>

                    {/* Quantity input */}
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min={0}
                        value={qty || ""}
                        onChange={(e) =>
                          setStockQuantities((prev) => ({
                            ...prev,
                            [stock.symbol]: Math.max(0, Number(e.target.value) || 0),
                          }))
                        }
                        placeholder="عدد"
                        className="w-16 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-2 py-1 text-xs text-center focus:ring-2 focus:ring-green-500/30 focus:border-green-500 outline-none tabular-nums"
                        dir="ltr"
                      />
                      {value > 0 && (
                        <span className="text-[11px] text-green-700 dark:text-green-400 font-medium whitespace-nowrap tabular-nums min-w-[60px] text-left" dir="ltr">
                          {formatNumber(value)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {filteredStocks.length === 0 && (
                <div className="text-center py-6 text-xs text-gray-400 dark:text-gray-500">
                  لا توجد نتائج للبحث
                </div>
              )}
            </div>

            {/* Portfolio total + add button */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
              <div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400">
                  إجمالي المحفظة
                </div>
                <div className="text-sm font-bold text-gray-800 dark:text-white tabular-nums" dir="ltr">
                  {formatNumber(stockPortfolioTotal)}{" "}
                  <span className="text-[11px] font-normal text-gray-400">ر.س</span>
                </div>
              </div>
              <button
                onClick={handleAddStocks}
                disabled={stockPortfolioTotal <= 0}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                أضف للحاسبة
              </button>
            </div>
          </div>
        )}

        {/* ======================== CRYPTO TAB ======================== */}
        {activeTab === "crypto" && (
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-800 dark:text-white">
                أسعار العملات الرقمية
              </h4>
              <button
                onClick={handleFetchCrypto}
                disabled={cryptoLoading}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors disabled:opacity-50"
              >
                {cryptoLoading ? <Spinner size={12} /> : null}
                تحديث
              </button>
            </div>

            {/* Loading skeletons */}
            {cryptoLoading && !cryptoLoaded && (
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 p-3">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="w-24 h-3" />
                      <Skeleton className="w-16 h-2.5" />
                    </div>
                    <Skeleton className="w-16 h-7 rounded-lg" />
                  </div>
                ))}
              </div>
            )}

            {/* Crypto list */}
            {cryptoPrices.length > 0 && (
              <div className="space-y-1.5">
                {cryptoPrices.map((coin) => {
                  const qty = cryptoQuantities[coin.symbol] || 0;
                  const value = qty * coin.priceSAR;
                  const isAdded = cryptoAdded[coin.symbol];
                  const isPositive = coin.change24h >= 0;

                  return (
                    <div
                      key={coin.symbol}
                      className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 p-3 transition-colors hover:border-green-200 dark:hover:border-green-800/40"
                    >
                      <div className="flex items-center gap-2.5">
                        {/* Icon */}
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-300 shrink-0">
                          {coin.icon}
                        </div>

                        {/* Name + price */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                              {coin.nameAr}
                            </span>
                            <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">
                              {coin.symbol}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] text-gray-600 dark:text-gray-400 tabular-nums" dir="ltr">
                              {formatNumber(coin.priceSAR)} ر.س
                            </span>
                            <span
                              className={`text-[10px] font-medium tabular-nums ${
                                isPositive
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-500 dark:text-red-400"
                              }`}
                              dir="ltr"
                            >
                              {isPositive ? "▲" : "▼"}{" "}
                              {Math.abs(coin.change24h).toFixed(2)}%
                            </span>
                          </div>
                        </div>

                        {/* Quantity + add */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <input
                            type="number"
                            min={0}
                            step="any"
                            value={cryptoQuantities[coin.symbol] || ""}
                            onChange={(e) =>
                              setCryptoQuantities((prev) => ({
                                ...prev,
                                [coin.symbol]: Math.max(0, Number(e.target.value) || 0),
                              }))
                            }
                            placeholder="الكمية"
                            className="w-[70px] rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-2 py-1 text-xs text-center focus:ring-2 focus:ring-green-500/30 focus:border-green-500 outline-none tabular-nums"
                            dir="ltr"
                          />
                          <button
                            onClick={() => handleCryptoAdd(coin)}
                            disabled={qty <= 0}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                              isAdded
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                : "bg-green-600 text-white hover:bg-green-700 disabled:opacity-30 disabled:cursor-not-allowed"
                            }`}
                          >
                            {isAdded ? (
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              "أضف"
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Value row */}
                      {value > 0 && (
                        <div className="mt-1.5 pt-1.5 border-t border-gray-100 dark:border-gray-700/40 flex items-center justify-between">
                          <span className="text-[11px] text-gray-400 dark:text-gray-500">
                            القيمة
                          </span>
                          <span className="text-xs font-semibold text-green-700 dark:text-green-400 tabular-nums" dir="ltr">
                            {formatNumber(value)} ر.س
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
