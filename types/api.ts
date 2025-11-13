// Types for API responses
export interface VehicleImage {
  id: string
  url: string
  alt: string | null
  order: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
}

export interface Vehicle {
  id: string
  slug: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number | null
  fuelType: string
  transmission: string
  bodyType: string
  color: string | null
  doors: number | null
  seats: number | null
  engineSize: number | null
  horsePower: number | null
  description: string | null
  features: string[]
  isFeatured: boolean
  isVisible: boolean
  status: string
  images: VehicleImage[]
  category: Category | null
  createdAt: string
  updatedAt: string
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface VehiclesResponse {
  data: Vehicle[]
  pagination: PaginationMeta
}

export interface CategoriesResponse {
  data: Category[]
}
