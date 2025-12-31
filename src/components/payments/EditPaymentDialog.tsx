"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PaymentForm } from "@/components/core/PaymentForm";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Client {
    _id: string;
    name: string;
}

interface Payment {
  _id: string;
  client: Client;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface EditPaymentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  payment: Payment | null;
  onSuccess: () => void;
}

export function EditPaymentDialog({
  isOpen,
  onOpenChange,
  payment,
  onSuccess,
}: EditPaymentDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    if (!payment) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/payments/${payment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update payment");
      }

      toast.success("Pago actualizado exitosamente.");
      onSuccess();
      onOpenChange(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Error al actualizar el pago.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const initialData = payment ? {
    client: payment.client._id,
    amount: payment.amount,
    status: payment.status,
  } : undefined;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Pago</DialogTitle>
          <DialogDescription>
            Modifica los campos del pago existente.
          </DialogDescription>
        </DialogHeader>
        {payment && (
          <PaymentForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
