"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = ["#0088FE", "#FF8042", "#FFBB28"];

export default function ReportsPage() {
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState([]);
  const [loadingIncome, setLoadingIncome] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [errorIncome, setErrorIncome] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMonthlyIncome() {
      try {
        const response = await fetch("/api/reports/monthly-income");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setMonthlyIncome(data);
      } catch (err) {
        if (err instanceof Error) {
          setErrorIncome(err.message);
        } else {
          setErrorIncome("An unknown error occurred");
        }
      } finally {
        setLoadingIncome(false);
      }
    }

    async function fetchSubscriptionStatus() {
      try {
        const response = await fetch("/api/reports/subscription-status");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setSubscriptionStatus(data);
      } catch (err) {
        if (err instanceof Error) {
          setErrorStatus(err.message);
        } else {
          setErrorStatus("An unknown error occurred");
        }
      } finally {
        setLoadingStatus(false);
      }
    }

    fetchMonthlyIncome();
    fetchSubscriptionStatus();
  }, []);

  return (
    <div className="w-full space-y-6">
      <h1 className="text-2xl font-bold">Reportes</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ingresos Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingIncome ? (
              <Skeleton className="h-[300px] w-full" />
            ) : errorIncome ? (
              <p className="text-red-500">{errorIncome}</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyIncome}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="income" fill="#8884d8" name="Ingresos"/>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado de Suscripciones</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingStatus ? (
              <Skeleton className="h-[300px] w-full" />
            ) : errorStatus ? (
              <p className="text-red-500">{errorStatus}</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subscriptionStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={(entry) => `${entry.name}: ${entry.value}`}
                  >
                    {subscriptionStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
