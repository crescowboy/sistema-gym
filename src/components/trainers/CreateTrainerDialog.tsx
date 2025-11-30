import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrainerForm } from "@/components/core/TrainerForm";
import Trainer from "@/models/Trainer";

interface CreateTrainerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (trainer: Omit<typeof Trainer, "_id">) => void;
}

export function CreateTrainerDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateTrainerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={() => onOpenChange(true)}>Agregar Entrenador</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Entrenador</DialogTitle>
        </DialogHeader>
        <TrainerForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}