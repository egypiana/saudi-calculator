"use client";

export default function EndOfServiceSEO() {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
        📘 دليلك الشامل لمكافأة نهاية الخدمة في نظام العمل السعودي 2026
      </h2>

      <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-5 text-sm leading-relaxed">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">ما هي مكافأة نهاية الخدمة؟</h3>
        <p>
          مكافأة نهاية الخدمة هي حق مالي يكفله <strong>نظام العمل السعودي</strong> لكل عامل عند انتهاء علاقته العمالية. تُعدّ من أهم حقوق العامل وتُحسب على أساس آخر أجر تقاضاه شاملاً الراتب الأساسي وجميع البدلات الثابتة. نظّمها النظام في المواد من 84 إلى 88.
        </p>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">طريقة حساب المكافأة (المادة 84)</h3>
        <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-4 not-prose">
          <div className="space-y-3 text-sm text-orange-700 dark:text-orange-400">
            <div className="bg-white dark:bg-dark-bg rounded-lg p-3">
              <p className="font-bold mb-1">📌 أول 5 سنوات</p>
              <p>نصف شهر راتب × عدد السنوات</p>
              <p className="text-xs opacity-70">مثال: راتب 10,000 × 5 سنوات = 5 × 5,000 = 25,000 ريال</p>
            </div>
            <div className="bg-white dark:bg-dark-bg rounded-lg p-3">
              <p className="font-bold mb-1">📌 ما بعد 5 سنوات</p>
              <p>شهر راتب كامل × عدد السنوات</p>
              <p className="text-xs opacity-70">مثال: راتب 10,000 × 5 سنوات = 5 × 10,000 = 50,000 ريال</p>
            </div>
            <div className="bg-white dark:bg-dark-bg rounded-lg p-3">
              <p className="font-bold text-orange-800 dark:text-orange-300">⭐ مثال كامل: 10 سنوات براتب 10,000</p>
              <p>أول 5 سنوات: 25,000 + بعدها 5 سنوات: 50,000 = <strong>75,000 ريال</strong></p>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">حالات الاستقالة (المادة 85)</h3>
        <p>عند الاستقالة، تختلف نسبة المكافأة المستحقة حسب مدة الخدمة:</p>
        <div className="grid sm:grid-cols-2 gap-3 not-prose">
          <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-3 border-r-4 border-red-500">
            <p className="font-bold text-xs text-red-700 dark:text-red-400">أقل من سنتين</p>
            <p className="text-xs text-red-600 dark:text-red-400">لا يستحق أي مكافأة</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-3 border-r-4 border-orange-500">
            <p className="font-bold text-xs text-orange-700 dark:text-orange-400">2 إلى 5 سنوات</p>
            <p className="text-xs text-orange-600 dark:text-orange-400">ثلث المكافأة (33%)</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-3 border-r-4 border-amber-500">
            <p className="font-bold text-xs text-amber-700 dark:text-amber-400">5 إلى 10 سنوات</p>
            <p className="text-xs text-amber-600 dark:text-amber-400">ثلثا المكافأة (66%)</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl p-3 border-r-4 border-emerald-500">
            <p className="font-bold text-xs text-emerald-700 dark:text-emerald-400">أكثر من 10 سنوات</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">المكافأة كاملة (100%)</p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">حالات الاستحقاق الكامل</h3>
        <p>يستحق العامل المكافأة <strong>كاملة</strong> في الحالات التالية بغض النظر عن مدة الخدمة:</p>
        <ul className="list-disc pr-6 space-y-1">
          <li>إنهاء العقد من صاحب العمل (فصل)</li>
          <li>انتهاء مدة العقد المحدد وعدم التجديد</li>
          <li>التقاعد (بلوغ سن 60 للرجل و55 للمرأة)</li>
          <li>القوة القاهرة (المادة 83)</li>
          <li>ترك العمل بموجب المادة 81 (مخالفة صاحب العمل)</li>
          <li>وفاة العامل أو العجز الكلي</li>
          <li>استقالة المرأة خلال 6 أشهر من الزواج أو 3 أشهر من الولادة</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">حالات الحرمان من المكافأة (المادة 80)</h3>
        <p>يُحرم العامل من المكافأة إذا فُصل بسبب:</p>
        <ul className="list-disc pr-6 space-y-1">
          <li>الاعتداء على صاحب العمل أو الزملاء أو الرؤساء</li>
          <li>عدم أداء الالتزامات الجوهرية المترتبة على العقد</li>
          <li>التغيب بدون سبب مشروع أكثر من 30 يوماً في السنة أو 15 يوماً متتالية</li>
          <li>ثبوت استغلال المنصب للحصول على مكاسب شخصية غير مشروعة</li>
          <li>إفشاء أسرار صناعية أو تجارية</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">حقوق أخرى عند انتهاء الخدمة</h3>
        <ul className="list-disc pr-6 space-y-1">
          <li><strong>رصيد الإجازات:</strong> تعويض نقدي عن الإجازات السنوية غير المستخدمة</li>
          <li><strong>شهادة الخبرة:</strong> يلتزم صاحب العمل بإعطاء العامل شهادة خدمة مجاناً</li>
          <li><strong>البحث عن عمل:</strong> يحق للعامل التغيب يوماً كاملاً أو 8 ساعات أسبوعياً للبحث عن عمل خلال فترة الإشعار</li>
          <li><strong>التسوية النهائية:</strong> تشمل جميع المستحقات في مبلغ واحد</li>
        </ul>

        <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-xl p-4 not-prose">
          <p className="text-sm text-orange-700 dark:text-orange-400">
            <strong>🔗 مصادر رسمية:</strong> للمزيد، زر{" "}
            <span className="underline">وزارة الموارد البشرية (hrsd.gov.sa)</span>{" "}
            أو تقدم بشكوى عبر{" "}
            <span className="underline">منصة مسار (masar.mhrsd.gov.sa)</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
