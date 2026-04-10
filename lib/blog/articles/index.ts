import type { BlogArticle } from "../types";

import fuelConsumption from "./fuel-consumption";
import mortgageCalculation from "./mortgage-calculation";
import inheritanceCalculation from "./inheritance-calculation";
import endOfService from "./end-of-service";
import budgetRule from "./budget-rule";
import hajjBudget from "./hajj-budget";
import udhiyahRulings from "./udhiyah-rulings";
import hajjTipsBeginners from "./hajj-tips-beginners";
import hajjHealthPreparation from "./hajj-health-preparation";
import ramadanCountdown2026 from "./ramadan-countdown-2026";
import ramadanStartDate2026 from "./ramadan-start-date-2026";
import ramadanDates20252050 from "./ramadan-dates-2025-2050";
import ramadanMoonSighting from "./ramadan-moon-sighting";
import ramadanSeasons from "./ramadan-seasons";
import ageCalculatorGuide from "./age-calculator-guide";
import howToKnowMyAge from "./how-to-know-my-age";
import ageHijriGregorianDifference from "./age-hijri-gregorian-difference";
import ageCalculatorBirthday from "./age-calculator-birthday";
import ageHijriCalculation from "./age-hijri-calculation";
import zakatGuide from "./zakat-guide";
import bmrCalculation from "./bmr-calculation";

export const ALL_ARTICLES: BlogArticle[] = [
  bmrCalculation,
  zakatGuide,
  ageCalculatorBirthday,
  ageHijriCalculation,
  ageHijriGregorianDifference,
  howToKnowMyAge,
  ageCalculatorGuide,
  ramadanCountdown2026,
  ramadanStartDate2026,
  ramadanDates20252050,
  ramadanMoonSighting,
  ramadanSeasons,
  hajjHealthPreparation,
  hajjTipsBeginners,
  udhiyahRulings,
  hajjBudget,
  budgetRule,
  fuelConsumption,
  mortgageCalculation,
  inheritanceCalculation,
  endOfService,
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return ALL_ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): BlogArticle[] {
  return ALL_ARTICLES.filter((a) => a.category === category);
}

export function getRelatedArticles(slug: string, limit = 3): BlogArticle[] {
  const article = getArticleBySlug(slug);
  if (!article) return ALL_ARTICLES.slice(0, limit);

  const related = article.relatedSlugs
    .map((s) => getArticleBySlug(s))
    .filter(Boolean) as BlogArticle[];

  // Fill up with other articles if not enough
  if (related.length < limit) {
    const remaining = ALL_ARTICLES.filter(
      (a) => a.slug !== slug && !article.relatedSlugs.includes(a.slug)
    );
    related.push(...remaining.slice(0, limit - related.length));
  }

  return related.slice(0, limit);
}

export function getAllSlugs(): string[] {
  return ALL_ARTICLES.map((a) => a.slug);
}
