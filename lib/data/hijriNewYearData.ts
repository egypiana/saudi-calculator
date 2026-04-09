// Hijri New Year (رأس السنة الهجرية) data from 2025 to 2050
// 1st Muharram - Beginning of the Islamic year
// Dates are approximate based on astronomical calculations (Umm Al-Qura)

export interface HijriNewYearData {
  year: number;
  hijriYear: number;
  hijri: string;
  newYearDate: string; // 1 Muharram
  ashuraDate: string; // 10 Muharram
  dayOfWeek: string;
  season: string;
  status: "past" | "current" | "upcoming" | "future";
  content: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    heroSubtitle: string;
    mainContent: string;
    worshipTip: string;
    uniqueFact: string;
    faqExtra: { q: string; a: string }[];
  };
}

const DAYS_AR: Record<number, string> = {
  0: "الأحد", 1: "الاثنين", 2: "الثلاثاء", 3: "الأربعاء",
  4: "الخميس", 5: "الجمعة", 6: "السبت",
};

function getDayOfWeek(dateStr: string): string {
  return DAYS_AR[new Date(dateStr + "T00:00:00").getDay()];
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function getSeason(dateStr: string): string {
  const month = parseInt(dateStr.split("-")[1]);
  if (month >= 3 && month <= 5) return "ربيع";
  if (month >= 6 && month <= 8) return "صيف";
  if (month >= 9 && month <= 11) return "خريف";
  return "شتاء";
}

function getStatus(newYearDate: string): HijriNewYearData["status"] {
  const now = new Date();
  const nyDate = new Date(newYearDate);
  const endOfMonth = new Date(nyDate);
  endOfMonth.setDate(endOfMonth.getDate() + 30);
  if (now > endOfMonth) return "past";
  if (now >= nyDate && now <= endOfMonth) return "current";
  const diff = nyDate.getTime() - now.getTime();
  if (diff < 365 * 24 * 60 * 60 * 1000) return "upcoming";
  return "future";
}

export function formatDateAr(dateStr: string): string {
  const months: Record<string, string> = {
    "01": "يناير", "02": "فبراير", "03": "مارس", "04": "أبريل",
    "05": "مايو", "06": "يونيو", "07": "يوليو", "08": "أغسطس",
    "09": "سبتمبر", "10": "أكتوبر", "11": "نوفمبر", "12": "ديسمبر",
  };
  const [y, m, d] = dateStr.split("-");
  return `${parseInt(d)} ${months[m]} ${y}`;
}

export const formatArabicDate = formatDateAr;

// Raw data: [gregorianYear, hijriYear, 1stMuharramDate]
// Derived from Eid Al-Adha (10 Dhul Hijjah) + ~20 days
const RAW_DATA: [number, number, string][] = [
  [2025, 1447, "2025-06-26"],
  [2026, 1448, "2026-06-16"],
  [2027, 1449, "2027-06-05"],
  [2028, 1450, "2028-05-25"],
  [2029, 1451, "2029-05-14"],
  [2030, 1452, "2030-05-03"],
  [2031, 1453, "2031-04-23"],
  [2032, 1454, "2032-04-11"],
  [2033, 1455, "2033-03-31"],
  [2034, 1456, "2034-03-21"],
  [2035, 1457, "2035-03-10"],
  [2036, 1458, "2036-02-27"],
  [2037, 1459, "2037-02-16"],
  [2038, 1460, "2038-02-05"],
  [2039, 1461, "2039-01-26"],
  [2040, 1462, "2040-01-15"],
  [2041, 1463, "2041-01-04"],
  [2041, 1464, "2041-12-24"],
  [2042, 1465, "2042-12-14"],
  [2043, 1466, "2043-12-03"],
  [2044, 1467, "2044-11-22"],
  [2045, 1468, "2045-11-11"],
  [2046, 1469, "2046-11-01"],
  [2047, 1470, "2047-10-21"],
  [2048, 1471, "2048-10-09"],
  [2049, 1472, "2049-09-29"],
  [2050, 1473, "2050-09-18"],
];

interface YearContent {
  heroSubtitle: string;
  mainContent: string;
  worshipTip: string;
  uniqueFact: string;
  faqExtra: { q: string; a: string }[];
}

function getYearContent(year: number, hijriYear: number, season: string, newYearDate: string, ashuraDate: string): YearContent {
  const contents: Record<number, Partial<YearContent>> = {
    2025: {
      heroSubtitle: `١ محرم ${hijriYear} هـ — صيف`,
      mainContent: `رأس السنة الهجرية ${hijriYear} يصادف يوم ${getDayOfWeek(newYearDate)} ${formatDateAr(newYearDate)}. يثأتي مع بداية الصيف ويُعلن دخول العام الهجري الجديد ${hijriYear}.\n\nالتقويم الهجري يبدأ بشهر محرم، وهو من الأشهر الحُرم التي عظّمها الله تعالى. قال النبي ﷺ: "أفضل الصيام بعد رمضان شهر الله المحرم". فهو فرصة عظيمة لبداية جديدة مع الله.\n\nيوم عاشوراء (10 محرم) يوافق ${formatDateAr(ashuraDate)}، وصيامه يكفّر السنة التي قبله. يُستحب صيام التاسع والعاشر من محرم.`,
      worshipTip: "ابدأ العام الهجري الجديد بالتوبة والاستغفار وعقد النية على الخير. صم يومي تاسوعاء وعاشوراء (9 و10 محرم).",
      uniqueFact: `العام الهجري ${hijriYear} يبدأ في يونيو 2025، وهو عام مميز يشهد رؤية المملكة 2030 على الأبواب.`,
      faqExtra: [
        { q: `متى رأس السنة الهجرية ${hijriYear}؟`, a: `يوم ${getDayOfWeek(newYearDate)} ${formatDateAr(newYearDate)}، الموافق 1 محرم ${hijriYear} هـ.` },
        { q: "ما فضل صيام عاشوراء؟", a: "قال النبي ﷺ عن صيام عاشوراء: أحتسب على الله أن يكفّر السنة التي قبله. رواه مسلم." },
      ],
    },
    2026: {
      heroSubtitle: `١ محرم ${hijriYear} هـ — صيف`,
      mainContent: `رأس السنة الهجرية ${hijriYear} يصادف يوم ${getDayOfWeek(newYearDate)} ${formatDateAr(newYearDate)}. بداية عام هجري جديد في فصل الصيف.\n\nشهر محرم هو أول شهور السنة الهجرية وأحد الأشهر الأربعة الحُرم. يُستحب فيه الإكثار من الصيام والعبادة. وأفضل صيام بعد رمضان هو صيام شهر محرم.\n\nعاشوراء ${hijriYear} يوافق ${formatDateAr(ashuraDate)}. في هذا اليوم نجّى الله موسى عليه السلام وقومه من فرعون، فصامه النبي ﷺ شكراً لله.`,
      worshipTip: "اجعل بداية العام الهجري فرصة لمراجعة أهدافك الدينية والدنيوية وتجديد العزم على الطاعة.",
      uniqueFact: `يوم عاشوراء ${hijriYear} يوافق ${getDayOfWeek(ashuraDate)}، يُستحب صيامه مع يوم قبله أو بعده مخالفةً لأهل الكتاب.`,
      faqExtra: [
        { q: "لماذا يبدأ التقويم الهجري بمحرم؟", a: "اختاره عمر بن الخطاب رضي الله عنه عند وضع التقويم الهجري لأن محرم شهر حرام وبداية انصراف الناس من الحج." },
        { q: "هل يجوز الاحتفال برأس السنة الهجرية؟", a: "التذكير بالهجرة والدعاء وبداية صفحة جديدة مع الله أمر محمود. لكن لا يُشرع فيه شيء خاص من العبادات." },
      ],
    },
    2027: {
      heroSubtitle: `١ محرم ${hijriYear} هـ — صيف`,
      mainContent: `رأس السنة الهجرية ${hijriYear} يصادف يوم ${getDayOfWeek(newYearDate)} ${formatDateAr(newYearDate)}. العام الهجري الجديد يبدأ في بداية الصيف.\n\nالهجرة النبوية كانت حدثاً فاصلاً في تاريخ الإسلام، حيث هاجر النبي ﷺ من مكة إلى المدينة فأسس دولة الإسلام. لذلك اتخذها المسلمون بداية لتقويمهم.\n\nيُستحب في محرم الإكثار من الصيام، وخاصة يوم عاشوراء ${formatDateAr(ashuraDate)} مع يوم قبله أو بعده.`,
      worshipTip: "اقرأ السيرة النبوية في بداية كل عام هجري لتتذكر عظمة الهجرة وتجدد إيمانك.",
      uniqueFact: `العام ${hijriYear} هـ هو عام مميز يقترب من منتصف القرن الخامس عشر الهجري.`,
      faqExtra: [
        { q: "ما هي الأشهر الحُرم؟", a: "أربعة أشهر: ذو القعدة، ذو الحجة، محرم، ورجب. يحرم فيها القتال ويعظم فيها الإثم. قال تعالى: فلا تظلموا فيهن أنفسكم." },
        { q: "ما هو التقويم الهجري؟", a: "تقويم قمري وضعه عمر بن الخطاب رضي الله عنه يبدأ من هجرة النبي ﷺ عام 622 م. السنة الهجرية 354 يوماً تقريباً." },
      ],
    },
    2028: {
      heroSubtitle: `١ محرم ${hijriYear} هـ — ربيع`,
      mainContent: `رأس السنة الهجرية ${hijriYear} يصادف يوم ${getDayOfWeek(newYearDate)} ${formatDateAr(newYearDate)}. نصف القرن الهجري الخامس عشر يبدأ بأجواء ربيعية.\n\nالعام الهجري ${hijriYear} يمثل محطة تاريخية مهمة — نصف قرن من العصر الهجري الحالي. فرصة للمسلمين لتأمل إنجازاتهم وتجديد عزمهم.\n\nشهر محرم فرصة ذهبية للصيام التطوعي. قال النبي ﷺ: "أفضل الصيام بعد رمضان شهر الله المحرم". عاشوراء يوافق ${formatDateAr(ashuraDate)}.`,
      worshipTip: "اجعل لنفسك خطة صيام في محرم: صم الاثنين والخميس مع تاسوعاء وعاشوراء.",
      uniqueFact: `العام ${hijriYear} يمثل نصف القرن الهجري الخامس عشر — مرحلة تاريخية مميزة.`,
      faqExtra: [
        { q: "كم عدد أيام السنة الهجرية؟", a: "السنة الهجرية حوالي 354 يوماً (12 شهراً قمرياً)، أقل من السنة الميلادية بـ 11 يوماً تقريباً." },
        { q: "لماذا سُمي المحرم بهذا الاسم؟", a: "لأنه من الأشهر التي حرّم الله فيها القتال. وكان العرب يعظّمونه قبل الإسلام." },
      ],
    },
    2029: {
      heroSubtitle: `١ محرم ${hijriYear} هـ — ربيع`,
      mainContent: `رأس السنة الهجرية ${hijriYear} يصادف يوم ${getDayOfWeek(newYearDate)} ${formatDateAr(newYearDate)}. بداية ربيعية لعام هجري جديد.\n\nمع كل رأس سنة هجرية، يتذكر المسلمون هجرة النبي ﷺ العظيمة التي غيرت مجرى التاريخ. من مكة المكرمة إلى المدينة المنورة، رحلة الإيمان والتوكل على الله.\n\nعاشوراء ${hijriYear} يوافق ${formatDateAr(ashuraDate)}. تذكر أن تصوم التاسع معه لمخالفة أهل الكتاب كما أوصى النبي ﷺ.`,
      worshipTip: "في بداية كل عام هجري، تصدق بصدقة عن نفسك وأهلك واسأل الله أن يجعله عام خير وبركة.",
      uniqueFact: "الهجرة النبوية كانت في شهر ربيع الأول وليس محرم، لكن عمر رضي الله عنه جعل محرم بداية العام لأنه بداية انصراف الناس من الحج.",
      faqExtra: [
        { q: "هل الهجرة النبوية كانت في محرم؟", a: "لا، كانت في ربيع الأول. لكن عمر بن الخطاب اختار محرم بداية للتقويم لأنه أول شهر بعد موسم الحج." },
        { q: "ما حكم صيام شهر محرم كاملاً؟", a: "مستحب وليس واجباً. وصيامه أفضل الصيام بعد رمضان. يمكن صيام بعض أيامه إن لم تستطع كله." },
      ],
    },
    2030: {
      heroSubtitle: `١ محرم ${hijriYear} هـ — ربيع`,
      mainContent: `رأس السنة الهجرية ${hijriYear} يصادف يوم ${getDayOfWeek(newYearDate)} ${formatDateAr(newYearDate)}. عام رؤية المملكة 2030 يحمل معه عاماً هجرياً جديداً.\n\nفي هذا العام المميز الذي تتحقق فيه رؤية المملكة 2030، يبدأ العام الهجري ${hijriYear} بأجواء ربيعية معتدلة. فرصة لتجديد العهد مع الله والبدء بصفحة جديدة.\n\nعاشوراء يوافق ${formatDateAr(ashuraDate)}، يوم عظيم نجّى الله فيه موسى عليه السلام.`,
      worshipTip: "اكتب أهدافك الدينية للعام الهجري الجديد: حفظ أجزاء من القرآن، المحافظة على الأذكار، الصيام التطوعي.",
      uniqueFact: `العام الهجري ${hijriYear} يتزامن مع تحقيق رؤية المملكة 2030 — عام التحول والإنجاز.`,
      faqExtra: [
        { q: "ما علاقة التقويم الهجري بالقمر؟", a: "التقويم الهجري قمري يعتمد على دورة القمر. كل شهر يبدأ برؤية الهلال ويستمر 29 أو 30 يوماً." },
        { q: "كيف يختلف التقويم الهجري عن الميلادي؟", a: "الهجري أقصر بـ 11 يوماً تقريباً، لذلك تتقدم المناسبات الإسلامية كل عام. هذا يجعل رمضان والحج يدوران في كل الفصول." },
      ],
    },
  };

  const specific = contents[year];
  if (specific?.mainContent) return specific as YearContent;

  return {
    heroSubtitle: `١ محرم ${hijriYear} هـ — ${season}`,
    mainContent: `رأس السنة الهجرية ${hijriYear} يصادف يوم ${getDayOfWeek(newYearDate)} ${formatDateAr(newYearDate)}. يأتي في فصل ${season} ليُعلن بداية عام هجري جديد.\n\nالتقويم الهجري يبدأ بشهر محرم، أحد الأشهر الحُرم الأربعة. قال النبي ﷺ: "أفضل الصيام بعد رمضان شهر الله المحرم". فهو فرصة عظيمة للصيام والعبادة.\n\nيوم عاشوراء (10 محرم) يوافق ${formatDateAr(ashuraDate)}. صيامه يكفّر ذنوب السنة الماضية. يُستحب صيام التاسع معه.`,
    worshipTip: "ابدأ العام الهجري الجديد بالتوبة والاستغفار، واحرص على صيام تاسوعاء وعاشوراء.",
    uniqueFact: `العام الهجري ${hijriYear} يأتي في فصل ${season}، ومع كل عام يتقدم التقويم الهجري 10-11 يوماً عن الميلادي.`,
    faqExtra: [
      { q: `متى رأس السنة الهجرية ${hijriYear}؟`, a: `يوم ${getDayOfWeek(newYearDate)} ${formatDateAr(newYearDate)}، الموافق 1 محرم ${hijriYear} هـ.` },
      { q: `متى عاشوراء ${hijriYear}؟`, a: `يوم عاشوراء يوافق ${formatDateAr(ashuraDate)} (10 محرم ${hijriYear} هـ). يُستحب صيامه مع يوم قبله.` },
    ],
  };
}

function buildData(): Record<number, HijriNewYearData> {
  const result: Record<number, HijriNewYearData> = {};

  for (const [year, hijriYear, newYearDate] of RAW_DATA) {
    const ashuraDate = addDays(newYearDate, 9); // 10th Muharram
    const season = getSeason(newYearDate);
    const content = getYearContent(year, hijriYear, season, newYearDate, ashuraDate);
    // Handle duplicate year 2041 (has two hijri years: 1463 and 1464)
    const effectiveYear = year === 2041 && hijriYear === 1464 ? 2042 : year;

    result[effectiveYear] = {
      year: year === 2041 && hijriYear === 1464 ? 2042 : year,
      hijriYear,
      hijri: `${hijriYear} هـ`,
      newYearDate,
      ashuraDate,
      dayOfWeek: getDayOfWeek(newYearDate),
      season,
      status: getStatus(newYearDate),
      content: {
        metaTitle: `رأس السنة الهجرية ${hijriYear} | ١ محرم ${hijriYear} هـ | العد التنازلي`,
        metaDescription: `كم باقي على رأس السنة الهجرية ${hijriYear}؟ ١ محرم ${hijriYear} يوافق ${formatDateAr(newYearDate)}. عداد تنازلي دقيق مع فضائل شهر محرم وصيام عاشوراء.`,
        keywords: [`رأس السنة الهجرية ${hijriYear}`, `1 محرم ${hijriYear}`, `عاشوراء ${hijriYear}`, `السنة الهجرية الجديدة ${year}`],
        ...content,
      },
    };
  }

  return result;
}

export const HIJRI_NEW_YEAR_DATA = buildData();
export const HIJRI_NEW_YEAR_YEARS = Object.keys(HIJRI_NEW_YEAR_DATA).map(Number).sort((a, b) => a - b);
export const HIJRI_NEW_YEAR_LIST = HIJRI_NEW_YEAR_YEARS.map((y) => HIJRI_NEW_YEAR_DATA[y]);

export function getNextHijriNewYear(): HijriNewYearData | null {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  for (const year of HIJRI_NEW_YEAR_YEARS) {
    if (HIJRI_NEW_YEAR_DATA[year].newYearDate >= todayStr) return HIJRI_NEW_YEAR_DATA[year];
  }
  return null;
}

export function getTimeUntilHijriNewYear(year: number): { days: number; hours: number; minutes: number; seconds: number } {
  const data = HIJRI_NEW_YEAR_DATA[year];
  if (!data) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const target = new Date(data.newYearDate + "T00:00:00").getTime();
  const now = new Date().getTime();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}
