"use client";

import { localizeText, useLanguage } from "@/i18n/language";
import { uiText } from "@/i18n/ui";

type WindowControlsProps = {
  isMaximized: boolean;
  dialogMode?: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
};

export function WindowControls({
  isMaximized,
  dialogMode = false,
  onClose,
  onMinimize,
  onToggleMaximize,
}: WindowControlsProps) {
  const { language } = useLanguage();

  return (
    <div className="flex items-center gap-[7px]" onPointerDown={(event) => event.stopPropagation()}>
      <button
        type="button"
        className="h-3 w-3 rounded-full bg-red-400 ring-1 ring-black/15 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label={localizeText(uiText.window.close, language)}
        onClick={onClose}
      />
      <button
        type="button"
        className="h-3 w-3 rounded-full bg-amber-300 ring-1 ring-black/15 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label={localizeText(uiText.window.minimize, language)}
        onClick={dialogMode ? undefined : onMinimize}
        tabIndex={dialogMode ? -1 : 0}
      />
      <button
        type="button"
        className="h-3 w-3 rounded-full bg-emerald-400 ring-1 ring-black/15 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label={localizeText(
          dialogMode ? uiText.window.zoomUnavailable : isMaximized ? uiText.window.restore : uiText.window.maximize,
          language,
        )}
        onClick={dialogMode ? undefined : onToggleMaximize}
        tabIndex={dialogMode ? -1 : 0}
      />
    </div>
  );
}
