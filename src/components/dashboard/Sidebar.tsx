"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Dumbbell,
  Users,
  CreditCard,
  Calendar,
  Bell,
  Settings,
  LogOut,
  BarChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { name: "Inicio", href: "/dashboard", icon: Dumbbell },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Clientes", href: "/dashboard/clients", icon: Users },
  { name: "Pagos", href: "/dashboard/payments", icon: CreditCard },
  { name: "Suscripciones", href: "/dashboard/subscriptions", icon: Calendar },
  { name: "Horarios", href: "/dashboard/schedule", icon: Calendar },
  { name: "Entrenadores", href: "/dashboard/trainers", icon: Users },
  { name: "Reportes", href: "/dashboard/reports", icon: BarChart },
  { name: "Recordatorios", href: "/dashboard/subscriptions/reminders", icon: Bell },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-white">
      <div className="p-4 border-b flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">Admin User</p>
          <p className="text-xs text-gray-500">admin@gimnasio.com</p>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100",
                isActive ? "bg-gray-100 text-primary" : "text-gray-700"
              )}
            >
              <Icon className="h-4 w-4"/>
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t">
        <Button variant="ghost" className="w-full flex items-center gap-2 justify-start text-gray-700" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Cerrar sesion
        </Button>
      </div>
    </aside>
  );
}
