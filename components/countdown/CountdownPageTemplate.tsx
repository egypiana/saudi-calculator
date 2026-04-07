"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import CountdownTimer from "./CountdownTimer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FAQSection from "@/components/shared/FAQSection";
import ShareButtons from "@/components/shared/ShareButtons";
import AdSlot from "@/components/ads/AdSlot";

interface FAQItem {
  question: string;
  answer: string;
}

interface RelatedItem {
  labelAr: string;
  labelEn: string;
  href: string;
}

interface CountdownPageTemplateProps {
  icon: string;
  titleAr: string;
  titleEn: string;
  questionAr: string;
  questionEn: string;
  subtitleAr: string;
  subtitleEn: string;
  targetDate: Date;
  gradient: string;
  breadcrumbLabelAr: string;
  breadcrumbLabelEn: string;
  contentAr: React.ReactNode;
  contentEn: React.ReactNode;
  faqsAr: FAQItem[];
  faqsEn: FAQItem[];
  relatedItems: RelatedItem[];
  tableContent?: React.ReactNode;
}

export default function CountdownPageTemplate({
  icon,
  titleAr,
  titleEn,
  questionAr,
  questionEn,
  subtitleAr,
  subtitleEn,
  targetDate,
  gradient,
  breadcrumbLabelAr,
  breadcrumbLabelEn,
  contentAr,
  contentEn,
  faqsAr,
  faqsEn,
  relatedItems,
  tableContent,
}: CountdownPageTemplateProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: isAr ? "العدادات" : "Countdowns", href: `/${locale}/countdowns` },
          { label: isAr ? breadcrumbLabelAr : breadcrumbLabelEn },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* العداد الرئيسي */}
          <div className={`bg-gradient-to-br ${gradient} rounded-3xl p-8 sm:p-10 shadow-2xl text-center`}>
            <span className="text-5xl mb-4 block">{icon}</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {isAr ? questionAr : questionEn}
            </h1>
            <p className="text-white/70 text-lg mb-6">
              {isAr ? subtitleAr : subtitleEn}
            </p>
            <CountdownTimer targetDate={targetDate} size="lg" />
          </div>

          <ShareButtons title={isAr ? questionAr : questionEn} />

          <AdSlot id="countdown-mid" size="rectangle" />

          {/* المحتوى المعلوماتي */}
          <article className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {isAr ? titleAr : titleEn}
            </h2>
            {isAr ? contentAr : contentEn}
          </article>

          {tableContent && tableContent}

          <AdSlot id="countdown-bottom" size="leaderboard" />

          <FAQSection faqs={isAr ? faqsAr : faqsEn} />
        </div>

        {/* الشريط الجانبي */}
        <div className="space-y-6">
          <AdSlot id="countdown-sidebar" size="rectangle" />

          <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-bold text-gray-800 dark:text-white mb-4">
              {isAr ? "عدادات ذات صلة" : "Related Countdowns"}
            </h3>
            <ul className="space-y-3">
              {relatedItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <span className="text-xs text-primary-500">{isAr ? "←" : "→"}</span>
                    {isAr ? item.labelAr : item.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
