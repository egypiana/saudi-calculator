"use client";

import { useLocale } from "next-intl";

function ArabicContent() {
  return (
    <article dir="rtl" className="space-y-6">
      {/* Section 1 */}
      <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">
          نظام صرف الرواتب في المملكة العربية السعودية
        </h2>
        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-[1.9] space-y-4">
          <p>
            تُشرف <strong>وزارة المالية</strong> في المملكة العربية السعودية على نظام صرف الرواتب لجميع
            موظفي القطاع الحكومي، وتُصرف الرواتب عادةً في اليوم <strong>27 من كل شهر هجري</strong>.
            في حال صادف يوم الصرف يوم الجمعة أو السبت (عطلة نهاية الأسبوع)، يتم تقديم موعد الصرف
            إلى يوم الخميس السابق لضمان حصول الموظفين على رواتبهم دون تأخير.
          </p>
          <p>
            شهد نظام صرف الرواتب تطوراً كبيراً مع إطلاق <strong>نظام سارية (SARIE)</strong> للتحويلات
            البنكية الفورية، والذي يتيح تحويل الرواتب مباشرة إلى الحسابات المصرفية للموظفين بشكل آني
            وآمن. يعمل نظام سارية على مدار الساعة طوال أيام الأسبوع، مما يُسرّع عملية إيداع الرواتب
            ويُحسّن تجربة الموظفين المالية. يُعد هذا النظام من أحدث أنظمة المدفوعات في المنطقة،
            ويدعم رؤية المملكة 2030 في التحول الرقمي وتعزيز الشمول المالي.
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">
          مكونات الراتب الحكومي
        </h2>
        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-[1.9] space-y-4">
          <p>
            يتكون الراتب الحكومي في المملكة العربية السعودية من عدة عناصر أساسية تُحدد وفقاً للمرتبة
            والدرجة الوظيفية للموظف:
          </p>
          <ul className="list-disc list-inside space-y-2 mr-2">
            <li>
              <strong>الراتب الأساسي:</strong> يُحدد حسب سلم الرواتب الحكومي بناءً على المرتبة والدرجة
              الوظيفية. يبدأ من المرتبة الأولى ويصل حتى المرتبة الخامسة عشرة، مع درجات فرعية لكل مرتبة.
            </li>
            <li>
              <strong>بدل السكن:</strong> يُصرف بنسبة <strong>25%</strong> من الراتب الأساسي عادةً،
              ويهدف لمساعدة الموظف في تغطية تكاليف الإيجار أو التملك السكني.
            </li>
            <li>
              <strong>بدل النقل:</strong> يُصرف لتغطية تكاليف التنقل من وإلى مقر العمل، ويختلف
              مقداره حسب المرتبة الوظيفية.
            </li>
            <li>
              <strong>العلاوة السنوية:</strong> زيادة سنوية تُضاف إلى الراتب الأساسي تلقائياً عند
              اكتمال سنة من الخدمة، وتختلف قيمتها حسب المرتبة.
            </li>
            <li>
              <strong>بدلات أخرى:</strong> تشمل بدل الخطر للوظائف الخطرة، وبدل المناطق النائية
              للعاملين في المناطق البعيدة، وبدل التميز، وبدل الندرة للتخصصات المطلوبة.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 3 */}
      <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">
          الاستقطاعات والخصومات
        </h2>
        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-[1.9] space-y-4">
          <p>
            يخضع الراتب الحكومي لعدد من الاستقطاعات النظامية التي تُخصم تلقائياً قبل إيداع الراتب:
          </p>
          <ul className="list-disc list-inside space-y-2 mr-2">
            <li>
              <strong>التأمينات الاجتماعية (GOSI):</strong> يتحمل الموظف نسبة
              <strong> 9.75%</strong> من الراتب الأساسي كحصة اشتراك في نظام التأمينات الاجتماعية،
              بينما يتحمل صاحب العمل نسبة مماثلة. يغطي هذا الاشتراك التقاعد والأخطار المهنية.
            </li>
            <li>
              <strong>التقاعد المدني:</strong> بالنسبة لموظفي القطاع الحكومي المدني، يُخصم اشتراك
              التقاعد من الراتب الأساسي لتمويل معاش التقاعد عند بلوغ سن التقاعد أو إنهاء الخدمة.
            </li>
            <li>
              <strong>ضريبة الدخل:</strong> لا يخضع المواطنون السعوديون لأي ضريبة دخل على رواتبهم،
              وهذه ميزة كبيرة يتمتع بها العاملون في المملكة. أما المقيمون فلا تُفرض عليهم ضريبة
              دخل أيضاً، لكن قد تنطبق عليهم رسوم أخرى.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 4 */}
      <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">
          نظام حماية الأجور (WPS)
        </h2>
        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-[1.9] space-y-4">
          <p>
            أطلقت <strong>وزارة الموارد البشرية والتنمية الاجتماعية</strong> نظام حماية الأجور (Wage
            Protection System) لضمان حقوق العاملين في القطاع الخاص. يُلزم النظام جميع أصحاب العمل
            بصرف رواتب الموظفين عبر <strong>التحويلات البنكية</strong> المعتمدة في مواعيدها المحددة.
          </p>
          <p>
            يتم رصد جميع عمليات صرف الرواتب إلكترونياً، وتُفرض <strong>عقوبات صارمة</strong> على
            المنشآت المتأخرة في دفع الرواتب تشمل: إيقاف الخدمات، ومنع استقدام العمالة، وغرامات مالية.
            يهدف النظام إلى خلق بيئة عمل عادلة وحماية حقوق الموظفين من التأخير أو عدم الصرف،
            مما يُعزز الاستقرار الوظيفي والاقتصادي في سوق العمل السعودي.
          </p>
        </div>
      </section>

      {/* Section 5 */}
      <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">
          برامج الدعم الحكومية
        </h2>
        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-[1.9] space-y-4">
          <p>
            توفر الحكومة السعودية عدداً من برامج الدعم المالي للمواطنين لتحسين مستوى المعيشة وتعزيز
            الاستقرار الاقتصادي:
          </p>
          <ul className="list-disc list-inside space-y-2 mr-2">
            <li>
              <strong>حساب المواطن:</strong> برنامج دعم نقدي يُصرف شهرياً للأسر والأفراد المستحقين
              لتخفيف آثار الإصلاحات الاقتصادية. يُحدد مبلغ الدعم بناءً على عدد أفراد الأسرة
              ومستوى الدخل.
            </li>
            <li>
              <strong>حافز:</strong> برنامج دعم الباحثين عن عمل يُقدم إعانة مالية شهرية قدرها
              <strong> 2,000 ريال</strong> لمدة 12 شهراً للمواطنين السعوديين المؤهلين الذين يبحثون
              عن فرص وظيفية.
            </li>
            <li>
              <strong>ساند (SANED):</strong> نظام التأمين ضد التعطل عن العمل، يُقدم تعويضاً
              مالياً للموظفين السعوديين الذين فقدوا وظائفهم لأسباب خارجة عن إرادتهم، بنسبة
              60% من الراتب في الأشهر الثلاثة الأولى و50% في الأشهر التالية.
            </li>
            <li>
              <strong>الضمان الاجتماعي:</strong> يوفر معاشاً شهرياً للأسر الأشد حاجة والأيتام
              وكبار السن والأرامل وذوي الإعاقة غير القادرين على العمل، ويُعد شبكة أمان اجتماعي
              أساسية في المملكة.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 6 */}
      <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">
          نصائح لإدارة الراتب
        </h2>
        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-[1.9] space-y-4">
          <p>
            إدارة الراتب بحكمة هي مفتاح الاستقرار المالي. إليك أهم النصائح لتحقيق أقصى استفادة
            من دخلك الشهري:
          </p>
          <ul className="list-disc list-inside space-y-2 mr-2">
            <li>
              <strong>قاعدة 50/30/20:</strong> خصص 50% من الراتب للاحتياجات الأساسية (سكن، طعام،
              فواتير)، و30% للرغبات والترفيه، و20% للادخار وسداد الديون. هذه القاعدة البسيطة
              تساعدك على تنظيم مصروفاتك بشكل فعال.
            </li>
            <li>
              <strong>أهمية الادخار:</strong> احرص على ادخار جزء من الراتب شهرياً مهما كان
              صغيراً. يُنصح بإنشاء صندوق طوارئ يُغطي مصاريف 3 إلى 6 أشهر لمواجهة الظروف
              غير المتوقعة.
            </li>
            <li>
              <strong>الاستثمار في الصناديق المحلية:</strong> استكشف فرص الاستثمار في الصناديق
              الاستثمارية المحلية مثل صناديق الأسهم السعودية وصناديق الريت العقارية، التي تُتيح
              تنمية المدخرات على المدى الطويل مع مستوى مخاطر متوازن.
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}

function EnglishContent() {
  return (
    <article className="space-y-6">
      {/* Section 1 */}
      <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">
          Saudi Government Salary System
        </h2>
        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-[1.9] space-y-4">
          <p>
            The <strong>Ministry of Finance</strong> oversees the disbursement of government employee
            salaries in Saudi Arabia. Salaries are typically paid on the <strong>27th of each Hijri
            month</strong>. If the 27th falls on a Friday or Saturday (the weekend), payment is
            advanced to the preceding Thursday. The SARIE (Saudi Arabian Riyal Interbank Express)
            system enables instant bank transfers, ensuring salaries reach employees promptly.
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">
          Government Salary Components
        </h2>
        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-[1.9] space-y-4">
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Base Salary:</strong> Determined by grade and step on the government pay scale.</li>
            <li><strong>Housing Allowance:</strong> Typically 25% of the base salary.</li>
            <li><strong>Transportation Allowance:</strong> Varies by grade level.</li>
            <li><strong>Annual Increment:</strong> Automatic yearly raise added to the base salary.</li>
            <li><strong>Other Allowances:</strong> Hazard pay, remote area allowance, scarcity allowance, etc.</li>
          </ul>
        </div>
      </section>

      {/* Section 3 */}
      <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">
          Deductions &amp; Taxes
        </h2>
        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-[1.9] space-y-4">
          <ul className="list-disc list-inside space-y-2">
            <li><strong>GOSI (Social Insurance):</strong> 9.75% of the base salary is deducted as the employee share.</li>
            <li><strong>Civil Pension:</strong> Deducted for civil government employees to fund retirement benefits.</li>
            <li><strong>Income Tax:</strong> Saudi nationals are not subject to personal income tax — a significant advantage.</li>
          </ul>
        </div>
      </section>

      {/* Section 4 */}
      <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">
          Wage Protection System (WPS)
        </h2>
        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-[1.9] space-y-4">
          <p>
            The <strong>Ministry of Human Resources</strong> enforces the Wage Protection System,
            requiring all private-sector employers to pay salaries through verified bank transfers.
            The system electronically monitors all salary payments and imposes strict penalties on
            establishments that delay wages, including service suspension, recruitment bans, and
            financial fines.
          </p>
        </div>
      </section>

      {/* Section 5 */}
      <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">
          Government Support Programs
        </h2>
        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-[1.9] space-y-4">
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Citizen Account (Hesab Al-Muwaten):</strong> Monthly cash support for eligible families and individuals.</li>
            <li><strong>Hafiz:</strong> Job seekers support providing 2,000 SAR/month for up to 12 months.</li>
            <li><strong>SANED:</strong> Unemployment insurance — 60% of salary for the first 3 months, then 50%.</li>
            <li><strong>Social Security:</strong> Monthly stipends for low-income families, orphans, elderly, and persons with disabilities.</li>
          </ul>
        </div>
      </section>

      {/* Section 6 */}
      <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">
          Salary Management Tips
        </h2>
        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-[1.9] space-y-4">
          <ul className="list-disc list-inside space-y-2">
            <li><strong>50/30/20 Rule:</strong> Allocate 50% to needs, 30% to wants, and 20% to savings and debt repayment.</li>
            <li><strong>Emergency Fund:</strong> Build a reserve covering 3-6 months of expenses.</li>
            <li><strong>Local Investment Funds:</strong> Explore Saudi equity funds and REITs for long-term wealth growth.</li>
          </ul>
        </div>
      </section>
    </article>
  );
}

export default function SalaryContent() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return isAr ? <ArabicContent /> : <EnglishContent />;
}
