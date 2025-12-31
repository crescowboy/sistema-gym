"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScheduleForm } from "@/components/core/ScheduleForm";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CreateScheduleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreateScheduleDialog({
  isOpen,
  onOpenChange,
  onSuccess,
}: CreateScheduleDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create schedule");
      }

      toast.success("Horario creado exitosamente.");
      onSuccess();
      onOpenChange(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Error al crear el horario.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Horario</DialogTitle>
          <DialogDescription>
            Rellena los campos para crear un nuevo horario de clase.
          </DialogDescription>
        </DialogHeader>
        <ScheduleForm onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}
