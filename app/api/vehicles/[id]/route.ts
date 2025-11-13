import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"

const vehicleUpdateSchema = z.object({
  brand: z.string().min(1).optional(),
  model: z.string().min(1).optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
  price: z.number().positive().optional(),
  priceNegotiable: z.boolean().optional(),
  status: z.enum(["AVAILABLE", "RESERVED", "SOLD", "PENDING"]).optional(),
  isVisible: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  mileage: z.number().int().positive().optional(),
  fuelType: z.enum(["GASOLINE", "DIESEL", "ELECTRIC", "HYBRID", "PLUGIN_HYBRID", "GAS"]).optional(),
  transmission: z.enum(["MANUAL", "AUTOMATIC", "SEMI_AUTOMATIC"]).optional(),
  bodyType: z.enum(["SEDAN", "COUPE", "HATCHBACK", "WAGON", "SUV", "PICKUP", "VAN", "CONVERTIBLE", "MINIVAN"]).optional(),
  exteriorColor: z.string().optional(),
  interiorColor: z.string().optional(),
  doors: z.number().int().positive().optional(),
  seats: z.number().int().positive().optional(),
  engineSize: z.string().optional(),
  enginePower: z.string().optional(),
  description: z.string().min(10).optional(),
  features: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  categoryId: z.string().nullable().optional(),
})

// GET /api/vehicles/[id] - Obtener vehículo por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { order: "asc" },
        },
        category: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!vehicle) {
      return NextResponse.json(
        { error: "Vehículo no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json(vehicle)
  } catch (error) {
    console.error("Error fetching vehicle:", error)
    return NextResponse.json(
      { error: "Error al obtener vehículo" },
      { status: 500 }
    )
  }
}

// PUT /api/vehicles/[id] - Actualizar vehículo
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()
    
    // Validar datos
    const validatedData = vehicleUpdateSchema.parse(body)

    // Verificar que el vehículo existe
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id },
    })

    if (!existingVehicle) {
      return NextResponse.json(
        { error: "Vehículo no encontrado" },
        { status: 404 }
      )
    }

    // Actualizar slug si cambió marca, modelo o año
    let slug = existingVehicle.slug
    if (
      validatedData.brand || 
      validatedData.model || 
      validatedData.year
    ) {
      const brand = validatedData.brand || existingVehicle.brand
      const model = validatedData.model || existingVehicle.model
      const year = validatedData.year || existingVehicle.year

      slug = `${brand}-${model}-${year}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")

      // Verificar si el nuevo slug ya existe (en otro vehículo)
      const slugExists = await prisma.vehicle.findFirst({
        where: {
          slug,
          id: { not: id },
        },
      })

      if (slugExists) {
        slug = `${slug}-${Date.now()}`
      }
    }

    // Extraer imágenes del body
    const { images: imageUrls, ...updateData } = validatedData

    // Actualizar vehículo
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        ...updateData,
        slug,
        // Si hay imágenes, reemplazar todas
        ...(imageUrls && {
          images: {
            deleteMany: {}, // Eliminar todas las imágenes existentes
            create: imageUrls.map((url, index) => ({
              url,
              altText: `${existingVehicle.brand} ${existingVehicle.model} - Imagen ${index + 1}`,
              order: index,
            })),
          },
        }),
      },
      include: {
        images: {
          orderBy: { order: "asc" },
        },
        category: true,
      },
    })

    return NextResponse.json(vehicle)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Error updating vehicle:", error)
    return NextResponse.json(
      { error: "Error al actualizar vehículo" },
      { status: 500 }
    )
  }
}

// DELETE /api/vehicles/[id] - Eliminar vehículo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    // Verificar que el vehículo existe
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    })

    if (!vehicle) {
      return NextResponse.json(
        { error: "Vehículo no encontrado" },
        { status: 404 }
      )
    }

    // Eliminar vehículo (las imágenes se eliminan en cascada)
    await prisma.vehicle.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Vehículo eliminado correctamente" })
  } catch (error) {
    console.error("Error deleting vehicle:", error)
    return NextResponse.json(
      { error: "Error al eliminar vehículo" },
      { status: 500 }
    )
  }
}
