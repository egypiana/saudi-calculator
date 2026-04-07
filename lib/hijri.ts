const HIJRI_MONTHS_AR = [
  "محرم", "صفر", "ربيع الأول", "ربيع الثاني",
  "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان",
  "رمضان", "شوال", "ذو القعدة", "ذو الحجة",
];

const HIJRI_MONTHS_EN = [
  "Muharram", "Safar", "Rabi Al-Awwal", "Rabi Al-Thani",
  "Jumada Al-Ula", "Jumada Al-Akhirah", "Rajab", "Sha'ban",
  "Ramadan", "Shawwal", "Dhul-Qi'dah", "Dhul-Hijjah",
];

export interface HijriDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
}

export function gregorianToHijri(date: Date): HijriDate {
  const gYear = date.getFullYear();
  const gMonth = date.getMonth() + 1;
  const gDay = date.getDate();

  const a = Math.floor((14 - gMonth) / 12);
  const y = gYear + 4800 - a;
  const m = gMonth + 12 * a - 3;
  const jdn =
    gDay +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;

  const l = jdn - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const ll = l - 10631 * n + 354;
  const j =
    Math.floor((10985 - ll) / 5316) * Math.floor((50 * ll) / 17719) +
    Math.floor(ll / 5670) * Math.floor((43 * ll) / 15238);
  const lll =
    ll -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;
  const hMonth = Math.floor((24 * lll) / 709);
  const hDay = lll - Math.floor((709 * hMonth) / 24);
  const hYear = 30 * n + j - 30;

  return {
    year: hYear,
    month: hMonth,
    day: hDay,
    monthName: HIJRI_MONTHS_AR[hMonth - 1] ?? "",
  };
}

export function getHijriMonthName(month: number, locale = "ar"): string {
  const months = locale === "ar" ? HIJRI_MONTHS_AR : HIJRI_MONTHS_EN;
  return months[month - 1] ?? "";
}

export function formatHijriDate(date: HijriDate, locale = "ar"): string {
  const monthName = getHijriMonthName(date.month, locale);
  return `${date.day} ${monthName} ${date.year} هـ`;
}
