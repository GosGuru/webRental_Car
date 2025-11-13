"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Car, Menu, X } from "lucide-react"
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
              <Car className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline">Autos Bustamante</span>
            <span className="sm:hidden">AB</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/vehiculos"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/vehiculos") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Catálogo
            </Link>
            <a
              href="tel:+34675689111"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              675 689 111
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button asChild>
              <Link href="/vehiculos">Ver Vehículos</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
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
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Inicio
              </Link>
              <Link
                href="/vehiculos"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/vehiculos") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Catálogo
              </Link>
              <a
                href="tel:+34675689111"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Llamar: 675 689 111
              </a>
              <Button asChild className="w-full">
                <Link href="/vehiculos" onClick={() => setMobileMenuOpen(false)}>
                  Ver Vehículos
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
