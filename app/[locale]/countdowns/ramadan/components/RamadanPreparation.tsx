interface PrepStep {
  number: number;
  icon: string;
  title: string;
  tips: string[];
}

const STEPS: PrepStep[] = [
  {
    number: 1,
    icon: "🤲",
    title: "التحضير الروحي",
    tips: [
      "وضع خطة لختم القرآن الكريم مرة أو أكثر خلال الشهر",
      "البدء بصيام أيام من شهر شعبان تمهيدًا لرمضان",
      "الإكثار من الدعاء والاستغفار والتوبة قبل دخول الشهر",
    ],
  },
  {
    number: 2,
    icon: "💪",
    title: "التحضير الجسدي",
    tips: [
      "تعديل مواعيد النوم تدريجيًا للتأقلم مع أوقات السحور والقيام",
      "تقليل استهلاك الكافيين والسكريات أسبوعين قبل رمضان",
      "ممارسة الرياضة الخفيفة بانتظام لتعزيز اللياقة البدنية",
    ],
  },
  {
    number: 3,
    icon: "🏠",
    title: "التحضير المنزلي",
    tips: [
      "إعداد قائمة طعام أسبوعية متنوعة وصحية للإفطار والسحور",
      "شراء مستلزمات رمضان الأساسية مثل التمر والمكسرات والبهارات",
      "تهيئة مكان هادئ ومريح للعبادة وقراءة القرآن في المنزل",
    ],
  },
  {
    number: 4,
    icon: "💰",
    title: "التخطيط المالي",
    tips: [
      "وضع ميزانية محددة لمصاريف الإفطار والسحور والتسوق",
      "التخطيط لإخراج الزكاة والصدقات وتحديد الجهات المستفيدة",
      "تجنب الإسراف في شراء الطعام والحرص على عدم الهدر",
    ],
  },
  {
    number: 5,
    icon: "👨‍👩‍👧‍👦",
    title: "الأهداف الاجتماعية",
    tips: [
      "تنظيم إفطارات جماعية مع الأهل والأصدقاء والجيران",
      "تخصيص وقت لصلة الأرحام وزيارة الأقارب وكبار السن",
      "المشاركة في البرامج الخيرية ومشاريع إفطار صائم والتطوع",
    ],
  },
];

export default function RamadanPreparation() {
  return (
    <section dir="rtl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        كيف تستعد لشهر رمضان؟
      </h2>
      <div className="space-y-4">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5"
          >
            <div className="flex items-start gap-4">
              {/* Number Circle */}
              <div className="flex-shrink-0 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm">
                  {step.number}
                </div>
                <span className="text-2xl" role="img" aria-hidden="true">
                  {step.icon}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                  {step.title}
                </h3>
                <ul className="space-y-2">
                  {step.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary-500 mt-1.5 flex-shrink-0">
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
