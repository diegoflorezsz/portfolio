"use client";

import { useEffect, useRef, useState } from "react";
import { dockApps } from "@/data/dockApps";
import type { DockApp } from "@/types/portfolio";
import type { WindowKind } from "@/types/window";

type DockProps = {
  openAppIds: Set<WindowKind>;
  onOpenDockApp: (app: DockApp) => void;
};

export function Dock({ openAppIds, onOpenDockApp }: DockProps) {
  const [launchingAppId, setLaunchingAppId] = useState<string | null>(null);
  const launchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (launchTimer.current) {
        clearTimeout(launchTimer.current);
      }
    },
    [],
  );

  const handleLaunch = (app: DockApp) => {
    setLaunchingAppId(app.id);
    onOpenDockApp(app);

    if (launchTimer.current) {
      clearTimeout(launchTimer.current);
    }

    launchTimer.current = setTimeout(() => setLaunchingAppId(null), 240);
  };

  return (
    <nav className="fixed inset-x-0 bottom-3 z-40 flex justify-center px-3" aria-label="Dock">
      <div className="flex max-w-[calc(100vw-1.5rem)] gap-2 overflow-x-auto overflow-y-hidden rounded-3xl border border-white/20 bg-white/20 p-2 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:overflow-visible">
        {dockApps.map((app) => {
          const isOpen = openAppIds.has(app.windowKind);

          return (
            <button
              key={app.id}
              type="button"
              className="group relative flex h-[4.125rem] w-14 shrink-0 flex-col items-center justify-end gap-1 rounded-2xl p-1.5 outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              aria-label={`${isOpen ? "Focus" : "Open"} ${app.label}`}
              onClick={() => handleLaunch(app)}
            >
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-white/20 bg-slate-950/80 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur-md transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
              >
                {app.label}
              </span>
              <span className={`dock-icon flex h-11 w-11 origin-bottom items-center justify-center rounded-2xl bg-gradient-to-br ${app.icon.backgroundClass ?? "from-white/30 to-white/10"} text-base font-bold text-white shadow-md ring-1 ring-white/25 group-hover:-translate-y-1 group-hover:scale-125 group-focus-visible:-translate-y-1 group-focus-visible:scale-125 ${launchingAppId === app.id ? "dock-icon--launching" : ""}`}>
                {app.icon.src ? null : app.icon.fallback}
              </span>
              <span className="sr-only">{app.label}</span>
              {isOpen ? <span className="absolute bottom-1 h-1 w-1 rounded-full bg-white/75" aria-hidden="true" /> : null}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
