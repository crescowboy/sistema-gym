import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  updatedUser: { name: string; email: string; password: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EditUserDialog({
  open,
  onOpenChange,
  onSubmit,
  updatedUser,
  onInputChange,
}: EditUserDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 py-4">
          <Input
            name="name"
            placeholder="Nombre"
            value={updatedUser.name}
            onChange={onInputChange}
          />
          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={updatedUser.email}
            onChange={onInputChange}
          />
          <Input
            name="password"
            placeholder="Nueva Contraseña (dejar en blanco para no cambiar)"
            type="password"
            value={updatedUser.password}
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