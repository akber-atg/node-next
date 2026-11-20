import { NextResponse } from "next/server";
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export async function GET() {
  const uploadsFolder = path.join(process.cwd(), "uploads");

  try {
    const files = await readdir(uploadsFolder);

    const images = await Promise.all(
      files
        .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map(async (filename) => {
          const filePath = path.join(uploadsFolder, filename);
          const metadata = await sharp(filePath).metadata();

          return {
            src: `/api/images/${encodeURIComponent(filename)}`,
            width: metadata.width,
            height: metadata.height,
            alt: filename,
          };
        })
    );

    return NextResponse.json(images);
  } catch (error) {
    console.error("Error listing images:", error);
    return NextResponse.json(
      { error: "Could not list images" },
      { status: 500 }
    );
  }
}