import { readdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const projectsDirectory = path.join(process.cwd(), "projects");

function getSafeSlug(value: string | null) {
  if (!value || !/^[a-z0-9-]+$/i.test(value)) {
    return null;
  }

  return value;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = getSafeSlug(url.searchParams.get("slug"));

  if (!slug) {
    return NextResponse.json({ images: [] }, { status: 400 });
  }

  try {
    const imagesDirectory = path.join(projectsDirectory, slug, "images");
    const files = await readdir(imagesDirectory, { withFileTypes: true });
    const images = files
      .filter((file) => file.isFile() && imageExtensions.has(path.extname(file.name).toLowerCase()))
      .map((file) => file.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
      .map((filename, index) => ({
        src: `/api/project-image?slug=${encodeURIComponent(slug)}&file=${encodeURIComponent(filename)}`,
        alt: `${slug} image ${String(index + 1).padStart(2, "0")}`,
      }));

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}