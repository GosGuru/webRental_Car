"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, Loader2 } from "lucide-react"
import Image from "next/image"

interface CloudinaryUploadWidgetProps {
  onUpload: (urls: string[]) => void
  currentImages?: string[]
  onRemove?: (url: string) => void
  maxFiles?: number
}

export default function CloudinaryUploadWidget({
  onUpload,
  currentImages = [],
  onRemove,
  maxFiles = 10,
}: CloudinaryUploadWidgetProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setError(null)

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Error al subir imagen")
        }

        const data = await response.json()
        return data.url
      })

      const urls = await Promise.all(uploadPromises)
      onUpload([...currentImages, ...urls])
    } catch (err) {
      console.error("Upload error:", err)
      setError(err instanceof Error ? err.message : "Error al subir imágenes")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Preview de imágenes actuales */}
      {currentImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentImages.map((url: string, index: number) => (
            <div key={index} className="relative group">
              <div className="relative aspect-video rounded-lg overflow-hidden border">
                <Image
                  src={url}
                  alt={`Imagen ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(url)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Botón de subida */}
      {currentImages.length < maxFiles && (
        <div>
          <input
            type="file"
            id="image-upload"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            max={maxFiles - currentImages.length}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("image-upload")?.click()}
            disabled={uploading}
            className="w-full"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Subir imágenes ({currentImages.length}/{maxFiles})
              </>
            )}
          </Button>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <p className="text-sm text-muted-foreground">
        Formatos permitidos: JPG, PNG, WEBP. Tamaño máximo: 5MB por imagen.
      </p>
    </div>
  )
}
