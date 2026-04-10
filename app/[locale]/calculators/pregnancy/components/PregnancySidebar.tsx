"use client";

import Link from "next/link";
import { lp } from "@/lib/utils/locale";

export default function PregnancySidebar({ locale }: { locale: string }) {
  return (
    <aside dir="rtl" className="space-y-6">
      {/* مراحل الحمل */}
      <div className="rounded-2xl border bg-white dark:bg-gray-900 p-5">
        <h3 className="mb-4 rounded-xl bg-gradient-to-l from-pink-500 to-pink-600 px-4 py-2 text-center text-lg font-bold text-white">
          مراحل الحمل
        </h3>
        <ul className="space-y-3 text-sm">
          <li className="border-r-4 border-pink-400 pr-3">
            <span className="font-bold">🌸 الثلث الأول:</span> الأسبوع 1-12 — تكوّن الأعضاء
          </li>
          <li className="border-r-4 border-amber-400 pr-3">
            <span className="font-bold">🌻 الثلث الثاني:</span> الأسبوع 13-27 — نمو وحركة
          </li>
          <li className="border-r-4 border-indigo-400 pr-3">
            <span className="font-bold">👶 الثلث الثالث:</span> الأسبوع 28-40 — اكتمال واستعداد
          </li>
        </ul>
      </div>

      {/* أحكام العقيقة */}
      <div className="rounded-2xl border bg-white dark:bg-gray-900 p-5">
        <h3 className="mb-3 text-lg font-bold text-gray-800 dark:text-gray-100">
          🐑 أحكام العقيقة
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
          <li>شاتان عن الذكر، شاة عن الأنثى</li>
          <li>اليوم السابع أو 14 أو 21</li>
          <li>حلق الرأس والتصدّق بوزنه فضة</li>
          <li>التسمية يوم السابع</li>
        </ul>
      </div>

      {/* أدوات ذات صلة */}
      <div className="rounded-2xl border bg-white dark:bg-gray-900 p-5">
        <h3 className="mb-3 text-lg font-bold text-gray-800 dark:text-gray-100">
          أدوات ذات صلة
        </h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link
              href={lp(locale, "/calculators/age")}
              className="text-pink-600 hover:underline dark:text-pink-400"
            >
              حاسبة العمر
            </Link>
          </li>
          <li>
            <Link
              href={lp(locale, "/calculators/bmi")}
              className="text-pink-600 hover:underline dark:text-pink-400"
            >
              حاسبة مؤشر كتلة الجسم
            </Link>
          </li>
          <li>
            <Link
              href={lp(locale, "/calculators/budget")}
              className="text-pink-600 hover:underline dark:text-pink-400"
            >
              حاسبة الميزانية
            </Link>
          </li>
        </ul>
      </div>

      {/* نصائح سريعة */}
      <div className="rounded-2xl border bg-white dark:bg-gray-900 p-5">
        <h3 className="mb-3 text-lg font-bold text-gray-800 dark:text-gray-100">
          💡 نصائح سريعة
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
          <li>تناولي حمض الفوليك من أول يوم</li>
          <li>اشربي 8-10 أكواب ماء يومياً</li>
          <li>تجنّبي الأطعمة النيئة</li>
          <li>مارسي المشي 30 دقيقة يومياً</li>
          <li>نامي على جانبك الأيسر في الثلث الثالث</li>
        </ul>
      </div>
    </aside>
  );
}
