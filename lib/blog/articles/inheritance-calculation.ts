import type { BlogArticle } from "../types";

const article: BlogArticle = {
  slug: "inheritance-calculation",
  titleAr: "كيفية حساب الميراث في الإسلام وفق أحكام الفرائض",
  titleEn: "How to Calculate Inheritance in Islam According to Faraid Rules",
  descriptionAr: "دليل شامل لعلم الفرائض وتوزيع الميراث الشرعي — أصحاب الفروض والعصبات، قواعد الحجب، العول والرد، مع أمثلة عملية وجداول توضيحية.",
  descriptionEn: "Complete guide to Islamic inheritance law (Faraid) — fixed shares, residual heirs, blocking rules, with practical examples.",
  category: "شرعي",
  readTime: 10,
  publishDate: "2026-02-01",
  keywords: ["حساب الميراث", "علم الفرائض", "تقسيم التركة", "أنصبة الورثة", "المواريث في الإسلام", "حاسبة المواريث"],
  icon: "📜",
  relatedSlugs: ["end-of-service", "mortgage-calculation", "fuel-consumption"],
  relatedCalculator: { href: "/calculators/inheritance", labelAr: "حاسبة المواريث الشرعية" },
  content: `
<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">مقدمة: أهمية علم الفرائض في الإسلام</h2>

<p class="mb-4 leading-[1.9]">
علم الفرائض — أو علم المواريث — هو أحد أجلّ العلوم الشرعية وأكثرها أهمية في حياة المسلمين. وقد وصفه النبي ﷺ بأنه <strong>نصف العلم</strong>، فقال: «تعلّموا الفرائض وعلّموها الناس، فإنه نصف العلم وهو أول علم يُنزع من أمتي». ويُعنى هذا العلم بتحديد أنصبة الورثة وتوزيع التركة وفق ما شرعه الله تعالى في كتابه الكريم، دون زيادة أو نقصان.
</p>

<p class="mb-4 leading-[1.9]">
تتجلّى عظمة هذا العلم في أن الله سبحانه وتعالى تولّى بنفسه تفصيل أحكامه في القرآن الكريم، ولم يتركها لاجتهاد البشر، وذلك لما فيها من حقوق متعددة ومتشعبة تحتاج إلى ميزان دقيق لا يظلم أحدًا. وفي هذا المقال نقدم دليلًا شاملًا يساعدك على فهم أحكام المواريث وتوزيع التركة الشرعية خطوة بخطوة.
</p>

<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">الأساس القرآني لأحكام المواريث</h2>

<p class="mb-4 leading-[1.9]">
جاءت أحكام المواريث مفصّلة في ثلاث آيات رئيسية من سورة النساء، تُعرف بآيات المواريث. وهي الآيات 11 و12 و176، التي حددت أنصبة كل وارث بدقة متناهية.
</p>

<div class="bg-amber-50 dark:bg-amber-900/10 border-r-4 border-amber-500 p-4 rounded-lg my-6">
<p class="mb-2 leading-[1.9]">
<strong>قال الله تعالى:</strong> ﴿يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ فَإِن كُنَّ نِسَاءً فَوْقَ اثْنَتَيْنِ فَلَهُنَّ ثُلُثَا مَا تَرَكَ وَإِن كَانَتْ وَاحِدَةً فَلَهَا النِّصْفُ وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُ وَلَدٌ فَإِن لَّمْ يَكُن لَّهُ وَلَدٌ وَوَرِثَهُ أَبَوَاهُ فَلِأُمِّهِ الثُّلُثُ﴾
</p>
<p class="text-sm text-amber-700 dark:text-amber-400">— سورة النساء، الآية 11</p>
</div>

<p class="mb-4 leading-[1.9]">
وختم الله سبحانه آيات المواريث بقوله: ﴿تِلْكَ حُدُودُ اللَّهِ وَمَن يُطِعِ اللَّهَ وَرَسُولَهُ يُدْخِلْهُ جَنَّاتٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا وَذَٰلِكَ الْفَوْزُ الْعَظِيمُ﴾، مما يدل على عِظم شأن هذه الأحكام ووجوب الالتزام بها.
</p>

<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">ترتيب توزيع التركة: أربع خطوات قبل تقسيم الميراث</h2>

<p class="mb-4 leading-[1.9]">
قبل الشروع في تقسيم الميراث بين الورثة، يجب مراعاة ترتيب معيّن في التصرف بالتركة، وهو كالتالي:
</p>

<ol class="list-decimal list-inside space-y-2 mb-4 mr-4">
<li><strong>تجهيز الميت ودفنه:</strong> تُخرج نفقات الغسل والتكفين والدفن من التركة أولًا.</li>
<li><strong>سداد الديون:</strong> تُقضى جميع الديون المتعلقة بالتركة، سواء كانت ديونًا لله (كالزكاة والكفارات) أو ديونًا للعباد.</li>
<li><strong>تنفيذ الوصية:</strong> تُنفّذ وصية الميت بشرط ألّا تتجاوز <strong>ثُلث التركة</strong>، ولا تجوز الوصية لوارث إلا بإذن الورثة.</li>
<li><strong>تقسيم الباقي بين الورثة:</strong> يُوزّع ما تبقى من التركة على المستحقين وفق الأنصبة الشرعية المحددة.</li>
</ol>

<div class="bg-green-50 dark:bg-green-900/10 border-r-4 border-green-500 p-4 rounded-lg my-6">
<p class="leading-[1.9]">
<strong>ملاحظة مهمة:</strong> كثير من الناس يظن أن الميراث يُقسم مباشرة بعد الوفاة، لكن الصحيح أن هناك حقوقًا مقدّمة على الإرث يجب الوفاء بها أولًا. فلا يُقسم الميراث إلا بعد استيفاء الخطوات الثلاث الأولى.
</p>
</div>

<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">أصحاب الفروض المقدّرة</h2>

<p class="mb-4 leading-[1.9]">
أصحاب الفروض هم الورثة الذين حدّد لهم الشرع أنصبة ثابتة ومعيّنة. والفروض المقدّرة في كتاب الله ستة، وهي: النصف (½)، والربع (¼)، والثمن (⅛)، والثلثان (⅔)، والثلث (⅓)، والسدس (⅙). وفيما يلي جدول يوضّح هذه الفروض ومن يستحقها:
</p>

<div class="overflow-x-auto my-6"><table class="w-full text-sm border-collapse"><thead><tr class="bg-gray-100 dark:bg-gray-800">
<th class="border border-gray-300 dark:border-gray-600 p-2 text-right">الفرض</th>
<th class="border border-gray-300 dark:border-gray-600 p-2 text-right">المستحقون</th>
</tr></thead><tbody>
<tr><td class="border border-gray-300 dark:border-gray-600 p-2"><strong>النصف (½)</strong></td><td class="border border-gray-300 dark:border-gray-600 p-2">الزوج (عند عدم وجود فرع وارث) — البنت الواحدة — بنت الابن الواحدة — الأخت الشقيقة الواحدة — الأخت لأب الواحدة</td></tr>
<tr><td class="border border-gray-300 dark:border-gray-600 p-2"><strong>الربع (¼)</strong></td><td class="border border-gray-300 dark:border-gray-600 p-2">الزوج (مع وجود فرع وارث) — الزوجة (عند عدم وجود فرع وارث)</td></tr>
<tr><td class="border border-gray-300 dark:border-gray-600 p-2"><strong>الثمن (⅛)</strong></td><td class="border border-gray-300 dark:border-gray-600 p-2">الزوجة أو الزوجات (مع وجود فرع وارث)</td></tr>
<tr><td class="border border-gray-300 dark:border-gray-600 p-2"><strong>الثلثان (⅔)</strong></td><td class="border border-gray-300 dark:border-gray-600 p-2">البنتان فأكثر — بنتا الابن فأكثر — الأختان الشقيقتان فأكثر — الأختان لأب فأكثر</td></tr>
<tr><td class="border border-gray-300 dark:border-gray-600 p-2"><strong>الثلث (⅓)</strong></td><td class="border border-gray-300 dark:border-gray-600 p-2">الأم (عند عدم وجود فرع وارث ولا عدد من الإخوة) — الاثنان فأكثر من أولاد الأم</td></tr>
<tr><td class="border border-gray-300 dark:border-gray-600 p-2"><strong>السدس (⅙)</strong></td><td class="border border-gray-300 dark:border-gray-600 p-2">الأب (مع وجود فرع وارث) — الأم (مع فرع وارث أو عدد من الإخوة) — الجدة — بنت الابن (مع البنت) — الأخت لأب (مع الشقيقة) — الواحد من أولاد الأم</td></tr>
</tbody></table></div>

<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">العصبات (التعصيب)</h2>

<p class="mb-4 leading-[1.9]">
العصبة هم الورثة الذين ليس لهم فرض مقدّر، وإنما يأخذون ما بقي من التركة بعد أصحاب الفروض. وإذا لم يبقَ شيء فلا شيء لهم. وتنقسم العصبات إلى ثلاثة أنواع:
</p>

<h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">1. عصبة بالنفس</h3>
<p class="mb-4 leading-[1.9]">
وهم الذكور الذين ينتسبون إلى الميت بدون أنثى، وترتيبهم: الابن، ثم ابن الابن وإن نزل، ثم الأب، ثم الجد، ثم الأخ الشقيق، ثم الأخ لأب، ثم ابن الأخ الشقيق، ثم ابن الأخ لأب، ثم العم الشقيق، ثم العم لأب، ثم ابن العم الشقيق، ثم ابن العم لأب.
</p>

<h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">2. عصبة بالغير</h3>
<p class="mb-4 leading-[1.9]">
وهنّ الإناث اللواتي يصبحن عصبة بوجود أخيهن الذكر. مثل: البنت مع الابن، وبنت الابن مع ابن الابن، والأخت الشقيقة مع الأخ الشقيق، والأخت لأب مع الأخ لأب. وفي هذه الحالة يُقسم الباقي بينهم <strong>للذكر مثل حظ الأنثيين</strong>.
</p>

<h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">3. عصبة مع الغير</h3>
<p class="mb-4 leading-[1.9]">
وهي الأخت الشقيقة أو الأخت لأب عندما ترث مع البنت أو بنت الابن. ففي هذه الحالة تأخذ الأخت الباقي بعد أصحاب الفروض كأنها أخ.
</p>

<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">قواعد الحجب</h2>

<p class="mb-4 leading-[1.9]">
الحجب هو منع وارث من إرثه كليًا أو جزئيًا بسبب وجود وارث آخر أقرب للميت. وينقسم إلى نوعين:
</p>

<h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">حجب الحرمان (الإسقاط)</h3>
<p class="mb-4 leading-[1.9]">
وهو منع الوارث من الإرث كليًا. مثال ذلك: الابن يحجب ابن الابن، والأب يحجب الجد، والأخ الشقيق يحجب الأخ لأب. والقاعدة العامة هي أن <strong>كل من أدلى بواسطة حُجِب بها</strong>، أي أن ابن الابن يُحجب بالابن لأنه يُدلي بواسطته.
</p>

<h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">حجب النقصان</h3>
<p class="mb-4 leading-[1.9]">
وهو انتقال الوارث من فرض أكبر إلى فرض أصغر. مثال ذلك: الزوج ينتقل من النصف إلى الربع عند وجود فرع وارث، والأم تنتقل من الثلث إلى السدس عند وجود فرع وارث أو عدد من الإخوة.
</p>

<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">العول والرد</h2>

<h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">العول</h3>
<p class="mb-4 leading-[1.9]">
العول هو زيادة في سهام أصحاب الفروض عن أصل المسألة، بحيث تضيق التركة عن الوفاء بجميع الأنصبة. والحل في هذه الحالة هو <strong>زيادة أصل المسألة</strong> ليتسع لجميع السهام، فينقص نصيب كل وارث بنسبة متساوية.
</p>

<p class="mb-4 leading-[1.9]">
<strong>مثال على العول:</strong> توفيت امرأة وتركت: زوجًا وأختين شقيقتين وأمًا. الزوج له النصف (3 من 6)، والأختان لهما الثلثان (4 من 6)، والأم لها السدس (1 من 6). المجموع = 8، لكن أصل المسألة 6. فتعول المسألة إلى 8، ويأخذ كل وارث نصيبه من 8 بدلًا من 6.
</p>

<h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">الرد</h3>
<p class="mb-4 leading-[1.9]">
الرد هو عكس العول، ويحدث عندما يفيض من التركة شيء بعد توزيع الأنصبة على أصحاب الفروض ولا يوجد عاصب. في هذه الحالة <strong>يُردّ الباقي على أصحاب الفروض</strong> بنسبة أنصبتهم، ما عدا الزوجين فلا يُردّ عليهما عند جمهور العلماء.
</p>

<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">أمثلة عملية محلولة</h2>

<h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">المثال الأول: زوجة وثلاثة أبناء</h3>
<p class="mb-4 leading-[1.9]">
توفي رجل وترك: زوجة و3 أبناء. التركة بعد الديون والوصية: 800,000 ريال.
</p>
<ul class="list-disc list-inside space-y-1 mb-4 mr-4">
<li><strong>الزوجة:</strong> لها الثمن (⅛) لوجود فرع وارث = 100,000 ريال.</li>
<li><strong>الأبناء الثلاثة:</strong> عصبة بالنفس، يقتسمون الباقي (700,000) بالتساوي = 233,333 ريال لكل ابن.</li>
</ul>

<h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">المثال الثاني: زوج وبنتان وأب</h3>
<p class="mb-4 leading-[1.9]">
توفيت امرأة وتركت: زوجًا وبنتين وأبًا. التركة: 600,000 ريال. أصل المسألة 12.
</p>
<ul class="list-disc list-inside space-y-1 mb-4 mr-4">
<li><strong>الزوج:</strong> الربع (¼) = 3 أسهم من 12.</li>
<li><strong>البنتان:</strong> الثلثان (⅔) = 8 أسهم من 12.</li>
<li><strong>الأب:</strong> السدس (⅙) = 2 أسهم من 12.</li>
<li>المجموع = 13 سهمًا (عالت المسألة من 12 إلى 13).</li>
<li><strong>نصيب الزوج:</strong> 3/13 × 600,000 = 138,461 ريال.</li>
<li><strong>نصيب البنتين:</strong> 8/13 × 600,000 = 369,230 ريال (لكل بنت 184,615 ريال).</li>
<li><strong>نصيب الأب:</strong> 2/13 × 600,000 = 92,307 ريال.</li>
</ul>

<h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">المثال الثالث: المسألة العُمَرية</h3>
<p class="mb-4 leading-[1.9]">
وهي مسألة شهيرة قضى فيها عمر بن الخطاب رضي الله عنه. إذا توفي شخص وترك: زوجًا (أو زوجة) وأمًا وأبًا.
</p>
<ul class="list-disc list-inside space-y-1 mb-4 mr-4">
<li><strong>في حالة الزوج:</strong> يأخذ الزوج النصف (½)، ثم تأخذ الأم ثلث الباقي (⅙ من الأصل)، والأب يأخذ الباقي (⅓). وذلك حتى لا تأخذ الأم أكثر من الأب.</li>
<li><strong>في حالة الزوجة:</strong> تأخذ الزوجة الربع (¼)، ثم تأخذ الأم ثلث الباقي (¼ من الأصل)، والأب يأخذ الباقي (½).</li>
</ul>

<div class="bg-green-50 dark:bg-green-900/10 border-r-4 border-green-500 p-4 rounded-lg my-6">
<p class="leading-[1.9]">
<strong>لماذا سُمّيت بالعُمَرية؟</strong> لأن عمر بن الخطاب رضي الله عنه هو أول من قضى فيها بهذا الحكم، حيث أعطى الأم ثلث الباقي بدلًا من ثلث التركة كاملةً، حتى لا يكون نصيب الأم أكبر من نصيب الأب، وهو ما أخذ به جمهور الفقهاء.
</p>
</div>

<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">إجراءات تقسيم الميراث في المملكة العربية السعودية</h2>

<p class="mb-4 leading-[1.9]">
تتيح المملكة العربية السعودية عدة طرق لتقسيم التركة وتوثيق حقوق الورثة، ومن أبرزها:
</p>

<ul class="list-disc list-inside space-y-2 mb-4 mr-4">
<li><strong>منصة ناجز:</strong> يمكنك إلكترونيًا عبر بوابة ناجز (najiz.sa) التابعة لوزارة العدل تقديم طلب حصر ورثة، والحصول على صك حصر الورثة دون الحاجة لزيارة المحكمة.</li>
<li><strong>المحكمة الشرعية (محكمة الأحوال الشخصية):</strong> في حال وجود نزاع بين الورثة، يمكن رفع دعوى قسمة إجبارية أمام المحكمة المختصة.</li>
<li><strong>صك حصر الورثة:</strong> وثيقة رسمية تصدر من المحكمة أو عبر ناجز تحدد جميع الورثة الشرعيين وصلة قرابتهم بالمتوفى.</li>
<li><strong>قسمة التراضي:</strong> إذا اتفق جميع الورثة البالغين الراشدين على طريقة معينة للقسمة، يمكن توثيقها رسميًا عبر كاتب العدل.</li>
</ul>

<div class="bg-amber-50 dark:bg-amber-900/10 border-r-4 border-amber-500 p-4 rounded-lg my-6">
<p class="leading-[1.9]">
<strong>تنبيه شرعي:</strong> قال الله تعالى: ﴿وَمَن يَعْصِ اللَّهَ وَرَسُولَهُ وَيَتَعَدَّ حُدُودَهُ يُدْخِلْهُ نَارًا خَالِدًا فِيهَا وَلَهُ عَذَابٌ مُّهِينٌ﴾ (النساء: 14). فتقسيم الميراث وفق الشرع ليس اختياريًا بل هو فرض واجب على كل مسلم، وتأخير التقسيم أو حرمان بعض الورثة من حقوقهم من كبائر الذنوب.
</p>
</div>

<p class="mb-4 leading-[1.9]">
إن علم الفرائض علم دقيق يحتاج إلى حسابات رياضية وفهم عميق لأحكام الشريعة. ولتسهيل هذه العملية، يمكنك الاستعانة بحاسبة المواريث الشرعية التي تقوم بالحسابات تلقائيًا وفق أحكام الفقه الإسلامي.
</p>

<div class="bg-gradient-to-l from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-2 border-green-200 dark:border-green-800/40 rounded-2xl p-6 text-center my-8">
<p class="text-lg font-bold text-green-800 dark:text-green-300 mb-2">حاسبة المواريث الشرعية</p>
<p class="text-gray-600 dark:text-gray-400 mb-4">أدخل بيانات الورثة واحصل على التقسيم الشرعي الصحيح فورًا وفق أحكام الفرائض الإسلامية</p>
<a href="/ar/calculators/inheritance" class="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">جرّب حاسبة المواريث الآن</a>
</div>
`,
};

export default article;
