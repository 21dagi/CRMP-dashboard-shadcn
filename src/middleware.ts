import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================================
// EDGE MIDDLEWARE — runs server-side before page renders.
// Reads user_role and access_token cookies synced by
// AuthInitializer. Protects all secured routes.
// ============================================================

export function middleware(request: NextRequest) {
  const roleCookie = request.cookies.get("user_role")?.value;
  const tokenCookie = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  // ── 1. Block unauthenticated access to protected routes ──
  const isProtected =
    pathname.startsWith("/admin") || pathname.startsWith("/dashboard") || pathname.startsWith("/pi");

  if (isProtected && (!tokenCookie || !roleCookie)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── 2. PI must not access /admin ─────────────────────────
  if (pathname.startsWith("/admin") && roleCookie === "PI") {
    return NextResponse.redirect(new URL("/pi", request.url));
  }

  // ── 3. Non-PI must not access /dashboard or /pi ──────────
  const isPiOnly = pathname.startsWith("/dashboard") || pathname.startsWith("/pi");
  if (isPiOnly && roleCookie !== "PI") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // ── 4. Logged-in users skip login/signup/landing pages ───
  const isAuthPage =
    pathname === "/login" || pathname === "/signup" || pathname === "/";

  if (isAuthPage && tokenCookie && roleCookie) {
    const dest = roleCookie === "PI" ? "/pi" : "/admin";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/dashboard/:path*", "/pi/:path*", "/login", "/signup"],
};
