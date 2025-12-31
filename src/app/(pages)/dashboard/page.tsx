import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, Calendar, TrendingUp } from "lucide-react";
import dbConnect from "@/lib/dbConnect";
import Client from "@/models/Client";
import Payment from "@/models/Payment";
import Subscription from "@/models/Subscription";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

async function getStats() {
    await dbConnect();

    const activeClients = await Client.countDocuments({ membershipStatus: 'active' });

    const incomeResult = await Payment.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalIncome = incomeResult.length > 0 ? incomeResult[0].total : 0;

    const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });

    const recentActivity = await Payment.find({ status: 'completed' }).sort({ date: -1 }).limit(5).populate('client', 'name');

    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const upcomingExpirations = await Subscription.find({
        status: 'active',
        endDate: { $gte: today, $lte: nextWeek }
    }).sort({ endDate: 1 }).populate('client', 'name');

    return {
        activeClients,
        totalIncome,
        activeSubscriptions,
        recentActivity,
        upcomingExpirations
    };
}


export default async function DashboardPage() {
    const {
        activeClients,
        totalIncome,
        activeSubscriptions,
        recentActivity,
        upcomingExpirations
    } = await getStats();

    const stats = [
        {
            title: "Clientes Activos",
            value: activeClients,
            description: "Total de clientes con membresía activa.",
            icon: Users,
            color: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            title: "Ingresos Totales",
            value: `${totalIncome.toFixed(2)}`,
            description: "Suma de todos los pagos completados.",
            icon: CreditCard,
            color: "bg-green-100",
            iconColor: "text-green-600",
        },
        {
            title: "Suscripciones Activas",
            value: activeSubscriptions,
            description: "Total de suscripciones actualmente activas.",
            icon: Calendar,
            color: "bg-purple-100",
            iconColor: "text-purple-600",
        },
        {
            title: "Tasa de Renovación",
            value: "N/A", // No se puede calcular con el modelo actual
            description: "Dato no disponible.",
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
                            {recentActivity.length > 0 ? (
                                recentActivity.map(activity => (
                                    <div key={activity._id.toString()} className="flex items-center justify-between py-2 border-b">
                                        <div>
                                            <p className="font-medium text-sm">Pago recibido de {activity.client?.name || 'N/A'}</p>
                                            <p className="text-xs text-gray-500">${activity.amount.toFixed(2)}</p>
                                        </div>
                                        <span className="text-xs text-gray-400">{format(new Date(activity.date), "d MMM yyyy", { locale: es })}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No hay actividad reciente.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Próximos Vencimientos (7 días)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingExpirations.length > 0 ? (
                                upcomingExpirations.map(exp => (
                                    <div key={exp._id.toString()} className="flex items-center justify-between py-2 border-b">
                                        <div>
                                            <p className="font-medium text-sm">{exp.client?.name || 'N/A'}</p>
                                            <p className="text-xs text-gray-500">Plan {exp.plan}</p>
                                        </div>
                                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                            {format(new Date(exp.endDate), "d MMM", { locale: es })}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No hay vencimientos próximos.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}