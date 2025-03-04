import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin and /dashboard routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    try {
      // jwtVerify from jose returns a promise. Make sure to encode the secret with TextEncoder.
      await jwtVerify(token, new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET));
      return NextResponse.next();
    } catch (err) {
      console.error("JWT verification error:", err);
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
