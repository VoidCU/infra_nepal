import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const ACCESS_TOKEN_EXPIRES_IN = "15m";

export async function POST(request: Request) {
  const { refreshToken } = await request.json();
  if (!refreshToken) {
    return NextResponse.json({ error: "Refresh token required" }, { status: 400 });
  }
  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { id: number; role: string };
    const newAccessToken = jwt.sign(
      { id: payload.id, role: payload.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    );
    return NextResponse.json({ token: newAccessToken });
  } catch (err) {
    return NextResponse.json({ error: `Invalid refresh token ${err}` }, { status: 401 });
  }
}
