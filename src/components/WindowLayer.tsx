import type { WindowInstance } from "@/types/window";
import { AboutApp } from "./apps/AboutApp";
import { AdobeDialogApp } from "./apps/AdobeDialogApp";
import { ArchiveApp } from "./apps/ArchiveApp";
import { ContactApp } from "./apps/ContactApp";
import { MediaInfoApp } from "./apps/MediaInfoApp";
import { NotesApp } from "./apps/NotesApp";
import { ProjectApp } from "./apps/ProjectApp";
import { WorkApp } from "./apps/WorkApp";
import { OSWindow } from "./OSWindow";

type WindowLayerProps = {
  windows: WindowInstance[];
  activeWindowId: string | null;
  shouldCoverDock?: boolean;
  onFocusWindow: (windowId: string) => void;
  onCloseWindow: (windowId: string) => void;
  onMinimizeWindow: (windowId: string) => void;
  onToggleMaximizeWindow: (windowId: string) => void;
  onMoveWindow: (windowId: string, position: { x: number; y: number }) => void;
  onOpenProject: (slug: string) => void;
};

export function WindowLayer({
  windows,
  activeWindowId,
  shouldCoverDock = false,
  onFocusWindow,
  onCloseWindow,
  onMinimizeWindow,
  onToggleMaximizeWindow,
  onMoveWindow,
  onOpenProject,
}: WindowLayerProps) {
  return (
    <div className={`pointer-events-none fixed inset-0 ${shouldCoverDock ? "z-50" : "z-20"}`}>
      {windows.map((window) => (
        <div className="pointer-events-auto" key={window.id}>
          <OSWindow
            window={window}
            isActive={window.id === activeWindowId}
            onFocus={() => onFocusWindow(window.id)}
            onClose={() => onCloseWindow(window.id)}
            onMinimize={() => onMinimizeWindow(window.id)}
            onToggleMaximize={() => onToggleMaximizeWindow(window.id)}
            onMove={(position) => onMoveWindow(window.id, position)}
          >
            {window.appId === "about" ? <AboutApp /> : null}
            {window.appId === "contact" ? <ContactApp /> : null}
            {window.appId === "work" ? <WorkApp onOpenProject={onOpenProject} /> : null}
            {window.appId === "archive" ? <ArchiveApp onOpenProject={onOpenProject} /> : null}
            {window.appId === "project" ? <ProjectApp slug={window.payload?.projectSlug} /> : null}
            {window.appId === "notes" ? <NotesApp requestedSection={window.payload?.notesSection} /> : null}
            {window.appId === "gallery" || window.appId === "trash" ? <MediaInfoApp kind={window.appId} /> : null}
            {window.appId === "after-effects" ||
            window.appId === "photoshop" ||
            window.appId === "illustrator" ? (
              <AdobeDialogApp kind={window.appId} onClose={() => onCloseWindow(window.id)} />
            ) : null}
          </OSWindow>
        </div>
      ))}
    </div>
  );
}
