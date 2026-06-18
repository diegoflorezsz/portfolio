import type { Project } from "./portfolio";

export type WindowKind = "about" | "contact" | "work" | "archive" | "project";

export type WindowStatus = "open" | "minimizing" | "minimized" | "maximized" | "closing";

export type WindowSize = {
  width: number;
  height: number;
};

export type WindowPosition = {
  x: number;
  y: number;
};

export type WindowPayload = {
  projectSlug?: Project["slug"];
};

export type WindowInstance = {
  id: string;
  appId: WindowKind;
  title: string;
  status: WindowStatus;
  zIndex: number;
  position: WindowPosition;
  size: WindowSize;
  payload?: WindowPayload;
};

export type OpenWindowInput = {
  appId: WindowKind;
  title: string;
  payload?: WindowPayload;
};
