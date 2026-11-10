
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateToken } from "@/lib/jwt";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Please login first" },
        { status: 401 }
      );
    }

    if (session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Admin access denied" },
        { status: 403 }
      );
    }

    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
      return NextResponse.json(
        { success: false, message: "BACKEND_URL is missing" },
        { status: 500 }
      );
    }

    const token = generateToken(session.user);

    const response = await fetch(
      `${backendUrl}/admin/bookings`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const responseText = await response.text();

    let data;

    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid backend response" },
        { status: 502 }
      );
    }

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Admin bookings error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
