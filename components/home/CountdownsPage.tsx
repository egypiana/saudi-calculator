"use client";

import { useLocale, useTranslations } from "next-intl";
import Breadcrumb from "@/components/layout/Breadcrumb";
import CountdownCard from "@/components/countdown/CountdownCard";
import { ISLAMIC_EVENTS, getNextEventDate } from "@/lib/events/islamic-events";
import { NATIONAL_EVENTS, getNextNationalEventDate } from "@/lib/events/national-events";
import { SALARY_EVENTS, getNextMonthlyDate } from "@/lib/events/salary-events";

export default function CountdownsPage() {
  const locale = useLocale();
  const tc = useTranslations("categories");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: locale === "ar" ? "العدادات" : "Countdowns" },
        ]}
      />

      {/* المناسبات الإسلامية */}
      <section className="mb-12" id="islamic">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {tc("islamicEvents")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ISLAMIC_EVENTS.map((event) => {
            const date = getNextEventDate(event.id);
            if (!date) return null;
            return (
              <CountdownCard
                key={event.id}
                eventId={event.id}
                icon={event.icon}
                titleKey={event.nameKey}
                questionKey={event.questionKey}
                targetDate={date}
                gradient={event.gradient}
                href={`/countdowns/${event.id}`}
              />
            );
          })}
        </div>
      </section>

      {/* المناسبات الوطنية */}
      <section className="mb-12" id="national">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {tc("nationalEvents")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NATIONAL_EVENTS.map((event) => {
            const date = getNextNationalEventDate(event.id);
            if (!date) return null;
            return (
              <CountdownCard
                key={event.id}
                eventId={event.id}
                icon={event.icon}
                titleKey={event.nameKey}
                questionKey={event.nameKey}
                targetDate={date}
                gradient={event.gradient}
                href={`/countdowns/${event.id}`}
              />
            );
          })}
        </div>
      </section>

      {/* مواعيد الرواتب */}
      <section id="salaries">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {tc("salaryDates")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SALARY_EVENTS.map((event) => {
            const date = getNextMonthlyDate(event.dayOfMonth);
            return (
              <CountdownCard
                key={event.id}
                eventId={event.id}
                icon={event.icon}
                titleKey={event.nameKey}
                questionKey={event.nameKey}
                targetDate={date}
                gradient={event.gradient}
                href={`/countdowns/${event.id}`}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
