// Arafat Day (يوم عرفة) data from 2025 to 2050
// 9th Dhul Hijjah - Day before Eid Al-Adha
// "خير يوم طلعت عليه الشمس يوم عرفة" — أفضل أيام السنة

export interface ArafaDayYearData {
  year: number;
  hijriYear: number;
  hijri: string;
  arafaDate: string;
  eidAdhaDate: string;
  hajjStartDate: string;
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

function getSeason(dateStr: string): string {
  const month = parseInt(dateStr.split("-")[1]);
  if (month >= 3 && month <= 5) return "ربيع";
  if (month >= 6 && month <= 8) return "صيف";
  if (month >= 9 && month <= 11) return "خريف";
  return "شتاء";
}

function getStatus(arafaDate: string): ArafaDayYearData["status"] {
  const now = new Date();
  const arafa = new Date(arafaDate);
  const nextDay = new Date(arafa);
  nextDay.setDate(nextDay.getDate() + 1);
  if (now > nextDay) return "past";
  if (now >= arafa && now <= nextDay) return "current";
  const diff = arafa.getTime() - now.getTime();
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

// Raw data: [year, hijriYear, eidAdhaDate, hajjStart, arafaDate]
const RAW_DATA: [number, number, string, string, string][] = [
  [2025, 1446, "2025-06-06", "2025-06-04", "2025-06-05"],
  [2026, 1447, "2026-05-27", "2026-05-25", "2026-05-26"],
  [2027, 1448, "2027-05-16", "2027-05-14", "2027-05-15"],
  [2028, 1449, "2028-05-04", "2028-05-02", "2028-05-03"],
  [2029, 1450, "2029-04-24", "2029-04-22", "2029-04-23"],
  [2030, 1451, "2030-04-13", "2030-04-11", "2030-04-12"],
  [2031, 1452, "2031-04-02", "2031-03-31", "2031-04-01"],
  [2032, 1453, "2032-03-22", "2032-03-20", "2032-03-21"],
  [2033, 1454, "2033-03-11", "2033-03-09", "2033-03-10"],
  [2034, 1455, "2034-03-01", "2034-02-27", "2034-02-28"],
  [2035, 1456, "2035-02-18", "2035-02-16", "2035-02-17"],
  [2036, 1457, "2036-02-07", "2036-02-05", "2036-02-06"],
  [2037, 1458, "2037-01-27", "2037-01-25", "2037-01-26"],
  [2038, 1459, "2038-01-16", "2038-01-14", "2038-01-15"],
  [2039, 1460, "2039-01-06", "2039-01-04", "2039-01-05"],
  [2040, 1461, "2040-12-25", "2040-12-23", "2040-12-24"],
  [2041, 1462, "2041-12-15", "2041-12-13", "2041-12-14"],
  [2042, 1463, "2042-12-04", "2042-12-02", "2042-12-03"],
  [2043, 1464, "2043-11-23", "2043-11-21", "2043-11-22"],
  [2044, 1465, "2044-11-12", "2044-11-10", "2044-11-11"],
  [2045, 1466, "2045-11-01", "2045-10-30", "2045-10-31"],
  [2046, 1467, "2046-10-22", "2046-10-20", "2046-10-21"],
  [2047, 1468, "2047-10-11", "2047-10-09", "2047-10-10"],
  [2048, 1469, "2048-09-30", "2048-09-28", "2048-09-29"],
  [2049, 1470, "2049-09-19", "2049-09-17", "2049-09-18"],
  [2050, 1471, "2050-09-08", "2050-09-06", "2050-09-07"],
];

interface YearContent {
  heroSubtitle: string;
  mainContent: string;
  worshipTip: string;
  uniqueFact: string;
  faqExtra: { q: string; a: string }[];
}

function getYearContent(year: number, hijriYear: number, season: string, arafaDate: string): YearContent {
  const contents: Record<number, YearContent> = {
    2025: {
      heroSubtitle: `يوم عرفة ${hijriYear} هـ — صيف مبارك`,
      mainContent: `يوم عرفة 2025 يصادف يوم الخميس ${formatDateAr(arafaDate)}، الموافق 9 ذو الحجة 1446 هـ. يأتي هذا اليوم العظيم في بداية فصل الصيف، حيث يقف الحجاج على صعيد عرفة في أعظم أركان الحج.\n\nصيام يوم عرفة لغير الحاج سنة مؤكدة، وقد قال النبي ﷺ: "صيام يوم عرفة أحتسب على الله أن يكفّر السنة التي قبله والسنة التي بعده". فرصة عظيمة لتكفير ذنوب سنتين بصيام يوم واحد!\n\nيُعد يوم عرفة أفضل أيام السنة على الإطلاق، ففيه يعتق الله عباداً من النار أكثر من أي يوم آخر. وقد وصفه النبي ﷺ بأنه "خير يوم طلعت عليه الشمس".`,
      worshipTip: "صم يوم عرفة واحتسب أجره عند الله — صيامه يكفّر ذنوب سنتين. واجعل الدعاء من بعد الظهر حتى المغرب فهو أرجى وقت للإجابة.",
      uniqueFact: "يوم عرفة 2025 يوافق يوم الخميس، وعيد الأضحى يوم الجمعة — تزامن مبارك بين يوم الجمعة وعيد النحر.",
      faqExtra: [
        { q: "ما حكم صيام يوم عرفة 2025؟", a: "صيام يوم عرفة سنة مؤكدة لغير الحاج. يكفّر صيامه ذنوب السنة الماضية والسنة القادمة كما في صحيح مسلم." },
        { q: "ما أفضل دعاء في يوم عرفة؟", a: "خير الدعاء دعاء يوم عرفة، وخير ما قلت أنا والنبيون من قبلي: لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير." },
      ],
    },
    2026: {
      heroSubtitle: `يوم عرفة ${hijriYear} هـ — ربيع`,
      mainContent: `يوم عرفة 2026 يصادف يوم الثلاثاء ${formatDateAr(arafaDate)}، الموافق 9 ذو الحجة 1447 هـ. يثأتي في أواخر الربيع بأجواء معتدلة جميلة.\n\nيقف ملايين الحجاج على صعيد عرفات الطاهر في هذا اليوم العظيم، بينما يصوم المسلمون حول العالم طلباً لمغفرة الله وتكفيراً لذنوب سنتين.\n\nالأجواء الربيعية المعتدلة تُسهّل على الصائمين إتمام صيامهم بيسر وراحة. استغل هذا اليوم بالإكثار من الدعاء والذكر والاستغفار.`,
      worshipTip: "ابدأ يوم عرفة بالفجر في المسجد، واحرص على الأذكار والتلبية والتكبير طوال اليوم حتى المغرب.",
      uniqueFact: "يوم عرفة 2026 يأتي في نهاية الربيع بأجواء معتدلة، مما يجعل الصيام أيسر والعبادة أمتع.",
      faqExtra: [
        { q: "هل يجوز صيام يوم عرفة للحاج؟", a: "الأفضل للحاج عدم صيام يوم عرفة ليتقوى على العبادة والوقوف بعرفة، وهذا هو فعل النبي ﷺ." },
        { q: "متى يبدأ الدعاء يوم عرفة؟", a: "يُستحب الإكثار من الدعاء طوال يوم عرفة، وأفضل وقته من بعد صلاة الظهر إلى غروب الشمس." },
      ],
    },
    2027: {
      heroSubtitle: `يوم عرفة ${hijriYear} هـ — ربيع`,
      mainContent: `يوم عرفة 2027 يصادف يوم الخميس ${formatDateAr(arafaDate)}، الموافق 9 ذو الحجة 1448 هـ. الأجواء الربيعية المعتدلة تمنح الصائمين راحة وطمأنينة.\n\nيوم عرفة هو اليوم التاسع من ذي الحجة، وهو ركن الحج الأعظم. قال النبي ﷺ: "الحج عرفة". وفيه ينزل الله تعالى إلى السماء الدنيا ويباهي بأهل عرفة أهل السماء.\n\nاغتنم هذا اليوم بالصيام والدعاء والذكر، فإن الأعمال الصالحة فيه من أحب الأعمال إلى الله تعالى.`,
      worshipTip: "اجعل لك قائمة أدعية مكتوبة لتدعو بها يوم عرفة — أدعية لنفسك ولوالديك ولأهلك وللمسلمين.",
      uniqueFact: "يوم عرفة 2027 يوافق 15 مايو، في أجمل أيام الربيع السعودي حيث الأجواء معتدلة ومثالية للعبادة.",
      faqExtra: [
        { q: "لماذا سُمي يوم عرفة بهذا الاسم؟", a: "قيل لأن آدم وحواء تعارفا فيه بعد هبوطهما من الجنة، وقيل لأن الحجاج يعترفون فيه بذنوبهم ويدعون الله المغفرة." },
        { q: "ما فضل الدعاء يوم عرفة؟", a: "قال النبي ﷺ: خير الدعاء دعاء يوم عرفة. والله يدنو من عباده ويباهي بهم الملائكة." },
      ],
    },
    2028: {
      heroSubtitle: `يوم عرفة ${hijriYear} هـ — ربيع`,
      mainContent: `يوم عرفة 2028 يصادف يوم الأربعاء ${formatDateAr(arafaDate)}، الموافق 9 ذو الحجة 1449 هـ. يأتي في أوائل مايو بأجواء ربيعية.\n\nفي هذا اليوم العظيم يجتمع أعظم تجمع بشري على وجه الأرض على صعيد عرفات. الحجاج يدعون الله ويتضرعون، والمسلمون في أقطار الأرض يصومون ويدعون.\n\nيوم عرفة فرصة ذهبية لتوبة نصوح وبداية جديدة مع الله. لا تفوّت هذه الفرصة العظيمة.`,
      worshipTip: "أكثر من التلبية والتكبير يوم عرفة: الله أكبر الله أكبر لا إله إلا الله، والله أكبر الله أكبر ولله الحمد.",
      uniqueFact: "التكبيرات المقيدة بعد الصلوات تبدأ من فجر يوم عرفة حتى عصر آخر أيام التشريق (13 ذو الحجة).",
      faqExtra: [
        { q: "ما هي التكبيرات المقيدة؟", a: "هي التكبيرات التي تُقال بعد كل صلاة فريضة من فجر يوم عرفة حتى عصر آخر أيام التشريق: الله أكبر الله أكبر لا إله إلا الله والله أكبر الله أكبر ولله الحمد." },
        { q: "هل يجوز الجمع بين نية صيام يوم عرفة وقضاء رمضان؟", a: "اختلف العلماء في ذلك، والأحوط إفراد كل نية على حدة، لكن بعض العلماء أجاز الجمع." },
      ],
    },
    2029: {
      heroSubtitle: `يوم عرفة ${hijriYear} هـ — ربيع`,
      mainContent: `يوم عرفة 2029 يصادف يوم الاثنين ${formatDateAr(arafaDate)}، الموافق 9 ذو الحجة 1450 هـ. رمضان 1450 يمثل نصف القرن الهجري.\n\nيوم عرفة هو اليوم الذي أكمل الله فيه الدين وأتم النعمة. نزلت فيه الآية: "اليوم أكملت لكم دينكم وأتممت عليكم نعمتي ورضيت لكم الإسلام ديناً".\n\nاستعد لهذا اليوم بصيام الأيام التسعة الأولى من ذي الحجة، فالعمل الصالح في هذه الأيام أحب إلى الله من العمل في غيرها.`,
      worshipTip: "صم الأيام الثمانية الأولى من ذي الحجة مع يوم عرفة — فالعمل الصالح في عشر ذي الحجة أحب إلى الله من أي أيام أخرى.",
      uniqueFact: "يوم عرفة 1450 هـ يصادف نصف القرن الهجري — مناسبة تاريخية تستحق عبادة استثنائية.",
      faqExtra: [
        { q: "ما هي الآية التي نزلت يوم عرفة؟", a: "نزلت آية إكمال الدين: 'اليوم أكملت لكم دينكم وأتممت عليكم نعمتي ورضيت لكم الإسلام ديناً' (المائدة: 3) على النبي ﷺ وهو واقف بعرفة." },
        { q: "لماذا يوم عرفة أفضل من يوم النحر؟", a: "لأن فيه الوقوف بعرفة وهو ركن الحج الأعظم، وفيه يعتق الله عباداً من النار أكثر من أي يوم آخر." },
      ],
    },
    2030: {
      heroSubtitle: `يوم عرفة ${hijriYear} هـ — ربيع`,
      mainContent: `يوم عرفة 2030 يصادف يوم السبت ${formatDateAr(arafaDate)}، الموافق 9 ذو الحجة 1451 هـ. يتزامن مع عام رؤية المملكة 2030.\n\nفي هذا العام المميز الذي تتحقق فيه رؤية المملكة، يبقى يوم عرفة أعظم أيام السنة عند الله تعالى. فما من يوم أكثر من أن يعتق الله فيه عبداً من النار من يوم عرفة.\n\nاجعل هدفك في هذا اليوم التوبة الصادقة والدعاء بإلحاح، فباب الله مفتوح ورحمته واسعة.`,
      worshipTip: "في عام الرؤية 2030، اجعل رؤيتك الروحية أيضاً عظيمة: أحسن الظن بالله وادع بأعظم ما تتمنى.",
      uniqueFact: "يوم عرفة 2030 يتزامن مع تحقيق رؤية المملكة 2030 — فلتكن رؤيتنا الروحية بنفس العظمة.",
      faqExtra: [
        { q: "كم عدد حجاج بيت الله كل عام؟", a: "يحج بيت الله الحرام أكثر من مليوني حاج سنوياً من مختلف أنحاء العالم، يقفون جميعاً على عرفة في يوم واحد." },
        { q: "ما أفضل وقت للدعاء يوم عرفة؟", a: "أفضل وقت من بعد الزوال (صلاة الظهر) إلى غروب الشمس، وهو وقت وقوف النبي ﷺ بعرفة." },
      ],
    },
  };

  const defaultContent: YearContent = {
    heroSubtitle: `يوم عرفة ${hijriYear} هـ — ${season}`,
    mainContent: `يوم عرفة ${year} يصادف يوم ${getDayOfWeek(arafaDate)} ${formatDateAr(arafaDate)}، الموافق 9 ذو الحجة ${hijriYear} هـ. يأتي في فصل ${season} حيث يقف الحجاج على صعيد عرفات في أعظم أركان الحج.\n\nصيام يوم عرفة لغير الحاج يكفّر ذنوب سنتين — السنة الماضية والسنة القادمة. إنها فرصة لا تتكرر إلا مرة في العام.\n\nيوم عرفة هو خير يوم طلعت عليه الشمس. فيه يعتق الله عباداً من النار ويباهي بأهل عرفة أهل السماء. اغتنمه بالصيام والدعاء والذكر والاستغفار.`,
    worshipTip: "صم يوم عرفة وأكثر من الدعاء بعد الظهر حتى المغرب — فهو أفضل وقت للدعاء في أفضل يوم.",
    uniqueFact: `يوم عرفة ${year} يأتي في فصل ${season}، وصيامه يكفّر ذنوب سنتين بفضل الله.`,
    faqExtra: [
      { q: `متى يوم عرفة ${year}؟`, a: `يوم عرفة ${year} يوافق ${getDayOfWeek(arafaDate)} ${formatDateAr(arafaDate)}، 9 ذو الحجة ${hijriYear} هـ.` },
      { q: `هل يُسن صيام يوم عرفة ${year}؟`, a: `نعم، صيام يوم عرفة سنة مؤكدة لغير الحاج، وصيامه يكفّر ذنوب السنة الماضية والقادمة.` },
    ],
  };

  return contents[year] || defaultContent;
}

function buildData(): Record<number, ArafaDayYearData> {
  const result: Record<number, ArafaDayYearData> = {};

  for (const [year, hijriYear, eidDate, hajjStart, arafaDate] of RAW_DATA) {
    const season = getSeason(arafaDate);
    const content = getYearContent(year, hijriYear, season, arafaDate);

    result[year] = {
      year,
      hijriYear,
      hijri: `${hijriYear} هـ`,
      arafaDate,
      eidAdhaDate: eidDate,
      hajjStartDate: hajjStart,
      dayOfWeek: getDayOfWeek(arafaDate),
      season,
      status: getStatus(arafaDate),
      content: {
        metaTitle: `يوم عرفة ${year} | ٩ ذو الحجة ${hijriYear} هـ | العد التنازلي`,
        metaDescription: `كم باقي على يوم عرفة ${year}؟ يوم عرفة ${hijriYear} هـ يوافق ${formatDateAr(arafaDate)}. عداد تنازلي دقيق مع فضائل يوم عرفة وأدعيته وأعماله.`,
        keywords: [`يوم عرفة ${year}`, `يوم عرفة ${hijriYear}`, `متى يوم عرفة ${year}`, `صيام يوم عرفة ${year}`, `دعاء يوم عرفة`],
        ...content,
      },
    };
  }

  return result;
}

export const ARAFA_DAY_DATA = buildData();
export const ARAFA_DAY_YEARS = Object.keys(ARAFA_DAY_DATA).map(Number).sort((a, b) => a - b);
export const ARAFA_DAY_LIST = ARAFA_DAY_YEARS.map((y) => ARAFA_DAY_DATA[y]);

export function getNextArafaDay(): ArafaDayYearData | null {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  for (const year of ARAFA_DAY_YEARS) {
    if (ARAFA_DAY_DATA[year].arafaDate >= todayStr) return ARAFA_DAY_DATA[year];
  }
  return null;
}

export function getTimeUntilArafaDay(year: number): { days: number; hours: number; minutes: number; seconds: number } {
  const data = ARAFA_DAY_DATA[year];
  if (!data) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const target = new Date(data.arafaDate + "T00:00:00").getTime();
  const now = new Date().getTime();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}
