const PREPARATIONS = [
  {
    number: 1, icon: "🟢",
    title: "ارتداء اللون الأخضر",
    desc: "احرص على ارتداء الملابس الخضراء في اليوم الوطني تعبيراً عن حبك للوطن. يمكنك أيضاً ارتداء الأزياء المطبوعة بعلم المملكة أو شعاراتها الوطنية، واقتناء الأوشحة والقبعات الخضراء.",
    tip: "اشترِ ملابسك الخضراء مبكراً قبل نفاد المخزون — الطلب يرتفع كثيراً قبل اليوم الوطني",
  },
  {
    number: 2, icon: "🏠",
    title: "تزيين المنزل والسيارة",
    desc: "زيّن منزلك وسيارتك بالأعلام السعودية والإضاءات الخضراء والملصقات الوطنية. استخدم الزينة الخضراء والبيضاء لخلق أجواء احتفالية مميزة تُشعر الجميع بروح اليوم الوطني.",
    tip: "استخدم الملصقات القابلة للإزالة على السيارة لتجنب إتلاف الطلاء",
  },
  {
    number: 3, icon: "🎆",
    title: "حضور الفعاليات",
    desc: "احضر الفعاليات والحفلات الوطنية المقامة في مدينتك. استمتع بالألعاب النارية والعروض الجوية والحفلات الموسيقية والمعارض التراثية التي تُقام في جميع أنحاء المملكة.",
    tip: "احجز تذاكرك مبكراً عبر التطبيقات الرسمية — الفعاليات الكبرى تنفد بسرعة",
  },
  {
    number: 4, icon: "🎵",
    title: "النشيد الوطني والأناشيد",
    desc: "ردّد النشيد الوطني السعودي واستمع للأناشيد الوطنية الحماسية. علّم أطفالك كلمات النشيد الوطني وحدّثهم عن معانيه السامية وأهمية الوطن في حياتنا.",
    tip: "شارك أطفالك في ترديد النشيد الوطني واشرح لهم معاني كلماته",
  },
  {
    number: 5, icon: "📸",
    title: "التوثيق والمشاركة",
    desc: "وثّق احتفالاتك بالصور والفيديوهات وشاركها على وسائل التواصل الاجتماعي مع هاشتاقات اليوم الوطني. انشر روح الاحتفال والفخر الوطني مع أصدقائك ومتابعيك.",
    tip: "استخدم الهاشتاقات الرسمية لليوم الوطني للوصول لجمهور أوسع",
  },
  {
    number: 6, icon: "🇸🇦",
    title: "التعرف على تاريخ الوطن",
    desc: "استغل هذه المناسبة للتعرف على تاريخ المملكة العربية السعودية ورحلة التوحيد. قم بزيارة المتاحف والمواقع التراثية مثل الدرعية التاريخية ومتحف المصمك وقصر الحكم.",
    tip: "زُر الدرعية التاريخية — مهد الدولة السعودية الأولى ومنطلق رحلة التوحيد",
  },
];

function toAr(n: number): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

export default function NationalDayPreparation() {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
        ✅ كيف تستعد لليوم الوطني السعودي؟
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {PREPARATIONS.map((prep) => (
          <div
            key={prep.number}
            className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 border-r-4 border-r-green-500"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-xs font-bold text-green-700 dark:text-green-400">
                  {toAr(prep.number)}
                </span>
                <h3 className="font-bold text-gray-800 dark:text-white text-sm">{prep.title}</h3>
              </div>
              <span className="text-2xl">{prep.icon}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              {prep.desc}
            </p>
            <div className="bg-green-50 dark:bg-green-900/10 rounded-lg px-3 py-2">
              <p className="text-xs text-green-700 dark:text-green-400">
                💡 نصيحة: {prep.tip}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
