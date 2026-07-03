import type { DesktopIcon, DesktopArtworkLayout, ProjectEditorialImage } from "@/types/portfolio";
import { projects } from "./projects";

const desktopComposition: DesktopArtworkLayout[] = [
  { x: "31%", y: "31%", width: 67, height: 92, rotation: 0 },
  { x: "35%", y: "49%", width: 117, height: 74, rotation: 0 },
  { x: "41%", y: "26%", width: 95, height: 95, rotation: 0 },
  { x: "47%", y: "57%", width: 61, height: 81, rotation: 0 },
  { x: "52%", y: "32%", width: 136, height: 86, rotation: 0 },
  { x: "59%", y: "47%", width: 88, height: 112, rotation: 0 },
  { x: "64%", y: "35%", width: 89, height: 67, rotation: 0 },
  { x: "33%", y: "61%", width: 66, height: 66, rotation: 0 },
  { x: "53%", y: "61%", width: 79, height: 59, rotation: 0 },
  { x: "45%", y: "40%", width: 72, height: 103, rotation: 0 },
];


const tabletComposition: DesktopArtworkLayout[] = [
  { x: "28%", y: "31%", width: 59, height: 81, rotation: 0 },
  { x: "35%", y: "51%", width: 95, height: 61, rotation: 0 },
  { x: "41%", y: "27%", width: 81, height: 81, rotation: 0 },
  { x: "48%", y: "58%", width: 51, height: 68, rotation: 0 },
  { x: "52%", y: "32%", width: 112, height: 71, rotation: 0 },
  { x: "61%", y: "49%", width: 73, height: 94, rotation: 0 },
  { x: "66%", y: "36%", width: 73, height: 55, rotation: 0 },
  { x: "30%", y: "62%", width: 55, height: 55, rotation: 0 },
  { x: "54%", y: "64%", width: 65, height: 49, rotation: 0 },
  { x: "45%", y: "42%", width: 61, height: 88, rotation: 0 },
];


function getDesktopLayout(index: number): DesktopArtworkLayout {
  return desktopComposition[index] ?? desktopComposition[index % desktopComposition.length];
}

function getTabletLayout(index: number): DesktopArtworkLayout {
  return tabletComposition[index] ?? tabletComposition[index % tabletComposition.length];
}

function getProjectDesktopLayout(project: (typeof projects)[number], index: number): DesktopArtworkLayout {
  if (project.slug === "graphiczsz") {
    return { x: "43%", y: "63%", width: 142, height: 72, rotation: 0 };
  }

  return getDesktopLayout(index);
}

function getProjectTabletLayout(project: (typeof projects)[number], index: number): DesktopArtworkLayout {
  if (project.slug === "graphiczsz") {
    return { x: "42%", y: "64%", width: 118, height: 60, rotation: 0 };
  }

  return getTabletLayout(index);
}

function getProjectHeroImage(project: (typeof projects)[number]): ProjectEditorialImage | null {
  const heroImage = project.editorialLayout
    ?.flatMap((layoutBlock) => layoutBlock.images)
    .find((image) => /\/single-hero\.[^/?]+/i.test(image.src));

  return heroImage ?? project.editorialLayout?.[0]?.images[0] ?? null;
}

export const desktopIcons: DesktopIcon[] = projects
  .filter((project) => project.slug !== "gallery")
  .map((project, index) => ({
    id: `project-${project.slug}`,
    title: project.shortTitle ?? project.title,
    label: project.shortTitle ?? project.title,
    type: "project",
    icon: project.thumbnail,
    image: getProjectHeroImage(project),
    target: project.slug,
    position: {
      desktop: getProjectDesktopLayout(project, index),
      tablet: getProjectTabletLayout(project, index),
      mobile: { order: index + 1 },
    },
  }));