const PREPARATIONS = [
  {
    number: 1, icon: "🐑",
    title: "تجهيز الأضحية",
    desc: "اختر أضحيتك مبكراً وتأكد من خلوها من العيوب الشرعية (العرج البيّن، العور البيّن، المرض البيّن، الهزال الشديد). يُستحب أن تكون سمينة حسنة المنظر.",
    tip: "اشترِ الأضحية قبل أسبوع على الأقل من العيد لتجنب ارتفاع الأسعار وضمان الجودة",
  },
  {
    number: 2, icon: "📿",
    title: "صيام يوم عرفة",
    desc: "يُستحب صيام يوم عرفة (9 ذو الحجة) لغير الحاج. قال النبي ﷺ: صيام يوم عرفة يكفّر ذنوب سنتين — السنة الماضية والسنة القادمة.",
    tip: "نوِّ الصيام من الليل واحرص على الإكثار من الدعاء يوم عرفة فإنه يوم مستجاب",
  },
  {
    number: 3, icon: "🔊",
    title: "التكبيرات المقيدة",
    desc: "ابدأ التكبير المقيد من فجر يوم عرفة حتى عصر آخر أيام التشريق (13 ذو الحجة). كبّر عقب كل صلاة فريضة وفي الطريق وفي البيت.",
    tip: "علّم أطفالك صيغة التكبير وشاركهم الفرحة: الله أكبر الله أكبر لا إله إلا الله",
  },
  {
    number: 4, icon: "🥩",
    title: "توزيع لحم الأضحية",
    desc: "قسّم لحم الأضحية إلى ثلاثة أقسام: ثلث لأهل البيت، وثلث للأقارب والجيران، وثلث للفقراء والمساكين. هذا التقسيم مستحب وليس واجباً.",
    tip: "تواصل مع جمعيات البر المحلية لتوزيع نصيب الفقراء بشكل منظم",
  },
  {
    number: 5, icon: "👔",
    title: "الاستعداد لصلاة العيد",
    desc: "اغتسل والبس أفضل ثيابك وتطيّب قبل الخروج لصلاة العيد. يُسن الأكل من الأضحية بعد الصلاة، على خلاف عيد الفطر حيث يُسن الأكل قبل الصلاة.",
    tip: "اذهب لصلاة العيد من طريق وارجع من طريق آخر اتباعاً للسنة",
  },
  {
    number: 6, icon: "🗓️",
    title: "التخطيط لأيام التشريق",
    desc: "أيام التشريق (11، 12، 13 ذو الحجة) أيام أكل وشرب وذكر لله. خطط للزيارات العائلية وتبادل التهاني والعيديات خلال هذه الأيام المباركة.",
    tip: "ضع برنامجاً لزيارة الأقارب والجيران خلال أيام العيد الأربعة",
  },
];

function toAr(n: number): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

export default function EidAdhaPreparation() {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
        ✅ كيف تستعد لعيد الأضحى المبارك؟
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {PREPARATIONS.map((prep) => (
          <div
            key={prep.number}
            className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 border-r-4 border-r-amber-500"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-xs font-bold text-amber-700 dark:text-amber-400">
                  {toAr(prep.number)}
                </span>
                <h3 className="font-bold text-gray-800 dark:text-white text-sm">{prep.title}</h3>
              </div>
              <span className="text-2xl">{prep.icon}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              {prep.desc}
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/10 rounded-lg px-3 py-2">
              <p className="text-xs text-amber-700 dark:text-amber-400">
                💡 نصيحة: {prep.tip}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
