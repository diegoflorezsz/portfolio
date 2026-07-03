"use client";

import { Fragment } from "react";
import { dockApps } from "@/data/dockApps";
import { localizeText, useLanguage } from "@/i18n/language";
import { uiText } from "@/i18n/ui";
import type { DockApp } from "@/types/portfolio";
import type { WindowKind } from "@/types/window";

type DockProps = {
  openAppIds: Set<WindowKind>;
  onOpenDockApp: (app: DockApp) => void;
  onActivateDockApp: (app: DockApp) => void;
  onToggleLanguage?: () => void;
  isPortraitMobile?: boolean;
};

export function Dock({ openAppIds, onOpenDockApp, onActivateDockApp, onToggleLanguage, isPortraitMobile = false }: DockProps) {
  const { language } = useLanguage();

  const activateDockApp = (app: DockApp) => {
    onActivateDockApp(app);

    if (app.action === "external") {
      globalThis.open(app.target, "_blank", "noopener,noreferrer");
      return;
    }

    if (app.action === "mailto") {
      globalThis.location.href = app.target;
      return;
    }

    if (app.action === "toggle-language") {
      onToggleLanguage?.();
      return;
    }

    onOpenDockApp(app);
  };

  return (
    <nav
      className={`dock ${isPortraitMobile ? "dock--portrait-mobile" : ""} fixed inset-x-0 bottom-2.5 z-40 flex justify-center px-3`}
      aria-label="Dock"
    >
      <div className="dock__surface">
        {dockApps.map((app, index) => {
          const tooltipLabel = localizeText(app.tooltipLabel ?? app.label, language);
          const isInternalApp =
            app.action !== "external" &&
            app.action !== "mailto" &&
            app.action !== "toggle-language" &&
            Boolean(app.windowKind);
          const isOpen = Boolean(isInternalApp && app.windowKind && openAppIds.has(app.windowKind));
          const showDivider = index > 0 && app.group !== dockApps[index - 1]?.group;

          return (
            <Fragment key={app.id}>
              {showDivider ? <span className="dock__divider" aria-hidden="true" /> : null}
              <button
                type="button"
                className="dock-item"
                aria-label={`${localizeText(isOpen ? uiText.dock.focus : uiText.dock.open, language)} ${tooltipLabel}`}
                onClick={() => activateDockApp(app)}
              >
                <span className="dock__tooltip" role="tooltip">
                  {tooltipLabel}
                </span>
                <span className={`dock-icon dock-icon--${app.id} ${app.icon.src ? "dock-icon--asset" : ""}`}>
                  {app.icon.src ? (
                    <img className="dock-icon__image" src={app.icon.src} alt={app.icon.alt} draggable={false} />
                  ) : (
                    <span className="dock-icon__fallback" aria-hidden="true">
                      {app.icon.fallback}
                    </span>
                  )}
                </span>
                <span className="sr-only">{tooltipLabel}</span>
                {isOpen ? <span className="dock__indicator" aria-hidden="true" /> : null}
              </button>
            </Fragment>
          );
        })}
      </div>
    </nav>
  );
}

