
import { NextResponse, connection } from "next/server";

import { auth } from "@/lib/auth";
import { generateToken } from "@/lib/jwt";

export async function GET(request) {
  // Wait for an incoming request before using request-specific data
  await connection();

  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = generateToken(session.user);

    return NextResponse.json({
      success: true,
      message: "JWT generated successfully",
      token,
    });
  } catch (error) {
    console.error("JWT Error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
