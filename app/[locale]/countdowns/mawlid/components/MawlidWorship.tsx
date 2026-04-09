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
    title: "الصلاة على النبي ﷺ",
    tips: [
      "قال النبي ﷺ: «من صلى عليّ صلاة واحدة صلى الله عليه بها عشراً» (رواه مسلم)",
      "الإكثار من الصلاة والسلام على النبي ﷺ طوال اليوم وخاصة يوم الجمعة",
      "أفضل صيغ الصلاة على النبي هي الصلاة الإبراهيمية التي نقرؤها في التشهد",
      "الصلاة على النبي ﷺ سبب لشفاعته يوم القيامة وقربه في الجنة",
    ],
  },
  {
    number: 2,
    icon: "📖",
    title: "قراءة السيرة النبوية",
    tips: [
      "قراءة سيرة النبي ﷺ من المصادر الموثوقة كسيرة ابن هشام والرحيق المختوم",
      "التعرف على حياته ﷺ منذ مولده حتى وفاته واستخلاص الدروس والعبر",
      "مشاركة القصص النبوية مع الأسرة والأصدقاء لنشر المعرفة بسيرته ﷺ",
      "حضور الدروس والمحاضرات عن السيرة النبوية في المساجد والمراكز الإسلامية",
    ],
  },
  {
    number: 3,
    icon: "⭐",
    title: "التأسي بأخلاق النبي ﷺ",
    tips: [
      "التخلق بأخلاق النبي ﷺ من الصدق والأمانة والرحمة والتواضع",
      "الإحسان إلى الجيران والمحتاجين اقتداءً بالنبي ﷺ الذي كان أجود الناس",
      "العفو والتسامح مع الآخرين فالنبي ﷺ لم يكن ينتقم لنفسه قط",
      "إفشاء السلام وبذل التحية للناس كما كان ﷺ يبدأ من لقيه بالسلام",
    ],
  },
  {
    number: 4,
    icon: "👨‍👩‍👧‍👦",
    title: "تعليم الأبناء",
    tips: [
      "تعليم الأطفال قصة مولد النبي ﷺ ونشأته بأسلوب شيّق ومبسط",
      "غرس محبة النبي ﷺ في قلوب الأبناء من خلال ذكر شمائله وأخلاقه",
      "تعليمهم سنن النبي ﷺ اليومية كالسواك وأذكار الصباح والمساء",
      "تشجيعهم على حفظ أحاديث نبوية قصيرة وتطبيقها في حياتهم",
    ],
  },
  {
    number: 5,
    icon: "💰",
    title: "الصدقة والإحسان",
    tips: [
      "التصدق على الفقراء والمحتاجين استشعارًا لرحمة النبي ﷺ بالضعفاء",
      "إطعام الطعام وإكرام الضيف اقتداءً بسنة النبي ﷺ",
      "كفالة الأيتام فالنبي ﷺ نشأ يتيمًا وأوصى بالأيتام خيرًا",
      "المشاركة في الأعمال الخيرية والتطوعية خدمة للمجتمع",
    ],
  },
];

export default function MawlidWorship() {
  return (
    <section dir="rtl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        كيف نحيي ذكرى المولد النبوي؟
      </h2>

      {/* Featured Hadith */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-2xl border border-teal-200 dark:border-teal-800/40 p-6 mb-6">
        <div className="text-center">
          <span className="text-3xl mb-3 block">🕌</span>
          <p className="text-xl md:text-2xl font-bold text-teal-800 dark:text-teal-300 mb-2 leading-relaxed">
            «من صلى عليّ صلاة واحدة صلى الله عليه بها عشراً»
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
                <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-sm">
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
                      <span className="text-teal-500 mt-1.5 flex-shrink-0">
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
