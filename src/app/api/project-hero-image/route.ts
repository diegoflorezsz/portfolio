import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const contentTypes: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

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
    return new NextResponse("Missing project slug", { status: 400 });
  }

  try {
    const imagesDirectory = path.join(projectsDirectory, slug, "images");
    const files = await readdir(imagesDirectory, { withFileTypes: true });
    const hero = files
      .filter((file) => file.isFile())
      .map((file) => file.name)
      .find((filename) => path.parse(filename).name.toLowerCase() === "single-hero" && contentTypes[path.extname(filename).toLowerCase()]);

    if (!hero) {
      return new NextResponse("Hero image not found", { status: 404 });
    }

    const extension = path.extname(hero).toLowerCase();
    const image = await readFile(path.join(imagesDirectory, hero));

    return new NextResponse(new Uint8Array(image), {
      headers: {
        "Content-Type": contentTypes[extension],
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new NextResponse("Hero image not found", { status: 404 });
  }
}