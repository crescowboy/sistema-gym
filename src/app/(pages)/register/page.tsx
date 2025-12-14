"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("¡Cuenta creada exitosamente! Redirigiendo al login...");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setError(data.message || "Error al crear la cuenta");
      }
    } catch (err) {
      setError("Error en la conexión. Por favor, intenta de nuevo.");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Crear cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="p-3 mb-4 bg-red-500/20 border border-red-500/50 rounded-md text-red-600 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 mb-4 bg-green-500/20 border border-green-500/50 rounded-md text-green-600 text-sm">
              {success}
            </div>
          )}
          <form onSubmit={register} className="space-y-4">
            <Input
              placeholder="Nombre completo"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              disabled={isLoading}
            />
            <Input
              placeholder="Correo electrónico"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              disabled={isLoading}
            />
            <Input
              placeholder="Contraseña"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              disabled={isLoading}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Registrarse"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
