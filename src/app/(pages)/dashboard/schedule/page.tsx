"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const schedule = [
  {
    time: "08:00 - 09:00",
    monday: "Yoga",
    tuesday: "",
    wednesday: "Yoga",
    thursday: "",
    friday: "Yoga",
    saturday: "",
    sunday: "",
  },
  {
    time: "09:00 - 10:00",
    monday: "",
    tuesday: "Spinning",
    wednesday: "",
    thursday: "Spinning",
    friday: "",
    saturday: "Spinning",
    sunday: "",
  },
  {
    time: "18:00 - 19:00",
    monday: "Boxeo",
    tuesday: "",
    wednesday: "Boxeo",
    thursday: "",
    friday: "Boxeo",
    saturday: "",
    sunday: "",
  },
  {
    time: "19:00 - 20:00",
    monday: "",
    tuesday: "Zumba",
    wednesday: "",
    thursday: "Zumba",
    friday: "",
    saturday: "Zumba",
    sunday: "",
  },
];

export default function SchedulePage() {
  return (
    <div className="w-full space-y-6">
      <h1 className="text-2xl font-bold">Horarios de Clases</h1>

      <Card>
        <CardHeader>
          <CardTitle>Semana Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hora</TableHead>
                <TableHead>Lunes</TableHead>
                <TableHead>Martes</TableHead>
                <TableHead>Miércoles</TableHead>
                <TableHead>Jueves</TableHead>
                <TableHead>Viernes</TableHead>
                <TableHead>Sábado</TableHead>
                <TableHead>Domingo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>{item.monday}</TableCell>
                  <TableCell>{item.tuesday}</TableCell>
                  <TableCell>{item.wednesday}</TableCell>
                  <TableCell>{item.thursday}</TableCell>
                  <TableCell>{item.friday}</TableCell>
                  <TableCell>{item.saturday}</TableCell>
                  <TableCell>{item.sunday}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}