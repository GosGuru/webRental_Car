"use client"

import Link from "next/link"
import Image from "next/image"
import { Pencil, Trash2, Eye, Car, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
  BottomSheetClose,
} from "@/components/ui/bottom-sheet"

type VehicleCardProps = {
  vehicle: {
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
  onDelete: (id: string) => void
  formatPrice: (price: number) => string
  formatMileage: (mileage: number | null) => string
}

const statusConfig = {
  AVAILABLE: { label: "Disponible", variant: "success" as const },
  RESERVED: { label: "Reservado", variant: "warning" as const },
  SOLD: { label: "Vendido", variant: "destructive" as const },
  PENDING: { label: "Pendiente", variant: "info" as const },
}

export function VehicleCard({ vehicle, onDelete, formatPrice, formatMileage }: VehicleCardProps) {
  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden transition-all hover:shadow-md active:scale-[0.98]">
      {/* Imagen del vehículo */}
      <div className="relative h-48 bg-muted">
        {vehicle.images[0] ? (
          <Image
            src={vehicle.images[0].url}
            alt={`${vehicle.brand} ${vehicle.model}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Car className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        
        {/* Badges superiores */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5">
            {vehicle.isFeatured && (
              <Badge variant="warning" className="shadow-sm">
                ⭐ Destacado
              </Badge>
            )}
            <Badge
              variant={statusConfig[vehicle.status as keyof typeof statusConfig]?.variant || "secondary"}
              className="shadow-sm"
            >
              {statusConfig[vehicle.status as keyof typeof statusConfig]?.label || vehicle.status}
            </Badge>
          </div>
          
          {/* Botón de acciones */}
          <BottomSheet>
            <BottomSheetTrigger asChild>
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-9 w-9 rounded-full shadow-md bg-background/95 backdrop-blur-sm hover:bg-background touch-manipulation"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Más opciones</span>
              </Button>
            </BottomSheetTrigger>
            <BottomSheetContent>
              <BottomSheetHeader>
                <BottomSheetTitle>{vehicle.brand} {vehicle.model}</BottomSheetTitle>
              </BottomSheetHeader>
              
              <div className="flex flex-col gap-2 mt-4">
                <BottomSheetClose asChild>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full justify-start h-12 touch-manipulation"
                  >
                    <Link href={`/vehiculos/${vehicle.slug}`} target="_blank">
                      <Eye className="mr-2 h-4 w-4" />
                      Ver en sitio
                    </Link>
                  </Button>
                </BottomSheetClose>
                
                <BottomSheetClose asChild>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full justify-start h-12 touch-manipulation"
                  >
                    <Link href={`/admin/vehicles/${vehicle.id}/edit`}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar vehículo
                    </Link>
                  </Button>
                </BottomSheetClose>
                
                <BottomSheetClose asChild>
                  <Button
                    variant="destructive"
                    className="w-full justify-start h-12 touch-manipulation"
                    onClick={() => onDelete(vehicle.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar vehículo
                  </Button>
                </BottomSheetClose>
              </div>
            </BottomSheetContent>
          </BottomSheet>
        </div>
      </div>

      {/* Información del vehículo */}
      <div className="p-4">
        {/* Título */}
        <h3 className="font-bold text-lg mb-2 line-clamp-1">
          {vehicle.brand} {vehicle.model}
        </h3>

        {/* Metadata en grid */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Año</p>
            <p className="font-semibold text-sm">{vehicle.year}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Kilometraje</p>
            <p className="font-semibold text-sm">{formatMileage(vehicle.mileage)}</p>
          </div>
        </div>

        {/* Precio destacado */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Precio</p>
            <p className="text-xl font-bold text-primary">{formatPrice(vehicle.price)}</p>
          </div>
          
          <Badge variant={vehicle.isVisible ? "success" : "outline"} className="shrink-0">
            {vehicle.isVisible ? "Visible" : "Oculto"}
          </Badge>
        </div>
      </div>
    </div>
  )
}
