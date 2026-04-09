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
    title: "صيام محرم",
    tips: [
      "شهر محرم أفضل شهر للصيام بعد رمضان — قال النبي ﷺ: «أفضل الصيام بعد رمضان شهر الله المحرم» (رواه مسلم)",
      "يُستحب الإكثار من صيام التطوع في شهر محرم قدر المستطاع",
      "الصيام في الأشهر الحرم له فضل عظيم ومضاعف",
      "لا يشترط صيام الشهر كاملًا بل يصوم ما تيسر منه",
    ],
  },
  {
    number: 2,
    icon: "🕌",
    title: "صيام عاشوراء",
    tips: [
      "صيام يوم عاشوراء (١٠ محرم) يكفّر ذنوب سنة كاملة — قال النبي ﷺ: «صيام يوم عاشوراء أحتسب على الله أن يكفّر السنة التي قبله» (رواه مسلم)",
      "يُستحب صيام التاسع مع العاشر من محرم لمخالفة أهل الكتاب",
      "قال النبي ﷺ: «لئن بقيت إلى قابل لأصومنّ التاسع» (رواه مسلم)",
      "يجوز صيام العاشر وحده، والأفضل صيام التاسع والعاشر معًا",
    ],
  },
  {
    number: 3,
    icon: "🔄",
    title: "التوبة والاستغفار",
    tips: [
      "بداية العام الهجري الجديد فرصة عظيمة لتجديد التوبة والرجوع إلى الله",
      "الاستغفار بصيغه المختلفة وخاصة سيد الاستغفار",
      "محاسبة النفس على ما مضى من العام والعزم على الإصلاح",
      "فتح صفحة جديدة مع الله تعالى بتوبة نصوح صادقة",
    ],
  },
  {
    number: 4,
    icon: "🤲",
    title: "الدعاء",
    tips: [
      "الدعاء في شهر محرم من أعظم القربات إلى الله تعالى",
      "الدعاء بالثبات على الطاعة والاستقامة في العام الجديد",
      "الدعاء لنفسك ولوالديك وأهلك وللمسلمين أجمعين",
      "استحضار القلب والخشوع والإلحاح في الدعاء والتضرع إلى الله",
    ],
  },
  {
    number: 5,
    icon: "💰",
    title: "الصدقة",
    tips: [
      "الصدقة في شهر محرم من أعظم القربات إلى الله تعالى",
      "العمل الصالح في الأشهر الحرم أعظم أجرًا عند الله",
      "التصدق على الفقراء والمساكين وكفالة الأيتام",
      "إطعام الصائمين وتفطيرهم لنيل أجر صيامهم دون أن ينقص من أجرهم شيء",
    ],
  },
];

export default function HijriNewYearWorship() {
  return (
    <section dir="rtl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        كيف تستقبل العام الهجري الجديد؟
      </h2>

      {/* Featured Hadith */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl border border-indigo-200 dark:border-indigo-800/40 p-6 mb-6">
        <div className="text-center">
          <span className="text-3xl mb-3 block">🗓️</span>
          <p className="text-xl md:text-2xl font-bold text-indigo-800 dark:text-indigo-300 mb-2 leading-relaxed">
            «أفضل الصيام بعد رمضان شهر الله المحرم»
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            رواه مسلم عن أبي هريرة رضي الله عنه
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
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
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
                      <span className="text-indigo-500 mt-1.5 flex-shrink-0">
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
