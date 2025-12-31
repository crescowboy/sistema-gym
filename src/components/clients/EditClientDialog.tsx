"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClientForm } from "@/components/core/ClientForm";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  membershipStatus: 'active' | 'inactive' | 'pending';
}

interface EditClientDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  onSuccess: () => void;
}

export function EditClientDialog({
  isOpen,
  onOpenChange,
  client,
  onSuccess,
}: EditClientDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    if (!client) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/clients/${client._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update client");
      }

      toast.success("Cliente actualizado exitosamente.");
      onSuccess();
      onOpenChange(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Error al actualizar el cliente.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const initialData = client ? {
    name: client.name,
    email: client.email,
    phone: client.phone,
    membershipStatus: client.membershipStatus,
  } : undefined;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
        </DialogHeader>
        {client && (
          <ClientForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}