// Mawlid an-Nabi (المولد النبوي الشريف) data from 2025 to 2050
// 12 Rabi' al-Awwal - Anniversary of the Prophet Muhammad's ﷺ birth
// Dates derived from 1 Muharram + 70 days (Muharram 30 + Safar 29 + 11 days into Rabi al-Awwal)

export interface MawlidYearData {
  year: number;
  hijriYear: number;
  hijri: string;
  mawlidDate: string; // 12 Rabi al-Awwal
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

function getStatus(mawlidDate: string): MawlidYearData["status"] {
  const now = new Date();
  const mDate = new Date(mawlidDate);
  const dayAfter = new Date(mDate);
  dayAfter.setDate(dayAfter.getDate() + 1);
  if (now > dayAfter) return "past";
  const dayBefore = new Date(mDate);
  dayBefore.setDate(dayBefore.getDate() - 1);
  if (now >= dayBefore && now <= dayAfter) return "current";
  const diff = mDate.getTime() - now.getTime();
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

// Mawlid = 12 Rabi al-Awwal = ~70 days after 1 Muharram
// (Muharram: 30 days + Safar: 29 days + 11 days into Rabi al-Awwal = 70 days)
const MAWLID_OFFSET = 70;

interface YearContent {
  heroSubtitle: string;
  mainContent: string;
  worshipTip: string;
  uniqueFact: string;
  faqExtra: { q: string; a: string }[];
}

function getYearContent(year: number, hijriYear: number, season: string, mawlidDate: string): YearContent {
  const contents: Record<number, Partial<YearContent>> = {
    2025: {
      heroSubtitle: `١٢ ربيع الأول ${hijriYear} هـ — خريف`,
      mainContent: `المولد النبوي الشريف ${hijriYear} هـ يوافق يوم ${getDayOfWeek(mawlidDate)} ${formatDateAr(mawlidDate)} — ذكرى مولد خير البشرية سيدنا محمد ﷺ.

وُلد النبي محمد ﷺ في مكة المكرمة يوم الاثنين الثاني عشر من ربيع الأول في عام الفيل (571م). كان مولده ﷺ نوراً أضاء الدنيا وبشارة بقدوم خاتم النبيين والمرسلين.

أصبح المولد النبوي الشريف إجازة رسمية في المملكة العربية السعودية منذ عام 2023م ضمن مبادرات رؤية 2030، وهي خطوة أسعدت الملايين من المسلمين في المملكة والعالم.

في هذا اليوم يتذكر المسلمون سيرة النبي ﷺ وأخلاقه العظيمة ورسالته الخالدة. قال الله تعالى: {وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ} [الأنبياء: 107].

يُستحب في هذا اليوم الإكثار من الصلاة على النبي ﷺ، وقراءة سيرته، والتعرف على شمائله وأخلاقه. قال ﷺ: "إن من أفضل أيامكم يوم الجمعة... فأكثروا عليّ من الصلاة فيه فإن صلاتكم معروضة عليّ" (رواه أبو داود).`,
      worshipTip: "أكثر من الصلاة على النبي ﷺ في هذا اليوم المبارك. اقرأ شيئاً من السيرة النبوية لتتعرف على أخلاقه وشمائله. علّم أطفالك قصة مولد النبي ﷺ.",
      uniqueFact: `المولد النبوي ${hijriYear} هـ يأتي في خريف ${year}. وقد أصبح إجازة رسمية في السعودية لأول مرة عام 2023 ضمن رؤية 2030.`,
      faqExtra: [
        { q: `متى المولد النبوي ${year}؟`, a: `المولد النبوي ${hijriYear} هـ يوافق يوم ${getDayOfWeek(mawlidDate)} ${formatDateAr(mawlidDate)} ميلادي.` },
        { q: "هل المولد النبوي إجازة رسمية في السعودية؟", a: "نعم، أصبح المولد النبوي إجازة رسمية مدفوعة الأجر في المملكة العربية السعودية منذ عام 2023 للقطاعين العام والخاص." },
        { q: "ما فضل الصلاة على النبي ﷺ؟", a: "قال ﷺ: من صلى عليّ صلاة واحدة صلى الله عليه بها عشراً (رواه مسلم). والصلاة على النبي سبب لشفاعته يوم القيامة." },
        { q: "أين وُلد النبي ﷺ؟", a: "وُلد النبي ﷺ في مكة المكرمة يوم الاثنين 12 ربيع الأول في عام الفيل الموافق 571 ميلادي تقريباً." },
      ],
    },
    2026: {
      heroSubtitle: `١٢ ربيع الأول ${hijriYear} هـ — صيف`,
      mainContent: `المولد النبوي الشريف ${hijriYear} هـ يصادف يوم ${getDayOfWeek(mawlidDate)} ${formatDateAr(mawlidDate)}. ذكرى ميلاد الحبيب المصطفى ﷺ في أجواء صيفية.

النبي محمد ﷺ هو خاتم الأنبياء والمرسلين، أرسله الله رحمة للعالمين. وُلد يتيم الأب، فكفله جده عبد المطلب ثم عمه أبو طالب. وقد ظهرت بشائر نبوته منذ ولادته.

من علامات مولده ﷺ:
• ارتجاس إيوان كسرى وسقوط أربع عشرة شرفة منه
• خمود نار المجوس التي لم تخمد قبل ذلك بألف عام
• غيض بحيرة ساوة
• رؤيا أمه آمنة بنت وهب للنور الذي أضاء لها قصور الشام

هذه الذكرى فرصة لتجديد الحب للنبي ﷺ والتأسي بسنته ومعرفة سيرته العطرة.`,
      worshipTip: "اجعل هذا اليوم بداية لقراءة كتاب في السيرة النبوية كاملاً. من أفضل الكتب: الرحيق المختوم، وفقه السيرة للغزالي، والسيرة النبوية لابن هشام.",
      uniqueFact: `المولد النبوي ${hijriYear} يأتي في الصيف. وقد سُمي العام الذي وُلد فيه النبي ﷺ بعام الفيل لأن أبرهة الحبشي حاول هدم الكعبة فأهلكه الله بالطير الأبابيل.`,
      faqExtra: [
        { q: "لماذا سُمي عام ميلاد النبي بعام الفيل؟", a: "لأن أبرهة الأشرم ملك الحبشة جاء بجيش يتقدمه فيل عظيم ليهدم الكعبة، فأرسل الله عليهم طيراً أبابيل ترميهم بحجارة من سجيل فجعلهم كعصف مأكول." },
        { q: "ما هي أسماء النبي ﷺ؟", a: "للنبي ﷺ أسماء كثيرة منها: محمد، أحمد، الماحي، الحاشر، العاقب، المقفّي، ونبي الرحمة ﷺ." },
      ],
    },
    2027: {
      heroSubtitle: `١٢ ربيع الأول ${hijriYear} هـ — صيف`,
      mainContent: `المولد النبوي الشريف ${hijriYear} هـ يوافق يوم ${getDayOfWeek(mawlidDate)} ${formatDateAr(mawlidDate)}. ذكرى مباركة تتجدد كل عام.

قال الله تعالى عن نبيه ﷺ: {لَقَدْ جَاءَكُمْ رَسُولٌ مِّنْ أَنفُسِكُمْ عَزِيزٌ عَلَيْهِ مَا عَنِتُّمْ حَرِيصٌ عَلَيْكُم بِالْمُؤْمِنِينَ رَءُوفٌ رَّحِيمٌ} [التوبة: 128].

من أخلاق النبي ﷺ التي ينبغي التأسي بها:
• الصدق — فقد كان يُلقب بالصادق الأمين قبل البعثة
• الرحمة — أرسله الله رحمة للعالمين
• التواضع — كان يجلس مع أصحابه كأحدهم
• الكرم — كان أجود الناس ولا يُسأل شيئاً فيقول لا
• الشجاعة — كان أشجع الناس في المواقف الصعبة
• الحلم — كان يعفو عمن ظلمه ويصل من قطعه

ذكرى المولد النبوي فرصة سنوية لمراجعة أنفسنا ومدى اتباعنا لسنة النبي ﷺ.`,
      worshipTip: "تعلم حديثاً جديداً من أحاديث النبي ﷺ كل يوم في شهر ربيع الأول. واحرص على تطبيق سنة من سننه في حياتك اليومية.",
      uniqueFact: `في عام ${hijriYear} هـ يقترب العالم الإسلامي من منتصف القرن الخامس عشر الهجري — وتظل ذكرى مولد النبي ﷺ محفورة في قلوب المسلمين.`,
      faqExtra: [
        { q: "ما أخلاق النبي ﷺ؟", a: "وصفته عائشة رضي الله عنها بقولها: كان خُلقه القرآن. فكان ﷺ أصدق الناس وأرحمهم وأكرمهم وأشجعهم وأحلمهم وأعدلهم." },
        { q: "كم كان عمر النبي ﷺ عند البعثة؟", a: "بُعث النبي ﷺ وعمره أربعون سنة، عندما نزل عليه الوحي في غار حراء بسورة العلق." },
      ],
    },
    2028: {
      heroSubtitle: `١٢ ربيع الأول ${hijriYear} هـ — صيف`,
      mainContent: `المولد النبوي الشريف ${hijriYear} هـ يصادف يوم ${getDayOfWeek(mawlidDate)} ${formatDateAr(mawlidDate)}. إحياء لذكرى مولد سيد الخلق ﷺ.

السيرة النبوية مليئة بالدروس والعبر. من أبرز محطات حياة النبي ﷺ:

🌟 الميلاد والنشأة — ولد يتيماً في مكة عام الفيل (571م)
🌟 الشباب — عُرف بالصادق الأمين وتزوج خديجة رضي الله عنها
🌟 البعثة — نزل عليه الوحي في غار حراء وعمره 40 سنة
🌟 الدعوة — دعا قومه إلى التوحيد فآذوه وأصحابه
🌟 الهجرة — هاجر إلى المدينة وأسس الدولة الإسلامية
🌟 الفتح — فتح مكة في العام الثامن للهجرة
🌟 الوفاة — توفي ﷺ في المدينة عن 63 سنة

هذه المحطات تمثل منهجاً كاملاً في الصبر والإيمان والتوكل على الله.`,
      worshipTip: "اصطحب أسرتك لزيارة المسجد النبوي في المدينة المنورة إن استطعت. وإلا فاجعل هذا اليوم فرصة لمشاهدة فيلم وثائقي عن السيرة النبوية مع العائلة.",
      uniqueFact: `العام الهجري ${hijriYear} يمثل نصف القرن الخامس عشر — معلم تاريخي في التقويم الإسلامي، والمولد النبوي فيه فرصة للتأمل في مسيرة الأمة.`,
      faqExtra: [
        { q: "أين دُفن النبي ﷺ؟", a: "دُفن النبي ﷺ في حجرة عائشة رضي الله عنها في المدينة المنورة، وهو المكان الذي يُعرف اليوم بالروضة الشريفة في المسجد النبوي." },
        { q: "كم سنة استمرت دعوة النبي ﷺ؟", a: "استمرت دعوة النبي ﷺ 23 سنة: 13 سنة في مكة و10 سنوات في المدينة المنورة." },
      ],
    },
    2029: {
      heroSubtitle: `١٢ ربيع الأول ${hijriYear} هـ — صيف`,
      mainContent: `المولد النبوي الشريف ${hijriYear} هـ يوافق يوم ${getDayOfWeek(mawlidDate)} ${formatDateAr(mawlidDate)}. ذكرى عطرة بمولد الرحمة المهداة ﷺ.

النبي ﷺ رحمة للعالمين — ليس للمسلمين فحسب بل للبشرية جمعاء. أقام العدل ونشر الرحمة وحرر العقول من الشرك والجهالة.

من مظاهر رحمته ﷺ:
• رحمته بالأطفال — كان يحمل الحسن والحسين ويقبلهما ويلاعبهما
• رحمته بالنساء — أوصى بالنساء خيراً في حجة الوداع
• رحمته بالحيوان — نهى عن تعذيب الحيوان وأمر بالإحسان إليه
• رحمته بالأعداء — عفا عن أهل مكة يوم الفتح وقال: اذهبوا فأنتم الطلقاء
• رحمته بالخدم — لم يضرب خادماً قط ولم يقل لشيء فعله لِمَ فعلته

قال ﷺ: "إنما أنا رحمة مهداة" (رواه الحاكم).`,
      worshipTip: "طبّق سنة من سنن النبي ﷺ المهجورة في حياتك. مثلاً: السواك، صلاة الضحى، قيام الليل ولو بركعتين، إفشاء السلام.",
      uniqueFact: "كان النبي ﷺ يصوم يوم الاثنين ويقول عندما سُئل: ذلك يوم وُلدت فيه. فصيام الاثنين سنة نبوية مرتبطة بمولده ﷺ.",
      faqExtra: [
        { q: "هل يُستحب صيام يوم المولد النبوي؟", a: "يُستحب صيام يوم الاثنين من كل أسبوع لأنه يوم ولد فيه النبي ﷺ. أما صيام 12 ربيع الأول تحديداً فليس فيه دليل خاص، لكن لا حرج فيه." },
        { q: "ما هو حديث رحمة مهداة؟", a: "قال ﷺ: إنما أنا رحمة مهداة. رواه الحاكم. وقال تعالى: {وما أرسلناك إلا رحمة للعالمين}." },
      ],
    },
    2030: {
      heroSubtitle: `١٢ ربيع الأول ${hijriYear} هـ — صيف`,
      mainContent: `المولد النبوي الشريف ${hijriYear} هـ يصادف يوم ${getDayOfWeek(mawlidDate)} ${formatDateAr(mawlidDate)}. في عام رؤية المملكة 2030 تتجدد ذكرى مولد النبي ﷺ.

في عام تحقيق رؤية 2030، يتذكر المسلمون مولد من غيّر مسار البشرية — النبي محمد ﷺ. كما أن رؤية المملكة تسعى لبناء مستقبل مزدهر، فإن رسالة النبي ﷺ بنت حضارة إسلامية عظيمة امتدت قروناً.

شمائل النبي ﷺ:
وصفه أصحابه بأنه كان أجمل الناس وجهاً وأحسنهم خَلقاً وخُلقاً. كان ﷺ ربعة القامة (معتدل الطول)، واسع الجبين، أزهر اللون، كث اللحية، بين كتفيه خاتم النبوة.

كان ﷺ يتبسم دائماً، وكان ضحكه تبسماً. كان أفصح العرب لساناً وأعذبهم كلاماً. إذا تكلم أنصت الجميع لحديثه.

فلنتذكر في هذا اليوم أن أفضل تكريم للنبي ﷺ هو اتباع سنته والتخلق بأخلاقه.`,
      worshipTip: "في عام رؤية 2030، اجعل هدفك حفظ 40 حديثاً نبوياً (الأربعين النووية) وتطبيقها في حياتك.",
      uniqueFact: `المولد النبوي ${hijriYear} يتزامن مع عام رؤية المملكة 2030 — عام يجمع بين الأصالة والمعاصرة في المملكة العربية السعودية.`,
      faqExtra: [
        { q: "ما هي شمائل النبي ﷺ؟", a: "كان ﷺ ربعة القامة، واسع الجبين، أزهر اللون، كث اللحية. وكان أجمل الناس وجهاً وأحسنهم خُلقاً. وقد جمع أنس بن مالك صفاته في كتب الشمائل." },
        { q: "ما هو خاتم النبوة؟", a: "علامة بين كتفي النبي ﷺ كبيضة الحمامة، كانت من علامات نبوته التي ذُكرت في الكتب السابقة." },
      ],
    },
  };

  const specific = contents[year];
  if (specific?.mainContent) return specific as YearContent;

  return {
    heroSubtitle: `١٢ ربيع الأول ${hijriYear} هـ — ${season}`,
    mainContent: `المولد النبوي الشريف ${hijriYear} هـ يوافق يوم ${getDayOfWeek(mawlidDate)} ${formatDateAr(mawlidDate)} — ذكرى ميلاد سيدنا محمد ﷺ خاتم الأنبياء والمرسلين.

وُلد النبي ﷺ في الثاني عشر من شهر ربيع الأول في عام الفيل بمكة المكرمة. أرسله الله رحمة للعالمين ليخرج الناس من الظلمات إلى النور.

المولد النبوي إجازة رسمية في المملكة العربية السعودية منذ 2023م. وهو فرصة سنوية للتعرف على سيرة النبي ﷺ وأخلاقه وشمائله والإكثار من الصلاة عليه.

قال الله تعالى: {إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا} [الأحزاب: 56].`,
    worshipTip: "أكثر من الصلاة على النبي ﷺ، واقرأ فصلاً من السيرة النبوية، وعلّم أبناءك شيئاً من أخلاقه وشمائله.",
    uniqueFact: `المولد النبوي ${hijriYear} هـ يأتي في فصل ${season}. والتقويم الهجري يتقدم 10-11 يوماً سنوياً فتدور ذكرى المولد في جميع الفصول.`,
    faqExtra: [
      { q: `متى المولد النبوي ${year}؟`, a: `المولد النبوي ${hijriYear} هـ يوافق ${getDayOfWeek(mawlidDate)} ${formatDateAr(mawlidDate)}.` },
      { q: "ما فضل الصلاة على النبي ﷺ؟", a: "قال ﷺ: من صلى عليّ صلاة واحدة صلى الله عليه بها عشراً (رواه مسلم). فأكثروا من الصلاة على النبي ﷺ." },
    ],
  };
}

function buildData(): Record<number, MawlidYearData> {
  const result: Record<number, MawlidYearData> = {};

  for (const [year, hijriYear, newYearDate] of RAW_DATA) {
    const mawlidDate = addDays(newYearDate, MAWLID_OFFSET);
    const season = getSeason(mawlidDate);
    const content = getYearContent(year, hijriYear, season, mawlidDate);

    // Handle duplicate year 2041 (hijri years 1463 and 1464)
    const effectiveYear = year === 2041 && hijriYear === 1464 ? 2042 : year;

    result[effectiveYear] = {
      year: effectiveYear,
      hijriYear,
      hijri: `${hijriYear} هـ`,
      mawlidDate,
      dayOfWeek: getDayOfWeek(mawlidDate),
      season,
      status: getStatus(mawlidDate),
      content: {
        metaTitle: `المولد النبوي ${hijriYear} هـ | ١٢ ربيع الأول ${hijriYear} | العد التنازلي`,
        metaDescription: `كم باقي على المولد النبوي ${hijriYear}؟ ١٢ ربيع الأول ${hijriYear} يوافق ${formatDateAr(mawlidDate)}. عداد تنازلي مع سيرة النبي ﷺ وشمائله وفضل الصلاة عليه.`,
        keywords: [`المولد النبوي ${hijriYear}`, `المولد النبوي ${year}`, `12 ربيع الأول ${hijriYear}`, `ذكرى مولد النبي ${year}`, `متى المولد النبوي`],
        ...content,
      },
    };
  }

  return result;
}

export const MAWLID_DATA = buildData();
export const MAWLID_YEARS = Object.keys(MAWLID_DATA).map(Number).sort((a, b) => a - b);
export const MAWLID_LIST = MAWLID_YEARS.map((y) => MAWLID_DATA[y]);

export function getNextMawlid(): MawlidYearData | null {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  for (const year of MAWLID_YEARS) {
    if (MAWLID_DATA[year].mawlidDate >= todayStr) return MAWLID_DATA[year];
  }
  return null;
}

export function getTimeUntilMawlid(year: number): { days: number; hours: number; minutes: number; seconds: number } {
  const data = MAWLID_DATA[year];
  if (!data) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const target = new Date(data.mawlidDate + "T00:00:00").getTime();
  const now = new Date().getTime();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}
