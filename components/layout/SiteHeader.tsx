"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/98 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - Más grande y prominente */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 transition-all group-hover:scale-105">
              <Image
                src="/logo-autosbustamante.webp"
                alt="Autos Bustamante"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="font-bold text-xl text-foreground leading-tight">Autos Bustamante</span>
              <span className="text-sm text-primary font-medium">Cantabria, Santander</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-semibold transition-colors hover:text-primary relative group ${
                isActive("/") ? "text-primary" : "text-foreground"
              }`}
            >
              Inicio
              {isActive("/") && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
            <Link
              href="/vehiculos"
              className={`text-sm font-semibold transition-colors hover:text-primary relative group ${
                isActive("/vehiculos") ? "text-primary" : "text-foreground"
              }`}
            >
              Vehículos
              {isActive("/vehiculos") && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
            <Link
              href="/sobre-nosotros"
              className={`text-sm font-semibold transition-colors hover:text-primary relative group ${
                isActive("/sobre-nosotros") ? "text-primary" : "text-foreground"
              }`}
            >
              Sobre Nosotros
              {isActive("/sobre-nosotros") && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
            <Link
              href="/contacto"
              className={`text-sm font-semibold transition-colors hover:text-primary relative group ${
                isActive("/contacto") ? "text-primary" : "text-foreground"
              }`}
            >
              Contacto
              {isActive("/contacto") && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          </nav>

          {/* CTA - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="tel:+34675689111"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">675 689 111</span>
            </a>
            <Button asChild size="default" className="shadow-md">
              <Link href="/vehiculos">Ver Vehículos</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold px-4 py-3 rounded-lg transition-colors ${
                  isActive("/") 
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground hover:bg-muted"
                }`}
              >
                Inicio
              </Link>
              <Link
                href="/vehiculos"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold px-4 py-3 rounded-lg transition-colors ${
                  isActive("/vehiculos") 
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground hover:bg-muted"
                }`}
              >
                Vehículos
              </Link>
              <Link
                href="/sobre-nosotros"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold px-4 py-3 rounded-lg transition-colors ${
                  isActive("/sobre-nosotros") 
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground hover:bg-muted"
                }`}
              >
                Sobre Nosotros
              </Link>
              <Link
                href="/contacto"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold px-4 py-3 rounded-lg transition-colors ${
                  isActive("/contacto") 
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground hover:bg-muted"
                }`}
              >
                Contacto
              </Link>
              <a
                href="tel:+34675689111"
                className="text-base font-medium px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors flex items-center gap-2"
              >
                <Phone className="h-5 w-5 text-primary" />
                675 689 111
              </a>
              <div className="px-4 pt-2">
                <Button asChild className="w-full" size="lg">
                  <Link href="/vehiculos">Ver Vehículos</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
