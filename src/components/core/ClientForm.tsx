"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ClientForm() {
  return (
    <form className="space-y-4 py-4">
      <Input placeholder="Nombre" />
      <Input placeholder="Email" type="email" />
      <Input placeholder="Teléfono" />
      <Input placeholder="Suscripción" />
      <Button type="submit" className="w-full">Guardar</Button>
    </form>
  );
}