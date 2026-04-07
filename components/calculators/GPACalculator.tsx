"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Calculator, RotateCcw, Plus, Trash2 } from "lucide-react";

interface Course {
  name: string;
  grade: string;
  credits: string;
}

const gradePoints: Record<string, number> = {
  "A+": 5.0, "A": 4.75, "B+": 4.5, "B": 4.0, "C+": 3.5, "C": 3.0,
  "D+": 2.5, "D": 2.0, "F": 1.0,
};

const gradeLabelsAr: Record<string, string> = {
  "A+": "ممتاز مرتفع", "A": "ممتاز", "B+": "جيد جداً مرتفع", "B": "جيد جداً",
  "C+": "جيد مرتفع", "C": "جيد", "D+": "مقبول مرتفع", "D": "مقبول", "F": "راسب",
};

export default function GPACalculator() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [courses, setCourses] = useState<Course[]>([
    { name: "", grade: "A+", credits: "3" },
    { name: "", grade: "A+", credits: "3" },
    { name: "", grade: "A+", credits: "3" },
  ]);
  const [result, setResult] = useState<{ gpa: number; totalCredits: number; classification: string } | null>(null);

  const updateCourse = (index: number, field: keyof Course, value: string) => {
    const updated = [...courses];
    updated[index] = { ...updated[index], [field]: value };
    setCourses(updated);
  };

  const addCourse = () => setCourses([...courses, { name: "", grade: "A+", credits: "3" }]);

  const removeCourse = (index: number) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter((_, i) => i !== index));
  };

  const calculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const credits = parseFloat(course.credits) || 0;
      const points = gradePoints[course.grade] || 0;
      totalPoints += points * credits;
      totalCredits += credits;
    });

    if (totalCredits === 0) return;

    const gpa = totalPoints / totalCredits;
    let classification: string;
    if (gpa >= 4.5) classification = isAr ? "ممتاز" : "Excellent";
    else if (gpa >= 3.75) classification = isAr ? "جيد جداً" : "Very Good";
    else if (gpa >= 2.75) classification = isAr ? "جيد" : "Good";
    else if (gpa >= 2.0) classification = isAr ? "مقبول" : "Acceptable";
    else classification = isAr ? "ضعيف" : "Poor";

    setResult({ gpa, totalCredits, classification });
  };

  const reset = () => {
    setCourses([{ name: "", grade: "A+", credits: "3" }, { name: "", grade: "A+", credits: "3" }, { name: "", grade: "A+", credits: "3" }]);
    setResult(null);
  };

  const inputClass = "w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm";

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-2.5">
          <Calculator className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {isAr ? "حاسبة المعدل التراكمي (GPA)" : "GPA Calculator (5.0 Scale)"}
        </h2>
      </div>

      <div className="space-y-3 mb-4">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 px-1">
          <span>{isAr ? "المادة" : "Course"}</span>
          <span className="w-24 text-center">{isAr ? "التقدير" : "Grade"}</span>
          <span className="w-16 text-center">{isAr ? "الساعات" : "Credits"}</span>
          <span className="w-8" />
        </div>
        {courses.map((course, index) => (
          <div key={index} className="grid grid-cols-[1fr_auto_auto_auto] gap-2 items-center">
            <input
              type="text"
              value={course.name}
              onChange={(e) => updateCourse(index, "name", e.target.value)}
              className={inputClass}
              placeholder={isAr ? `مادة ${index + 1}` : `Course ${index + 1}`}
            />
            <select
              value={course.grade}
              onChange={(e) => updateCourse(index, "grade", e.target.value)}
              className={`${inputClass} w-24`}
            >
              {Object.entries(gradePoints).map(([grade]) => (
                <option key={grade} value={grade}>
                  {grade} {isAr ? `(${gradeLabelsAr[grade]})` : ""}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={course.credits}
              onChange={(e) => updateCourse(index, "credits", e.target.value)}
              className={`${inputClass} w-16 text-center`}
              min="1" max="6"
            />
            <button onClick={() => removeCourse(index)} className="p-2 text-red-500 hover:text-red-600 transition-colors">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button onClick={addCourse} className="flex items-center gap-1.5 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500 font-medium mb-6">
        <Plus className="h-4 w-4" /> {isAr ? "إضافة مادة" : "Add Course"}
      </button>

      <div className="flex gap-3">
        <button onClick={calculate} className="flex-1 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-colors">
          {isAr ? "احسب المعدل" : "Calculate GPA"}
        </button>
        <button onClick={reset} className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-colors">
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      {result && (
        <div className="mt-6 p-6 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg text-gray-800 dark:text-white">{isAr ? "المعدل التراكمي:" : "GPA:"}</span>
            <span className="font-bold text-2xl text-primary-600 dark:text-primary-400">{result.gpa.toFixed(2)} / 5.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? "التقدير:" : "Classification:"}</span>
            <span className="font-bold text-gray-800 dark:text-white">{result.classification}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? "مجموع الساعات:" : "Total Credits:"}</span>
            <span className="font-bold text-gray-800 dark:text-white">{result.totalCredits}</span>
          </div>
        </div>
      )}
    </div>
  );
}
