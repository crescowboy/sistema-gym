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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Client {
    _id: string;
    name: string;
    // Add other client properties as needed
  }

interface Subscription {
  _id: string;
  client: Client;
  plan: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "cancelled";
}

interface EditSubscriptionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: Subscription | null; // The subscription to edit
  onSuccess: () => void; // Callback to refresh the list
}

export function EditSubscriptionDialog({
  isOpen,
  onOpenChange,
  subscription,
  onSuccess,
}: EditSubscriptionDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    if (!subscription) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/subscriptions/${subscription._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update subscription");
      }

      toast.success("Suscripción actualizada exitosamente.");
      onSuccess(); // Refresh the list in the parent component
      onOpenChange(false); // Close the dialog
      router.refresh(); // Refresh the page to reflect changes
    } catch (error: any) {
      toast.error(error.message || "Error al actualizar la suscripción.");
    } finally {
      setIsLoading(false);
    }
  };

  const initialData = subscription ? {
    client: subscription.client._id,
    plan: subscription.plan,
    startDate: new Date(subscription.startDate),
    endDate: new Date(subscription.endDate),
    status: subscription.status,
  } : undefined;


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Suscripción</DialogTitle>
          <DialogDescription>
            Modifica los campos de la suscripción existente.
          </DialogDescription>
        </DialogHeader>
        {subscription && (
          <SubscriptionForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
