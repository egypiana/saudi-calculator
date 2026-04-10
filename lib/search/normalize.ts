// ═══════════════════════════════════════════════════════════════════
//  Arabic Text Normalization
//  يقوم بتوحيد كل أشكال الكلمة العربية (ة/ه، ى/ي، أ/ا، الحركات...)
//  لإتاحة بحث ذكي يتجاهل الأخطاء الإملائية الشائعة
// ═══════════════════════════════════════════════════════════════════

/**
 * Normalizes Arabic text for search comparison:
 * - Removes diacritics (tashkeel)
 * - Unifies alef forms (أ إ آ ا ٱ → ا)
 * - Unifies taa marbouta (ة → ه)
 * - Unifies yaa (ى ي ئ → ي)
 * - Unifies waw (ؤ → و)
 * - Removes tatweel (ـ)
 * - Lowercases Latin characters
 * - Collapses whitespace
 */
export function normalizeAr(input: string): string {
  if (!input) return "";

  let s = input.toString();

  // Remove Arabic diacritics (tashkeel) — ranges U+064B-U+065F, U+0670, U+06D6-U+06ED
  s = s.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u08D4-\u08E1\u08E3-\u08FF]/g, "");

  // Remove tatweel
  s = s.replace(/\u0640/g, "");

  // Unify alef variants: أ إ آ ٱ ا → ا
  s = s.replace(/[\u0622\u0623\u0625\u0671]/g, "\u0627");

  // Taa marbouta → haa
  s = s.replace(/\u0629/g, "\u0647");

  // Alef maksura → yaa
  s = s.replace(/\u0649/g, "\u064A");

  // Hamza on waw → waw
  s = s.replace(/\u0624/g, "\u0648");

  // Hamza on yaa → yaa
  s = s.replace(/\u0626/g, "\u064A");

  // Standalone hamza → remove
  s = s.replace(/\u0621/g, "");

  // Lowercase
  s = s.toLowerCase();

  // Remove punctuation (keep Arabic letters, Latin letters, digits, spaces)
  // Arabic range: U+0600-U+06FF, Latin: A-Z a-z, digits: 0-9
  s = s.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, " ");

  // Collapse whitespace
  s = s.replace(/\s+/g, " ").trim();

  return s;
}

/**
 * Tokenize normalized string into words.
 */
export function tokenize(input: string): string[] {
  const n = normalizeAr(input);
  if (!n) return [];
  return n.split(" ").filter((t) => t.length > 0);
}

/**
 * Remove common Arabic prefixes like ال to get stem.
 * This handles cases like "الحاسبة" vs "حاسبة".
 */
export function stripArabicPrefix(word: string): string {
  if (!word) return word;
  // Strip definite article ال and و ف ب ك ل prefixes + ال
  if (word.length > 3) {
    if (word.startsWith("وال") || word.startsWith("فال") || word.startsWith("بال") || word.startsWith("كال") || word.startsWith("لل")) {
      return word.slice(3);
    }
  }
  if (word.length > 2 && word.startsWith("ال")) {
    return word.slice(2);
  }
  return word;
}

/**
 * Levenshtein distance — used for typo tolerance.
 */
export function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const dp: number[][] = [];
  for (let i = 0; i <= a.length; i++) {
    dp[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[a.length][b.length];
}
