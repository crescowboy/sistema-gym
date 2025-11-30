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

interface CreateClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  newClient: { name: string; email: string; phone: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CreateClientDialog({
  open,
  onOpenChange,
  onSubmit,
  newClient,
  onInputChange,
}: CreateClientDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={() => onOpenChange(true)}>Agregar Cliente</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Cliente</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 py-4">
          <Input
            name="name"
            placeholder="Nombre"
            value={newClient.name}
            onChange={onInputChange}
          />
          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={newClient.email}
            onChange={onInputChange}
          />
          <Input
            name="phone"
            placeholder="Teléfono"
            value={newClient.phone}
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