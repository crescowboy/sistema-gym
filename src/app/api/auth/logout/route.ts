import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logout successful" },
    { status: 200 }
  );

  // Eliminar la cookie de sesión
  response.cookies.set("isAuthenticated", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 0, // Elimina la cookie
    path: "/",
  });

  return response;
}
