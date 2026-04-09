"use client";

interface MawlidContentProps {
  year: number;
}

export default function MawlidContent({ year }: MawlidContentProps) {
  return (
    <article dir="rtl" className="prose prose-gray dark:prose-invert max-w-none">
      {/* Section 1: Birth of the Prophet */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        قصة مولد النبي ﷺ
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        وُلد النبي محمد صلى الله عليه وسلم في مكة المكرمة يوم الاثنين الثاني عشر من شهر ربيع الأول من عام الفيل، الموافق عام 571 ميلادي على الأرجح. وُلد يتيمًا فقد توفي أبوه عبد الله بن عبد المطلب قبل مولده، وكفله جده عبد المطلب ثم عمه أبو طالب. أرضعته حليمة السعدية في بادية بني سعد حيث نشأ في بيئة عربية فصيحة. وقد ظهرت بركات مولده صلى الله عليه وسلم منذ تلك الليلة، فقد روي أن نار المجوس التي كانوا يعبدونها خمدت، وأن إيوان كسرى ارتجّ وسقطت منه أربع عشرة شرفة. ويحتفل المسلمون في عام {year} بذكرى هذا المولد العظيم الذي غيّر مسار البشرية.
      </p>

      {/* Quran Verse */}
      <blockquote className="border-r-4 border-teal-500 bg-teal-50 dark:bg-teal-900/10 pr-4 py-3 rounded-lg my-6 not-prose">
        <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed font-medium">
          ﴿وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ﴾
        </p>
        <cite className="text-sm text-gray-500 dark:text-gray-400 mt-2 block not-italic">
          سورة الأنبياء - الآية 107
        </cite>
      </blockquote>

      {/* Section 2: Lineage */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        نسب النبي ﷺ وأسرته
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        هو محمد بن عبد الله بن عبد المطلب بن هاشم بن عبد مناف بن قصي، من قبيلة قريش أشرف القبائل العربية نسبًا. أمه آمنة بنت وهب سيدة نساء بني زهرة. تزوج صلى الله عليه وسلم خديجة بنت خويلد رضي الله عنها وكانت أول من آمن به من النساء، وهي أم أولاده: القاسم وعبد الله وزينب ورقية وأم كلثوم وفاطمة رضي الله عنهم أجمعين. وكان صلى الله عليه وسلم خير الناس نسبًا وحسبًا، قال صلى الله عليه وسلم: &quot;إن الله اصطفى كنانة من ولد إسماعيل، واصطفى قريشًا من كنانة، واصطفى من قريش بني هاشم، واصطفاني من بني هاشم&quot; (رواه مسلم).
      </p>

      {/* Section 3: Character */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        شمائل النبي ﷺ وأخلاقه
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        كان النبي صلى الله عليه وسلم أحسن الناس خُلقًا وأكرمهم وأشجعهم وأعدلهم. كان يُلقَّب بالصادق الأمين قبل البعثة، وكان أرحم الناس بالضعفاء والمساكين واليتامى. وصفه الله تعالى بقوله: ﴿وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ﴾. كان متواضعًا يخصف نعله ويرقع ثوبه ويحلب شاته، ويجلس مع المساكين ويأكل مع الخادم. كان كثير التبسم لطيف المعشر، يبدأ من لقيه بالسلام ولا ينزع يده من يد مصافحه حتى يكون الآخر هو الذي ينزعها. وكان أوفى الناس بالعهد وأصدقهم في الحديث وأرفقهم بالأمة.
      </p>

      {/* Quran Verse */}
      <blockquote className="border-r-4 border-teal-500 bg-teal-50 dark:bg-teal-900/10 pr-4 py-3 rounded-lg my-6 not-prose">
        <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed font-medium">
          ﴿إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا﴾
        </p>
        <cite className="text-sm text-gray-500 dark:text-gray-400 mt-2 block not-italic">
          سورة الأحزاب - الآية 56
        </cite>
      </blockquote>

      {/* Section 4: Mawlid in Saudi Arabia */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        المولد النبوي في السعودية
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        أصبح يوم المولد النبوي الشريف إجازة رسمية في المملكة العربية السعودية اعتبارًا من عام 2023 ميلادي (1445 هـ)، حيث أقرّت الحكومة السعودية منح إجازة رسمية بمناسبة ذكرى المولد النبوي الشريف لجميع القطاعين العام والخاص. ويأتي هذا القرار تعبيرًا عن حب المملكة وشعبها للنبي صلى الله عليه وسلم وتعظيمًا لذكراه الشريفة. ويحرص المسلمون في هذا اليوم على الإكثار من الصلاة والسلام على النبي صلى الله عليه وسلم، وقراءة سيرته العطرة، والتأسي بأخلاقه الكريمة. وتُقام في المساجد والمدارس ندوات ودروس عن حياة النبي صلى الله عليه وسلم وشمائله.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6 not-prose">
        <div className="bg-teal-50 dark:bg-teal-900/15 border border-teal-200 dark:border-teal-800/40 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🏛️</div>
          <h4 className="font-bold text-teal-800 dark:text-teal-300 text-sm mb-1">إجازة رسمية</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">منذ عام 2023م في المملكة</p>
        </div>
        <div className="bg-teal-50 dark:bg-teal-900/15 border border-teal-200 dark:border-teal-800/40 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🕌</div>
          <h4 className="font-bold text-teal-800 dark:text-teal-300 text-sm mb-1">١٢ ربيع الأول</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">ذكرى مولد خير البرية ﷺ</p>
        </div>
      </div>
    </article>
  );
}
