import type { MaybeLocalizedText, MaybeLocalizedTextArray } from "@/i18n/types";

export type IconSource = {
  src?: string;
  alt: string;
  fallback: string;
  backgroundClass?: string;
};

export type DesktopArtworkLayout = {
  x: string;
  y: string;
  width: number;
  height: number;
  rotation: number;
};

export type DesktopDragPosition = {
  x: number;
  y: number;
};

export type ResponsivePosition = {
  desktop: DesktopArtworkLayout;
  tablet: DesktopArtworkLayout;
  mobile: { order: number };
};

export type Project = {
  slug: string;
  title: string;
  shortTitle?: string;
  year: number | string;
  category: MaybeLocalizedText;
  tags: string[];
  summary: MaybeLocalizedText;
  thumbnail: IconSource;
  featured?: boolean;
  description?: MaybeLocalizedTextArray;
  details?: {
    type: MaybeLocalizedText;
    role?: string;
    tools: MaybeLocalizedText;
  };
  editorialLayout?: ProjectEditorialBlock[];
  editorialNote?: MaybeLocalizedText;
};

export type ProjectEditorialImage = {
  src: string;
  alt: string;
};

export type ProjectEditorialBlock = {
  kind: "single" | "banner" | "pair" | "triple" | "mosaic" | "custom-grid" | "gallery-grid" | "gallery-layout";
  images: ProjectEditorialImage[];
};

export type DockApp = {
  id: string;
  label: string;
  tooltipLabel?: MaybeLocalizedText;
  icon: IconSource;
  group?: "design" | "system" | "social" | "trash";
  action: "open-app" | "open-folder" | "external" | "mailto" | "toggle-language";
  target: string;
  windowKind?: import("./window").WindowKind;
  pinned?: boolean;
};

export type DesktopIcon = {
  id: string;
  title: string;
  label: string;
  type: "project" | "folder" | "app" | "external";
  icon: IconSource;
  image?: {
    src: string;
    alt: string;
  } | null;
  position: ResponsivePosition;
  target: string;
};

export type Folder = {
  id: string;
  label: string;
  description: string;
  icon: IconSource;
  itemIds: string[];
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: IconSource;
};

