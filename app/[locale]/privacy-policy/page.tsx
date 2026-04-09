import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "سياسة الخصوصية — حاسبة VIP" : "Privacy Policy — Calculator VIP",
    description: isAr
      ? "سياسة الخصوصية لموقع حاسبة VIP — تعرف على كيفية حماية بياناتك وخصوصيتك."
      : "Privacy Policy for Calculator VIP — Learn how we protect your data and privacy.",
    alternates: { canonical: locale === "ar" ? "/privacy-policy" : `/${locale}/privacy-policy` },
  };
}

export default function PrivacyPolicyPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[{ labelAr: "سياسة الخصوصية", labelEn: "Privacy Policy" }]} />

        <article className="mt-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">سياسة الخصوصية</h1>

          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            آخر تحديث: أبريل ٢٠٢٦
          </p>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">١. مقدمة</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            نحن في حاسبة VIP (calculatorvip.com) نحترم خصوصيتكم ونلتزم بحماية بياناتكم الشخصية. توضح هذه السياسة كيفية تعاملنا مع المعلومات عند استخدامكم لموقعنا الإلكتروني. نرجو قراءة هذه السياسة بعناية لفهم ممارساتنا المتعلقة بخصوصيتكم.
          </p>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">٢. المعلومات التي نجمعها</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            نحن لا نجمع أي بيانات شخصية من زوار الموقع. جميع الحاسبات والأدوات المتوفرة على الموقع تعمل بالكامل داخل متصفحكم (من جانب العميل)، ولا يتم إرسال أي بيانات حسابية أو شخصية إلى خوادمنا. لا نطلب منكم التسجيل أو تقديم أي معلومات شخصية لاستخدام خدماتنا.
          </p>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">٣. ملفات تعريف الارتباط (Cookies)</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            نستخدم ملفات تعريف الارتباط (الكوكيز) لتحسين تجربتكم على الموقع. تشمل الكوكيز المستخدمة:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
            <li>كوكيز التفضيلات: لحفظ تفضيلاتكم مثل اللغة المختارة (العربية/الإنجليزية) والوضع الليلي.</li>
            <li>كوكيز Google Analytics: لجمع إحصائيات مجهولة الهوية عن استخدام الموقع.</li>
            <li>كوكيز Google AdSense: لعرض الإعلانات المناسبة لكم.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">٤. خدمات الإعلانات</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            نستخدم خدمة Google AdSense لعرض الإعلانات على موقعنا. قد تستخدم Google وشركاؤها في مجال الإعلانات ملفات تعريف الارتباط (كوكيز) الخاصة بأطراف ثالثة لعرض إعلانات مخصصة بناءً على زياراتكم السابقة لهذا الموقع أو مواقع أخرى. يمكنكم إلغاء الاشتراك في الإعلانات المخصصة من خلال زيارة إعدادات إعلانات Google.
          </p>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">٥. التحليلات</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            نستخدم خدمة Google Analytics لجمع إحصائيات مجهولة الهوية حول زوار الموقع، مثل عدد الزيارات والصفحات الأكثر مشاهدة ومصادر الزيارات. تساعدنا هذه البيانات في تحسين الموقع وتطوير المحتوى. لا تتضمن هذه البيانات أي معلومات تحدد هويتكم الشخصية.
          </p>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">٦. حماية البيانات</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            نتخذ إجراءات أمنية مناسبة لحماية الموقع، تشمل:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
            <li>استخدام تشفير SSL/TLS لتأمين الاتصال بين متصفحكم وخوادمنا.</li>
            <li>عدم تخزين أي بيانات شخصية على خوادمنا.</li>
            <li>معالجة جميع الحسابات محلياً في متصفحكم دون إرسالها إلى أي خادم.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">٧. الروابط الخارجية</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            قد يحتوي موقعنا على روابط لمواقع إلكترونية خارجية. لسنا مسؤولين عن سياسات الخصوصية أو محتوى هذه المواقع الخارجية. ننصحكم بمراجعة سياسة الخصوصية لأي موقع تزورونه عبر الروابط الموجودة على موقعنا.
          </p>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">٨. خصوصية الأطفال</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            موقعنا لا يستهدف الأطفال الذين تقل أعمارهم عن ١٣ سنة، ولا نجمع عن قصد أي بيانات شخصية من الأطفال. إذا اكتشفنا أننا جمعنا بيانات من طفل دون سن ١٣ سنة، سنتخذ الإجراءات اللازمة لحذف تلك البيانات فوراً.
          </p>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">٩. التغييرات على سياسة الخصوصية</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            قد نحدّث هذه السياسة من وقت لآخر لتعكس التغييرات في ممارساتنا أو لأسباب تشغيلية أو قانونية. سيتم نشر أي تعديلات على هذه الصفحة مع تحديث تاريخ &quot;آخر تحديث&quot;. ننصحكم بمراجعة هذه السياسة دورياً للاطلاع على أي تغييرات.
          </p>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-3">١٠. التواصل معنا</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            إذا كانت لديكم أي أسئلة أو استفسارات حول سياسة الخصوصية هذه، يمكنكم التواصل معنا عبر البريد الإلكتروني:
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed font-semibold" dir="ltr">
            contact@calculatorvip.com
          </p>
        </article>
      </div>
    </main>
  );
}
