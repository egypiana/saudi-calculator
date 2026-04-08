import type { BlogArticle } from "../types";

const article: BlogArticle = {
  slug: "end-of-service",
  titleAr: "حساب مكافأة نهاية الخدمة حسب نظام العمل السعودي",
  titleEn: "Calculate End-of-Service Benefits Under Saudi Labor Law",
  descriptionAr: "دليل شامل لحساب مكافأة نهاية الخدمة في السعودية — المعادلات الرسمية، حالات الاستقالة والفصل والعقود المحددة، مع أمثلة عملية ونصائح.",
  descriptionEn: "Complete guide to calculating end-of-service benefits in Saudi Arabia — official formulas, resignation vs termination cases.",
  category: "مالي",
  readTime: 8,
  publishDate: "2026-02-10",
  keywords: ["مكافأة نهاية الخدمة", "حساب نهاية الخدمة", "نظام العمل السعودي", "مكافأة نهاية الخدمة استقالة", "حقوق الموظف السعودي"],
  icon: "🏢",
  relatedSlugs: ["mortgage-calculation", "inheritance-calculation", "fuel-consumption"],
  relatedCalculator: { href: "/calculators/end-of-service", labelAr: "حاسبة مكافأة نهاية الخدمة" },
  content: `
<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">مقدمة — لماذا يجب أن تعرف حقوقك؟</h2>

<p class="mb-4 leading-[1.9]">
تُعدّ مكافأة نهاية الخدمة من أهم الحقوق المالية التي كفلها <strong>نظام العمل السعودي</strong> للعامل عند انتهاء علاقته التعاقدية مع صاحب العمل. ومع ذلك، يجهل كثير من الموظفين في المملكة العربية السعودية كيفية حساب هذه المكافأة والشروط المرتبطة بها، مما قد يؤدي إلى ضياع حقوق مالية مستحقة لهم. في هذا الدليل الشامل، سنشرح لك كل ما تحتاج معرفته عن مكافأة نهاية الخدمة — من المعادلات الرسمية إلى الحالات الخاصة والأمثلة العملية — لتكون على دراية كاملة بحقوقك.
</p>

<div class="bg-blue-50 dark:bg-blue-900/10 border-r-4 border-blue-500 p-4 rounded-lg my-6">
<p class="mb-0 leading-[1.9]"><strong>📘 أساس قانوني:</strong> تنظّم المواد <strong>84 و85 و86</strong> من نظام العمل السعودي أحكام مكافأة نهاية الخدمة، وتحدد طريقة الحساب وحالات الاستحقاق الكامل والجزئي.</p>
</div>

<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">ما هي مكافأة نهاية الخدمة؟</h2>

<p class="mb-4 leading-[1.9]">
مكافأة نهاية الخدمة هي مبلغ مالي يلتزم صاحب العمل بدفعه للعامل عند انتهاء عقد العمل، سواء كان العقد محدد المدة أو غير محدد المدة. وتُحتسب هذه المكافأة بناءً على <strong>مدة خدمة العامل</strong> و<strong>آخر أجر كان يتقاضاه</strong>، وتهدف إلى تأمين العامل مادياً خلال فترة انتقاله بين الوظائف.
</p>

<p class="mb-4 leading-[1.9]">
وفقاً لـ<strong>المادة 84</strong> من نظام العمل، يستحق العامل مكافأة نهاية خدمة عند انتهاء علاقة العمل، ويلتزم صاحب العمل بدفعها. وتُعد هذه المكافأة حقاً مكتسباً للعامل لا يجوز التنازل عنه أو الاتفاق على مخالفته بما ينقص من حقوق العامل.
</p>

<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">المعادلة الأساسية لحساب المكافأة</h2>

<p class="mb-4 leading-[1.9]">
يتم حساب مكافأة نهاية الخدمة وفق المعادلة التالية المنصوص عليها في <strong>المادة 84</strong>:
</p>

<div class="bg-green-50 dark:bg-green-900/10 border-r-4 border-green-500 p-4 rounded-lg my-6">
<p class="mb-2 leading-[1.9]"><strong>معادلة الحساب:</strong></p>
<ul>
<li><strong>السنوات الخمس الأولى:</strong> أجر نصف شهر عن كل سنة من سنوات الخدمة</li>
<li><strong>ما زاد عن خمس سنوات:</strong> أجر شهر كامل عن كل سنة من السنوات التالية</li>
<li>يُحتسب جزء السنة بنسبته من المكافأة</li>
</ul>
</div>

<p class="mb-4 leading-[1.9]">
بمعنى آخر، إذا عمل الموظف 8 سنوات براتب شهري 10,000 ريال، فإن المكافأة تُحسب كالتالي: (5 سنوات × 5,000 ريال) + (3 سنوات × 10,000 ريال) = 25,000 + 30,000 = <strong>55,000 ريال</strong>.
</p>

<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">حالات الاستحقاق الكامل للمكافأة</h2>

<p class="mb-4 leading-[1.9]">
يستحق العامل مكافأة نهاية الخدمة <strong>كاملة</strong> (دون أي خصم) في الحالات التالية:
</p>

<ul>
<li class="mb-2"><strong>إنهاء العقد من قبل صاحب العمل:</strong> سواء كان الفصل بسبب أو بدون سبب مشروع (باستثناء الحالات المنصوص عليها في المادة 80)</li>
<li class="mb-2"><strong>انتهاء مدة العقد المحدد:</strong> عند انتهاء مدة العقد المحدد وعدم تجديده</li>
<li class="mb-2"><strong>الاستقالة بعد 10 سنوات أو أكثر:</strong> يستحق العامل المستقيل المكافأة كاملة إذا بلغت خدمته عشر سنوات فأكثر</li>
<li class="mb-2"><strong>ترك العمل بسبب قوة قاهرة:</strong> خارجة عن إرادة العامل</li>
<li class="mb-2"><strong>إنهاء العقد لأحد الأسباب الواردة في المادة 81:</strong> مثل إخلال صاحب العمل بالتزاماته التعاقدية أو الغش أو العنف</li>
</ul>

<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">مكافأة نهاية الخدمة في حالة الاستقالة</h2>

<p class="mb-4 leading-[1.9]">
وفقاً لـ<strong>المادة 85</strong> من نظام العمل، إذا كان انتهاء علاقة العمل بسبب استقالة العامل، فإن نسبة المكافأة تختلف حسب مدة الخدمة:
</p>

<div class="overflow-x-auto my-6"><table class="w-full text-sm border-collapse"><thead><tr class="bg-gray-100 dark:bg-gray-800"><th class="border border-gray-300 dark:border-gray-600 p-3 text-right">مدة الخدمة</th><th class="border border-gray-300 dark:border-gray-600 p-3 text-right">نسبة المكافأة</th><th class="border border-gray-300 dark:border-gray-600 p-3 text-right">التفاصيل</th></tr></thead><tbody>
<tr><td class="border border-gray-300 dark:border-gray-600 p-3">أقل من سنتين</td><td class="border border-gray-300 dark:border-gray-600 p-3"><strong>لا شيء</strong></td><td class="border border-gray-300 dark:border-gray-600 p-3">لا يستحق العامل أي مكافأة</td></tr>
<tr class="bg-gray-50 dark:bg-gray-800/50"><td class="border border-gray-300 dark:border-gray-600 p-3">من سنتين إلى 5 سنوات</td><td class="border border-gray-300 dark:border-gray-600 p-3"><strong>ثُلث المكافأة</strong></td><td class="border border-gray-300 dark:border-gray-600 p-3">يحصل على ثلث المكافأة المحسوبة</td></tr>
<tr><td class="border border-gray-300 dark:border-gray-600 p-3">من 5 إلى 10 سنوات</td><td class="border border-gray-300 dark:border-gray-600 p-3"><strong>ثُلثا المكافأة</strong></td><td class="border border-gray-300 dark:border-gray-600 p-3">يحصل على ثلثي المكافأة المحسوبة</td></tr>
<tr class="bg-gray-50 dark:bg-gray-800/50"><td class="border border-gray-300 dark:border-gray-600 p-3">10 سنوات فأكثر</td><td class="border border-gray-300 dark:border-gray-600 p-3"><strong>المكافأة كاملة</strong></td><td class="border border-gray-300 dark:border-gray-600 p-3">يحصل على كامل المكافأة</td></tr>
</tbody></table></div>

<div class="bg-amber-50 dark:bg-amber-900/10 border-r-4 border-amber-500 p-4 rounded-lg my-6">
<p class="mb-0 leading-[1.9]"><strong>⚠️ تنبيه مهم:</strong> هذه النسب تنطبق فقط على حالة <strong>الاستقالة</strong> في العقود غير المحددة المدة. أما إذا أنهى صاحب العمل العقد، فيستحق العامل المكافأة كاملة بغض النظر عن مدة الخدمة.</p>
</div>

<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">الحالات الخاصة لمكافأة نهاية الخدمة</h2>

<h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">استقالة المرأة العاملة بسبب الزواج أو الإنجاب</h3>

<p class="mb-4 leading-[1.9]">
وفقاً لـ<strong>المادة 87</strong> من نظام العمل، تستحق المرأة العاملة مكافأة نهاية الخدمة <strong>كاملة</strong> إذا أنهت عقد عملها خلال <strong>ستة أشهر</strong> من تاريخ عقد زواجها أو خلال <strong>ثلاثة أشهر</strong> من تاريخ وضعها (الإنجاب)، وذلك بغض النظر عن مدة خدمتها. وهذا استثناء مهم يحمي حقوق المرأة العاملة في المملكة.
</p>

<h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">القوة القاهرة</h3>

<p class="mb-4 leading-[1.9]">
إذا ترك العامل العمل نتيجة <strong>قوة قاهرة</strong> خارجة عن إرادته — كالكوارث الطبيعية أو الظروف الاستثنائية — فإنه يستحق المكافأة كاملة وفقاً لنظام العمل. ويُقصد بالقوة القاهرة الحدث الذي لا يمكن توقعه أو دفعه.
</p>

<h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">حالات المادة 81 — ترك العمل دون إشعار</h3>

<p class="mb-4 leading-[1.9]">
يحق للعامل ترك العمل دون إشعار مع الاحتفاظ بحقوقه النظامية كاملة في عدة حالات منها: عدم وفاء صاحب العمل بالتزاماته التعاقدية، أو ثبوت غش صاحب العمل عند التعاقد، أو تكليف العامل بعمل مختلف جوهرياً عن المتفق عليه، أو وقوع اعتداء أو سلوك مخل من صاحب العمل أو ممثله، أو وجود خطر جسيم يهدد سلامة العامل في مكان العمل.
</p>

<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">أمثلة عملية لحساب المكافأة</h2>

<h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">المثال الأول: موظف أنهى صاحب العمل عقده بعد 8 سنوات</h3>

<div class="bg-green-50 dark:bg-green-900/10 border-r-4 border-green-500 p-4 rounded-lg my-6">
<p class="mb-2 leading-[1.9]"><strong>البيانات:</strong> راتب شهري 12,000 ريال — مدة الخدمة 8 سنوات — إنهاء من صاحب العمل</p>
<p class="mb-2 leading-[1.9]"><strong>الحساب:</strong></p>
<ul>
<li>السنوات الخمس الأولى: 5 × (12,000 ÷ 2) = 5 × 6,000 = <strong>30,000 ريال</strong></li>
<li>السنوات الثلاث التالية: 3 × 12,000 = <strong>36,000 ريال</strong></li>
<li>إجمالي المكافأة: 30,000 + 36,000 = <strong>66,000 ريال</strong></li>
</ul>
<p class="mb-0 leading-[1.9]">يستحق المكافأة <strong>كاملة</strong> لأن الإنهاء كان من صاحب العمل.</p>
</div>

<h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">المثال الثاني: موظف استقال بعد 4 سنوات</h3>

<div class="bg-green-50 dark:bg-green-900/10 border-r-4 border-green-500 p-4 rounded-lg my-6">
<p class="mb-2 leading-[1.9]"><strong>البيانات:</strong> راتب شهري 10,000 ريال — مدة الخدمة 4 سنوات — استقالة</p>
<p class="mb-2 leading-[1.9]"><strong>الحساب:</strong></p>
<ul>
<li>المكافأة الكاملة: 4 × (10,000 ÷ 2) = 4 × 5,000 = <strong>20,000 ريال</strong></li>
<li>بما أن الخدمة بين سنتين و5 سنوات واستقال الموظف، يستحق <strong>ثلث المكافأة</strong></li>
<li>المبلغ المستحق: 20,000 ÷ 3 = <strong>6,667 ريال تقريباً</strong></li>
</ul>
</div>

<h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">المثال الثالث: موظفة استقالت بسبب الزواج بعد 3 سنوات</h3>

<div class="bg-green-50 dark:bg-green-900/10 border-r-4 border-green-500 p-4 rounded-lg my-6">
<p class="mb-2 leading-[1.9]"><strong>البيانات:</strong> راتب شهري 8,000 ريال — مدة الخدمة 3 سنوات — استقالة خلال 6 أشهر من الزواج</p>
<p class="mb-2 leading-[1.9]"><strong>الحساب:</strong></p>
<ul>
<li>المكافأة الكاملة: 3 × (8,000 ÷ 2) = 3 × 4,000 = <strong>12,000 ريال</strong></li>
<li>بما أن الاستقالة كانت بسبب الزواج خلال المهلة النظامية، تستحق المكافأة <strong>كاملة</strong></li>
<li>المبلغ المستحق: <strong>12,000 ريال</strong></li>
</ul>
</div>

<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">ما الذي يُحتسب في الراتب لغرض المكافأة؟</h2>

<p class="mb-4 leading-[1.9]">
عند حساب مكافأة نهاية الخدمة، يُؤخذ في الاعتبار <strong>آخر أجر فعلي</strong> كان يتقاضاه العامل. ويشمل هذا الأجر وفقاً لنظام العمل السعودي:
</p>

<ul>
<li class="mb-2"><strong>الراتب الأساسي:</strong> وهو الأجر المتفق عليه في عقد العمل</li>
<li class="mb-2"><strong>بدل السكن:</strong> سواء كان نقدياً أو عينياً (يُقدر بما يعادل أجر شهرين في السنة إذا كان عينياً)</li>
<li class="mb-2"><strong>بدل النقل (المواصلات):</strong> إذا كان منصوصاً عليه في العقد أو يُصرف بانتظام</li>
<li class="mb-2"><strong>العمولات والنسب المئوية:</strong> إذا كانت محددة المقدار ومستمرة</li>
<li class="mb-2"><strong>المزايا العينية:</strong> التي يلتزم بها صاحب العمل ويمكن تقديرها نقدياً</li>
</ul>

<div class="bg-amber-50 dark:bg-amber-900/10 border-r-4 border-amber-500 p-4 rounded-lg my-6">
<p class="mb-0 leading-[1.9]"><strong>⚠️ ملاحظة:</strong> لا تُحتسب المكافآت الاستثنائية أو العلاوات غير المنتظمة أو بدل ساعات العمل الإضافية ضمن الأجر المعتمد لحساب مكافأة نهاية الخدمة. يُعتمد فقط على الأجر الفعلي الثابت والمنتظم.</p>
</div>

<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">حقوق إضافية عند نهاية الخدمة</h2>

<p class="mb-4 leading-[1.9]">
إلى جانب مكافأة نهاية الخدمة، يحق للعامل عند انتهاء علاقة العمل الحصول على عدة حقوق إضافية:
</p>

<ul>
<li class="mb-2"><strong>بدل الإجازات غير المستخدمة:</strong> يحق للعامل الحصول على أجر عن أيام الإجازة السنوية المستحقة التي لم يستخدمها، وتُحسب على أساس آخر أجر كان يتقاضاه</li>
<li class="mb-2"><strong>شهادة الخبرة:</strong> يلتزم صاحب العمل بمنح العامل شهادة خبرة مجانية تتضمن تاريخ التحاقه بالعمل وتاريخ انتهاء خدمته ومهنته وآخر أجر تقاضاه، ولا يجوز تضمينها ما يسيء إلى سمعة العامل</li>
<li class="mb-2"><strong>مهلة البحث عن عمل:</strong> في حالة إنهاء العقد غير المحدد من صاحب العمل، يحق للعامل التغيب خلال فترة الإشعار يوماً كاملاً في الأسبوع أو ثماني ساعات أسبوعياً للبحث عن عمل آخر مع استحقاق أجره عن تلك الأيام</li>
<li class="mb-2"><strong>تصفية المستحقات:</strong> يلتزم صاحب العمل بدفع أجر العامل وتصفية جميع حقوقه خلال أسبوع من تاريخ انتهاء العلاقة العقدية إذا كان الإنهاء من صاحب العمل، وخلال أسبوعين إذا كان الإنهاء من العامل</li>
</ul>

<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">كيفية المطالبة بمكافأة نهاية الخدمة</h2>

<p class="mb-4 leading-[1.9]">
إذا رفض صاحب العمل دفع مكافأة نهاية الخدمة أو أنقص من قيمتها، يمكنك اتباع الخطوات التالية للمطالبة بحقوقك:
</p>

<ol>
<li class="mb-3">
<strong>التسوية الودية:</strong> حاول أولاً التواصل مع صاحب العمل أو إدارة الموارد البشرية بشكل رسمي ومكتوب للمطالبة بحقوقك. وثّق جميع المراسلات واحتفظ بنسخ منها.
</li>
<li class="mb-3">
<strong>تقديم شكوى لمكتب العمل:</strong> إذا لم تنجح التسوية الودية، يمكنك تقديم شكوى عبر منصة <strong>ودّي</strong> الإلكترونية التابعة لوزارة الموارد البشرية والتنمية الاجتماعية. يحاول مكتب العمل الصلح بين الطرفين خلال 21 يوماً.
</li>
<li class="mb-3">
<strong>المحكمة العمالية:</strong> في حال عدم التوصل لاتفاق عبر مكتب العمل، تُحال القضية إلى <strong>المحكمة العمالية</strong> للفصل فيها. ويحق لك تقديم الدعوى خلال <strong>12 شهراً</strong> من تاريخ انتهاء العلاقة العمالية. والمحاكم العمالية في السعودية مجانية ولا تتطلب محامياً.
</li>
</ol>

<div class="bg-blue-50 dark:bg-blue-900/10 border-r-4 border-blue-500 p-4 rounded-lg my-6">
<p class="mb-0 leading-[1.9]"><strong>📘 نصيحة قانونية:</strong> احتفظ دائماً بنسخة من عقد العمل وكشوف الرواتب وأي مراسلات مع صاحب العمل. هذه المستندات ستكون دليلاً قوياً في حال اللجوء إلى الجهات المختصة للمطالبة بحقوقك.</p>
</div>

<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">حالات لا يستحق فيها العامل المكافأة</h2>

<p class="mb-4 leading-[1.9]">
حددت <strong>المادة 80</strong> من نظام العمل السعودي حالات يحق فيها لصاحب العمل فسخ العقد دون مكافأة أو إشعار أو تعويض، وتشمل:
</p>

<ul>
<li class="mb-2">وقوع اعتداء من العامل على صاحب العمل أو المدير أو أحد الزملاء أثناء العمل</li>
<li class="mb-2">عدم أداء العامل التزاماته الجوهرية أو عدم إطاعة الأوامر المشروعة بعد الإنذار الكتابي</li>
<li class="mb-2">ثبوت اتباع العامل سلوكاً سيئاً أو ارتكابه عملاً مخلاً بالشرف أو الأمانة</li>
<li class="mb-2">تعمد العامل إلحاق خسارة مادية بصاحب العمل بشرط إبلاغ الجهات المختصة خلال 24 ساعة</li>
<li class="mb-2">ثبوت لجوء العامل إلى التزوير للحصول على العمل</li>
<li class="mb-2">التغيب دون سبب مشروع أكثر من 30 يوماً متفرقة أو 15 يوماً متتالية في السنة مع الإنذار الكتابي</li>
<li class="mb-2">إفشاء الأسرار التجارية أو الصناعية لصاحب العمل</li>
</ul>

<div class="bg-amber-50 dark:bg-amber-900/10 border-r-4 border-amber-500 p-4 rounded-lg my-6">
<p class="mb-0 leading-[1.9]"><strong>⚠️ تنبيه:</strong> حتى في حالات المادة 80، إذا رأى العامل أن الفصل تعسفي وغير مبرر، يحق له الطعن أمام المحكمة العمالية. ويقع عبء الإثبات على صاحب العمل لإثبات وجود سبب مشروع للفصل.</p>
</div>

<h2 class="text-xl font-bold text-green-800 dark:text-green-400 mt-8 mb-3">نصائح مهمة للموظفين</h2>

<ul>
<li class="mb-2">اطلب نسخة من عقد عملك واحتفظ بها في مكان آمن</li>
<li class="mb-2">تأكد من تسجيلك في نظام <strong>التأمينات الاجتماعية</strong> لأن مدة الاشتراك تؤثر على حقوقك</li>
<li class="mb-2">احتفظ بكشوف الرواتب الشهرية كإثبات لآخر أجر تقاضيته</li>
<li class="mb-2">لا توقع على أي مخالصة نهائية إلا بعد التأكد من حصولك على كامل حقوقك</li>
<li class="mb-2">استخدم حاسبة مكافأة نهاية الخدمة لمعرفة المبلغ التقريبي المستحق لك قبل التفاوض</li>
<li class="mb-2">تذكر أن مدة التقادم للمطالبة بالحقوق العمالية هي <strong>12 شهراً</strong> من تاريخ انتهاء العلاقة</li>
</ul>

<div class="bg-gradient-to-l from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-2 border-green-200 dark:border-green-800/40 rounded-2xl p-6 text-center my-8">
<p class="text-lg font-bold mb-2">احسب مكافأتك الآن بدقة!</p>
<p class="mb-4 leading-[1.9]">استخدم حاسبة مكافأة نهاية الخدمة لحساب المبلغ المستحق لك بناءً على راتبك ومدة خدمتك وسبب انتهاء العلاقة — بشكل فوري ومجاني وفق نظام العمل السعودي.</p>
<a href="/ar/calculators/end-of-service" class="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-colors text-lg">حاسبة مكافأة نهاية الخدمة ←</a>
</div>
`,
};

export default article;
