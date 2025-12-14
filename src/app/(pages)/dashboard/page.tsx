import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, Calendar, TrendingUp } from "lucide-react";

export default function DashboardPage() {
    const stats = [
        {
            title: "Clientes Activos",
            value: "1,234",
            description: "+12% desde el mes pasado",
            icon: Users,
            color: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            title: "Ingresos",
            value: "$12,450",
            description: "+8% desde el mes pasado",
            icon: CreditCard,
            color: "bg-green-100",
            iconColor: "text-green-600",
        },
        {
            title: "Suscripciones Activas",
            value: "856",
            description: "+23% desde el mes pasado",
            icon: Calendar,
            color: "bg-purple-100",
            iconColor: "text-purple-600",
        },
        {
            title: "Tasa de Renovación",
            value: "92%",
            description: "+5% desde el mes pasado",
            icon: TrendingUp,
            color: "bg-orange-100",
            iconColor: "text-orange-600",
        },
    ];

    return (
        <div className="space-y-6 w-full">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Bienvenido al Panel</h1>
                <p className="text-gray-600 mt-1">Aquí puedes ver un resumen de tu gimnasio</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        {stat.title}
                                    </CardTitle>
                                    <div className={`${stat.color} p-2 rounded-lg`}>
                                        <Icon className={`h-4 w-4 ${stat.iconColor}`} />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Actividad Reciente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-2 border-b">
                                <div>
                                    <p className="font-medium text-sm">Nuevo cliente registrado</p>
                                    <p className="text-xs text-gray-500">Juan Pérez</p>
                                </div>
                                <span className="text-xs text-gray-400">Hace 2 horas</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b">
                                <div>
                                    <p className="font-medium text-sm">Pago recibido</p>
                                    <p className="text-xs text-gray-500">$150.00</p>
                                </div>
                                <span className="text-xs text-gray-400">Hace 4 horas</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b">
                                <div>
                                    <p className="font-medium text-sm">Suscripción renovada</p>
                                    <p className="text-xs text-gray-500">Plan Premium</p>
                                </div>
                                <span className="text-xs text-gray-400">Hace 1 día</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <p className="font-medium text-sm">Recordatorio enviado</p>
                                    <p className="text-xs text-gray-500">50 clientes</p>
                                </div>
                                <span className="text-xs text-gray-400">Hace 1 día</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Próximos Vencimientos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-2 border-b">
                                <div>
                                    <p className="font-medium text-sm">María García</p>
                                    <p className="text-xs text-gray-500">Premium Plan</p>
                                </div>
                                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Mañana</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b">
                                <div>
                                    <p className="font-medium text-sm">Carlos López</p>
                                    <p className="text-xs text-gray-500">Basic Plan</p>
                                </div>
                                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">En 3 días</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b">
                                <div>
                                    <p className="font-medium text-sm">Ana Martínez</p>
                                    <p className="text-xs text-gray-500">Premium Plan</p>
                                </div>
                                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">En 5 días</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <p className="font-medium text-sm">Roberto Sánchez</p>
                                    <p className="text-xs text-gray-500">Standard Plan</p>
                                </div>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">En 10 días</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}