import type { Metadata } from "next";

const BASE_URL = "https://calculatorvip.com";
const DEFAULT_OG_IMAGE = "/og-default.png";

/**
 * Generate alternates with hreflang for all locales.
 * Ensures every page has proper hreflang tags for international SEO.
 */
export function generateAlternates(locale: string, path: string) {
  return {
    canonical: path || "/",
    languages: {
      ar: path || "/",
      "x-default": path || "/",
    },
  };
}

/**
 * Generate OpenGraph metadata with image, URL, and locale.
 */
export function generateOGMetadata(
  locale: string,
  path: string,
  overrides?: {
    title?: string;
    description?: string;
    type?: "website" | "article";
    images?: string | string[];
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
  }
) {
  const cleanPath = path === "/" ? "" : path;
  const url = locale === "ar" ? `${BASE_URL}${cleanPath || "/"}` : `${BASE_URL}/${locale}${cleanPath}`;

  const ogImages = overrides?.images
    ? (Array.isArray(overrides.images) ? overrides.images : [overrides.images])
    : [DEFAULT_OG_IMAGE];

  const og: Record<string, unknown> = {
    type: overrides?.type || "website",
    locale: locale === "ar" ? "ar_SA" : locale,
    siteName: locale === "ar" ? "حاسبة VIP" : "Calculator VIP",
    url,
    images: ogImages.map((img) => ({
      url: img.startsWith("http") ? img : `${BASE_URL}${img}`,
      width: 1200,
      height: 630,
      alt: overrides?.title || (locale === "ar" ? "حاسبة VIP" : "Calculator VIP"),
    })),
  };

  if (overrides?.title) og.title = overrides.title;
  if (overrides?.description) og.description = overrides.description;
  if (overrides?.publishedTime) og.publishedTime = overrides.publishedTime;
  if (overrides?.modifiedTime) og.modifiedTime = overrides.modifiedTime;
  if (overrides?.authors) og.authors = overrides.authors;

  return og;
}

/**
 * Generate Twitter card metadata.
 */
export function generateTwitterMetadata(overrides?: {
  title?: string;
  description?: string;
  images?: string;
}) {
  return {
    card: "summary_large_image" as const,
    site: "@calculatorvip",
    title: overrides?.title,
    description: overrides?.description,
    images: overrides?.images
      ? [overrides.images.startsWith("http") ? overrides.images : `${BASE_URL}${overrides.images}`]
      : [`${BASE_URL}${DEFAULT_OG_IMAGE}`],
  };
}

/**
 * Generate complete SEO metadata for a page.
 * Combines alternates (hreflang), OpenGraph, and Twitter card.
 */
export function generatePageSEO(
  locale: string,
  path: string,
  meta: {
    title: string;
    description: string;
    keywords?: string[];
    ogType?: "website" | "article";
    ogImage?: string;
    publishedTime?: string;
    modifiedTime?: string;
  }
): Partial<Metadata> {
  return {
    alternates: generateAlternates(locale, path),
    openGraph: generateOGMetadata(locale, path, {
      title: meta.title,
      description: meta.description,
      type: meta.ogType,
      images: meta.ogImage,
      publishedTime: meta.publishedTime,
      modifiedTime: meta.modifiedTime,
    }),
    twitter: generateTwitterMetadata({
      title: meta.title,
      description: meta.description,
      images: meta.ogImage,
    }),
    ...(meta.keywords && { keywords: meta.keywords }),
  };
}
