import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { VehiclesTable } from "@/components/admin/VehiclesTable"

async function getVehicles() {
  return prisma.vehicle.findMany({
    include: {
      images: {
        take: 1,
        orderBy: { order: "asc" },
      },
      category: true,
    },
    orderBy: { createdAt: "desc" },
  })
}

export default async function VehiclesPage() {
  const vehicles = await getVehicles()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Vehículos</h2>
          <p className="text-muted-foreground">
            Gestiona el inventario de vehículos
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/vehicles/new">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Vehículo
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Vehículos ({vehicles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <VehiclesTable vehicles={vehicles} />
        </CardContent>
      </Card>
    </div>
  )
}
