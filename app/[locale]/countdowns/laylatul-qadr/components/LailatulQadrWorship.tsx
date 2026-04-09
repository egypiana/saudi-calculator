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
    icon: "🤲",
    title: "أدعية ليلة القدر",
    tips: [
      "الدعاء المأثور: «اللهم إنك عفوٌّ تحب العفو فاعفُ عني» - وهو الدعاء الذي علّمه النبي ﷺ لعائشة رضي الله عنها",
      "الإلحاح في الدعاء وتكراره، فإن الله يحب الملحّين في الدعاء",
      "الدعاء بجوامع الكلم والأدعية الجامعة الواردة في القرآن والسنة",
      "الدعاء لنفسك ولوالديك وأهلك والمسلمين أجمعين",
      "استحضار القلب والخشوع أثناء الدعاء والتضرع إلى الله",
    ],
  },
  {
    number: 2,
    icon: "🕌",
    title: "صلاة القيام",
    tips: [
      "صلاة التراويح والقيام في المسجد مع الإمام حتى ينصرف",
      "إطالة القيام والركوع والسجود والتدبر في القراءة",
      "صلاة التهجد في الثلث الأخير من الليل حيث ينزل الله إلى السماء الدنيا",
      "الحرص على صلاة الوتر آخر الليل وإطالة دعاء القنوت فيها",
    ],
  },
  {
    number: 3,
    icon: "📖",
    title: "قراءة القرآن",
    tips: [
      "تخصيص وقت كافٍ لقراءة القرآن الكريم بتدبر وتمعّن",
      "قراءة سورة القدر وسورة الدخان والتأمل في معانيها",
      "محاولة ختم القرآن الكريم في العشر الأواخر أو مراجعة المحفوظ",
      "الاستماع إلى القرآن بصوت القراء المجوّدين للتأثر والتدبر",
    ],
  },
  {
    number: 4,
    icon: "📿",
    title: "الذكر والاستغفار",
    tips: [
      "الإكثار من التسبيح والتحميد والتكبير والتهليل طوال الليل",
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
      "إخراج الصدقة في ليالي العشر الأواخر لعل إحداها توافق ليلة القدر",
      "التصدق على الفقراء والمساكين وكفالة الأيتام",
      "المشاركة في مشاريع إفطار الصائمين والسلال الغذائية",
      "إخراج زكاة الفطر قبل صلاة العيد والتعجيل بها",
    ],
  },
];

export default function LailatulQadrWorship() {
  return (
    <section dir="rtl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        كيف تحيي ليلة القدر؟
      </h2>

      {/* Featured Dua */}
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl border border-violet-200 dark:border-violet-800/40 p-6 mb-6">
        <div className="text-center">
          <span className="text-3xl mb-3 block">🤲</span>
          <p className="text-xl md:text-2xl font-bold text-violet-800 dark:text-violet-300 mb-2 leading-relaxed">
            «اللهم إنك عفوٌّ تحب العفو فاعفُ عني»
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            الدعاء الذي علّمه النبي ﷺ لعائشة رضي الله عنها لليلة القدر
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
                <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-sm">
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
                      <span className="text-violet-500 mt-1.5 flex-shrink-0">
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
