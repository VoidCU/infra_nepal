import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

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
      country,
      citizenshipNo,
      citizenshipIssueDate,
      passportNumber,
      NRNNumber,
      fatherName,
      grandfatherName,
      spouseName,
      address,
      occupation,
      educationQualification,
      workExperience,
      numberOfShares,
    } = await request.json();

    // Check if user exists based on email
    let user = await prisma.user.findUnique({
      where: { email },
    });

    let newPassword = "";
    if (user) {
      const activeApplication = await prisma.application.findFirst({
        where: {
          userId: user.id,
          status: { in: ["applied", "processed", "pending"] },
        },
      });
      if (activeApplication) {
        return NextResponse.json(
          {
            error:
              "An active application exists. Please log in and continue from your dashboard.",
          },
          { status: 400 }
        );
      }
    } else {
      // Create new user with a random password
      newPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user = await prisma.user.create({
        data: {
          username: email,
          email,
          password: hashedPassword,
          role: "user",
        },
      });

      // Send the new password to the user's email using nodemailer.
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER, // your email address
          pass: process.env.EMAIL_PASS, // your email password or app password
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Account Password",
        text: `Welcome! Your new password is: "${newPassword}". Please log in and change your password immediately.`,
      };

      await transporter.sendMail(mailOptions);
    }

    // Create the new application record with status "applied"
    const application = await prisma.application.create({
      data: {
        applicationId: `APP-${Date.now()}`,
        details: {
          firstName,
          middleName,
          lastName,
          dob,
          email,
          phone,
          country,
          citizenshipNo,
          citizenshipIssueDate,
          passportNumber,
          NRNNumber,
          fatherName,
          grandfatherName,
          spouseName,
          address,
          occupation,
          educationQualification,
          workExperience,
          numberOfShares,
        },
        status: "applied",
        user: { connect: { id: user.id } },
      },
    });

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
