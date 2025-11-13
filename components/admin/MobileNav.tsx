"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Car, 
  FolderOpen, 
  MessageSquare, 
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    href: "/admin",
    icon: LayoutDashboard,
    label: "Dashboard",
    activePattern: /^\/admin$/,
  },
  {
    href: "/admin/vehicles",
    icon: Car,
    label: "Vehículos",
    activePattern: /^\/admin\/vehicles/,
  },
  {
    href: "/admin/inquiries",
    icon: MessageSquare,
    label: "Consultas",
    activePattern: /^\/admin\/inquiries/,
  },
  {
    href: "/admin/categories",
    icon: FolderOpen,
    label: "Categorías",
    activePattern: /^\/admin\/categories/,
  },
  {
    href: "/admin/settings",
    icon: Settings,
    label: "Ajustes",
    activePattern: /^\/admin\/settings/,
  },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card shadow-lg lg:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = item.activePattern.test(pathname)
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 transition-all duration-200 min-w-16 touch-manipulation",
                "active:scale-95",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon 
                className={cn(
                  "h-5 w-5 transition-all",
                  isActive && "scale-110"
                )} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={cn(
                "text-[10px] font-medium leading-none",
                isActive && "font-semibold"
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
