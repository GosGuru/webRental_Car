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
  priceNegotiable: boolean
  mileage: number | null
  fuelType: string | null
  transmission: string | null
  bodyType: string | null
  exteriorColor: string | null
  interiorColor: string | null
  doors: number | null
  seats: number | null
  engineSize: string | null
  enginePower: string | null
  description: string
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
