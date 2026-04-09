"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import ShareButtons from "@/components/shared/ShareButtons";
import LailatulQadrHeroCounter from "./components/LailatulQadrHeroCounter";
import UpcomingLailatulQadr from "./components/UpcomingLailatulQadr";
import AllLailatulQadrYears from "./components/AllLailatulQadrYears";
import LailatulQadrContent from "./components/LailatulQadrContent";
import LailatulQadrWorship from "./components/LailatulQadrWorship";
import LailatulQadrFAQ from "./components/LailatulQadrFAQ";
import LailatulQadrSidebar from "./components/LailatulQadrSidebar";
import { getNextLailatulQadr } from "@/lib/data/lailatulQadrData";

interface LailatulQadrPageProps {
  locale: string;
}

export default function LailatulQadrPage({ locale }: LailatulQadrPageProps) {
  const isAr = locale === "ar";
  const nextLailatulQadr = getNextLailatulQadr();
  const year = nextLailatulQadr?.year || 2026;
  const hijri = nextLailatulQadr?.hijri || "1447 هـ";
  const targetDate = nextLailatulQadr?.night27Date || "2026-03-16";
  const lastTenStart = nextLailatulQadr?.lastTenStart || "2026-03-10";
  const oddNights = nextLailatulQadr ? {
    night21: nextLailatulQadr.night21Date,
    night23: nextLailatulQadr.night23Date,
    night25: nextLailatulQadr.night25Date,
    night27: nextLailatulQadr.night27Date,
    night29: nextLailatulQadr.night29Date,
  } : {
    night21: "2026-03-10", night23: "2026-03-12",
    night25: "2026-03-14", night27: "2026-03-16", night29: "2026-03-18",
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        name: isAr ? `ليلة القدر ${year}` : `Laylatul Qadr ${year}`,
        startDate: targetDate,
        location: { "@type": "Place", name: isAr ? "المملكة العربية السعودية" : "Saudi Arabia" },
        description: isAr
          ? `ليلة القدر المباركة ${hijri} هـ — خير من ألف شهر`
          : `The blessed Night of Power ${hijri} AH — better than a thousand months`,
      },
      {
        "@type": "WebApplication",
        name: isAr ? `عداد ليلة القدر ${year}` : `Laylatul Qadr ${year} Countdown`,
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
      <LailatulQadrHeroCounter
        targetDate={targetDate}
        year={year}
        hijri={hijri}
        lastTenStart={lastTenStart}
        oddNights={oddNights}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "العدادات", labelEn: "Countdowns", href: "/countdowns" },
          { labelAr: "عداد ليلة القدر", labelEn: "Laylatul Qadr Countdown" },
        ]} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          {/* Main Content */}
          <div className="space-y-8">
            <ShareButtons
              title={isAr ? `كم باقي على ليلة القدر ${year}؟` : `Laylatul Qadr ${year} Countdown`}
            />

            <AdSlot id="lailatul-qadr-top" size="leaderboard" />

            {/* Upcoming Dates */}
            <UpcomingLailatulQadr locale={locale} />

            {/* All Years Grid */}
            <AllLailatulQadrYears locale={locale} />

            <AdSlot id="lailatul-qadr-mid" size="rectangle" />

            {/* Educational Content */}
            <LailatulQadrContent year={year} />

            {/* Worship Guide */}
            <LailatulQadrWorship />

            <AdSlot id="lailatul-qadr-bottom" size="leaderboard" />

            {/* FAQ */}
            <LailatulQadrFAQ />
          </div>

          {/* Sidebar - hidden on mobile */}
          <div className="hidden lg:block">
            <LailatulQadrSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
