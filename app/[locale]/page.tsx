import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const title = "حاسبة VIP — حاسبات مالية وشرعية وعدادات تنازلية | calculatorvip.com";
  const description =
    "أكثر من 22 حاسبة دقيقة ومجانية للزكاة، الراتب، نهاية الخدمة، التمويل العقاري، حساب المواطن، رسوم المرافقين والمقابل المالي، مع عدادات تنازلية لرمضان والعيد والحج ومواعيد الرواتب الحكومية في السعودية.";

  return {
    title,
    description,
    ...generatePageSEO(locale, "/", {
      title,
      description,
      keywords: [
        "حاسبة",
        "حاسبات",
        "حاسبة VIP",
        "calculatorvip",
        "حاسبة الزكاة",
        "حاسبة الراتب",
        "حاسبة نهاية الخدمة",
        "حاسبة التمويل العقاري",
        "حساب المواطن",
        "رسوم المرافقين",
        "المقابل المالي",
        "ضريبة القيمة المضافة",
        "كم باقي على رمضان",
        "كم باقي على العيد",
        "موعد الراتب",
        "مواعيد الرواتب السعودية",
        "عداد تنازلي",
        "حاسبة العمر",
        "التقويم الهجري",
        "حاسبة BMI",
        "السعودية",
      ],
    }),
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
          url: "https://calculatorvip.com/opengraph-image",
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
      {
        "@type": "FAQPage",
        "@id": "https://calculatorvip.com/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "ما هو موقع حاسبة VIP وما الذي يقدمه؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "حاسبة VIP (calculatorvip.com) هي المنصة السعودية الشاملة التي تقدم أكثر من 22 حاسبة مالية وشرعية وصحية بدقة عالية، بالإضافة إلى عدادات تنازلية لأهم المناسبات الإسلامية والوطنية ومواعيد الرواتب الحكومية. جميع الخدمات مجانية تماماً ومتوفرة باللغة العربية.",
            },
          },
          {
            "@type": "Question",
            name: "هل استخدام الحاسبات مجاني بالكامل؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "نعم، جميع الحاسبات والعدادات على موقعنا مجانية 100% ولا تحتاج إلى تسجيل أو اشتراك. يمكنك استخدامها بلا حدود من الجوال أو الحاسوب في أي وقت.",
            },
          },
          {
            "@type": "Question",
            name: "ما مدى دقة نتائج الحاسبات؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "نحرص على أن تكون كل النتائج دقيقة ومطابقة للأنظمة المعتمدة في المملكة العربية السعودية. حاسبة الزكاة تعتمد على الأحكام الشرعية، وحاسبة الراتب على نظام العمل السعودي، وحاسبة التمويل العقاري على أنظمة البنوك المحلية.",
            },
          },
          {
            "@type": "Question",
            name: "هل يمكنني معرفة كم باقي على رمضان أو عيد الفطر؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "نعم، نوفر عدادات تنازلية دقيقة لكل المناسبات الإسلامية الكبرى: رمضان، عيد الفطر، عيد الأضحى، الحج، ليلة القدر، المولد النبوي، رأس السنة الهجرية، وغيرها.",
            },
          },
          {
            "@type": "Question",
            name: "هل توفرون حاسبات للرسوم الحكومية السعودية؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "بالتأكيد. نقدم حاسبات متخصصة لحساب رسوم المرافقين (400 ريال شهرياً)، المقابل المالي للعمالة الوافدة (700 أو 800 ريال)، فاتورة الكهرباء، ضريبة القيمة المضافة 15%، ومكافأة نهاية الخدمة، وبرنامج حساب المواطن.",
            },
          },
          {
            "@type": "Question",
            name: "هل الموقع متاح على الهاتف الجوال؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "نعم، الموقع مصمم بأسلوب Mobile-First ويعمل بسلاسة على جميع الأجهزة: الهواتف الذكية، الأجهزة اللوحية، والحواسيب. الواجهة سريعة ومتجاوبة وتدعم اللغة العربية بشكل كامل.",
            },
          },
        ],
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
