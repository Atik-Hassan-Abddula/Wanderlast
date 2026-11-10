
import { NextResponse } from "next/server";

export function proxy(request) {
  // Better Auth session cookie
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  // User is not logged in
  if (!sessionToken) {
    const signInUrl = new URL("/loging", request.url);

    signInUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-destination/:path*",
    "/my-bookings/:path*",
  ],
};
