
import { NextResponse, connection } from "next/server";
import { auth } from "@/lib/auth";
import { generateToken } from "@/lib/jwt";

// GET: Logged-in user's bookings
export async function GET(request) {
  await connection();

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

    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
      return NextResponse.json(
        { success: false, message: "BACKEND_URL is missing" },
        { status: 500 }
      );
    }

    const token = generateToken(session.user);

    const response = await fetch(`${backendUrl}/bookings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("GET bookings error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

// POST: Create a new booking
export async function POST(request) {
  await connection();

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

    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
      return NextResponse.json(
        { success: false, message: "BACKEND_URL is missing" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const token = generateToken(session.user);

    const response = await fetch(`${backendUrl}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("POST bookings error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to create booking" },
      { status: 500 }
    );
  }
}
