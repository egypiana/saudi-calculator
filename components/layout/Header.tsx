"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  Menu,
  X,
  Search,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { lp } from "@/lib/utils/locale";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const tc = useTranslations("common");

  const navLinks = [
    { label: t("home"), href: lp(locale, "/"), icon: "🏠" },
    { label: t("countdowns"), href: lp(locale, "/countdowns"), icon: "⏰" },
    { label: t("calculators"), href: lp(locale, "/calculators"), icon: "🧮" },
    { label: t("blog"), href: lp(locale, "/blog"), icon: "📝" },
  ];

  const trendingLinks = [
    { label: locale === "ar" ? "عداد رمضان" : "Ramadan", href: lp(locale, "/countdowns/ramadan"), icon: "🌙" },
    { label: locale === "ar" ? "حاسبة الزكاة" : "Zakat", href: lp(locale, "/calculators/zakat"), icon: "💰" },
    { label: locale === "ar" ? "الراتب" : "Salary", href: lp(locale, "/countdowns/salaries-dates"), icon: "💵" },
    { label: locale === "ar" ? "القيمة المضافة" : "VAT", href: lp(locale, "/calculators/vat"), icon: "🏷️" },
    { label: locale === "ar" ? "نهاية الخدمة" : "End of Service", href: lp(locale, "/calculators/end-of-service"), icon: "📋" },
    { label: locale === "ar" ? "اليوم الوطني" : "National Day", href: lp(locale, "/countdowns/national-day"), icon: "🇸🇦" },
  ];

  const isActive = (href: string) => {
    const homePath = lp(locale, "/");
    if (href === homePath) return pathname === homePath || pathname === "/";
    return pathname.startsWith(href);
  };


  return (
    <>
      {/* الهيدر الرئيسي */}
      <header className="bg-primary-600 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            {/* اللوجو */}
            <Link
              href={lp(locale, "/")}
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
            >
              <div className="bg-white/15 rounded-xl p-1.5 flex-shrink-0">
                <svg width="32" height="32" viewBox="0 0 44 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="40" height="40" rx="10" fill="white" fillOpacity="0.2"/>
                  <rect x="8" y="9" width="28" height="10" rx="3" fill="white" fillOpacity="0.9"/>
                  <rect x="9" y="25" width="7" height="5" rx="1.5" fill="white" fillOpacity="0.7"/>
                  <rect x="19" y="25" width="7" height="5" rx="1.5" fill="white" fillOpacity="0.7"/>
                  <rect x="29" y="25" width="7" height="5" rx="1.5" fill="#c9a84c"/>
                  <rect x="9" y="33" width="7" height="5" rx="1.5" fill="white" fillOpacity="0.7"/>
                  <rect x="19" y="33" width="7" height="5" rx="1.5" fill="white" fillOpacity="0.7"/>
                  <rect x="29" y="33" width="7" height="5" rx="1.5" fill="#c9a84c"/>
                  <rect x="32" y="0" width="16" height="12" rx="4" fill="#c9a84c"/>
                  <text x="40" y="9" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="bold" fill="white" textAnchor="middle">VIP</text>
                </svg>
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-white font-bold text-lg whitespace-nowrap">
                  {locale === "ar" ? "حاسبة VIP" : "Calculator VIP"}
                </span>
              </div>
            </Link>

            {/* قائمة التنقل — ديسكتوب */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                    isActive(link.href)
                      ? "bg-white text-primary-600"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* الأزرار */}
            <div className="flex items-center gap-1">
              {/* البحث */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                aria-label={tc("search")}
              >
                <Search className="h-5 w-5" />
              </button>

              {/* الوضع الليلي */}
              <button
                onClick={toggleTheme}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                aria-label={theme === "dark" ? tc("lightMode") : tc("darkMode")}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* قائمة الموبايل */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                aria-label={tc("menu")}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* شريط البحث */}
          {searchOpen && (
            <div className="pb-3 animate-slide-in">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `${lp(locale, "/search")}?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="flex gap-2"
              >
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={locale === "ar" ? "ابحث عن حاسبة أو عداد..." : "Search calculators..."}
                  className="flex-1 px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-gold"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gold hover:bg-gold-600 text-white font-bold rounded-lg transition-colors"
                >
                  {tc("search")}
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* شريط الروابط السريعة */}
      <div className="hidden md:flex bg-primary-800 h-10 items-center sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-center gap-0.5">
          {trendingLinks.map((link, i) => (
            <span key={link.href} className="flex items-center">
              <Link
                href={link.href}
                className={`font-medium text-sm transition-colors px-2.5 py-1 rounded-md ${
                  isActive(link.href)
                    ? "text-gold font-bold"
                    : "text-white/90 hover:text-gold hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
              {i < trendingLinks.length - 1 && (
                <span className="text-white/20 text-xs select-none">|</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* قائمة الموبايل */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 end-0 h-full w-80 max-w-[90vw] bg-primary-600 z-50 shadow-2xl flex flex-col overflow-hidden animate-slide-in-right">
            {/* رأس القائمة */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/15 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="bg-white/15 rounded-lg p-1">
                  <svg width="26" height="26" viewBox="0 0 44 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="4" width="40" height="40" rx="10" fill="white" fillOpacity="0.2"/>
                    <rect x="8" y="9" width="28" height="10" rx="3" fill="white" fillOpacity="0.9"/>
                    <rect x="9" y="25" width="7" height="5" rx="1.5" fill="white" fillOpacity="0.7"/>
                    <rect x="19" y="25" width="7" height="5" rx="1.5" fill="white" fillOpacity="0.7"/>
                    <rect x="29" y="25" width="7" height="5" rx="1.5" fill="#c9a84c"/>
                    <rect x="9" y="33" width="7" height="5" rx="1.5" fill="white" fillOpacity="0.7"/>
                    <rect x="19" y="33" width="7" height="5" rx="1.5" fill="white" fillOpacity="0.7"/>
                    <rect x="29" y="33" width="7" height="5" rx="1.5" fill="#c9a84c"/>
                    <rect x="32" y="0" width="16" height="12" rx="4" fill="#c9a84c"/>
                    <text x="40" y="9" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="bold" fill="white" textAnchor="middle">VIP</text>
                  </svg>
                </div>
                <span className="text-white font-bold text-base">
                  {locale === "ar" ? "حاسبة VIP" : "Calculator VIP"}
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/15 rounded-lg transition-colors"
                aria-label={tc("close")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* محتوى القائمة */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                      isActive(link.href)
                        ? "bg-white text-primary-600"
                        : "text-white hover:bg-white/15"
                    }`}
                  >
                    <span className="text-base">{link.icon}</span>
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div>
                <p className="text-white/50 text-xs font-semibold px-1 mb-2">
                  {locale === "ar" ? "الأكثر بحثاً" : "Trending"}
                </p>
                <div className="flex flex-col gap-1">
                  {trendingLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors font-medium ${
                        isActive(link.href)
                          ? "bg-gold/20 text-gold"
                          : "text-white/80 hover:bg-white/10"
                      }`}
                    >
                      <span className="text-base">{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
