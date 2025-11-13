import { VehicleGridSkeleton } from "@/components/vehicles/VehicleCardSkeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-10 w-64 bg-muted animate-pulse rounded mb-2" />
        <div className="h-4 w-96 bg-muted animate-pulse rounded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filtros Skeleton */}
        <aside className="lg:col-span-1">
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-5 w-24 bg-muted animate-pulse rounded" />
                <div className="h-10 w-full bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>
        </aside>

        {/* Grid Skeleton */}
        <div className="lg:col-span-3">
          <VehicleGridSkeleton count={9} />
        </div>
      </div>
    </div>
  )
}
