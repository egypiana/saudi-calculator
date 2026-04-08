"use client";

import CustomCountdownBuilder from "./components/CustomCountdownBuilder";
import IslamicCountdowns from "./components/IslamicCountdowns";
import SaudiSalaryCountdowns from "./components/SaudiSalaryCountdowns";

interface CountdownsPageProps {
  locale: string;
}

export default function CountdownsPage({ locale }: CountdownsPageProps) {
  return (
    <div dir="rtl" className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <CustomCountdownBuilder />
      <IslamicCountdowns locale={locale} />
      <SaudiSalaryCountdowns locale={locale} />
    </div>
  );
}
