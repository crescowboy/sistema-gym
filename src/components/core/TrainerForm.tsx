"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trainer } from "@/models/Trainer";
import { useEffect, useState } from "react";

interface TrainerFormProps {
  onSubmit: (trainer: Omit<Trainer, "_id">) => void;
  trainer?: Trainer;
}

export function TrainerForm({ onSubmit, trainer }: TrainerFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
  });

  useEffect(() => {
    if (trainer) {
      setFormData({
        name: trainer.name,
        email: trainer.email,
        phone: trainer.phone || "",
        specialization: trainer.specialization || "",
      });
    }
  }, [trainer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      specialization: "",
    });
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
