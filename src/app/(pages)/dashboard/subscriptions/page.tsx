"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const subscriptions = [
  {
    id: 1,
    client: "Juan Perez",
    plan: "Mensual",
    startDate: "2025-10-01",
    endDate: "2025-11-01",
    status: "Activa",
  },
  {
    id: 2,
    client: "Maria Garcia",
    plan: "Anual",
    startDate: "2025-01-15",
    endDate: "2026-01-15",
    status: "Activa",
  },
  {
    id: 3,
    client: "Carlos Sanchez",
    plan: "Mensual",
    startDate: "2025-09-01",
    endDate: "2025-10-01",
    status: "Expirada",
  },
];

export default function SubscriptionsPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Suscripciones</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Suscripciones</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Fecha de Inicio</TableHead>
                <TableHead>Fecha de Fin</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell>{subscription.client}</TableCell>
                  <TableCell>{subscription.plan}</TableCell>
                  <TableCell>{subscription.startDate}</TableCell>
                  <TableCell>{subscription.endDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={subscription.status === "Activa" ? "default" : "destructive"}
                    >
                      {subscription.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() =>
                            navigator.clipboard.writeText(String(subscription.id))
                          }
                        >
                          Copiar ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Renovar</DropdownMenuItem>
                        <DropdownMenuItem>Cancelar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}