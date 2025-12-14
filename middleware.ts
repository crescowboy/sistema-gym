import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Rutas que requieren autenticación
  const protectedRoutes = ["/dashboard"];

  // Verificar si es una ruta protegida
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Obtener la cookie de sesión
  const sessionCookie = request.cookies.get("isAuthenticated");

  if (isProtectedRoute && !sessionCookie) {
    // No tiene sesión e intenta acceder a ruta protegida
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.headers.set("x-middleware-debug", `blocked-${pathname}`);
    return response;
  }

  if ((pathname === "/login" || pathname === "/register") && sessionCookie) {
    // Ya tiene sesión e intenta acceder al login/register
    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    response.headers.set("x-middleware-debug", `redirected-${pathname}`);
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("x-middleware-debug", `allowed-${pathname}`);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)  
     * - favicon.ico (favicon file)
     * - public files
     * - api routes
     */
    "/((?!api|_next|favicon.ico|public|images).*)",
  ],
};
