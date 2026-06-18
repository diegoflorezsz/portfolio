"use client";

import { useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
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
  const isMaximized = window.status === "maximized";
  const isLeaving = window.status === "closing" || window.status === "minimizing";
  const dragOrigin = useRef<DragOrigin | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const windowStyle = {
    "--window-x": `${window.position.x}px`,
    "--window-y": `${window.position.y}px`,
    "--window-width": `${window.size.width}px`,
    "--window-height": `${window.size.height}px`,
    zIndex: window.zIndex,
  } as CSSProperties;

  return (
    <section
      className={`window-shell fixed z-20 flex max-h-[calc(100dvh-7rem)] min-h-72 flex-col overflow-hidden rounded-2xl border outline-none max-lg:inset-x-3 max-lg:bottom-24 max-lg:top-12 max-lg:h-auto max-lg:max-h-none max-lg:w-auto ${
        isMaximized
          ? "inset-x-4 bottom-[6.75rem] top-12"
          : "left-[var(--window-x)] top-[var(--window-y)] h-[var(--window-height)] w-[var(--window-width)]"
      } ${isActive ? "border-white/30 bg-slate-950/80 shadow-2xl shadow-black/50" : "border-white/20 bg-slate-950/70 shadow-xl shadow-black/30"} ${
        isLeaving ? "window-shell--leaving" : "window-shell--entering"
      } ${isDragging ? "is-dragging select-none" : ""} backdrop-blur-2xl`}
      style={windowStyle}
      tabIndex={-1}
      aria-label={`${window.title} window`}
      onMouseDown={onFocus}
      onFocus={onFocus}
    >
      <header
        className={`relative flex h-11 shrink-0 touch-none items-center justify-between border-b px-4 max-lg:cursor-default ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } ${isActive ? "border-white/20 bg-white/10" : "border-white/10 bg-white/5"}`}
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        onPointerCancel={handleDragEnd}
      >
        <WindowControls isMaximized={isMaximized} onClose={onClose} onMinimize={onMinimize} onToggleMaximize={onToggleMaximize} />
        <h2 className="pointer-events-none absolute left-1/2 max-w-[55%] -translate-x-1/2 truncate text-sm font-semibold text-white/90">
          {window.title}
        </h2>
        <span className="text-[11px] uppercase tracking-[0.18em] text-white/30">{window.appId}</span>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto p-5 text-white">{children}</div>
    </section>
  );
}
