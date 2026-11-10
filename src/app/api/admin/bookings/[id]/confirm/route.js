import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateToken } from "@/lib/jwt";

export async function PATCH(request, { params }) {
  try {
    // 1. Check logged-in user
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

    // 2. Get booking ID
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking ID is required",
        },
        { status: 400 }
      );
    }

    // 3. Check backend URL
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

    // 4. Get trusted user role from Better Auth database
    // Do not trust a role sent by the browser.
    const token = generateToken(session.user);

    // 5. Send request to backend
    const response = await fetch(
      `${backendUrl}/bookings/${encodeURIComponent(id)}/confirm`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const responseText = await response.text();

    let data;

    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      console.error("Invalid backend response:", responseText);

      return NextResponse.json(
        {
          success: false,
          message: "Backend returned an invalid response",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Confirm Booking Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to confirm booking",
      },
      { status: 500 }
    );
  }
}