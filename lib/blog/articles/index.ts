import type { BlogArticle } from "../types";

import fuelConsumption from "./fuel-consumption";
import mortgageCalculation from "./mortgage-calculation";
import inheritanceCalculation from "./inheritance-calculation";
import endOfService from "./end-of-service";
import budgetRule from "./budget-rule";

export const ALL_ARTICLES: BlogArticle[] = [
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
