import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const stats = [
    {title: "Clientes activos", value: "132"},
    {title: "Pago por mes", value: "$4,132"},
    {title: "Membresias activas", value: "97"},
    {title: "Vencimientos proximos", value: "12"}
]

export default function StatsOverview() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader>
                    <CardTitle className="text-sm text-gray-500">{stat.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                  </CardContent>
                </Card>
            ))}
        </div>
    )
}