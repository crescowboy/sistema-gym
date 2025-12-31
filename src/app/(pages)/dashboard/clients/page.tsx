"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { CreateClientDialog } from "@/components/clients/CreateClientDialog";
import { EditClientDialog } from "@/components/clients/EditClientDialog";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  membershipStatus: 'active' | 'inactive' | 'pending';
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/clients");
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Error al cargar los clientes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (clientId: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      return;
    }
    try {
      const response = await fetch(`/api/clients/${clientId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchClients();
        toast.success("Cliente eliminado exitosamente.");
      } else {
        const errorData = await response.json();
        console.error("Error deleting client:", errorData);
        toast.error(errorData.message || "Error al eliminar el cliente.");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error("Error al eliminar el cliente.");
    }
  };

  const handleEditClick = (client: Client) => {
    setEditingClient(client);
    setIsEditDialogOpen(true);
  };
  
  const getStatusBadgeVariant = (status: Client["membershipStatus"]) => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "destructive";
      case "pending":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <CreateClientDialog onSuccess={fetchClients} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
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
                  <TableHead>Estado de Membresía</TableHead>
                  <TableHead>
                    <span className="sr-only">Acciones</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client._id}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>
                        <Badge variant={getStatusBadgeVariant(client.membershipStatus)}>
                            {client.membershipStatus}
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
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditClick(client)}>
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(client._id)}>
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

      <EditClientDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        client={editingClient}
        onSuccess={fetchClients}
      />
    </div>
  );
}