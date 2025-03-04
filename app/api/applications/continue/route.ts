// /api/applications/continue/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { PassThrough } from "stream";
import jwt from "jsonwebtoken";

// Disable Next.js built-in body parser for multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();
const uploadDir = path.join(process.cwd(), "public", "userdocs");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Convert Next.js Request to a Node.js stream using PassThrough
async function requestToStream(req: Request): Promise<PassThrough> {
  const buffer = Buffer.from(await req.arrayBuffer());
  const stream = new PassThrough();
  stream.end(buffer);
  // Convert headers to plain object and attach them to the stream
  const headersObj: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headersObj[key] = value;
  });
  (stream as any).headers = headersObj;
  return stream;
}

export async function PUT(request: Request) {
  try {
    // Convert request to stream and attach headers
    const stream = await requestToStream(request);

    const form = formidable({
      multiples: false,
      uploadDir,
      keepExtensions: true,
    });

    // Wrap form.parse in a Promise
    const parseForm = (): Promise<{ fields: any; files: any }> => {
      return new Promise((resolve, reject) => {
        form.parse(stream, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      });
    };

    const { fields, files } = await parseForm();

    // Normalize fields: if a field value is an array, take its first element
    const normalizedFields: Record<string, any> = {};
    for (const key in fields) {
      const value = fields[key];
      normalizedFields[key] = Array.isArray(value) ? value[0] : value;
    }

    // Build file paths relative to public folder for each uploaded file
    const filePaths: Record<string, string> = {};
    for (const fieldName in files) {
      const file = files[fieldName] as formidable.File;
      // Try file.filepath; if undefined, use file.path
      const filePath = file.filepath || file.path;
      if (typeof filePath === "string") {
        const relativePath = `/userdocs/${path.basename(filePath)}`;
        filePaths[fieldName] = relativePath;
      }
    }

    // Retrieve token from cookies and verify
    const token = request.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    const userId = (decoded as { id: number }).id;

    // Find the user's processed application
    const application = await prisma.application.findFirst({
      where: { userId, status: "processed" },
    });
    if (!application) {
      return NextResponse.json(
        { error: "Processed application not found" },
        { status: 404 }
      );
    }

    // Merge new fields with existing details
    const existingDetails =
      typeof application.details === "string"
        ? JSON.parse(application.details)
        : application.details;
    const newDetails = {
      ...existingDetails,
      ...normalizedFields,
      ...filePaths,
      // Ensure agreeToTerms is boolean
      agreeToTerms:
        normalizedFields.agreeToTerms === "true" ||
        normalizedFields.agreeToTerms === true,
    };

    // Update the application: merge details and update status to "pending"
    const updatedApplication = await prisma.application.update({
      where: { id: application.id },
      data: { details: newDetails, status: "pending" },
    });

    return NextResponse.json({ success: true, application: updatedApplication });
  } catch (error) {
    console.error("Error continuing application:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
