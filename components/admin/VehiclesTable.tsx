"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Eye, 
  Car,
  Search 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { VehicleCard } from "./VehicleCard"

type Vehicle = {
  id: string
  brand: string
  model: string
  year: number
  price: number
  status: string
  isVisible: boolean
  isFeatured: boolean
  mileage: number | null
  slug: string
  images: { url: string }[]
}

const statusConfig = {
  AVAILABLE: { label: "Disponible", variant: "success" as const },
  RESERVED: { label: "Reservado", variant: "warning" as const },
  SOLD: { label: "Vendido", variant: "destructive" as const },
  PENDING: { label: "Pendiente", variant: "info" as const },
}

// Función de formateo consistente para evitar errores de hidratación
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price)
}

const formatMileage = (mileage: number | null) => {
  if (!mileage) return "-"
  return new Intl.NumberFormat("es-ES").format(mileage) + " km"
}

export function VehiclesTable({ vehicles }: { vehicles: Vehicle[] }) {
  const [search, setSearch] = useState("")
  const [mounted, setMounted] = useState(false)

  // Evitar errores de hidratación esperando a que el componente se monte
  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchLower = search.toLowerCase()
    return (
      vehicle.brand.toLowerCase().includes(searchLower) ||
      vehicle.model.toLowerCase().includes(searchLower) ||
      vehicle.year.toString().includes(searchLower)
    )
  })

  async function handleDelete(id: string) {
    if (!confirm("¿Estás seguro de eliminar este vehículo?")) return

    try {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        window.location.reload()
      } else {
        alert("Error al eliminar vehículo")
      }
    } catch (error) {
      alert("Error al eliminar vehículo")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 bg-muted/30 p-3 rounded-lg">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por marca, modelo o año..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      {/* Vista móvil - Grid de cards */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredVehicles.length === 0 ? (
          <div className="col-span-full flex flex-col items-center gap-3 py-12 text-muted-foreground">
            <Car className="h-12 w-12" />
            <p className="text-sm">No se encontraron vehículos</p>
          </div>
        ) : (
          filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onDelete={handleDelete}
              formatPrice={formatPrice}
              formatMileage={formatMileage}
            />
          ))
        )}
      </div>

      {/* Vista desktop - Tabla */}
      <div className="hidden lg:block rounded-lg border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Imagen</TableHead>
              <TableHead>Vehículo</TableHead>
              <TableHead>Año</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Kilometraje</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Visibilidad</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Car className="h-8 w-8" />
                    <p>No se encontraron vehículos</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredVehicles.map((vehicle: any) => (
                <TableRow key={vehicle.id}>
                  <TableCell>
                    <div className="relative h-14 w-20 overflow-hidden rounded-md bg-muted">
                      {vehicle.images[0] ? (
                        <Image
                          src={vehicle.images[0].url}
                          alt={`${vehicle.brand} ${vehicle.model}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Car className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="min-w-[180px]">
                      <p className="font-semibold text-foreground">
                        {vehicle.brand} {vehicle.model}
                      </p>
                      {vehicle.isFeatured && (
                        <Badge variant="warning" className="mt-1.5">
                          ⭐ Destacado
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{vehicle.year}</TableCell>
                  <TableCell>
                    <span className="font-semibold text-foreground">
                      {mounted ? formatPrice(vehicle.price) : `€${vehicle.price}`}
                    </span>
                  </TableCell>
                  <TableCell>
                    {mounted ? formatMileage(vehicle.mileage) : (vehicle.mileage || "-")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={statusConfig[vehicle.status as keyof typeof statusConfig]?.variant || "secondary"}
                    >
                      {statusConfig[vehicle.status as keyof typeof statusConfig]?.label || vehicle.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={vehicle.isVisible ? "success" : "outline"}>
                      {vehicle.isVisible ? "Visible" : "Oculto"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/vehiculos/${vehicle.slug}`} target="_blank">
                            <Eye className="mr-2 h-4 w-4" />
                            Ver
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/vehicles/${vehicle.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(vehicle.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
