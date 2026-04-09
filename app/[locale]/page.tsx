import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { generateAlternates, generateOGMetadata, generateTwitterMetadata } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("siteName");
  const description = t("siteDescription");

  return {
    title,
    description,
    alternates: generateAlternates(locale, "/"),
    openGraph: generateOGMetadata(locale, "/", { title, description }),
    twitter: generateTwitterMetadata({ title, description }),
  };
}

function HomeJsonLd({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://calculatorvip.com/#website",
        url: "https://calculatorvip.com",
        name: isAr ? "حاسبة VIP" : "Calculator VIP",
        description: isAr
          ? "مركزك الشامل للحاسبات المالية والإسلامية والعدادات التنازلية في المملكة العربية السعودية"
          : "Your comprehensive hub for financial and Islamic calculators and countdowns in Saudi Arabia",
        inLanguage: ["ar"],
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://calculatorvip.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://calculatorvip.com/#organization",
        name: isAr ? "حاسبة VIP" : "Calculator VIP",
        url: "https://calculatorvip.com",
        logo: {
          "@type": "ImageObject",
          url: "https://calculatorvip.com/og-default.png",
          width: 1200,
          height: 630,
        },
        sameAs: [],
        description: isAr
          ? "منصة سعودية شاملة توفر حاسبات مالية وإسلامية وعدادات تنازلية للمناسبات والرواتب"
          : "A comprehensive Saudi platform providing financial and Islamic calculators and event countdowns",
      },
      {
        "@type": "WebPage",
        "@id": "https://calculatorvip.com/#webpage",
        url: "https://calculatorvip.com",
        name: isAr ? "حاسبة VIP — الحاسبات والعدادات" : "Calculator VIP — Calculators & Countdowns",
        isPartOf: { "@id": "https://calculatorvip.com/#website" },
        about: { "@id": "https://calculatorvip.com/#organization" },
        inLanguage: locale,
        description: isAr
          ? "حاسبات الزكاة، الراتب، نهاية الخدمة، القرض العقاري، والمزيد. عدادات تنازلية لرمضان، العيد، الحج، الرواتب."
          : "Zakat, salary, end-of-service, mortgage calculators and more. Countdowns for Ramadan, Eid, Hajj, salaries.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <>
      <HomeJsonLd locale={locale} />
      <HomePage />
    </>
  );
}
