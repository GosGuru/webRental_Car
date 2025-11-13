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

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const mainImage = vehicle.images[0]?.url || "https://placehold.co/800x600/e5e7eb/6b7280?text=Sin+Imagen"
  const imageAlt = vehicle.images[0]?.alt || `${vehicle.brand} ${vehicle.model}`

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        {vehicle.isFeatured && (
          <Badge className="absolute top-4 right-4 z-10" variant="destructive">
            Destacado
          </Badge>
        )}
        <Link href={`/vehiculos/${vehicle.slug}`}>
          <div className="relative w-full h-64 bg-neutral-100">
            <Image
              src={mainImage}
              alt={imageAlt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              quality={75}
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
