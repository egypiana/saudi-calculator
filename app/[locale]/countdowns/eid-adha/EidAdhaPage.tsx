"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import EidAdhaHeroCounter from "./components/EidAdhaHeroCounter";
import UpcomingEidAdha from "./components/UpcomingEidAdha";
import AllEidAdhaYears from "./components/AllEidAdhaYears";
import EidAdhaContent from "./components/EidAdhaContent";
import EidAdhaPreparation from "./components/EidAdhaPreparation";
import EidAdhaFAQ from "./components/EidAdhaFAQ";
import EidAdhaSidebar from "./components/EidAdhaSidebar";
import { getNextEidAdhaYear, EID_ADHA_DATA } from "@/lib/data/eidAdhaData";

interface Props {
  locale: string;
}

export default function EidAdhaPage({ locale }: Props) {
  const nextYear = getNextEidAdhaYear();
  const eidData = EID_ADHA_DATA[nextYear];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        name: `عيد الأضحى المبارك ${nextYear} / ${eidData?.hijriYear} هـ`,
        startDate: eidData?.date,
        location: { "@type": "Place", name: "المملكة العربية السعودية" },
        description: `عيد الأضحى المبارك ${eidData?.hijriMonth} ${eidData?.hijriYear} هـ الموافق ${eidData?.date}`,
      },
      {
        "@type": "WebApplication",
        name: `عداد عيد الأضحى ${nextYear}`,
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
      <EidAdhaHeroCounter />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "العدادات", labelEn: "Countdowns", href: "/countdowns" },
          { labelAr: "عداد عيد الأضحى", labelEn: "Eid Al-Adha Countdown" },
        ]} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          {/* Main Content */}
          <div className="space-y-8">
            <AdSlot id="eid-adha-top" size="leaderboard" />

            <UpcomingEidAdha locale={locale} />

            <AllEidAdhaYears locale={locale} />

            <AdSlot id="eid-adha-mid" size="rectangle" />

            <EidAdhaContent />

            <EidAdhaPreparation />

            <AdSlot id="eid-adha-bottom" size="leaderboard" />

            <EidAdhaFAQ />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <EidAdhaSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
