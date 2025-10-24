"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Dumbbell,
  Users,
  CreditCard,
  Calendar,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Inicio", href: "/dashboard", icon: Dumbbell },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Clientes", href: "/dashboard/clients", icon: Users },
  { name: "Pagos", href: "/dashboard/payments", icon: CreditCard },
  { name: "Suscripciones", href: "/dashboard/subscriptions", icon: Calendar },
  { name: "Recordatorios", href: "/dashboard/subscriptions/reminders", icon: Bell },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-white">
      <div className="px-6 py-4 border-b text-xl font-bold tracking-tight">
        Gym Manager
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
        <Button variant="ghost" className="w-full flex items-center gap-2 justify-start text-gray-700">
          <LogOut className="h-4 w-4" />
          Cerrar sesion
        </Button>
      </div>
    </aside>
  );
}
