"use client";

import { desktopIcons } from "@/data/desktopIcons";
import { projects } from "@/data/projects";
import { useWindowManager } from "@/hooks/useWindowManager";
import type { DesktopIcon as DesktopIconType, DockApp } from "@/types/portfolio";
import { useState } from "react";
import type { WindowKind } from "@/types/window";
import { DesktopIcon } from "./DesktopIcon";
import { Dock } from "./Dock";
import { TopBar } from "./TopBar";
import { Wallpaper } from "./Wallpaper";
import { WindowLayer } from "./WindowLayer";

const WINDOW_TITLES: Record<WindowKind, string> = {
  about: "About",
  contact: "Contact",
  work: "Selected Work",
  archive: "Archive",
  project: "Project",
};

export function Desktop() {
  const windowManager = useWindowManager();
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);

  const openApp = (appId: WindowKind) => {
    windowManager.openWindow({ appId, title: WINDOW_TITLES[appId] });
  };

  const openProject = (slug: string) => {
    const project = projects.find((item) => item.slug === slug);
    windowManager.openWindow({ appId: "project", title: project?.title ?? "Project", payload: { projectSlug: slug } });
  };

  const openDesktopIcon = (icon: DesktopIconType) => {
    setSelectedIconId(icon.id);

    if (icon.type === "project") {
      openProject(icon.target);
      return;
    }

    if (icon.type === "folder") {
      openApp(icon.target === "archive" ? "archive" : "work");
      return;
    }

    if (icon.target === "about" || icon.target === "contact" || icon.target === "work" || icon.target === "archive") {
      openApp(icon.target);
    }
  };

  const openDockApp = (app: DockApp) => {
    openApp(app.windowKind);
  };

  return (
    <main id="desktop" className="relative h-[100dvh] min-h-[640px] overflow-hidden text-white">
      <Wallpaper />
      <TopBar
        activeAppLabel={windowManager.activeWindow?.title ?? "Finder"}
        onOpenAbout={() => openApp("about")}
        onOpenWork={() => openApp("work")}
        onOpenContact={() => openApp("contact")}
      />
      <section
        className="relative z-10 h-full px-4 pb-32 pt-14 md:px-0"
        aria-label="Desktop icons"
        onClick={() => setSelectedIconId(null)}
      >
        <div className="grid grid-cols-3 justify-items-center gap-x-3 gap-y-6 sm:grid-cols-4 md:block md:h-full">
          {desktopIcons
            .slice()
            .sort((a, b) => (a.position.mobile?.order ?? 0) - (b.position.mobile?.order ?? 0))
            .map((icon) => (
              <DesktopIcon
                key={icon.id}
                icon={icon}
                isSelected={selectedIconId === icon.id}
                onOpen={openDesktopIcon}
              />
            ))}
        </div>
      </section>
      <WindowLayer
        windows={windowManager.windows}
        activeWindowId={windowManager.activeWindowId}
        onFocusWindow={windowManager.bringToFront}
        onCloseWindow={windowManager.closeWindow}
        onMinimizeWindow={windowManager.minimizeWindow}
        onToggleMaximizeWindow={windowManager.toggleMaximizeWindow}
        onMoveWindow={windowManager.moveWindow}
        onOpenProject={openProject}
      />
      <Dock openAppIds={windowManager.openAppIds} onOpenDockApp={openDockApp} />
    </main>
  );
}
