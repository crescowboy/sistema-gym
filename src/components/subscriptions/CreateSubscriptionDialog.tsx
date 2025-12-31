"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SubscriptionForm } from "@/components/core/SubscriptionForm";
import { useState } from "react";
import { toast } from "sonner"; // Assuming sonner is used for toasts
import { useRouter } from "next/navigation";

interface CreateSubscriptionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void; // Callback to refresh the list
}

export function CreateSubscriptionDialog({
  isOpen,
  onOpenChange,
  onSuccess,
}: CreateSubscriptionDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create subscription");
      }

      toast.success("Suscripción creada exitosamente.");
      onSuccess(); // Refresh the list in the parent component
      onOpenChange(false); // Close the dialog
      router.refresh(); // Refresh the page to reflect changes
    } catch (error: any) {
      toast.error(error.message || "Error al crear la suscripción.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Suscripción</DialogTitle>
          <DialogDescription>
            Rellena los campos para crear una nueva suscripción.
          </DialogDescription>
        </DialogHeader>
        <SubscriptionForm onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}
