"use client";
import { useLocale } from "@/lib/i18n";

interface BookingButtonsProps {
  theforkUrl?: string;
  getYourGuideUrl?: string;
  menuUrl?: string;
}

export default function BookingButtons({ theforkUrl, getYourGuideUrl, menuUrl }: BookingButtonsProps) {
  const { t } = useLocale();
  if (!theforkUrl && !getYourGuideUrl && !menuUrl) return null;

  return (
    <div className="flex flex-col gap-3">
      {theforkUrl && (
        <a
          href={theforkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-[#00845A] hover:bg-[#006b49] text-white font-semibold py-3.5 rounded-2xl transition-colors shadow-md active:scale-[0.98]"
        >
          <span>🍴</span> {t("buttons.reserveTheFork")}
        </a>
      )}
      {getYourGuideUrl && (
        <a
          href={getYourGuideUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-[#FF5533] hover:bg-[#e04a2c] text-white font-semibold py-3.5 rounded-2xl transition-colors shadow-md active:scale-[0.98]"
        >
          <span>🎟️</span> {t("buttons.bookGetYourGuide")}
        </a>
      )}
      {menuUrl && (
        <a
          href={menuUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-white hover:bg-slate-50 text-slate-800 font-semibold py-3.5 rounded-2xl transition-colors border border-slate-200 shadow-sm active:scale-[0.98]"
        >
          <span>📋</span> {t("buttons.viewMenu")}
        </a>
      )}
    </div>
  );
}
