"use client";

export default function TimeSEO() {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">📘 دليلك الشامل لحساب الوقت والتاريخ</h2>

      <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-5 text-sm leading-relaxed">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">حاسبة الوقت الشاملة</h3>
        <p>حاسبة الوقت أداة ضرورية لكل من يحتاج حساب الفرق بين وقتين أو تاريخين، إضافة أو طرح ساعات ودقائق، حساب ساعات العمل، أو تحويل بين وحدات الوقت المختلفة. تُستخدم في الحياة اليومية والعمل والدراسة لتنظيم الوقت بكفاءة.</p>

        <div className="bg-sky-50 dark:bg-sky-900/10 rounded-xl p-4 not-prose">
          <h4 className="font-bold text-sky-800 dark:text-sky-300 text-sm mb-3">🕐 5 أدوات في حاسبة واحدة</h4>
          <div className="grid sm:grid-cols-2 gap-2 text-xs text-sky-700 dark:text-sky-400">
            <div className="bg-white dark:bg-dark-bg rounded-lg p-2.5 flex items-center gap-2"><span>🕐</span>حساب الفرق بين وقتين</div>
            <div className="bg-white dark:bg-dark-bg rounded-lg p-2.5 flex items-center gap-2"><span>➕</span>إضافة وطرح الوقت</div>
            <div className="bg-white dark:bg-dark-bg rounded-lg p-2.5 flex items-center gap-2"><span>📅</span>الفرق بين تاريخين</div>
            <div className="bg-white dark:bg-dark-bg rounded-lg p-2.5 flex items-center gap-2"><span>💼</span>حاسبة ساعات العمل</div>
            <div className="bg-white dark:bg-dark-bg rounded-lg p-2.5 flex items-center gap-2 sm:col-span-2"><span>🔄</span>تحويل وحدات الوقت (ثوانٍ ↔ سنوات)</div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">كيف تحسب الفرق بين وقتين؟</h3>
        <p>لحساب الفرق بين وقتين، حوّل الوقتين إلى نظام 24 ساعة ثم اطرح. إذا كانت النتيجة سالبة، أضف 24 ساعة (يعني الفترة تتجاوز منتصف الليل).</p>
        <div className="grid sm:grid-cols-2 gap-4 not-prose">
          <div className="bg-sky-50 dark:bg-sky-900/10 rounded-xl p-4">
            <h5 className="font-bold text-xs text-sky-700 dark:text-sky-400 mb-2">مثال 1: نفس اليوم</h5>
            <p className="text-xs text-sky-600 dark:text-sky-400">من 8:00 ص إلى 5:30 م</p>
            <p className="text-xs text-sky-600 dark:text-sky-400">17:30 - 08:00 = 9:30</p>
            <p className="font-bold text-sm text-sky-700 dark:text-sky-300 mt-1">النتيجة: 9 ساعات و30 دقيقة</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4">
            <h5 className="font-bold text-xs text-purple-700 dark:text-purple-400 mb-2">مثال 2: عبر منتصف الليل</h5>
            <p className="text-xs text-purple-600 dark:text-purple-400">من 10:00 م إلى 6:00 ص</p>
            <p className="text-xs text-purple-600 dark:text-purple-400">06:00 - 22:00 = -16 + 24 = 8</p>
            <p className="font-bold text-sm text-purple-700 dark:text-purple-300 mt-1">النتيجة: 8 ساعات</p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">ساعات العمل في المملكة العربية السعودية</h3>
        <p>ينظم نظام العمل السعودي ساعات العمل كالتالي:</p>
        <ul className="list-disc pr-6 space-y-1">
          <li><strong>القطاع الخاص:</strong> 8 ساعات يومياً كحد أقصى، أو 48 ساعة أسبوعياً</li>
          <li><strong>القطاع الحكومي:</strong> 7 ساعات يومياً، من 7:30 ص إلى 2:30 م عادةً</li>
          <li><strong>شهر رمضان:</strong> 6 ساعات يومياً (36 ساعة أسبوعياً) للمسلمين</li>
          <li><strong>الاستراحة:</strong> لا تقل عن 30 دقيقة لكل 5 ساعات عمل متواصلة</li>
          <li><strong>العمل الإضافي:</strong> يُدفع بأجر الساعة + 50% إضافية</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">وحدات قياس الوقت</h3>
        <ul className="list-disc pr-6 space-y-1">
          <li><strong>الثانية:</strong> الوحدة الأساسية لقياس الوقت في النظام الدولي</li>
          <li><strong>الدقيقة:</strong> 60 ثانية</li>
          <li><strong>الساعة:</strong> 60 دقيقة = 3,600 ثانية</li>
          <li><strong>اليوم:</strong> 24 ساعة = 1,440 دقيقة = 86,400 ثانية</li>
          <li><strong>الأسبوع:</strong> 7 أيام = 168 ساعة = 10,080 دقيقة</li>
          <li><strong>الشهر:</strong> 28-31 يوماً (متوسط 30.44 يوم)</li>
          <li><strong>السنة:</strong> 365 يوماً (أو 366 في السنة الكبيسة)</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">نصائح لإدارة الوقت بفعالية</h3>
        <ul className="list-disc pr-6 space-y-1">
          <li><strong>تقنية بومودورو:</strong> 25 دقيقة عمل مركّز + 5 دقائق راحة. كل 4 جولات خذ 15-30 دقيقة راحة</li>
          <li><strong>مصفوفة أيزنهاور:</strong> صنّف مهامك: عاجل ومهم → أنجزه، مهم غير عاجل → خطط له، عاجل غير مهم → فوّضه، غير عاجل وغير مهم → احذفه</li>
          <li><strong>قاعدة 80/20:</strong> 80% من النتائج تأتي من 20% من الجهد — ركّز على المهام الأكثر تأثيراً</li>
          <li><strong>التجميع (Batching):</strong> اجمع المهام المتشابهة وأنجزها في وقت واحد لتقليل تشتت الانتباه</li>
          <li><strong>خطط مسبقاً:</strong> خصص 10 دقائق مساء كل يوم لتخطيط اليوم التالي</li>
        </ul>

        <div className="bg-sky-50 dark:bg-sky-900/10 border border-sky-200 dark:border-sky-800/30 rounded-xl p-4 not-prose">
          <p className="text-sm text-sky-700 dark:text-sky-400"><strong>💡 هل تعلم؟</strong> يقضي الشخص العادي حوالي 27 سنة من عمره نائماً، و13 سنة في العمل، و12 سنة في مشاهدة الشاشات. إدارة الوقت المتبقي بحكمة تصنع الفرق في جودة الحياة.</p>
        </div>
      </div>
    </div>
  );
}
