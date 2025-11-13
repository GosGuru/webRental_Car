import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"

const contactSchema = z.object({
  name: z.string().min(2),
  message: z.string().min(10),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Guardamos el mensaje de contacto general como una inquiry sin vehículo asociado
    const inquiry = await prisma.inquiry.create({
      data: {
        name: validatedData.name,
        email: "contacto-general@autosbustamante.com", // Email por defecto para contactos generales
        message: validatedData.message,
        status: "PENDING",
      },
    })

    return NextResponse.json(inquiry, { status: 201 })
  } catch (error) {
    console.error("Error creating contact:", error)
    return NextResponse.json(
      { error: "Error al enviar el mensaje" },
      { status: 400 }
    )
  }
}
