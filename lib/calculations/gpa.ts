/**
 * Comprehensive GPA Calculator
 * Supports 5.0 (Saudi) and 4.0 (International) scales
 * Semester + Cumulative GPA calculation
 */

export type GPAScale = "5.0" | "4.0";

export interface GradeOption {
  letter: string;
  labelAr: string;
  labelEn: string;
  points5: number;
  points4: number;
  color: string;
  minPercent: number;
  maxPercent: number;
}

export const GRADE_OPTIONS: GradeOption[] = [
  { letter: "A+", labelAr: "ممتاز مرتفع", labelEn: "Exceptional", points5: 5.0, points4: 4.0, color: "#059669", minPercent: 95, maxPercent: 100 },
  { letter: "A",  labelAr: "ممتاز",       labelEn: "Excellent",   points5: 4.75, points4: 3.75, color: "#10b981", minPercent: 90, maxPercent: 94 },
  { letter: "B+", labelAr: "جيد جداً مرتفع", labelEn: "Superior", points5: 4.5, points4: 3.5, color: "#34d399", minPercent: 85, maxPercent: 89 },
  { letter: "B",  labelAr: "جيد جداً",     labelEn: "Very Good",  points5: 4.0, points4: 3.0, color: "#3b82f6", minPercent: 80, maxPercent: 84 },
  { letter: "C+", labelAr: "جيد مرتفع",    labelEn: "Above Avg",  points5: 3.5, points4: 2.5, color: "#6366f1", minPercent: 75, maxPercent: 79 },
  { letter: "C",  labelAr: "جيد",          labelEn: "Good",       points5: 3.0, points4: 2.0, color: "#f59e0b", minPercent: 70, maxPercent: 74 },
  { letter: "D+", labelAr: "مقبول مرتفع",  labelEn: "High Pass",  points5: 2.5, points4: 1.5, color: "#f97316", minPercent: 65, maxPercent: 69 },
  { letter: "D",  labelAr: "مقبول",        labelEn: "Pass",       points5: 2.0, points4: 1.0, color: "#ef4444", minPercent: 60, maxPercent: 64 },
  { letter: "F",  labelAr: "راسب",         labelEn: "Fail",       points5: 1.0, points4: 0.0, color: "#991b1b", minPercent: 0,  maxPercent: 59 },
];

export interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
}

export interface Semester {
  id: string;
  name: string;
  courses: Course[];
}

export interface GPAResult {
  semesterGPA: number;
  semesterCredits: number;
  semesterPoints: number;
  cumulativeGPA: number;
  cumulativeCredits: number;
  cumulativePoints: number;
  classification: { ar: string; en: string; color: string; emoji: string };
  gradeDistribution: { letter: string; count: number; color: string }[];
}

export interface CumulativeInput {
  previousGPA: number;
  previousCredits: number;
}

export function getPoints(letter: string, scale: GPAScale): number {
  const grade = GRADE_OPTIONS.find((g) => g.letter === letter);
  if (!grade) return 0;
  return scale === "5.0" ? grade.points5 : grade.points4;
}

export function getMaxGPA(scale: GPAScale): number {
  return scale === "5.0" ? 5.0 : 4.0;
}

export function getClassification(gpa: number, scale: GPAScale): { ar: string; en: string; color: string; emoji: string } {
  if (scale === "5.0") {
    if (gpa >= 4.50) return { ar: "ممتاز", en: "Excellent", color: "text-emerald-600 dark:text-emerald-400", emoji: "🌟" };
    if (gpa >= 3.75) return { ar: "جيد جداً", en: "Very Good", color: "text-blue-600 dark:text-blue-400", emoji: "✨" };
    if (gpa >= 2.75) return { ar: "جيد", en: "Good", color: "text-amber-600 dark:text-amber-400", emoji: "👍" };
    if (gpa >= 2.00) return { ar: "مقبول", en: "Acceptable", color: "text-orange-600 dark:text-orange-400", emoji: "📋" };
    return { ar: "ضعيف", en: "Poor", color: "text-red-600 dark:text-red-400", emoji: "⚠️" };
  } else {
    if (gpa >= 3.70) return { ar: "ممتاز", en: "Excellent", color: "text-emerald-600 dark:text-emerald-400", emoji: "🌟" };
    if (gpa >= 3.00) return { ar: "جيد جداً", en: "Very Good", color: "text-blue-600 dark:text-blue-400", emoji: "✨" };
    if (gpa >= 2.00) return { ar: "جيد", en: "Good", color: "text-amber-600 dark:text-amber-400", emoji: "👍" };
    if (gpa >= 1.00) return { ar: "مقبول", en: "Acceptable", color: "text-orange-600 dark:text-orange-400", emoji: "📋" };
    return { ar: "ضعيف", en: "Poor", color: "text-red-600 dark:text-red-400", emoji: "⚠️" };
  }
}

export function calculateGPA(
  courses: Course[],
  scale: GPAScale,
  cumulative?: CumulativeInput
): GPAResult {
  let semesterPoints = 0;
  let semesterCredits = 0;
  const gradeCounts: Record<string, number> = {};

  courses.forEach((course) => {
    if (course.credits > 0 && course.grade) {
      const pts = getPoints(course.grade, scale);
      semesterPoints += pts * course.credits;
      semesterCredits += course.credits;
      gradeCounts[course.grade] = (gradeCounts[course.grade] || 0) + 1;
    }
  });

  const semesterGPA = semesterCredits > 0 ? semesterPoints / semesterCredits : 0;

  let cumulativePoints = semesterPoints;
  let cumulativeCredits = semesterCredits;

  if (cumulative && cumulative.previousCredits > 0) {
    cumulativePoints += cumulative.previousGPA * cumulative.previousCredits;
    cumulativeCredits += cumulative.previousCredits;
  }

  const cumulativeGPA = cumulativeCredits > 0 ? cumulativePoints / cumulativeCredits : 0;

  const classification = getClassification(
    cumulative && cumulative.previousCredits > 0 ? cumulativeGPA : semesterGPA,
    scale
  );

  const gradeDistribution = GRADE_OPTIONS
    .filter((g) => (gradeCounts[g.letter] || 0) > 0)
    .map((g) => ({ letter: g.letter, count: gradeCounts[g.letter] || 0, color: g.color }));

  return {
    semesterGPA,
    semesterCredits,
    semesterPoints,
    cumulativeGPA,
    cumulativeCredits,
    cumulativePoints,
    classification,
    gradeDistribution,
  };
}

export const fmt = (n: number) => n.toLocaleString("ar-SA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const CREDIT_OPTIONS = [1, 2, 3, 4, 5, 6];

let _courseId = 0;
export function newCourseId(): string {
  return `c_${Date.now()}_${_courseId++}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createEmptyCourse(_index?: number): Course {
  return { id: newCourseId(), name: "", grade: "A+", credits: 3 };
}

// Saudi university GPA thresholds
export const SAUDI_THRESHOLDS_5 = [
  { min: 4.50, max: 5.00, labelAr: "ممتاز", labelEn: "Excellent", color: "bg-emerald-500", honors: "مرتبة الشرف الأولى (إن توفرت الشروط)" },
  { min: 3.75, max: 4.49, labelAr: "جيد جداً", labelEn: "Very Good", color: "bg-blue-500", honors: "مرتبة الشرف الثانية (إن توفرت الشروط)" },
  { min: 2.75, max: 3.74, labelAr: "جيد", labelEn: "Good", color: "bg-amber-500", honors: "—" },
  { min: 2.00, max: 2.74, labelAr: "مقبول", labelEn: "Acceptable", color: "bg-orange-500", honors: "—" },
  { min: 0.00, max: 1.99, labelAr: "ضعيف", labelEn: "Poor", color: "bg-red-500", honors: "إنذار أكاديمي" },
];

export const SAUDI_THRESHOLDS_4 = [
  { min: 3.70, max: 4.00, labelAr: "ممتاز", labelEn: "Excellent", color: "bg-emerald-500", honors: "Dean's List" },
  { min: 3.00, max: 3.69, labelAr: "جيد جداً", labelEn: "Very Good", color: "bg-blue-500", honors: "—" },
  { min: 2.00, max: 2.99, labelAr: "جيد", labelEn: "Good", color: "bg-amber-500", honors: "—" },
  { min: 1.00, max: 1.99, labelAr: "مقبول", labelEn: "Acceptable", color: "bg-orange-500", honors: "—" },
  { min: 0.00, max: 0.99, labelAr: "ضعيف", labelEn: "Poor", color: "bg-red-500", honors: "Academic Probation" },
];

// Saudi universities info
export const SAUDI_UNIVERSITIES = [
  { name: "جامعة الملك سعود", scale: "5.0", city: "الرياض" },
  { name: "جامعة الملك عبدالعزيز", scale: "5.0", city: "جدة" },
  { name: "جامعة الملك فهد للبترول", scale: "4.0", city: "الظهران" },
  { name: "جامعة الملك فيصل", scale: "5.0", city: "الأحساء" },
  { name: "جامعة أم القرى", scale: "5.0", city: "مكة المكرمة" },
  { name: "الجامعة الإسلامية", scale: "5.0", city: "المدينة المنورة" },
  { name: "جامعة الإمام محمد", scale: "5.0", city: "الرياض" },
  { name: "جامعة الأميرة نورة", scale: "5.0", city: "الرياض" },
  { name: "جامعة الملك خالد", scale: "5.0", city: "أبها" },
  { name: "جامعة القصيم", scale: "5.0", city: "القصيم" },
  { name: "جامعة تبوك", scale: "5.0", city: "تبوك" },
  { name: "جامعة الأمير سلطان", scale: "4.0", city: "الرياض" },
];
