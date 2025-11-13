import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Phone, MapPin, Car, Shield, CheckCircle, ArrowRight } from "lucide-react"
import { FadeInUp } from "@/components/AnimatedSections"

export const metadata: Metadata = {
  title: "Sobre Nosotros - Autos Bustamante",
  description: "Conoce más sobre Autos Bustamante, líderes en el mercado de compra y venta de vehículos en Cantabria. Experiencia, confianza y el mejor servicio.",
  keywords: [
    "sobre nosotros",
    "autos bustamante",
    "concesionario cantabria",
    "compra venta vehículos",
    "empresa confianza",
  ],
  openGraph: {
    title: "Sobre Nosotros - Autos Bustamante",
    description: "Líderes en el mercado de compra y venta de vehículos en Cantabria.",
  },
}

export default function SobreNosotrosPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary/5 via-primary/10 to-background border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInUp>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Conócenos
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Líderes en el mercado de compra y venta de vehículos
              </p>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* ¿Quiénes somos? Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeInUp>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                ¿Quiénes somos?
              </h2>
            </FadeInUp>
            
            <FadeInUp delay={0.1}>
              <Card className="p-8 md:p-12 shadow-lg">
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-6">
                  <strong className="text-foreground">Autos Bustamante</strong> es una empresa dedicada a la compra y venta de todo tipo de vehículos, con especialización en automóviles. Nuestro objetivo es proporcionar un servicio de excelencia a nuestros clientes, ayudándolos a encontrar y adquirir el vehículo que desean de manera rápida y segura.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-6">
                  Contamos con un equipo de expertos en automóviles que se encarga de seleccionar los mejores vehículos disponibles en el mercado y ofrecerlos a precios competitivos.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                  Nuestra experiencia y conocimiento nos permite brindar asesoramiento experto para que nuestros clientes tomen la mejor decisión de compra o venta.
                </p>
              </Card>
            </FadeInUp>

            {/* Valores */}
            <FadeInUp delay={0.2}>
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Car className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Experiencia</h3>
                  <p className="text-muted-foreground">
                    Años de trayectoria en el sector automotriz
                  </p>
                </Card>

                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Confianza</h3>
                  <p className="text-muted-foreground">
                    Vehículos verificados y con garantía
                  </p>
                </Card>

                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Calidad</h3>
                  <p className="text-muted-foreground">
                    Los mejores vehículos a precios competitivos
                  </p>
                </Card>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-linear-to-br from-primary/5 via-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeInUp>
              <Card className="p-8 md:p-12 shadow-lg text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  ¿Interesado en comprar o vender un vehículo?
                </h2>
                <p className="text-xl md:text-2xl text-primary font-semibold mb-6">
                  Contáctanos hoy mismo
                </p>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Si estás buscando un nuevo vehículo o deseas vender el tuyo, estaremos encantados de ayudarte. Nuestro equipo de expertos está listo para brindarte el mejor servicio y asesoramiento. ¡No dudes en contactarnos!
                </p>

                {/* Contact Options */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Button size="lg" asChild>
                    <a href="tel:+34675689111">
                      <Phone className="mr-2 h-5 w-5" />
                      Llamar: 675 689 111
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/vehiculos">
                      Ver Vehículos
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>

                {/* Additional Contact Info */}
                <div className="grid md:grid-cols-2 gap-4 mt-8 pt-8 border-t">
                  <div className="flex items-center justify-center gap-3 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Cantabria, Santander</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-muted-foreground">
                    <Phone className="h-5 w-5 text-primary" />
                    <a href="tel:+34675689111" className="hover:text-primary transition-colors">
                      675 689 111
                    </a>
                  </div>
                </div>
              </Card>
            </FadeInUp>
          </div>
        </div>
      </section>
    </main>
  )
}
