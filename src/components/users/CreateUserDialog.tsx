"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserForm } from "@/components/core/UserForm";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CreateUserDialogProps {
  onSuccess: () => void;
}

export function CreateUserDialog({ onSuccess }: CreateUserDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user");
      }

      toast.success("Usuario creado exitosamente.");
      onSuccess();
      setIsOpen(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Error al crear el usuario.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Agregar Usuario</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
        </DialogHeader>
        <UserForm onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}