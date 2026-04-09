import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr ? "شروط الاستخدام — حاسبة VIP" : "Terms of Use — Calculator VIP";
  const description = isAr
    ? "شروط استخدام موقع حاسبة VIP — تعرف على الشروط والأحكام المنظمة لاستخدام الموقع."
    : "Terms of Use for Calculator VIP — Learn about the terms and conditions governing the use of our website.";
  return {
    title,
    description,
    ...generatePageSEO(locale, "/terms", { title, description }),
  };
}

export default function TermsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[{ labelAr: "شروط الاستخدام", labelEn: "Terms of Use" }]} />

        <article className="mt-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">شروط الاستخدام</h1>

          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            آخر تحديث: أبريل ٢٠٢٦
          </p>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">١. مقدمة</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            باستخدامكم لموقع حاسبة VIP (calculatorvip.com) فإنكم توافقون على الالتزام بهذه الشروط والأحكام. إذا كنتم لا توافقون على أي من هذه الشروط، يرجى عدم استخدام الموقع. يُعد استمراركم في استخدام الموقع بمثابة قبول لهذه الشروط وأي تعديلات مستقبلية عليها.
          </p>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">٢. وصف الخدمة</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            حاسبة VIP هو موقع إلكتروني يقدم مجموعة من الحاسبات الإلكترونية والعدادات التنازلية المجانية، تشمل حاسبات حساب المواطن، حساب الزكاة، التحويل بين التقويمين الهجري والميلادي، وعدادات تنازلية للمناسبات الإسلامية والوطنية وغيرها من الأدوات المفيدة.
          </p>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">٣. الاستخدام المسموح</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            يُسمح لكم باستخدام الموقع وفقاً للأغراض التالية:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
            <li>الاستخدام الشخصي غير التجاري للحاسبات والأدوات المتوفرة.</li>
            <li>مشاركة روابط الموقع وصفحاته مع الآخرين.</li>
            <li>الاستفادة من الحاسبات والمحتوى التعليمي والمعلوماتي المقدم.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">٤. الاستخدام المحظور</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            يُحظر عليكم القيام بأي من الأعمال التالية:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
            <li>نسخ محتوى الموقع أو إعادة نشره أو توزيعه دون إذن كتابي مسبق.</li>
            <li>استخدام الموقع لأي أغراض غير قانونية أو مخالفة للأنظمة المعمول بها.</li>
            <li>محاولة اختراق الموقع أو الوصول غير المصرح به إلى أنظمته أو قواعد بياناته.</li>
            <li>إرسال أو نشر أي محتوى ضار أو مسيء أو يحتوي على برمجيات خبيثة.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">٥. إخلاء المسؤولية</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed font-semibold">
            يرجى الانتباه جيداً للنقاط التالية:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
            <li>جميع النتائج الحسابية المقدمة عبر الموقع هي نتائج تقريبية وتقديرية، وليست بديلاً عن الاستشارة المتخصصة من الجهات المختصة.</li>
            <li>المواعيد الهجرية المعروضة قد تختلف بيوم أو يومين عن التقويم الرسمي، وذلك لأن بداية الشهر الهجري تعتمد على رؤية الهلال.</li>
            <li>المحتوى الشرعي المقدم على الموقع هو للاستزادة والمعرفة العامة فقط، وليس فتوى شرعية. يرجى الرجوع إلى عالم شرعي متخصص للفتاوى والأحكام الشرعية.</li>
            <li>لا نتحمل أي مسؤولية عن القرارات المبنية على نتائج الحاسبات أو المعلومات المقدمة على الموقع.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">٦. حقوق الملكية الفكرية</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            جميع المحتويات المنشورة على الموقع، بما في ذلك النصوص والتصميمات والشعارات والرسومات والأكواد البرمجية، هي ملك لموقع حاسبة VIP ومحمية بموجب قوانين الملكية الفكرية المعمول بها. لا يجوز نسخ أو إعادة إنتاج أو توزيع أي جزء من محتوى الموقع دون الحصول على إذن كتابي مسبق.
          </p>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">٧. الروابط الخارجية</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            قد يحتوي الموقع على روابط لمواقع إلكترونية تابعة لأطراف ثالثة. لا نتحمل أي مسؤولية عن محتوى أو سياسات أو ممارسات هذه المواقع الخارجية. ننصحكم بمراجعة شروط الاستخدام وسياسة الخصوصية لأي موقع خارجي تزورونه.
          </p>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">٨. التعديلات على الشروط</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            نحتفظ بالحق في تعديل أو تحديث هذه الشروط في أي وقت دون إشعار مسبق. سيتم نشر أي تعديلات على هذه الصفحة مع تحديث تاريخ &quot;آخر تحديث&quot;. استمراركم في استخدام الموقع بعد نشر التعديلات يُعد قبولاً للشروط المعدلة.
          </p>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">٩. القانون المعمول به</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            تخضع هذه الشروط وتُفسَّر وفقاً لأنظمة وقوانين المملكة العربية السعودية. أي نزاع ينشأ عن استخدام الموقع أو يتعلق بهذه الشروط يخضع للاختصاص القضائي للمحاكم المختصة في المملكة العربية السعودية.
          </p>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">١٠. التواصل معنا</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            إذا كانت لديكم أي أسئلة أو استفسارات حول شروط الاستخدام هذه، يمكنكم التواصل معنا عبر البريد الإلكتروني:
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed font-semibold" dir="ltr">
            contact@calculatorvip.com
          </p>
        </article>
      </div>
    </main>
  );
}
