"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import ShareButtons from "@/components/shared/ShareButtons";
import MawlidHeroCounter from "./components/MawlidHeroCounter";
import UpcomingMawlid from "./components/UpcomingMawlid";
import AllMawlidYears from "./components/AllMawlidYears";
import MawlidContent from "./components/MawlidContent";
import MawlidWorship from "./components/MawlidWorship";
import MawlidFAQ from "./components/MawlidFAQ";
import MawlidSidebar from "./components/MawlidSidebar";
import { getNextMawlid } from "@/lib/data/mawlidData";

interface MawlidPageProps {
  locale: string;
}

export default function MawlidPage({ locale }: MawlidPageProps) {
  const isAr = locale === "ar";
  const nextMawlid = getNextMawlid();
  const year = nextMawlid?.year || 2025;
  const hijri = nextMawlid?.hijri || "1447 هـ";
  const targetDate = nextMawlid?.mawlidDate || "2025-09-05";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        name: isAr ? `المولد النبوي الشريف ${year}` : `Mawlid an-Nabi ${year}`,
        startDate: targetDate,
        location: { "@type": "Place", name: isAr ? "المملكة العربية السعودية" : "Saudi Arabia" },
        description: isAr
          ? `المولد النبوي الشريف ${hijri} — ١٢ ربيع الأول — ذكرى مولد النبي محمد ﷺ`
          : `Mawlid an-Nabi ${hijri} — 12th Rabi al-Awwal — Prophet Muhammad's Birthday`,
      },
      {
        "@type": "WebApplication",
        name: isAr ? `عداد المولد النبوي ${year}` : `Mawlid an-Nabi ${year} Countdown`,
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
      <MawlidHeroCounter
        targetDate={targetDate}
        year={year}
        hijri={hijri}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "العدادات", labelEn: "Countdowns", href: "/countdowns" },
          { labelAr: "عداد المولد النبوي", labelEn: "Mawlid Countdown" },
        ]} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          {/* Main Content */}
          <div className="space-y-8">
            <ShareButtons
              title={isAr ? `كم باقي على المولد النبوي ${year}؟` : `Mawlid an-Nabi ${year} Countdown`}
            />

            <AdSlot id="mawlid-top" size="leaderboard" />

            {/* Upcoming Dates */}
            <UpcomingMawlid locale={locale} />

            {/* All Years Grid */}
            <AllMawlidYears locale={locale} />

            <AdSlot id="mawlid-mid" size="rectangle" />

            {/* Educational Content */}
            <MawlidContent year={year} />

            {/* Worship Guide */}
            <MawlidWorship />

            <AdSlot id="mawlid-bottom" size="leaderboard" />

            {/* FAQ */}
            <MawlidFAQ />
          </div>

          {/* Sidebar - hidden on mobile */}
          <div className="hidden lg:block">
            <MawlidSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
