


import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    || "admin@visioad.com";
const ADMIN_HASH     = process.env.ADMIN_PASSWORD_HASH || "";
const JWT_SECRET     = process.env.JWT_SECRET     || "visioad_dev_secret";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = ADMIN_HASH
    ? await bcrypt.compare(password, ADMIN_HASH)
    : password === "admin123";

  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, { expiresIn: "7d" });

  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}