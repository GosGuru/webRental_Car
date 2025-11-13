"use client"

import { useState } from "react"
import { Menu, LogOut, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  FolderOpen, 
  MessageSquare, 
  Settings,
} from "lucide-react"

interface MobileMenuProps {
  userName?: string | null
  userEmail?: string | null
}

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/vehicles", icon: Car, label: "Vehículos" },
  { href: "/admin/categories", icon: FolderOpen, label: "Categorías" },
  { href: "/admin/inquiries", icon: MessageSquare, label: "Consultas" },
  { href: "/admin/settings", icon: Settings, label: "Configuración" },
]

export function MobileMenu({ userName, userEmail }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden touch-manipulation">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b p-6 bg-primary/5">
          <SheetTitle className="flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <span>Admin Panel</span>
          </SheetTitle>
        </SheetHeader>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200",
                  "touch-manipulation min-h-11",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-primary/5 hover:text-primary"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User info & logout */}
        <div className="border-t p-4 mt-auto">
          <div className="mb-3 px-2">
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
          </div>
          <form action="/api/auth/signout" method="POST">
            <Button 
              variant="ghost" 
              className="w-full justify-start min-h-11 touch-manipulation" 
              type="submit"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
