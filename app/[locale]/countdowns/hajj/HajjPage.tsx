"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import HajjHeroCounter from "./components/HajjHeroCounter";
import UpcomingHajj from "./components/UpcomingHajj";
import AllHajjYears from "./components/AllHajjYears";
import HajjContent from "./components/HajjContent";
import HajjPreparation from "./components/HajjPreparation";
import HajjFAQ from "./components/HajjFAQ";
import HajjSidebar from "./components/HajjSidebar";
import { getNextHajjYear, HAJJ_DATA } from "@/lib/data/hajjData";

interface Props {
  locale: string;
}

export default function HajjPage({ locale }: Props) {
  const nextYear = getNextHajjYear();
  const hajjData = HAJJ_DATA[nextYear];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        name: `موسم الحج ${nextYear} / ${hajjData?.hijriYear} هـ`,
        startDate: hajjData?.date,
        endDate: hajjData?.endDate,
        location: { "@type": "Place", name: "مكة المكرمة، المملكة العربية السعودية" },
        description: `موسم الحج ${hajjData?.hijriMonth} ${hajjData?.hijriYear} هـ الموافق ${hajjData?.date}`,
      },
      {
        "@type": "WebApplication",
        name: `عداد موسم الحج ${nextYear}`,
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
      <HajjHeroCounter />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "العدادات", labelEn: "Countdowns", href: "/countdowns" },
          { labelAr: "عداد الحج", labelEn: "Hajj Countdown" },
        ]} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          {/* Main Content */}
          <div className="space-y-8">
            <AdSlot id="hajj-top" size="leaderboard" />

            <UpcomingHajj locale={locale} />

            <AllHajjYears locale={locale} />

            <AdSlot id="hajj-mid" size="rectangle" />

            <HajjContent />

            <HajjPreparation />

            <AdSlot id="hajj-bottom" size="leaderboard" />

            <HajjFAQ />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <HajjSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
