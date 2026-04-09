/**
 * Returns the correct URL path based on locale.
 * Arabic (default locale) gets no prefix: /countdowns/ramadan
 * Other locales get prefix: /en/countdowns/ramadan
 */
export function lp(locale: string, path: string): string {
  if (locale === "ar") return path || "/";
  return `/${locale}${path}`;
}
