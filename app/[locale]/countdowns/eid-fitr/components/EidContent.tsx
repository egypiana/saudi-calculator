export default function EidContent() {
  return (
    <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-5">
        📖 معلومات عن عيد الفطر المبارك
      </h2>
      <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-[1.9] space-y-4">
        <h3 className="text-lg font-bold text-green-800 dark:text-green-400 mt-0">عيد الفطر المبارك — أعظم احتفالات المسلمين</h3>
        <p>
          عيد الفطر هو أحد العيدين الرئيسيين في الإسلام، ويُحتفل به في اليوم الأول من شهر شوال،
          مباشرةً بعد انتهاء شهر رمضان المبارك. يُمثّل هذا العيد فرحة الانتهاء من الصيام والاحتفاء
          بالنعمة الإلهية والتوفيق في إتمام فريضة الصيام.
        </p>

        <h3 className="text-lg font-bold text-green-800 dark:text-green-400">التسمية والمعنى</h3>
        <p>
          سُمّي &quot;عيد الفطر&quot; نسبةً إلى الفطر — أي الإفطار بعد الصيام — إذ يُمثّل هذا اليوم المبارك
          عودة المسلمين إلى الطعام والشراب في النهار بعد شهر كامل من الامتناع. وقد ورد في الحديث
          النبوي الشريف أن هذا اليوم هو يوم فرح وسرور للمسلمين.
        </p>
        <div className="border-r-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 px-4 py-3 rounded-lg not-prose">
          <p className="text-sm text-yellow-800 dark:text-yellow-300 italic">
            قال النبي ﷺ: &quot;للصائم فرحتان: فرحة عند فِطره، وفرحة عند لقاء ربه&quot;
          </p>
        </div>

        <h3 className="text-lg font-bold text-green-800 dark:text-green-400">صلاة عيد الفطر</h3>
        <p>
          تُؤدَّى صلاة عيد الفطر في الضحى، بعد طلوع الشمس بنحو ربع ساعة وقبل الزوال.
          وهي سنة مؤكدة يُستحب الحضور إليها للرجال والنساء والأطفال. تتكون صلاة العيد
          من ركعتين، تبدآن بالتكبيرات الزوائد الواردة في السنة النبوية.
        </p>

        <h3 className="text-lg font-bold text-green-800 dark:text-green-400">زكاة الفطر — واجب قبل العيد</h3>
        <p>
          من أبرز شعائر عيد الفطر إخراج زكاة الفطر، وهي صدقة واجبة على كل مسلم
          تطهيراً للصائم من اللغو والرفث، وإغناءً للفقراء عن السؤال في هذا اليوم.
          يُستحب إخراجها قبل صلاة العيد، ويجوز إخراجها قبل يوم أو يومين من العيد.
        </p>

        <h3 className="text-lg font-bold text-green-800 dark:text-green-400">عيد الفطر في المملكة العربية السعودية</h3>
        <p>
          تحتفل المملكة العربية السعودية بعيد الفطر المبارك على مدى ثلاثة أيام رسمية،
          تعمّ فيها أجواء الفرح والبهجة في جميع مدن وقرى المملكة. يُعلن عن موعد العيد
          رسمياً بعد رؤية هلال شوال من قِبَل المحكمة العليا.
        </p>

        <h3 className="text-lg font-bold text-green-800 dark:text-green-400">تقاليد عيد الفطر</h3>
        <p>
          يتميز عيد الفطر بعدد من التقاليد والسنن الجميلة:
          <strong> الاغتسال والتطيب</strong> قبل التوجه لصلاة العيد،
          <strong> ارتداء الملابس الجديدة</strong> احتفاءً بهذه المناسبة السعيدة،
          <strong> العيدية</strong> وهي المبالغ النقدية تُقدَّم للأطفال،
          و<strong>الزيارات العائلية</strong> لتبادل التهاني والمودة بين الأهل والجيران.
        </p>

        <h3 className="text-lg font-bold text-green-800 dark:text-green-400">الفرق بين عيد الفطر وعيد الأضحى</h3>
        <p>
          يتمايز عيد الفطر عن عيد الأضحى في عدة جوانب: <strong>التوقيت</strong> — عيد الفطر
          في أول شوال، وعيد الأضحى في العاشر من ذي الحجة. <strong>الشعيرة</strong> — الأضحية
          في عيد الأضحى، وزكاة الفطر في عيد الفطر. <strong>الارتباط</strong> — عيد الفطر يرتبط
          برمضان، وعيد الأضحى يرتبط بموسم الحج.
        </p>
      </div>
    </section>
  );
}
