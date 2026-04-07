import Link from "next/link";
import { Calculator } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const countdownLinks = [
  { labelKey: "ramadan", href: "/countdowns/ramadan" },
  { labelKey: "eidFitr", href: "/countdowns/eid-fitr" },
  { labelKey: "eidAdha", href: "/countdowns/eid-adha" },
  { labelKey: "citizenAccount", href: "/countdowns/citizen-account" },
  { labelKey: "nationalDay", href: "/countdowns/national-day" },
  { labelKey: "nextSalary", href: "/countdowns/salaries-dates" },
];

const calculatorLinks = [
  { label: { ar: "حاسبة الزكاة", en: "Zakat" }, href: "/calculators/zakat" },
  { label: { ar: "القيمة المضافة", en: "VAT" }, href: "/calculators/vat" },
  { label: { ar: "الراتب", en: "Salary" }, href: "/calculators/salary" },
  { label: { ar: "نهاية الخدمة", en: "End of Service" }, href: "/calculators/end-of-service" },
  { label: { ar: "القرض العقاري", en: "Mortgage" }, href: "/calculators/mortgage" },
  { label: { ar: "التقويم الهجري", en: "Hijri Calendar" }, href: "/hijri-calendar" },
];

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const te = useTranslations("events");
  const tn = useTranslations("nav");

  return (
    <footer className="bg-dark text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* عن الموقع */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary-600 rounded-xl p-2">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <span className="text-white font-bold text-lg">
                {locale === "ar" ? "حاسبة السعودية" : "Saudi Calculator"}
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4">{t("aboutSite")}</p>
          </div>

          {/* العدادات */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-white/10 pb-2">
              {t("countdownsTitle")}
            </h3>
            <ul className="space-y-2">
              {countdownLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span className="text-xs opacity-50">{locale === "ar" ? "←" : "→"}</span>
                    {te(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* الحاسبات */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-white/10 pb-2">
              {t("calculatorsTitle")}
            </h3>
            <ul className="space-y-2">
              {calculatorLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span className="text-xs opacity-50">{locale === "ar" ? "←" : "→"}</span>
                    {locale === "ar" ? link.label.ar : link.label.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* روابط مفيدة */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-white/10 pb-2">
              {t("usefulLinks")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/about`} className="text-sm hover:text-white transition-colors flex items-center gap-1">
                  <span className="text-xs opacity-50">{locale === "ar" ? "←" : "→"}</span>
                  {tn("about")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-sm hover:text-white transition-colors flex items-center gap-1">
                  <span className="text-xs opacity-50">{locale === "ar" ? "←" : "→"}</span>
                  {tn("contact")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/sitemap`} className="text-sm hover:text-white transition-colors flex items-center gap-1">
                  <span className="text-xs opacity-50">{locale === "ar" ? "←" : "→"}</span>
                  {t("sitemap")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy-policy`} className="text-sm hover:text-white transition-colors flex items-center gap-1">
                  <span className="text-xs opacity-50">{locale === "ar" ? "←" : "→"}</span>
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-sm hover:text-white transition-colors flex items-center gap-1">
                  <span className="text-xs opacity-50">{locale === "ar" ? "←" : "→"}</span>
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* شريط الحقوق */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center">
          <p className="text-sm text-gray-500">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
