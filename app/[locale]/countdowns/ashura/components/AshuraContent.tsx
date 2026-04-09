"use client";

interface AshuraContentProps {
  year: number;
}

export default function AshuraContent({ year }: AshuraContentProps) {
  return (
    <article dir="rtl" className="prose prose-gray dark:prose-invert max-w-none">
      {/* Section 1: Story of Ashura */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        قصة يوم عاشوراء
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        يوم عاشوراء هو العاشر من شهر محرم، وهو اليوم الذي نجّى الله فيه نبيه موسى عليه السلام وبني إسرائيل من فرعون وجنوده. فلما جاء موسى عليه السلام إلى البحر ومعه بنو إسرائيل وفرعون خلفهم، أوحى الله إلى موسى أن يضرب البحر بعصاه، فانفلق البحر اثني عشر طريقًا وعبر موسى وقومه، فلما تبعهم فرعون وجنوده أطبق الله عليهم البحر فأغرقهم جميعًا. فصام موسى عليه السلام هذا اليوم شكرًا لله تعالى على هذه النعمة العظيمة. ولمّا قدم النبي صلى الله عليه وسلم المدينة ووجد اليهود يصومون هذا اليوم قال: &quot;نحن أحق بموسى منكم&quot; فصامه وأمر بصيامه. ويتحرى المسلمون في عام {year} ميلادي صيام هذا اليوم العظيم اقتداءً بالنبي صلى الله عليه وسلم.
      </p>

      {/* Quran Verse - Ash-Shu'ara */}
      <blockquote className="border-r-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10 pr-4 py-3 rounded-lg my-6 not-prose">
        <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed font-medium">
          ﴿فَأَوْحَيْنَا إِلَىٰ مُوسَىٰ أَنِ اضْرِب بِّعَصَاكَ الْبَحْرَ فَانفَلَقَ فَكَانَ كُلُّ فِرْقٍ كَالطَّوْدِ الْعَظِيمِ﴾
        </p>
        <cite className="text-sm text-gray-500 dark:text-gray-400 mt-2 block not-italic">
          سورة الشعراء - الآية 63
        </cite>
      </blockquote>

      {/* Section 2: Levels of Fasting */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        مراتب صيام عاشوراء
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        ذكر العلماء أن لصيام عاشوراء ثلاث مراتب، أعلاها وأكملها أن يصوم المسلم ثلاثة أيام: التاسع والعاشر والحادي عشر من محرم. والمرتبة الثانية أن يصوم التاسع والعاشر، لقول النبي صلى الله عليه وسلم: &quot;لئن بقيت إلى قابل لأصومن التاسع&quot; (رواه مسلم). والمرتبة الثالثة أن يصوم العاشر فقط. وقد أجمع العلماء على استحباب صيام يوم عاشوراء وأنه ليس بواجب، مع تأكد استحبابه لما ورد في فضله من أحاديث صحيحة.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-6 not-prose">
        <div className="bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-200 dark:border-emerald-800/40 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🥇</div>
          <h4 className="font-bold text-emerald-800 dark:text-emerald-300 text-sm mb-1">المرتبة الأولى</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">صيام التاسع والعاشر والحادي عشر</p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-200 dark:border-emerald-800/40 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🥈</div>
          <h4 className="font-bold text-emerald-800 dark:text-emerald-300 text-sm mb-1">المرتبة الثانية</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">صيام التاسع والعاشر</p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-200 dark:border-emerald-800/40 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🥉</div>
          <h4 className="font-bold text-emerald-800 dark:text-emerald-300 text-sm mb-1">المرتبة الثالثة</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">صيام العاشر فقط</p>
        </div>
      </div>

      {/* Hadith */}
      <blockquote className="border-r-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10 pr-4 py-3 rounded-lg my-6 not-prose">
        <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed font-medium">
          «لئن بقيت إلى قابل لأصومن التاسع»
        </p>
        <cite className="text-sm text-gray-500 dark:text-gray-400 mt-2 block not-italic">
          رواه مسلم — يعني مع العاشر مخالفةً لليهود
        </cite>
      </blockquote>

      {/* Section 3: Virtues */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        فضائل يوم عاشوراء
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        يوم عاشوراء يوم عظيم من أيام الله تعالى، وقد ثبت في صحيح مسلم أن النبي صلى الله عليه وسلم سُئل عن صيام يوم عاشوراء فقال: &quot;أحتسب على الله أن يكفّر السنة التي قبله&quot;. فصيام هذا اليوم يكفّر ذنوب سنة كاملة ماضية، وهذا فضل عظيم من الله تعالى. وكان النبي صلى الله عليه وسلم يتحرى صيام هذا اليوم ويحث عليه، حتى قال ابن عباس رضي الله عنهما: &quot;ما رأيت النبي صلى الله عليه وسلم يتحرى صيام يوم فضّله على غيره إلا هذا اليوم يوم عاشوراء وهذا الشهر يعني شهر رمضان&quot; (متفق عليه).
      </p>

      {/* Hadith */}
      <blockquote className="border-r-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10 pr-4 py-3 rounded-lg my-6 not-prose">
        <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed font-medium">
          «صيام يوم عاشوراء أحتسب على الله أن يكفّر السنة التي قبله»
        </p>
        <cite className="text-sm text-gray-500 dark:text-gray-400 mt-2 block not-italic">
          رواه مسلم
        </cite>
      </blockquote>

      {/* Section 4: Etiquettes */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        آداب يوم عاشوراء
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        من آداب يوم عاشوراء أن يصومه المسلم مع يوم قبله أو يوم بعده مخالفةً لأهل الكتاب، كما أوصى النبي صلى الله عليه وسلم. ويُستحب فيه الإكثار من ذكر الله والدعاء والاستغفار، وقراءة القرآن الكريم وخاصة سور طه والشعراء التي تتضمن قصة موسى عليه السلام مع فرعون. كما يُستحب التوسعة على الأهل والعيال في المأكل والمشرب، وقد ورد في ذلك حديث &quot;من وسّع على أهله يوم عاشوراء وسّع الله عليه سائر سنته&quot; وإن كان في سنده مقال. ومن الآداب أيضًا شكر الله تعالى على نعمة الإسلام والهداية، والتأمل في قصة نجاة موسى عليه السلام واستخلاص العبر منها في التوكل على الله والثقة بنصره.
      </p>

      {/* Quran Verse - Taha */}
      <blockquote className="border-r-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10 pr-4 py-3 rounded-lg my-6 not-prose">
        <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed font-medium">
          ﴿قَالَ كَلَّا إِنَّ مَعِيَ رَبِّي سَيَهْدِينِ﴾
        </p>
        <cite className="text-sm text-gray-500 dark:text-gray-400 mt-2 block not-italic">
          سورة الشعراء - الآية 62 — قول موسى عليه السلام عند البحر ثقةً بنصر الله
        </cite>
      </blockquote>
    </article>
  );
}
