import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { lp } from "@/lib/utils/locale";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("siteName"),
    description: t("siteDescription"),
    alternates: {
      canonical: lp(locale, "/"),
    },
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <HomePage />;
}
