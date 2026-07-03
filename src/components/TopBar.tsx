"use client";

import { localizeText, useLanguage } from "@/i18n/language";
import { uiText } from "@/i18n/ui";

type TopBarProps = {
  activeAppLabel: string;
  onOpenAbout: () => void;
  onOpenPortfolio: () => void;
  onOpenServices: () => void;
  onOpenContact: () => void;
};

export function TopBar({
  activeAppLabel,
  onOpenAbout,
  onOpenPortfolio,
  onOpenServices,
  onOpenContact,
}: TopBarProps) {
  const { language } = useLanguage();

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-8 items-center justify-between border-b border-white/10 bg-white/10 px-4 text-[13px] text-white shadow-sm backdrop-blur-xl md:px-5">
      <nav className="flex min-w-0 items-center gap-4" aria-label="Desktop menu">
        <button type="button" className="shrink-0 font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-white/80" onClick={onOpenPortfolio}>
          {localizeText(uiText.topbar.portfolio, language)}
        </button>
        {activeAppLabel ? (
          <span className="hidden shrink-0 whitespace-nowrap text-white/75 sm:inline">{activeAppLabel}</span>
        ) : null}
        <button type="button" className="hidden text-white/75 transition hover:text-white focus-visible:ring-2 focus-visible:ring-white/80 md:inline" onClick={onOpenServices}>
          {localizeText(uiText.topbar.services, language)}
        </button>
        <button type="button" className="hidden text-white/75 transition hover:text-white focus-visible:ring-2 focus-visible:ring-white/80 md:inline" onClick={onOpenAbout}>
          {localizeText(uiText.topbar.about, language)}
        </button>
      </nav>
      <div className="flex items-center gap-3 text-white/75">
        <button type="button" className="hidden transition hover:text-white focus-visible:ring-2 focus-visible:ring-white/80 sm:inline" onClick={onOpenContact}>
          {localizeText(uiText.topbar.contact, language)}
        </button>
        <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[11px] text-emerald-100">
          {localizeText(uiText.topbar.available, language)}
        </span>
      </div>
    </header>
  );
}
