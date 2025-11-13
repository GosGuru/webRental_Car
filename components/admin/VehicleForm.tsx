"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import CloudinaryUploadWidget from "@/components/admin/CloudinaryUploadWidget"

const vehicleSchema = z.object({
  brand: z.string().min(1, "Marca es requerida"),
  model: z.string().min(1, "Modelo es requerido"),
  images: z.array(z.string()).optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  price: z.number().positive("Precio debe ser positivo"),
  mileage: z.number().int().positive().optional(),
  fuelType: z.enum(["GASOLINE", "DIESEL", "ELECTRIC", "HYBRID", "PLUGIN_HYBRID", "GAS"]).optional(),
  transmission: z.enum(["MANUAL", "AUTOMATIC", "SEMI_AUTOMATIC"]).optional(),
  bodyType: z.enum(["SEDAN", "COUPE", "HATCHBACK", "WAGON", "SUV", "PICKUP", "VAN", "CONVERTIBLE", "MINIVAN"]).optional(),
  engineSize: z.string().optional(),
  enginePower: z.string().optional(),
  doors: z.number().int().positive().optional(),
  seats: z.number().int().positive().optional(),
  exteriorColor: z.string().optional(),
  interiorColor: z.string().optional(),
  description: z.string().min(10, "Descripción debe tener al menos 10 caracteres"),
  status: z.enum(["AVAILABLE", "RESERVED", "SOLD", "PENDING"]),
  isVisible: z.boolean(),
  isFeatured: z.boolean(),
})

type VehicleFormData = z.infer<typeof vehicleSchema>

export function VehicleForm({
  initialData,
  vehicleId,
}: {
  initialData?: Partial<VehicleFormData>
  vehicleId?: string
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<string[]>(initialData?.images || [])

  const form = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: initialData || {
      status: "AVAILABLE",
      isVisible: true,
      isFeatured: false,
      images: [],
    },
  })

  async function onSubmit(data: VehicleFormData) {
    setIsLoading(true)

    try {
      const url = vehicleId ? `/api/vehicles/${vehicleId}` : "/api/vehicles"
      const method = vehicleId ? "PUT" : "POST"

      // Incluir las imágenes en los datos
      const vehicleData = {
        ...data,
        images,
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vehicleData),
      })

      if (!res.ok) {
        throw new Error("Error al guardar vehículo")
      }

      router.push("/admin/vehicles")
      router.refresh()
    } catch (error) {
      alert("Error al guardar vehículo")
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/vehicles">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {vehicleId ? "Editar Vehículo" : "Nuevo Vehículo"}
          </h2>
          <p className="text-muted-foreground">
            {vehicleId ? "Actualiza los detalles del vehículo" : "Agrega un nuevo vehículo al inventario"}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marca</FormLabel>
                      <FormControl>
                        <Input placeholder="BMW" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modelo</FormLabel>
                      <FormControl>
                        <Input placeholder="X5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Año</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="2020"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio (€)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="25000"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mileage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kilometraje</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="50000"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Especificaciones Técnicas</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fuelType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Combustible</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="GASOLINE">Gasolina</SelectItem>
                          <SelectItem value="DIESEL">Diésel</SelectItem>
                          <SelectItem value="ELECTRIC">Eléctrico</SelectItem>
                          <SelectItem value="HYBRID">Híbrido</SelectItem>
                          <SelectItem value="PLUGIN_HYBRID">Híbrido Enchufable</SelectItem>
                          <SelectItem value="GAS">Gas</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="transmission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transmisión</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MANUAL">Manual</SelectItem>
                          <SelectItem value="AUTOMATIC">Automático</SelectItem>
                          <SelectItem value="SEMI_AUTOMATIC">Semiautomático</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="bodyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carrocería</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SEDAN">Sedán</SelectItem>
                          <SelectItem value="HATCHBACK">Hatchback</SelectItem>
                          <SelectItem value="SUV">SUV</SelectItem>
                          <SelectItem value="COUPE">Coupé</SelectItem>
                          <SelectItem value="WAGON">Familiar</SelectItem>
                          <SelectItem value="VAN">Monovolumen</SelectItem>
                          <SelectItem value="PICKUP">Pickup</SelectItem>
                          <SelectItem value="CONVERTIBLE">Descapotable</SelectItem>
                          <SelectItem value="MINIVAN">Minivan</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="doors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Puertas</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="5"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seats"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plazas</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="5"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="engineSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cilindrada</FormLabel>
                      <FormControl>
                        <Input placeholder="2.0L" {...field} />
                      </FormControl>
                      <FormDescription>Ej: 1.5L, 2.0L</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="enginePower"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Potencia</FormLabel>
                      <FormControl>
                        <Input placeholder="150CV" {...field} />
                      </FormControl>
                      <FormDescription>Ej: 150CV, 200HP</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="exteriorColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color Exterior</FormLabel>
                      <FormControl>
                        <Input placeholder="Blanco" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interiorColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color Interior</FormLabel>
                      <FormControl>
                        <Input placeholder="Negro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Imágenes del Vehículo</CardTitle>
            </CardHeader>
            <CardContent>
              <CloudinaryUploadWidget
                onUpload={setImages}
                currentImages={images}
                onRemove={(url) => setImages(images.filter((img) => img !== url))}
                maxFiles={10}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Descripción</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción del Vehículo</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe las características y estado del vehículo..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estado y Visibilidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="AVAILABLE">Disponible</SelectItem>
                        <SelectItem value="RESERVED">Reservado</SelectItem>
                        <SelectItem value="SOLD">Vendido</SelectItem>
                        <SelectItem value="PENDING">Pendiente</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isVisible"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Visible en el sitio web</FormLabel>
                      <FormDescription>
                        El vehículo aparecerá en el listado público
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Vehículo destacado</FormLabel>
                      <FormDescription>
                        Aparecerá en la sección de destacados de la página principal
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/vehicles">Cancelar</Link>
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar Vehículo"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
