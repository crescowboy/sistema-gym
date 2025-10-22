"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function ClientForm({ onSubmit }: { onSubmit?: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    plan: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    onSubmit?.();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nuevo Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-4">
          <Input
            placeholder="Nombre completo"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            placeholder="Correo electrónico"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            placeholder="Plan (por ejemplo: Mensual, Anual)"
            value={form.plan}
            onChange={(e) => setForm({ ...form, plan: e.target.value })}
            required
          />
          <Button type="submit" className="w-full">
            Guardar cliente
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
