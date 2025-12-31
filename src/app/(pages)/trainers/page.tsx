"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import Trainer from "@/models/Trainer"
import { Skeleton } from "@/components/ui/skeleton";
import { CreateTrainerDialog } from "@/components/trainers/CreateTrainerDialog";
import { EditTrainerDialog } from "@/components/trainers/EditTrainerDialog"; 
import { toast } from "sonner";

type TrainerType = InstanceType<typeof Trainer>;

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<TrainerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<TrainerType | null>(null);

  const fetchTrainers = async () => {
    try {
      const response = await fetch("/api/trainers");
      const data = await response.json();
      setTrainers(data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
      toast.error("Error al cargar los entrenadores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleAddTrainer = async (trainer: Omit<TrainerType, "_id">) => {
    try {
      const response = await fetch("/api/trainers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trainer),
      });

      if (response.ok) {
        fetchTrainers();
        setIsCreateDialogOpen(false);
        toast.success("Entrenador agregado exitosamente.");
      } else {
        const errorData = await response.json();
        console.error("Error creating trainer:", errorData);
        toast.error(errorData.message || "Error al crear el entrenador.");
      }
    } catch (error) {
      console.error("Error creating trainer:", error);
      toast.error("Error al crear el entrenador.");
    }
  };

  const handleEditTrainer = (trainer: TrainerType) => {
    setEditingTrainer(trainer);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTrainer = async (trainer: Omit<TrainerType, "_id">) => {
    if (!editingTrainer) return;
    try {
      const response = await fetch(`/api/trainers/${editingTrainer._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trainer),
      });

      if (response.ok) {
        fetchTrainers();
        setIsEditDialogOpen(false);
        setEditingTrainer(null);
        toast.success("Entrenador actualizado exitosamente.");
      } else {
        const errorData = await response.json();
        console.error("Error updating trainer:", errorData);
        toast.error(errorData.message || "Error al actualizar el entrenador.");
      }
    } catch (error) {
      console.error("Error updating trainer:", error);
      toast.error("Error al actualizar el entrenador.");
    }
  };

  const handleDeleteTrainer = async (trainerId: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este entrenador?")) {
      return;
    }
    try {
      const response = await fetch(`/api/trainers/${trainerId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchTrainers();
        toast.success("Entrenador eliminado exitosamente.");
      } else {
        const errorData = await response.json();
        console.error("Error deleting trainer:", errorData);
        toast.error(errorData.message || "Error al eliminar el entrenador.");
      }
    } catch (error) {
      console.error("Error deleting trainer:", error);
      toast.error("Error al eliminar el entrenador.");
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Entrenadores</h1>
        <CreateTrainerDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSubmit={handleAddTrainer}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Entrenadores</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Especialización</TableHead>
                  <TableHead>
                    <span className="sr-only">Acciones</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainers.map((trainer) => (
                  <TableRow key={trainer._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={`/avatars/${trainer._id}.png`} alt={trainer.name} />
                          <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{trainer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{trainer.email}</TableCell>
                    <TableCell>{trainer.phone}</TableCell>
                    <TableCell>{trainer.specialization}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditTrainer(trainer)}>
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteTrainer(trainer._id)}>
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <EditTrainerDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleUpdateTrainer}
        trainer={editingTrainer}
      />
    </div>
  );
}
