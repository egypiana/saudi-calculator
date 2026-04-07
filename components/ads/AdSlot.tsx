"use client";

import { useTranslations } from "next-intl";

type AdSize = "leaderboard" | "rectangle" | "banner";

const adSizeClasses: Record<AdSize, string> = {
  leaderboard: "w-full h-[90px]",
  rectangle: "w-full max-w-[300px] h-[250px] mx-auto",
  banner: "w-full h-[60px]",
};

interface AdSlotProps {
  id: string;
  size: AdSize;
  className?: string;
}

export default function AdSlot({ id, size, className = "" }: AdSlotProps) {
  const t = useTranslations("common");

  return (
    <div
      id={`ad-${id}`}
      className={`${adSizeClasses[size]} bg-gray-100 dark:bg-dark-surface border border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center my-6 ${className}`}
    >
      <span className="text-gray-400 dark:text-gray-600 text-sm font-medium">
        {t("adSpace")}
      </span>
    </div>
  );
}
