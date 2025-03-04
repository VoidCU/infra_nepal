import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const {
      firstName,
      middleName,
      lastName,
      dob,
      email,
      phone,
      citizenshipNo,
      citizenshipIssueDate,
      fatherName,
      grandfatherName,
      spouseName,
      province,
      district,
      municipality,
      wardNo,
      temporaryAddress,
      occupation,
      educationQualification,
      workExperience,
      dematId,
      numberOfShares
    } = await request.json();

    // Check if user exists based on email
    let user = await prisma.user.findUnique({
      where: { email }
    });

    // Check for any active application for this user
    if (user) {
      const activeApplication = await prisma.application.findFirst({
        where: {
          userId: user.id,
          status: { in: ["applied", "processed", "pending"] }
        }
      });
      if (activeApplication) {
        return NextResponse.json(
          { error: "An active application exists. Please log in and continue from your dashboard." },
          { status: 400 }
        );
      }
    } else {
      // Create new user with default password "password" (hash it before storing)
      const hashedPassword = await bcrypt.hash("password", 10);
      user = await prisma.user.create({
        data: {
          username: email,
          email,
          password: hashedPassword,
          role: "user"
        }
      });
    }

    // Create the new application record with status "applied"
    const application = await prisma.application.create({
      data: {
        applicationId: `APP-${Date.now()}`, // example unique ID generation
        details: {
          // Store only the first part of the details in JSON
          firstName,
          middleName,
          lastName,
          dob,
          email,
          phone,
          citizenshipNo,
          citizenshipIssueDate,
          fatherName,
          grandfatherName,
          spouseName,
          province,
          district,
          municipality,
          wardNo,
          temporaryAddress,
          occupation,
          educationQualification,
          workExperience,
          dematId,
          numberOfShares
        },
        status: "applied",
        user: { connect: { id: user.id } }
      }
    });

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
