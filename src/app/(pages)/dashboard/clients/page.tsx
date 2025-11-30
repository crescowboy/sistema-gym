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

interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isNewClientDialogOpen, setIsNewClientDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [updatedClient, setUpdatedClient] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/clients");
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClient),
      });

      if (response.ok) {
        fetchClients();
        setNewClient({ name: "", email: "", phone: "" });
        setIsNewClientDialogOpen(false);
      } else {
        console.error("Error creating client:", await response.json());
      }
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  const handleDelete = async (clientId: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      return;
    }
    try {
      const response = await fetch(`/api/clients`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: clientId }),
      });

      if (response.ok) {
        fetchClients();
      } else {
        console.error("Error deleting client:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const handleEditClick = (client: Client) => {
    setEditingClient(client);
    setUpdatedClient({
      name: client.name,
      email: client.email,
      phone: client.phone,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingClient) return;

    try {
      const response = await fetch(`/api/clients`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: editingClient._id,
          name: updatedClient.name,
          email: updatedClient.email,
          phone: updatedClient.phone,
        }),
      });

      if (response.ok) {
        fetchClients();
        setIsEditDialogOpen(false);
        setEditingClient(null);
      } else {
        console.error("Error updating client:", await response.json());
      }
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <CreateClientDialog
          open={isNewClientDialogOpen}
          onOpenChange={setIsNewClientDialogOpen}
          onSubmit={handleSubmit}
          newClient={newClient}
          onInputChange={handleInputChange}
        />
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
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleUpdateSubmit}
        updatedClient={updatedClient}
        onInputChange={handleUpdateInputChange}
      />
    </div>
  );
}
