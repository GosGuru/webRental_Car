import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, Calendar, Gauge, Fuel, Cog, Car, MapPin, Phone, Mail } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import prisma from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { VehicleGallery } from "@/components/vehicles/VehicleGallery"
import { ContactForm } from "@/components/vehicles/ContactForm"

async function getVehicle(slug: string) {
  const vehicle = await prisma.vehicle.findUnique({
    where: { slug, isVisible: true },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
      category: true,
    },
  })

  if (!vehicle) {
    notFound()
  }

  return vehicle
}

async function getSimilarVehicles(slug: string, brand: string) {
  return prisma.vehicle.findMany({
    where: {
      slug: { not: slug },
      brand,
      isVisible: true,
      status: "AVAILABLE",
    },
    include: {
      images: {
        take: 1,
        orderBy: { order: "asc" },
      },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  })
}

const fuelTypeLabels: Record<string, string> = {
  GASOLINE: "Gasolina",
  DIESEL: "Diésel",
  ELECTRIC: "Eléctrico",
  HYBRID: "Híbrido",
  PLUGIN_HYBRID: "Híbrido Enchufable",
  GAS: "Gas",
}

const transmissionLabels: Record<string, string> = {
  MANUAL: "Manual",
  AUTOMATIC: "Automático",
  SEMI_AUTOMATIC: "Semiautomático",
}

const bodyTypeLabels: Record<string, string> = {
  SEDAN: "Sedán",
  COUPE: "Coupé",
  HATCHBACK: "Hatchback",
  WAGON: "Familiar",
  SUV: "SUV",
  PICKUP: "Pickup",
  VAN: "Monovolumen",
  CONVERTIBLE: "Descapotable",
  MINIVAN: "Minivan",
}

// Generar metadata dinámica para SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const vehicle = await prisma.vehicle.findUnique({
    where: { slug, isVisible: true },
    include: {
      images: {
        take: 1,
        orderBy: { order: "asc" },
      },
    },
  })

  if (!vehicle) {
    return {
      title: "Vehículo no encontrado - Autos Bustamante",
    }
  }

  const title = `${vehicle.brand} ${vehicle.model} ${vehicle.year} - ${vehicle.price.toLocaleString('es-ES')}€`
  const description = vehicle.description.length > 160 
    ? vehicle.description.substring(0, 157) + "..." 
    : vehicle.description

  const imageUrl = vehicle.images[0]?.url || "/placeholder-car.jpg"
  const url = `https://autosbustamante.com/vehiculos/${slug}`

  return {
    title,
    description,
    keywords: [
      vehicle.brand,
      vehicle.model,
      `${vehicle.brand} ${vehicle.model}`,
      "coches segunda mano",
      "venta de coches",
      vehicle.fuelType ? fuelTypeLabels[vehicle.fuelType] : "",
      vehicle.transmission ? transmissionLabels[vehicle.transmission] : "",
      `coches ${vehicle.year}`,
      "Autos Bustamante",
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: "website",
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
        },
      ],
      siteName: "Autos Bustamante",
      locale: "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const vehicle = await getVehicle(slug)
  const similarVehicles = await getSimilarVehicles(slug, vehicle.brand)

  // Mensaje de WhatsApp predefinido
  const whatsappNumber = "34675689111" // Número sin el + ni espacios
  const whatsappMessage = `Hola, estoy interesado en el ${vehicle.brand} ${vehicle.model} ${vehicle.year}. ¿Podrían darme más información?`
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="min-h-screen bg-background">
      {/* Header con breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/vehiculos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al listado
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal - Galería e información */}
          <div className="lg:col-span-2 space-y-6">
            {/* Galería de imágenes */}
            <VehicleGallery images={vehicle.images} vehicleTitle={`${vehicle.brand} ${vehicle.model}`} />

            {/* Información principal */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h1 className="text-3xl font-bold">
                        {vehicle.brand} {vehicle.model}
                      </h1>
                      <p className="text-muted-foreground text-lg">
                        {vehicle.year}
                      </p>
                    </div>
                    {vehicle.isFeatured && (
                      <Badge className="bg-primary">Destacado</Badge>
                    )}
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    €{vehicle.price.toLocaleString()}
                  </div>
                </div>

                <Separator />

                {/* Características principales */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {vehicle.year && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Año</p>
                        <p className="font-medium">{vehicle.year}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.mileage && (
                    <div className="flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Kilometraje</p>
                        <p className="font-medium">{vehicle.mileage.toLocaleString()} km</p>
                      </div>
                    </div>
                  )}
                  {vehicle.fuelType && (
                    <div className="flex items-center gap-2">
                      <Fuel className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Combustible</p>
                        <p className="font-medium">{fuelTypeLabels[vehicle.fuelType]}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.transmission && (
                    <div className="flex items-center gap-2">
                      <Cog className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Transmisión</p>
                        <p className="font-medium">{transmissionLabels[vehicle.transmission]}</p>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Especificaciones detalladas */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Especificaciones</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {vehicle.bodyType && (
                      <div>
                        <p className="text-sm text-muted-foreground">Carrocería</p>
                        <p className="font-medium">{bodyTypeLabels[vehicle.bodyType]}</p>
                      </div>
                    )}
                    {vehicle.engineSize && (
                      <div>
                        <p className="text-sm text-muted-foreground">Cilindrada</p>
                        <p className="font-medium">{vehicle.engineSize}</p>
                      </div>
                    )}
                    {vehicle.enginePower && (
                      <div>
                        <p className="text-sm text-muted-foreground">Potencia</p>
                        <p className="font-medium">{vehicle.enginePower}</p>
                      </div>
                    )}
                    {vehicle.doors && (
                      <div>
                        <p className="text-sm text-muted-foreground">Puertas</p>
                        <p className="font-medium">{vehicle.doors}</p>
                      </div>
                    )}
                    {vehicle.seats && (
                      <div>
                        <p className="text-sm text-muted-foreground">Plazas</p>
                        <p className="font-medium">{vehicle.seats}</p>
                      </div>
                    )}
                    {vehicle.exteriorColor && (
                      <div>
                        <p className="text-sm text-muted-foreground">Color Exterior</p>
                        <p className="font-medium">{vehicle.exteriorColor}</p>
                      </div>
                    )}
                    {vehicle.interiorColor && (
                      <div>
                        <p className="text-sm text-muted-foreground">Color Interior</p>
                        <p className="font-medium">{vehicle.interiorColor}</p>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Descripción */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Descripción</h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {vehicle.description}
                  </p>
                </div>

                {/* Características */}
                {vehicle.features && vehicle.features.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Equipamiento</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {vehicle.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Vehículos similares */}
            {similarVehicles.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Vehículos Similares</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {similarVehicles.map((similar: any) => (
                    <Link
                      key={similar.id}
                      href={`/vehiculos/${similar.slug}`}
                      className="group"
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative aspect-video">
                          {similar.images[0] ? (
                            <Image
                              src={similar.images[0].url}
                              alt={`${similar.brand} ${similar.model}`}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                              loading="lazy"
                              quality={75}
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center bg-muted">
                              <Car className="h-12 w-12 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-semibold">
                            {similar.brand} {similar.model}
                          </h4>
                          <p className="text-sm text-muted-foreground">{similar.year}</p>
                          <p className="text-lg font-bold text-primary mt-2">
                            €{similar.price.toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Contacto */}
          <div className="space-y-6">
            {/* Información de contacto */}
            <Card className="sticky top-4">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">¿Te interesa este vehículo?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contacta con nosotros para más información o para agendar una visita.
                  </p>
                </div>

                {/* Botón de WhatsApp destacado */}
                <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp className="h-5 w-5" />
                    Contactar por WhatsApp
                  </a>
                </Button>

                <Separator />

                <div className="space-y-3">
                  <a
                    href="tel:+34675689111"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Teléfono</p>
                      <p className="font-medium">675 689 111</p>
                    </div>
                  </a>

                  <a
                    href="mailto:autosbustamante@hotmail.com"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-sm">autosbustamante@hotmail.com</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Dirección</p>
                      <p className="font-medium text-sm">
                        Camino de Alcolea, 27
                        <br />
                        14940 Cabra, Córdoba
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <ContactForm vehicleId={vehicle.id} vehicleName={`${vehicle.brand} ${vehicle.model}`} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data para SEO */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Car",
            name: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
            description: vehicle.description,
            brand: {
              "@type": "Brand",
              name: vehicle.brand,
            },
            model: vehicle.model,
            vehicleModelDate: vehicle.year,
            productionDate: vehicle.year.toString(),
            mileageFromOdometer: {
              "@type": "QuantitativeValue",
              value: vehicle.mileage || 0,
              unitCode: "KMT",
            },
            fuelType: vehicle.fuelType || undefined,
            vehicleTransmission: vehicle.transmission || undefined,
            bodyType: vehicle.bodyType || undefined,
            color: vehicle.exteriorColor || undefined,
            numberOfDoors: vehicle.doors || undefined,
            seatingCapacity: vehicle.seats || undefined,
            offers: {
              "@type": "Offer",
              price: vehicle.price,
              priceCurrency: "EUR",
              availability: vehicle.status === "AVAILABLE" 
                ? "https://schema.org/InStock" 
                : "https://schema.org/OutOfStock",
              seller: {
                "@type": "AutoDealer",
                name: "Autos Bustamante",
                telephone: "+34675689111",
                email: "autosbustamante@hotmail.com",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Camino de Alcolea, 27",
                  addressLocality: "Cabra",
                  addressRegion: "Córdoba",
                  postalCode: "14940",
                  addressCountry: "ES",
                },
              },
            },
            image: vehicle.images.map((img: any) => img.url),
            url: `https://autosbustamante.com/vehiculos/${vehicle.slug}`,
          }),
        }}
      />
    </div>
  )
}
