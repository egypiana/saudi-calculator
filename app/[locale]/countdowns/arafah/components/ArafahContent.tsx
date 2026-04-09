"use client";

interface ArafahContentProps {
  year: number;
}

export default function ArafahContent({ year }: ArafahContentProps) {
  return (
    <article dir="rtl" className="prose prose-gray dark:prose-invert max-w-none">
      {/* Section 1: What is Arafat Day */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        ما هو يوم عرفة؟
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        يوم عرفة هو التاسع من شهر ذي الحجة، وهو أفضل أيام السنة على الإطلاق عند المسلمين. قال النبي صلى الله عليه وسلم: &quot;خير يوم طلعت عليه الشمس يوم عرفة&quot;. وهو اليوم الذي يقف فيه الحجاج على صعيد عرفات في أعظم أركان الحج، بينما يصومه المسلمون حول العالم طلبًا لمغفرة الله تعالى وتكفيرًا لذنوب سنتين. يتحرى المسلمون هذا اليوم العظيم في عام {year} ميلادي بالصيام والدعاء والذكر والتكبير، رجاء إدراك فضله العظيم.
      </p>

      {/* Quran Verse - Al-Fajr */}
      <blockquote className="border-r-4 border-amber-500 bg-amber-50 dark:bg-amber-900/10 pr-4 py-3 rounded-lg my-6 not-prose">
        <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed font-medium">
          ﴿وَالْفَجْرِ ۝ وَلَيَالٍ عَشْرٍ﴾
        </p>
        <cite className="text-sm text-gray-500 dark:text-gray-400 mt-2 block not-italic">
          سورة الفجر - الآيتان 1-2 — قال ابن عباس: هي عشر ذي الحجة
        </cite>
      </blockquote>

      {/* Section 2: Virtues */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        فضل يوم عرفة
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        يوم عرفة من أعظم الأيام عند الله تعالى، وقد ورد في فضله أحاديث كثيرة. قال النبي صلى الله عليه وسلم: &quot;ما من يوم أكثر من أن يعتق الله فيه عبدًا من النار من يوم عرفة، وإنه ليدنو ثم يباهي بهم الملائكة فيقول: ما أراد هؤلاء؟&quot; (رواه مسلم). ففي هذا اليوم يعتق الله عباده من النار أكثر من أي يوم آخر في السنة، ويدنو سبحانه من عباده ويباهي بهم ملائكته. وهو يوم مغفرة الذنوب والعتق من النار والمباهاة بأهل الموقف.
      </p>

      {/* Hadith */}
      <blockquote className="border-r-4 border-amber-500 bg-amber-50 dark:bg-amber-900/10 pr-4 py-3 rounded-lg my-6 not-prose">
        <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed font-medium">
          «ما من يوم أكثر من أن يعتق الله فيه عبدًا من النار من يوم عرفة، وإنه ليدنو ثم يباهي بهم الملائكة»
        </p>
        <cite className="text-sm text-gray-500 dark:text-gray-400 mt-2 block not-italic">
          رواه مسلم
        </cite>
      </blockquote>

      {/* Section 3: Fasting */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        صيام يوم عرفة
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        صيام يوم عرفة سنة مؤكدة لغير الحاج، وهو من أعظم الأعمال الصالحة في هذا اليوم. قال النبي صلى الله عليه وسلم: &quot;صيام يوم عرفة أحتسب على الله أن يكفّر السنة التي قبله والسنة التي بعده&quot; (رواه مسلم). فصيام يوم واحد يكفّر ذنوب سنتين كاملتين بفضل الله ورحمته. أما الحاج فالأفضل له عدم الصيام ليتقوى على الوقوف بعرفة والدعاء والعبادة، وهذا هو فعل النبي صلى الله عليه وسلم حيث وقف بعرفة مفطرًا.
      </p>

      {/* Section 4: Arafat and Hajj */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        يوم عرفة والحج
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        الوقوف بعرفة هو ركن الحج الأعظم الذي لا يتم الحج بدونه. قال النبي صلى الله عليه وسلم: &quot;الحج عرفة&quot; (رواه أصحاب السنن). يقف ملايين الحجاج على صعيد عرفات من بعد زوال الشمس إلى غروبها، يدعون الله ويتضرعون إليه في أعظم تجمع بشري على وجه الأرض. وعرفة سهل واسع يقع خارج حدود الحرم المكي، يبعد عن مكة المكرمة نحو 20 كيلومترًا، وفيه جبل الرحمة الذي وقف عليه النبي صلى الله عليه وسلم في حجة الوداع.
      </p>

      {/* Section 5: Completion of the Religion */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        يوم إكمال الدين
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        يوم عرفة هو اليوم الذي أنزل الله فيه آية إكمال الدين على نبيه محمد صلى الله عليه وسلم وهو واقف بعرفة في حجة الوداع. وقد جاء يهودي إلى عمر بن الخطاب رضي الله عنه فقال: آية في كتابكم لو علينا معشر اليهود نزلت لاتخذنا ذلك اليوم عيدًا. فقال عمر: قد عرفت أي آية هي، نزلت على رسول الله صلى الله عليه وسلم وهو واقف بعرفة يوم الجمعة.
      </p>

      {/* Quran Verse - Al-Ma'idah */}
      <blockquote className="border-r-4 border-amber-500 bg-amber-50 dark:bg-amber-900/10 pr-4 py-3 rounded-lg my-6 not-prose">
        <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed font-medium">
          ﴿الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا﴾
        </p>
        <cite className="text-sm text-gray-500 dark:text-gray-400 mt-2 block not-italic">
          سورة المائدة - الآية 3
        </cite>
      </blockquote>
    </article>
  );
}
