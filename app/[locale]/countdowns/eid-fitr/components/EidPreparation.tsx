const PREPARATIONS = [
  {
    number: 1, icon: "💰",
    title: "إخراج زكاة الفطر",
    desc: "احرص على إخراج زكاة الفطر قبل صلاة العيد. الأفضل إخراجها قبل يوم أو يومين لتصل إلى المستحقين في الوقت المناسب. مقدارها صاع من قوت أهل البلد (نحو 3 كيلو) أو ما يعادلها نقداً.",
    tip: "أخرج زكاة الفطر عن أهل بيتك جميعاً بما فيهم الأطفال والزوجة",
  },
  {
    number: 2, icon: "👔",
    title: "الملابس الجديدة والمظهر",
    desc: "يستحب ارتداء أجمل الثياب وأنظفها في يوم العيد. جهّز ملابس العيد الجديدة للأطفال مسبقاً لتجنب ازدحام الأسواق.",
    tip: "اشترِ الملابس قبل أسبوعين من العيد لتجنب الأسعار المرتفعة وشُح المخزون",
  },
  {
    number: 3, icon: "🎁",
    title: "العيديات والهدايا",
    desc: "العيدية سنّة جميلة تُدخل السرور على قلوب الأطفال. جهّز مبالغ مناسبة لتوزيعها على الأطفال من العائلة والجيران.",
    tip: "أعدّ ظروفاً مُعدّة مسبقاً تحتوي على العيديات لتسهيل توزيعها",
  },
  {
    number: 4, icon: "🍰",
    title: "حلويات العيد",
    desc: "تحضير الكعك والمعمول والحلويات التقليدية جزء أصيل من روح العيد. يمكن تحضيرها قبل يوم أو يومين من العيد.",
    tip: "اجعل تحضير الحلويات مناسبة عائلية تُشارك فيها الأطفال",
  },
  {
    number: 5, icon: "🗓️",
    title: "التخطيط للزيارات العائلية",
    desc: "رتّب الزيارات مسبقاً لتشمل جميع الأهل والأقارب. ابدأ بزيارة الأكبر سناً وصلة الرحم في أيام العيد.",
    tip: "ضع برنامجاً زمنياً لأيام العيد الثلاثة لضمان زيارة جميع الأهل",
  },
  {
    number: 6, icon: "📿",
    title: "التكبير والدعاء",
    desc: "احرص على التكبير من ليلة العيد حتى صلاة العيد. شعار العيد التكبير: الله أكبر الله أكبر لا إله إلا الله، الله أكبر الله أكبر ولله الحمد.",
    tip: "علّم أطفالك التكبير وشاركهم في إحياء شعائر العيد",
  },
];

function toAr(n: number): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

export default function EidPreparation() {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
        ✅ كيف تستعد لعيد الفطر المبارك؟
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
