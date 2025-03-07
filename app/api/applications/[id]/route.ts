// /api/applications/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params; // Await the params first
    const id = parseInt(resolvedParams.id, 10);

    const application = await prisma.application.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params; // Await params before using it
    const id = parseInt(resolvedParams.id, 10);
    const { details, status } = await request.json();

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: { details, status },
    });

    return NextResponse.json({ success: true, application: updatedApplication });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
