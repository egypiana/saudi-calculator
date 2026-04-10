import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import SearchPageClient from "./SearchPageClient";
import { generatePageSEO } from "@/lib/utils/metadata";

interface SearchPageProps {
  params: { locale: string };
  searchParams: { q?: string };
}

export async function generateMetadata({
  params: { locale },
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const q = searchParams.q?.trim() || "";
  const title = q
    ? `نتائج البحث عن "${q}" — حاسبة VIP`
    : "البحث في حاسبة VIP";
  const description = q
    ? `نتائج البحث عن "${q}" في موقع حاسبة VIP — حاسبات وعدادات ومقالات.`
    : "ابحث في موقع حاسبة VIP عن الحاسبات والعدادات والمقالات بسهولة.";

  return {
    title,
    description,
    robots: { index: false, follow: true },
    ...generatePageSEO(locale, "/search", { title, description }),
  };
}

export default function SearchPage({
  params: { locale },
  searchParams,
}: SearchPageProps) {
  unstable_setRequestLocale(locale);
  const q = searchParams.q?.trim() || "";
  return <SearchPageClient initialQuery={q} />;
}
