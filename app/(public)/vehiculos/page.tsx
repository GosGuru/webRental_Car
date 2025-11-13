import { Suspense } from "react"
import type { Metadata } from "next"
import { VehicleCard } from "@/components/vehicles/VehicleCard"
import { VehicleFilters } from "@/components/vehicles/VehicleFilters"
import { VehicleGridSkeleton } from "@/components/vehicles/VehicleCardSkeleton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Vehicle, VehiclesResponse, CategoriesResponse } from "@/types/api"

export const metadata: Metadata = {
  title: "Catálogo de Vehículos - Coches de Segunda Mano",
  description: "Explora nuestro catálogo completo de vehículos de segunda mano. Filtra por marca, precio, año y características. Encuentra tu coche ideal en Autos Bustamante.",
  keywords: [
    "catálogo coches",
    "vehículos segunda mano",
    "comprar coche usado",
    "coches ocasión Córdoba",
    "ofertas coches",
  ],
  openGraph: {
    title: "Catálogo de Vehículos - Autos Bustamante",
    description: "Explora nuestro catálogo completo de vehículos de segunda mano con filtros avanzados.",
  },
}

interface SearchParams {
  search?: string
  brand?: string
  categoryId?: string
  fuelType?: string
  transmission?: string
  bodyType?: string
  minPrice?: string
  maxPrice?: string
  minYear?: string
  maxYear?: string
  page?: string
}

async function getVehicles(params: SearchParams): Promise<VehiclesResponse | null> {
  try {
    const searchParams = new URLSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.set(key, value)
    })

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/vehicles?${searchParams.toString()}`,
      { 
        cache: 'no-store',
        next: { revalidate: 30 } // Revalidar cada 30 segundos
      }
    )

    if (!res.ok) {
      console.error('Failed to fetch vehicles:', res.status)
      return null
    }

    return res.json()
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return null
  }
}

async function getBrands(): Promise<string[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/vehicles?limit=1000`,
      { cache: 'no-store' }
    )
    
    if (!res.ok) return []
    
    const data: VehiclesResponse = await res.json()
    if (!data.data) return []
    
    const brands = [...new Set(data.data.map((v: Vehicle) => v.brand))].sort()
    return brands
  } catch (error) {
    console.error('Error fetching brands:', error)
    return []
  }
}

async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/categories`,
    { cache: 'no-store' }
  )
  
  if (!res.ok) return []
  
  const data: CategoriesResponse = await res.json()
  return data.data || []
}

async function VehicleGrid({ params }: { params: SearchParams }) {
  const data = await getVehicles(params)
  
  if (!data) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-6xl">🚗</div>
        <h2 className="text-2xl font-bold">Base de Datos No Configurada</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Para ver los vehículos, necesitas configurar la base de datos PostgreSQL.
          Consulta el archivo <code className="bg-muted px-2 py-1 rounded">FASE2-COMPLETADA.md</code> para instrucciones completas.
        </p>
        <div className="mt-6 p-4 bg-muted rounded-lg max-w-lg mx-auto text-left text-sm">
          <p className="font-semibold mb-2">Opción 1: Prisma Postgres (Recomendado - Gratis)</p>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground mb-4">
            <li>Ejecutar: <code className="bg-background px-1">npx prisma generate --sql</code></li>
            <li>Crear DB: <code className="bg-background px-1">npx prisma db push</code></li>
            <li>Copiar DATABASE_URL automática a .env</li>
            <li>Recargar esta página</li>
          </ol>
          <p className="font-semibold mb-2 mt-4">Opción 2: PostgreSQL en la nube</p>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
            <li>Crear DB en Neon.tech o Supabase</li>
            <li>Agregar DATABASE_URL a .env</li>
            <li>Ejecutar: <code className="bg-background px-1">npm run db:migrate</code></li>
            <li>Recargar esta página</li>
          </ol>
        </div>
      </div>
    )
  }
  
  const vehicles = data.data || []
  const pagination = data.pagination

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No se encontraron vehículos con los filtros seleccionados.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle: Vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      {/* Paginación */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {pagination.page > 1 && (
            <Button asChild variant="outline">
              <Link href={`/vehiculos?${new URLSearchParams({ ...params, page: String(pagination.page - 1) }).toString()}`}>
                Anterior
              </Link>
            </Button>
          )}
          
          <div className="flex items-center gap-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum: number) => (
              <Button
                key={pageNum}
                asChild
                variant={pageNum === pagination.page ? "default" : "outline"}
                size="sm"
              >
                <Link href={`/vehiculos?${new URLSearchParams({ ...params, page: String(pageNum) }).toString()}`}>
                  {pageNum}
                </Link>
              </Button>
            ))}
          </div>

          {pagination.page < pagination.totalPages && (
            <Button asChild variant="outline">
              <Link href={`/vehiculos?${new URLSearchParams({ ...params, page: String(pagination.page + 1) }).toString()}`}>
                Siguiente
              </Link>
            </Button>
          )}
        </div>
      )}
    </>
  )
}

export default async function VehiculosPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const brands = await getBrands()
  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Nuestros Vehículos</h1>
        <p className="text-muted-foreground">
          Encuentra el vehículo perfecto para ti
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filtros - Sidebar */}
        <aside className="lg:col-span-1">
          <VehicleFilters brands={brands} categories={categories} />
        </aside>

        {/* Grid de Vehículos */}
        <div className="lg:col-span-3">
          <Suspense fallback={<VehicleGridSkeleton />}>
            <VehicleGrid params={params} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
