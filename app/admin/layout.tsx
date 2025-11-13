import { redirect } from "next/navigation"
import { auth } from "@/auth"
import Link from "next/link"
import { 
  LayoutDashboard, 
  Car, 
  // FolderOpen, 
  MessageSquare, 
  // Settings,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/admin/MobileNav"
import { MobileMenu } from "@/components/admin/MobileMenu"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-muted/20" suppressHydrationWarning>
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:z-40 lg:flex lg:h-screen lg:w-64 lg:flex-col lg:border-r lg:bg-card lg:shadow-sm">
        <div className="flex h-full flex-col" suppressHydrationWarning>
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6 bg-primary/5" suppressHydrationWarning>
            <Link href="/admin" className="flex items-center gap-2 group">
              <Car className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
              <span className="font-bold text-lg">Admin Panel</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            <NavLink href="/admin" icon={LayoutDashboard}>
              Dashboard
            </NavLink>
            <NavLink href="/admin/vehicles" icon={Car}>
              Vehículos
            </NavLink>
            {/* <NavLink href="/admin/categories" icon={FolderOpen}>
              Categorías
            </NavLink> */}
            <NavLink href="/admin/inquiries" icon={MessageSquare}>
              Consultas
            </NavLink>
            {/* <NavLink href="/admin/settings" icon={Settings}>
              Configuración
            </NavLink> */}
          </nav>

          {/* User info & logout */}
          <div className="border-t p-4">
            <div className="mb-3 px-2">
              <p className="text-sm font-medium">{session.user.name}</p>
              <p className="text-xs text-muted-foreground">{session.user.email}</p>
            </div>
            <form action="/api/auth/signout" method="POST">
              <Button variant="ghost" className="w-full justify-start" type="submit">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64 pb-16 lg:pb-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-4 lg:px-6 shadow-sm">
          <MobileMenu userName={session.user.name} userEmail={session.user.email} />
          <div className="flex-1">
            <h1 className="text-lg lg:text-xl font-semibold">Panel de Administración</h1>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/" target="_blank">
              Ver Sitio
            </Link>
          </Button>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6 animate-in fade-in duration-300">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
}

function NavLink({
  href,
  icon: Icon,
  children,
}: {
  href: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
    >
      <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
      {children}
    </Link>
  )
}
