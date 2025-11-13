import { Suspense } from "react"
import type { Metadata } from "next"
import { VehicleCard } from "@/components/vehicles/VehicleCard"
import { VehicleFilters } from "@/components/vehicles/VehicleFilters"
import { VehicleGridSkeleton } from "@/components/vehicles/VehicleCardSkeleton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import prisma from "@/lib/prisma"

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

async function getVehicles(params: SearchParams) {
  try {
    const page = parseInt(params.page || "1")
    const limit = 12
    const skip = (page - 1) * limit

    // Construir filtros
    const where: any = {
      isVisible: true,
      status: "AVAILABLE",
    }

    if (params.brand) where.brand = { contains: params.brand, mode: "insensitive" }
    if (params.categoryId) where.categoryId = params.categoryId
    if (params.fuelType) where.fuelType = params.fuelType
    if (params.transmission) where.transmission = params.transmission
    if (params.bodyType) where.bodyType = params.bodyType
    
    if (params.minPrice || params.maxPrice) {
      where.price = {}
      if (params.minPrice) where.price.gte = parseFloat(params.minPrice)
      if (params.maxPrice) where.price.lte = parseFloat(params.maxPrice)
    }
    
    if (params.minYear || params.maxYear) {
      where.year = {}
      if (params.minYear) where.year.gte = parseInt(params.minYear)
      if (params.maxYear) where.year.lte = parseInt(params.maxYear)
    }
    
    if (params.search) {
      where.OR = [
        { brand: { contains: params.search, mode: "insensitive" } },
        { model: { contains: params.search, mode: "insensitive" } },
        { description: { contains: params.search, mode: "insensitive" } },
      ]
    }

    // Obtener vehículos y total
    const [vehicles, total] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        skip,
        take: limit,
        include: {
          images: {
            orderBy: { order: "asc" },
            take: 1,
          },
          category: true,
        },
        orderBy: [
          { isFeatured: "desc" },
          { createdAt: "desc" },
        ],
      }),
      prisma.vehicle.count({ where }),
    ])

    return {
      data: vehicles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return null
  }
}

async function getBrands(): Promise<string[]> {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { isVisible: true, status: "AVAILABLE" },
      select: { brand: true },
      distinct: ['brand'],
      orderBy: { brand: 'asc' },
    })
    
    return vehicles.map(v => v.brand)
  } catch (error) {
    console.error('Error fetching brands:', error)
    return []
  }
}

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    })
    
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
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
        {vehicles.map((vehicle) => (
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
