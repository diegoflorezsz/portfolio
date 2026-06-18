import type { DesktopIcon } from "@/types/portfolio";
import { folders } from "./folders";
import { projects } from "./projects";

export const desktopIcons: DesktopIcon[] = [
  {
    id: "folder-selected-work",
    label: folders[0].label,
    type: "folder",
    icon: folders[0].icon,
    target: folders[0].id,
    position: { desktop: { x: "8%", y: "18%" }, tablet: { x: "8%", y: "18%" }, mobile: { order: 1 } },
  },
  {
    id: "folder-archive",
    label: folders[1].label,
    type: "folder",
    icon: folders[1].icon,
    target: folders[1].id,
    position: { desktop: { x: "84%", y: "20%" }, tablet: { x: "76%", y: "20%" }, mobile: { order: 2 } },
  },
  ...projects.map((project, index): DesktopIcon => ({
    id: `project-${project.slug}`,
    label: project.shortTitle ?? project.title,
    type: "project",
    icon: project.thumbnail,
    target: project.slug,
    position: {
      desktop: [
        { x: "18%", y: "58%" },
        { x: "35%", y: "24%" },
        { x: "68%", y: "34%" },
        { x: "76%", y: "62%" },
      ][index] ?? { x: "50%", y: "50%" },
      tablet: [
        { x: "12%", y: "52%" },
        { x: "34%", y: "26%" },
        { x: "62%", y: "34%" },
        { x: "72%", y: "58%" },
      ][index],
      mobile: { order: index + 3 },
    },
  })),
];
