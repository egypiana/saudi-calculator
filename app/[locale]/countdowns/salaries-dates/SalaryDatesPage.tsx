"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import ShareButtons from "@/components/shared/ShareButtons";
import SalaryHeroCounter from "./components/SalaryHeroCounter";
import SalaryScheduleTable from "./components/SalaryScheduleTable";
import PaymentTypesGrid from "./components/PaymentTypesGrid";
import SalaryContent from "./components/SalaryContent";
import SalaryFAQ from "./components/SalaryFAQ";
import SalarySidebar from "./components/SalarySidebar";
interface SalaryDatesPageProps {
  locale: string;
}

export default function SalaryDatesPage({ locale }: SalaryDatesPageProps) {
  const isAr = locale === "ar";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: isAr
          ? "مواعيد صرف الرواتب والمستحقات في السعودية"
          : "Saudi Salary & Payment Dates",
        applicationCategory: "FinanceApplication",
        inLanguage: locale,
        description: isAr
          ? "عداد تنازلي شامل لمواعيد صرف الرواتب الحكومية وحساب المواطن والتقاعد وحافز في المملكة العربية السعودية"
          : "Comprehensive countdown for Saudi government salaries, Citizen Account, pension, and Hafiz payment dates",
        offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "متى تُصرف الرواتب الحكومية في السعودية؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "تُصرف رواتب موظفي القطاع الحكومي يوم 27 من كل شهر هجري. إذا صادف يوم الجمعة أو السبت يُقدَّم ليوم الخميس.",
            },
          },
          {
            "@type": "Question",
            name: "متى ينزل حساب المواطن؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "يُصرف دعم حساب المواطن يوم 10 من كل شهر ميلادي.",
            },
          },
          {
            "@type": "Question",
            name: "متى تُصرف رواتب التقاعد والتأمينات؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "تُصرف معاشات التقاعد والتأمينات الاجتماعية يوم 25 من كل شهر ميلادي.",
            },
          },
          {
            "@type": "Question",
            name: "كم نسبة خصم التأمينات الاجتماعية؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "يتحمل الموظف 9.75% من الراتب الأساسي، ويتحمل صاحب العمل 11.75%.",
            },
          },
        ],
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
      <SalaryHeroCounter />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb
          items={[
            { labelAr: "العدادات", labelEn: "Countdowns", href: "/countdowns" },
            { labelAr: "مواعيد الرواتب", labelEn: "Salary Dates" },
          ]}
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          {/* Main Content */}
          <div className="space-y-8">
            <ShareButtons
              title={
                isAr
                  ? "مواعيد صرف الرواتب والمستحقات في السعودية"
                  : "Saudi Salary & Payment Dates"
              }
            />

            <AdSlot id="salary-top" size="leaderboard" />

            {/* Payment Types Overview */}
            <PaymentTypesGrid />

            {/* Schedule Tables */}
            <SalaryScheduleTable />

            <AdSlot id="salary-mid" size="rectangle" />

            {/* Educational Content */}
            <SalaryContent />

            <AdSlot id="salary-bottom" size="leaderboard" />

            {/* FAQ */}
            <SalaryFAQ />
          </div>

          {/* Sidebar - hidden on mobile */}
          <div className="hidden lg:block">
            <SalarySidebar />
          </div>
        </div>
      </div>
    </main>
  );
}
