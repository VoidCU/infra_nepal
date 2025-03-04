// /api/admin/stats/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const totalUsers = await prisma.user.count();
    const totalApplications = await prisma.application.count();
    const firstStepApplications = await prisma.application.count({
      where: { status: "applied" },
    });
    const secondStepApplications = await prisma.application.count({
      where: { status: "pending" },
    });
    const verifiedApplications = await prisma.application.count({
      where: { status: "verified" },
    });

    const stats = {
      users: totalUsers,
      applications: totalApplications,
      applied: firstStepApplications,
      pending: secondStepApplications,
      verified: verifiedApplications,
    };

    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
