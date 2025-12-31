"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScheduleForm } from "@/components/core/ScheduleForm";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Trainer {
    _id: string;
    name: string;
}

interface ScheduleEntry {
  _id: string;
  title: string;
  trainer: Trainer;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

interface EditScheduleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: ScheduleEntry | null;
  onSuccess: () => void;
}

export function EditScheduleDialog({
  isOpen,
  onOpenChange,
  schedule,
  onSuccess,
}: EditScheduleDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    if (!schedule) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/schedule/${schedule._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update schedule");
      }

      toast.success("Horario actualizado exitosamente.");
      onSuccess();
      onOpenChange(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Error al actualizar el horario.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!schedule) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/schedule/${schedule._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete schedule");
      }

      toast.success("Horario eliminado exitosamente.");
      onSuccess();
      onOpenChange(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Error al eliminar el horario.");
    } finally {
      setIsLoading(false);
    }
  };

  const initialData = schedule ? {
    title: schedule.title,
    trainer: schedule.trainer?._id,
    dayOfWeek: schedule.dayOfWeek,
    startTime: schedule.startTime,
    endTime: schedule.endTime,
  } : undefined;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Horario</DialogTitle>
          <DialogDescription>
            Modifica o elimina el horario de clase existente.
          </DialogDescription>
        </DialogHeader>
        {schedule && (
          <>
            <ScheduleForm
              initialData={initialData}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
            <DialogFooter className="mt-4">
                <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                    {isLoading ? 'Eliminando...' : 'Eliminar'}
                </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
