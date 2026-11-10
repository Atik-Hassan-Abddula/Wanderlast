
import jwt from "jsonwebtoken";

export function generateToken(user) {
  if (!user?.id) {
    throw new Error("User ID is required");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role || "user",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return null;
  }
}
