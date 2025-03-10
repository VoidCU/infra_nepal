import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request) {
  try {
    // Retrieve the access token from cookies using the Next.js cookies helper
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token using the ACCESS_TOKEN_SECRET
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    const userId = (decoded as { id: number }).id;

    // Fetch applications for the logged-in user, ordered by creation date (newest first)
    const applications = await prisma.application.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, applications });
  } catch (error) {
    console.error("Error fetching user applications:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
