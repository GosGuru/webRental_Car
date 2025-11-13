"use client"

import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
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
  return (
    <div className="space-y-4">
      {/* Preview de imágenes actuales */}
      {currentImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentImages.map((url, index) => (
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

      {/* Widget de subida */}
      {currentImages.length < maxFiles && (
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={(result: CloudinaryUploadWidgetResults) => {
            if (result.event === "success" && result.info && typeof result.info !== "string") {
              const newUrl = result.info.secure_url
              onUpload([...currentImages, newUrl])
            }
          }}
          options={{
            multiple: true,
            maxFiles: maxFiles - currentImages.length,
            resourceType: "image",
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
            maxFileSize: 5000000, // 5MB
            folder: "autosbustamante",
          }}
        >
          {({ open }) => (
            <Button
              type="button"
              variant="outline"
              onClick={() => open()}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Subir imágenes ({currentImages.length}/{maxFiles})
            </Button>
          )}
        </CldUploadWidget>
      )}

      <p className="text-sm text-muted-foreground">
        Formatos permitidos: JPG, PNG, WEBP. Tamaño máximo: 5MB por imagen.
      </p>
    </div>
  )
}
