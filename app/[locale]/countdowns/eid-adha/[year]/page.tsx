import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { EID_ADHA_DATA, EID_ADHA_YEARS } from "@/lib/data/eidAdhaData";
import EidAdhaYearPage from "./EidAdhaYearPage";

export function generateStaticParams() {
  return EID_ADHA_YEARS.map((year) => ({ year: String(year) }));
}

export async function generateMetadata({
  params: { locale, year },
}: {
  params: { locale: string; year: string };
}): Promise<Metadata> {
  const yearNum = parseInt(year);
  const data = EID_ADHA_DATA[yearNum];
  if (!data) return { title: "عيد الأضحى — غير موجود" };
  return {
    title: data.content.metaTitle,
    description: data.content.metaDescription,
    keywords: data.content.keywords,
    alternates: { canonical: locale === "ar" ? "/countdowns/eid-adha/${year}" : `/${locale}/countdowns/eid-adha/${year}` },
  };
}

export default function Page({
  params: { locale, year },
}: {
  params: { locale: string; year: string };
}) {
  unstable_setRequestLocale(locale);
  const yearNum = parseInt(year);

  if (!EID_ADHA_DATA[yearNum]) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg">لم يتم العثور على بيانات لهذه السنة</p>
        </div>
      </main>
    );
  }

  return <EidAdhaYearPage year={yearNum} locale={locale} />;
}
