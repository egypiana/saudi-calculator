"use client";

export default function GPASEO() {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
        📘 دليلك الشامل لحساب المعدل التراكمي في الجامعات السعودية 2026
      </h2>

      <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-5 text-sm leading-relaxed">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">ما هو المعدل التراكمي (GPA)؟</h3>
        <p>
          المعدل التراكمي (Grade Point Average) هو مقياس رقمي يعكس مستوى الأداء الأكاديمي للطالب خلال فترة دراسته الجامعية. يُحسب من خلال ضرب نقاط التقدير في عدد الساعات المعتمدة لكل مادة، ثم قسمة المجموع على إجمالي الساعات المعتمدة. يُعدّ المعدل التراكمي من أهم المعايير الأكاديمية التي تؤثر على مستقبل الطالب المهني والأكاديمي.
        </p>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">نظام التقديرات في الجامعات السعودية</h3>
        <p>
          تستخدم غالبية الجامعات السعودية الحكومية <strong>نظام 5 نقاط</strong>، وهو النظام المعتمد من وزارة التعليم. يتدرج من A+ (5.0 نقاط — ممتاز مرتفع) إلى F (1.0 نقطة — راسب). بعض الجامعات مثل <strong>جامعة الملك فهد للبترول والمعادن</strong> و<strong>جامعة الأمير سلطان</strong> تستخدم <strong>نظام 4 نقاط</strong> (النظام الأمريكي).
        </p>

        <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4 not-prose">
          <h4 className="font-bold text-purple-800 dark:text-purple-300 text-sm mb-3">📐 معادلة حساب المعدل التراكمي</h4>
          <div className="bg-white dark:bg-dark-bg rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-purple-700 dark:text-purple-400 font-mono">
              المعدل = Σ (نقاط التقدير × الساعات) ÷ Σ الساعات
            </p>
          </div>
          <div className="mt-3 space-y-2 text-sm text-purple-700 dark:text-purple-400">
            <p><strong>مثال عملي:</strong></p>
            <p>• رياضيات (3 ساعات) — تقدير A+ (5.0) → 5.0 × 3 = 15</p>
            <p>• فيزياء (4 ساعات) — تقدير B+ (4.5) → 4.5 × 4 = 18</p>
            <p>• إنجليزي (3 ساعات) — تقدير A (4.75) → 4.75 × 3 = 14.25</p>
            <p>• <strong>المعدل</strong> = (15 + 18 + 14.25) ÷ (3 + 4 + 3) = 47.25 ÷ 10 = <strong>4.73</strong></p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">تصنيفات المعدل التراكمي</h3>
        <div className="grid sm:grid-cols-2 gap-4 not-prose">
          <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4">
            <h5 className="font-bold text-xs text-gray-700 dark:text-gray-300 mb-2">📊 نظام 5 نقاط (السعودي)</h5>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>• <strong>ممتاز:</strong> 4.50 — 5.00</li>
              <li>• <strong>جيد جداً:</strong> 3.75 — 4.49</li>
              <li>• <strong>جيد:</strong> 2.75 — 3.74</li>
              <li>• <strong>مقبول:</strong> 2.00 — 2.74</li>
              <li>• <strong>ضعيف:</strong> أقل من 2.00 (إنذار أكاديمي)</li>
            </ul>
          </div>
          <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4">
            <h5 className="font-bold text-xs text-gray-700 dark:text-gray-300 mb-2">📊 نظام 4 نقاط (الدولي)</h5>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>• <strong>ممتاز:</strong> 3.70 — 4.00</li>
              <li>• <strong>جيد جداً:</strong> 3.00 — 3.69</li>
              <li>• <strong>جيد:</strong> 2.00 — 2.99</li>
              <li>• <strong>مقبول:</strong> 1.00 — 1.99</li>
              <li>• <strong>ضعيف:</strong> أقل من 1.00</li>
            </ul>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">مرتبة الشرف في الجامعات السعودية</h3>
        <p>
          تمنح الجامعات السعودية مرتبة الشرف للخريجين المتميزين وفق شروط محددة:
        </p>
        <ul className="list-disc pr-6 space-y-1">
          <li><strong>مرتبة الشرف الأولى:</strong> معدل تراكمي 4.75 فأعلى من 5.0 مع عدم الرسوب في أي مادة</li>
          <li><strong>مرتبة الشرف الثانية:</strong> معدل تراكمي 3.75 فأعلى مع عدم الرسوب</li>
          <li>يُشترط إتمام الدراسة في المدة النظامية (عادة 4-5 سنوات حسب التخصص)</li>
          <li>قد تشترط بعض الجامعات ألا يكون الطالب قد حُذفت له أي مادة بتقدير DN</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">أهمية المعدل التراكمي</h3>
        <p>
          المعدل التراكمي ليس مجرد رقم أكاديمي، بل يؤثر على جوانب عديدة من حياة الطالب والخريج:
        </p>
        <ul className="list-disc pr-6 space-y-1">
          <li><strong>التوظيف:</strong> كثير من الجهات الحكومية والخاصة تشترط معدلاً لا يقل عن 3.0 أو 3.5</li>
          <li><strong>الدراسات العليا:</strong> برامج الماجستير تشترط معدلاً لا يقل عن 3.75 عادةً</li>
          <li><strong>الابتعاث:</strong> برنامج خادم الحرمين للابتعاث يشترط معدلاً تراكمياً مرتفعاً</li>
          <li><strong>مكافأة التفوق:</strong> بعض الجامعات تمنح مكافآت إضافية للمتفوقين</li>
          <li><strong>أولوية التسجيل:</strong> الطلاب ذوو المعدلات العالية يحصلون على أولوية في اختيار المواد</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">نصائح لتحسين المعدل التراكمي</h3>
        <ul className="list-disc pr-6 space-y-1">
          <li>ركّز على المواد ذات الساعات المعتمدة الأكثر لأنها تؤثر أكثر على المعدل</li>
          <li>استفد من نظام إعادة المواد لتحسين التقديرات المنخفضة</li>
          <li>سجّل مواد في الفصل الصيفي لتحسين المعدل بتركيز أكبر</li>
          <li>تواصل مع المرشد الأكاديمي لوضع خطة دراسية متوازنة</li>
          <li>لا تفرط في عدد الساعات المسجلة في فصل واحد</li>
          <li>استفد من الساعات المكتبية للأساتذة وجلسات المراجعة</li>
        </ul>

        <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800/30 rounded-xl p-4 not-prose">
          <p className="text-sm text-purple-700 dark:text-purple-400">
            <strong>💡 ملاحظة:</strong> هذه الحاسبة استرشادية. قد تختلف نظم التقديرات والتصنيفات بين الجامعات. يُرجى الرجوع إلى لوائح جامعتك للتفاصيل الدقيقة.
          </p>
        </div>
      </div>
    </div>
  );
}
