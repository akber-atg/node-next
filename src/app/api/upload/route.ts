
import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";

const uploadDirectory = path.join(process.cwd(), "uploads");

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");
        const category = formData.get("category");
        if (!(file instanceof File)) {
            return NextResponse.json(
                { error: "Please select an image." },
                { status: 400 }
            );
        }

        const allowedTypes: Record<string, string> = {
            "image/jpeg": ".jpg",
            "image/png": ".png",
            "image/webp": ".webp",
            "image/gif": ".gif",
        };

        const extension = allowedTypes[file.type];

        if (!extension) {
            return NextResponse.json(
                { error: "Only JPEG, PNG, WebP, and GIF images are allowed." },
                { status: 400 }
            );
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size === 0 || file.size > maxSize) {
            return NextResponse.json(
                { error: "Image must be smaller than 5 MB." },
                { status: 400 }
            );
        }

        await mkdir(uploadDirectory, { recursive: true });

        //const fileName = `${randomUUID()}${extension}`;
       // const fileName = `${randomUUID()}${extension}`;

        const now = new Date();

        const date = `${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(now.getFullYear()).slice(-2)}`;

        const time = `${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;

        const fileName = `${category}${date}${time}${extension}`;


        const filePath = path.join(uploadDirectory, fileName);

        const bytes = await file.arrayBuffer();
        await writeFile(filePath, Buffer.from(bytes));

        return NextResponse.json(
            {
                message: "Image uploaded successfully.",
                fileName,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Image upload failed:", error);

        return NextResponse.json(
            { error: "Unable to upload the image." },
            { status: 500 }
        );
    }
}
