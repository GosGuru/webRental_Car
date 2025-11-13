import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Suspense } from "react"
import { Car, CheckCircle, Shield, Euro, Phone, Mail, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { VehicleCard } from "@/components/vehicles/VehicleCard"
import { VehicleGridSkeleton } from "@/components/vehicles/VehicleCardSkeleton"
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimatedSections"

export const metadata: Metadata = {
  title: "Inicio - Venta de Coches de Segunda Mano en Cantabria, Santander",
  description: "Bienvenido a Autos Bustamante, concesionario de confianza en Cantabria, Santander. Venta de coches de segunda mano con garantía y las mejores ofertas.",
}

async function getFeaturedVehicles() {
  return prisma.vehicle.findMany({
    where: {
      isVisible: true,
      isFeatured: true,
      status: "AVAILABLE",
    },
    include: {
      images: {
        take: 1,
        orderBy: { order: "asc" },
      },
      category: true,
    },
    take: 12,
    orderBy: { createdAt: "desc" },
  })
}

async function getStats() {
  const [total, available] = await Promise.all([
    prisma.vehicle.count({ where: { isVisible: true } }),
    prisma.vehicle.count({ where: { isVisible: true, status: "AVAILABLE" } }),
  ])
  
  return { total, available }
}

async function FeaturedVehicles() {
  const vehicles = await getFeaturedVehicles()
  
  if (vehicles.length === 0) return null

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4" suppressHydrationWarning>
        <div className="flex items-center justify-between mb-8" suppressHydrationWarning>
          <div suppressHydrationWarning>
            <h2 className="text-3xl font-bold mb-2">Vehículos Destacados</h2>
            <p className="text-muted-foreground">
              Descubre nuestras mejores ofertas seleccionadas para ti
            </p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href="/vehiculos">
              Ver Todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Carrusel horizontal */}
        <div className="relative" suppressHydrationWarning>
          {/* Indicador de scroll */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-linear-to-l from-background via-background to-transparent w-24 h-full pointer-events-none z-10 hidden lg:block" />
          
          <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide" suppressHydrationWarning>
            <div className="flex gap-6 min-w-min" suppressHydrationWarning>
              {vehicles.map((vehicle: any, index: number) => (
                <div key={vehicle.id} className="w-[320px] md:w-[360px] shrink-0">
                  <VehicleCard vehicle={vehicle} priority={index < 3} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Texto de ayuda para móvil */}
          <p className="text-sm text-muted-foreground text-center mt-4 lg:hidden">
            Desliza para ver más vehículos →
          </p>
        </div>

        <div className="text-center mt-8" suppressHydrationWarning>
          <Button variant="outline" asChild>
            <Link href="/vehiculos">
              Ver Catálogo Completo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default async function HomePage() {
  const stats = await getStats()

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary/5 via-primary/10 to-background border-b">
        <div className="container mx-auto px-4 py-20 md:py-28" suppressHydrationWarning>
          <div className="max-w-3xl" suppressHydrationWarning>
            <FadeInUp>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                Concesionario de confianza en{" "}
                <span className="text-primary">Cantabria, Santander</span>
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Venta de vehículos de segunda mano con garantía y financiación. 
                Encuentra tu coche ideal al mejor precio.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4" suppressHydrationWarning>
                <Button size="lg" asChild>
                  <Link href="/vehiculos">
                    Quiero ver autos Bustamante
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:+34675689111">
                    <Phone className="mr-2 h-5 w-5" />
                    Llámanos: 675 689 111
                  </a>
                </Button>
              </div>
            </FadeInUp>
            
            {/* Stats */}
            <FadeInUp delay={0.3}>
              <div className="grid grid-cols-2 gap-6 mt-12 max-w-md" suppressHydrationWarning>
                <div suppressHydrationWarning>
                  <div className="text-3xl font-bold text-primary">{stats.available}+</div>
                  <div className="text-sm text-muted-foreground">Vehículos Disponibles</div>
                </div>
                <div suppressHydrationWarning>
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Años de Experiencia</div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Vehículos Destacados - Ahora justo después del hero */}
      <Suspense fallback={<VehicleGridSkeleton count={6} />}>
        <FeaturedVehicles />
      </Suspense>

      {/* Por qué elegirnos */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4" suppressHydrationWarning>
          <FadeInUp>
            <div className="text-center mb-12" suppressHydrationWarning>
              <h2 className="text-3xl font-bold mb-4">¿Por qué elegir Autos Bustamante?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nos comprometemos a ofrecerte la mejor experiencia en la compra de tu vehículo
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" suppressHydrationWarning>
              <StaggerItem>
                <Card>
                  <CardContent className="p-6 text-center" suppressHydrationWarning>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4" suppressHydrationWarning>
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Vehículos Verificados</h3>
                    <p className="text-sm text-muted-foreground">
                      Todos nuestros coches pasan una inspección exhaustiva
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Garantía Incluida</h3>
                    <p className="text-sm text-muted-foreground">
                      Garantía en todos nuestros vehículos para tu tranquilidad
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <Euro className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Financiación</h3>
                    <p className="text-sm text-muted-foreground">
                      Opciones de financiación adaptadas a tus necesidades
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <Car className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Amplio Catálogo</h3>
                    <p className="text-sm text-muted-foreground">
                      Gran variedad de marcas y modelos para elegir
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Contacto y Ubicación */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4" suppressHydrationWarning>
          <div className="text-center mb-12" suppressHydrationWarning>
            <h2 className="text-3xl font-bold mb-4">Visítanos o Contáctanos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estamos aquí para ayudarte a encontrar el vehículo perfecto
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto" suppressHydrationWarning>
            <Card>
              <CardContent className="p-6" suppressHydrationWarning>
                <div className="flex items-start gap-4" suppressHydrationWarning>
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0" suppressHydrationWarning>
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div suppressHydrationWarning>
                    <h3 className="font-semibold mb-1">Teléfono</h3>
                    <a href="tel:+34675689111" className="text-sm text-primary hover:underline">
                      675 689 111
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div suppressHydrationWarning>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:autosbustamante@hotmail.com" className="text-sm text-primary hover:underline break-all">
                      autosbustamante@hotmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div suppressHydrationWarning>
                    <h3 className="font-semibold mb-1">Dirección</h3>
                    <p className="text-sm text-muted-foreground">
                      Camino de Alcolea, 27<br />
                      14940 Cabra, Córdoba
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8" suppressHydrationWarning>
            <Button asChild size="lg">
              <Link href="/vehiculos">
                Explorar Catálogo Completo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
