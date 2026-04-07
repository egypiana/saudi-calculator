"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label?: string;
  labelAr?: string;
  labelEn?: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const locale = useLocale();
  const t = useTranslations("common");
  const isRTL = locale === "ar";
  const Separator = isRTL ? ChevronLeft : ChevronRight;

  const resolvedItems = items.map((item) => ({
    label: item.label || (isRTL ? item.labelAr : item.labelEn) || "",
    href: item.href ? (item.href.startsWith("/") && !item.href.startsWith(`/${locale}`) ? `/${locale}${item.href}` : item.href) : undefined,
  }));

  const allItems = [
    { label: t("home"), href: `/${locale}` },
    ...resolvedItems,
  ];

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1 text-sm text-gray-500 dark:text-gray-400">
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            {index > 0 && <Separator className="h-3.5 w-3.5 flex-shrink-0" />}
            {item.href && index < allItems.length - 1 ? (
              <Link
                href={item.href}
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1"
              >
                {index === 0 && <Home className="h-3.5 w-3.5" />}
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-800 dark:text-white font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
