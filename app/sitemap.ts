import type { MetadataRoute } from "next";
import { ALL_ARTICLES } from "@/lib/blog/articles";
import { AVAILABLE_YEARS as RAMADAN_YEARS } from "@/lib/data/ramadanData";
import { EID_YEARS as EID_FITR_YEARS } from "@/lib/data/eidFitrData";
import { EID_ADHA_YEARS } from "@/lib/data/eidAdhaData";
import { HAJJ_YEARS } from "@/lib/data/hajjData";
import { LAILATUL_QADR_YEARS } from "@/lib/data/lailatulQadrData";
import { ARAFA_DAY_YEARS } from "@/lib/data/arafaDayData";
import { HIJRI_NEW_YEAR_YEARS } from "@/lib/data/hijriNewYearData";
import { ASHURA_YEARS } from "@/lib/data/ashuraData";
import { MAWLID_YEARS } from "@/lib/data/mawlidData";

const BASE_URL = "https://calculatorvip.com";
function localizedUrls(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] = "monthly") {
  return [{
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }];
}

function yearUrls(basePath: string, years: number[], priority: number) {
  return years.map((year) => ({
    url: `${BASE_URL}${basePath}/${year}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    ...localizedUrls("/", 1.0, "daily"),
    ...localizedUrls("/calculators", 0.9, "weekly"),
    ...localizedUrls("/countdowns", 0.9, "weekly"),
    ...localizedUrls("/blog", 0.8, "weekly"),
    ...localizedUrls("/hijri-calendar", 0.8, "monthly"),
    ...localizedUrls("/about", 0.5, "yearly"),
    ...localizedUrls("/contact", 0.5, "yearly"),
    ...localizedUrls("/privacy-policy", 0.3, "yearly"),
    ...localizedUrls("/terms", 0.3, "yearly"),
    ...localizedUrls("/sitemap", 0.3, "monthly"),
  ];

  // Calculators
  const calculators = [
    "zakat", "salary", "vat", "end-of-service", "mortgage",
    "inheritance", "age", "budget", "bmi", "percentage", "real-estate-finance",
    "currency", "pregnancy", "electricity",
  ].flatMap((slug) => localizedUrls(`/calculators/${slug}`, 0.8));

  // Countdowns main pages
  const countdownSlugs = [
    "ramadan", "eid-fitr", "eid-adha", "hajj", "laylatul-qadr",
    "arafah", "hijri-new-year", "ashura", "mawlid", "national-day",
    "citizen-account", "salaries-dates",
  ];
  const countdownPages = countdownSlugs.flatMap((slug) => localizedUrls(`/countdowns/${slug}`, 0.8, "weekly"));

  // Countdown year pages
  const countdownYears = [
    ...yearUrls("/countdowns/ramadan", RAMADAN_YEARS, 0.6),
    ...yearUrls("/countdowns/eid-fitr", EID_FITR_YEARS, 0.6),
    ...yearUrls("/countdowns/eid-adha", EID_ADHA_YEARS, 0.6),
    ...yearUrls("/countdowns/hajj", HAJJ_YEARS, 0.6),
    ...yearUrls("/countdowns/laylatul-qadr", LAILATUL_QADR_YEARS, 0.6),
    ...yearUrls("/countdowns/arafah", ARAFA_DAY_YEARS, 0.6),
    ...yearUrls("/countdowns/hijri-new-year", HIJRI_NEW_YEAR_YEARS, 0.6),
    ...yearUrls("/countdowns/ashura", ASHURA_YEARS, 0.6),
    ...yearUrls("/countdowns/mawlid", MAWLID_YEARS, 0.6),
  ];

  // Countdown years listing pages
  const countdownYearsPages = [
    "ramadan", "eid-fitr", "eid-adha", "hajj", "laylatul-qadr",
    "arafah", "hijri-new-year", "ashura", "mawlid",
  ].flatMap((slug) => localizedUrls(`/countdowns/${slug}/years`, 0.5));

  // Blog articles
  const blogArticles = ALL_ARTICLES.flatMap((article) =>
    localizedUrls(`/blog/${article.slug}`, 0.7, "monthly")
  );

  // Blog categories
  const blogCategories = ["financial", "islamic", "tools", "health", "religious", "islami", "guide"].flatMap(
    (slug) => localizedUrls(`/blog/category/${slug}`, 0.5)
  );

  return [
    ...staticPages,
    ...calculators,
    ...countdownPages,
    ...countdownYears,
    ...countdownYearsPages,
    ...blogArticles,
    ...blogCategories,
  ];
}
