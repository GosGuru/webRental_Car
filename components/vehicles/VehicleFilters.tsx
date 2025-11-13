"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, X } from "lucide-react"

interface VehicleFiltersProps {
  brands?: string[]
  categories?: Array<{ id: string; name: string }>
}

export function VehicleFilters({ brands = [], categories = [] }: VehicleFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [brand, setBrand] = useState(searchParams.get("brand") || "all")
  const [categoryId, setCategoryId] = useState(searchParams.get("categoryId") || "all")
  const [fuelType, setFuelType] = useState(searchParams.get("fuelType") || "all")
  const [transmission, setTransmission] = useState(searchParams.get("transmission") || "all")
  const [bodyType, setBodyType] = useState(searchParams.get("bodyType") || "all")
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "")
  const [minYear, setMinYear] = useState(searchParams.get("minYear") || "")
  const [maxYear, setMaxYear] = useState(searchParams.get("maxYear") || "")

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams()
    
    if (search) params.set("search", search)
    if (brand && brand !== "all") params.set("brand", brand)
    if (categoryId && categoryId !== "all") params.set("categoryId", categoryId)
    if (fuelType && fuelType !== "all") params.set("fuelType", fuelType)
    if (transmission && transmission !== "all") params.set("transmission", transmission)
    if (bodyType && bodyType !== "all") params.set("bodyType", bodyType)
    if (minPrice) params.set("minPrice", minPrice)
    if (maxPrice) params.set("maxPrice", maxPrice)
    if (minYear) params.set("minYear", minYear)
    if (maxYear) params.set("maxYear", maxYear)

    router.push(`/vehiculos?${params.toString()}`)
  }, [search, brand, categoryId, fuelType, transmission, bodyType, minPrice, maxPrice, minYear, maxYear, router])

  const clearFilters = () => {
    setSearch("")
    setBrand("all")
    setCategoryId("all")
    setFuelType("all")
    setTransmission("all")
    setBodyType("all")
    setMinPrice("")
    setMaxPrice("")
    setMinYear("")
    setMaxYear("")
    router.push("/vehiculos")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Filtros de Búsqueda
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Búsqueda */}
        <div>
          <Label htmlFor="search">Búsqueda General</Label>
          <Input
            id="search"
            placeholder="Buscar por marca, modelo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
          />
        </div>

        {/* Marca */}
        {brands.length > 0 && (
          <div>
            <Label htmlFor="brand">Marca</Label>
            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger id="brand">
                <SelectValue placeholder="Todas las marcas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las marcas</SelectItem>
                {brands.map((b: string) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Categoría */}
        {categories.length > 0 && (
          <div>
            <Label htmlFor="category">Categoría</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map((cat: any) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Combustible */}
        <div>
          <Label htmlFor="fuel">Combustible</Label>
          <Select value={fuelType} onValueChange={setFuelType}>
            <SelectTrigger id="fuel">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="GASOLINE">Gasolina</SelectItem>
              <SelectItem value="DIESEL">Diésel</SelectItem>
              <SelectItem value="ELECTRIC">Eléctrico</SelectItem>
              <SelectItem value="HYBRID">Híbrido</SelectItem>
              <SelectItem value="PLUGIN_HYBRID">Híbrido Enchufable</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transmisión */}
        <div>
          <Label htmlFor="transmission">Transmisión</Label>
          <Select value={transmission} onValueChange={setTransmission}>
            <SelectTrigger id="transmission">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="MANUAL">Manual</SelectItem>
              <SelectItem value="AUTOMATIC">Automático</SelectItem>
              <SelectItem value="SEMI_AUTOMATIC">Semiautomático</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tipo de Carrocería */}
        <div>
          <Label htmlFor="bodyType">Tipo de Carrocería</Label>
          <Select value={bodyType} onValueChange={setBodyType}>
            <SelectTrigger id="bodyType">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="SEDAN">Sedán</SelectItem>
              <SelectItem value="SUV">SUV</SelectItem>
              <SelectItem value="HATCHBACK">Compacto</SelectItem>
              <SelectItem value="COUPE">Coupé</SelectItem>
              <SelectItem value="CONVERTIBLE">Descapotable</SelectItem>
              <SelectItem value="WAGON">Familiar</SelectItem>
              <SelectItem value="VAN">Furgoneta</SelectItem>
              <SelectItem value="TRUCK">Camioneta</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Precio */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="minPrice">Precio Mín.</Label>
            <Input
              id="minPrice"
              type="number"
              placeholder="€"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="maxPrice">Precio Máx.</Label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="€"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Año */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="minYear">Año Mín.</Label>
            <Input
              id="minYear"
              type="number"
              placeholder="2000"
              value={minYear}
              onChange={(e) => setMinYear(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="maxYear">Año Máx.</Label>
            <Input
              id="maxYear"
              type="number"
              placeholder="2024"
              value={maxYear}
              onChange={(e) => setMaxYear(e.target.value)}
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-2 pt-4">
          <Button onClick={applyFilters} className="flex-1">
            Aplicar Filtros
          </Button>
          <Button onClick={clearFilters} variant="outline" size="icon">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
