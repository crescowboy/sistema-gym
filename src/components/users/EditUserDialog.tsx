"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserForm } from "@/components/core/UserForm";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "regular" | "super";
}

interface EditUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onSuccess: () => void;
}

export function EditUserDialog({
  isOpen,
  onOpenChange,
  user,
  onSuccess,
}: EditUserDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    if (!user) return;

    // If password is an empty string, don't include it in the update
    const updateData: {
      name: string;
      email: string;
      password?: string;
      role: "admin" | "regular" | "super";
    } = {
      ...values
    };
    if (updateData.password === "") {
      delete updateData.password;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user");
      }

      toast.success("Usuario actualizado exitosamente.");
      onSuccess();
      onOpenChange(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Error al actualizar el usuario.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const initialData = user ? {
    name: user.name,
    email: user.email,
    role: user.role,
  } : undefined;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
        </DialogHeader>
        {user && (
          <UserForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isEdit={true}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}