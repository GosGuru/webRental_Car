import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { Car, Euro, TrendingUp, Eye } from "lucide-react"

async function getStats() {
  const [
    totalVehicles,
    availableVehicles,
    soldVehicles,
    totalValue,
  ] = await Promise.all([
    prisma.vehicle.count(),
    prisma.vehicle.count({ where: { status: "AVAILABLE" } }),
    prisma.vehicle.count({ where: { status: "SOLD" } }),
    prisma.vehicle.aggregate({
      where: { status: "AVAILABLE" },
      _sum: { price: true },
    }),
  ])

  return {
    totalVehicles,
    availableVehicles,
    soldVehicles,
    totalValue: totalValue._sum.price || 0,
  }
}

async function getRecentVehicles() {
  return prisma.vehicle.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      images: {
        take: 1,
        orderBy: { order: "asc" },
      },
    },
  })
}

export default async function AdminDashboard() {
  const stats = await getStats()
  const recentVehicles = await getRecentVehicles()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
        <p className="text-sm lg:text-base text-muted-foreground mt-1">
          Resumen general de tu concesionario
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-semibold">
              Total Vehículos
            </CardTitle>
            <div className="h-7 w-7 lg:h-8 lg:w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Car className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold text-foreground">{stats.totalVehicles}</div>
            <p className="text-[10px] lg:text-xs text-muted-foreground mt-1">
              En inventario total
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-semibold">Disponibles</CardTitle>
            <div className="h-7 w-7 lg:h-8 lg:w-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <Eye className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold text-foreground">{stats.availableVehicles}</div>
            <p className="text-[10px] lg:text-xs text-muted-foreground mt-1">
              Listos para venta
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-semibold">Vendidos</CardTitle>
            <div className="h-7 w-7 lg:h-8 lg:w-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <TrendingUp className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold text-foreground">{stats.soldVehicles}</div>
            <p className="text-[10px] lg:text-xs text-muted-foreground mt-1">
              Total de ventas
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-semibold">
              Valor Inventario
            </CardTitle>
            <div className="h-7 w-7 lg:h-8 lg:w-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <Euro className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold text-foreground">
              €{stats.totalValue.toLocaleString()}
            </div>
            <p className="text-[10px] lg:text-xs text-muted-foreground mt-1">
              Vehículos disponibles
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Vehicles */}
      <Card className="shadow-sm">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-lg lg:text-xl">Vehículos Recientes</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {recentVehicles.map((vehicle: any) => (
              <div
                key={vehicle.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="relative h-14 w-16 sm:h-16 sm:w-20 overflow-hidden rounded-lg bg-muted shrink-0">
                    {vehicle.images[0] ? (
                      <img
                        src={vehicle.images[0].url}
                        alt={vehicle.brand}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Car className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm sm:text-base text-foreground truncate">
                      {vehicle.brand} {vehicle.model}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      {vehicle.year} • {vehicle.status}
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right shrink-0 pl-16 sm:pl-0">
                  <p className="font-bold text-sm sm:text-base text-foreground">€{vehicle.price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {vehicle.mileage?.toLocaleString()} km
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
