"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import ShareButtons from "@/components/shared/ShareButtons";
import RamadanHeroCounter from "./components/RamadanHeroCounter";
import UpcomingRamadanDates from "./components/UpcomingRamadanDates";
import AllRamadanYears from "./components/AllRamadanYears";
import RamadanContent from "./components/RamadanContent";
import RamadanPreparation from "./components/RamadanPreparation";
import RamadanFAQ from "./components/RamadanFAQ";
import { getNextRamadan } from "@/lib/data/ramadanDates";

interface RamadanPageProps {
  locale: string;
}

export default function RamadanPage({ locale }: RamadanPageProps) {
  const isAr = locale === "ar";
  const nextRamadan = getNextRamadan();
  const year = nextRamadan?.year || 2027;
  const hijri = nextRamadan?.hijri || "1448 هـ";
  const targetDate = nextRamadan?.startDate || "2027-02-08";
  const dayOfWeek = nextRamadan?.dayOfWeek || "الاثنين";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        name: isAr ? `شهر رمضان المبارك ${year}` : `Holy Month of Ramadan ${year}`,
        startDate: targetDate,
        endDate: nextRamadan?.endDate || "2027-03-09",
        location: { "@type": "Place", name: isAr ? "المملكة العربية السعودية" : "Saudi Arabia" },
        description: isAr ? `شهر رمضان المبارك ${hijri}` : `Holy Month of Ramadan ${hijri}`,
      },
      {
        "@type": "WebApplication",
        name: isAr ? `عداد رمضان ${year}` : `Ramadan ${year} Countdown`,
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
      <RamadanHeroCounter
        targetDate={targetDate}
        year={year}
        hijri={hijri}
        dayOfWeek={dayOfWeek}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "العدادات", labelEn: "Countdowns", href: "/countdowns" },
          { labelAr: "عداد رمضان", labelEn: "Ramadan Countdown" },
        ]} />

        <div className="mt-6 space-y-8">
          <ShareButtons
            title={isAr ? `كم باقي على رمضان ${year}؟` : `Ramadan ${year} Countdown`}
          />

          <AdSlot id="ramadan-top" size="leaderboard" />

          {/* Upcoming Dates */}
          <UpcomingRamadanDates />

          {/* All Years Grid */}
          <AllRamadanYears />

          <AdSlot id="ramadan-mid" size="rectangle" />

          {/* Educational Content */}
          <RamadanContent year={year} />

          {/* Preparation Steps */}
          <RamadanPreparation />

          <AdSlot id="ramadan-bottom" size="leaderboard" />

          {/* FAQ */}
          <RamadanFAQ />
        </div>
      </div>
    </main>
  );
}
