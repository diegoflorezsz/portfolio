export type IconSource = {
  src?: string;
  alt: string;
  fallback: string;
  backgroundClass?: string;
};

export type ResponsivePosition = {
  desktop: { x: string; y: string };
  tablet: { x: string; y: string };
  mobile: { order: number };
};

export type Project = {
  slug: string;
  title: string;
  shortTitle?: string;
  year: number | string;
  category: string;
  tags: string[];
  summary: string;
  thumbnail: IconSource;
  featured?: boolean;
};

export type DockApp = {
  id: string;
  label: string;
  icon: IconSource;
  action: "open-app" | "open-folder" | "external" | "mailto";
  target: string;
  windowKind: "about" | "contact" | "work" | "archive";
  pinned?: boolean;
};

export type DesktopIcon = {
  id: string;
  label: string;
  type: "project" | "folder" | "app" | "external";
  icon: IconSource;
  position: ResponsivePosition;
  presentation: {
    width: string;
    aspectRatio: string;
    rotation?: string;
  };
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
