import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    const uploadedUrls: string[] = [];
    const errors: string[] = [];

    for (const file of files) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        errors.push(`Invalid file type for ${file.name}: ${file.type}`);
        continue;
      }

      // Validate file size (2MB max for base64)
      if (file.size > 2 * 1024 * 1024) {
        errors.push(`File too large: ${file.name}. Max 2MB for direct upload.`);
        continue;
      }

      // Convert to base64 data URL
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString("base64");
      const mimeType = file.type;
      const dataUrl = `data:${mimeType};base64,${base64}`;

      uploadedUrls.push(dataUrl);
    }

    if (uploadedUrls.length === 0) {
      return NextResponse.json(
        { error: errors.join("; ") },
        { status: 500 }
      );
    }

    return NextResponse.json({
      urls: uploadedUrls,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err: any) {
    console.error("Upload API error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
