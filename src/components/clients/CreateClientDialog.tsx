"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClientForm } from "@/components/core/ClientForm";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CreateClientDialogProps {
  onSuccess: () => void;
}

export function CreateClientDialog({ onSuccess }: CreateClientDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create client");
      }

      toast.success("Cliente creado exitosamente.");
      onSuccess();
      setIsOpen(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Error al crear el cliente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Agregar Cliente</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Cliente</DialogTitle>
        </DialogHeader>
        <ClientForm onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}