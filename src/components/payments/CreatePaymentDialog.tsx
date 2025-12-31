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

interface CreatePaymentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreatePaymentDialog({
  isOpen,
  onOpenChange,
  onSuccess,
}: CreatePaymentDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create payment");
      }

      toast.success("Pago registrado exitosamente.");
      onSuccess();
      onOpenChange(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Error al registrar el pago.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Pago</DialogTitle>
          <DialogDescription>
            Rellena los campos para registrar un nuevo pago.
          </DialogDescription>
        </DialogHeader>
        <PaymentForm onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}
