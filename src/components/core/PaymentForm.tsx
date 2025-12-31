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
  client: z.string().min(1, { message: "El cliente es requerido." }),
  amount: z.coerce.number().positive({ message: "El monto debe ser positivo." }),
  status: z.enum(["completed", "pending", "failed"]).default("pending"),
});

interface Client {
  _id: string;
  name: string;
}

interface PaymentFormProps {
  initialData?: z.infer<typeof formSchema>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}

export function PaymentForm({
  initialData,
  onSubmit,
  isLoading,
}: PaymentFormProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [clientsLoading, setClientsLoading] = useState<boolean>(true);
  const [clientsError, setClientsError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      client: "",
      amount: 0,
      status: "pending",
    },
  });

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await fetch("/api/clients");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setClients(data);
      } catch (err) {
        if (err instanceof Error) {
          setClientsError(err.message);
        } else {
          setClientsError("An unknown error occurred while fetching clients.");
        }
      } finally {
        setClientsLoading(false);
      }
    }

    fetchClients();
  }, []);

  if (clientsLoading) {
    return <Skeleton className="h-[250px] w-full rounded-md" />;
  }

  if (clientsError) {
    return <p className="text-red-500">Error al cargar clientes: {clientsError}</p>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="client"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un cliente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client._id} value={client._id}>
                      {client.name}
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
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monto</FormLabel>
              <FormControl>
                <Input type="number" placeholder="50.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="completed">Completado</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="failed">Fallido</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar Pago"}
        </Button>
      </form>
    </Form>
  );
}
