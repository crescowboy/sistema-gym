"use client";

import { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateScheduleDialog } from "@/components/schedule/CreateScheduleDialog";
import { EditScheduleDialog } from "@/components/schedule/EditScheduleDialog";

interface Trainer {
  _id: string;
  name: string;
}

interface ScheduleEntry {
  _id: string;
  title: string;
  trainer: Trainer;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

interface ScheduleRow {
  time: string;
  monday: ScheduleEntry | null;
  tuesday: ScheduleEntry | null;
  wednesday: ScheduleEntry | null;
  thursday: ScheduleEntry | null;
  friday: ScheduleEntry | null;
  saturday: ScheduleEntry | null;
  sunday: ScheduleEntry | null;
}

const timeSlots = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


export default function SchedulePage() {
  const [scheduleData, setScheduleData] = useState<ScheduleRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleEntry | null>(null);

  const fetchSchedule = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/schedule");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: ScheduleEntry[] = await response.json();
      
      const processedData = timeSlots.map(time => {
        const row: ScheduleRow = { time, monday: null, tuesday: null, wednesday: null, thursday: null, friday: null, saturday: null, sunday: null };
        daysOfWeek.forEach(day => {
          const startTime = time.split(' - ')[0];
          const entry = data.find(d => d.startTime === startTime && d.dayOfWeek === day);
          if (entry) {
            (row as any)[day.toLowerCase()] = entry;
          }
        });
        return row;
      });

      setScheduleData(processedData);

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
    fetchSchedule();
  }, []);
  
  const handleCellClick = (schedule: ScheduleEntry | null) => {
    if (schedule) {
      setSelectedSchedule(schedule);
      setIsEditDialogOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="w-full space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Horarios de Clases</h1>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Agregar Horario
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Semana Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[400px] w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full space-y-6">
        <h1 className="text-2xl font-bold">Horarios de Clases</h1>
        <p className="text-red-500">Error al cargar los horarios: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Horarios de Clases</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Agregar Horario
        </Button>
      </div>

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
              {scheduleData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.time}</TableCell>
                  {daysOfWeek.map(day => (
                    <TableCell key={day} onClick={() => handleCellClick((row as any)[day.toLowerCase()])} className="cursor-pointer hover:bg-gray-100">
                      {(row as any)[day.toLowerCase()] ? (
                        <div className="p-2 rounded-lg bg-blue-100 text-blue-800">
                          <p className="font-semibold">{(row as any)[day.toLowerCase()].title}</p>
                          <p className="text-xs">{(row as any)[day.toLowerCase()].trainer?.name || 'N/A'}</p>
                        </div>
                      ) : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <CreateScheduleDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={fetchSchedule}
      />
      {selectedSchedule && (
        <EditScheduleDialog
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            schedule={selectedSchedule}
            onSuccess={fetchSchedule}
        />
      )}
    </div>
  );
}