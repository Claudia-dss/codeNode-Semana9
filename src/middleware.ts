import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // better-auth guarda la sesión en esta cookie
  const session = request.cookies.get("better-auth.session_token");

  if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};