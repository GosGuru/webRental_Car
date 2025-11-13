import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configuración</h2>
        <p className="text-muted-foreground">
          Ajustes generales del sistema
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuración General</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Próximamente: Configuración de correos, integración con Cloudinary, y más.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
