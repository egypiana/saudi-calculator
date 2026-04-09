"use client";

import { useLocale } from "next-intl";
import { PAYMENT_TYPES, type PaymentType } from "@/lib/data/salaryDatesData";

function PaymentCard({ type }: { type: PaymentType }) {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border-2 bg-white p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:bg-gray-900"
      style={{ borderColor: type.color }}
    >
      {/* Subtle gradient background overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.08] dark:opacity-[0.08] dark:group-hover:opacity-[0.14]"
        style={{
          background: `linear-gradient(135deg, ${type.color}33, ${type.color}11)`,
        }}
      />

      {/* Top accent bar */}
      <div
        className="absolute top-0 start-0 end-0 h-1"
        style={{ backgroundColor: type.color }}
      />

      <div className="relative z-10">
        {/* Icon + Title */}
        <div className="mb-4 flex items-center gap-3">
          <span className="text-4xl" role="img" aria-hidden="true">
            {type.icon}
          </span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {isAr ? type.nameAr : type.nameEn}
          </h3>
        </div>

        {/* Description */}
        <p className="mb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {type.description}
        </p>

        {/* Info rows */}
        <div className="space-y-3">
          {/* Day rule */}
          <div className="flex items-start gap-2 text-sm">
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs text-white"
              style={{ backgroundColor: type.color }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3 w-3"
              >
                <path
                  fillRule="evenodd"
                  d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                {isAr ? "القاعدة:" : "Rule:"}
              </span>{" "}
              <span className="text-gray-600 dark:text-gray-400">
                {type.dayRule}
              </span>
            </div>
          </div>

          {/* Authority */}
          <div className="flex items-start gap-2 text-sm">
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs text-white"
              style={{ backgroundColor: type.color }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3 w-3"
              >
                <path
                  fillRule="evenodd"
                  d="M1 2.75A.75.75 0 0 1 1.75 2h16.5a.75.75 0 0 1 0 1.5H18v8.75A2.75 2.75 0 0 1 15.25 15h-1.072l.798 3.06a.75.75 0 0 1-1.452.38L13.41 18H6.59l-.114.44a.75.75 0 0 1-1.452-.38L5.822 15H4.75A2.75 2.75 0 0 1 2 12.25V3.5h-.25A.75.75 0 0 1 1 2.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                {isAr ? "الجهة:" : "Authority:"}
              </span>{" "}
              <a
                href={type.authorityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-1 underline-offset-2 transition-colors hover:decoration-2"
                style={{ color: type.color }}
              >
                {type.authority}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentTypesGrid() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section dir={isAr ? "rtl" : "ltr"}>
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
        {isAr
          ? "أنواع المستحقات المالية في السعودية"
          : "Payment Types in Saudi Arabia"}
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {PAYMENT_TYPES.map((type) => (
          <PaymentCard key={type.id} type={type} />
        ))}
      </div>
    </section>
  );
}
