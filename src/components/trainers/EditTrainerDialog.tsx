import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TrainerForm } from "@/components/core/TrainerForm";
import Trainer from "@/models/Trainer";

type TrainerType = InstanceType<typeof Trainer>;

interface EditTrainerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (trainer: Omit<TrainerType, "_id">) => void;
  trainer: TrainerType | null;
}

export function EditTrainerDialog({
  open,
  onOpenChange,
  onSubmit,
  trainer,
}: EditTrainerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Entrenador</DialogTitle>
        </DialogHeader>
        {trainer && (
          <TrainerForm
            onSubmit={onSubmit}
            defaultValues={{
              name: trainer.name,
              email: trainer.email,
              phone: trainer.phone,
              specialization: trainer.specialization,
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}