"use client";

export default function PregnancySEO() {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        📘 دليلك الشامل لحساب الحمل والولادة
      </h2>

      <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed space-y-5" dir="rtl">
        {/* Section 1: كيف يُحسب موعد الولادة؟ */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            كيف يُحسب موعد الولادة؟
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            يعتمد حساب موعد الولادة المتوقع على <strong>قاعدة نيغل (Naegele&apos;s Rule)</strong>، وهي الطريقة
            الأكثر شيوعاً بين الأطباء. تقوم هذه القاعدة على إضافة <strong>280 يوماً (40 أسبوعاً)</strong> إلى
            أول يوم من آخر دورة شهرية.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>مثال:</strong> إذا كانت آخر دورة شهرية بدأت في 1 يناير، فإن موعد الولادة المتوقع يكون
            تقريباً 8 أكتوبر.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            يُعتبر فحص <strong>السونار (الموجات فوق الصوتية)</strong> في الثلث الأول من الحمل أدق وسيلة
            لتحديد عمر الحمل وموعد الولادة، خاصةً إذا كانت الدورة غير منتظمة.
          </p>
        </section>

        {/* Section 2: مراحل الحمل الثلاث */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            مراحل الحمل الثلاث
          </h3>

          <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-xl p-4 mb-3">
            <h4 className="font-semibold text-pink-800 dark:text-pink-300 mb-1">
              الثلث الأول (الأسبوع 1 - 12)
            </h4>
            <p className="text-pink-700 dark:text-pink-300 text-sm">
              مرحلة تكوّن الأعضاء الرئيسية للجنين. يبدأ القلب بالنبض في الأسبوع السادس تقريباً، وتتشكّل
              الأطراف والدماغ والجهاز العصبي. تُعدّ هذه المرحلة الأكثر حساسية.
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-3">
            <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
              الثلث الثاني (الأسبوع 13 - 27)
            </h4>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              مرحلة النمو السريع للجنين. تبدأ الأم بالشعور بحركة الجنين (عادةً بين الأسبوع 18-22). يزداد
              حجم البطن بشكل واضح وتتحسّن أعراض الغثيان عادةً.
            </p>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4">
            <h4 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-1">
              الثلث الثالث (الأسبوع 28 - 40)
            </h4>
            <p className="text-indigo-700 dark:text-indigo-300 text-sm">
              مرحلة اكتمال نمو الجنين، خاصةً الرئتين والدماغ. يستعد الجنين للولادة بالنزول إلى الحوض.
              تزداد الزيارات الطبية وتُراقب صحة الأم والجنين عن كثب.
            </p>
          </div>
        </section>

        {/* Section 3: الفحوصات الطبية المهمة */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            الفحوصات الطبية المهمة
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-200 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-right font-semibold text-gray-800 dark:text-gray-200">
                    الفحص
                  </th>
                  <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-right font-semibold text-gray-800 dark:text-gray-200">
                    الأسبوع
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-3 py-2">أول زيارة للطبيب</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-3 py-2">6 - 8</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="border border-gray-200 dark:border-gray-700 px-3 py-2">فحص الشفافية القفوية</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-3 py-2">11 - 14</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-3 py-2">فحص التشوهات الخلقية</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-3 py-2">18 - 22</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="border border-gray-200 dark:border-gray-700 px-3 py-2">فحص سكر الحمل</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-3 py-2">24 - 28</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-3 py-2">فحص بكتيريا GBS</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-3 py-2">35 - 37</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="border border-gray-200 dark:border-gray-700 px-3 py-2">متابعة أسبوعية</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-3 py-2">36 - 40</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: العقيقة في الإسلام */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            العقيقة في الإسلام
          </h3>
          <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-xl p-4">
            <p className="text-teal-800 dark:text-teal-300 mb-2">
              العقيقة <strong>سُنّة مؤكدة</strong> عن النبي صلى الله عليه وسلم، وهي الذبيحة التي تُذبح
              عن المولود شكراً لله تعالى.
            </p>
            <ul className="list-disc list-inside text-teal-700 dark:text-teal-300 space-y-1 text-sm">
              <li>
                <strong>الوقت:</strong> تُذبح في اليوم السابع من الولادة، فإن لم يتيسّر ففي اليوم الرابع
                عشر، ثم الحادي والعشرين.
              </li>
              <li>
                <strong>العدد:</strong> شاتان عن الذكر، وشاة واحدة عن الأنثى.
              </li>
              <li>
                <strong>حلق الرأس:</strong> يُستحب حلق رأس المولود والتصدّق بوزن شعره فضة.
              </li>
              <li>
                <strong>التسمية:</strong> يُستحب تسمية المولود في اليوم السابع أو قبله باسم حسن.
              </li>
              <li>
                <strong>التوزيع:</strong> ثلث لأهل البيت، وثلث للجيران والأقارب، وثلث للفقراء والمساكين.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5: طرق حساب الحمل */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            طرق حساب الحمل
          </h3>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-bold rounded-full w-7 h-7 flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">حساب من آخر دورة شهرية</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    الطريقة الأكثر شيوعاً. تُحسب المدة بالأشهر من تاريخ أول يوم في آخر دورة شهرية.
                    مناسبة للنساء ذوات الدورة المنتظمة.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-bold rounded-full w-7 h-7 flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">حساب بالسونار</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    الأدق في الثلث الأول من الحمل. يعتمد على قياس حجم الجنين لتحديد عمر الحمل بدقة.
                    يُفضّل خاصةً عند عدم انتظام الدورة.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 font-bold rounded-full w-7 h-7 flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">حساب أطفال الأنابيب (IVF)</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    يُحسب من تاريخ نقل الأجنة. تُضاف 266 يوماً (38 أسبوعاً) لتاريخ نقل الجنين في اليوم
                    الخامس، أو 263 يوماً لنقل اليوم الثالث.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: نصائح مهمة للحامل */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            نصائح مهمة للحامل
          </h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 text-sm">
            <li>
              <strong>تغذية سليمة:</strong> احرصي على نظام غذائي متوازن غني بالحديد والكالسيوم، مع تناول
              حمض الفوليك خاصةً في الأشهر الثلاثة الأولى لحماية الجنين من تشوّهات الأنبوب العصبي.
            </li>
            <li>
              <strong>تجنّب الأدوية:</strong> لا تتناولي أي دواء بدون استشارة الطبيب، فبعض الأدوية قد تكون
              ضارة بالجنين.
            </li>
            <li>
              <strong>الرياضة الخفيفة:</strong> مارسي رياضة خفيفة كالمشي والسباحة بانتظام، فهي تساعد على
              تسهيل الولادة وتحسين المزاج.
            </li>
            <li>
              <strong>شرب الماء:</strong> اشربي من 8 إلى 10 أكواب ماء يومياً للحفاظ على ترطيب الجسم ودعم
              نمو الجنين.
            </li>
            <li>
              <strong>وضعية النوم:</strong> في الثلث الثالث من الحمل، يُفضّل النوم على الجانب الأيسر
              لتحسين تدفق الدم إلى الرحم والجنين.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
