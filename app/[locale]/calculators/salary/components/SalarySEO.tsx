"use client";

export default function SalarySEO() {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
        📘 دليلك الشامل لحساب الراتب والتأمينات الاجتماعية في السعودية 2026
      </h2>

      <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-5 text-sm leading-relaxed">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">كيف يُحسب صافي الراتب في السعودية؟</h3>
        <p>
          صافي الراتب هو المبلغ الذي يُحوّل فعلياً لحسابك البنكي بعد خصم التأمينات الاجتماعية وأي خصومات أخرى. المعادلة الأساسية:
        </p>

        <div className="bg-teal-50 dark:bg-teal-900/10 rounded-xl p-4 not-prose">
          <div className="bg-white dark:bg-dark-bg rounded-lg p-3 text-center mb-3">
            <p className="text-lg font-bold text-teal-700 dark:text-teal-400">
              صافي الراتب = (الأساسي + البدلات + الإضافي) − التأمينات − الخصومات
            </p>
          </div>
          <div className="space-y-2 text-sm text-teal-700 dark:text-teal-400">
            <p><strong>مثال عملي (موظف سعودي):</strong></p>
            <p>• الراتب الأساسي: 10,000 ريال</p>
            <p>• بدل السكن: 2,500 ريال (25%)</p>
            <p>• بدل النقل: 700 ريال</p>
            <p>• الإجمالي: 13,200 ريال</p>
            <p>• خصم التأمينات: 10,000 × 9.75% = <strong>975 ريال</strong></p>
            <p>• <strong>صافي الراتب: 12,225 ريال</strong></p>
            <p className="text-xs opacity-70 mt-2">* تكلفة صاحب العمل: 13,200 + (10,000 × 11.75%) = 14,375 ريال</p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">التأمينات الاجتماعية (GOSI) في السعودية</h3>
        <p>
          التأمينات الاجتماعية هي اشتراكات إلزامية تُخصم من الراتب الأساسي لتوفير الحماية الاجتماعية للعاملين. تُدار من قبل <strong>المؤسسة العامة للتأمينات الاجتماعية</strong> وتشمل ثلاثة فروع رئيسية:
        </p>

        <div className="grid sm:grid-cols-3 gap-4 not-prose">
          <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4">
            <h5 className="font-bold text-xs text-gray-700 dark:text-gray-300 mb-2">🏦 فرع المعاشات (التقاعد)</h5>
            <p className="text-xs text-gray-600 dark:text-gray-400">18% (9% موظف + 9% صاحب عمل). يوفر معاشاً تقاعدياً عند بلوغ سن التقاعد (60 سنة) أو الإعاقة. للسعوديين فقط.</p>
          </div>
          <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4">
            <h5 className="font-bold text-xs text-gray-700 dark:text-gray-300 mb-2">🛡️ ساند (التعطل)</h5>
            <p className="text-xs text-gray-600 dark:text-gray-400">1.5% (0.75% + 0.75%). تعويض شهري للمفصولين لأسباب خارجة عن إرادتهم. حتى 12 شهراً. للسعوديين فقط.</p>
          </div>
          <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4">
            <h5 className="font-bold text-xs text-gray-700 dark:text-gray-300 mb-2">⚠️ الأخطار المهنية</h5>
            <p className="text-xs text-gray-600 dark:text-gray-400">2% (صاحب العمل فقط). تغطية إصابات العمل والأمراض المهنية. تشمل السعوديين وغير السعوديين.</p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">مكونات الراتب في القطاع الخاص السعودي</h3>
        <p>يتألف الراتب في القطاع الخاص السعودي عادة من عدة مكونات:</p>
        <ul className="list-disc pr-6 space-y-1">
          <li><strong>الراتب الأساسي:</strong> المكوّن الرئيسي الذي تُحسب عليه التأمينات ومكافأة نهاية الخدمة والإجازات</li>
          <li><strong>بدل السكن:</strong> يتراوح عادة بين 25% إلى 50% من الراتب الأساسي، أو تأمين سكن عيني</li>
          <li><strong>بدل النقل:</strong> يتراوح بين 500 إلى 1,500 ريال شهرياً، أو تأمين مواصلات</li>
          <li><strong>بدل الطعام:</strong> بين 300 إلى 1,000 ريال (ليس إلزامياً)</li>
          <li><strong>بدلات أخرى:</strong> هاتف، تعليم، تذاكر سفر، حوافز أداء</li>
        </ul>
        <p>
          <strong>ملاحظة مهمة:</strong> التأمينات تُحسب على الراتب الأساسي فقط. لذلك يُفضّل بعض أصحاب العمل تخفيض الأساسي وزيادة البدلات لتقليل تكلفة التأمينات، لكن هذا يؤثر سلباً على مكافأة نهاية الخدمة والتقاعد.
        </p>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">الحد الأدنى للأجور ونظام نطاقات</h3>
        <p>
          حددت وزارة الموارد البشرية والتنمية الاجتماعية الحد الأدنى لاحتساب السعودي في نطاقات بـ <strong>4,000 ريال شهرياً</strong>. هذا يعني أن الموظف السعودي بأجر أقل من 4,000 ريال لا يُحتسب في نسبة التوطين. الحد الأدنى للعمل بنصف الوقت: 3,000 ريال.
        </p>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">حقوق الموظف في نظام العمل السعودي</h3>
        <ul className="list-disc pr-6 space-y-1">
          <li>ساعات العمل: 8 ساعات يومياً (48 أسبوعياً)، و6 ساعات في رمضان</li>
          <li>الإجازة السنوية: 21 يوماً (30 بعد 5 سنوات خدمة)</li>
          <li>إجازة الأعياد: عيد الفطر (4 أيام) + عيد الأضحى (4 أيام) + اليوم الوطني</li>
          <li>الأوقات الإضافية: أجر الساعة × 1.5 (أيام عادية) أو × 2.0 (أعياد وإجازات)</li>
          <li>مكافأة نهاية الخدمة: نصف شهر عن كل سنة في الخمس الأولى، وشهر عن كل سنة بعدها</li>
          <li>إشعار الاستقالة/الفصل: 60 يوماً للرواتب الشهرية، 30 يوماً لغيرها</li>
        </ul>

        <div className="bg-teal-50 dark:bg-teal-900/10 border border-teal-200 dark:border-teal-800/30 rounded-xl p-4 not-prose">
          <p className="text-sm text-teal-700 dark:text-teal-400">
            <strong>🔗 مصادر رسمية:</strong> للمزيد من التفاصيل، زر بوابة{" "}
            <span className="underline">المؤسسة العامة للتأمينات الاجتماعية (gosi.gov.sa)</span>{" "}
            أو{" "}
            <span className="underline">وزارة الموارد البشرية (hrsd.gov.sa)</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
