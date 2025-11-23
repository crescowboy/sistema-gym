'use client';

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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: "", email: "", password: "" });

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        fetchUsers();
        setNewUser({ name: "", email: "", password: "" });
        setIsSheetOpen(false);
      } else {
        console.error("Error creating user:", await response.json());
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      return;
    }
    try {
      const response = await fetch(`/api/users`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: userId }),
      });

      if (response.ok) {
        fetchUsers();
      } else {
        console.error("Error deleting user:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setUpdatedUser({ name: user.name, email: user.email, password: "" });
    setIsEditSheetOpen(true);
  };

  const handleUpdateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const response = await fetch(`/api/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: editingUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          password: updatedUser.password,
        }),
      });

      if (response.ok) {
        fetchUsers();
        setIsEditSheetOpen(false);
        setEditingUser(null);
      } else {
        console.error("Error updating user:", await response.json());
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className='space-y-6 w-full'>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button onClick={() => setIsSheetOpen(true)}>Agregar Usuario</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Agregar Nuevo Usuario</SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <Input
                name="name"
                placeholder="Nombre"
                value={newUser.name}
                onChange={handleInputChange}
              />
              <Input
                name="email"
                placeholder="Email"
                type="email"
                value={newUser.email}
                onChange={handleInputChange}
              />
              <Input
                name="password"
                placeholder="Contraseña"
                type="password"
                value={newUser.password}
                onChange={handleInputChange}
              />
              <Button type="submit" className="w-full">
                Guardar
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
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
                  <TableHead>
                    <span className="sr-only">Acciones</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
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
                            onClick={() => navigator.clipboard.writeText(user._id)}
                          >
                            Copiar ID
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditClick(user)}>Editar</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(user._id)}>Eliminar</DropdownMenuItem>
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
      
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar Usuario</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleUpdateSubmit} className="space-y-4 py-4">
            <Input
              name="name"
              placeholder="Nombre"
              value={updatedUser.name}
              onChange={handleUpdateInputChange}
            />
            <Input
              name="email"
              placeholder="Email"
              type="email"
      
              value={updatedUser.email}
              onChange={handleUpdateInputChange}
            />
            <Input
              name="password"
              placeholder="Nueva Contraseña (dejar en blanco para no cambiar)"
              type="password"
              value={updatedUser.password}
              onChange={handleUpdateInputChange}
            />
            <Button type="submit" className="w-full">
              Actualizar
            </Button>
          </form>
        </SheetContent>
      </Sheet>

    </div>
  );
}
