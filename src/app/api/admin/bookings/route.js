
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateToken } from "@/lib/jwt";

export async function GET(request) {
  try {
    // 1. Get logged-in user session
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first",
        },
        { status: 401 }
      );
    }

    // 2. Check admin role
    if (session.user.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Admin access denied",
        },
        { status: 403 }
      );
    }

    // 3. Get backend URL
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

    // 4. Generate JWT token
    const token = generateToken(session.user);

    // 5. Fetch bookings from backend
    const response = await fetch(
      `${backendUrl.replace(/\/+$/, "")}/admin/bookings`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    // 6. Read backend response
    const responseText = await response.text();

    let data;

    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      console.error("Invalid backend response:", responseText);

      return NextResponse.json(
        {
          success: false,
          message: "Invalid backend response",
        },
        { status: 502 }
      );
    }

    // 7. Return response
    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    // Allow Next.js internal prerender signal to propagate
    if (error?.digest === "NEXT_PRERENDER_INTERRUPTED") {
      throw error;
    }

    console.error("Admin bookings error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch bookings",
      },
      { status: 500 }
    );
  }
}
