"use client";

import { desktopIcons } from "@/data/desktopIcons";
import { projects } from "@/data/projects";
import { useIsPortraitMobile } from "@/hooks/useIsPortraitMobile";
import { useWindowManager } from "@/hooks/useWindowManager";
import { localizeText, useLanguage } from "@/i18n/language";
import { uiText } from "@/i18n/ui";
import type { DesktopIcon as DesktopIconType, DockApp } from "@/types/portfolio";
import { useRef, useState } from "react";
import type { NotesSectionId, WindowKind } from "@/types/window";
import { DesktopIcon } from "./DesktopIcon";
import { Dock } from "./Dock";
import { TopBar } from "./TopBar";
import { Wallpaper } from "./Wallpaper";
import { WindowLayer } from "./WindowLayer";


type MobileIconLayout = {
  x: number;
  y: number;
  width: number;
};

const mobileIconLayout: Record<string, MobileIconLayout> = {
  aura: { x: 216, y: 100, width: 84 },
  casagrande: { x: 274, y: 116, width: 99 },
  coral: { x: 128, y: 160, width: 93 },
  graphiczsz: { x: 222, y: 252, width: 135 },
  logofolio: { x: 132, y: 282, width: 87 },
  pagaille: { x: 282, y: 390, width: 97 },
  sealed: { x: 168, y: 432, width: 93 },
  melabody: { x: 276, y: 536, width: 84 },
  aspect: { x: 168, y: 560, width: 84 },
  sinky: { x: 278, y: 650, width: 91 },
  saltwood: { x: 144, y: 382, width: 76 },
};

const mobileIconDepth: Record<string, number> = {
  saltwood: 10,
  logofolio: 20,
  coral: 30,
  graphiczsz: 10,
  casagrande: 20,
  aspect: 10,
  sealed: 20,
  sinky: 10,
  melabody: 20,
  pagaille: 30,
};

function getFallbackMobileLayout(icon: DesktopIconType): MobileIconLayout {
  const mobileOrder = icon.position?.mobile?.order ?? 999;

  return {
    x: 32 + (mobileOrder % 3) * 42,
    y: 72 + mobileOrder * 46,
    width: 76,
  };
}

function getResolvedMobileLayout(icon: DesktopIconType) {
  return mobileIconLayout[icon.target] ?? getFallbackMobileLayout(icon);
}

const WINDOW_TITLES: Record<WindowKind, string> = {
  about: "About",
  contact: "Contact",
  work: "Selected Work",
  archive: "Archive",
  project: "Project",
  notes: "Information about: Flores Diego, diegoafloresc@gmail.com",
  gallery: "Gallery",
  trash: "Trash",
  "after-effects": "Adobe After Effects",
  photoshop: "Adobe Photoshop",
  illustrator: "Adobe Illustrator",
};

export function Desktop() {
  const windowManager = useWindowManager();
  const isPortraitMobile = useIsPortraitMobile();
  const { language, toggleLanguage } = useLanguage();
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [externalDockLabel, setExternalDockLabel] = useState("");
  const [desktopIconLayers, setDesktopIconLayers] = useState<Record<string, number>>({});
  const nextDesktopIconLayer = useRef(10);

  const openApp = (appId: WindowKind) => {
    setExternalDockLabel("");
    windowManager.openWindow({ appId, title: WINDOW_TITLES[appId] });
  };

  const openNotes = (section: NotesSectionId) => {
    setExternalDockLabel("");
    windowManager.openWindow({
      appId: "notes",
      title: WINDOW_TITLES.notes,
      payload: { notesSection: section },
    });
  };

  const openProject = (slug: string) => {
    const project = projects.find((item) => item.slug === slug);
    setExternalDockLabel("");
    windowManager.openWindow({ appId: "project", title: project?.title ?? "Project", payload: { projectSlug: slug } });
  };

  const openDesktopIcon = (icon: DesktopIconType) => {
    if (icon.type === "project") {
      openProject(icon.target);
      setSelectedIconId(null);
      return;
    }

    if (icon.type === "folder") {
      openApp(icon.target === "archive" ? "archive" : "work");
      setSelectedIconId(null);
      return;
    }

    if (icon.target === "about" || icon.target === "contact" || icon.target === "work" || icon.target === "archive") {
      openApp(icon.target);
      setSelectedIconId(null);
    }
  };

  const openDockApp = (app: DockApp) => {
    if (!app.windowKind) {
      return;
    }

    openApp(app.windowKind);
  };

  const selectedDesktopIcon = desktopIcons.find((icon) => icon.id === selectedIconId);
  const activeWindowLabel = (() => {
    if (!windowManager.activeWindow) {
      return selectedDesktopIcon?.title ?? "";
    }

    if (windowManager.activeWindow.appId === "work") {
      return localizeText(uiText.window.selectedWork, language);
    }

    if (windowManager.activeWindow.appId === "archive") {
      return localizeText(uiText.window.archive, language);
    }

    if (windowManager.activeWindow.appId === "notes") {
      return "Notes";
    }

    if (windowManager.activeWindow.appId === "gallery") {
      return localizeText(uiText.window.gallery, language);
    }

    if (windowManager.activeWindow.appId === "trash") {
      return localizeText(uiText.window.trash, language);
    }

    return windowManager.activeWindow.title;
  })();
  const topBarLabel = externalDockLabel || activeWindowLabel;

  const bringDesktopIconToFront = (iconId: string) => {
    nextDesktopIconLayer.current += 1;
    setDesktopIconLayers((layers) => ({ ...layers, [iconId]: nextDesktopIconLayer.current }));
  };

  const sortedDesktopIcons = desktopIcons
    .slice()
    .sort((a, b) => (a.position.mobile?.order ?? 0) - (b.position.mobile?.order ?? 0));

  return (
    <main
      id="desktop"
      className="relative h-[100dvh] min-h-[640px] overflow-hidden text-white"
      data-mobile-portrait={isPortraitMobile ? "true" : "false"}
    >
      <Wallpaper />
      <TopBar
        activeAppLabel={topBarLabel}
        onOpenPortfolio={() => openApp("work")}
        onOpenServices={() => openNotes("services")}
        onOpenAbout={() => openNotes("about")}
        onOpenContact={() => openNotes("contact")}
      />
      <section
        className={isPortraitMobile ? "relative z-10 h-full p-0" : "relative z-10 h-full px-4 pb-32 pt-14 md:px-0"}
        aria-label="Desktop icons"
        onClick={() => {
          setSelectedIconId(null);
          setExternalDockLabel("");
        }}
      >
        <div className={isPortraitMobile ? "desktop-icon-canvas--portrait-mobile" : "grid grid-cols-3 justify-items-center gap-x-3 gap-y-6 sm:grid-cols-4 md:block md:h-full"}>
          {sortedDesktopIcons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              icon={icon}
              isSelected={selectedIconId === icon.id}
              zIndex={desktopIconLayers[icon.id] ?? 1}
              onBringToFront={bringDesktopIconToFront}
              onOpen={openDesktopIcon}
              isPortraitMobile={isPortraitMobile}
              mobileLayout={getResolvedMobileLayout(icon)}
              mobileDepth={mobileIconDepth[icon.target] ?? 1}
            />
          ))}
        </div>
      </section>
      <WindowLayer
        windows={windowManager.windows}
        activeWindowId={windowManager.activeWindowId}
        shouldCoverDock={isPortraitMobile && windowManager.windows.length > 0}
        onFocusWindow={windowManager.bringToFront}
        onCloseWindow={windowManager.closeWindow}
        onMinimizeWindow={windowManager.minimizeWindow}
        onToggleMaximizeWindow={windowManager.toggleMaximizeWindow}
        onMoveWindow={windowManager.moveWindow}
        onOpenProject={openProject}
      />
      <Dock
        openAppIds={windowManager.openAppIds}
        onOpenDockApp={openDockApp}
        onActivateDockApp={(app) => {
          if (app.action === "external" || app.action === "mailto") {
            setExternalDockLabel(app.label);
          }
        }}
        onToggleLanguage={() => {
          setExternalDockLabel("");
          toggleLanguage();
        }}
        isPortraitMobile={isPortraitMobile}
      />
    </main>
  );
}

