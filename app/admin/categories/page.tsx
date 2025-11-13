import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

async function getCategories() {
  return prisma.category.findMany({
    include: {
      _count: {
        select: { vehicles: true },
      },
    },
    orderBy: { name: "asc" },
  })
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Categorías</h2>
          <p className="text-sm lg:text-base text-muted-foreground">
            Organiza tus vehículos por categorías
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto min-h-11 touch-manipulation">
          <Link href="/admin/categories/new">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Categoría
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Listado de Categorías ({categories.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Vista móvil - Cards */}
          <div className="lg:hidden space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <span className="px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full shrink-0">
                    {category._count.vehicles} {category._count.vehicles === 1 ? 'vehículo' : 'vehículos'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium">Slug:</span> /{category.slug}
                </p>
                {category.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Vista desktop - Tabla */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Vehículos</TableHead>
                  <TableHead>Descripción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      /{category.slug}
                    </TableCell>
                    <TableCell>{category._count.vehicles}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {category.description || "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
