import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Suspense } from "react"
import { Car, CheckCircle, Shield, Euro, Phone, Mail, MapPin, ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { VehicleCard } from "@/components/vehicles/VehicleCard"
import { VehicleGridSkeleton } from "@/components/vehicles/VehicleCardSkeleton"
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimatedSections"
import { DraggableScrollContainer } from "@/components/vehicles/DraggableScrollContainer"

type VehicleWithRelations = Awaited<ReturnType<typeof getFeaturedVehicles>>[number]

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
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
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

        {/* Carrusel horizontal con flechas */}
        <div>
          <DraggableScrollContainer className="-mx-4 px-4">
            <div className="flex gap-6 min-w-min">
              {vehicles.map((vehicle: VehicleWithRelations, index: number) => (
                <div key={vehicle.id} className="w-[320px] md:w-[360px] shrink-0">
                  <VehicleCard vehicle={vehicle} priority={index < 3} />
                </div>
              ))}
            </div>
          </DraggableScrollContainer>
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/vehiculos">
              Todos nuestros vehículos
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
      <section className="relative border-b overflow-hidden min-h-[600px] md:min-h-[750px] flex items-center">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083"
            alt="Autos Bustamante - Concesionario"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          {/* Overlay oscuro - más suave en desktop */}
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30 md:from-black/60 md:via-black/40 md:to-transparent" />
        </div>

        {/* Contenido - Centrado en desktop */}
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl md:mx-auto md:text-center">
            <FadeInUp>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 text-white leading-tight md:leading-tight lg:leading-tight">
                Concesionario de confianza en{" "}
                <span className="text-primary block md:inline mt-2 md:mt-0">Cantabria, Santander</span>
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 md:mb-12 max-w-3xl md:mx-auto leading-relaxed">
                Venta de vehículos de segunda mano con garantía y financiación. 
                Encuentra tu coche ideal al mejor precio.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 md:justify-center mb-16 md:mb-20">
                <Button size="lg" asChild className="shadow-lg h-14 md:h-16 text-base md:text-lg px-8">
                  <Link href="/vehiculos">
                    Quiero ver autos Bustamante
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 shadow-lg h-14 md:h-16 text-base md:text-lg px-8">
                  <a href="tel:+34675689111">
                    <Phone className="mr-2 h-5 w-5" />
                    Llámanos: 675 689 111
                  </a>
                </Button>
              </div>
            </FadeInUp>
            
            {/* Stats */}
            <FadeInUp delay={0.3}>
              <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-4xl md:mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 md:p-8 border border-white/20 transition-all hover:bg-white/15 hover:scale-105">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">1000+</div>
                  <div className="text-xs md:text-sm lg:text-base text-gray-200">Vehículos vendidos</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 md:p-8 border border-white/20 transition-all hover:bg-white/15 hover:scale-105">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">500+</div>
                  <div className="text-xs md:text-sm lg:text-base text-gray-200">Clientes satisfechos</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 md:p-8 border border-white/20 transition-all hover:bg-white/15 hover:scale-105">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">5+</div>
                  <div className="text-xs md:text-sm lg:text-base text-gray-200">Años en el negocio</div>
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
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">¿Por qué elegir Autos Bustamante?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nos comprometemos a ofrecerte la mejor experiencia en la compra de tu vehículo
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StaggerItem>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <Car className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Amplio inventario</h3>
                    <p className="text-sm text-muted-foreground">
                      Contamos con un amplio inventario de vehículos de diferentes marcas, modelos y precios. Podrás encontrar el vehículo que se ajuste a tus necesidades y presupuesto.
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Experiencia y conocimiento</h3>
                    <p className="text-sm text-muted-foreground">
                      Nuestro equipo de expertos en automóviles cuenta con años de experiencia en la industria. Ellos conocen el mercado y pueden brindarte asesoramiento experto para ayudarte a tomar la mejor decisión de compra o venta.
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
                    <h3 className="font-semibold mb-2">Proceso transparente</h3>
                    <p className="text-sm text-muted-foreground">
                      Nos enorgullece brindar un proceso transparente y confiable. Te proporcionaremos toda la información necesaria sobre el historial del vehículo, su condición y cualquier detalle relevante para que puedas tomar una decisión informada.
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
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Visítanos o Contáctanos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estamos aquí para ayudarte a encontrar el vehículo perfecto
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Teléfono</h3>
                    <a href="tel:+34675689111" className="text-sm text-primary hover:underline block mb-2">
                      675 689 111
                    </a>
                    <a 
                      href="https://wa.me/34675689111" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#25D366] hover:bg-[#20BA5A] px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      WhatsApp
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
                  <div>
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
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Dirección</h3>
                      <p className="text-sm text-muted-foreground">
                        Camino de Alcolea, 27<br />
                        14940 Cabra, Córdoba
                      </p>
                    </div>
                  </div>
                  {/* Google Maps Embed */}
                  <div className="relative w-full h-32 rounded-lg overflow-hidden border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d-4.4297!3d37.4719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6dd6b8c8c8c8c8%3A0x8c8c8c8c8c8c8c8!2sCamino%20de%20Alcolea%2C%2027%2C%2014940%20Cabra%2C%20C%C3%B3rdoba!5e0!3m2!1ses!2ses!4v1699999999999!5m2!1ses!2ses"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación de Autos Bustamante"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link href="/vehiculos">
                Nuestros vehículos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
