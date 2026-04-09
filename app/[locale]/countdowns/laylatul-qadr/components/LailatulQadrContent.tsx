"use client";

interface LailatulQadrContentProps {
  year: number;
}

export default function LailatulQadrContent({ year }: LailatulQadrContentProps) {
  return (
    <article dir="rtl" className="prose prose-gray dark:prose-invert max-w-none">
      {/* Section 1: What is Laylat al-Qadr */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        ما هي ليلة القدر؟
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        ليلة القدر هي أعظم ليلة في العام عند المسلمين، وهي الليلة التي أنزل الله فيها القرآن الكريم على نبيه محمد صلى الله عليه وسلم. سُميت بليلة القدر لعظم قدرها ومكانتها عند الله تعالى، ولأن العبادة فيها خير من عبادة ألف شهر. تقع ليلة القدر في العشر الأواخر من شهر رمضان المبارك، وأرجح الأقوال عند أهل العلم أنها ليلة السابع والعشرين من رمضان، وإن كانت تتحرى في جميع الليالي الوترية من العشر الأواخر. يتحرى المسلمون هذه الليلة المباركة في عام {year} ميلادي بالقيام والدعاء وقراءة القرآن وذكر الله تعالى، رجاء إدراك فضلها العظيم.
      </p>

      {/* Quran Verse - Surat Al-Qadr */}
      <blockquote className="border-r-4 border-violet-500 bg-violet-50 dark:bg-violet-900/10 pr-4 py-3 rounded-lg my-6 not-prose">
        <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed font-medium">
          ﴿إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ ۝ وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ ۝ لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ ۝ تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ ۝ سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ﴾
        </p>
        <cite className="text-sm text-gray-500 dark:text-gray-400 mt-2 block not-italic">
          سورة القدر كاملة
        </cite>
      </blockquote>

      {/* Section 2: Virtues */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        فضل ليلة القدر
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        ليلة القدر خير من ألف شهر، أي أن العبادة فيها تعادل عبادة أكثر من ثلاث وثمانين سنة. وقد جاء في الحديث الشريف أن النبي صلى الله عليه وسلم قال: &quot;من قام ليلة القدر إيمانًا واحتسابًا غُفر له ما تقدم من ذنبه&quot; (رواه البخاري ومسلم). وفي هذه الليلة المباركة تتنزل الملائكة والروح (جبريل عليه السلام) بإذن ربهم من كل أمر، وهي ليلة سلام وأمان حتى مطلع الفجر. كما أن فيها يُفرق كل أمر حكيم، حيث تُقدّر فيها مقادير الخلائق للعام القادم من أرزاق وآجال وغيرها.
      </p>

      {/* Quran Verse - Al-Dukhan */}
      <blockquote className="border-r-4 border-violet-500 bg-violet-50 dark:bg-violet-900/10 pr-4 py-3 rounded-lg my-6 not-prose">
        <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed font-medium">
          ﴿إِنَّا أَنزَلْنَاهُ فِي لَيْلَةٍ مُّبَارَكَةٍ ۚ إِنَّا كُنَّا مُنذِرِينَ ۝ فِيهَا يُفْرَقُ كُلُّ أَمْرٍ حَكِيمٍ﴾
        </p>
        <cite className="text-sm text-gray-500 dark:text-gray-400 mt-2 block not-italic">
          سورة الدخان - الآيتان 3-4
        </cite>
      </blockquote>

      {/* Section 3: Signs */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        علامات ليلة القدر
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
        وردت في السنة النبوية عدة علامات لليلة القدر يعرفها المسلمون، منها:
      </p>
      <div className="space-y-3 mb-6 not-prose">
        {[
          { icon: "🌤️", text: "تطلع الشمس صبيحتها لا شعاع لها، أي تكون بيضاء صافية بدون أشعة قوية" },
          { icon: "🌙", text: "تكون ليلة معتدلة، لا حارة ولا باردة، وتكون ساكنة هادئة" },
          { icon: "⭐", text: "يكون القمر فيها كشق جفنة، أي نصف دائرة" },
          { icon: "💨", text: "لا تُرمى فيها النجوم بالشهب، وتكون الرياح ساكنة" },
          { icon: "🤍", text: "يشعر المسلم فيها بانشراح في الصدر وطمأنينة وراحة نفسية أثناء العبادة" },
        ].map((sign, i) => (
          <div key={i} className="flex items-start gap-3 bg-gray-50 dark:bg-white/5 rounded-xl p-3">
            <span className="text-xl flex-shrink-0">{sign.icon}</span>
            <span className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{sign.text}</span>
          </div>
        ))}
      </div>

      {/* Section 4: Odd Nights */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        الليالي الوترية في العشر الأواخر
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        أوصى النبي صلى الله عليه وسلم بتحري ليلة القدر في الليالي الوترية من العشر الأواخر من رمضان، وهي ليالي 21 و23 و25 و27 و29 من رمضان. وقد قال صلى الله عليه وسلم: &quot;التمسوها في العشر الأواخر من رمضان، التمسوها في كل وتر&quot; (رواه البخاري). وأرجح الليالي عند جمهور العلماء هي ليلة السابع والعشرين من رمضان، استنادًا لحديث أُبيّ بن كعب رضي الله عنه الذي كان يحلف أنها ليلة السابع والعشرين. ولكن الأفضل للمسلم أن يجتهد في جميع الليالي الوترية حتى لا تفوته هذه الليلة العظيمة. كان النبي صلى الله عليه وسلم إذا دخلت العشر الأواخر أحيا الليل كله، وأيقظ أهله، وجدّ وشدّ المئزر.
      </p>
    </article>
  );
}
