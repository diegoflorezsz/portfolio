import { readdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const galleryImagesDirectory = path.join(process.cwd(), "projects", "gallery", "images");

export async function GET() {
  try {
    const files = await readdir(galleryImagesDirectory, { withFileTypes: true });
    const images = files
      .filter((file) => file.isFile() && imageExtensions.has(path.extname(file.name).toLowerCase()))
      .map((file) => file.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
      .map((filename, index) => ({
        src: `/api/gallery-image?file=${encodeURIComponent(filename)}`,
        alt: `Gallery image ${String(index + 1).padStart(2, "0")}`,
      }));

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
