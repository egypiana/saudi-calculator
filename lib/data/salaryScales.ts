/**
 * Saudi Government Salary Scales (سلالم الرواتب الحكومية)
 * Updated for 1446-1447 AH / 2025-2026
 */

/* ═══════════════════════════════════════════════════════════════
   1. GENERAL EMPLOYEE SCALE (سلم رواتب الموظفين العام)
   ═══════════════════════════════════════════════════════════════ */

export interface RankInfo {
  rank: number;
  baseSalary: number;     // Degree 1
  increment: number;      // Annual increment per degree
  maxDegrees: number;
  transportAllowance: number;
}

export const GENERAL_SCALE: RankInfo[] = [
  { rank: 1,  baseSalary: 3000,  increment: 135, maxDegrees: 15, transportAllowance: 500 },
  { rank: 2,  baseSalary: 3430,  increment: 165, maxDegrees: 15, transportAllowance: 500 },
  { rank: 3,  baseSalary: 3945,  increment: 190, maxDegrees: 15, transportAllowance: 500 },
  { rank: 4,  baseSalary: 4530,  increment: 230, maxDegrees: 15, transportAllowance: 500 },
  { rank: 5,  baseSalary: 5240,  increment: 265, maxDegrees: 15, transportAllowance: 500 },
  { rank: 6,  baseSalary: 6065,  increment: 305, maxDegrees: 15, transportAllowance: 700 },
  { rank: 7,  baseSalary: 7010,  increment: 365, maxDegrees: 15, transportAllowance: 700 },
  { rank: 8,  baseSalary: 8010,  increment: 415, maxDegrees: 15, transportAllowance: 700 },
  { rank: 9,  baseSalary: 9275,  increment: 470, maxDegrees: 15, transportAllowance: 700 },
  { rank: 10, baseSalary: 10275, increment: 510, maxDegrees: 15, transportAllowance: 700 },
  { rank: 11, baseSalary: 11815, increment: 530, maxDegrees: 14, transportAllowance: 900 },
  { rank: 12, baseSalary: 13435, increment: 570, maxDegrees: 13, transportAllowance: 900 },
  { rank: 13, baseSalary: 15180, increment: 605, maxDegrees: 12, transportAllowance: 900 },
  { rank: 14, baseSalary: 17015, increment: 700, maxDegrees: 11, transportAllowance: 1200 },
  { rank: 15, baseSalary: 20855, increment: 865, maxDegrees: 10, transportAllowance: 0 },
];

/** Calculate salary for a given rank and degree */
export function getGeneralSalary(rank: number, degree: number): number {
  const info = GENERAL_SCALE.find((r) => r.rank === rank);
  if (!info) return 0;
  const clampedDegree = Math.min(Math.max(degree, 1), info.maxDegrees);
  return info.baseSalary + (clampedDegree - 1) * info.increment;
}

/* ═══════════════════════════════════════════════════════════════
   2. TEACHER SALARY SCALE (سلم رواتب المعلمين)
   ═══════════════════════════════════════════════════════════════ */

export interface TeacherLevelInfo {
  level: number;
  baseSalary: number;
  increment: number;
  maxDegrees: number;
}

export interface TeacherCategory {
  id: string;
  labelAr: string;
  levels: TeacherLevelInfo[];
  transportAllowance: number;
}

export const TEACHER_SCALE: TeacherCategory[] = [
  {
    id: "teacher",
    labelAr: "معلم / مساعد معلم",
    transportAllowance: 700,
    levels: [
      { level: 1, baseSalary: 5200,  increment: 300, maxDegrees: 6 },
      { level: 2, baseSalary: 7000,  increment: 320, maxDegrees: 6 },
      { level: 3, baseSalary: 8920,  increment: 340, maxDegrees: 6 },
      { level: 4, baseSalary: 10900, increment: 360, maxDegrees: 6 },
      { level: 5, baseSalary: 13100, increment: 400, maxDegrees: 6 },
      { level: 6, baseSalary: 15500, increment: 400, maxDegrees: 6 },
    ],
  },
  {
    id: "practitioner",
    labelAr: "معلم ممارس",
    transportAllowance: 700,
    levels: [
      { level: 1, baseSalary: 7570,  increment: 500, maxDegrees: 6 },
      { level: 2, baseSalary: 10570, increment: 520, maxDegrees: 6 },
      { level: 3, baseSalary: 13690, increment: 540, maxDegrees: 6 },
      { level: 4, baseSalary: 16700, increment: 540, maxDegrees: 6 },
      { level: 5, baseSalary: 19800, increment: 540, maxDegrees: 6 },
    ],
  },
  {
    id: "advanced",
    labelAr: "معلم متقدم",
    transportAllowance: 700,
    levels: [
      { level: 1, baseSalary: 9950,  increment: 540, maxDegrees: 6 },
      { level: 2, baseSalary: 13190, increment: 560, maxDegrees: 6 },
      { level: 3, baseSalary: 16550, increment: 580, maxDegrees: 6 },
      { level: 4, baseSalary: 19900, increment: 580, maxDegrees: 6 },
    ],
  },
  {
    id: "expert",
    labelAr: "معلم خبير",
    transportAllowance: 700,
    levels: [
      { level: 1, baseSalary: 12650, increment: 600, maxDegrees: 6 },
      { level: 2, baseSalary: 16250, increment: 620, maxDegrees: 6 },
      { level: 3, baseSalary: 19970, increment: 640, maxDegrees: 6 },
    ],
  },
];

export function getTeacherSalary(categoryId: string, level: number, degree: number): number {
  const cat = TEACHER_SCALE.find((c) => c.id === categoryId);
  if (!cat) return 0;
  const lvl = cat.levels.find((l) => l.level === level);
  if (!lvl) return 0;
  const clampedDegree = Math.min(Math.max(degree, 1), lvl.maxDegrees);
  return lvl.baseSalary + (clampedDegree - 1) * lvl.increment;
}

/* ═══════════════════════════════════════════════════════════════
   3. HEALTH SECTOR SCALE (سلم رواتب الصحيين)
   ═══════════════════════════════════════════════════════════════ */

export interface HealthPositionInfo {
  id: string;
  labelAr: string;
  levels: { level: number; baseSalary: number; increment: number; maxDegrees: number }[];
  transportAllowance: number;
}

export const HEALTH_SCALE: HealthPositionInfo[] = [
  {
    id: "consultant_physician",
    labelAr: "طبيب استشاري",
    transportAllowance: 900,
    levels: [
      { level: 1, baseSalary: 14950, increment: 690, maxDegrees: 4 },
      { level: 2, baseSalary: 17720, increment: 730, maxDegrees: 4 },
      { level: 3, baseSalary: 20640, increment: 770, maxDegrees: 4 },
      { level: 4, baseSalary: 23720, increment: 810, maxDegrees: 4 },
      { level: 5, baseSalary: 26960, increment: 870, maxDegrees: 4 },
      { level: 6, baseSalary: 30430, increment: 950, maxDegrees: 4 },
      { level: 7, baseSalary: 35710, increment: 1110, maxDegrees: 4 },
    ],
  },
  {
    id: "resident_physician",
    labelAr: "طبيب مقيم",
    transportAllowance: 900,
    levels: [
      { level: 1, baseSalary: 9200, increment: 495, maxDegrees: 4 },
      { level: 2, baseSalary: 11190, increment: 555, maxDegrees: 4 },
      { level: 3, baseSalary: 13380, increment: 615, maxDegrees: 4 },
      { level: 4, baseSalary: 15810, increment: 675, maxDegrees: 4 },
      { level: 5, baseSalary: 18500, increment: 745, maxDegrees: 4 },
      { level: 6, baseSalary: 21480, increment: 810, maxDegrees: 4 },
      { level: 7, baseSalary: 24780, increment: 865, maxDegrees: 4 },
    ],
  },
  {
    id: "pharmacist",
    labelAr: "صيدلي",
    transportAllowance: 900,
    levels: [
      { level: 1, baseSalary: 7420, increment: 440, maxDegrees: 4 },
      { level: 2, baseSalary: 9180, increment: 470, maxDegrees: 4 },
      { level: 3, baseSalary: 11075, increment: 505, maxDegrees: 4 },
      { level: 4, baseSalary: 13130, increment: 545, maxDegrees: 4 },
      { level: 5, baseSalary: 15310, increment: 605, maxDegrees: 4 },
    ],
  },
  {
    id: "specialist",
    labelAr: "أخصائي صحي",
    transportAllowance: 900,
    levels: [
      { level: 1, baseSalary: 7130, increment: 410, maxDegrees: 4 },
      { level: 2, baseSalary: 8870, increment: 435, maxDegrees: 4 },
      { level: 3, baseSalary: 10750, increment: 470, maxDegrees: 4 },
      { level: 4, baseSalary: 12770, increment: 510, maxDegrees: 4 },
      { level: 5, baseSalary: 14930, increment: 555, maxDegrees: 4 },
      { level: 6, baseSalary: 17250, increment: 615, maxDegrees: 4 },
      { level: 7, baseSalary: 19170, increment: 675, maxDegrees: 4 },
    ],
  },
  {
    id: "technician",
    labelAr: "فني صحي",
    transportAllowance: 900,
    levels: [
      { level: 1, baseSalary: 4670, increment: 360, maxDegrees: 4 },
      { level: 2, baseSalary: 6120, increment: 375, maxDegrees: 4 },
      { level: 3, baseSalary: 7690, increment: 400, maxDegrees: 4 },
      { level: 4, baseSalary: 9380, increment: 430, maxDegrees: 4 },
      { level: 5, baseSalary: 11200, increment: 465, maxDegrees: 4 },
      { level: 6, baseSalary: 13180, increment: 510, maxDegrees: 4 },
      { level: 7, baseSalary: 15290, increment: 560, maxDegrees: 4 },
    ],
  },
];

export function getHealthSalary(positionId: string, level: number, degree: number): number {
  const pos = HEALTH_SCALE.find((p) => p.id === positionId);
  if (!pos) return 0;
  const lvl = pos.levels.find((l) => l.level === level);
  if (!lvl) return 0;
  const clampedDegree = Math.min(Math.max(degree, 1), lvl.maxDegrees);
  return lvl.baseSalary + (clampedDegree - 1) * lvl.increment;
}

/* ═══════════════════════════════════════════════════════════════
   4. MILITARY SALARY SCALE (سلم رواتب العسكريين)
   ═══════════════════════════════════════════════════════════════ */

export interface MilitaryRankInfo {
  id: string;
  labelAr: string;
  baseSalary: number;
  increment: number;
  maxDegrees: number;
  transportAllowance: number;
}

export const MILITARY_OFFICERS: MilitaryRankInfo[] = [
  { id: "mulazim",       labelAr: "ملازم",       baseSalary: 7590,  increment: 380, maxDegrees: 15, transportAllowance: 200 },
  { id: "mulazim_awal",  labelAr: "ملازم أول",   baseSalary: 8835,  increment: 440, maxDegrees: 15, transportAllowance: 200 },
  { id: "naqib",         labelAr: "نقيب",        baseSalary: 10600, increment: 490, maxDegrees: 12, transportAllowance: 300 },
  { id: "raed",          labelAr: "رائد",         baseSalary: 13515, increment: 265, maxDegrees: 15, transportAllowance: 300 },
  { id: "muqaddam",      labelAr: "مقدم",         baseSalary: 14645, increment: 470, maxDegrees: 14, transportAllowance: 300 },
  { id: "aqid",          labelAr: "عقيد",         baseSalary: 16520, increment: 590, maxDegrees: 13, transportAllowance: 500 },
  { id: "amid",          labelAr: "عميد",         baseSalary: 18805, increment: 650, maxDegrees: 12, transportAllowance: 500 },
  { id: "liwa",          labelAr: "لواء",         baseSalary: 21390, increment: 730, maxDegrees: 11, transportAllowance: 500 },
];

export const MILITARY_ENLISTED: MilitaryRankInfo[] = [
  { id: "jundi",          labelAr: "جندي",         baseSalary: 3220, increment: 125, maxDegrees: 15, transportAllowance: 500 },
  { id: "jundi_awal",     labelAr: "جندي أول",     baseSalary: 3395, increment: 140, maxDegrees: 15, transportAllowance: 500 },
  { id: "areef",          labelAr: "عريف",          baseSalary: 3765, increment: 155, maxDegrees: 15, transportAllowance: 500 },
  { id: "wakil_raqib",    labelAr: "وكيل رقيب",    baseSalary: 4455, increment: 180, maxDegrees: 15, transportAllowance: 500 },
  { id: "raqib",          labelAr: "رقيب",          baseSalary: 5260, increment: 210, maxDegrees: 15, transportAllowance: 500 },
  { id: "raqib_awal",     labelAr: "رقيب أول",      baseSalary: 6180, increment: 240, maxDegrees: 15, transportAllowance: 500 },
  { id: "raes_ruqaba",    labelAr: "رئيس رقباء",    baseSalary: 7215, increment: 280, maxDegrees: 15, transportAllowance: 500 },
];

export function getMilitarySalary(ranks: MilitaryRankInfo[], rankId: string, degree: number): number {
  const rank = ranks.find((r) => r.id === rankId);
  if (!rank) return 0;
  const clampedDegree = Math.min(Math.max(degree, 1), rank.maxDegrees);
  return rank.baseSalary + (clampedDegree - 1) * rank.increment;
}

/* ═══════════════════════════════════════════════════════════════
   5. SECTOR COMPARISON HELPERS
   ═══════════════════════════════════════════════════════════════ */

export interface SectorSummary {
  id: string;
  labelAr: string;
  icon: string;
  minSalary: number;
  maxSalary: number;
  avgEntry: number;      // Average entry-level salary
  avgMid: number;        // Average mid-career
  avgSenior: number;     // Average senior
  transportRange: string;
}

export const SECTOR_SUMMARIES: SectorSummary[] = [
  {
    id: "general",
    labelAr: "الخدمة المدنية (العام)",
    icon: "🏛️",
    minSalary: 3000,
    maxSalary: 28640,
    avgEntry: 3945,
    avgMid: 10275,
    avgSenior: 20855,
    transportRange: "500-1,200",
  },
  {
    id: "education",
    labelAr: "التعليم (المعلمين)",
    icon: "📚",
    minSalary: 5200,
    maxSalary: 22570,
    avgEntry: 5200,
    avgMid: 13690,
    avgSenior: 19970,
    transportRange: "700",
  },
  {
    id: "health",
    labelAr: "القطاع الصحي",
    icon: "🏥",
    minSalary: 4670,
    maxSalary: 39040,
    avgEntry: 9200,
    avgMid: 17720,
    avgSenior: 35710,
    transportRange: "900",
  },
  {
    id: "military_officers",
    labelAr: "العسكري (ضباط)",
    icon: "⭐",
    minSalary: 7590,
    maxSalary: 28690,
    avgEntry: 7590,
    avgMid: 14645,
    avgSenior: 21390,
    transportRange: "200-500",
  },
  {
    id: "military_enlisted",
    labelAr: "العسكري (أفراد)",
    icon: "🎖️",
    minSalary: 3220,
    maxSalary: 12255,
    avgEntry: 3220,
    avgMid: 5260,
    avgSenior: 7215,
    transportRange: "500",
  },
];

/** Format number with Arabic locale */
export const fmtSalary = (n: number) => n.toLocaleString("ar-SA");
