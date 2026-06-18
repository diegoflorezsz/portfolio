import type { DockApp } from "@/types/portfolio";

export const dockApps: DockApp[] = [
  {
    id: "finder",
    label: "Work",
    action: "open-folder",
    target: "selected-work",
    windowKind: "work",
    pinned: true,
    icon: { alt: "Work app icon", fallback: "⌂", backgroundClass: "from-blue-300 to-blue-700" },
  },
  {
    id: "about",
    label: "About",
    action: "open-app",
    target: "about",
    windowKind: "about",
    pinned: true,
    icon: { alt: "About app icon", fallback: "i", backgroundClass: "from-zinc-200 to-zinc-600" },
  },
  {
    id: "contact",
    label: "Contact",
    action: "open-app",
    target: "contact",
    windowKind: "contact",
    pinned: true,
    icon: { alt: "Contact app icon", fallback: "✉", backgroundClass: "from-rose-300 to-rose-700" },
  },
  {
    id: "archive",
    label: "Archive",
    action: "open-folder",
    target: "archive",
    windowKind: "archive",
    icon: { alt: "Archive app icon", fallback: "□", backgroundClass: "from-stone-300 to-stone-700" },
  },
];
