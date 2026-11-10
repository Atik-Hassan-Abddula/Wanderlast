
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateToken } from "@/lib/jwt";

export async function GET(request) {
  try {
    // 1. Get logged-in user's session
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // 2. Check authentication
    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first",
        },
        { status: 401 }
      );
    }

    // 3. Check admin role
    if (session.user.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied. Admin only.",
        },
        { status: 403 }
      );
    }

    // 4. Get backend URL
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "BACKEND_URL is missing",
        },
        { status: 500 }
      );
    }

    // 5. Generate JWT token
    const token = generateToken(session.user);

    // 6. Fetch bookings from backend
    const response = await fetch(`${backendUrl}/admin/bookings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    // 7. Read backend response
    const responseText = await response.text();

    let data;

    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid backend response",
        },
        { status: 502 }
      );
    }

    // 8. Return backend response
    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    // Allow Next.js to handle prerender interruption
    if (error?.digest === "NEXT_PRERENDER_INTERRUPTED") {
      throw error;
    }

    console.error("Admin Bookings API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch bookings",
      },
      { status: 500 }
    );
  }
}
