import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    slug: "identity-system",
    title: "Identity System",
    year: 2026,
    category: "Brand",
    tags: ["Identity", "Art Direction", "Guidelines"],
    summary: "A placeholder brand system project for the desktop portfolio foundation.",
    featured: true,
    thumbnail: { alt: "Abstract identity system thumbnail", fallback: "IS", backgroundClass: "from-fuchsia-500 to-orange-400" },
  },
  {
    slug: "editorial-campaign",
    title: "Editorial Campaign",
    year: 2025,
    category: "Campaign",
    tags: ["Editorial", "Photography", "Layout"],
    summary: "A placeholder editorial campaign entry ready to be replaced with real content.",
    thumbnail: { alt: "Abstract editorial campaign thumbnail", fallback: "EC", backgroundClass: "from-cyan-400 to-blue-700" },
  },
  {
    slug: "motion-toolkit",
    title: "Motion Toolkit",
    year: 2025,
    category: "Motion",
    tags: ["Motion", "Toolkit", "Launch"],
    summary: "A placeholder motion project for future case-study windows.",
    thumbnail: { alt: "Abstract motion toolkit thumbnail", fallback: "MT", backgroundClass: "from-lime-300 to-emerald-700" },
  },
  {
    slug: "digital-archive",
    title: "Digital Archive",
    year: 2024,
    category: "Web",
    tags: ["Web", "Archive", "Interaction"],
    summary: "A placeholder web archive project represented as a desktop file.",
    thumbnail: { alt: "Abstract digital archive thumbnail", fallback: "DA", backgroundClass: "from-violet-400 to-slate-900" },
  },
];
