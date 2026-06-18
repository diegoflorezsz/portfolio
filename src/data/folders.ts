import type { Folder } from "@/types/portfolio";

export const folders: Folder[] = [
  {
    id: "selected-work",
    label: "Selected Work",
    description: "Featured projects and case studies.",
    icon: { alt: "Selected work folder icon", fallback: "★", backgroundClass: "from-amber-300 to-yellow-600" },
    itemIds: ["identity-system", "editorial-campaign", "motion-toolkit"],
  },
  {
    id: "archive",
    label: "Archive",
    description: "Older experiments, sketches, and supporting work.",
    icon: { alt: "Archive folder icon", fallback: "⌘", backgroundClass: "from-slate-300 to-slate-600" },
    itemIds: ["digital-archive"],
  },
];
