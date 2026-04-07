"use client";

import { useState } from "react";
import { Link as LinkIcon, Check } from "lucide-react";
import { useTranslations } from "next-intl";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations("common");

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n${shareUrl}`)}`;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
        {t("share")}:
      </span>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 bg-gray-100 dark:bg-dark-surface hover:bg-gray-200 dark:hover:bg-white/10 rounded-full text-sm transition-colors"
      >
        X
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 text-green-700 dark:text-green-400 rounded-full text-sm transition-colors"
      >
        WhatsApp
      </a>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-dark-surface hover:bg-gray-200 dark:hover:bg-white/10 rounded-full text-sm transition-colors"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-green-500" />
            {t("copied")}
          </>
        ) : (
          <>
            <LinkIcon className="h-3.5 w-3.5" />
            {t("copyLink")}
          </>
        )}
      </button>
    </div>
  );
}
