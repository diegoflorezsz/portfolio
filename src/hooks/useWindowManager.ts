"use client";

import { useCallback, useMemo, useState } from "react";
import type { OpenWindowInput, WindowInstance, WindowKind } from "@/types/window";

const BASE_Z_INDEX = 100;
const TRANSITION_DURATION_MS = 240;

const DEFAULT_SIZES: Record<WindowKind, { width: number; height: number }> = {
  about: { width: 560, height: 520 },
  contact: { width: 480, height: 420 },
  work: { width: 760, height: 560 },
  archive: { width: 680, height: 500 },
  project: { width: 760, height: 620 },
  notes: { width: 640, height: 470 },
  gallery: { width: 760, height: 620 },
  trash: { width: 760, height: 620 },
  "after-effects": { width: 356, height: 134 },
  photoshop: { width: 356, height: 134 },
  illustrator: { width: 356, height: 134 },
};

function getWindowId(input: OpenWindowInput) {
  if (input.appId === "project") {
    return "project";
  }

  return input.appId;
}

function getInitialPosition(index: number, appId: WindowKind) {
  if (appId === "after-effects" || appId === "photoshop" || appId === "illustrator") {
    const size = DEFAULT_SIZES[appId];

    return {
      x: Math.round((globalThis.innerWidth - size.width) / 2),
      y: Math.round((globalThis.innerHeight - size.height) / 2),
    };
  }

  return {
    x: 96 + index * 28,
    y: 76 + index * 24,
  };
}

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [zIndexCounter, setZIndexCounter] = useState(BASE_Z_INDEX);

  const bringToFront = useCallback((windowId: string) => {
    setZIndexCounter((current) => {
      const nextZIndex = current + 1;
      setWindows((currentWindows) =>
        currentWindows.map((window) =>
          window.id === windowId
            ? { ...window, status: window.status === "minimized" ? "open" : window.status, zIndex: nextZIndex }
            : window,
        ),
      );
      return nextZIndex;
    });
    setActiveWindowId(windowId);
  }, []);

  const openWindow = useCallback((input: OpenWindowInput) => {
    const windowId = getWindowId(input);

    setZIndexCounter((current) => {
      const nextZIndex = current + 1;

      setWindows((currentWindows) => {
        const existingWindow = currentWindows.find((window) => window.id === windowId);

        if (existingWindow) {
          return currentWindows.map((window) =>
            window.id === windowId
              ? { ...window, title: input.title, payload: input.payload, status: "open", zIndex: nextZIndex }
              : window,
          );
        }

        return [
          ...currentWindows,
          {
            id: windowId,
            appId: input.appId,
            title: input.title,
            status: "open",
            zIndex: nextZIndex,
            position: getInitialPosition(currentWindows.length, input.appId),
            size: DEFAULT_SIZES[input.appId],
            payload: input.payload,
          },
        ];
      });

      return nextZIndex;
    });

    setActiveWindowId(windowId);
  }, []);

  const closeWindow = useCallback((windowId: string) => {
    setWindows((currentWindows) => {
      const closingWindows = currentWindows.map((window) =>
        window.id === windowId ? { ...window, status: "closing" as const } : window,
      );
      const nextActiveWindow = closingWindows
        .filter((window) => window.id !== windowId && !["minimized", "minimizing", "closing"].includes(window.status))
        .sort((a, b) => b.zIndex - a.zIndex)[0];

      setActiveWindowId(nextActiveWindow?.id ?? null);
      return closingWindows;
    });

    window.setTimeout(() => {
      setWindows((currentWindows) =>
        currentWindows.filter((window) => window.id !== windowId || window.status !== "closing"),
      );
    }, TRANSITION_DURATION_MS);
  }, []);

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows((currentWindows) => {
      const nextWindows = currentWindows.map((window) =>
        window.id === windowId ? { ...window, status: "minimizing" as const } : window,
      );
      const nextActiveWindow = nextWindows
        .filter((window) => !["minimized", "minimizing", "closing"].includes(window.status))
        .sort((a, b) => b.zIndex - a.zIndex)[0];

      setActiveWindowId(nextActiveWindow?.id ?? null);
      return nextWindows;
    });

    window.setTimeout(() => {
      setWindows((currentWindows) =>
        currentWindows.map((window) =>
          window.id === windowId && window.status === "minimizing"
            ? { ...window, status: "minimized" }
            : window,
        ),
      );
    }, TRANSITION_DURATION_MS);
  }, []);

  const moveWindow = useCallback((windowId: string, position: { x: number; y: number }) => {
    setWindows((currentWindows) =>
      currentWindows.map((window) => (window.id === windowId ? { ...window, position } : window)),
    );
  }, []);

  const toggleMaximizeWindow = useCallback((windowId: string) => {
    setWindows((currentWindows) =>
      currentWindows.map((window) =>
        window.id === windowId ? { ...window, status: window.status === "maximized" ? "open" : "maximized" } : window,
      ),
    );
    bringToFront(windowId);
  }, [bringToFront]);

  const activeWindow = useMemo(
    () =>
      windows.find(
        (window) =>
          window.id === activeWindowId && !["minimized", "minimizing", "closing"].includes(window.status),
      ) ?? null,
    [activeWindowId, windows],
  );

  const openAppIds = useMemo(() => new Set(windows.map((window) => window.appId)), [windows]);

  return {
    windows,
    activeWindow,
    activeWindowId,
    openAppIds,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    bringToFront,
    moveWindow,
  };
}
