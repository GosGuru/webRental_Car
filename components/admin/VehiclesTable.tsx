"use client"

import { useState } from "react"
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

const statusColors = {
  AVAILABLE: "bg-green-500",
  RESERVED: "bg-yellow-500",
  SOLD: "bg-red-500",
  PENDING: "bg-blue-500",
}

const statusLabels = {
  AVAILABLE: "Disponible",
  RESERVED: "Reservado",
  SOLD: "Vendido",
  PENDING: "Pendiente",
}

export function VehiclesTable({ vehicles }: { vehicles: Vehicle[] }) {
  const [search, setSearch] = useState("")

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
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por marca, modelo o año..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
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
              filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>
                    {vehicle.images[0] ? (
                      <Image
                        src={vehicle.images[0].url}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        width={60}
                        height={60}
                        className="rounded object-cover"
                      />
                    ) : (
                      <div className="flex h-[60px] w-[60px] items-center justify-center rounded bg-muted">
                        <Car className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {vehicle.brand} {vehicle.model}
                      </p>
                      {vehicle.isFeatured && (
                        <Badge variant="secondary" className="mt-1">
                          Destacado
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{vehicle.year}</TableCell>
                  <TableCell className="font-medium">
                    €{vehicle.price.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusColors[vehicle.status as keyof typeof statusColors]}
                    >
                      {statusLabels[vehicle.status as keyof typeof statusLabels]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={vehicle.isVisible ? "default" : "outline"}>
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
