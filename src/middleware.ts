import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionRes = await fetch(
    new URL("/api/auth/get-session", request.url),
    { headers: request.headers }
  );
  const session = await sessionRes.json();

  if (!session?.user && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};