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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">Vehículos</h2>
          <p className="text-sm lg:text-base text-muted-foreground mt-1">
            Gestiona el inventario de vehículos
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto min-h-11 touch-manipulation">
          <Link href="/admin/vehicles/new">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Vehículo
          </Link>
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-lg lg:text-xl">Listado de Vehículos ({vehicles.length})</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <VehiclesTable vehicles={vehicles} />
        </CardContent>
      </Card>
    </div>
  )
}
