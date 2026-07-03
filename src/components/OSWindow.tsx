"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { localizeText, useLanguage } from "@/i18n/language";
import { uiText } from "@/i18n/ui";
import type { WindowInstance } from "@/types/window";
import { WindowControls } from "./WindowControls";

type OSWindowProps = {
  window: WindowInstance;
  isActive: boolean;
  children: ReactNode;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onMove: (position: { x: number; y: number }) => void;
};

type DragOrigin = {
  pointerX: number;
  pointerY: number;
  windowX: number;
  windowY: number;
};

type WindowVisualState = "entering" | "open" | "closing";

export function OSWindow({
  window,
  isActive,
  children,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
}: OSWindowProps) {
  const { language } = useLanguage();
  const isMaximized = window.status === "maximized";
  const isProjectWindow = window.appId === "project";
  const isNotesWindow = window.appId === "notes";
  const isMediaInfoWindow = window.appId === "gallery" || window.appId === "trash";
  const isAdobeDialog =
    window.appId === "after-effects" || window.appId === "photoshop" || window.appId === "illustrator";
  const [visualState, setVisualState] = useState<WindowVisualState>("entering");
  const isLeaving = window.status === "closing" || window.status === "minimizing";
  const windowRef = useRef<HTMLElement>(null);
  const dragOrigin = useRef<DragOrigin | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setVisualState("open"));
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, []);

  useEffect(() => {
    if (isLeaving) {
      setVisualState("closing");
    }
  }, [isLeaving]);

  if (window.status === "minimized") {
    return null;
  }

  const handleDragStart = (event: ReactPointerEvent<HTMLElement>) => {
    if (isMaximized || globalThis.innerWidth < 1024 || event.button !== 0) {
      return;
    }

    onFocus();
    dragOrigin.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      windowX: window.position.x,
      windowY: window.position.y,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (!dragOrigin.current || !isDragging) {
      return;
    }

    const nextX = dragOrigin.current.windowX + event.clientX - dragOrigin.current.pointerX;
    const nextY = dragOrigin.current.windowY + event.clientY - dragOrigin.current.pointerY;
    const visibleEdge = 80;
    const minX = visibleEdge - window.size.width;
    const maxX = globalThis.innerWidth - visibleEdge;
    const minY = 32;
    const maxY = globalThis.innerHeight - visibleEdge;

    onMove({
      x: Math.min(Math.max(nextX, minX), maxX),
      y: Math.min(Math.max(nextY, minY), maxY),
    });
  };

  const handleDragEnd = (event: ReactPointerEvent<HTMLElement>) => {
    if (!dragOrigin.current) {
      return;
    }

    dragOrigin.current = null;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleClose = () => {
    onClose();
  };

  const localizedWindowTitle =
    window.appId === "work"
      ? localizeText(uiText.window.selectedWork, language)
      : window.appId === "archive"
        ? localizeText(uiText.window.archive, language)
        : window.appId === "notes"
          ? localizeText(uiText.window.notesTitle, language)
          : window.appId === "gallery"
            ? localizeText(uiText.window.gallery, language)
            : window.appId === "trash"
              ? localizeText(uiText.window.trash, language)
              : window.title;
  const displayWindowTitle =
    isProjectWindow || isMediaInfoWindow
      ? `${localizeText(uiText.window.informationAbout, language)} ${localizedWindowTitle}`
      : localizedWindowTitle;

  const windowStyle = {
    "--window-x": `${window.position.x}px`,
    "--window-y": `${window.position.y}px`,
    "--window-width": `${
      isProjectWindow || isMediaInfoWindow ? Math.round(window.size.width * 0.82) : window.size.width
    }px`,
    "--window-height": `${isProjectWindow || isMediaInfoWindow ? 451 : window.size.height}px`,
    zIndex: window.zIndex,
  } as CSSProperties;

  return (
    <section
      ref={windowRef}
      className={`window-shell ${isProjectWindow ? "is-project-window" : ""} ${
        isMediaInfoWindow ? "is-media-info-window" : ""
      } ${
        isNotesWindow ? "is-notes-window" : ""
      } ${
        isAdobeDialog ? "is-adobe-dialog min-h-0" : "min-h-72"
      } fixed z-20 flex max-h-[calc(100dvh-7rem)] flex-col overflow-hidden rounded-xl border outline-none max-lg:inset-x-3 max-lg:bottom-24 max-lg:top-12 max-lg:h-auto max-lg:max-h-none max-lg:w-auto ${
        isMaximized
          ? "inset-x-4 bottom-[6.75rem] top-12"
          : "left-[var(--window-x)] top-[var(--window-y)] h-[var(--window-height)] w-[var(--window-width)]"
      } ${isActive ? "is-active border-white/25 bg-slate-950/80" : "is-inactive border-white/15 bg-slate-950/70"} ${
        visualState === "entering"
          ? "window-shell--entering"
          : visualState === "closing"
            ? "window-shell--closing"
            : "window-shell--open"
      } ${isDragging ? "is-dragging select-none" : ""} backdrop-blur-2xl`}
      style={windowStyle}
      tabIndex={-1}
      aria-label={displayWindowTitle}
      onMouseDown={onFocus}
      onFocus={onFocus}
    >
      <header
        className={`window-titlebar relative flex ${
          isProjectWindow || isNotesWindow || isMediaInfoWindow ? "h-8" : isAdobeDialog ? "h-[25px]" : "h-11"
        } shrink-0 touch-none items-center justify-between border-b px-3.5 max-lg:cursor-default ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } ${isActive ? "border-white/[0.16] bg-white/[0.12]" : "border-white/[0.08] bg-white/[0.07]"}`}
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        onPointerCancel={handleDragEnd}
      >
        {isAdobeDialog ? null : (
          <WindowControls
            isMaximized={isMaximized}
            onClose={handleClose}
            onMinimize={onMinimize}
            onToggleMaximize={onToggleMaximize}
          />
        )}
        <h2
          className={`window-title pointer-events-none absolute left-1/2 ${
            isProjectWindow || isNotesWindow || isMediaInfoWindow
              ? "max-w-[70%]"
              : isAdobeDialog
                ? "max-w-[65%]"
                : "max-w-[55%]"
          } -translate-x-1/2 truncate text-sm font-semibold text-white/90`}
        >
          {displayWindowTitle}
        </h2>
        <span className="window-app-label text-[11px] uppercase tracking-[0.18em] text-white/30">
          {isProjectWindow ? "" : window.appId}
        </span>
      </header>
      <div
        className={`window-content min-h-0 flex-1 ${
          isProjectWindow || isNotesWindow || isMediaInfoWindow || isAdobeDialog
            ? "overflow-hidden p-0"
            : "overflow-y-auto p-5 text-white"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
