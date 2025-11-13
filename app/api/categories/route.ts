import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET /api/categories - Listar todas las categorías
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { vehicles: true },
        },
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json(
      { error: "Error al obtener categorías" },
      { status: 500 }
    )
  }
}

// POST /api/categories - Crear nueva categoría (admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, icon } = body

    if (!name) {
      return NextResponse.json(
        { error: "Nombre es requerido" },
        { status: 400 }
      )
    }

    // Generar slug
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")

    // Crear categoría
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        icon,
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json(
      { error: "Error al crear categoría" },
      { status: 500 }
    )
  }
}
