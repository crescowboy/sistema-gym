"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const reminders = [
  {
    id: 1,
    client: "Pedro Ramirez",
    endDate: "2025-11-05",
    plan: "Mensual",
  },
  {
    id: 2,
    client: "Ana Torres",
    endDate: "2025-11-10",
    plan: "Anual",
  },
];

export default function RemindersPage() {
  return (
    <div className="w-full space-y-6">
      <h1 className="text-2xl font-bold">Recordatorios de Suscripción</h1>

      <div className="space-y-4">
        {reminders.map((reminder) => (
          <Card key={reminder.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{reminder.client}</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Enviar Recordatorio
                </Button>
                <Button size="sm">Renovar</Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                La suscripción del plan <strong>{reminder.plan}</strong> vence el{" "}
                <strong>{reminder.endDate}</strong>.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}