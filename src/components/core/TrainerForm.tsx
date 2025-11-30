"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface TrainerFormProps {
  onSubmit: (trainer: any) => void;
  defaultValues?: {
    name?: string;
    email?: string;
    phone?: string;
    specialization?: string;
  };
}

export function TrainerForm({ onSubmit, defaultValues }: TrainerFormProps) {
  const [formData, setFormData] = useState({
    name: defaultValues?.name || "",
    email: defaultValues?.email || "",
    phone: defaultValues?.phone || "",
    specialization: defaultValues?.specialization || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <Input
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
      />
      <Input
        name="email"
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        name="phone"
        placeholder="Teléfono"
        value={formData.phone}
        onChange={handleChange}
      />
      <Input
        name="specialization"
        placeholder="Especialización"
        value={formData.specialization}
        onChange={handleChange}
      />
      <Button type="submit" className="w-full">
        Guardar
      </Button>
    </form>
  );
}
