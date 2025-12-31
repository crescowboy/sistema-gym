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
import { Badge } from "@/components/ui/badge";
import { Mail, RotateCw, AlertTriangle, CheckCircle } from "lucide-react";

interface Client {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  membershipStatus: string;
}

interface Subscription {
  _id: string;
  client: Client;
  plan: string;
  endDate: string;
  status: string;
  daysUntilExpiry: number;
  isExpiringSoon: boolean;
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterDays, setFilterDays] = useState(30);
  const [renewingId, setRenewingId] = useState<string | null>(null);

  const fetchReminders = async (days: number = 30) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/subscriptions/reminders?days=${days}`);
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
      toast.error("Error al cargar los recordatorios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders(filterDays);
  }, [filterDays]);

  const handleRenew = async (subscription: Subscription) => {
    setRenewingId(subscription._id);
    try {
      const newEndDate = new Date();
      newEndDate.setFullYear(newEndDate.getFullYear() + 1);

      const response = await fetch(`/api/subscriptions/${subscription._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endDate: newEndDate,
          status: "active",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to renew subscription");
      }

      toast.success("Suscripción renovada exitosamente.", {
        description: `La suscripción de ${subscription.client.name} ha sido renovada por 1 año.`,
      });
      fetchReminders(filterDays);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Error al renovar", {
          description: error.message || "No se pudo renovar la suscripción.",
        });
      } else {
        toast.error("Error al renovar la suscripción.");
      }
    } finally {
      setRenewingId(null);
    }
  };

  const handleSendReminder = async (subscription: Subscription) => {
    try {
      const mailtoLink = `mailto:${subscription.client.email}?subject=Recordatorio de Vencimiento de Suscripción&body=Hola ${subscription.client.name},%0A%0ATe recordamos que tu suscripción al plan ${subscription.plan} está a punto de vencer el ${new Date(subscription.endDate).toLocaleDateString('es-ES')}.%0A%0AConsideramos que es momento de renovarla para continuar disfrutando de nuestros servicios.%0A%0SaludoS,`;
      window.location.href = mailtoLink;
      toast.success("Email enviado", {
        description: `Recordatorio enviado a ${subscription.client.email}`,
      });
    } catch {
      toast.error("Error al preparar el email");
    }
  };

  const getPlanLabel = (plan: string) => {
    const planLabels: { [key: string]: string } = {
      basic: "Plan Básico",
      premium: "Plan Premium",
      vip: "Plan VIP",
    };
    return planLabels[plan] || plan;
  };

  const getStatusColor = (daysUntilExpiry: number) => {
    if (daysUntilExpiry <= 3) return "destructive";
    if (daysUntilExpiry <= 7) return "default";
    return "secondary";
  };

  const getStatusIcon = (daysUntilExpiry: number) => {
    if (daysUntilExpiry <= 3) return <AlertTriangle className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="w-full space-y-6">
        <h1 className="text-2xl font-bold">Recordatorios de Suscripción</h1>
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Recordatorios de Suscripción</h1>
        <div className="flex gap-2 flex-wrap">
          {[7, 14, 30, 60].map((days) => (
            <Button
              key={days}
              variant={filterDays === days ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterDays(days)}
            >
              Próximos {days} días
            </Button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Error al cargar los recordatorios: {error}</p>
        </div>
      )}

      {reminders.length === 0 && !error && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 mx-auto text-green-600 mb-2" />
              <p className="text-gray-600">No hay suscripciones próximas a vencer en los próximos {filterDays} días.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {reminders.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          <div className="text-sm text-gray-600">
            Mostrando <span className="font-semibold">{reminders.length}</span> suscripciones por renovar
          </div>

          {reminders.map((reminder) => (
            <Card key={reminder._id} className={reminder.isExpiringSoon ? "border-red-300 bg-red-50" : ""}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg">{reminder.client.name}</CardTitle>
                    <Badge variant={getStatusColor(reminder.daysUntilExpiry)}>
                      {getStatusIcon(reminder.daysUntilExpiry)}
                      <span className="ml-1">{reminder.daysUntilExpiry} días</span>
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{getPlanLabel(reminder.plan)}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <p className="font-medium">{reminder.client.email}</p>
                  </div>
                  {reminder.client.phone && (
                    <div>
                      <span className="text-gray-600">Teléfono:</span>
                      <p className="font-medium">{reminder.client.phone}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-600">Vence el:</span>
                    <p className="font-medium">{new Date(reminder.endDate).toLocaleDateString('es-ES')}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Estado:</span>
                    <p className="font-medium capitalize">{reminder.status === 'active' ? 'Activa' : 'Inactiva'}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 flex-wrap">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSendReminder(reminder)}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar Recordatorio
                  </Button>
                  <Button
                    size="sm"
                    onClick={() =>
                      toast.promise(
                        handleRenew(reminder),
                        {
                          loading: "Renovando suscripción...",
                          success: "¡Suscripción renovada!",
                          error: "Error al renovar",
                        }
                      )
                    }
                    disabled={renewingId === reminder._id}
                  >
                    <RotateCw className="w-4 h-4 mr-2" />
                    {renewingId === reminder._id ? "Renovando..." : "Renovar"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
