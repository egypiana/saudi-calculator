"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import NationalDayHeroCounter from "./components/NationalDayHeroCounter";
import UpcomingNationalDays from "./components/UpcomingNationalDays";
import AllNationalDayYears from "./components/AllNationalDayYears";
import NationalDayContent from "./components/NationalDayContent";
import NationalDayPreparation from "./components/NationalDayPreparation";
import NationalDayFAQ from "./components/NationalDayFAQ";
import NationalDaySidebar from "./components/NationalDaySidebar";
import { getNextNationalDayYear, NATIONAL_DAY_DATA } from "@/lib/data/nationalDayData";

interface Props {
  locale: string;
}

export default function NationalDayPage({ locale }: Props) {
  const nextYear = getNextNationalDayYear();
  const ndData = NATIONAL_DAY_DATA[nextYear];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        name: `اليوم الوطني السعودي ${ndData?.nationalDayNumber} — ${nextYear}`,
        startDate: ndData?.date,
        location: { "@type": "Place", name: "المملكة العربية السعودية" },
        description: `اليوم الوطني السعودي ${ndData?.nationalDayNumber} الموافق ${ndData?.date}`,
      },
      {
        "@type": "WebApplication",
        name: `عداد اليوم الوطني السعودي ${nextYear}`,
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

      {/* Hero — full width */}
      <NationalDayHeroCounter />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "العدادات", labelEn: "Countdowns", href: "/countdowns" },
          { labelAr: "عداد اليوم الوطني", labelEn: "National Day Countdown" },
        ]} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          {/* Main Content */}
          <div className="space-y-8">
            <AdSlot id="national-day-top" size="leaderboard" />

            <UpcomingNationalDays locale={locale} />

            <AllNationalDayYears locale={locale} />

            <AdSlot id="national-day-mid" size="rectangle" />

            <NationalDayContent />

            <NationalDayPreparation />

            <AdSlot id="national-day-bottom" size="leaderboard" />

            <NationalDayFAQ />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <NationalDaySidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
