"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Car } from "lucide-react"
import { Button } from "@/components/ui/button"

type ImageType = {
  id: string
  url: string
  alt: string | null
}

export function VehicleGallery({
  images,
  vehicleTitle,
}: {
  images: ImageType[]
  vehicleTitle: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
        <div className="flex h-full items-center justify-center">
          <Car className="h-24 w-24 text-muted-foreground" />
        </div>
      </div>
    )
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      {/* Imagen principal */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted group">
        <Image
          src={images[currentIndex].url}
          alt={images[currentIndex].alt || vehicleTitle}
          fill
          className="object-cover"
          priority={currentIndex === 0}
          loading={currentIndex === 0 ? "eager" : "lazy"}
          quality={85}
          sizes="(max-width: 768px) 100vw, 66vw"
        />

        {/* Controles de navegación */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Indicador de imagen actual */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {images.map((image: any, index: number) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-video overflow-hidden rounded-lg border-2 transition-all ${
                index === currentIndex
                  ? "border-primary ring-2 ring-primary"
                  : "border-transparent hover:border-muted-foreground/50"
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt || `${vehicleTitle} ${index + 1}`}
                fill
                className="object-cover"
                loading="lazy"
                quality={60}
                sizes="(max-width: 768px) 25vw, 10vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
