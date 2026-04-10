"use client";

export default function ElectricitySEO() {
  return (
    <section dir="rtl" lang="ar" className="text-sm leading-relaxed space-y-5">
      {/* 1. تعرفة الكهرباء في السعودية 2026 */}
      <div>
        <h2 className="font-bold text-base mb-2">تعرفة الكهرباء في السعودية 2026</h2>
        <p>
          تعتمد الشركة السعودية للكهرباء نظام الشرائح لحساب تعرفة الاستهلاك السكني،
          حيث تبلغ تعرفة الشريحة الأولى <strong>18 هللة/ك.و.س</strong> للاستهلاك من
          1 إلى 6,000 كيلوواط ساعة، بينما تبلغ تعرفة الشريحة الثانية{" "}
          <strong>30 هللة/ك.و.س</strong> لما يزيد عن 6,000 كيلوواط ساعة. وقد ظلت
          هذه التعرفة ثابتة منذ يناير 2018.
        </p>
        <div className="mt-3 rounded-lg bg-green-50 p-4">
          <h3 className="font-semibold mb-2">مقارنة تعرفة القطاعات (هللة/ك.و.س)</h3>
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="border-b border-green-200">
                <th className="py-1 px-2">القطاع</th>
                <th className="py-1 px-2">الشريحة الأولى</th>
                <th className="py-1 px-2">الشريحة الثانية</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-green-100">
                <td className="py-1 px-2">سكني</td>
                <td className="py-1 px-2">18</td>
                <td className="py-1 px-2">30</td>
              </tr>
              <tr className="border-b border-green-100">
                <td className="py-1 px-2">تجاري</td>
                <td className="py-1 px-2">22</td>
                <td className="py-1 px-2">32</td>
              </tr>
              <tr className="border-b border-green-100">
                <td className="py-1 px-2">صناعي</td>
                <td className="py-1 px-2" colSpan={2}>20 (ثابت)</td>
              </tr>
              <tr>
                <td className="py-1 px-2">حكومي</td>
                <td className="py-1 px-2" colSpan={2}>32 (ثابت)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. كيف تُحسب فاتورة الكهرباء؟ */}
      <div>
        <h2 className="font-bold text-base mb-2">كيف تُحسب فاتورة الكهرباء؟</h2>
        <p>
          تُحسب الفاتورة وفق المعادلة التالية:{" "}
          <strong>(الاستهلاك × سعر الشريحة) + رسوم العداد + 15% ضريبة القيمة المضافة</strong>.
        </p>
        <div className="mt-2 rounded-lg bg-gray-50 p-3">
          <p className="font-semibold mb-1">مثال عملي:</p>
          <p>
            استهلاك <strong>4,000 ك.و.س</strong> للقطاع السكني:
          </p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>تكلفة الاستهلاك: 4,000 × 0.18 = <strong>720 ريال</strong></li>
            <li>رسوم العداد: <strong>15 ريال</strong></li>
            <li>الإجمالي قبل الضريبة: 720 + 15 = <strong>735 ريال</strong></li>
            <li>ضريبة القيمة المضافة (15%): 735 × 0.15 = <strong>110.25 ريال</strong></li>
            <li>الإجمالي: 735 + 110.25 = <strong>845.25 ريال</strong></li>
          </ul>
        </div>
      </div>

      {/* 3. التكييف وتأثيره على الفاتورة */}
      <div>
        <h2 className="font-bold text-base mb-2">التكييف وتأثيره على الفاتورة</h2>
        <p>
          يُشكّل التكييف ما بين <strong>60% إلى 70%</strong> من إجمالي استهلاك الكهرباء
          في المنازل السعودية، خصوصًا خلال أشهر الصيف.
        </p>
        <div className="mt-2 rounded-lg bg-gray-50 p-3">
          <h3 className="font-semibold mb-2">مقارنة استهلاك أنواع المكيفات</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>مكيف شباك: حوالي <strong>1,000 واط</strong></li>
            <li>مكيف سبليت: حوالي <strong>1,500 واط</strong></li>
            <li>مكيف مركزي: حوالي <strong>3,500 واط</strong></li>
          </ul>
          <p className="mt-2">
            <strong>نصيحة:</strong> ضبط المكيف على درجة <strong>24°م</strong> بدلًا من
            درجات أقل يُوفّر حوالي <strong>25%</strong> من استهلاك الطاقة.
          </p>
        </div>
      </div>

      {/* 4. نصائح لتوفير الكهرباء */}
      <div>
        <h2 className="font-bold text-base mb-2">نصائح لتوفير الكهرباء</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li>اضبط المكيف على درجة <strong>24°م</strong> للحصول على توازن بين الراحة والتوفير.</li>
          <li>استخدم <strong>العزل الحراري</strong> للجدران والأسقف لتقليل الحمل على المكيف.</li>
          <li>استبدل الإضاءة التقليدية بـ<strong>مصابيح LED</strong> الموفّرة للطاقة.</li>
          <li>أطفئ الأجهزة الكهربائية عند عدم الاستخدام ولا تتركها في وضع الاستعداد.</li>
          <li>استخدم <strong>ستائر عاكسة للحرارة</strong> على النوافذ المعرّضة لأشعة الشمس.</li>
          <li>شغّل الغسالة وغسالة الأطباق في <strong>أوقات الاستهلاك المنخفض</strong> (الليل).</li>
          <li>احرص على <strong>صيانة المكيف</strong> دوريًا وتنظيف الفلاتر شهريًا.</li>
          <li>استفد من <strong>العداد الذكي</strong> لمتابعة استهلاكك لحظيًا وتحديد مصادر الهدر.</li>
        </ol>
      </div>

      {/* 5. تحديثات 2025 */}
      <div>
        <h2 className="font-bold text-base mb-2">تحديثات 2025</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            تم تعديل تعرفة القطاعين <strong>التجاري والصناعي</strong> بزيادة قدرها{" "}
            <strong>+2 هللة</strong> اعتبارًا من مايو 2025.
          </li>
          <li>
            إطلاق <strong>تعرفة الاستهلاك المكثف</strong> للمنشآت المؤهلة التي تستوفي
            شروط الاستهلاك العالي، مما يوفّر أسعارًا تنافسية للمصانع الكبرى.
          </li>
        </ul>
      </div>

      {/* 6. مصادر رسمية */}
      <div>
        <h2 className="font-bold text-base mb-2">مصادر رسمية</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            الشركة السعودية للكهرباء (SEC):{" "}
            <a
              href="https://www.se.com.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              se.com.sa
            </a>
          </li>
          <li>
            هيئة تنظيم المياه والكهرباء (SERA):{" "}
            <a
              href="https://sera.gov.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              sera.gov.sa
            </a>
          </li>
          <li>
            هيئة تنظيم الكهرباء والإنتاج المزدوج (ECRA)
          </li>
        </ul>
      </div>
    </section>
  );
}
