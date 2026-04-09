"use client";

interface WorshipSection {
  number: number;
  icon: string;
  title: string;
  tips: string[];
}

const WORSHIP_SECTIONS: WorshipSection[] = [
  {
    number: 1,
    icon: "🍽️",
    title: "الصيام",
    tips: [
      "صيام يوم عرفة سنة مؤكدة لغير الحاج — يكفّر ذنوب السنة الماضية والسنة القادمة",
      "قال النبي ﷺ: «صيام يوم عرفة أحتسب على الله أن يكفّر السنة التي قبله والسنة التي بعده» (رواه مسلم)",
      "يُستحب صيام الأيام الثمانية الأولى من ذي الحجة مع يوم عرفة",
      "الأفضل للحاج عدم صيام يوم عرفة ليتقوى على العبادة والوقوف بعرفة",
    ],
  },
  {
    number: 2,
    icon: "🤲",
    title: "الدعاء",
    tips: [
      "خير الدعاء دعاء يوم عرفة — وهو أرجى يوم لإجابة الدعاء في العام كله",
      "أفضل وقت للدعاء من بعد صلاة الظهر (الزوال) إلى غروب الشمس",
      "الدعاء بجوامع الكلم والأدعية الجامعة الواردة في القرآن والسنة",
      "الدعاء لنفسك ولوالديك وأهلك وللمسلمين أجمعين",
      "استحضار القلب والخشوع والإلحاح في الدعاء والتضرع إلى الله",
    ],
  },
  {
    number: 3,
    icon: "🔊",
    title: "التكبير",
    tips: [
      "التكبيرات المقيدة تبدأ من فجر يوم عرفة حتى عصر آخر أيام التشريق (13 ذو الحجة)",
      "صيغة التكبير: الله أكبر الله أكبر لا إله إلا الله، والله أكبر الله أكبر ولله الحمد",
      "التكبير المطلق مشروع في عشر ذي الحجة في كل وقت ومكان",
      "إظهار التكبير ورفع الصوت به في الأسواق والمساجد والبيوت",
    ],
  },
  {
    number: 4,
    icon: "📿",
    title: "الذكر والاستغفار",
    tips: [
      "الإكثار من التسبيح والتحميد والتكبير والتهليل طوال اليوم",
      "الاستغفار بصيغه المختلفة وخاصة سيد الاستغفار",
      "الصلاة على النبي ﷺ فإنها من أعظم الأذكار",
      "ذكر الله في كل حال: قائمًا وقاعدًا وعلى جنبك",
    ],
  },
  {
    number: 5,
    icon: "💰",
    title: "الصدقة",
    tips: [
      "الصدقة في يوم عرفة من أعظم القربات إلى الله تعالى",
      "العمل الصالح في عشر ذي الحجة أحب إلى الله من العمل في غيرها",
      "التصدق على الفقراء والمساكين وكفالة الأيتام",
      "إطعام الصائمين وتفطيرهم لنيل أجر صيامهم دون أن ينقص من أجرهم شيء",
    ],
  },
];

export default function ArafahWorship() {
  return (
    <section dir="rtl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        كيف تحيي يوم عرفة؟
      </h2>

      {/* Featured Dua */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border border-amber-200 dark:border-amber-800/40 p-6 mb-6">
        <div className="text-center">
          <span className="text-3xl mb-3 block">🤲</span>
          <p className="text-xl md:text-2xl font-bold text-amber-800 dark:text-amber-300 mb-2 leading-relaxed">
            «لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير»
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            خير ما قال النبي ﷺ والنبيون من قبله يوم عرفة
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {WORSHIP_SECTIONS.map((section) => (
          <div
            key={section.number}
            className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5"
          >
            <div className="flex items-start gap-4">
              {/* Number Circle */}
              <div className="flex-shrink-0 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
                  {section.number}
                </div>
                <span className="text-2xl" role="img" aria-hidden="true">
                  {section.icon}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1.5 flex-shrink-0">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="6" cy="6" r="3" fill="currentColor" />
                        </svg>
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {tip}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
