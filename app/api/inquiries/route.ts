import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"

const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  vehicleId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = inquirySchema.parse(body)

    const inquiry = await prisma.inquiry.create({
      data: {
        ...validatedData,
        status: "PENDING",
      },
    })

    return NextResponse.json(inquiry, { status: 201 })
  } catch (error) {
    console.error("Error creating inquiry:", error)
    return NextResponse.json(
      { error: "Error al crear consulta" },
      { status: 400 }
    )
  }
}

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      include: {
        vehicle: {
          select: {
            brand: true,
            model: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(inquiries)
  } catch (error) {
    console.error("Error fetching inquiries:", error)
    return NextResponse.json(
      { error: "Error al obtener consultas" },
      { status: 500 }
    )
  }
}
