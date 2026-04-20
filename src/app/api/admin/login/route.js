import { NextResponse } from "next/server";
import { rateLimit } from "../../../../lib/rateLimit";
import { sign } from "../../../../lib/auth";

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { message: "Too many attempts. Try later." },
        { status: 429 }
      );
    }

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const value = "admin";
      const signature = sign(value);

      const res = NextResponse.json({ success: true });

      res.cookies.set("admin-auth", value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      res.cookies.set("admin-sign", signature, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return res;
    }

    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}