// ═══════════════════════════════════════════════════════════════════
//  Fuzzy Arabic Search Engine
//  محرك بحث ذكي يتجاهل الأخطاء الإملائية والفروقات الشائعة
// ═══════════════════════════════════════════════════════════════════

import { getSearchIndex, type SearchItem } from "./searchIndex";
import { normalizeAr, tokenize, stripArabicPrefix, editDistance } from "./normalize";

export interface SearchResult extends SearchItem {
  score: number;
}

interface IndexedItem {
  item: SearchItem;
  normTitle: string;
  normDesc: string;
  normKeywords: string[];
  stems: string[];
  stemSet: { [key: string]: true };
}

// بناء الفهرس مرة واحدة (Memoization)
let cachedIndex: IndexedItem[] | null = null;

function getIndexed(): IndexedItem[] {
  if (cachedIndex) return cachedIndex;
  cachedIndex = getSearchIndex().map((item) => {
    const normTitle = normalizeAr(item.title);
    const normDesc = normalizeAr(item.description);
    const normKeywords = item.keywords.map((k) => normalizeAr(k));
    const stemSet: { [key: string]: true } = {};
    const addToken = (t: string) => {
      if (t && t.length > 0) {
        stemSet[t] = true;
        stemSet[stripArabicPrefix(t)] = true;
      }
    };
    tokenize(item.title).forEach(addToken);
    tokenize(item.description).forEach(addToken);
    normKeywords.forEach((k) => {
      k.split(" ").forEach(addToken);
    });
    return {
      item,
      normTitle,
      normDesc,
      normKeywords,
      stems: Object.keys(stemSet),
      stemSet,
    };
  });
  return cachedIndex;
}

/**
 * Calculate match score for one item against a normalized query.
 * Higher score = better match.
 */
function scoreItem(idx: IndexedItem, query: string, queryTokens: string[]): number {
  if (!query) return 0;

  let score = 0;
  const title = idx.normTitle;
  const desc = idx.normDesc;

  // ═════ 1. مطابقة كاملة في العنوان ═════
  if (title === query) score += 1000;
  else if (title.includes(query)) score += 500;
  else if (title.startsWith(query)) score += 400;

  // ═════ 2. مطابقة كاملة في الكلمات المفتاحية ═════
  for (const kw of idx.normKeywords) {
    if (kw === query) {
      score += 800;
      break;
    } else if (kw.includes(query)) {
      score += 300;
    }
  }

  // ═════ 3. مطابقة في الوصف ═════
  if (desc.includes(query)) score += 100;

  // ═════ 4. مطابقة على مستوى الكلمات ═════
  for (const qt of queryTokens) {
    if (!qt) continue;
    const qtStem = stripArabicPrefix(qt);

    // كلمة كاملة مطابقة في stems
    if (idx.stemSet[qt] || idx.stemSet[qtStem]) {
      score += 200;
      continue;
    }

    // مطابقة جزئية (prefix/substring) في أي stem
    let found = false;
    for (const stem of idx.stems) {
      if (stem.length < 2) continue;
      if (stem === qt || stem === qtStem) {
        score += 200;
        found = true;
        break;
      }
      if (stem.startsWith(qtStem) || qtStem.startsWith(stem)) {
        score += 120;
        found = true;
        break;
      }
      if (stem.includes(qtStem) && qtStem.length >= 3) {
        score += 80;
        found = true;
        break;
      }
    }

    // ═════ 5. مطابقة مشوّشة (typo tolerance) ═════
    if (!found && qtStem.length >= 4) {
      for (const stem of idx.stems) {
        if (Math.abs(stem.length - qtStem.length) > 2) continue;
        const d = editDistance(stem, qtStem);
        const maxAllowed = qtStem.length <= 5 ? 1 : 2;
        if (d <= maxAllowed) {
          score += Math.max(50 - d * 15, 20);
          break;
        }
      }
    }
  }

  // ═════ 6. ترجيح الحاسبات والعدادات على المقالات ═════
  if (idx.item.type === "calculator") score *= 1.15;
  else if (idx.item.type === "countdown") score *= 1.1;

  return score;
}

/**
 * Main search function. Returns results sorted by relevance.
 */
export function searchItems(query: string, limit = 20): SearchResult[] {
  if (!query || !query.trim()) return [];

  const normQuery = normalizeAr(query);
  const queryTokens = tokenize(query);
  const indexed = getIndexed();

  const results: SearchResult[] = [];
  for (const idx of indexed) {
    const score = scoreItem(idx, normQuery, queryTokens);
    if (score > 0) {
      results.push({ ...idx.item, score });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}
