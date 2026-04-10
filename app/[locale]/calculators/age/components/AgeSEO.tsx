"use client";

export default function AgeSEO() {
  return (
    <section dir="rtl" lang="ar" className="text-sm leading-relaxed space-y-5">
      {/* 1. حساب العمر بالهجري والميلادي */}
      <div>
        <h3 className="font-bold text-base mb-2">حساب العمر بالهجري والميلادي</h3>
        <p>
          <strong>حاسبة العمر</strong> هي أداة إلكترونية متقدمة تتيح لك معرفة{" "}
          <strong>كم عمرك</strong> بدقة تامة بالسنوات والأشهر والأيام، سواء بالتقويم
          الميلادي (الغريغوري) أو التقويم الهجري (القمري). إذا كنت تتساءل{" "}
          <strong>&quot;كم عمري&quot;</strong> أو تريد{" "}
          <strong>احسب عمرك</strong> بشكل فوري، فإن هذه الحاسبة تقوم بذلك
          تلقائيًا بمجرد إدخال تاريخ ميلادك. تعتمد الحاسبة على خوارزمية{" "}
          <strong>رقم اليوم الجولياني (JDN)</strong> لتحويل التواريخ بين النظامين
          الهجري والميلادي بدقة عالية، مما يضمن نتائج موثوقة تراعي الفرق بين
          طول السنة الشمسية (365.25 يومًا) والسنة القمرية (354.36 يومًا). يُعدّ{" "}
          <strong>حساب العمر بالهجري والميلادي</strong> أمرًا ضروريًا في المملكة
          العربية السعودية ودول الخليج حيث يُستخدم كلا التقويمين في المعاملات
          الرسمية والحكومية.
        </p>
      </div>

      {/* 2. كيف تحسب عمرك بدقة */}
      <div>
        <h3 className="font-bold text-base mb-2">كيف تحسب عمرك بدقة</h3>
        <p>
          لحساب عمرك بالتقويم الميلادي بدقة، تتبع الحاسبة الخطوات التالية:
        </p>
        <ol className="list-decimal list-inside space-y-1 mt-2">
          <li>
            <strong>حساب فرق السنوات:</strong> تُطرح سنة الميلاد من السنة
            الحالية للحصول على العدد الأولي للسنوات.
          </li>
          <li>
            <strong>حساب فرق الأشهر:</strong> يُقارن الشهر الحالي بشهر الميلاد.
            إذا كان الشهر الحالي أقل من شهر الميلاد، تُنقص سنة واحدة وتُضاف 12
            شهرًا للفرق.
          </li>
          <li>
            <strong>حساب فرق الأيام:</strong> يُقارن اليوم الحالي بيوم الميلاد.
            إذا كان اليوم الحالي أقل، يُنقص شهر واحد ويُضاف عدد أيام الشهر
            السابق.
          </li>
          <li>
            <strong>معالجة السنوات الكبيسة:</strong> تؤخذ السنوات الكبيسة في
            الاعتبار عند حساب شهر فبراير (28 أو 29 يومًا) لضمان الدقة.
          </li>
          <li>
            <strong>النتيجة النهائية:</strong> يُعرض عمرك بصيغة واضحة: X سنة و Y
            شهر و Z يوم، بالإضافة إلى إجمالي الأيام والأسابيع والساعات منذ
            ولادتك.
          </li>
        </ol>
      </div>

      {/* 3. حساب العمر بالتقويم الهجري */}
      <div>
        <h3 className="font-bold text-base mb-2">حساب العمر بالتقويم الهجري</h3>
        <p>
          التقويم الهجري هو تقويم قمري يعتمد على دورة القمر حول الأرض. يبلغ طول
          السنة الهجرية حوالي <strong>354.36 يومًا</strong> مقارنة بـ{" "}
          <strong>365.25 يومًا</strong> للسنة الميلادية، أي أن السنة الهجرية أقصر
          بنحو 10 إلى 11 يومًا. لهذا السبب، يكون{" "}
          <strong>عمرك بالهجري أكبر دائمًا</strong> من عمرك بالميلادي. تستخدم
          الحاسبة معادلة التحويل التالية لتقدير العمر الهجري:
        </p>
        <div className="mt-3 rounded-lg bg-blue-50 p-4 text-center">
          <p className="font-mono text-sm">
            العمر الهجري = العمر الميلادي &divide; 0.97 (تقريبًا)
          </p>
          <p className="mt-2 text-xs text-gray-600">
            أو بدقة أكبر: العمر الهجري = العمر بالأيام &divide; 354.36667
          </p>
        </div>
        <p className="mt-2">
          يتكون التقويم الهجري من 12 شهرًا قمريًا تتراوح بين 29 و 30 يومًا، وهي:
          محرّم، صفر، ربيع الأول، ربيع الآخر، جمادى الأولى، جمادى الآخرة، رجب،
          شعبان، رمضان، شوّال، ذو القعدة، وذو الحجة. تُستخدم خوارزمية JDN
          لتحويل أي تاريخ ميلادي إلى ما يقابله هجريًا بدقة عالية.
        </p>
      </div>

      {/* 4. الفرق بين العمر بالهجري والميلادي */}
      <div>
        <h3 className="font-bold text-base mb-2">الفرق بين العمر بالهجري والميلادي</h3>
        <p>
          بسبب الاختلاف في طول السنة بين التقويمين، يتزايد الفرق بين العمر
          الهجري والميلادي بمرور الوقت. تقريبًا، كل{" "}
          <strong>33 سنة ميلادية</strong> يزداد الفرق بمقدار{" "}
          <strong>سنة هجرية واحدة</strong>. الجدول التالي يوضح هذا الفرق:
        </p>
        <div className="mt-3 rounded-lg bg-green-50 p-4">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="border-b border-green-200">
                <th className="py-1 px-2">العمر بالميلادي</th>
                <th className="py-1 px-2">العمر بالهجري (تقريبًا)</th>
                <th className="py-1 px-2">الفرق</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-green-100">
                <td className="py-1 px-2">10 سنوات</td>
                <td className="py-1 px-2">10 سنوات و 4 أشهر</td>
                <td className="py-1 px-2">~4 أشهر</td>
              </tr>
              <tr className="border-b border-green-100">
                <td className="py-1 px-2">20 سنة</td>
                <td className="py-1 px-2">20 سنة و 7 أشهر</td>
                <td className="py-1 px-2">~7 أشهر</td>
              </tr>
              <tr className="border-b border-green-100">
                <td className="py-1 px-2">33 سنة</td>
                <td className="py-1 px-2">34 سنة</td>
                <td className="py-1 px-2">~سنة واحدة</td>
              </tr>
              <tr className="border-b border-green-100">
                <td className="py-1 px-2">50 سنة</td>
                <td className="py-1 px-2">51 سنة و 6 أشهر</td>
                <td className="py-1 px-2">~سنة و 6 أشهر</td>
              </tr>
              <tr className="border-b border-green-100">
                <td className="py-1 px-2">66 سنة</td>
                <td className="py-1 px-2">68 سنة</td>
                <td className="py-1 px-2">~سنتان</td>
              </tr>
              <tr>
                <td className="py-1 px-2">100 سنة</td>
                <td className="py-1 px-2">103 سنوات</td>
                <td className="py-1 px-2">~3 سنوات</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">
          النسبة الدقيقة هي أن <strong>سنة هجرية واحدة = 0.97 سنة ميلادية</strong>{" "}
          تقريبًا، أو بمعنى آخر <strong>سنة ميلادية واحدة = 1.03 سنة هجرية</strong>.
          لذلك عند مقارنة عمرك بالتقويمين، ستجد دائمًا أن عمرك الهجري أكبر من
          عمرك الميلادي.
        </p>
      </div>

      {/* 5. الأبراج وعلاقتها بتاريخ الميلاد */}
      <div>
        <h3 className="font-bold text-base mb-2">الأبراج وعلاقتها بتاريخ الميلاد</h3>
        <p>
          تعتمد الأبراج الفلكية على موقع الشمس في دائرة البروج وقت الولادة. إليك
          الأبراج الاثني عشر مع تواريخها:
        </p>
        <div className="mt-3 rounded-lg bg-purple-50 p-4">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="border-b border-purple-200">
                <th className="py-1 px-2">البرج</th>
                <th className="py-1 px-2">الفترة</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-purple-100">
                <td className="py-1 px-2">الحمل (Aries)</td>
                <td className="py-1 px-2">21 مارس - 19 أبريل</td>
              </tr>
              <tr className="border-b border-purple-100">
                <td className="py-1 px-2">الثور (Taurus)</td>
                <td className="py-1 px-2">20 أبريل - 20 مايو</td>
              </tr>
              <tr className="border-b border-purple-100">
                <td className="py-1 px-2">الجوزاء (Gemini)</td>
                <td className="py-1 px-2">21 مايو - 20 يونيو</td>
              </tr>
              <tr className="border-b border-purple-100">
                <td className="py-1 px-2">السرطان (Cancer)</td>
                <td className="py-1 px-2">21 يونيو - 22 يوليو</td>
              </tr>
              <tr className="border-b border-purple-100">
                <td className="py-1 px-2">الأسد (Leo)</td>
                <td className="py-1 px-2">23 يوليو - 22 أغسطس</td>
              </tr>
              <tr className="border-b border-purple-100">
                <td className="py-1 px-2">العذراء (Virgo)</td>
                <td className="py-1 px-2">23 أغسطس - 22 سبتمبر</td>
              </tr>
              <tr className="border-b border-purple-100">
                <td className="py-1 px-2">الميزان (Libra)</td>
                <td className="py-1 px-2">23 سبتمبر - 22 أكتوبر</td>
              </tr>
              <tr className="border-b border-purple-100">
                <td className="py-1 px-2">العقرب (Scorpio)</td>
                <td className="py-1 px-2">23 أكتوبر - 21 نوفمبر</td>
              </tr>
              <tr className="border-b border-purple-100">
                <td className="py-1 px-2">القوس (Sagittarius)</td>
                <td className="py-1 px-2">22 نوفمبر - 21 ديسمبر</td>
              </tr>
              <tr className="border-b border-purple-100">
                <td className="py-1 px-2">الجدي (Capricorn)</td>
                <td className="py-1 px-2">22 ديسمبر - 19 يناير</td>
              </tr>
              <tr className="border-b border-purple-100">
                <td className="py-1 px-2">الدلو (Aquarius)</td>
                <td className="py-1 px-2">20 يناير - 18 فبراير</td>
              </tr>
              <tr>
                <td className="py-1 px-2">الحوت (Pisces)</td>
                <td className="py-1 px-2">19 فبراير - 20 مارس</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3">
          بالإضافة إلى الأبراج الغربية، يوجد <strong>البرج الصيني</strong> الذي
          يعتمد على سنة الميلاد ويتكون من 12 حيوانًا تتكرر كل 12 سنة: الفأر،
          الثور، النمر، الأرنب، التنين، الأفعى، الحصان، الماعز، القرد، الديك،
          الكلب، والخنزير. تعرض الحاسبة برجك الغربي والصيني معًا بناءً على تاريخ
          ميلادك.
        </p>
      </div>

      {/* 6. إحصائيات مثيرة عن حياتك */}
      <div>
        <h3 className="font-bold text-base mb-2">إحصائيات مثيرة عن حياتك</h3>
        <p>
          هل تساءلت يومًا عن الأرقام المذهلة التي يحققها جسمك منذ لحظة ولادتك؟
          إليك بعض الإحصائيات المثيرة التي تحسبها الأداة بناءً على عمرك:
        </p>
        <div className="mt-3 rounded-lg bg-orange-50 p-4">
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>نبضات القلب:</strong> ينبض القلب بمعدل{" "}
              <strong>100,000 نبضة يوميًا</strong> تقريبًا، أي نحو 37 مليون نبضة
              في السنة. في عمر 30 سنة، يكون قلبك قد نبض أكثر من مليار نبضة.
            </li>
            <li>
              <strong>مرات التنفس:</strong> يتنفس الإنسان بمعدل{" "}
              <strong>23,000 مرة يوميًا</strong>، أي حوالي 8.4 مليون مرة سنويًا.
            </li>
            <li>
              <strong>رمشات العين:</strong> ترمش العين حوالي{" "}
              <strong>15,000 إلى 20,000 مرة يوميًا</strong>، وكل رمشة تستغرق
              نحو 0.3 ثانية.
            </li>
            <li>
              <strong>ساعات النوم:</strong> يقضي الإنسان{" "}
              <strong>ثلث حياته نائمًا</strong> تقريبًا. فإذا كان عمرك 30 سنة،
              فقد أمضيت نحو 10 سنوات في النوم.
            </li>
            <li>
              <strong>عدد الوجبات:</strong> يتناول الإنسان العادي نحو{" "}
              <strong>3 وجبات يوميًا</strong>، أي أكثر من 1,000 وجبة سنويًا
              وعشرات الآلاف خلال حياته.
            </li>
            <li>
              <strong>المسافة المقطوعة بالدم:</strong> يضخ القلب الدم عبر شبكة
              أوعية يبلغ طولها <strong>96,000 كيلومتر</strong>، وهو ما يكفي
              للالتفاف حول الأرض مرتين ونصف.
            </li>
          </ul>
        </div>
      </div>

      {/* 7. عمرك على الكواكب الأخرى */}
      <div>
        <h3 className="font-bold text-base mb-2">عمرك على الكواكب الأخرى</h3>
        <p>
          يختلف طول السنة من كوكب لآخر حسب المسافة من الشمس وسرعة الدوران حولها.
          لذلك يختلف عمرك بشكل كبير حسب الكوكب الذي تعيش عليه. تحسب الأداة عمرك
          على كل كوكب بقسمة عمرك بالأيام الأرضية على طول سنة ذلك الكوكب:
        </p>
        <div className="mt-3 rounded-lg bg-indigo-50 p-4">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="border-b border-indigo-200">
                <th className="py-1 px-2">الكوكب</th>
                <th className="py-1 px-2">طول السنة (بالأيام الأرضية)</th>
                <th className="py-1 px-2">عمرك إذا كان عمرك الأرضي 30 سنة</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-indigo-100">
                <td className="py-1 px-2">عطارد (Mercury)</td>
                <td className="py-1 px-2">88 يومًا</td>
                <td className="py-1 px-2">~124 سنة</td>
              </tr>
              <tr className="border-b border-indigo-100">
                <td className="py-1 px-2">الزهرة (Venus)</td>
                <td className="py-1 px-2">225 يومًا</td>
                <td className="py-1 px-2">~49 سنة</td>
              </tr>
              <tr className="border-b border-indigo-100">
                <td className="py-1 px-2">المريخ (Mars)</td>
                <td className="py-1 px-2">687 يومًا</td>
                <td className="py-1 px-2">~16 سنة</td>
              </tr>
              <tr className="border-b border-indigo-100">
                <td className="py-1 px-2">المشتري (Jupiter)</td>
                <td className="py-1 px-2">4,333 يومًا</td>
                <td className="py-1 px-2">~2.5 سنة</td>
              </tr>
              <tr className="border-b border-indigo-100">
                <td className="py-1 px-2">زحل (Saturn)</td>
                <td className="py-1 px-2">10,759 يومًا</td>
                <td className="py-1 px-2">~1 سنة</td>
              </tr>
              <tr className="border-b border-indigo-100">
                <td className="py-1 px-2">أورانوس (Uranus)</td>
                <td className="py-1 px-2">30,687 يومًا</td>
                <td className="py-1 px-2">~0.36 سنة</td>
              </tr>
              <tr>
                <td className="py-1 px-2">نبتون (Neptune)</td>
                <td className="py-1 px-2">60,190 يومًا</td>
                <td className="py-1 px-2">~0.18 سنة</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">
          هذا يعني أنك لو كنت تعيش على <strong>عطارد</strong>، لكان عمرك أكبر
          بأربع مرات تقريبًا، بينما لو كنت على <strong>نبتون</strong>، فلن تكون
          قد أتممت حتى سنتك الأولى! تعتمد هذه الحسابات على المعادلة البسيطة:
          العمر الكوكبي = (العمر بالأيام الأرضية) &divide; (طول سنة الكوكب
          بالأيام).
        </p>
      </div>

      {/* 8. أسئلة شائعة حول حساب العمر */}
      <div>
        <h3 className="font-bold text-base mb-2">أسئلة شائعة حول حساب العمر</h3>
        <div className="space-y-3">
          <div>
            <p className="font-semibold">كم عمري بالأيام؟</p>
            <p>
              لمعرفة عمرك بالأيام، أدخل تاريخ ميلادك في الحاسبة وستحصل على
              إجمالي الأيام التي عشتها منذ ولادتك. يمكنك أيضًا حسابها يدويًا
              بضرب عمرك بالسنوات في 365.25 (مع مراعاة السنوات الكبيسة). مثلًا:
              عمر 30 سنة = حوالي 10,958 يومًا.
            </p>
          </div>
          <div>
            <p className="font-semibold">كيف أعرف عمري بالهجري؟</p>
            <p>
              يمكنك معرفة <strong>عمرك بالهجري</strong> بإدخال تاريخ ميلادك
              الميلادي في الحاسبة، وستقوم تلقائيًا بتحويله إلى التاريخ الهجري
              وحساب عمرك بالسنوات والأشهر والأيام الهجرية. تذكر أن عمرك الهجري
              يكون دائمًا أكبر من الميلادي لأن السنة الهجرية أقصر بـ 10-11 يومًا.
            </p>
          </div>
          <div>
            <p className="font-semibold">كيف أحسب فرق العمر بين شخصين؟</p>
            <p>
              لحساب فرق العمر بين شخصين، أدخل تاريخ ميلاد كل منهما في الحاسبة
              واطرح العمر الأصغر من الأكبر. الحاسبة تعرض الفرق بالسنوات والأشهر
              والأيام بدقة. هذا مفيد لمعرفة فرق العمر بين الأزواج أو الإخوة أو
              الأصدقاء.
            </p>
          </div>
          <div>
            <p className="font-semibold">هل حساب العمر بالهجري دقيق؟</p>
            <p>
              نعم، تستخدم الحاسبة خوارزمية رقم اليوم الجولياني (JDN) المعتمدة
              فلكيًا لتحويل التواريخ بين التقويمين. النتائج دقيقة جدًا وتتطابق مع
              التقويمات الرسمية المعتمدة في المملكة العربية السعودية (تقويم أم
              القرى).
            </p>
          </div>
          <div>
            <p className="font-semibold">متى يصادف عيد ميلادي القادم؟</p>
            <p>
              تعرض الحاسبة تلقائيًا موعد عيد ميلادك القادم بالتقويمين الميلادي
              والهجري، مع عدد الأيام المتبقية حتى ذلك التاريخ واليوم من الأسبوع
              الذي سيصادف فيه.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
