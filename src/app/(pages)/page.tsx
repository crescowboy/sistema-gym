import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage () {
  return (
            <section className="text-center flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">Administra tu gimnasio en un solo lugar</h1>
      <p className="text-gray-600 max-w-md mb-6">
        Controla tus pagos, clientes y suscripciones desde un solo lugar
      </p>
      <Link href="/login">
        <Button className="text-lg px-6">Empezar ahora</Button>
      </Link>
    </section>
  )
}