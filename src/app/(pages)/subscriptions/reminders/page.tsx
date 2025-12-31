"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface Client {
    _id: string;
    name: string;
    email: string;
}

interface Subscription {
  _id: string;
  client: Client;
  plan: string;
  endDate: string;
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReminders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/subscriptions/reminders");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setReminders(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleRenew = async (subscriptionId: string) => {
    try {
      const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Example: renew for 1 year
          status: "active",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to renew subscription");
      }

      toast.success("Suscripción renovada exitosamente.");
      fetchReminders();
    } catch (error: any) {
      toast.error(error.message || "Error al renovar la suscripción.");
    }
  };

  if (loading) {
    return (
      <div className="w-full space-y-6">
        <h1 className="text-2xl font-bold">Recordatorios de Suscripción</h1>
        <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full space-y-6">
        <h1 className="text-2xl font-bold">Recordatorios de Suscripción</h1>
        <p className="text-red-500">Error al cargar los recordatorios: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <h1 className="text-2xl font-bold">Recordatorios de Suscripción</h1>

      <div className="space-y-4">
        {reminders.length === 0 && <p>No hay recordatorios de suscripción por el momento.</p>}
        {reminders.map((reminder) => (
          <Card key={reminder._id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{reminder.client.name}</CardTitle>
              <div className="flex items-center space-x-2">
                <Button asChild variant="outline" size="sm">
                    <a href={`mailto:${reminder.client.email}?subject=Recordatorio de Vencimiento de Suscripción&body=Hola ${reminder.client.name}, te recordamos que tu suscripción al plan ${reminder.plan} está a punto de vencer.`}>
                        Enviar Recordatorio
                    </a>
                </Button>
                <Button size="sm" onClick={() => handleRenew(reminder._id)}>Renovar</Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                La suscripción del plan <strong>{reminder.plan}</strong> vence el{" "}
                <strong>{new Date(reminder.endDate).toLocaleDateString()}</strong>.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
