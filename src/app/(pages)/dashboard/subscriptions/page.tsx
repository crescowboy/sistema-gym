"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateSubscriptionDialog } from "@/components/subscriptions/CreateSubscriptionDialog";
import { EditSubscriptionDialog } from "@/components/subscriptions/EditSubscriptionDialog"; // Import the edit dialog
import { toast } from "sonner"; // Assuming sonner is used for toasts
import { useRouter } from "next/navigation";

interface Client {
  _id: string;
  name: string;
}

interface Subscription {
  _id: string;
  client: Client;
  plan: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "cancelled";
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false); // State for edit dialog visibility
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null); // State for selected subscription to edit
  const router = useRouter();

  const fetchSubscriptions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/subscriptions");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setSubscriptions(data);
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
    fetchSubscriptions();
  }, []);

  const getStatusBadgeVariant = (status: Subscription["status"]) => {
    switch (status) {
      case "active":
        return "default";
      case "expired":
        return "destructive";
      case "cancelled":
        return "secondary";
      default:
        return "default";
    }
  };

  const handleEdit = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsEditDialogOpen(true);
  };

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
      fetchSubscriptions();
    } catch (error: any) {
      toast.error(error.message || "Error al renovar la suscripción.");
    }
  };

  const handleCancel = async (subscriptionId: string) => {
    try {
      const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "cancelled" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to cancel subscription");
      }

      toast.success("Suscripción cancelada exitosamente.");
      fetchSubscriptions();
    } catch (error: any) {
      toast.error(error.message || "Error al cancelar la suscripción.");
    }
  };

  const handleDelete = async (subscriptionId: string) => {
    try {
      const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete subscription");
      }

      toast.success("Suscripción eliminada exitosamente.");
      fetchSubscriptions();
    } catch (error: any) {
      toast.error(error.message || "Error al eliminar la suscripción.");
    }
  };

  if (loading) {
    return (
      <div className="w-full space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Suscripciones</h1>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Crear Suscripción
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Lista de Suscripciones</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>
        <CreateSubscriptionDialog
          isOpen={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSuccess={fetchSubscriptions}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full space-y-6">
        <h1 className="text-2xl font-bold">Suscripciones</h1>
        <p className="text-red-500">Error al cargar las suscripciones: {error}</p>
        <CreateSubscriptionDialog
          isOpen={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSuccess={fetchSubscriptions}
        />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Suscripciones</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Crear Suscripción
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Suscripciones</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Fecha de Inicio</TableHead>
                <TableHead>Fecha de Fin</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription._id}>
                  <TableCell>{subscription.client?.name || "N/A"}</TableCell>
                  <TableCell>{subscription.plan}</TableCell>
                  <TableCell>{new Date(subscription.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(subscription.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(subscription.status)}>
                      {subscription.status}
                    </Badge>
                  </TableCell>
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
                        <DropdownMenuItem
                          onClick={() =>
                            navigator.clipboard.writeText(String(subscription._id))
                          }
                        >
                          Copiar ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEdit(subscription)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRenew(subscription._id)}>
                          Renovar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCancel(subscription._id)}>
                          Cancelar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(subscription._id)}
                          className="text-red-600"
                        >
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateSubscriptionDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={fetchSubscriptions}
      />

      {selectedSubscription && (
        <EditSubscriptionDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          subscription={selectedSubscription}
          onSuccess={fetchSubscriptions}
        />
      )}
    </div>
  );
}