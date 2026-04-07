"use client";

import { useLocale } from "next-intl";
import CountdownPageTemplate from "./CountdownPageTemplate";
import { getNextMonthlyDate } from "@/lib/events/salary-events";

interface SalaryCountdownPageProps {
  icon: string;
  titleAr: string;
  titleEn: string;
  questionAr: string;
  questionEn: string;
  dayOfMonth: number;
  gradient: string;
  breadcrumbAr: string;
  breadcrumbEn: string;
  descriptionAr: React.ReactNode;
  descriptionEn: React.ReactNode;
  faqsAr: { question: string; answer: string }[];
  faqsEn: { question: string; answer: string }[];
  relatedItems: { labelAr: string; labelEn: string; href: string }[];
}

export default function SalaryCountdownPage(props: SalaryCountdownPageProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const targetDate = getNextMonthlyDate(props.dayOfMonth);
  const monthName = targetDate.toLocaleDateString(isAr ? "ar-SA" : "en-US", { month: "long", year: "numeric" });

  return (
    <CountdownPageTemplate
      icon={props.icon}
      titleAr={props.titleAr}
      titleEn={props.titleEn}
      questionAr={props.questionAr}
      questionEn={props.questionEn}
      subtitleAr={`الدفعة القادمة — ${monthName}`}
      subtitleEn={`Next payment — ${monthName}`}
      targetDate={targetDate}
      gradient={props.gradient}
      breadcrumbLabelAr={props.breadcrumbAr}
      breadcrumbLabelEn={props.breadcrumbEn}
      contentAr={props.descriptionAr}
      contentEn={props.descriptionEn}
      faqsAr={props.faqsAr}
      faqsEn={props.faqsEn}
      relatedItems={props.relatedItems}
    />
  );
}
