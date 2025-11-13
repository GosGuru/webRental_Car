import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { VehicleForm } from "@/components/admin/VehicleForm"

async function getVehicle(id: string) {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
  })

  if (!vehicle) {
    notFound()
  }

  // Transformar para el formulario
  return {
    ...vehicle,
    images: vehicle.images.map(img => img.url),
  }
}

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const vehicle = await getVehicle(id)

  return (
    <VehicleForm
      initialData={vehicle}
      vehicleId={vehicle.id}
    />
  )
}
