import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo" },
        { status: 400 }
      )
    }

    // Convertir el archivo a buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Subir a Cloudinary usando upload_stream
    const uploadResponse = await new Promise<{secure_url: string; public_id: string}>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "autosbustamante",
          resource_type: "image",
          allowed_formats: ["jpg", "jpeg", "png", "webp"],
          max_file_size: 5000000, // 5MB
        },
        (error, result) => {
          if (error) reject(error)
          else if (result) resolve(result)
          else reject(new Error("No result from upload"))
        }
      )

      uploadStream.end(buffer)
    })

    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
    })
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error al subir la imagen" },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar imagen de Cloudinary
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const publicId = searchParams.get("publicId")

    if (!publicId) {
      return NextResponse.json(
        { error: "No se proporcionó el ID de la imagen" },
        { status: 400 }
      )
    }

    await cloudinary.uploader.destroy(publicId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error al eliminar la imagen" },
      { status: 500 }
    )
  }
}
