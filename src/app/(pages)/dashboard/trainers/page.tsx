"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const trainers = [
  {
    id: 1,
    name: "Roberto Carlos",
    email: "roberto.carlos@example.com",
    phone: "111-222-3333",
    specialization: "Levantamiento de pesas",
    avatar: "/avatars/01.png",
  },
  {
    id: 2,
    name: "Luisa Martinez",
    email: "luisa.martinez@example.com",
    phone: "444-555-6666",
    specialization: "Yoga y Pilates",
    avatar: "/avatars/02.png",
  },
];

export default function TrainersPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Entrenadores</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Agregar Entrenador</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Agregar Nuevo Entrenador</SheetTitle>
            </SheetHeader>
            <form className="space-y-4 py-4">
              <Input placeholder="Nombre" />
              <Input placeholder="Email" type="email" />
              <Input placeholder="Teléfono" />
              <Input placeholder="Especialización" />
              <Button type="submit" className="w-full">Guardar</Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Especialización</TableHead>
            <TableHead>
              <span className="sr-only">Acciones</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trainers.map((trainer) => (
            <TableRow key={trainer.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={trainer.avatar} alt={trainer.name} />
                    <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{trainer.name}</span>
                </div>
              </TableCell>
              <TableCell>{trainer.email}</TableCell>
              <TableCell>{trainer.phone}</TableCell>
              <TableCell>{trainer.specialization}</TableCell>
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
                      onClick={() => navigator.clipboard.writeText(String(trainer.id))}
                    >
                      Copiar ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Eliminar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}