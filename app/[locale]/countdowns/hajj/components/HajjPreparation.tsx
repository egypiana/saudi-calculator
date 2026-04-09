const PREPARATIONS = [
  {
    number: 1, icon: "📋",
    title: "التسجيل والتصاريح",
    desc: "سجّل مبكراً عبر منصة نسك الإلكترونية للحصول على تصريح الحج. اختر حملة حج مرخصة وموثوقة من وزارة الحج والعمرة. تأكد من صلاحية جواز السفر وإتمام جميع الإجراءات الرسمية المطلوبة.",
    tip: "التسجيل المبكر يمنحك خيارات أفضل للحملات والأسعار — لا تؤجل!",
  },
  {
    number: 2, icon: "🏥",
    title: "الاستعداد الصحي",
    desc: "أكمل الفحص الطبي الشامل وأخذ التطعيمات المطلوبة (الحمى الشوكية، الإنفلونزا الموسمية). إذا كنت تعاني من أمراض مزمنة، جهّز كمية كافية من الأدوية. مارس المشي يومياً لتهيئة جسمك لأداء المناسك.",
    tip: "ابدأ برنامج المشي اليومي قبل شهرين من الحج — 30 دقيقة يومياً كافية",
  },
  {
    number: 3, icon: "📚",
    title: "تعلم مناسك الحج",
    desc: "ادرس مناسك الحج بالتفصيل من مصادر علمية موثوقة. احضر دورات تعليمية ومحاضرات عن أحكام الحج وآدابه. تعلّم أدعية المناسك وأذكار الحج واحفظها.",
    tip: "شاهد مقاطع فيديو توضيحية للمناسك فهي تساعد على الفهم العملي",
  },
  {
    number: 4, icon: "🧳",
    title: "تجهيز المستلزمات",
    desc: "جهّز ملابس الإحرام (إزار ورداء أبيضان للرجال). احرص على حذاء مريح مناسب للمشي الطويل. لا تنسَ سجادة الصلاة والمظلة للوقاية من الشمس والمستلزمات الشخصية الضرورية.",
    tip: "ضع قائمة بالمستلزمات وراجعها مرتين — انسَ الحقائب الثقيلة واحمل الضروري فقط",
  },
  {
    number: 5, icon: "💰",
    title: "التخطيط المالي",
    desc: "ضع ميزانية واقعية لتكاليف الحج تشمل: رسوم الحملة، السكن، النقل، الطعام، الهدي، والمصروفات الشخصية. صرّف عملتك مسبقاً واحتفظ بمبلغ احتياطي للطوارئ.",
    tip: "خصص 20% إضافية فوق الميزانية المتوقعة كاحتياطي للمصروفات غير المتوقعة",
  },
  {
    number: 6, icon: "🤲",
    title: "الاستعداد الروحي",
    desc: "أخلص النية لله تعالى وتب من الذنوب واستغفر. اقضِ ما عليك من ديون واطلب المسامحة ممن أخطأت في حقهم. اكتب وصيتك واحرص على ترك أهلك في أحسن حال. أكثر من الدعاء والذكر.",
    tip: "ابدأ الاستعداد الروحي قبل شهر — اجعل لنفسك ورداً يومياً من القرآن والأذكار",
  },
];

function toAr(n: number): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

export default function HajjPreparation() {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
        ✅ كيف تستعد لموسم الحج؟
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {PREPARATIONS.map((prep) => (
          <div
            key={prep.number}
            className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 border-r-4 border-r-emerald-500"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  {toAr(prep.number)}
                </span>
                <h3 className="font-bold text-gray-800 dark:text-white text-sm">{prep.title}</h3>
              </div>
              <span className="text-2xl">{prep.icon}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              {prep.desc}
            </p>
            <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-lg px-3 py-2">
              <p className="text-xs text-emerald-700 dark:text-emerald-400">
                💡 نصيحة: {prep.tip}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
