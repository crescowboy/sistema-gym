"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  title: z.string().min(1, { message: "El título es requerido." }),
  trainer: z.string().optional(),
  dayOfWeek: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Formato de hora inválido (HH:MM)." }),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Formato de hora inválido (HH:MM)." }),
});

interface Trainer {
  _id: string;
  name: string;
}

interface ScheduleFormProps {
  initialData?: z.infer<typeof formSchema>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}

export function ScheduleForm({
  initialData,
  onSubmit,
  isLoading,
}: ScheduleFormProps) {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [trainersLoading, setTrainersLoading] = useState<boolean>(true);
  const [trainersError, setTrainersError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      trainer: "",
      dayOfWeek: "Monday",
      startTime: "08:00",
      endTime: "09:00",
    },
  });

  useEffect(() => {
    async function fetchTrainers() {
      try {
        const response = await fetch("/api/trainers");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setTrainers(data);
      } catch (err) {
        if (err instanceof Error) {
          setTrainersError(err.message);
        } else {
          setTrainersError("An unknown error occurred while fetching trainers.");
        }
      } finally {
        setTrainersLoading(false);
      }
    }

    fetchTrainers();
  }, []);

  if (trainersLoading) {
    return <Skeleton className="h-[350px] w-full rounded-md" />;
  }

  if (trainersError) {
    return <p className="text-red-500">Error al cargar entrenadores: {trainersError}</p>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título de la Clase</FormLabel>
              <FormControl>
                <Input placeholder="Yoga" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="trainer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entrenador (Opcional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un entrenador" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {trainers.map((trainer) => (
                    <SelectItem key={trainer._id} value={trainer._id}>
                      {trainer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dayOfWeek"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Día de la Semana</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un día" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Monday">Lunes</SelectItem>
                  <SelectItem value="Tuesday">Martes</SelectItem>
                  <SelectItem value="Wednesday">Miércoles</SelectItem>
                  <SelectItem value="Thursday">Jueves</SelectItem>
                  <SelectItem value="Friday">Viernes</SelectItem>
                  <SelectItem value="Saturday">Sábado</SelectItem>
                  <SelectItem value="Sunday">Domingo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hora de Inicio</FormLabel>
              <FormControl>
                <Input placeholder="08:00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hora de Fin</FormLabel>
              <FormControl>
                <Input placeholder="09:00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar Horario"}
        </Button>
      </form>
    </Form>
  );
}
