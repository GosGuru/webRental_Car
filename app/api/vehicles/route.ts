import { NextRequest, NextResponse } from "next/server"
import { z, ZodError } from "zod"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

// Schema de validación para crear/actualizar vehículos
const vehicleSchema = z.object({
  brand: z.string().min(1, "Marca es requerida"),
  model: z.string().min(1, "Modelo es requerido"),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  price: z.number().positive("Precio debe ser positivo"),
  priceNegotiable: z.boolean().optional().default(false),
  status: z.enum(["AVAILABLE", "RESERVED", "SOLD", "PENDING"]).optional().default("AVAILABLE"),
  isVisible: z.boolean().optional().default(true),
  isFeatured: z.boolean().optional().default(false),
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
  vin: z.string().optional(),
  licensePlate: z.string().optional(),
  previousOwners: z.number().int().optional(),
  description: z.string().min(10, "Descripción debe tener al menos 10 caracteres"),
  features: z.array(z.string()).optional().default([]),
  images: z.array(z.string()).optional().default([]),
  categoryId: z.string().optional(),
})

// GET /api/vehicles - Listar vehículos con filtros
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parámetros de paginación
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const skip = (page - 1) * limit

    // Filtros
    const brand = searchParams.get("brand")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const minYear = searchParams.get("minYear")
    const maxYear = searchParams.get("maxYear")
    const fuelType = searchParams.get("fuelType")
    const transmission = searchParams.get("transmission")
    const bodyType = searchParams.get("bodyType")
    const categoryId = searchParams.get("categoryId")
    const status = searchParams.get("status") || "AVAILABLE"
    const search = searchParams.get("search")
    const featured = searchParams.get("featured")

    // Construir filtros dinámicos
    const where: Prisma.VehicleWhereInput = {
      isVisible: true,
    }

    if (status) {
      where.status = status as any
    }

    if (brand) where.brand = { contains: brand, mode: "insensitive" }
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }
    if (minYear || maxYear) {
      where.year = {}
      if (minYear) where.year.gte = parseInt(minYear)
      if (maxYear) where.year.lte = parseInt(maxYear)
    }
    if (fuelType) where.fuelType = fuelType as any
    if (transmission) where.transmission = transmission as any
    if (bodyType) where.bodyType = bodyType as any
    if (categoryId) where.categoryId = categoryId
    if (featured === "true") where.isFeatured = true
    
    if (search) {
      where.OR = [
        { brand: { contains: search, mode: "insensitive" } },
        { model: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
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
            take: 1, // Solo primera imagen para listado
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

    return NextResponse.json({
      data: vehicles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching vehicles:", error)
    return NextResponse.json(
      { error: "Error al obtener vehículos" },
      { status: 500 }
    )
  }
}

// POST /api/vehicles - Crear nuevo vehículo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar datos
    const validatedData = vehicleSchema.parse(body)

    // Generar slug único
    const slug = `${validatedData.brand}-${validatedData.model}-${validatedData.year}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")

    // Verificar si slug ya existe
    const existingSlug = await prisma.vehicle.findUnique({
      where: { slug },
    })

    const finalSlug = existingSlug 
      ? `${slug}-${Date.now()}` 
      : slug

    // Extraer imágenes del body
    const { images: imageUrls, ...vehicleData } = validatedData

    // Crear vehículo con imágenes
    const vehicle = await prisma.vehicle.create({
      data: {
        ...vehicleData,
        slug: finalSlug,
        images: imageUrls && imageUrls.length > 0 ? {
          create: imageUrls.map((url, index) => ({
            url,
            altText: `${validatedData.brand} ${validatedData.model} - Imagen ${index + 1}`,
            order: index,
          })),
        } : undefined,
      },
      include: {
        images: true,
        category: true,
      },
    })

    return NextResponse.json(vehicle, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Error creating vehicle:", error)
    return NextResponse.json(
      { error: "Error al crear vehículo" },
      { status: 500 }
    )
  }
}
