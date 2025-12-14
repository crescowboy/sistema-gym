import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get("isAuthenticated");

  if (!sessionCookie || sessionCookie.value !== "true") {
    return NextResponse.json(
      { message: "No autenticado" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { message: "Autenticado" },
    { status: 200 }
  );
}
