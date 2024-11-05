import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { isAuthenticated } = getKindeServerSession();

  // Redirect unauthenticated users to login
  if (! await isAuthenticated()) {
    return NextResponse.redirect(
      new URL("/api/auth/login?post_login_redirect_url=/dashboard", request.url)
    );
  }

  // Allow authenticated users to access the requested route
  return NextResponse.next();
}

// Correct matcher with leading slash
export const config = {
  matcher: ["/dashboard"],
};
