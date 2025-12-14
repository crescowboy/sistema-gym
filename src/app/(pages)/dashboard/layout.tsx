'use client'

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";


export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticación haciendo una request a una ruta protegida
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          router.push("/login");
          return;
        }

        setIsAuthed(true);
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (!isAuthed) {
    return null;
  }

  return (
      <div className="flex w-full bg-gray-100">
        <Sidebar />

        <div className="flex flex-col w-full">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
  );
}
