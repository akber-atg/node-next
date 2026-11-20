import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // Build the physical path to the image
  const filePath = path.join(process.cwd(), "uploads", filename);

  try {
    // Read the actual image file
    const image = await readFile(filePath);

    // Determine the image's content type
    const extension = path.extname(filename).toLowerCase();

    const contentTypes: Record<string, string> = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".webp": "image/webp",
    };

    return new NextResponse(image, {
      headers: {
        "Content-Type": contentTypes[extension] ?? "application/octet-stream",
      },
    });
  } catch (error) {
    console.error("Error reading image:", error);
    return new NextResponse("Image not found", { status: 404 });
  }
}