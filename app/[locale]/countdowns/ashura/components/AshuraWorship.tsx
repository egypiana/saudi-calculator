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
      "صيام يوم عاشوراء سنة مؤكدة — يكفّر ذنوب السنة الماضية",
      "الأفضل صيام تاسوعاء مع عاشوراء (٩ و ١٠ محرم) مخالفةً لأهل الكتاب",
      "أكمل المراتب صيام ثلاثة أيام: التاسع والعاشر والحادي عشر من محرم",
      "قال النبي ﷺ: «لئن بقيت إلى قابل لأصومن التاسع» يعني مع العاشر (رواه مسلم)",
    ],
  },
  {
    number: 2,
    icon: "🤲",
    title: "الدعاء والذكر",
    tips: [
      "الإكثار من ذكر الله تعالى طوال اليوم: التسبيح والتحميد والتكبير والتهليل",
      "الاستغفار بصيغه المختلفة وخاصة سيد الاستغفار",
      "الدعاء لنفسك ولوالديك ولأهلك وللمسلمين أجمعين",
      "الصلاة على النبي صلى الله عليه وسلم فإنها من أعظم الأذكار",
      "التأمل في قصة موسى عليه السلام والتوكل على الله",
    ],
  },
  {
    number: 3,
    icon: "👨‍👩‍👧‍👦",
    title: "التوسعة على الأهل",
    tips: [
      "التوسعة على الأهل والعيال في المأكل والمشرب يوم عاشوراء",
      "ورد حديث: «من وسّع على أهله يوم عاشوراء وسّع الله عليه سائر سنته»",
      "إدخال السرور على الأسرة وتعليم الأبناء قصة هذا اليوم العظيم",
      "تذكير الأهل بفضل الصيام وحثهم عليه",
    ],
  },
  {
    number: 4,
    icon: "💰",
    title: "الصدقة",
    tips: [
      "الصدقة في شهر محرم من أعظم القربات إلى الله تعالى",
      "محرم من الأشهر الحرم التي يتضاعف فيها أجر العمل الصالح",
      "التصدق على الفقراء والمساكين وإطعام الطعام",
      "إطعام الصائمين وتفطيرهم لنيل أجرهم دون أن ينقص من أجرهم شيء",
    ],
  },
  {
    number: 5,
    icon: "📖",
    title: "قراءة القرآن",
    tips: [
      "قراءة سورة طه التي تتضمن قصة موسى عليه السلام مفصّلة",
      "قراءة سورة الشعراء وفيها قصة مواجهة موسى لفرعون وإغراقه",
      "التدبر في آيات قصة موسى واستخلاص العبر والدروس",
      "مراجعة الحفظ والإكثار من تلاوة القرآن الكريم في هذا اليوم المبارك",
    ],
  },
];

export default function AshuraWorship() {
  return (
    <section dir="rtl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        كيف تحيي يوم عاشوراء؟
      </h2>

      {/* Featured Hadith */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/40 p-6 mb-6">
        <div className="text-center">
          <span className="text-3xl mb-3 block">📿</span>
          <p className="text-xl md:text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-2 leading-relaxed">
            «صيام يوم عاشوراء أحتسب على الله أن يكفّر السنة التي قبله»
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            رواه مسلم عن أبي قتادة رضي الله عنه
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
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
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
                      <span className="text-emerald-500 mt-1.5 flex-shrink-0">
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
