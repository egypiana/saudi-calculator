"use client";

interface HijriNewYearContentProps {
  year: number;
}

export default function HijriNewYearContent({ year }: HijriNewYearContentProps) {
  return (
    <article dir="rtl" className="prose prose-gray dark:prose-invert max-w-none">
      {/* Section 1: What is Hijri New Year */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        ما هو رأس السنة الهجرية؟
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        رأس السنة الهجرية هو أول يوم من شهر محرم، وهو أول شهور السنة الهجرية (القمرية). يحتفي المسلمون حول العالم بهذا اليوم كبداية عام هجري جديد، ويتذكرون فيه هجرة النبي محمد صلى الله عليه وسلم من مكة المكرمة إلى المدينة المنورة التي كانت نقطة تحوّل في تاريخ الإسلام. يترقب المسلمون رأس السنة الهجرية في عام {year} ميلادي بالدعاء والذكر والتوبة واستقبال العام الجديد بالطاعات.
      </p>

      {/* Section 2: The Hijra */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        الهجرة النبوية وأهميتها
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        الهجرة النبوية الشريفة هي انتقال النبي محمد صلى الله عليه وسلم وصحابته من مكة إلى المدينة المنورة في عام 622 ميلادي، فرارًا من اضطهاد قريش وطلبًا لنشر دعوة الإسلام. وقد اتخذها الخليفة عمر بن الخطاب رضي الله عنه بداية للتقويم الهجري، لأنها كانت الحدث الأبرز الذي فرّق فيه بين الحق والباطل. وقد أسس النبي صلى الله عليه وسلم في المدينة أول دولة إسلامية، وبنى المسجد النبوي، وآخى بين المهاجرين والأنصار في واحدة من أعظم صور التكافل الاجتماعي.
      </p>

      {/* Section 3: Virtue of Muharram */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        فضل شهر محرم
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        شهر محرم من أعظم الشهور عند الله تعالى، وهو أحد الأشهر الحرم الأربعة التي عظّمها الله في كتابه. وقد خصّه النبي صلى الله عليه وسلم بفضل عظيم في الصيام، حيث قال: &quot;أفضل الصيام بعد رمضان شهر الله المحرم، وأفضل الصلاة بعد الفريضة صلاة الليل&quot; (رواه مسلم). فسمّاه النبي ﷺ &quot;شهر الله&quot; تعظيمًا وتشريفًا له، ونسبه إلى الله إضافة تشريف كما قيل &quot;بيت الله&quot; و&quot;ناقة الله&quot;.
      </p>

      {/* Hadith */}
      <blockquote className="border-r-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10 pr-4 py-3 rounded-lg my-6 not-prose">
        <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed font-medium">
          «أفضل الصيام بعد رمضان شهر الله المحرم، وأفضل الصلاة بعد الفريضة صلاة الليل»
        </p>
        <cite className="text-sm text-gray-500 dark:text-gray-400 mt-2 block not-italic">
          رواه مسلم
        </cite>
      </blockquote>

      {/* Section 4: Ashura */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        عاشوراء (١٠ محرم)
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        يوم عاشوراء هو العاشر من شهر محرم، وهو يوم عظيم نجّى الله فيه نبيه موسى عليه السلام وبني إسرائيل من فرعون وجنوده فأغرقهم الله في البحر. فصامه موسى شكرًا لله، وصامه النبي محمد صلى الله عليه وسلم وأمر بصيامه. قال النبي ﷺ: &quot;صيام يوم عاشوراء أحتسب على الله أن يكفّر السنة التي قبله&quot; (رواه مسلم). ويُستحب صيام التاسع مع العاشر من محرم لمخالفة أهل الكتاب، فقد قال النبي ﷺ: &quot;لئن بقيت إلى قابل لأصومنّ التاسع&quot;.
      </p>

      {/* Hadith - Ashura */}
      <blockquote className="border-r-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10 pr-4 py-3 rounded-lg my-6 not-prose">
        <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed font-medium">
          «صيام يوم عاشوراء أحتسب على الله أن يكفّر السنة التي قبله»
        </p>
        <cite className="text-sm text-gray-500 dark:text-gray-400 mt-2 block not-italic">
          رواه مسلم
        </cite>
      </blockquote>

      {/* Section 5: Sacred Months */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        الأشهر الحرم
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        محرم هو أحد الأشهر الحرم الأربعة التي ذكرها الله تعالى في كتابه العزيز. قال تعالى: &quot;إِنَّ عِدَّةَ الشُّهُورِ عِندَ اللَّهِ اثْنَا عَشَرَ شَهْرًا فِي كِتَابِ اللَّهِ يَوْمَ خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ مِنْهَا أَرْبَعَةٌ حُرُمٌ&quot; (التوبة: 36). والأشهر الحرم هي: ذو القعدة، وذو الحجة، ومحرم، ورجب. سُميت حُرُمًا لعظم حرمتها وحرمة الذنب فيها، فالحسنات فيها أعظم أجرًا والسيئات فيها أشد إثمًا. ويُستحب الإكثار من الصيام والعبادة في هذه الأشهر المباركة.
      </p>

      {/* Quran Verse */}
      <blockquote className="border-r-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10 pr-4 py-3 rounded-lg my-6 not-prose">
        <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed font-medium">
          ﴿إِنَّ عِدَّةَ الشُّهُورِ عِندَ اللَّهِ اثْنَا عَشَرَ شَهْرًا فِي كِتَابِ اللَّهِ يَوْمَ خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ مِنْهَا أَرْبَعَةٌ حُرُمٌ﴾
        </p>
        <cite className="text-sm text-gray-500 dark:text-gray-400 mt-2 block not-italic">
          سورة التوبة - الآية 36
        </cite>
      </blockquote>
    </article>
  );
}
