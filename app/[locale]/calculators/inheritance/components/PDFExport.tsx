"use client";

import { useState, useCallback } from "react";
import type { InheritanceResult } from "@/lib/calculations/inheritance";

interface PDFExportProps {
  result: InheritanceResult;
  deceasedGender: "male" | "female";
  selectedHeirs: Record<string, number>;
}

const fmt = (n: number) =>
  n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });

function buildReportHTML(
  result: InheritanceResult,
  deceasedGender: "male" | "female",
): string {
  const now = new Date();
  const dateStr = now.toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  const timeStr = now.toLocaleTimeString("ar-SA", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const activeHeirs = result.heirs.filter(
    (h) => !h.isBlocked && h.totalAmount > 0
  );
  const blockedHeirs = result.heirs.filter((h) => h.isBlocked);
  const totalHeirCount = activeHeirs.reduce((sum, h) => sum + h.count, 0);

  const heirsTableRows = activeHeirs
    .map(
      (heir) => `
      <tr>
        <td>${heir.icon} ${heir.labelAr}</td>
        <td class="center">${heir.count}</td>
        <td class="center">${heir.shareType}</td>
        <td class="center">${heir.shareFraction}</td>
        <td class="center">${heir.percentage.toFixed(1)}%</td>
        <td class="number">${fmt(heir.totalAmount)} ريال</td>
        <td class="number">${fmt(heir.perPersonAmount)} ريال</td>
      </tr>`
    )
    .join("");

  const blockedRows = blockedHeirs
    .map(
      (heir) => `
      <tr class="blocked-row">
        <td>${heir.icon} ${heir.labelAr}${heir.count > 1 ? ` (${heir.count})` : ""}</td>
        <td colspan="5" class="center blocked-label">محجوب</td>
        <td class="blocked-reason">${heir.blockReason || ""}</td>
      </tr>`
    )
    .join("");

  const stepsHTML = result.steps
    .map((step) => {
      if (step.includes("──")) {
        return `<li class="step-divider">${step}</li>`;
      }
      return `<li>${step}</li>`;
    })
    .join("");

  const warningsHTML = result.warnings
    .map((w) => `<div class="warning-item">&#9888; ${w}</div>`)
    .join("");

  let specialCasesHTML = "";
  if (result.hasAwl) {
    specialCasesHTML += `
      <div class="notice notice-awl">
        <strong>&#9878; العول (Awl):</strong>
        مجموع الأنصبة تجاوز التركة، لذا تم تخفيض جميع الأنصبة بنسبة متساوية حسب أحكام العول.
        ${result.awlOriginalBase != null && result.awlNewBase != null ? `<br>الأصل الأصلي: <strong>${result.awlOriginalBase}</strong> &larr; الأصل بعد العول: <strong>${result.awlNewBase}</strong>` : ""}
      </div>`;
  }
  if (result.hasRadd) {
    specialCasesHTML += `
      <div class="notice notice-radd">
        <strong>&#8617; الرد (Radd):</strong>
        يوجد فائض في التركة بعد توزيع الفروض، تم رده على أصحاب الفروض (عدا الزوجين).
      </div>`;
  }

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>تقرير تقسيم التركة الشرعي</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, 'Noto Sans Arabic', 'Noto Kufi Arabic', 'Droid Arabic Kufi', Arial, sans-serif;
      direction: rtl;
      background: #fff;
      color: #1a1a1a;
      font-size: 13px;
      line-height: 1.7;
      padding: 20px 30px;
    }

    /* Header */
    .report-header {
      text-align: center;
      border-bottom: 3px solid #059669;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .report-header .brand {
      font-size: 14px;
      color: #059669;
      font-weight: bold;
      margin-bottom: 4px;
    }
    .report-header h1 {
      font-size: 22px;
      color: #111;
      margin: 8px 0;
    }
    .report-header .date {
      font-size: 12px;
      color: #666;
    }

    /* Sections */
    .section {
      margin-bottom: 22px;
      page-break-inside: avoid;
    }
    .section-title {
      font-size: 15px;
      font-weight: bold;
      color: #059669;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 6px;
      margin-bottom: 12px;
    }

    /* Summary table */
    .summary-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 8px;
    }
    .summary-table td {
      padding: 8px 12px;
      border: 1px solid #d1d5db;
    }
    .summary-table .label {
      background: #f9fafb;
      font-weight: bold;
      width: 40%;
      color: #374151;
    }
    .summary-table .value {
      text-align: left;
      font-weight: bold;
      font-variant-numeric: tabular-nums;
    }
    .summary-table .net-row td {
      background: #ecfdf5;
      border-color: #059669;
      color: #059669;
      font-size: 14px;
    }
    .summary-table .deduction .value {
      color: #dc2626;
    }

    /* Deceased info */
    .info-grid {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      margin-bottom: 8px;
    }
    .info-item {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      padding: 8px 16px;
      font-size: 13px;
    }
    .info-item strong {
      color: #374151;
    }

    /* Heirs table */
    .heirs-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    .heirs-table th {
      background: #f3f4f6;
      border: 1px solid #d1d5db;
      padding: 8px 10px;
      text-align: right;
      font-weight: bold;
      color: #374151;
      font-size: 11px;
    }
    .heirs-table td {
      border: 1px solid #d1d5db;
      padding: 7px 10px;
    }
    .heirs-table tr:nth-child(even) {
      background: #f9fafb;
    }
    .heirs-table .center {
      text-align: center;
    }
    .heirs-table .number {
      text-align: left;
      font-variant-numeric: tabular-nums;
      font-weight: 600;
    }
    .blocked-row td {
      background: #fef2f2 !important;
      color: #991b1b;
    }
    .blocked-label {
      font-weight: bold;
      color: #dc2626;
    }
    .blocked-reason {
      font-size: 11px;
      color: #991b1b;
    }

    /* Notices */
    .notice {
      padding: 10px 14px;
      margin-bottom: 10px;
      border-right: 4px solid;
      font-size: 12px;
    }
    .notice-awl {
      background: #fef2f2;
      border-color: #dc2626;
      color: #991b1b;
    }
    .notice-radd {
      background: #eff6ff;
      border-color: #2563eb;
      color: #1e40af;
    }

    /* Steps */
    .steps-list {
      list-style: none;
      padding: 0;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      color: #4b5563;
      line-height: 1.9;
    }
    .steps-list li {
      padding: 2px 0;
    }
    .steps-list .step-divider {
      border-top: 1px solid #e5e7eb;
      margin-top: 6px;
      padding-top: 6px;
    }

    /* Warnings */
    .warning-item {
      background: #fffbeb;
      border: 1px solid #fbbf24;
      border-right: 4px solid #f59e0b;
      padding: 8px 14px;
      margin-bottom: 8px;
      font-size: 12px;
      color: #92400e;
    }

    /* Footer */
    .report-footer {
      margin-top: 30px;
      border-top: 2px solid #e5e7eb;
      padding-top: 16px;
      text-align: center;
      font-size: 11px;
      color: #6b7280;
      page-break-inside: avoid;
    }
    .report-footer .disclaimer {
      background: #fffbeb;
      border: 1px solid #fde68a;
      padding: 12px 16px;
      margin-bottom: 12px;
      color: #92400e;
      font-size: 12px;
      font-weight: bold;
    }

    @media print {
      body {
        padding: 10px 20px;
      }
      .section {
        page-break-inside: avoid;
      }
      .heirs-table {
        page-break-inside: auto;
      }
      .heirs-table tr {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <div class="report-header">
    <div class="brand">&#9889; حاسبة VIP</div>
    <h1>تقرير تقسيم التركة الشرعي</h1>
    <div class="date">${dateStr} - ${timeStr}</div>
  </div>

  <!-- Estate Summary -->
  <div class="section">
    <div class="section-title">&#128202; ملخص التركة</div>
    <table class="summary-table">
      <tr>
        <td class="label">إجمالي التركة</td>
        <td class="value">${fmt(result.grossEstate)} ريال</td>
      </tr>
      ${
        result.debts > 0
          ? `<tr class="deduction">
              <td class="label">(-) الديون</td>
              <td class="value">${fmt(result.debts)} ريال</td>
            </tr>`
          : ""
      }
      ${
        result.wasiyyah > 0
          ? `<tr class="deduction">
              <td class="label">(-) الوصية</td>
              <td class="value">${fmt(result.wasiyyah)} ريال</td>
            </tr>`
          : ""
      }
      <tr class="net-row">
        <td class="label">صافي التركة</td>
        <td class="value">${fmt(result.netEstate)} ريال</td>
      </tr>
    </table>
  </div>

  <!-- Deceased Info -->
  <div class="section">
    <div class="section-title">&#128100; بيانات المتوفى</div>
    <div class="info-grid">
      <div class="info-item">
        <strong>جنس المتوفى:</strong> ${deceasedGender === "male" ? "ذكر" : "أنثى"}
      </div>
      <div class="info-item">
        <strong>عدد الورثة المستحقين:</strong> ${totalHeirCount}
      </div>
      ${
        blockedHeirs.length > 0
          ? `<div class="info-item">
              <strong>الورثة المحجوبون:</strong> ${blockedHeirs.length}
            </div>`
          : ""
      }
    </div>
  </div>

  <!-- Special Cases -->
  ${
    specialCasesHTML
      ? `<div class="section">
          <div class="section-title">&#9878; حالات خاصة</div>
          ${specialCasesHTML}
        </div>`
      : ""
  }

  <!-- Heirs Table -->
  <div class="section">
    <div class="section-title">&#128203; تفصيل أنصبة الورثة</div>
    <table class="heirs-table">
      <thead>
        <tr>
          <th>الوارث</th>
          <th>العدد</th>
          <th>نوع الحصة</th>
          <th>النصيب</th>
          <th>النسبة</th>
          <th>المبلغ الإجمالي</th>
          <th>نصيب الفرد</th>
        </tr>
      </thead>
      <tbody>
        ${heirsTableRows}
        ${blockedRows}
      </tbody>
    </table>
  </div>

  <!-- Calculation Steps -->
  ${
    result.steps.length > 0
      ? `<div class="section">
          <div class="section-title">&#128208; خطوات الحساب التفصيلية</div>
          <ul class="steps-list">
            ${stepsHTML}
          </ul>
        </div>`
      : ""
  }

  <!-- Warnings -->
  ${
    result.warnings.length > 0
      ? `<div class="section">
          <div class="section-title">&#9888; تنبيهات</div>
          ${warningsHTML}
        </div>`
      : ""
  }

  <!-- Footer -->
  <div class="report-footer">
    <div class="disclaimer">
      &#9888; هذا التقرير استرشادي فقط ولا يُعتبر فتوى شرعية أو وثيقة قانونية.
      يُرجى مراجعة المحكمة الشرعية أو عالم شرعي مختص للتأكد من صحة التوزيع في حالتك.
    </div>
    <div>حاسبة VIP - حاسبة المواريث الشرعية</div>
    <div>تاريخ التقرير: ${dateStr}</div>
  </div>
</body>
</html>`;
}

export default function PDFExport({
  result,
  deceasedGender,
}: PDFExportProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = useCallback(() => {
    setIsLoading(true);

    // Small delay to show loading state
    setTimeout(() => {
      try {
        const html = buildReportHTML(result, deceasedGender);

        const printWindow = window.open("", "_blank");
        if (!printWindow) {
          alert("يرجى السماح بالنوافذ المنبثقة لتصدير التقرير");
          setIsLoading(false);
          return;
        }

        printWindow.document.write(html);
        printWindow.document.close();

        // Wait for content to render, then trigger print
        printWindow.onload = () => {
          printWindow.focus();
          printWindow.print();
          setIsLoading(false);
        };

        // Fallback if onload doesn't fire (some browsers)
        setTimeout(() => {
          try {
            printWindow.focus();
            printWindow.print();
          } catch {
            // Window may have been closed
          }
          setIsLoading(false);
        }, 1000);
      } catch {
        setIsLoading(false);
        alert("حدث خطأ أثناء إعداد التقرير. يرجى المحاولة مرة أخرى.");
      }
    }, 100);
  }, [result, deceasedGender]);

  return (
    <button
      onClick={handleExport}
      disabled={isLoading}
      className="
        group relative inline-flex items-center gap-2.5
        px-6 py-3 rounded-xl
        bg-gradient-to-l from-green-600 to-emerald-600
        hover:from-green-500 hover:to-emerald-500
        active:from-green-700 active:to-emerald-700
        text-white font-bold text-sm
        shadow-lg shadow-green-600/25
        hover:shadow-xl hover:shadow-green-600/30
        transition-all duration-200
        hover:-translate-y-0.5 active:translate-y-0
        disabled:opacity-60 disabled:cursor-not-allowed
        disabled:hover:translate-y-0 disabled:hover:shadow-lg
      "
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span>جارٍ التحضير...</span>
        </>
      ) : (
        <>
          <span className="text-lg leading-none">&#128196;</span>
          <span>تصدير تقرير PDF</span>
          <svg
            className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </>
      )}
    </button>
  );
}
