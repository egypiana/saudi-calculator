/**
 * Islamic Inheritance Calculator (حاسبة المواريث الشرعية)
 * Based on Hanbali school (المذهب الحنبلي) — the official school in Saudi Arabia
 *
 * Implements:
 * - 17 heir types across 8 categories
 * - Blocking rules (حجب الحرمان)
 * - Fixed shares (أصحاب الفروض)
 * - Residual shares (التعصيب)
 * - 'Awl (العول) — proportional reduction when shares exceed estate
 * - Radd (الرد) — return of excess to eligible heirs
 */

export type DeceasedGender = "male" | "female";

/* ───────────── Heir Definitions ───────────── */

export interface HeirDef {
  id: string;
  labelAr: string;
  labelEn: string;
  icon: string;
  category: string;
  countable: boolean;
  maxCount?: number;
  showForDeceased?: DeceasedGender;
}

export const HEIR_DEFINITIONS: HeirDef[] = [
  // Spouse
  { id: "husband", labelAr: "الزوج", labelEn: "Husband", icon: "👨‍💼", category: "spouse", countable: false, showForDeceased: "female" },
  { id: "wife", labelAr: "الزوجة", labelEn: "Wife(s)", icon: "👩‍💼", category: "spouse", countable: true, maxCount: 4, showForDeceased: "male" },
  // Children
  { id: "sons", labelAr: "الأبناء (ذكور)", labelEn: "Sons", icon: "👦", category: "children", countable: true },
  { id: "daughters", labelAr: "البنات", labelEn: "Daughters", icon: "👧", category: "children", countable: true },
  // Grandchildren (through sons)
  { id: "sons_sons", labelAr: "أبناء الابن", labelEn: "Grandsons (son's)", icon: "👶", category: "grandchildren", countable: true },
  { id: "sons_daughters", labelAr: "بنات الابن", labelEn: "Granddaughters (son's)", icon: "🧒", category: "grandchildren", countable: true },
  // Parents
  { id: "father", labelAr: "الأب", labelEn: "Father", icon: "👴", category: "parents", countable: false },
  { id: "mother", labelAr: "الأم", labelEn: "Mother", icon: "👵", category: "parents", countable: false },
  // Grandparents
  { id: "paternal_grandfather", labelAr: "الجد لأب", labelEn: "Paternal Grandfather", icon: "🧓", category: "grandparents", countable: false },
  { id: "paternal_grandmother", labelAr: "الجدة لأب", labelEn: "Paternal Grandmother", icon: "👵", category: "grandparents", countable: false },
  { id: "maternal_grandmother", labelAr: "الجدة لأم", labelEn: "Maternal Grandmother", icon: "👵", category: "grandparents", countable: false },
  // Full siblings
  { id: "full_brothers", labelAr: "إخوة أشقاء", labelEn: "Full Brothers", icon: "🧑", category: "full_siblings", countable: true },
  { id: "full_sisters", labelAr: "أخوات شقيقات", labelEn: "Full Sisters", icon: "👩", category: "full_siblings", countable: true },
  // Paternal half-siblings
  { id: "paternal_brothers", labelAr: "إخوة لأب", labelEn: "Paternal Half-Brothers", icon: "🧑‍🤝‍🧑", category: "paternal_siblings", countable: true },
  { id: "paternal_sisters", labelAr: "أخوات لأب", labelEn: "Paternal Half-Sisters", icon: "👭", category: "paternal_siblings", countable: true },
  // Maternal half-siblings
  { id: "maternal_brothers", labelAr: "إخوة لأم", labelEn: "Maternal Half-Brothers", icon: "🧑‍🤝‍🧑", category: "maternal_siblings", countable: true },
  { id: "maternal_sisters", labelAr: "أخوات لأم", labelEn: "Maternal Half-Sisters", icon: "👭", category: "maternal_siblings", countable: true },
];

export const HEIR_CATEGORIES = [
  { id: "spouse", labelAr: "الزوج / الزوجة", labelEn: "Spouse", icon: "💍" },
  { id: "children", labelAr: "الأبناء والبنات", labelEn: "Children", icon: "👨‍👩‍👧‍👦" },
  { id: "grandchildren", labelAr: "أبناء وبنات الابن", labelEn: "Son's Children", icon: "👶" },
  { id: "parents", labelAr: "الوالدان", labelEn: "Parents", icon: "👫" },
  { id: "grandparents", labelAr: "الأجداد والجدات", labelEn: "Grandparents", icon: "👴" },
  { id: "full_siblings", labelAr: "الإخوة الأشقاء", labelEn: "Full Siblings", icon: "👫" },
  { id: "paternal_siblings", labelAr: "الإخوة لأب", labelEn: "Paternal Half-Siblings", icon: "👥" },
  { id: "maternal_siblings", labelAr: "الإخوة لأم", labelEn: "Maternal Half-Siblings", icon: "👥" },
];

/* ───────────── Result Types ───────────── */

export interface HeirResult {
  heirId: string;
  labelAr: string;
  labelEn: string;
  icon: string;
  count: number;
  shareFraction: string;
  shareType: string;
  shareDecimal: number;
  totalAmount: number;
  perPersonAmount: number;
  percentage: number;
  isBlocked: boolean;
  blockReason?: string;
  note?: string;
}

export interface InheritanceResult {
  grossEstate: number;
  debts: number;
  wasiyyah: number;
  netEstate: number;
  heirs: HeirResult[];
  hasAwl: boolean;
  awlOriginalBase?: number;
  awlNewBase?: number;
  hasRadd: boolean;
  steps: string[];
  warnings: string[];
}

export interface InheritanceInput {
  estate: number;
  debts: number;
  wasiyyah: number;
  deceasedGender: DeceasedGender;
  heirs: Record<string, number>;
}

/* ───────────── Helpers ───────────── */

const fmt = (n: number) => n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });

function getHeirDef(id: string): HeirDef {
  return HEIR_DEFINITIONS.find((h) => h.id === id)!;
}

/* ───────────── Main Calculation ───────────── */

export function calculateInheritance(input: InheritanceInput): InheritanceResult {
  const { estate, debts, wasiyyah: rawWasiyyah, heirs } = input;
  const steps: string[] = [];
  const warnings: string[] = [];

  // Phase 1: Deductions
  const afterDebts = Math.max(0, estate - debts);
  const maxWasiyyah = afterDebts / 3;
  const wasiyyah = Math.min(rawWasiyyah, maxWasiyyah);
  const netEstate = afterDebts - wasiyyah;

  steps.push(`إجمالي التركة: ${fmt(estate)} ريال`);
  if (debts > 0) steps.push(`(-) الديون: ${fmt(debts)} ريال`);
  if (wasiyyah > 0) {
    steps.push(`(-) الوصية: ${fmt(wasiyyah)} ريال`);
    if (rawWasiyyah > maxWasiyyah) {
      warnings.push(`تم تحديد الوصية بثلث التركة (${fmt(maxWasiyyah)} ريال) لأنها تجاوزت الحد الأقصى`);
    }
  }
  steps.push(`صافي التركة القابل للتوزيع: ${fmt(netEstate)} ريال`);

  if (netEstate <= 0) {
    return { grossEstate: estate, debts, wasiyyah, netEstate: 0, heirs: [], hasAwl: false, hasRadd: false, steps, warnings };
  }

  // Helpers
  const has = (id: string) => (heirs[id] || 0) > 0;
  const cnt = (id: string) => heirs[id] || 0;

  // Descendant checks
  const hasSons = has("sons");
  const hasDaughters = has("daughters");
  const hasSonsSons = has("sons_sons");
  const hasSonsDaughters = has("sons_daughters");
  const hasDirectChildren = hasSons || hasDaughters;
  const hasAnyDescendant = hasDirectChildren || hasSonsSons || hasSonsDaughters;
  const hasMaleDescendant = hasSons || hasSonsSons;

  // Ascendant checks
  const hasFather = has("father");
  const hasMother = has("mother");
  const hasGrandfather = has("paternal_grandfather");
  // (hasFather and hasGrandfather used directly in blocking rules below)

  // Sibling counts
  const totalSiblingCount = cnt("full_brothers") + cnt("full_sisters") +
    cnt("paternal_brothers") + cnt("paternal_sisters") +
    cnt("maternal_brothers") + cnt("maternal_sisters");

  // Phase 2: Blocking Rules (حجب الحرمان)
  const blocked: Record<string, string> = {};

  // Son's sons blocked by sons
  if (hasSons && has("sons_sons")) blocked["sons_sons"] = "محجوب بالابن";

  // Son's daughters blocked by sons (the son is closer in degree)
  if (hasSons && has("sons_daughters")) blocked["sons_daughters"] = "محجوبة بالابن";

  // Paternal grandfather blocked by father
  if (hasFather && has("paternal_grandfather")) blocked["paternal_grandfather"] = "محجوب بالأب";

  // Paternal grandmother blocked by mother
  if (hasMother && has("paternal_grandmother")) blocked["paternal_grandmother"] = "محجوبة بالأم";

  // Maternal grandmother blocked by mother
  if (hasMother && has("maternal_grandmother")) blocked["maternal_grandmother"] = "محجوبة بالأم";

  // Full siblings blocked by father, son, son's son
  if (hasFather || hasSons || hasSonsSons) {
    const reason = hasFather ? "محجوب بالأب" : "محجوب بالابن";
    if (has("full_brothers")) blocked["full_brothers"] = reason;
    // Full sisters blocked by father/son/son's son BUT become asaba with daughters — handle below
    if (has("full_sisters") && (hasFather || hasMaleDescendant)) {
      blocked["full_sisters"] = reason;
    }
  }

  // Paternal half-siblings blocked by father, son, son's son, full brother
  if (hasFather || hasSons || hasSonsSons) {
    const reason = hasFather ? "محجوب بالأب" : "محجوب بالابن";
    if (has("paternal_brothers")) blocked["paternal_brothers"] = reason;
    if (has("paternal_sisters")) blocked["paternal_sisters"] = reason;
  } else {
    // Paternal brothers blocked by full brothers (full brother is stronger)
    if (has("full_brothers") && has("paternal_brothers")) {
      blocked["paternal_brothers"] = "محجوب بالأخ الشقيق";
    }
    // Paternal sisters blocked by: full brothers, OR 2+ full sisters (without paternal brother)
    if (has("paternal_sisters") && !has("paternal_brothers")) {
      if (has("full_brothers")) {
        blocked["paternal_sisters"] = "محجوبة بالأخ الشقيق";
      } else if (cnt("full_sisters") >= 2) {
        // 2+ full sisters take 2/3, nothing left for paternal sisters
        blocked["paternal_sisters"] = "محجوبة بالأخوات الشقيقات (استوفين الثلثين)";
      }
    }
  }

  // Maternal half-siblings blocked by any descendant or father/grandfather
  if (hasAnyDescendant || hasFather || hasGrandfather) {
    const reason = hasAnyDescendant ? "محجوب بالفرع الوارث" : "محجوب بالأصل الذكر";
    if (has("maternal_brothers")) blocked["maternal_brothers"] = reason;
    if (has("maternal_sisters")) blocked["maternal_sisters"] = reason;
  }

  steps.push("──────────────");
  steps.push("تحديد الأنصبة الشرعية:");

  // Phase 3: Calculate shares
  interface ShareEntry {
    heirId: string;
    fraction: string;
    decimal: number;
    shareType: string;
    isResidual: boolean;
    residualWeight?: number; // for splitting residual among multiple heirs
  }

  const fixedShares: ShareEntry[] = [];
  const residualHeirs: ShareEntry[] = [];

  // Note: grandfather acts like father when father is absent (handled in each heir's rules)

  // ─── SPOUSE ───
  if (has("husband")) {
    const fraction = hasAnyDescendant ? 1 / 4 : 1 / 2;
    const frStr = hasAnyDescendant ? "¼" : "½";
    fixedShares.push({ heirId: "husband", fraction: frStr, decimal: fraction, shareType: "فرض", isResidual: false });
    steps.push(`الزوج: ${frStr} (فرض) — ${hasAnyDescendant ? "لوجود فرع وارث" : "لعدم وجود فرع وارث"}`);
  }

  if (has("wife")) {
    const fraction = hasAnyDescendant ? 1 / 8 : 1 / 4;
    const frStr = hasAnyDescendant ? "⅛" : "¼";
    fixedShares.push({ heirId: "wife", fraction: frStr, decimal: fraction, shareType: "فرض", isResidual: false });
    steps.push(`الزوجة: ${frStr} (فرض) — ${hasAnyDescendant ? "لوجود فرع وارث" : "لعدم وجود فرع وارث"}${cnt("wife") > 1 ? ` (يُقسم على ${cnt("wife")} زوجات بالتساوي)` : ""}`);
  }

  // ─── DAUGHTERS ───
  if (hasDaughters && !hasSons) {
    // Daughters get fixed share (no sons to make them residual)
    if (cnt("daughters") === 1) {
      fixedShares.push({ heirId: "daughters", fraction: "½", decimal: 1 / 2, shareType: "فرض", isResidual: false });
      steps.push(`البنت: ½ (فرض) — بنت واحدة بدون ابن`);
    } else {
      fixedShares.push({ heirId: "daughters", fraction: "⅔", decimal: 2 / 3, shareType: "فرض", isResidual: false });
      steps.push(`البنات (${cnt("daughters")}): ⅔ (فرض) — بنتان فأكثر بدون ابن`);
    }
  } else if (hasDaughters && hasSons) {
    // Daughters with sons → both become residual (2:1 ratio)
    // Will be handled in residual section with sons
  }

  // ─── SONS (always residual) ───
  if (hasSons) {
    residualHeirs.push({ heirId: "sons", fraction: "تعصيب", decimal: 0, shareType: "تعصيب بالنفس", isResidual: true, residualWeight: cnt("sons") * 2 });
    if (hasDaughters) {
      residualHeirs.push({ heirId: "daughters", fraction: "تعصيب", decimal: 0, shareType: "تعصيب بالغير", isResidual: true, residualWeight: cnt("daughters") });
      steps.push(`الأبناء (${cnt("sons")}) والبنات (${cnt("daughters")}): تعصيب — للذكر مثل حظ الأنثيين`);
    } else {
      steps.push(`الأبناء (${cnt("sons")}): تعصيب بالنفس — يأخذون الباقي`);
    }
  }

  // ─── SON'S SONS & SON'S DAUGHTERS ───
  if (hasSonsSons && !blocked["sons_sons"]) {
    if (hasSonsDaughters && !blocked["sons_daughters"]) {
      // Both grandsons and granddaughters → residual together
      residualHeirs.push({ heirId: "sons_sons", fraction: "تعصيب", decimal: 0, shareType: "تعصيب بالنفس", isResidual: true, residualWeight: cnt("sons_sons") * 2 });
      residualHeirs.push({ heirId: "sons_daughters", fraction: "تعصيب", decimal: 0, shareType: "تعصيب بالغير", isResidual: true, residualWeight: cnt("sons_daughters") });
      steps.push(`أبناء الابن (${cnt("sons_sons")}) وبنات الابن (${cnt("sons_daughters")}): تعصيب`);
    } else {
      residualHeirs.push({ heirId: "sons_sons", fraction: "تعصيب", decimal: 0, shareType: "تعصيب بالنفس", isResidual: true, residualWeight: cnt("sons_sons") * 2 });
      steps.push(`أبناء الابن (${cnt("sons_sons")}): تعصيب بالنفس`);
    }
  } else if (hasSonsDaughters && !blocked["sons_daughters"]) {
    // Son's daughters without son's sons
    const daughtersTook = hasDaughters && !hasSons;
    if (daughtersTook && cnt("daughters") === 1) {
      // One daughter took 1/2, son's daughters get 1/6 (completing 2/3)
      fixedShares.push({ heirId: "sons_daughters", fraction: "⅙", decimal: 1 / 6, shareType: "فرض", isResidual: false });
      steps.push(`بنات الابن (${cnt("sons_daughters")}): ⅙ (فرض) — تكملة الثلثين مع البنت`);
    } else if (daughtersTook && cnt("daughters") >= 2) {
      // 2+ daughters took 2/3, nothing left for son's daughters (blocked)
      blocked["sons_daughters"] = "محجوبة — البنات استوفين الثلثين";
    } else if (!hasDaughters) {
      // No daughters: son's daughters get same as daughters
      if (cnt("sons_daughters") === 1) {
        fixedShares.push({ heirId: "sons_daughters", fraction: "½", decimal: 1 / 2, shareType: "فرض", isResidual: false });
        steps.push(`بنت الابن: ½ (فرض)`);
      } else {
        fixedShares.push({ heirId: "sons_daughters", fraction: "⅔", decimal: 2 / 3, shareType: "فرض", isResidual: false });
        steps.push(`بنات الابن (${cnt("sons_daughters")}): ⅔ (فرض)`);
      }
    }
  }

  // ─── FATHER ───
  if (hasFather) {
    if (hasMaleDescendant) {
      // Father gets 1/6 only (male descendants take residual)
      fixedShares.push({ heirId: "father", fraction: "⅙", decimal: 1 / 6, shareType: "فرض", isResidual: false });
      steps.push(`الأب: ⅙ (فرض) — لوجود فرع وارث ذكر`);
    } else if (hasAnyDescendant) {
      // Only female descendants: father gets 1/6 + residual
      fixedShares.push({ heirId: "father", fraction: "⅙+", decimal: 1 / 6, shareType: "فرض + تعصيب", isResidual: false });
      residualHeirs.push({ heirId: "father", fraction: "تعصيب", decimal: 0, shareType: "فرض + تعصيب", isResidual: true, residualWeight: 1 });
      steps.push(`الأب: ⅙ (فرض) + الباقي (تعصيب) — لوجود فرع وارث أنثى فقط`);
    } else {
      // No descendants: father gets all residual
      residualHeirs.push({ heirId: "father", fraction: "تعصيب", decimal: 0, shareType: "تعصيب بالنفس", isResidual: true, residualWeight: 1 });
      steps.push(`الأب: تعصيب بالنفس — لعدم وجود فرع وارث`);
    }
  }

  // ─── PATERNAL GRANDFATHER ───
  if (hasGrandfather && !blocked["paternal_grandfather"]) {
    // Acts like father when father is absent
    if (hasMaleDescendant) {
      fixedShares.push({ heirId: "paternal_grandfather", fraction: "⅙", decimal: 1 / 6, shareType: "فرض", isResidual: false });
      steps.push(`الجد لأب: ⅙ (فرض) — ينوب عن الأب`);
    } else if (hasAnyDescendant) {
      fixedShares.push({ heirId: "paternal_grandfather", fraction: "⅙+", decimal: 1 / 6, shareType: "فرض + تعصيب", isResidual: false });
      residualHeirs.push({ heirId: "paternal_grandfather", fraction: "تعصيب", decimal: 0, shareType: "فرض + تعصيب", isResidual: true, residualWeight: 1 });
      steps.push(`الجد لأب: ⅙ (فرض) + الباقي (تعصيب)`);
    } else {
      residualHeirs.push({ heirId: "paternal_grandfather", fraction: "تعصيب", decimal: 0, shareType: "تعصيب بالنفس", isResidual: true, residualWeight: 1 });
      steps.push(`الجد لأب: تعصيب بالنفس`);
    }
  }

  // ─── MOTHER ───
  if (hasMother) {
    const hasTwoOrMoreSiblings = totalSiblingCount >= 2;
    // Umariyyah case: spouse + both parents, no descendants, no siblings
    const isUmariyyah = !hasAnyDescendant && !hasTwoOrMoreSiblings &&
      (has("husband") || has("wife")) && hasFather && hasMother;

    if (hasAnyDescendant || hasTwoOrMoreSiblings) {
      fixedShares.push({ heirId: "mother", fraction: "⅙", decimal: 1 / 6, shareType: "فرض", isResidual: false });
      steps.push(`الأم: ⅙ (فرض) — ${hasAnyDescendant ? "لوجود فرع وارث" : "لوجود عدد من الإخوة"}`);
    } else if (isUmariyyah) {
      // Mother gets 1/3 of remainder after spouse — this is a special case
      // We handle this by marking it and adjusting later
      fixedShares.push({ heirId: "mother", fraction: "⅓ الباقي", decimal: -1, shareType: "فرض (العمرية)", isResidual: false });
      steps.push(`الأم: ⅓ الباقي بعد نصيب الزوج/الزوجة (مسألة عمرية)`);
    } else {
      fixedShares.push({ heirId: "mother", fraction: "⅓", decimal: 1 / 3, shareType: "فرض", isResidual: false });
      steps.push(`الأم: ⅓ (فرض) — لعدم وجود فرع وارث أو عدد من الإخوة`);
    }
  }

  // ─── GRANDMOTHERS ───
  const eligibleGrandmothers: string[] = [];
  if (has("paternal_grandmother") && !blocked["paternal_grandmother"]) eligibleGrandmothers.push("paternal_grandmother");
  if (has("maternal_grandmother") && !blocked["maternal_grandmother"]) eligibleGrandmothers.push("maternal_grandmother");

  if (eligibleGrandmothers.length > 0) {
    // Grandmothers share 1/6
    const share = 1 / 6;
    eligibleGrandmothers.forEach((gm, i) => {
      const def = getHeirDef(gm);
      fixedShares.push({ heirId: gm, fraction: "⅙", decimal: share / eligibleGrandmothers.length, shareType: "فرض", isResidual: false });
      if (i === 0) {
        steps.push(`${eligibleGrandmothers.length > 1 ? "الجدتان" : def.labelAr}: ⅙ (فرض)${eligibleGrandmothers.length > 1 ? " يُقسم بينهما بالتساوي" : ""}`);
      }
    });
  }

  // ─── FULL SIBLINGS ───
  const hasFullBrothers = has("full_brothers") && !blocked["full_brothers"];
  const hasFullSisters = has("full_sisters") && !blocked["full_sisters"];

  if (hasFullBrothers && hasFullSisters) {
    // Both: residual together (2:1)
    residualHeirs.push({ heirId: "full_brothers", fraction: "تعصيب", decimal: 0, shareType: "تعصيب بالنفس", isResidual: true, residualWeight: cnt("full_brothers") * 2 });
    residualHeirs.push({ heirId: "full_sisters", fraction: "تعصيب", decimal: 0, shareType: "تعصيب بالغير", isResidual: true, residualWeight: cnt("full_sisters") });
    steps.push(`الإخوة الأشقاء (${cnt("full_brothers")}) والأخوات الشقيقات (${cnt("full_sisters")}): تعصيب — للذكر مثل حظ الأنثيين`);
  } else if (hasFullBrothers) {
    residualHeirs.push({ heirId: "full_brothers", fraction: "تعصيب", decimal: 0, shareType: "تعصيب بالنفس", isResidual: true, residualWeight: cnt("full_brothers") });
    steps.push(`الإخوة الأشقاء (${cnt("full_brothers")}): تعصيب بالنفس`);
  } else if (hasFullSisters) {
    // Full sisters alone: check if they become asaba with daughters (عصبة مع الغير)
    const femaleDescendantsOnly = (hasDaughters || hasSonsDaughters) && !hasMaleDescendant;
    if (femaleDescendantsOnly && !hasFather) {
      // Sisters become asaba with daughters
      residualHeirs.push({ heirId: "full_sisters", fraction: "تعصيب", decimal: 0, shareType: "تعصيب مع الغير", isResidual: true, residualWeight: cnt("full_sisters") });
      steps.push(`الأخوات الشقيقات (${cnt("full_sisters")}): تعصيب مع الغير (مع البنات)`);
    } else if (!hasAnyDescendant && !hasFather) {
      // Fixed share
      if (cnt("full_sisters") === 1) {
        fixedShares.push({ heirId: "full_sisters", fraction: "½", decimal: 1 / 2, shareType: "فرض", isResidual: false });
        steps.push(`الأخت الشقيقة: ½ (فرض)`);
      } else {
        fixedShares.push({ heirId: "full_sisters", fraction: "⅔", decimal: 2 / 3, shareType: "فرض", isResidual: false });
        steps.push(`الأخوات الشقيقات (${cnt("full_sisters")}): ⅔ (فرض)`);
      }
    }
  }

  // ─── PATERNAL HALF-SIBLINGS ───
  const hasPaternalBrothers = has("paternal_brothers") && !blocked["paternal_brothers"];
  const hasPaternalSisters = has("paternal_sisters") && !blocked["paternal_sisters"];

  if (hasPaternalBrothers && hasPaternalSisters) {
    residualHeirs.push({ heirId: "paternal_brothers", fraction: "تعصيب", decimal: 0, shareType: "تعصيب بالنفس", isResidual: true, residualWeight: cnt("paternal_brothers") * 2 });
    residualHeirs.push({ heirId: "paternal_sisters", fraction: "تعصيب", decimal: 0, shareType: "تعصيب بالغير", isResidual: true, residualWeight: cnt("paternal_sisters") });
    steps.push(`الإخوة لأب (${cnt("paternal_brothers")}) والأخوات لأب (${cnt("paternal_sisters")}): تعصيب`);
  } else if (hasPaternalBrothers) {
    residualHeirs.push({ heirId: "paternal_brothers", fraction: "تعصيب", decimal: 0, shareType: "تعصيب بالنفس", isResidual: true, residualWeight: cnt("paternal_brothers") });
    steps.push(`الإخوة لأب (${cnt("paternal_brothers")}): تعصيب بالنفس`);
  } else if (hasPaternalSisters) {
    if (!hasAnyDescendant && !hasFather && !hasFullBrothers && !hasFullSisters) {
      if (cnt("paternal_sisters") === 1) {
        fixedShares.push({ heirId: "paternal_sisters", fraction: "½", decimal: 1 / 2, shareType: "فرض", isResidual: false });
        steps.push(`الأخت لأب: ½ (فرض)`);
      } else {
        fixedShares.push({ heirId: "paternal_sisters", fraction: "⅔", decimal: 2 / 3, shareType: "فرض", isResidual: false });
        steps.push(`الأخوات لأب (${cnt("paternal_sisters")}): ⅔ (فرض)`);
      }
    } else if (!hasAnyDescendant && !hasFather && hasFullSisters && cnt("full_sisters") === 1) {
      // Paternal sisters get 1/6 to complete 2/3 (with one full sister who got 1/2)
      fixedShares.push({ heirId: "paternal_sisters", fraction: "⅙", decimal: 1 / 6, shareType: "فرض", isResidual: false });
      steps.push(`الأخوات لأب (${cnt("paternal_sisters")}): ⅙ (تكملة الثلثين)`);
    }
  }

  // ─── MATERNAL HALF-SIBLINGS ───
  const hasMaternalBrothers = has("maternal_brothers") && !blocked["maternal_brothers"];
  const hasMaternalSisters = has("maternal_sisters") && !blocked["maternal_sisters"];
  const maternalCount = (hasMaternalBrothers ? cnt("maternal_brothers") : 0) + (hasMaternalSisters ? cnt("maternal_sisters") : 0);

  if (maternalCount > 0) {
    // Maternal siblings: male = female (equal shares, unique in Islamic law)
    if (maternalCount === 1) {
      const id = hasMaternalBrothers ? "maternal_brothers" : "maternal_sisters";
      fixedShares.push({ heirId: id, fraction: "⅙", decimal: 1 / 6, shareType: "فرض", isResidual: false });
      steps.push(`${getHeirDef(id).labelAr}: ⅙ (فرض) — أخ/أخت لأم واحد(ة)`);
    } else {
      const totalShare = 1 / 3;
      if (hasMaternalBrothers) {
        fixedShares.push({ heirId: "maternal_brothers", fraction: "⅓", decimal: (totalShare * cnt("maternal_brothers")) / maternalCount, shareType: "فرض", isResidual: false });
      }
      if (hasMaternalSisters) {
        fixedShares.push({ heirId: "maternal_sisters", fraction: "⅓", decimal: (totalShare * cnt("maternal_sisters")) / maternalCount, shareType: "فرض", isResidual: false });
      }
      steps.push(`الإخوة/الأخوات لأم (${maternalCount}): ⅓ (فرض) يُقسم بالتساوي — الذكر والأنثى سواء`);
    }
  }

  // Phase 4: Calculate totals and handle Umariyyah
  let totalFixed = 0;

  // Handle Umariyyah case first
  const umariyyahEntry = fixedShares.find((s) => s.decimal === -1);
  if (umariyyahEntry) {
    // Mother gets 1/3 of remainder after spouse
    const spouseShare = fixedShares.find((s) => s.heirId === "husband" || s.heirId === "wife");
    const spouseDecimal = spouseShare?.decimal || 0;
    const remainder = 1 - spouseDecimal;
    umariyyahEntry.decimal = remainder / 3;
    umariyyahEntry.fraction = `⅓ الباقي`;
  }

  totalFixed = fixedShares.reduce((sum, s) => sum + s.decimal, 0);

  // Phase 5: Distribute residual / handle 'awl / radd
  const totalResidualWeight = residualHeirs.reduce((sum, h) => sum + (h.residualWeight || 0), 0);
  let hasAwl = false;
  let hasRadd = false;
  let awlOriginalBase: number | undefined;
  let awlNewBase: number | undefined;

  if (totalFixed > 1 && residualHeirs.length === 0) {
    // 'Awl — proportional reduction
    hasAwl = true;
    // Find common denominator for display
    awlOriginalBase = 1;
    awlNewBase = totalFixed;
    steps.push(`──────────────`);
    steps.push(`⚠️ عول: مجموع الفروض (${(totalFixed * 100).toFixed(1)}%) تجاوز التركة — يتم التخفيض النسبي`);

    // Reduce all fixed shares proportionally
    fixedShares.forEach((s) => {
      s.decimal = s.decimal / totalFixed;
    });
  } else if (totalFixed < 1 && residualHeirs.length > 0) {
    // Residual heirs get the remainder
    const residualTotal = 1 - totalFixed;
    steps.push(`──────────────`);
    steps.push(`الباقي للعصبة: ${(residualTotal * 100).toFixed(1)}% من التركة`);

    residualHeirs.forEach((h) => {
      h.decimal = (residualTotal * (h.residualWeight || 0)) / totalResidualWeight;
    });
  } else if (totalFixed < 1 && residualHeirs.length === 0 && fixedShares.length > 0) {
    // Radd — return excess to non-spouse fixed share heirs
    hasRadd = true;
    const excess = 1 - totalFixed;
    steps.push(`──────────────`);
    steps.push(`رد: يوجد فائض ${(excess * 100).toFixed(1)}% يُرد على أصحاب الفروض (عدا الزوجين)`);

    const raddEligible = fixedShares.filter((s) => s.heirId !== "husband" && s.heirId !== "wife");
    const raddTotal = raddEligible.reduce((sum, s) => sum + s.decimal, 0);

    if (raddTotal > 0) {
      raddEligible.forEach((s) => {
        const raddShare = (s.decimal / raddTotal) * excess;
        s.decimal += raddShare;
      });
    }
  }

  // Phase 6: Build results
  steps.push(`──────────────`);
  steps.push(`النتائج النهائية:`);

  const results: HeirResult[] = [];

  // Add blocked heirs
  Object.entries(blocked).forEach(([heirId, reason]) => {
    if (!has(heirId)) return;
    const def = getHeirDef(heirId);
    results.push({
      heirId,
      labelAr: def.labelAr,
      labelEn: def.labelEn,
      icon: def.icon,
      count: cnt(heirId),
      shareFraction: "محجوب",
      shareType: "محجوب",
      shareDecimal: 0,
      totalAmount: 0,
      perPersonAmount: 0,
      percentage: 0,
      isBlocked: true,
      blockReason: reason,
    });
  });

  // Add fixed share heirs
  fixedShares.forEach((s) => {
    const def = getHeirDef(s.heirId);
    const count = cnt(s.heirId);
    const totalAmount = netEstate * s.decimal;
    const perPerson = totalAmount / count;
    results.push({
      heirId: s.heirId,
      labelAr: def.labelAr,
      labelEn: def.labelEn,
      icon: def.icon,
      count,
      shareFraction: s.fraction,
      shareType: s.shareType,
      shareDecimal: s.decimal,
      totalAmount,
      perPersonAmount: perPerson,
      percentage: s.decimal * 100,
      isBlocked: false,
    });
    steps.push(`${def.labelAr}${count > 1 ? ` (${count})` : ""}: ${fmt(totalAmount)} ريال (${s.fraction})`);
  });

  // Add residual heirs
  residualHeirs.forEach((s) => {
    // Skip if already added as fixed+residual (father case)
    const existingFixed = results.find((r) => r.heirId === s.heirId && !r.isBlocked);
    if (existingFixed) {
      // Add residual amount to existing fixed share
      const residualAmount = netEstate * s.decimal;
      existingFixed.totalAmount += residualAmount;
      existingFixed.shareDecimal += s.decimal;
      existingFixed.percentage += s.decimal * 100;
      existingFixed.perPersonAmount = existingFixed.totalAmount / existingFixed.count;
      existingFixed.shareType = "فرض + تعصيب";
      return;
    }

    const def = getHeirDef(s.heirId);
    const count = cnt(s.heirId);
    const totalAmount = netEstate * s.decimal;
    const perPerson = totalAmount / count;
    results.push({
      heirId: s.heirId,
      labelAr: def.labelAr,
      labelEn: def.labelEn,
      icon: def.icon,
      count,
      shareFraction: "الباقي",
      shareType: s.shareType,
      shareDecimal: s.decimal,
      totalAmount,
      perPersonAmount: perPerson,
      percentage: s.decimal * 100,
      isBlocked: false,
    });
    steps.push(`${def.labelAr}${count > 1 ? ` (${count})` : ""}: ${fmt(totalAmount)} ريال (${s.shareType})`);
  });

  // Sort: non-blocked first, then by amount descending
  results.sort((a, b) => {
    if (a.isBlocked !== b.isBlocked) return a.isBlocked ? 1 : -1;
    return b.totalAmount - a.totalAmount;
  });

  return {
    grossEstate: estate,
    debts,
    wasiyyah,
    netEstate,
    heirs: results,
    hasAwl,
    awlOriginalBase,
    awlNewBase,
    hasRadd,
    steps,
    warnings,
  };
}

/* ───────────── Common Scenarios for Examples ───────────── */

export const EXAMPLE_SCENARIOS: { titleAr: string; titleEn: string; icon: string; desc: string; input: InheritanceInput }[] = [
  {
    titleAr: "زوجة وأبناء",
    titleEn: "Wife and children",
    icon: "👨‍👩‍👧‍👦",
    desc: "متوفى ترك زوجة و3 أبناء وبنت",
    input: { estate: 1000000, debts: 0, wasiyyah: 0, deceasedGender: "male", heirs: { wife: 1, sons: 3, daughters: 1 } },
  },
  {
    titleAr: "زوج وبنات وأب",
    titleEn: "Husband, daughters, father",
    icon: "👴",
    desc: "متوفاة تركت زوج وبنتين وأب",
    input: { estate: 500000, debts: 0, wasiyyah: 0, deceasedGender: "female", heirs: { husband: 1, daughters: 2, father: 1 } },
  },
  {
    titleAr: "زوجة وأم وأب",
    titleEn: "Wife, mother, father",
    icon: "👫",
    desc: "متوفى بدون أبناء — العُمرية",
    input: { estate: 300000, debts: 0, wasiyyah: 0, deceasedGender: "male", heirs: { wife: 1, father: 1, mother: 1 } },
  },
  {
    titleAr: "أخوة وأخوات",
    titleEn: "Siblings only",
    icon: "👫",
    desc: "متوفى بدون أبناء ولا والدين — أخ شقيق وأختان",
    input: { estate: 600000, debts: 50000, wasiyyah: 0, deceasedGender: "male", heirs: { full_brothers: 1, full_sisters: 2 } },
  },
  {
    titleAr: "حالة العول",
    titleEn: "'Awl case",
    icon: "⚖️",
    desc: "زوج وأختان شقيقتان وأم",
    input: { estate: 240000, debts: 0, wasiyyah: 0, deceasedGender: "female", heirs: { husband: 1, full_sisters: 2, mother: 1 } },
  },
];
