import type { BlogArticle } from "../types";

const article: BlogArticle = {
  slug: "bmr-calculation",
  titleAr: "كيفية حساب معدل الأيض الأساسي BMR وتأثيره على وزنك — الدليل الشامل 2026",
  titleEn: "How to Calculate Basal Metabolic Rate (BMR) and Its Effect on Weight Loss",
  descriptionAr:
    "دليل شامل لحساب معدل الأيض الأساسي BMR بمعادلتي ميفلين سانت جور وهاريس بنديكت، والفرق بينه وبين TDEE، وكيف تستخدمه لخسارة الوزن أو زيادته بأمان.",
  descriptionEn:
    "Complete guide to calculating Basal Metabolic Rate (BMR) using Mifflin-St Jeor and Harris-Benedict formulas, plus how to use it for weight loss or gain.",
  category: "صحي",
  readTime: 9,
  publishDate: "2026-04-10",
  keywords: [
    "حساب معدل الأيض",
    "BMR",
    "معدل الأيض الأساسي",
    "حرق السعرات",
    "TDEE",
    "السعرات اليومية",
    "حساب السعرات الحرارية",
    "خسارة الوزن",
    "زيادة الوزن",
    "ميفلين سانت جور",
    "هاريس بنديكت",
    "BMR للنساء",
    "BMR للرجال",
    "حاسبة الأيض",
    "الميتابوليزم",
  ],
  icon: "🔥",
  relatedSlugs: [
    "age-calculator-guide",
    "budget-rule",
    "age-calculator-birthday",
  ],
  relatedCalculator: { href: "/calculators/bmi", labelAr: "حاسبة كتلة الجسم BMI" },
  content: `
<h2 class="text-xl font-bold text-rose-800 dark:text-rose-400 mt-8 mb-3">مقدمة — لماذا يهمّك معدل الأيض الأساسي؟</h2>

<p class="mb-4 leading-[1.9]">
هل سبق وتساءلت لماذا يأكل صديقك كميات كبيرة من الطعام دون أن يزداد وزنه، بينما أنت تكتفي بوجبة بسيطة وتشعر أنك تكتسب كيلوات إضافية؟ السر يكمن في رقم واحد فقط: <strong>معدل الأيض الأساسي</strong> أو ما يُعرف بـ <strong>BMR</strong> (Basal Metabolic Rate). فهم هذا الرقم وحسابه بدقة هو <strong>المفتاح الحقيقي</strong> لأي رحلة ناجحة لخسارة الوزن أو زيادته أو حتى الحفاظ عليه.
</p>

<p class="mb-4 leading-[1.9]">
في هذا الدليل الشامل، سنشرح لك بالتفصيل ما هو معدل الأيض الأساسي، كيف تحسبه بثلاث معادلات علمية مختلفة، الفرق بينه وبين TDEE، وكيف تستخدمه عملياً لتصميم خطة غذائية ناجحة تناسب جسمك. كل ذلك بأسلوب مبسّط وأمثلة بالأرقام.
</p>

<div class="bg-rose-50 dark:bg-rose-900/10 border-r-4 border-rose-500 p-4 rounded-lg my-6">
<p class="mb-0 leading-[1.9]"><strong>💡 ابدأ الآن:</strong> لمعرفة وزنك المثالي وتصنيف جسمك بدقة أولاً، استخدم <a href="/calculators/bmi" class="text-rose-700 dark:text-rose-300 font-bold underline">حاسبة كتلة الجسم BMI</a> المجانية على موقعنا، ثم تابع قراءة هذا الدليل لحساب احتياجاتك من السعرات.</p>
</div>

<h2 class="text-xl font-bold text-rose-800 dark:text-rose-400 mt-8 mb-3">ما هو معدل الأيض الأساسي BMR؟</h2>

<p class="mb-4 leading-[1.9]">
<strong>معدل الأيض الأساسي (BMR)</strong> هو كمية السعرات الحرارية التي يحتاجها جسمك لأداء وظائفه الحيوية الأساسية فقط، وأنت في حالة <strong>راحة تامة</strong> — أي بدون أي نشاط بدني. تشمل هذه الوظائف:
</p>

<ul class="list-disc pr-6 mb-4 space-y-2 leading-[1.9]">
<li><strong>التنفس:</strong> عمل الرئتين المستمر لإدخال الأكسجين وإخراج ثاني أكسيد الكربون.</li>
<li><strong>ضربات القلب:</strong> ضخ الدم 24 ساعة يومياً.</li>
<li><strong>وظائف الدماغ:</strong> الذي يستهلك وحده ~20% من إجمالي طاقتك اليومية.</li>
<li><strong>الهضم الأساسي:</strong> عمل الأمعاء والكبد والكلى.</li>
<li><strong>تنظيم درجة حرارة الجسم:</strong> الحفاظ على 37°C ثابتة.</li>
<li><strong>تجديد الخلايا:</strong> بناء خلايا جديدة وإصلاح التالفة.</li>
</ul>

<p class="mb-4 leading-[1.9]">
بمعنى آخر، <strong>BMR هو الحد الأدنى من السعرات</strong> الذي تحتاجه يومياً للبقاء على قيد الحياة لو بقيت في فراشك طوال اليوم. وللعلم، يستهلك معدل الأيض الأساسي ما بين <strong>60% إلى 75%</strong> من إجمالي طاقتك اليومية — وهذا ما يجعله أهم رقم في معادلة إدارة الوزن.
</p>

<h2 class="text-xl font-bold text-rose-800 dark:text-rose-400 mt-8 mb-3">العوامل المؤثرة في معدل الأيض</h2>

<p class="mb-4 leading-[1.9]">
ليس الناس متساوين في معدل الأيض، فهذه الفروقات هي ما تجعل بعض الناس "يحرقون أسرع" من غيرهم. أهم العوامل المؤثرة:
</p>

<div class="overflow-x-auto my-6">
<table class="w-full text-right border-collapse">
<thead>
<tr class="bg-rose-100 dark:bg-rose-900/30">
<th class="p-3 text-sm font-bold border border-rose-200">العامل</th>
<th class="p-3 text-sm font-bold border border-rose-200">التأثير على BMR</th>
</tr>
</thead>
<tbody>
<tr>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700"><strong>الجنس</strong></td>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700">الرجال يحرقون عادة 5-10% أكثر من النساء بسبب الكتلة العضلية الأعلى.</td>
</tr>
<tr class="bg-gray-50 dark:bg-gray-800/50">
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700"><strong>العمر</strong></td>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700">ينخفض BMR بنسبة 1-2% كل عقد بعد سن العشرين.</td>
</tr>
<tr>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700"><strong>الوزن والطول</strong></td>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700">كلما زاد الوزن والطول، ارتفع BMR لأن الجسم الأكبر يحتاج طاقة أكثر.</td>
</tr>
<tr class="bg-gray-50 dark:bg-gray-800/50">
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700"><strong>الكتلة العضلية</strong></td>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700">العضلات تحرق سعرات أكثر من الدهون 3 أضعاف حتى في الراحة.</td>
</tr>
<tr>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700"><strong>الجينات الوراثية</strong></td>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700">بعض الأشخاص يولدون بمعدل أيض أسرع بطبيعته.</td>
</tr>
<tr class="bg-gray-50 dark:bg-gray-800/50">
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700"><strong>الهرمونات</strong></td>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700">خمول الغدة الدرقية يقلل BMR، بينما فرط نشاطها يزيده.</td>
</tr>
<tr>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700"><strong>درجة حرارة الجو</strong></td>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700">البرد القارس والحر الشديد يرفعان BMR لتنظيم حرارة الجسم.</td>
</tr>
<tr class="bg-gray-50 dark:bg-gray-800/50">
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700"><strong>الحمل والرضاعة</strong></td>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700">ترفع BMR بنسبة 20-25% خلال الحمل والرضاعة.</td>
</tr>
</tbody>
</table>
</div>

<h2 class="text-xl font-bold text-rose-800 dark:text-rose-400 mt-8 mb-3">معادلات حساب BMR — الأكثر دقة</h2>

<p class="mb-4 leading-[1.9]">
هناك ثلاث معادلات علمية شائعة لحساب معدل الأيض، وأكثرها دقة في الوقت الحالي هي معادلة <strong>ميفلين سانت جور</strong> (Mifflin-St Jeor) التي طُوّرت عام 1990 وأصبحت المعيار الذهبي لدى أخصائيي التغذية حول العالم.
</p>

<h3 class="text-lg font-bold text-rose-700 dark:text-rose-300 mt-6 mb-3">1. معادلة ميفلين سانت جور (الأكثر دقة)</h3>

<div class="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800 rounded-xl p-5 my-6">
<p class="font-bold mb-3">للرجال:</p>
<p class="mb-3 font-mono text-sm bg-white dark:bg-gray-900 p-3 rounded">BMR = (10 × الوزن بالكجم) + (6.25 × الطول بالسم) − (5 × العمر بالسنوات) + 5</p>

<p class="font-bold mb-3">للنساء:</p>
<p class="mb-0 font-mono text-sm bg-white dark:bg-gray-900 p-3 rounded">BMR = (10 × الوزن بالكجم) + (6.25 × الطول بالسم) − (5 × العمر بالسنوات) − 161</p>
</div>

<h3 class="text-lg font-bold text-rose-700 dark:text-rose-300 mt-6 mb-3">2. معادلة هاريس بنديكت المُحدّثة</h3>

<div class="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-5 my-6">
<p class="font-bold mb-3">للرجال:</p>
<p class="mb-3 font-mono text-sm bg-white dark:bg-gray-900 p-3 rounded">BMR = 88.362 + (13.397 × الوزن) + (4.799 × الطول) − (5.677 × العمر)</p>

<p class="font-bold mb-3">للنساء:</p>
<p class="mb-0 font-mono text-sm bg-white dark:bg-gray-900 p-3 rounded">BMR = 447.593 + (9.247 × الوزن) + (3.098 × الطول) − (4.330 × العمر)</p>
</div>

<h3 class="text-lg font-bold text-rose-700 dark:text-rose-300 mt-6 mb-3">3. معادلة كاتش-ماكاردل (للرياضيين)</h3>

<p class="mb-4 leading-[1.9]">
هذه المعادلة هي الأدق لمن يعرف <strong>نسبة الكتلة العضلية</strong> في جسمه، لأنها تعتمد على الكتلة الخالية من الدهون فقط:
</p>

<div class="bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded-xl p-5 my-6">
<p class="mb-0 font-mono text-sm bg-white dark:bg-gray-900 p-3 rounded">BMR = 370 + (21.6 × الكتلة الخالية من الدهون بالكجم)</p>
</div>

<h2 class="text-xl font-bold text-rose-800 dark:text-rose-400 mt-8 mb-3">مثال عملي — حساب BMR خطوة بخطوة</h2>

<p class="mb-4 leading-[1.9]">
لنطبّق المعادلة على شخصين من السعودية:
</p>

<div class="bg-blue-50 dark:bg-blue-900/10 border-r-4 border-blue-500 p-4 rounded-lg my-6">
<p class="font-bold mb-2">🧑 المثال الأول — أحمد:</p>
<ul class="list-disc pr-6 mb-2 space-y-1 leading-[1.9]">
<li>الجنس: ذكر</li>
<li>العمر: 30 سنة</li>
<li>الوزن: 85 كجم</li>
<li>الطول: 178 سم</li>
</ul>
<p class="font-mono text-sm bg-white dark:bg-gray-900 p-3 rounded mt-2">
BMR = (10 × 85) + (6.25 × 178) − (5 × 30) + 5<br/>
BMR = 850 + 1112.5 − 150 + 5<br/>
<strong>BMR = 1817.5 سعرة حرارية يومياً</strong>
</p>
</div>

<div class="bg-pink-50 dark:bg-pink-900/10 border-r-4 border-pink-500 p-4 rounded-lg my-6">
<p class="font-bold mb-2">👩 المثال الثاني — سارة:</p>
<ul class="list-disc pr-6 mb-2 space-y-1 leading-[1.9]">
<li>الجنس: أنثى</li>
<li>العمر: 28 سنة</li>
<li>الوزن: 65 كجم</li>
<li>الطول: 162 سم</li>
</ul>
<p class="font-mono text-sm bg-white dark:bg-gray-900 p-3 rounded mt-2">
BMR = (10 × 65) + (6.25 × 162) − (5 × 28) − 161<br/>
BMR = 650 + 1012.5 − 140 − 161<br/>
<strong>BMR = 1361.5 سعرة حرارية يومياً</strong>
</p>
</div>

<h2 class="text-xl font-bold text-rose-800 dark:text-rose-400 mt-8 mb-3">الفرق بين BMR و TDEE</h2>

<p class="mb-4 leading-[1.9]">
هنا تأتي النقطة الأهم التي يخلط فيها كثير من الناس. <strong>BMR</strong> هو ما يحتاجه جسمك في حالة الراحة فقط، أما <strong>TDEE</strong> (Total Daily Energy Expenditure) فهو إجمالي ما تحرقه يومياً بما في ذلك النشاط البدني والحركة. يُحسب TDEE بضرب BMR في معامل النشاط:
</p>

<div class="overflow-x-auto my-6">
<table class="w-full text-right border-collapse">
<thead>
<tr class="bg-rose-100 dark:bg-rose-900/30">
<th class="p-3 text-sm font-bold border border-rose-200">مستوى النشاط</th>
<th class="p-3 text-sm font-bold border border-rose-200">الوصف</th>
<th class="p-3 text-sm font-bold border border-rose-200">المعامل</th>
</tr>
</thead>
<tbody>
<tr>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700">خامل</td>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700">عمل مكتبي بدون رياضة</td>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700"><strong>1.2</strong></td>
</tr>
<tr class="bg-gray-50 dark:bg-gray-800/50">
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700">نشاط خفيف</td>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700">رياضة 1-3 أيام أسبوعياً</td>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700"><strong>1.375</strong></td>
</tr>
<tr>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700">نشاط متوسط</td>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700">رياضة 3-5 أيام أسبوعياً</td>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700"><strong>1.55</strong></td>
</tr>
<tr class="bg-gray-50 dark:bg-gray-800/50">
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700">نشاط عالٍ</td>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700">رياضة 6-7 أيام أسبوعياً</td>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700"><strong>1.725</strong></td>
</tr>
<tr>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700">نشاط مكثف جداً</td>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700">رياضي محترف أو عمل بدني شاق</td>
<td class="p-3 text-sm border border-gray-200 dark:border-gray-700"><strong>1.9</strong></td>
</tr>
</tbody>
</table>
</div>

<p class="mb-4 leading-[1.9]">
<strong>تطبيق المثال:</strong> إذا كان BMR لأحمد 1817.5 سعرة، وهو يمارس رياضة 3-5 أيام أسبوعياً (نشاط متوسط)، فإن TDEE له = 1817.5 × 1.55 = <strong>2817 سعرة يومياً</strong>. هذا هو الرقم الذي يحافظ على وزنه ثابتاً.
</p>

<h2 class="text-xl font-bold text-rose-800 dark:text-rose-400 mt-8 mb-3">كيف تستخدم BMR لخسارة الوزن أو زيادته؟</h2>

<p class="mb-4 leading-[1.9]">
بعد معرفة TDEE، أصبح بإمكانك تصميم خطتك الغذائية بدقة:
</p>

<h3 class="text-lg font-bold text-rose-700 dark:text-rose-300 mt-6 mb-3">🔻 لخسارة الوزن (تخسيس آمن)</h3>

<ul class="list-disc pr-6 mb-4 space-y-2 leading-[1.9]">
<li><strong>اخصم 300-500 سعرة</strong> من TDEE يومياً → خسارة 0.3-0.5 كجم أسبوعياً (الأكثر صحة).</li>
<li><strong>اخصم 500-750 سعرة</strong> → خسارة 0.5-0.75 كجم أسبوعياً (سرعة معتدلة).</li>
<li><strong>لا تنخفض أبداً تحت BMR الخاص بك</strong> — هذا يضع جسمك في وضع المجاعة ويؤذي صحتك.</li>
</ul>

<h3 class="text-lg font-bold text-rose-700 dark:text-rose-300 mt-6 mb-3">🔺 لزيادة الوزن أو بناء العضلات</h3>

<ul class="list-disc pr-6 mb-4 space-y-2 leading-[1.9]">
<li><strong>أضف 250-500 سعرة</strong> فوق TDEE → زيادة 0.25-0.5 كجم أسبوعياً.</li>
<li><strong>تأكد من تناول بروتين كافٍ</strong> (1.6-2 جرام لكل كجم من وزنك) لبناء عضلات لا دهون.</li>
<li><strong>اربط ذلك بتمارين مقاومة</strong> منتظمة 3-5 مرات أسبوعياً.</li>
</ul>

<h2 class="text-xl font-bold text-rose-800 dark:text-rose-400 mt-8 mb-3">كيف ترفع معدل الأيض الأساسي طبيعياً؟</h2>

<p class="mb-4 leading-[1.9]">
الخبر السار أن BMR ليس قدراً محتوماً — يمكنك رفعه بطرق علمية مثبتة:
</p>

<ol class="list-decimal pr-6 mb-4 space-y-3 leading-[1.9]">
<li><strong>تمارين المقاومة:</strong> بناء العضلات هو أقوى أداة لرفع BMR. كل كجم عضلات إضافي يحرق 13-15 سعرة يومياً حتى أثناء النوم.</li>
<li><strong>HIIT (تمارين عالية الكثافة):</strong> ترفع الأيض لساعات بعد التمرين (تأثير "الأفتربيرن").</li>
<li><strong>تناول البروتين:</strong> هضم البروتين يستهلك 20-30% من سعراته، بينما الكربوهيدرات 5-10% فقط.</li>
<li><strong>اشرب الماء البارد:</strong> 500 مل ماء بارد ترفع BMR بنسبة 30% لمدة ساعة.</li>
<li><strong>نوم كافٍ:</strong> قلة النوم تخفض BMR وترفع هرمونات الجوع.</li>
<li><strong>تجنب الحميات القاسية:</strong> فهي تخفض BMR بسرعة وتؤدي لتباطؤ الأيض.</li>
<li><strong>الشاي الأخضر والقهوة:</strong> يرفعان BMR بنسبة 4-5% بشكل مؤقت.</li>
<li><strong>كثرة الحركة اليومية:</strong> NEAT (الحركة غير الرياضية) — كالمشي والوقوف — تشكّل جزءاً مهماً من احتياجك اليومي.</li>
</ol>

<h2 class="text-xl font-bold text-rose-800 dark:text-rose-400 mt-8 mb-3">أخطاء شائعة في حساب وفهم BMR</h2>

<ul class="list-disc pr-6 mb-4 space-y-2 leading-[1.9]">
<li><strong>الاعتماد على القيمة بشكل مطلق:</strong> المعادلات تقدير وليست قياس فعلي. الفروق الفردية قد تصل ±200 سعرة.</li>
<li><strong>عدم إعادة الحساب مع تغيّر الوزن:</strong> كلما خسرت أو اكتسبت وزناً، يجب إعادة حساب BMR.</li>
<li><strong>الأكل تحت BMR:</strong> أكبر خطأ في الحميات. يؤدي إلى تباطؤ الأيض وفقدان العضلات.</li>
<li><strong>تجاهل النشاط البدني:</strong> BMR وحده لا يكفي — استخدم TDEE.</li>
<li><strong>المبالغة في تقدير النشاط:</strong> معظم الناس يبالغون في تقدير حركتهم. كن صادقاً مع نفسك.</li>
<li><strong>توقع نتائج فورية:</strong> الجسم يحتاج 2-4 أسابيع للاستجابة لأي تغيير في السعرات.</li>
</ul>

<h2 class="text-xl font-bold text-rose-800 dark:text-rose-400 mt-8 mb-3">الأسئلة الشائعة</h2>

<h3 class="text-lg font-bold text-rose-700 dark:text-rose-300 mt-6 mb-3">هل يمكن أن يكون BMR لديّ منخفضاً جداً؟</h3>
<p class="mb-4 leading-[1.9]">
نعم، خاصة إذا كنت اتبعت حميات قاسية لفترات طويلة، أو لديك خمول في الغدة الدرقية، أو فقدت كتلة عضلية كبيرة. الحل هو إعادة تأهيل الأيض تدريجياً برفع السعرات وممارسة تمارين المقاومة.
</p>

<h3 class="text-lg font-bold text-rose-700 dark:text-rose-300 mt-6 mb-3">هل يختلف BMR في رمضان؟</h3>
<p class="mb-4 leading-[1.9]">
في الأيام الأولى ينخفض قليلاً (3-5%) كاستجابة طبيعية للصيام، لكن جسمك يتكيف بسرعة. المهم الحفاظ على وجبات متوازنة في الإفطار والسحور، والإكثار من البروتين، وعدم التهام الحلويات.
</p>

<h3 class="text-lg font-bold text-rose-700 dark:text-rose-300 mt-6 mb-3">ما الفرق بين BMR و RMR؟</h3>
<p class="mb-4 leading-[1.9]">
RMR (Resting Metabolic Rate) أعلى قليلاً من BMR (5-10%) لأنه يُقاس في حالة الراحة وليس النوم العميق. الفرق صغير عملياً، ومعظم المعادلات تستخدمهما بالتبادل.
</p>

<h3 class="text-lg font-bold text-rose-700 dark:text-rose-300 mt-6 mb-3">هل يساعدني BMI في معرفة BMR؟</h3>
<p class="mb-4 leading-[1.9]">
BMI و BMR مقياسان مختلفان لكن مكمّلان. <strong>BMI</strong> يخبرك إن كان وزنك صحياً بالنسبة لطولك، بينما <strong>BMR</strong> يخبرك كم سعرة تحتاج. ابدأ بحساب <a href="/calculators/bmi" class="text-rose-700 dark:text-rose-300 font-bold underline">مؤشر كتلة الجسم BMI</a> أولاً لتعرف وضعك الصحي، ثم احسب BMR لتصميم خطتك الغذائية.
</p>

<div class="bg-emerald-50 dark:bg-emerald-900/10 border-r-4 border-emerald-500 p-4 rounded-lg my-6">
<p class="mb-0 leading-[1.9]"><strong>🎯 خلاصة:</strong> معدل الأيض الأساسي BMR هو الرقم السحري الذي يحدّد نجاح أي خطة غذائية. احسبه بمعادلة ميفلين سانت جور للحصول على أفضل دقة، ثم اضربه في معامل النشاط للحصول على TDEE، وبعدها صمّم خطتك بحرفية. تذكّر: الصبر والاستمرارية أهم من السرعة. ابدأ رحلتك الصحية الآن باستخدام <a href="/calculators/bmi" class="text-emerald-700 dark:text-emerald-300 font-bold underline">حاسبة BMI</a> لتعرف نقطة انطلاقك.</p>
</div>

<h2 class="text-xl font-bold text-rose-800 dark:text-rose-400 mt-8 mb-3">خطواتك التالية</h2>

<ol class="list-decimal pr-6 mb-4 space-y-2 leading-[1.9]">
<li>احسب BMI أولاً لتعرف تصنيف وزنك (<a href="/calculators/bmi" class="text-rose-700 dark:text-rose-300 font-bold underline">حاسبة BMI</a>).</li>
<li>احسب BMR بمعادلة ميفلين سانت جور.</li>
<li>اضرب الناتج في معامل النشاط لتحصل على TDEE.</li>
<li>حدّد هدفك (تخسيس / زيادة / ثبات) واضبط السعرات.</li>
<li>استشر أخصائي تغذية معتمد إذا كان لديك حالة صحية خاصة.</li>
<li>كن صبوراً ومتسقاً — النتائج تظهر خلال 4-8 أسابيع.</li>
</ol>
`,
};

export default article;
