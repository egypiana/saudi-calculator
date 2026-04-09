// Ashura Day (يوم عاشوراء) data from 2025 to 2050
// 10th Muharram - Commemorating Allah saving Musa (Moses) from Pharaoh
// Dates derived from Hijri New Year (1 Muharram) + 9 days

export interface AshuraYearData {
  year: number;
  hijriYear: number;
  hijri: string;
  ashuraDate: string; // 10 Muharram
  tasua: string; // 9 Muharram (day before)
  eleventhDate: string; // 11 Muharram (day after)
  newYearDate: string; // 1 Muharram
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

function getStatus(ashuraDate: string): AshuraYearData["status"] {
  const now = new Date();
  const aDate = new Date(ashuraDate);
  const dayAfter = new Date(aDate);
  dayAfter.setDate(dayAfter.getDate() + 1);
  if (now > dayAfter) return "past";
  const dayBefore = new Date(aDate);
  dayBefore.setDate(dayBefore.getDate() - 1);
  if (now >= dayBefore && now <= dayAfter) return "current";
  const diff = aDate.getTime() - now.getTime();
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
// Same source as hijriNewYearData.ts
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

function getYearContent(year: number, hijriYear: number, season: string, ashuraDate: string, tasua: string, eleventhDate: string): YearContent {
  const contents: Record<number, Partial<YearContent>> = {
    2025: {
      heroSubtitle: `١٠ محرم ${hijriYear} هـ — صيف`,
      mainContent: `يوم عاشوراء ${hijriYear} هـ يوافق يوم ${getDayOfWeek(ashuraDate)} ${formatDateAr(ashuraDate)}، وهو العاشر من شهر محرم — أول الأشهر الحُرم في التقويم الهجري.

يوم عاشوراء يوم عظيم نجّى الله فيه موسى عليه السلام وقومه من فرعون وجنوده. روى البخاري ومسلم عن ابن عباس رضي الله عنهما أن النبي ﷺ قدم المدينة فوجد اليهود يصومون يوم عاشوراء، فسألهم فقالوا: "هذا يوم نجّى الله فيه موسى وأغرق فرعون، فنحن نصومه شكراً"، فقال ﷺ: "نحن أحق بموسى منكم" فصامه وأمر بصيامه.

مراتب صيام عاشوراء ثلاثة: أعلاها صيام التاسع والعاشر والحادي عشر (${formatDateAr(tasua)} و${formatDateAr(ashuraDate)} و${formatDateAr(eleventhDate)})، ثم صيام التاسع والعاشر (${formatDateAr(tasua)} و${formatDateAr(ashuraDate)})، ثم صيام العاشر وحده. والأفضل صيام التاسع مع العاشر لمخالفة أهل الكتاب.

قال النبي ﷺ: "صيام يوم عاشوراء أحتسب على الله أن يكفّر السنة التي قبله" (رواه مسلم). فهو فرصة عظيمة لمحو الذنوب والبدء بصفحة جديدة.`,
      worshipTip: "صم تاسوعاء وعاشوراء (9 و10 محرم) أي ${formatDateAr(tasua)} و${formatDateAr(ashuraDate)}. وإن استطعت صم الحادي عشر أيضاً فهو الأفضل. أكثر من الدعاء والاستغفار والصدقة.",
      uniqueFact: `عاشوراء ${hijriYear} هـ يأتي في فصل الصيف، حيث يكون النهار طويلاً. وقد كان صيام عاشوراء فرضاً قبل أن يُفرض رمضان، ثم أصبح مستحباً.`,
      faqExtra: [
        { q: `متى يوم عاشوراء ${year}؟`, a: `يوم عاشوراء ${hijriYear} هـ يوافق يوم ${getDayOfWeek(ashuraDate)} ${formatDateAr(ashuraDate)} ميلادي.` },
        { q: "ما فضل صيام يوم عاشوراء؟", a: "قال النبي ﷺ: صيام يوم عاشوراء أحتسب على الله أن يكفّر السنة التي قبله. رواه مسلم. فصيامه يكفّر ذنوب سنة كاملة." },
        { q: "ما هي مراتب صيام عاشوراء؟", a: "ثلاث مراتب: الأعلى صيام 9+10+11 محرم، ثم 9+10 محرم (وهو السنة المؤكدة)، ثم 10 محرم وحده." },
        { q: "لماذا نصوم عاشوراء؟", a: "لأن الله نجّى فيه موسى عليه السلام من فرعون. فصامه النبي ﷺ شكراً لله وقال: نحن أحق بموسى منكم." },
      ],
    },
    2026: {
      heroSubtitle: `١٠ محرم ${hijriYear} هـ — صيف`,
      mainContent: `يوم عاشوراء ${hijriYear} هـ يوافق يوم ${getDayOfWeek(ashuraDate)} ${formatDateAr(ashuraDate)}. يأتي في أول شهر محرم الحرام، عاشر أيامه وأعظمها.

عاشوراء ليس مجرد يوم من أيام التقويم، بل هو يوم شكر لله تعالى على نجاة موسى عليه السلام. وقد صامه النبي ﷺ وأمر بصيامه، ثم قال قبل وفاته: "لئن بقيت إلى قابل لأصومنّ التاسع" — يعني مع العاشر.

تاسوعاء (9 محرم): ${formatDateAr(tasua)} - يُستحب صيامه مع عاشوراء
عاشوراء (10 محرم): ${formatDateAr(ashuraDate)} - صيامه يكفّر السنة الماضية
الحادي عشر (11 محرم): ${formatDateAr(eleventhDate)} - صيامه مع ما قبله أكمل الأجر

شهر محرم بأكمله من أفضل شهور الصيام بعد رمضان. قال النبي ﷺ: "أفضل الصيام بعد رمضان شهر الله المحرم" (رواه مسلم).`,
      worshipTip: "احرص على صيام يومي ${formatDateAr(tasua)} و${formatDateAr(ashuraDate)} (تاسوعاء وعاشوراء). تصدّق في هذا اليوم وأحسن إلى أهلك ووسّع عليهم.",
      uniqueFact: `في عام ${hijriYear} هـ يوافق عاشوراء يوم ${getDayOfWeek(ashuraDate)}. وقد ذكر ابن رجب أن صيام عاشوراء يكفّر الصغائر من الذنوب.`,
      faqExtra: [
        { q: "هل كان صيام عاشوراء فرضاً؟", a: "نعم، كان فرضاً في أول الإسلام قبل أن يُفرض رمضان. فلما فُرض رمضان قال النبي ﷺ: من شاء فليصمه ومن شاء فليفطره." },
        { q: "ما حكم صيام عاشوراء وحده دون تاسوعاء؟", a: "يجوز صيام عاشوراء وحده ولا كراهة فيه عند جمهور العلماء، لكن الأفضل صيام التاسع معه." },
      ],
    },
    2027: {
      heroSubtitle: `١٠ محرم ${hijriYear} هـ — صيف`,
      mainContent: `يوم عاشوراء ${hijriYear} هـ يصادف يوم ${getDayOfWeek(ashuraDate)} ${formatDateAr(ashuraDate)}. العاشر من محرم — يوم عظيم من أيام الله.

من فضائل يوم عاشوراء:
• نجّى الله فيه موسى عليه السلام وقومه بني إسرائيل من فرعون وجنوده
• صامه النبي ﷺ وحثّ على صيامه وقال: أحتسب على الله أن يكفّر السنة التي قبله
• هو من أيام الله التي ينبغي تذكرها وشكر الله عليها
• كان صيامه فرضاً ثم صار مستحباً بعد فرض رمضان

يوم تاسوعاء (${formatDateAr(tasua)}) يُصام مع عاشوراء لقوله ﷺ: "لئن بقيت إلى قابل لأصومنّ التاسع". ومن أراد الأكمل صام الثلاثة: التاسع والعاشر والحادي عشر.

هذا اليوم فرصة سنوية لتكفير ذنوب عام كامل بعمل يسير — صيام يوم واحد!`,
      worshipTip: "اغتنم عاشوراء بالصيام والدعاء والتوبة. علّم أطفالك قصة موسى عليه السلام وفرعون وفضل هذا اليوم العظيم.",
      uniqueFact: `عاشوراء ${hijriYear} قريب من منتصف القرن الخامس عشر الهجري. وقد كان الصحابة يُصوّمون صبيانهم يوم عاشوراء ويجعلون لهم اللعبة من العهن.`,
      faqExtra: [
        { q: "ما قصة يوم عاشوراء؟", a: "هو يوم نجّى الله فيه موسى عليه السلام وبني إسرائيل من فرعون وجنوده بشق البحر. فصامه موسى شكراً، وصامه النبي ﷺ." },
        { q: "هل يُصام عاشوراء في الحزن أو الفرح؟", a: "يُصام عاشوراء شكراً لله على نجاة موسى عليه السلام، وهو يوم فرح بنعمة الله. ولا يُشرع فيه حزن ولا نياحة." },
      ],
    },
    2028: {
      heroSubtitle: `١٠ محرم ${hijriYear} هـ — ربيع`,
      mainContent: `يوم عاشوراء ${hijriYear} هـ يوافق يوم ${getDayOfWeek(ashuraDate)} ${formatDateAr(ashuraDate)}. يأتي في فصل الربيع حيث يكون النهار معتدلاً.

عاشوراء فرصة ذهبية متكررة كل عام هجري لتكفير الذنوب والتقرب إلى الله. والنبي ﷺ كان يتحرّى صيامه ويأمر به.

مواعيد الصيام المستحبة:
📅 تاسوعاء: ${formatDateAr(tasua)} (${getDayOfWeek(tasua)})
📅 عاشوراء: ${formatDateAr(ashuraDate)} (${getDayOfWeek(ashuraDate)})
📅 الحادي عشر: ${formatDateAr(eleventhDate)} (${getDayOfWeek(eleventhDate)})

قال شيخ الإسلام ابن تيمية رحمه الله: "صيام يوم عاشوراء كفارة سنة، ولا يُكره إفراده بالصوم". فمن لم يستطع صيام التاسع معه فليصم العاشر وحده.

شهر محرم سُمي بالمحرم لعظم حرمته، وهو من الأشهر الأربعة الحُرم التي ذكرها الله في كتابه.`,
      worshipTip: "في عاشوراء ${hijriYear} النهار ربيعي معتدل. اجعله يوم عبادة كاملة: صيام ودعاء وقراءة قرآن وصدقة.",
      uniqueFact: `العام الهجري ${hijriYear} يمثل نصف القرن الخامس عشر — وعاشوراء فيه يأتي في ربيع ${year} بأجواء معتدلة.`,
      faqExtra: [
        { q: "هل يجوز صيام عاشوراء قضاءً ونافلة؟", a: "يجوز الجمع بين نية القضاء ونية صيام عاشوراء عند بعض العلماء، والأحوط إفراد كل نية بصوم مستقل." },
        { q: "ما هي الأشهر الحُرم؟", a: "ذو القعدة، ذو الحجة، محرم، ورجب. سُميت حُرماً لعظم حرمتها وتحريم القتال فيها." },
      ],
    },
    2029: {
      heroSubtitle: `١٠ محرم ${hijriYear} هـ — ربيع`,
      mainContent: `يوم عاشوراء ${hijriYear} هـ يصادف يوم ${getDayOfWeek(ashuraDate)} ${formatDateAr(ashuraDate)}. يأتي في فصل الربيع المعتدل.

عن أبي قتادة رضي الله عنه أن النبي ﷺ سُئل عن صيام يوم عاشوراء فقال: "يكفّر السنة الماضية" (رواه مسلم). وهذا فضل عظيم لا ينبغي تفويته.

من آداب يوم عاشوراء:
• الصيام — وهو السنة المؤكدة
• الإكثار من الدعاء والذكر
• التوسعة على الأهل — روي عن النبي ﷺ: "من وسّع على أهله يوم عاشوراء وسّع الله عليه سائر سنته"
• الصدقة والإحسان إلى الفقراء والمساكين
• التوبة والاستغفار وتجديد العهد مع الله

تاسوعاء يوافق ${formatDateAr(tasua)}. احرص على صيامه مع عاشوراء للأجر الكامل.`,
      worshipTip: "وسّع على أهلك يوم عاشوراء بالطعام والشراب فقد ورد في الأثر أن من وسّع على أهله فيه وسّع الله عليه.",
      uniqueFact: "يوم عاشوراء من أعظم أيام الشكر — شكر الله على نجاة نبيّه موسى. وقد عظّمته الأمم السابقة قبل الإسلام.",
      faqExtra: [
        { q: "هل التوسعة على الأهل في عاشوراء ثابتة؟", a: "ورد فيها حديث حسّنه بعض العلماء: من وسّع على أهله يوم عاشوراء وسّع الله عليه سائر سنته. والعمل بها لا بأس به." },
        { q: "ما حكم الاحتفال بعاشوراء؟", a: "السنة فيه الصيام والشكر، ولا يُشرع فيه لطم ولا حزن ولا احتفال بدعي." },
      ],
    },
    2030: {
      heroSubtitle: `١٠ محرم ${hijriYear} هـ — ربيع`,
      mainContent: `يوم عاشوراء ${hijriYear} هـ يصادف يوم ${getDayOfWeek(ashuraDate)} ${formatDateAr(ashuraDate)}. في عام رؤية المملكة 2030 يأتي عاشوراء ربيعياً معتدلاً.

عاشوراء يوم شكر وعبادة وتأمل في نعم الله. فيه نجّى الله نبيّه موسى عليه السلام من أعظم طاغية في التاريخ — فرعون الذي ادّعى الربوبية. شقّ الله البحر لموسى وقومه فعبروا، ثم أطبقه على فرعون وجنوده فأغرقهم جميعاً.

في عام ${year} — عام الرؤية — تتجدد معاني التوكل على الله والأمل في المستقبل. كما نجّى الله موسى حين توكل عليه وقال {كَلَّا إِنَّ مَعِيَ رَبِّي سَيَهْدِينِ}، فإن المؤمن يتوكل على الله في أموره كلها.

مواعيد الصيام:
📅 تاسوعاء: ${formatDateAr(tasua)}
📅 عاشوراء: ${formatDateAr(ashuraDate)}
📅 الحادي عشر: ${formatDateAr(eleventhDate)}`,
      worshipTip: "اجعل عاشوراء ${hijriYear} فرصة لتجديد التوكل على الله. صم وادعُ واقرأ سورة طه وسورة الشعراء لتتدبر قصة موسى وفرعون.",
      uniqueFact: `عاشوراء ${hijriYear} يتزامن مع عام رؤية المملكة 2030 — عام الإنجاز والتحول. وكما كانت نجاة موسى بداية جديدة لبني إسرائيل، نسأل الله أن يكون هذا العام بداية خير.`,
      faqExtra: [
        { q: "ما الآيات التي تتحدث عن يوم عاشوراء؟", a: "قصة نجاة موسى مفصلة في سور: البقرة، الأعراف، يونس، طه، الشعراء، والقصص. قال تعالى: {فَأَوْحَيْنَا إِلَى مُوسَى أَنِ اضْرِبْ بِعَصَاكَ الْبَحْرَ فَانفَلَقَ}." },
        { q: "هل عاشوراء إجازة رسمية؟", a: "نعم، يوم عاشوراء إجازة رسمية في المملكة العربية السعودية وعدد من الدول الإسلامية." },
      ],
    },
  };

  const specific = contents[year];
  if (specific?.mainContent) return specific as YearContent;

  return {
    heroSubtitle: `١٠ محرم ${hijriYear} هـ — ${season}`,
    mainContent: `يوم عاشوراء ${hijriYear} هـ يوافق يوم ${getDayOfWeek(ashuraDate)} ${formatDateAr(ashuraDate)} — العاشر من شهر محرم الحرام.

يوم عاشوراء يوم عظيم نجّى الله فيه موسى عليه السلام وقومه من فرعون وجنوده. صامه النبي ﷺ شكراً لله وقال: "نحن أحق بموسى منكم".

مراتب صيام عاشوراء:
• الأكمل: صيام 9+10+11 محرم (${formatDateAr(tasua)} و${formatDateAr(ashuraDate)} و${formatDateAr(eleventhDate)})
• المستحب: صيام 9+10 محرم (${formatDateAr(tasua)} و${formatDateAr(ashuraDate)})
• الجائز: صيام 10 محرم فقط (${formatDateAr(ashuraDate)})

قال النبي ﷺ: "صيام يوم عاشوراء أحتسب على الله أن يكفّر السنة التي قبله" (رواه مسلم). فرصة سنوية عظيمة لا تُفوَّت!`,
    worshipTip: "احرص على صيام تاسوعاء وعاشوراء، وأكثر من الدعاء والاستغفار والصدقة. وسّع على أهلك في هذا اليوم المبارك.",
    uniqueFact: `عاشوراء ${hijriYear} هـ يأتي في فصل ${season} من عام ${year}. والتقويم الهجري يتقدم 10-11 يوماً سنوياً، فيدور عاشوراء في جميع فصول السنة.`,
    faqExtra: [
      { q: `متى يوم عاشوراء ${year}؟`, a: `يوم عاشوراء ${hijriYear} هـ يوافق ${getDayOfWeek(ashuraDate)} ${formatDateAr(ashuraDate)}.` },
      { q: `متى تاسوعاء ${year}؟`, a: `يوم تاسوعاء (9 محرم ${hijriYear}) يوافق ${getDayOfWeek(tasua)} ${formatDateAr(tasua)}. يُستحب صيامه مع عاشوراء.` },
    ],
  };
}

function buildData(): Record<number, AshuraYearData> {
  const result: Record<number, AshuraYearData> = {};

  for (const [year, hijriYear, newYearDate] of RAW_DATA) {
    const ashuraDate = addDays(newYearDate, 9); // 10th Muharram
    const tasua = addDays(newYearDate, 8); // 9th Muharram
    const eleventhDate = addDays(newYearDate, 10); // 11th Muharram
    const season = getSeason(ashuraDate);
    const content = getYearContent(year, hijriYear, season, ashuraDate, tasua, eleventhDate);

    // Handle duplicate year 2041 (hijri years 1463 and 1464)
    const effectiveYear = year === 2041 && hijriYear === 1464 ? 2042 : year;

    result[effectiveYear] = {
      year: effectiveYear,
      hijriYear,
      hijri: `${hijriYear} هـ`,
      ashuraDate,
      tasua,
      eleventhDate,
      newYearDate,
      dayOfWeek: getDayOfWeek(ashuraDate),
      season,
      status: getStatus(ashuraDate),
      content: {
        metaTitle: `يوم عاشوراء ${hijriYear} هـ | ١٠ محرم ${hijriYear} | العد التنازلي`,
        metaDescription: `كم باقي على يوم عاشوراء ${hijriYear}؟ ١٠ محرم ${hijriYear} يوافق ${formatDateAr(ashuraDate)}. عداد تنازلي مع فضل صيام عاشوراء ومراتب الصيام وقصة نجاة موسى.`,
        keywords: [`يوم عاشوراء ${hijriYear}`, `عاشوراء ${year}`, `صيام عاشوراء ${hijriYear}`, `10 محرم ${hijriYear}`, `تاسوعاء ${hijriYear}`],
        ...content,
      },
    };
  }

  return result;
}

export const ASHURA_DATA = buildData();
export const ASHURA_YEARS = Object.keys(ASHURA_DATA).map(Number).sort((a, b) => a - b);
export const ASHURA_LIST = ASHURA_YEARS.map((y) => ASHURA_DATA[y]);

export function getNextAshura(): AshuraYearData | null {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  for (const year of ASHURA_YEARS) {
    if (ASHURA_DATA[year].ashuraDate >= todayStr) return ASHURA_DATA[year];
  }
  return null;
}

export function getTimeUntilAshura(year: number): { days: number; hours: number; minutes: number; seconds: number } {
  const data = ASHURA_DATA[year];
  if (!data) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const target = new Date(data.ashuraDate + "T00:00:00").getTime();
  const now = new Date().getTime();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}
