import Link from "next/link"
import { Car, Phone, Mail, MapPin } from "lucide-react"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
                <Car className="h-5 w-5" />
              </div>
              <span>Autos Bustamante</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Tu concesionario de confianza en Cabra, Córdoba. Venta de vehículos de segunda mano con garantía.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/vehiculos" className="text-muted-foreground hover:text-primary transition-colors">
                  Catálogo de Vehículos
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">
                  Panel Administrativo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+34675689111" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  675 689 111
                </a>
              </li>
              <li>
                <a href="mailto:autosbustamante@hotmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  autosbustamante@hotmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Ubicación */}
          <div>
            <h3 className="font-semibold mb-4">Ubicación</h3>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <div>
                <p>Camino de Alcolea, 27</p>
                <p>14940 Cabra, Córdoba</p>
                <p className="mt-2">España</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Autos Bustamante. Todos los derechos reservados.</p>
        </div>
      </div>

      {/* JSON-LD Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDealer",
            name: "Autos Bustamante",
            url: "https://autosbustamante.com",
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
          }),
        }}
      />
    </footer>
  )
}
