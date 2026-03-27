import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Extracting dummy session cookie, e.g., 'user_role' = 'RAD' | 'PI' | etc.
  // In a real app, this would be a JWT or an actual session token verified against a backend.
  const roleCookie = request.cookies.get("user_role")?.value || "RAD"; // Fallback to "RAD" for demonstration

  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    // If the user is a PI, they shouldn't be in the admin section
    if (roleCookie === "PI") {
      return NextResponse.redirect(new URL("/pi", request.url));
    }
  }

  // Protect /pi routes
  if (pathname.startsWith("/pi")) {
    // If the user isn't a PI, send them to the admin dashboard
    // Note: You might want to allow SuperAdmins to view PI dashboard in the future
    if (roleCookie !== "PI") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

// Ensure the middleware only runs for paths under /admin and /pi
export const config = {
  matcher: ["/admin/:path*", "/pi/:path*"],
};
