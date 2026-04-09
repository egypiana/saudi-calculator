export interface BlogArticle {
  slug: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: BlogCategory;
  readTime: number;
  publishDate: string;
  updatedDate?: string;
  keywords: string[];
  icon: string;
  relatedSlugs: string[];
  relatedCalculator?: { href: string; labelAr: string };
  content: string; // HTML content in Arabic
}

export type BlogCategory = "مالي" | "شرعي" | "أدوات" | "صحي" | "ديني" | "إسلامي" | "إرشادي";

export interface BlogCategoryInfo {
  id: BlogCategory;
  slug: string;
  labelAr: string;
  labelEn: string;
  icon: string;
  color: string;
  bgColor: string;
  descriptionAr: string;
}

export const BLOG_CATEGORIES: BlogCategoryInfo[] = [
  {
    id: "مالي",
    slug: "financial",
    labelAr: "مالي واقتصادي",
    labelEn: "Financial",
    icon: "💰",
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    descriptionAr: "مقالات عن التمويل والاستثمار والرواتب والميزانية في السعودية",
  },
  {
    id: "شرعي",
    slug: "islamic",
    labelAr: "شرعي وإسلامي",
    labelEn: "Islamic",
    icon: "🕌",
    color: "text-emerald-700 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    descriptionAr: "مقالات عن أحكام المواريث والزكاة والعبادات وفق الشريعة الإسلامية",
  },
  {
    id: "أدوات",
    slug: "tools",
    labelAr: "أدوات وحاسبات",
    labelEn: "Tools",
    icon: "🔧",
    color: "text-purple-700 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    descriptionAr: "أدلة استخدام الحاسبات والأدوات الرقمية لتسهيل حياتك اليومية",
  },
  {
    id: "صحي",
    slug: "health",
    labelAr: "صحي وغذائي",
    labelEn: "Health",
    icon: "🏥",
    color: "text-rose-700 dark:text-rose-400",
    bgColor: "bg-rose-100 dark:bg-rose-900/30",
    descriptionAr: "مقالات عن الصحة والتغذية وحساب المؤشرات الصحية",
  },
  {
    id: "ديني",
    slug: "religious",
    labelAr: "ديني وروحاني",
    labelEn: "Religious",
    icon: "📿",
    color: "text-amber-700 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    descriptionAr: "مقالات عن العبادات والمناسبات الدينية ورمضان والحج",
  },
  {
    id: "إسلامي",
    slug: "islami",
    labelAr: "إسلامي وفقهي",
    labelEn: "Islamic Jurisprudence",
    icon: "🕋",
    color: "text-teal-700 dark:text-teal-400",
    bgColor: "bg-teal-100 dark:bg-teal-900/30",
    descriptionAr: "مقالات عن الأحكام الفقهية والعبادات والمناسك وفق الكتاب والسنة",
  },
  {
    id: "إرشادي",
    slug: "guide",
    labelAr: "إرشادي وتوجيهي",
    labelEn: "Guides & Tips",
    icon: "🧭",
    color: "text-indigo-700 dark:text-indigo-400",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    descriptionAr: "أدلة إرشادية ونصائح عملية لمساعدتك في التخطيط والاستعداد للمناسبات والأحداث المهمة",
  },
];

export function getCategoryInfo(cat: BlogCategory): BlogCategoryInfo {
  return BLOG_CATEGORIES.find((c) => c.id === cat) || BLOG_CATEGORIES[0];
}

export function getCategoryBySlug(slug: string): BlogCategoryInfo | undefined {
  return BLOG_CATEGORIES.find((c) => c.slug === slug);
}
