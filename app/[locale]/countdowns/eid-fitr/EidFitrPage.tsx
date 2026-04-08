"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import EidHeroCounter from "./components/EidHeroCounter";
import UpcomingEids from "./components/UpcomingEids";
import AllEidYears from "./components/AllEidYears";
import EidContent from "./components/EidContent";
import EidPreparation from "./components/EidPreparation";
import EidFAQ from "./components/EidFAQ";
import EidSidebar from "./components/EidSidebar";
import { getNextEidYear, EID_FITR_DATA } from "@/lib/data/eidFitrData";

interface Props {
  locale: string;
}

export default function EidFitrPage({ locale }: Props) {
  const nextYear = getNextEidYear();
  const eidData = EID_FITR_DATA[nextYear];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        name: `عيد الفطر المبارك ${nextYear} / ${eidData?.hijriYear} هـ`,
        startDate: eidData?.date,
        location: { "@type": "Place", name: "المملكة العربية السعودية" },
        description: `عيد الفطر المبارك ${eidData?.hijriMonth} ${eidData?.hijriYear} هـ الموافق ${eidData?.date}`,
      },
      {
        "@type": "WebApplication",
        name: `عداد عيد الفطر ${nextYear}`,
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
      <EidHeroCounter />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "العدادات", labelEn: "Countdowns", href: "/countdowns" },
          { labelAr: "عداد عيد الفطر", labelEn: "Eid Al-Fitr Countdown" },
        ]} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          {/* Main Content */}
          <div className="space-y-8">
            <AdSlot id="eid-fitr-top" size="leaderboard" />

            <UpcomingEids locale={locale} />

            <AllEidYears locale={locale} />

            <AdSlot id="eid-fitr-mid" size="rectangle" />

            <EidContent />

            <EidPreparation />

            <AdSlot id="eid-fitr-bottom" size="leaderboard" />

            <EidFAQ />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <EidSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
