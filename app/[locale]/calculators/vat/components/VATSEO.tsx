"use client";

export default function VATSEO() {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
        📘 دليلك الشامل لضريبة القيمة المضافة في السعودية 2026
      </h2>

      <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-5 text-sm leading-relaxed">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">ما هي ضريبة القيمة المضافة (VAT)؟</h3>
        <p>
          ضريبة القيمة المضافة هي ضريبة استهلاك غير مباشرة تُفرض على الفرق بين تكلفة السلع والخدمات وسعر بيعها في كل مرحلة من مراحل سلسلة التوريد. تُطبق في أكثر من 160 دولة حول العالم، وتُعدّ من أهم مصادر الإيرادات الحكومية غير النفطية.
        </p>
        <p>
          بدأت المملكة العربية السعودية بتطبيق ضريبة القيمة المضافة بنسبة <strong>5%</strong> في 1 يناير 2018 تنفيذاً للاتفاقية الموحدة لضريبة القيمة المضافة لدول مجلس التعاون الخليجي. وفي <strong>1 يوليو 2020</strong>، رُفعت النسبة إلى <strong>15%</strong> ضمن الإجراءات الاستباقية للحفاظ على الاستقرار المالي وتعزيز الإيرادات غير النفطية.
        </p>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">كيفية حساب ضريبة القيمة المضافة</h3>
        <p>هناك عمليتان أساسيتان لحساب الضريبة:</p>

        <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 not-prose">
          <h4 className="font-bold text-blue-800 dark:text-blue-300 text-sm mb-3">1. إضافة الضريبة (من مبلغ صافي إلى شامل)</h4>
          <div className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
            <p>• <strong>المعادلة:</strong> المبلغ الشامل = المبلغ الأصلي × (1 + نسبة الضريبة)</p>
            <p>• <strong>مثال:</strong> سلعة بـ 1,000 ريال → 1,000 × 1.15 = <strong>1,150 ريال</strong> (منها 150 ريال ضريبة)</p>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-4 not-prose">
          <h4 className="font-bold text-green-800 dark:text-green-300 text-sm mb-3">2. استخراج الضريبة (من مبلغ شامل إلى صافي)</h4>
          <div className="space-y-2 text-sm text-green-700 dark:text-green-400">
            <p>• <strong>المعادلة:</strong> المبلغ الأصلي = المبلغ الشامل ÷ (1 + نسبة الضريبة)</p>
            <p>• <strong>مثال:</strong> فاتورة 1,150 ريال → 1,150 ÷ 1.15 = <strong>1,000 ريال</strong> (الضريبة = 150 ريال)</p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">من يجب عليه التسجيل في ضريبة القيمة المضافة؟</h3>
        <p>
          وفقاً لأنظمة هيئة الزكاة والضريبة والجمارك (ZATCA)، يجب التسجيل في ضريبة القيمة المضافة في الحالات التالية:
        </p>
        <ul className="list-disc pr-6 space-y-1">
          <li><strong>إلزامي:</strong> إذا تجاوزت الإيرادات السنوية الخاضعة للضريبة 375,000 ريال سعودي</li>
          <li><strong>اختياري:</strong> إذا كانت الإيرادات بين 187,500 و 375,000 ريال سعودي</li>
          <li><strong>غير مطلوب:</strong> إذا كانت الإيرادات أقل من 187,500 ريال سعودي</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">السلع والخدمات المعفاة</h3>
        <p>حددت الهيئة قائمة بالسلع والخدمات المعفاة من الضريبة أو الخاضعة بنسبة صفر:</p>
        <div className="grid sm:grid-cols-2 gap-4 not-prose">
          <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4">
            <h5 className="font-bold text-xs text-gray-700 dark:text-gray-300 mb-2">🚫 معفاة من الضريبة</h5>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>• الخدمات المالية المنظمة</li>
              <li>• التأمين على الحياة</li>
              <li>• تأجير العقارات السكنية</li>
              <li>• إصدار الجوازات والرخص</li>
              <li>• بعض الخدمات الحكومية</li>
            </ul>
          </div>
          <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4">
            <h5 className="font-bold text-xs text-gray-700 dark:text-gray-300 mb-2">0️⃣ خاضعة بنسبة صفر</h5>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>• الصادرات خارج دول الخليج</li>
              <li>• النقل الدولي</li>
              <li>• الأدوية والمعدات الطبية المعتمدة</li>
              <li>• المعادن الاستثمارية النقية</li>
              <li>• التوريدات لدول مجلس التعاون</li>
            </ul>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">الفوترة الإلكترونية (فاتورة)</h3>
        <p>
          اعتمدت المملكة نظام الفوترة الإلكترونية (فاتورة) الذي أصبح إلزامياً منذ 4 ديسمبر 2021. يتطلب النظام إصدار وحفظ الفواتير الضريبية بصيغة إلكترونية محددة تتضمن الرقم الضريبي للمنشأة، تفاصيل المنتجات والخدمات، نسبة وقيمة الضريبة، ورمز الاستجابة السريعة (QR Code).
        </p>
        <p>
          تمر الفوترة الإلكترونية بمرحلتين: <strong>مرحلة الإصدار</strong> (إلزامية لجميع المنشآت)، و<strong>مرحلة الربط والتكامل</strong> التي تتطلب ربط أنظمة الفوترة مع منصة هيئة الزكاة والضريبة والجمارك.
        </p>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">ضريبة القيمة المضافة في دول الخليج</h3>
        <p>
          وقّعت دول مجلس التعاون الخليجي الست الاتفاقية الموحدة لضريبة القيمة المضافة، لكن التطبيق جاء متفاوتاً. السعودية والإمارات طبّقتا الضريبة أولاً في 2018، تلتهما البحرين في 2019 وعُمان في 2021. الكويت وقطر لم تطبقا الضريبة حتى الآن.
        </p>
        <p>
          تتصدر السعودية بنسبة <strong>15%</strong> كأعلى نسبة خليجياً، تليها البحرين بـ <strong>10%</strong> (رُفعت من 5% في يناير 2022)، ثم الإمارات وعُمان بـ <strong>5%</strong> لكل منهما. هذا التفاوت يؤثر على المنافسة التجارية والاستثمارية بين دول المنطقة.
        </p>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white">نصائح لإدارة ضريبة القيمة المضافة</h3>
        <ul className="list-disc pr-6 space-y-1">
          <li>احتفظ بجميع الفواتير الضريبية لمدة لا تقل عن 6 سنوات</li>
          <li>قدّم الإقرار الضريبي في موعده لتجنب الغرامات</li>
          <li>استخدم نظام محاسبي معتمد يدعم الفوترة الإلكترونية</li>
          <li>تأكد من صحة الأرقام الضريبية لمورديك قبل احتساب ضريبة المدخلات</li>
          <li>استشر محاسباً قانونياً في الحالات المعقدة</li>
          <li>تابع تحديثات هيئة الزكاة والضريبة والجمارك باستمرار</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 rounded-xl p-4 not-prose">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>🔗 مصادر رسمية:</strong> للمزيد من التفاصيل، يمكنك زيارة{" "}
            <span className="underline">بوابة هيئة الزكاة والضريبة والجمارك (zatca.gov.sa)</span>{" "}
            أو الاتصال على الرقم الموحد 19993.
          </p>
        </div>
      </div>
    </div>
  );
}
