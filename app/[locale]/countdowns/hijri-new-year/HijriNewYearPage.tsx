"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import ShareButtons from "@/components/shared/ShareButtons";
import HijriNewYearHeroCounter from "./components/HijriNewYearHeroCounter";
import UpcomingHijriNewYear from "./components/UpcomingHijriNewYear";
import AllHijriNewYearYears from "./components/AllHijriNewYearYears";
import HijriNewYearContent from "./components/HijriNewYearContent";
import HijriNewYearWorship from "./components/HijriNewYearWorship";
import HijriNewYearFAQ from "./components/HijriNewYearFAQ";
import HijriNewYearSidebar from "./components/HijriNewYearSidebar";
import { getNextHijriNewYear } from "@/lib/data/hijriNewYearData";

interface HijriNewYearPageProps {
  locale: string;
}

export default function HijriNewYearPage({ locale }: HijriNewYearPageProps) {
  const isAr = locale === "ar";
  const nextHijriNewYear = getNextHijriNewYear();
  const year = nextHijriNewYear?.year || 2026;
  const hijri = nextHijriNewYear?.hijri || "1448 هـ";
  const targetDate = nextHijriNewYear?.newYearDate || "2026-06-16";
  const ashuraDate = nextHijriNewYear?.ashuraDate || "2026-06-25";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        name: isAr ? `رأس السنة الهجرية ${hijri}` : `Hijri New Year ${hijri}`,
        startDate: targetDate,
        location: { "@type": "Place", name: isAr ? "المملكة العربية السعودية" : "Saudi Arabia" },
        description: isAr
          ? `رأس السنة الهجرية ${hijri} — ١ محرم`
          : `Hijri New Year ${hijri} — 1st Muharram`,
      },
      {
        "@type": "WebApplication",
        name: isAr ? `عداد رأس السنة الهجرية ${year}` : `Hijri New Year ${year} Countdown`,
        applicationCategory: "UtilitiesApplication",
        inLanguage: locale,
        offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Counter - Full Width */}
      <HijriNewYearHeroCounter
        targetDate={targetDate}
        year={year}
        hijri={hijri}
        ashuraDate={ashuraDate}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "العدادات", labelEn: "Countdowns", href: "/countdowns" },
          { labelAr: "عداد رأس السنة الهجرية", labelEn: "Hijri New Year Countdown" },
        ]} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          {/* Main Content */}
          <div className="space-y-8">
            <ShareButtons
              title={isAr ? `كم باقي على رأس السنة الهجرية ${hijri}؟` : `Hijri New Year ${hijri} Countdown`}
            />

            <AdSlot id="hijri-new-year-top" size="leaderboard" />

            {/* Upcoming Dates */}
            <UpcomingHijriNewYear locale={locale} />

            {/* All Years Grid */}
            <AllHijriNewYearYears locale={locale} />

            <AdSlot id="hijri-new-year-mid" size="rectangle" />

            {/* Educational Content */}
            <HijriNewYearContent year={year} />

            {/* Worship Guide */}
            <HijriNewYearWorship />

            <AdSlot id="hijri-new-year-bottom" size="leaderboard" />

            {/* FAQ */}
            <HijriNewYearFAQ />
          </div>

          {/* Sidebar - hidden on mobile */}
          <div className="hidden lg:block">
            <HijriNewYearSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
