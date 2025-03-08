import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import formidable from "formidable";
import path from "path";
import { PassThrough } from "stream";
import jwt from "jsonwebtoken";
import { IncomingMessage } from "http";
/* eslint-disable @typescript-eslint/no-explicit-any */
// Disable Next.js built-in body parser for multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

// Convert Next.js Request to Node.js stream using PassThrough
async function requestToStream(req: Request): Promise<PassThrough> {
  const buffer = Buffer.from(await req.arrayBuffer());
  const stream = new PassThrough();
  stream.end(buffer);
  // Convert headers to a plain object and attach them to the stream
  const headersObj: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headersObj[key] = value;
  });
  (stream as any).headers = headersObj;
  return stream;
}

export async function PUT(request: Request) {
  try {
    const stream = await requestToStream(request);
    const form = formidable({
      multiples: false,
    });

    // Wrap form.parse in a Promise
    const parseForm = (): Promise<{ fields: any; files: any }> => {
      return new Promise((resolve, reject) => {
        // Cast the PassThrough stream as an IncomingMessage for formidable
        const reqForFormidable = stream as unknown as IncomingMessage;
        form.parse(reqForFormidable, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      });
    };

    const { fields, files } = await parseForm();

    // Normalize fields: if a field value is an array, pick its first element.
    const normalizedFields: Record<string, any> = {};
    for (const key in fields) {
      const value = fields[key];
      normalizedFields[key] = Array.isArray(value) ? value[0] : value;
    }

    // Process file uploads and build file paths relative to public folder
    const filePaths: Record<string, string> = {};
    for (const fieldName in files) {
      const fileArray = files[fieldName] as formidable.File[];
      for (const file of fileArray) {
        const filePath = file.filepath;
        if (typeof filePath === "string") {
          const relativePath = `/userdocs/${path.basename(filePath)}`;
          filePaths[fieldName] = relativePath;
        }
      }
    }

    // Retrieve and verify the token from cookies
    const cookieHeader = request.headers.get("cookie");
    const cookies = cookieHeader?.split(";").reduce((acc, cookie) => {
      const [name, ...rest] = cookie.split("=");
      acc[name.trim()] = rest.join("=").trim();
      return acc;
    }, {} as Record<string, string>) || {};
    const token = cookies["accessToken"];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    const userId = (decoded as { id: number }).id;

    // Find the user's processed application or more_details application
    const application = await prisma.application.findFirst({
      where: {
        userId,
        OR: [{ status: "processed" }, { status: "more_details" }],
      },
    });
    if (!application) {
      return NextResponse.json(
        { error: "Processed application not found" },
        { status: 404 }
      );
    }

    // Define the template with all keys and default empty strings
    const template = {
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      email: "",
      phone: "",
      citizenshipNo: "",
      citizenshipIssueDate: "",
      fatherName: "",
      grandfatherName: "",
      spouseName: "",
      province: "",
      district: "",
      municipality: "",
      wardNo: "",
      temporaryAddress: "",
      occupation: "",
      educationQualification: "",
      workExperience: "",
      dematId: "",
      numberOfShares: "",
      paymentMethod: "",
      contactPersonName: "",
      relationship: "",
      contactPersonPhone: "",
      paymentReceipt: "",
      passportPhoto: "",
      citizenshipDoc: "",
      signImage: "",
    };

    // Get existing details from the processed application
    const existingDetails =
      typeof application.details === "string"
        ? JSON.parse(application.details)
        : application.details;

    // Merge new details
    const newDetails = {
      ...template,
      ...existingDetails,
      ...normalizedFields,
      ...filePaths,
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
