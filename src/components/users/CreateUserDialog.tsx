import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  newUser: { name: string; email: string; password: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CreateUserDialog({
  open,
  onOpenChange,
  onSubmit,
  newUser,
  onInputChange,
}: CreateUserDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={() => onOpenChange(true)}>Agregar Usuario</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 py-4">
          <Input
            name="name"
            placeholder="Nombre"
            value={newUser.name}
            onChange={onInputChange}
          />
          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={newUser.email}
            onChange={onInputChange}
          />
          <Input
            name="password"
            placeholder="Contraseña"
            type="password"
            value={newUser.password}
            onChange={onInputChange}
          />
          <DialogFooter>
            <Button type="submit" className="w-full">
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}