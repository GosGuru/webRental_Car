import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://autosbustamante.com'

  // Obtener todos los vehículos visibles
  const vehicles = await prisma.vehicle.findMany({
    where: { isVisible: true },
    select: {
      slug: true,
      updatedAt: true,
    },
  })

  // Rutas de vehículos
  const vehicleUrls = vehicles.map((vehicle) => ({
    url: `${baseUrl}/vehiculos/${vehicle.slug}`,
    lastModified: vehicle.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Rutas estáticas
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/vehiculos`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  return [...staticUrls, ...vehicleUrls]
}
