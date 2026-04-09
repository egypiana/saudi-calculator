import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { lp } from "@/lib/utils/locale";

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
              <div className="bg-primary-600 rounded-xl p-1.5">
                <svg width="30" height="30" viewBox="0 0 44 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="40" height="40" rx="10" fill="white" fillOpacity="0.2"/>
                  <rect x="8" y="9" width="28" height="10" rx="3" fill="white" fillOpacity="0.9"/>
                  <rect x="9" y="25" width="7" height="5" rx="1.5" fill="white" fillOpacity="0.7"/>
                  <rect x="19" y="25" width="7" height="5" rx="1.5" fill="white" fillOpacity="0.7"/>
                  <rect x="29" y="25" width="7" height="5" rx="1.5" fill="#c9a84c"/>
                  <rect x="9" y="33" width="7" height="5" rx="1.5" fill="white" fillOpacity="0.7"/>
                  <rect x="19" y="33" width="7" height="5" rx="1.5" fill="white" fillOpacity="0.7"/>
                  <rect x="29" y="33" width="7" height="5" rx="1.5" fill="#c9a84c"/>
                  <rect x="32" y="0" width="16" height="12" rx="4" fill="#c9a84c"/>
                  <text x="40" y="9" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="bold" fill="white" textAnchor="middle">VIP</text>
                </svg>
              </div>
              <span className="text-white font-bold text-lg">
                {locale === "ar" ? "حاسبة VIP" : "Calculator VIP"}
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
                    href={lp(locale, link.href)}
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
                    href={lp(locale, link.href)}
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
                <Link href={lp(locale, "/about")} className="text-sm hover:text-white transition-colors flex items-center gap-1">
                  <span className="text-xs opacity-50">{locale === "ar" ? "←" : "→"}</span>
                  {tn("about")}
                </Link>
              </li>
              <li>
                <Link href={lp(locale, "/contact")} className="text-sm hover:text-white transition-colors flex items-center gap-1">
                  <span className="text-xs opacity-50">{locale === "ar" ? "←" : "→"}</span>
                  {tn("contact")}
                </Link>
              </li>
              <li>
                <Link href={lp(locale, "/sitemap")} className="text-sm hover:text-white transition-colors flex items-center gap-1">
                  <span className="text-xs opacity-50">{locale === "ar" ? "←" : "→"}</span>
                  {t("sitemap")}
                </Link>
              </li>
              <li>
                <Link href={lp(locale, "/privacy-policy")} className="text-sm hover:text-white transition-colors flex items-center gap-1">
                  <span className="text-xs opacity-50">{locale === "ar" ? "←" : "→"}</span>
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href={lp(locale, "/terms")} className="text-sm hover:text-white transition-colors flex items-center gap-1">
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
