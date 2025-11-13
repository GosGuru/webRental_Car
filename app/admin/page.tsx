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
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Resumen general de tu concesionario
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Vehículos
            </CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVehicles}</div>
            <p className="text-xs text-muted-foreground">
              En inventario total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.availableVehicles}</div>
            <p className="text-xs text-muted-foreground">
              Listos para venta
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendidos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.soldVehicles}</div>
            <p className="text-xs text-muted-foreground">
              Total de ventas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Valor Inventario
            </CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              €{stats.totalValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Vehículos disponibles
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Vehicles */}
      <Card>
        <CardHeader>
          <CardTitle>Vehículos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  {vehicle.images[0] ? (
                    <img
                      src={vehicle.images[0].url}
                      alt={vehicle.brand}
                      className="h-16 w-16 rounded object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded bg-muted">
                      <Car className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">
                      {vehicle.brand} {vehicle.model}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {vehicle.year} • {vehicle.status}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">€{vehicle.price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
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
