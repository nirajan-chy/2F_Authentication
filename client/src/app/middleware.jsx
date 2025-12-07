import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("auth-token");
  const url = req.nextUrl.clone();

  // Protect dashboard routes
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Redirect to dashboard if already logged in and trying to access auth pages
  if (token && (req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register"))) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};