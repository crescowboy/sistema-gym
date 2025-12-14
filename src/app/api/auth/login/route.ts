import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const response = NextResponse.json(
      { message: "Login successful", userId: user._id },
      { status: 200 }
    );

    // Guardar cookie de sesión
    response.cookies.set("isAuthenticated", "true", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    console.error("Login error:", error);
    let errorMessage = "Internal server error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { message: errorMessage, error: errorMessage },
      { status: 500 }
    );
  }
}
