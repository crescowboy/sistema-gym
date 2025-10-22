import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Bienvenido al panel del gym</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600">
                        Desde aqui puedes gestionar clientes, pagos y suscripciones.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}