"use client";

export default function ProfitMarginSEO() {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">📘 دليلك الشامل لحساب نسبة الربح وهامش الربح 2026</h2>

      <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-5 text-sm leading-relaxed">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">ما هو هامش الربح ولماذا هو مهم؟</h3>
        <p>هامش الربح (Profit Margin) هو المؤشر المالي الأهم لأي نشاط تجاري. يقيس نسبة الأرباح إلى الإيرادات ويُظهر مدى كفاءة الشركة في تحويل المبيعات إلى أرباح. هامش ربح مرتفع يعني أن الشركة تحتفظ بجزء أكبر من كل ريال تجنيه، مما يدل على إدارة مالية سليمة وتسعير فعّال.</p>

        <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-4 not-prose">
          <h4 className="font-bold text-green-800 dark:text-green-300 text-sm mb-3">🧮 المعادلات الأساسية</h4>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-white dark:bg-dark-bg rounded-lg p-3">
              <p className="text-xs font-bold text-green-700 dark:text-green-400 mb-1">هامش الربح (Margin)</p>
              <p className="text-sm font-bold text-green-600 dark:text-green-400 font-mono">(الربح ÷ الإيرادات) × 100</p>
            </div>
            <div className="bg-white dark:bg-dark-bg rounded-lg p-3">
              <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">نسبة الإضافة (Markup)</p>
              <p className="text-sm font-bold text-amber-600 dark:text-amber-400 font-mono">(الربح ÷ التكلفة) × 100</p>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">أنواع هوامش الربح الثلاثة</h3>
        <div className="grid sm:grid-cols-3 gap-4 not-prose">
          <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl p-4">
            <h5 className="font-bold text-xs text-emerald-700 dark:text-emerald-400 mb-2">📊 هامش الربح الإجمالي</h5>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">الإيرادات — تكلفة البضاعة المباعة (COGS)</p>
            <p className="text-[10px] text-emerald-500 mt-1">يقيس: كفاءة الإنتاج والتصنيع</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4">
            <h5 className="font-bold text-xs text-blue-700 dark:text-blue-400 mb-2">⚙️ هامش الربح التشغيلي</h5>
            <p className="text-xs text-blue-600 dark:text-blue-400">الإجمالي — المصاريف التشغيلية</p>
            <p className="text-[10px] text-blue-500 mt-1">يقيس: كفاءة إدارة العمليات</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4">
            <h5 className="font-bold text-xs text-purple-700 dark:text-purple-400 mb-2">💰 صافي هامش الربح</h5>
            <p className="text-xs text-purple-600 dark:text-purple-400">بعد كل المصاريف والضرائب</p>
            <p className="text-[10px] text-purple-500 mt-1">يقيس: الربحية النهائية الفعلية</p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">الفرق الجوهري بين Margin و Markup</h3>
        <p>من أكثر الأخطاء شيوعاً في التسعير هو الخلط بين هامش الربح (Margin) ونسبة الإضافة (Markup). رغم أنهما يقيسان الربحية، إلا أنهما يختلفان جوهرياً:</p>
        <div className="grid sm:grid-cols-2 gap-4 not-prose">
          <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-4">
            <h5 className="font-bold text-xs text-green-700 dark:text-green-400 mb-2">Margin — هامش الربح</h5>
            <p className="text-xs text-green-600 dark:text-green-400">القاعدة: <strong>سعر البيع</strong></p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">مثال: تكلفة 60، بيع 100</p>
            <p className="font-bold text-sm text-green-700 dark:text-green-300 mt-1">40 ÷ 100 = 40%</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-4">
            <h5 className="font-bold text-xs text-amber-700 dark:text-amber-400 mb-2">Markup — نسبة الإضافة</h5>
            <p className="text-xs text-amber-600 dark:text-amber-400">القاعدة: <strong>التكلفة</strong></p>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">مثال: تكلفة 60، بيع 100</p>
            <p className="font-bold text-sm text-amber-700 dark:text-amber-300 mt-1">40 ÷ 60 = 66.7%</p>
          </div>
        </div>
        <p>لاحظ: نفس المعاملة تعطي 40% Margin لكن 66.7% Markup! إذا أردت هامش 40% وطبّقت Markup 40% على التكلفة (60 × 1.4 = 84)، ستحصل فعلياً على هامش 28.6% فقط — خطأ يكلف المشاريع كثيراً.</p>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">هوامش الربح المرجعية حسب الصناعة في السعودية</h3>
        <ul className="list-disc pr-6 space-y-1">
          <li><strong>تجارة التجزئة والسوبرماركت:</strong> 2-5% صافي ربح (تعتمد على حجم المبيعات الكبير)</li>
          <li><strong>المطاعم والمقاهي:</strong> 5-15% (تكاليف تشغيلية عالية: إيجار، عمالة، مواد خام)</li>
          <li><strong>الملابس والأزياء:</strong> 10-20% (موسمية وتحتاج تخفيضات متكررة)</li>
          <li><strong>الإلكترونيات:</strong> 5-10% (منافسة حادة وهوامش ضيقة)</li>
          <li><strong>البرمجيات والتقنية:</strong> 15-30% (تكاليف إنتاج منخفضة بعد التطوير)</li>
          <li><strong>الخدمات الاستشارية:</strong> 20-40% (تعتمد على الخبرة لا المواد)</li>
          <li><strong>العقارات:</strong> 15-25% (دورة بيع طويلة لكن هوامش مجزية)</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">استراتيجيات تحسين هامش الربح</h3>
        <ul className="list-disc pr-6 space-y-1">
          <li><strong>تقليل التكاليف:</strong> تفاوض مع الموردين، اشترِ بالجملة، قلّل الهدر</li>
          <li><strong>التسعير الذكي:</strong> ادرس السوق وقدّم قيمة مميزة تبرر سعراً أعلى</li>
          <li><strong>التركيز على المنتجات المربحة:</strong> حلّل ربحية كل منتج وركّز على الأفضل</li>
          <li><strong>أتمتة العمليات:</strong> استخدم التقنية لتقليل التكاليف التشغيلية</li>
          <li><strong>مراجعة الأسعار دورياً:</strong> عدّل أسعارك مع تغيّر تكاليف المواد الخام</li>
          <li><strong>تنويع مصادر الدخل:</strong> أضف خدمات أو منتجات تكميلية بهوامش أعلى</li>
        </ul>

        <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded-xl p-4 not-prose">
          <p className="text-sm text-green-700 dark:text-green-400"><strong>💡 نصيحة:</strong> تابع هوامش الربح الثلاثة (إجمالي، تشغيلي، صافي) شهرياً. إذا انخفض الهامش الإجمالي فالمشكلة في التكاليف أو التسعير. إذا انخفض التشغيلي فالمشكلة في المصاريف الإدارية. وإذا انخفض الصافي فراجع الضرائب والفوائد.</p>
        </div>
      </div>
    </div>
  );
}
