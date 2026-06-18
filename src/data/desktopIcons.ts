import type { DesktopIcon } from "@/types/portfolio";
import { projects } from "./projects";

export const desktopIcons: DesktopIcon[] = [
  {
    id: "project-identity-system",
    label: projects[0].title,
    type: "project",
    icon: projects[0].thumbnail,
    target: projects[0].slug,
    position: {
      desktop: { x: "8%", y: "17%" },
      tablet: { x: "7%", y: "16%" },
      mobile: { order: 1 },
    },
    presentation: { width: "clamp(9rem, 13vw, 13rem)", aspectRatio: "4 / 5", rotation: "-1.2deg" },
  },
  {
    id: "project-editorial-campaign",
    label: projects[1].title,
    type: "project",
    icon: projects[1].thumbnail,
    target: projects[1].slug,
    position: {
      desktop: { x: "31%", y: "8%" },
      tablet: { x: "37%", y: "11%" },
      mobile: { order: 2 },
    },
    presentation: { width: "clamp(11rem, 17vw, 17rem)", aspectRatio: "3 / 2", rotation: "0.6deg" },
  },
  {
    id: "project-motion-toolkit",
    label: projects[2].title,
    type: "project",
    icon: projects[2].thumbnail,
    target: projects[2].slug,
    position: {
      desktop: { x: "70%", y: "20%" },
      tablet: { x: "68%", y: "29%" },
      mobile: { order: 3 },
    },
    presentation: { width: "clamp(9rem, 14vw, 14rem)", aspectRatio: "1 / 1", rotation: "-0.4deg" },
  },
  {
    id: "project-digital-archive",
    label: projects[3].title,
    type: "project",
    icon: projects[3].thumbnail,
    target: projects[3].slug,
    position: {
      desktop: { x: "20%", y: "61%" },
      tablet: { x: "14%", y: "59%" },
      mobile: { order: 4 },
    },
    presentation: { width: "clamp(12rem, 18vw, 18rem)", aspectRatio: "16 / 10", rotation: "0.8deg" },
  },
];
