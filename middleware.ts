import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["ar"],
  defaultLocale: "ar",
  localePrefix: "as-needed",
});

export const config = {
  matcher: ["/", "/(ar)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
