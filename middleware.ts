import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["ar", "en", "es", "pt"],
  defaultLocale: "ar",
  localePrefix: "as-needed",
});

export const config = {
  matcher: ["/", "/(ar|en|es|pt)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
