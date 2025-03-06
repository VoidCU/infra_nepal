// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin routes with an extra check on the user's role.
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
      );
      // Check if the role in the token payload is 'admin'
      if (payload.role !== "admin") {
        // Redirect non-admin users to the home page (or a "not authorized" page)
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    } catch (err) {
      console.error("JWT verification error:", err);
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // For other protected routes (e.g. /dashboard), only token check might be needed.
  if (pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    try {
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
      );
      return NextResponse.next();
    } catch (err) {
      console.error("JWT verification error:", err);
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/apply/complete")) {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    try {
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
      );
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
  matcher: ["/admin/:path*", "/dashboard/:path*", "/apply/complete/:path*"],
};
