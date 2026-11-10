
import { NextResponse, connection } from "next/server";
import { auth } from "@/lib/auth";
import { generateToken } from "@/lib/jwt";

// DELETE: Permanently delete logged-in user's booking
export async function DELETE(request, { params }) {
  await connection();

  try {
    // 1. Check Better Auth session
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized access. Please login first.",
        },
        { status: 401 }
      );
    }

    // 2. Get booking ID from URL
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
      console.error("BACKEND_URL is missing");

      return NextResponse.json(
        {
          success: false,
          message: "Backend configuration error",
        },
        { status: 500 }
      );
    }

    // 4. Generate JWT token
    const token = generateToken(session.user);

    // 5. Send DELETE request to Express backend
    const response = await fetch(
      `${backendUrl}/bookings/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    // 6. Get backend response
    const data = await response.json();

    // 7. Return backend response
    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Delete booking API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete booking",
      },
      { status: 500 }
    );
  }
}
