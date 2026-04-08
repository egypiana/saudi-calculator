"use client";

export default function RetirementSEO() {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">📘 دليلك الشامل للتقاعد في المملكة العربية السعودية 2026</h2>

      <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-5 text-sm leading-relaxed">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">نظام التقاعد السعودي</h3>
        <p>يعتمد نظام التقاعد في المملكة العربية السعودية على ركيزتين أساسيتين: <strong>نظام التقاعد المدني والعسكري</strong> للموظفين الحكوميين، و<strong>نظام التأمينات الاجتماعية (GOSI)</strong> لموظفي القطاع الخاص. تم دمج المؤسستين تحت مظلة مؤسسة التأمينات الاجتماعية لتوحيد الإجراءات وتسهيل الخدمات على المستفيدين.</p>

        <div className="bg-teal-50 dark:bg-teal-900/10 rounded-xl p-4 not-prose">
          <h4 className="font-bold text-teal-800 dark:text-teal-300 text-sm mb-3">🧮 معادلة حساب المعاش التقاعدي</h4>
          <div className="bg-white dark:bg-dark-bg rounded-lg p-3 text-center mb-3">
            <p className="text-base font-bold text-teal-700 dark:text-teal-400 font-mono">المعاش = (الراتب × أشهر الخدمة) ÷ 480</p>
          </div>
          <div className="text-xs text-teal-700 dark:text-teal-400 space-y-1">
            <p>الراتب = آخر راتب أساسي (المدني) أو متوسط آخر سنتين (الخاص)</p>
            <p>480 = 40 سنة × 12 شهر (الحد الأقصى النظري للخدمة)</p>
            <p>الحد الأقصى للمعاش = 80% من الراتب الأخير</p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">أمثلة عملية لحساب المعاش</h3>
        <div className="grid sm:grid-cols-2 gap-4 not-prose">
          <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4">
            <h5 className="font-bold text-xs text-blue-700 dark:text-blue-400 mb-2">🏛️ موظف حكومي — 25 سنة خدمة</h5>
            <p className="text-xs text-blue-600 dark:text-blue-400">آخر راتب: 15,000 ريال</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">15,000 × 300 ÷ 480 = 9,375 ريال</p>
            <p className="font-bold text-sm text-blue-700 dark:text-blue-300 mt-1">المعاش: 9,375 ريال/شهر (62.5%)</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-4">
            <h5 className="font-bold text-xs text-amber-700 dark:text-amber-400 mb-2">🏢 موظف خاص — 30 سنة اشتراك</h5>
            <p className="text-xs text-amber-600 dark:text-amber-400">متوسط آخر سنتين: 20,000 ريال</p>
            <p className="text-xs text-amber-600 dark:text-amber-400">20,000 × 360 ÷ 480 = 15,000 ريال</p>
            <p className="font-bold text-sm text-amber-700 dark:text-amber-300 mt-1">المعاش: 15,000 ريال/شهر (75%)</p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">سن التقاعد حسب القطاع</h3>
        <ul className="list-disc pr-6 space-y-1">
          <li><strong>القطاع المدني:</strong> 60 سنة للرجال، 55 سنة للنساء. يمكن التقاعد المبكر بعد 20 سنة خدمة</li>
          <li><strong>القطاع العسكري:</strong> يختلف حسب الرتبة (44-58 سنة). التقاعد المبكر بعد 18 سنة خدمة فعلية</li>
          <li><strong>القطاع الخاص:</strong> 60 سنة للرجال، 55 سنة للنساء. التقاعد المبكر بعد 25 سنة اشتراك (300 شهر)</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">التقاعد المبكر: المزايا والمخاطر</h3>
        <p>يتيح النظام السعودي التقاعد المبكر بشروط محددة، لكن مع خصم 5% من المعاش عن كل سنة تسبق سن التقاعد النظامي. هذا يعني:</p>
        <div className="grid sm:grid-cols-2 gap-4 not-prose">
          <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl p-4">
            <h5 className="font-bold text-xs text-emerald-700 dark:text-emerald-400 mb-2">✅ مزايا التقاعد المبكر</h5>
            <ul className="text-xs text-emerald-600 dark:text-emerald-400 space-y-1">
              <li>• وقت حر للمشاريع الشخصية</li>
              <li>• فرصة لبدء عمل تجاري خاص</li>
              <li>• تحسين جودة الحياة والصحة</li>
              <li>• قضاء وقت أكثر مع العائلة</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-4">
            <h5 className="font-bold text-xs text-red-700 dark:text-red-400 mb-2">⚠️ مخاطر التقاعد المبكر</h5>
            <ul className="text-xs text-red-600 dark:text-red-400 space-y-1">
              <li>• خصم دائم من المعاش (5% لكل سنة)</li>
              <li>• فترة أطول بدون دخل كامل</li>
              <li>• ارتفاع تكاليف التأمين الصحي</li>
              <li>• تأثير التضخم على المعاش الثابت</li>
            </ul>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">نسب الاشتراك في التأمينات الاجتماعية</h3>
        <ul className="list-disc pr-6 space-y-1">
          <li><strong>فرع المعاشات:</strong> 18% من الراتب (9% الموظف + 9% صاحب العمل)</li>
          <li><strong>ساند (التعطل عن العمل):</strong> 1.5% (0.75% + 0.75%)</li>
          <li><strong>الأخطار المهنية:</strong> 2% (يتحملها صاحب العمل بالكامل)</li>
          <li><strong>الإجمالي:</strong> 21.5% من الراتب الخاضع للاشتراك</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">نصائح للتخطيط للتقاعد</h3>
        <ul className="list-disc pr-6 space-y-1">
          <li>ابدأ الادخار مبكراً — كل سنة إضافية تُحدث فرقاً كبيراً بفضل الفائدة المركبة</li>
          <li>لا تعتمد على المعاش فقط — استثمر في صناديق استثمارية وعقارات</li>
          <li>احسب الفجوة بين معاشك المتوقع ومصاريفك وابدأ بسدها الآن</li>
          <li>راجع مدة اشتراكك بانتظام عبر تطبيق تأميناتي</li>
          <li>فكّر في التأمين الطبي الخاص للتغطية بعد التقاعد</li>
          <li>سدد جميع ديونك قبل التقاعد قدر الإمكان</li>
          <li>ضع خطة لاستثمار مكافأة نهاية الخدمة بحكمة</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">مستجدات نظام التقاعد 2025-2026</h3>
        <p>شهد نظام التقاعد السعودي تحديثات مهمة تشمل: رفع سن التقاعد تدريجياً للمنضمين الجدد إلى 65 سنة، تعديل نسب الاشتراك من 9% إلى 11% تدريجياً بحلول 2028، ودمج مؤسسة التقاعد مع التأمينات الاجتماعية لتوحيد الخدمات. هذه التحديثات تهدف لاستدامة النظام وضمان حقوق الأجيال القادمة.</p>

        <div className="bg-teal-50 dark:bg-teal-900/10 border border-teal-200 dark:border-teal-800/30 rounded-xl p-4 not-prose">
          <p className="text-sm text-teal-700 dark:text-teal-400"><strong>⚠️ تنبيه:</strong> هذه الحاسبة للاسترشاد فقط وتعتمد على الأنظمة السارية. المعاش الفعلي قد يختلف حسب ظروفك الخاصة. راجع التأمينات الاجتماعية (gosi.gov.sa) أو المؤسسة العامة للتقاعد للحصول على بيان تقاعدي رسمي.</p>
        </div>
      </div>
    </div>
  );
}
