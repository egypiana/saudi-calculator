"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import ShareButtons from "@/components/shared/ShareButtons";
import AshuraHeroCounter from "./components/AshuraHeroCounter";
import UpcomingAshura from "./components/UpcomingAshura";
import AllAshuraYears from "./components/AllAshuraYears";
import AshuraContent from "./components/AshuraContent";
import AshuraWorship from "./components/AshuraWorship";
import AshuraFAQ from "./components/AshuraFAQ";
import AshuraSidebar from "./components/AshuraSidebar";
import { getNextAshura } from "@/lib/data/ashuraData";

interface AshuraPageProps {
  locale: string;
}

export default function AshuraPage({ locale }: AshuraPageProps) {
  const isAr = locale === "ar";
  const nextAshura = getNextAshura();
  const year = nextAshura?.year || 2025;
  const hijri = nextAshura?.hijri || "1447 هـ";
  const targetDate = nextAshura?.ashuraDate || "2025-07-06";
  const tasuaDate = nextAshura?.tasua || "2025-07-05";
  const eleventhDate = nextAshura?.eleventhDate || "2025-07-07";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        name: isAr ? `يوم عاشوراء ${year}` : `Ashura Day ${year}`,
        startDate: targetDate,
        location: { "@type": "Place", name: isAr ? "المملكة العربية السعودية" : "Saudi Arabia" },
        description: isAr
          ? `يوم عاشوراء ${hijri} — ١٠ محرم — يوم نجّى الله فيه موسى عليه السلام`
          : `Ashura Day ${hijri} — 10th Muharram — the day Allah saved Moses`,
      },
      {
        "@type": "WebApplication",
        name: isAr ? `عداد يوم عاشوراء ${year}` : `Ashura Day ${year} Countdown`,
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
      <AshuraHeroCounter
        targetDate={targetDate}
        year={year}
        hijri={hijri}
        tasuaDate={tasuaDate}
        eleventhDate={eleventhDate}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "العدادات", labelEn: "Countdowns", href: "/countdowns" },
          { labelAr: "عداد يوم عاشوراء", labelEn: "Ashura Day Countdown" },
        ]} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          {/* Main Content */}
          <div className="space-y-8">
            <ShareButtons
              title={isAr ? `كم باقي على يوم عاشوراء ${year}؟` : `Ashura Day ${year} Countdown`}
            />

            <AdSlot id="ashura-top" size="leaderboard" />

            {/* Upcoming Dates */}
            <UpcomingAshura locale={locale} />

            {/* All Years Grid */}
            <AllAshuraYears locale={locale} />

            <AdSlot id="ashura-mid" size="rectangle" />

            {/* Educational Content */}
            <AshuraContent year={year} />

            {/* Worship Guide */}
            <AshuraWorship />

            <AdSlot id="ashura-bottom" size="leaderboard" />

            {/* FAQ */}
            <AshuraFAQ />
          </div>

          {/* Sidebar - hidden on mobile */}
          <div className="hidden lg:block">
            <AshuraSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
