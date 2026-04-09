"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import ShareButtons from "@/components/shared/ShareButtons";
import ArafahHeroCounter from "./components/ArafahHeroCounter";
import UpcomingArafah from "./components/UpcomingArafah";
import AllArafahYears from "./components/AllArafahYears";
import ArafahContent from "./components/ArafahContent";
import ArafahWorship from "./components/ArafahWorship";
import ArafahFAQ from "./components/ArafahFAQ";
import ArafahSidebar from "./components/ArafahSidebar";
import { getNextArafaDay } from "@/lib/data/arafaDayData";

interface ArafahPageProps {
  locale: string;
}

export default function ArafahPage({ locale }: ArafahPageProps) {
  const isAr = locale === "ar";
  const nextArafaDay = getNextArafaDay();
  const year = nextArafaDay?.year || 2026;
  const hijri = nextArafaDay?.hijri || "1447 هـ";
  const targetDate = nextArafaDay?.arafaDate || "2026-05-26";
  const eidAdhaDate = nextArafaDay?.eidAdhaDate || "2026-05-27";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        name: isAr ? `يوم عرفة ${year}` : `Arafat Day ${year}`,
        startDate: targetDate,
        location: { "@type": "Place", name: isAr ? "المملكة العربية السعودية" : "Saudi Arabia" },
        description: isAr
          ? `يوم عرفة ${hijri} — خير يوم طلعت عليه الشمس`
          : `Arafat Day ${hijri} — the best day on which the sun rises`,
      },
      {
        "@type": "WebApplication",
        name: isAr ? `عداد يوم عرفة ${year}` : `Arafat Day ${year} Countdown`,
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
      <ArafahHeroCounter
        targetDate={targetDate}
        year={year}
        hijri={hijri}
        eidAdhaDate={eidAdhaDate}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "العدادات", labelEn: "Countdowns", href: "/countdowns" },
          { labelAr: "عداد يوم عرفة", labelEn: "Arafat Day Countdown" },
        ]} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          {/* Main Content */}
          <div className="space-y-8">
            <ShareButtons
              title={isAr ? `كم باقي على يوم عرفة ${year}؟` : `Arafat Day ${year} Countdown`}
            />

            <AdSlot id="arafah-top" size="leaderboard" />

            {/* Upcoming Dates */}
            <UpcomingArafah locale={locale} />

            {/* All Years Grid */}
            <AllArafahYears locale={locale} />

            <AdSlot id="arafah-mid" size="rectangle" />

            {/* Educational Content */}
            <ArafahContent year={year} />

            {/* Worship Guide */}
            <ArafahWorship />

            <AdSlot id="arafah-bottom" size="leaderboard" />

            {/* FAQ */}
            <ArafahFAQ />
          </div>

          {/* Sidebar - hidden on mobile */}
          <div className="hidden lg:block">
            <ArafahSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
