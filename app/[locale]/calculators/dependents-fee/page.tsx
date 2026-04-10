import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import DependentsFeeCalculatorPage from "./DependentsFeeCalculatorPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const title = "حاسبة رسوم المرافقين والتابعين 2026 — المقابل المالي للإقامة في السعودية";
  const description =
    "احسب رسوم المرافقين والتابعين في السعودية بدقة. 400 ريال شهرياً لكل مرافق أو تابع. حساب فوري للزوجة والأبناء والوالدين والعمالة المنزلية مع الفئات المعفاة والتكلفة التراكمية.";
  const keywords = [
    "حاسبة رسوم المرافقين",
    "رسوم المرافقين والتابعين",
    "المقابل المالي للمرافقين",
    "رسوم المرافقين 2026",
    "رسوم الإقامة السعودية",
    "حساب رسوم التابعين",
    "الفئات المعفاة من رسوم المرافقين",
    "400 ريال رسوم المرافقين",
    "رسوم تجديد الإقامة",
    "رسوم المرافقين الجوازات",
    "حاسبة رسوم مقيم",
    "رسوم العمالة المنزلية",
    "المقابل المالي للوافدين",
    "رسوم المرافقين أبشر",
    "تكلفة المرافقين سنوياً",
  ];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/calculators/dependents-fee", { title, description, keywords }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <DependentsFeeCalculatorPage locale={locale} />;
}
