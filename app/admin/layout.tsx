import { redirect } from "next/navigation"
import { auth } from "@/auth"
import Link from "next/link"
import { 
  LayoutDashboard, 
  Car, 
  FolderOpen, 
  MessageSquare, 
  Settings,
  LogOut,
  Menu
} from "lucide-react"
import { Button } from "@/components/ui/button"

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
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/admin" className="flex items-center gap-2">
              <Car className="h-6 w-6" />
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
            <NavLink href="/admin/categories" icon={FolderOpen}>
              Categorías
            </NavLink>
            <NavLink href="/admin/inquiries" icon={MessageSquare}>
              Consultas
            </NavLink>
            <NavLink href="/admin/settings" icon={Settings}>
              Configuración
            </NavLink>
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
      <div className="pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">Panel de Administración</h1>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/" target="_blank">
              Ver Sitio
            </Link>
          </Button>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
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
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      <Icon className="h-4 w-4" />
      {children}
    </Link>
  )
}
