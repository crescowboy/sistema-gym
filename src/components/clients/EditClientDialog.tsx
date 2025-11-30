import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  updatedClient: { name: string; email: string; phone: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EditClientDialog({
  open,
  onOpenChange,
  onSubmit,
  updatedClient,
  onInputChange,
}: EditClientDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 py-4">
          <Input
            name="name"
            placeholder="Nombre"
            value={updatedClient.name}
            onChange={onInputChange}
          />
          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={updatedClient.email}
            onChange={onInputChange}
          />
          <Input
            name="phone"
            placeholder="Teléfono"
            value={updatedClient.phone}
            onChange={onInputChange}
          />
          <DialogFooter>
            <Button type="submit" className="w-full">
              Actualizar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}