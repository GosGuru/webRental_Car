import type { Metadata } from "next"
import { Mail, Phone, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { FadeInUp } from "@/components/AnimatedSections"
import { GeneralContactForm } from "@/components/contact/GeneralContactForm"

export const metadata: Metadata = {
  title: "Contacto - Autos Bustamante",
  description: "Póngase en contacto con Autos Bustamante. Estamos a su disposición para cualquier consulta sobre nuestros vehículos y servicios.",
  keywords: [
    "contacto",
    "autos bustamante",
    "concesionario cantabria",
    "contactar",
    "información",
  ],
  openGraph: {
    title: "Contacto - Autos Bustamante",
    description: "Póngase en contacto con nosotros para cualquier consulta.",
  },
}

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary/5 via-primary/10 to-background border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInUp>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Póngase en contacto con nosotros
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Estamos aquí para ayudarle
              </p>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Contact Form */}
              <FadeInUp>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Envíenos un mensaje
                  </h2>
                  <GeneralContactForm />
                </div>
              </FadeInUp>

              {/* Contact Info */}
              <FadeInUp delay={0.2}>
                <div className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Información de contacto
                  </h2>

                  {/* Phone */}
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Teléfono</h3>
                        <a
                          href="tel:+34674990691"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          34 674990691
                        </a>
                      </div>
                    </div>
                  </Card>

                  {/* Email */}
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          Correo electrónico
                        </h3>
                        <a
                          href="mailto:automovilesbustamante@gmail.com"
                          className="text-muted-foreground hover:text-primary transition-colors break-all"
                        >
                          automovilesbustamante@gmail.com
                        </a>
                      </div>
                    </div>
                  </Card>

                  {/* Address */}
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Dirección</h3>
                        <p className="text-muted-foreground">
                          Calle La Gloria 119
                          <br />
                          SANTANDER, 39012
                          <br />
                          Cantabria, Spain
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Map or Additional Info */}
                  <Card className="p-6 bg-primary/5">
                    <p className="text-sm text-muted-foreground">
                      Nuestro equipo está disponible para atenderle y resolver
                      todas sus dudas sobre nuestros vehículos y servicios.
                    </p>
                  </Card>
                </div>
              </FadeInUp>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
