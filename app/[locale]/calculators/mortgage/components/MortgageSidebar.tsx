"use client";

import { REDF_INFO } from "@/lib/calculations/mortgage";
import Link from "next/link";
import { lp } from "@/lib/utils/locale";

export default function MortgageSidebar({ locale }: { locale: string }) {
  return (
    <aside dir="rtl" className="space-y-5">
      {/* REDF Quick Info */}
      <div className="overflow-hidden rounded-2xl border bg-white dark:bg-gray-900">
        <div className="bg-gradient-to-l from-green-600 to-green-700 px-5 py-3">
          <h3 className="text-lg font-bold text-white">صندوق التنمية العقارية</h3>
        </div>
        <ul className="space-y-3 p-5 text-sm">
          <li className="flex justify-between">
            <span className="text-gray-500">أقصى تمويل</span>
            <span className="font-semibold">{REDF_INFO.maxLoan.toLocaleString("ar-SA")} ريال</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-500">أقصى منحة</span>
            <span className="font-semibold">{REDF_INFO.maxGrant.toLocaleString("ar-SA")} ريال</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-500">الدعم</span>
            <span className="font-semibold">{REDF_INFO.supportRange}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-500">الحد الأدنى للدخل</span>
            <span className="font-semibold">{REDF_INFO.minIncome.toLocaleString("ar-SA")} ريال</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-500">الدفعة الأولى</span>
            <span className="font-semibold">{REDF_INFO.downPaymentPercent}%</span>
          </li>
        </ul>
      </div>

      {/* SAMA Rules */}
      <div className="rounded-2xl border bg-white p-5 dark:bg-gray-900">
        <h3 className="mb-3 text-lg font-bold">ضوابط ساما</h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
            نسبة التمويل: 90% أول مسكن
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
            نسبة الاستقطاع: 55-65%
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
            أقصى مدة: 30 سنة
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
            العمر عند الانتهاء: 70 سنة
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
            تأمين إلزامي على العقار
          </li>
        </ul>
      </div>

      {/* Related Tools */}
      <div className="rounded-2xl border bg-white p-5 dark:bg-gray-900">
        <h3 className="mb-3 text-lg font-bold">أدوات ذات صلة</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link
              href={lp(locale, "/calculators/salary")}
              className="text-green-600 hover:underline"
            >
              حاسبة الراتب
            </Link>
          </li>
          <li>
            <Link
              href={lp(locale, "/calculators/end-of-service")}
              className="text-green-600 hover:underline"
            >
              حاسبة نهاية الخدمة
            </Link>
          </li>
          <li>
            <Link
              href={lp(locale, "/calculators/zakat")}
              className="text-green-600 hover:underline"
            >
              حاسبة الزكاة
            </Link>
          </li>
          <li>
            <Link
              href={lp(locale, "/calculators/vat")}
              className="text-green-600 hover:underline"
            >
              حاسبة الضريبة
            </Link>
          </li>
        </ul>
      </div>

      {/* Quick Tips */}
      <div className="rounded-2xl border bg-white p-5 dark:bg-gray-900">
        <h3 className="mb-3 text-lg font-bold">نصائح سريعة</h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>قارن 3 بنوك على الأقل قبل التوقيع</li>
          <li>اطلب جدول السداد التفصيلي</li>
          <li>تحقق من رسوم السداد المبكر</li>
          <li>لا توقّع عقد بنسبة متغيرة بدون فهم المخاطر</li>
        </ul>
      </div>
    </aside>
  );
}
