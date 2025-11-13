import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Fuel, Gauge, Cog } from "lucide-react"

interface VehicleCardProps {
  vehicle: {
    id: string
    slug: string
    brand: string
    model: string
    year: number
    price: number
    mileage: number | null
    fuelType: string | null
    transmission: string | null
    isFeatured: boolean
    images: Array<{
      url: string
      alt: string | null
    }>
  }
  priority?: boolean
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price)
}

const formatMileage = (mileage: number | null) => {
  if (!mileage) return "N/A"
  return new Intl.NumberFormat("es-ES").format(mileage) + " km"
}

const getFuelTypeLabel = (type: string | null) => {
  if (!type) return "N/A"
  const labels: Record<string, string> = {
    GASOLINE: "Gasolina",
    DIESEL: "Diésel",
    ELECTRIC: "Eléctrico",
    HYBRID: "Híbrido",
    PLUGIN_HYBRID: "Híbrido Enchufable",
  }
  return labels[type] || type
}

const getTransmissionLabel = (type: string | null) => {
  if (!type) return "N/A"
  const labels: Record<string, string> = {
    MANUAL: "Manual",
    AUTOMATIC: "Automático",
    SEMI_AUTOMATIC: "Semiautomático",
  }
  return labels[type] || type
}

export function VehicleCard({ vehicle, priority = false }: VehicleCardProps) {
  const mainImage = vehicle.images[0]?.url || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23e5e7eb' width='800' height='600'/%3E%3Ctext fill='%236b7280' font-family='sans-serif' font-size='32' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3ESin Imagen%3C/text%3E%3C/svg%3E"
  const imageAlt = vehicle.images[0]?.alt || `${vehicle.brand} ${vehicle.model}`

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        {vehicle.isFeatured && (
          <Badge className="absolute top-4 right-4 z-10" variant="destructive">
            Destacado
          </Badge>
        )}
        <Link href={`/vehiculos/${vehicle.slug}`}>
          <div className="relative w-full h-64 bg-neutral-100 overflow-hidden">
            <Image
              src={mainImage}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-500 ease-out hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading={priority ? "eager" : "lazy"}
              priority={priority}
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            />
          </div>
        </Link>
      </CardHeader>
      
      <CardContent className="p-6">
        <Link href={`/vehiculos/${vehicle.slug}`} className="group">
          <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
            {vehicle.brand} {vehicle.model}
          </h3>
        </Link>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="w-4 h-4" />
            <span>{formatMileage(vehicle.mileage)}</span>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <Fuel className="w-3 h-3" />
            {getFuelTypeLabel(vehicle.fuelType)}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Cog className="w-3 h-3" />
            {getTransmissionLabel(vehicle.transmission)}
          </Badge>
        </div>

        <p className="text-3xl font-bold text-primary">
          {formatPrice(vehicle.price)}
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/vehiculos/${vehicle.slug}`}>Ver Detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
