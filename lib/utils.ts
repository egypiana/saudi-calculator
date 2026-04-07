import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(
  value: number,
  decimals = 2,
  locale = "ar-SA"
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatCurrency(
  value: number,
  currency = "SAR",
  locale = "ar-SA"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatArabicDate(date: Date): string {
  return date.toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function parseArabicNumber(str: string): number {
  const arabicNumerals: Record<string, string> = {
    "\u0660": "0", "\u0661": "1", "\u0662": "2", "\u0663": "3", "\u0664": "4",
    "\u0665": "5", "\u0666": "6", "\u0667": "7", "\u0668": "8", "\u0669": "9",
  };
  const normalized = str.replace(/[\u0660-\u0669]/g, (d) => arabicNumerals[d] ?? d);
  return parseFloat(normalized);
}

export function normalizeArabic(text: string): string {
  return text
    .replace(/[\u0623\u0625\u0622\u0627]/g, "\u0627")
    .replace(/[\u0629\u0647]/g, "\u0647")
    .replace(/[\u064A\u0649]/g, "\u064A")
    .replace(/[\u064B-\u0652]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function round(value: number, decimals: number): number {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
