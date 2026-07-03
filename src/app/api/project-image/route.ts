import { readFile } from "node:fs/promises";
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
  const requestedFile = url.searchParams.get("file");

  if (!slug || !requestedFile) {
    return new NextResponse("Missing image file", { status: 400 });
  }

  const filename = path.basename(requestedFile);
  const extension = path.extname(filename).toLowerCase();
  const contentType = contentTypes[extension];

  if (filename !== requestedFile || !contentType) {
    return new NextResponse("Invalid image file", { status: 400 });
  }

  try {
    const image = await readFile(path.join(projectsDirectory, slug, "images", filename));
    return new NextResponse(new Uint8Array(image), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new NextResponse("Image not found", { status: 404 });
  }
}