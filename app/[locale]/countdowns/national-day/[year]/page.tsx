import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { NATIONAL_DAY_DATA, NATIONAL_DAY_YEARS, formatDateAr } from "@/lib/data/nationalDayData";
import NationalDayYearPage from "./NationalDayYearPage";

export function generateStaticParams() {
  return NATIONAL_DAY_YEARS.map((year) => ({ year: String(year) }));
}

function toAr(n: number): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

export async function generateMetadata({
  params: { locale, year },
}: {
  params: { locale: string; year: string };
}): Promise<Metadata> {
  const yearNum = parseInt(year);
  const data = NATIONAL_DAY_DATA[yearNum];
  if (!data) return { title: "اليوم الوطني — غير موجود" };
  const isAr = locale === "ar";
  return {
    title: isAr
      ? `اليوم الوطني السعودي ${toAr(data.nationalDayNumber)} — ${toAr(yearNum)} | كم باقي؟`
      : `Saudi National Day ${data.nationalDayNumber} — ${yearNum} Countdown`,
    description: isAr
      ? `تابع العد التنازلي لليوم الوطني السعودي ${toAr(data.nationalDayNumber)} الموافق ${formatDateAr(data.date)}. عداد تنازلي دقيق ومعلومات كاملة.`
      : `Countdown to Saudi National Day ${data.nationalDayNumber}, ${data.date}.`,
    keywords: isAr
      ? [`اليوم الوطني ${yearNum}`, `اليوم الوطني ${data.nationalDayNumber}`, `كم باقي على اليوم الوطني ${yearNum}`]
      : [`national day ${yearNum}`, `saudi national day ${data.nationalDayNumber}`],
    alternates: { canonical: `/${locale}/countdowns/national-day/${year}` },
  };
}

export default function Page({
  params: { locale, year },
}: {
  params: { locale: string; year: string };
}) {
  unstable_setRequestLocale(locale);
  const yearNum = parseInt(year);

  if (!NATIONAL_DAY_DATA[yearNum]) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg">لم يتم العثور على بيانات لهذه السنة</p>
        </div>
      </main>
    );
  }

  return <NationalDayYearPage year={yearNum} locale={locale} />;
}
