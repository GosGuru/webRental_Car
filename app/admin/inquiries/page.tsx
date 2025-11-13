import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

async function getInquiries() {
  return prisma.inquiry.findMany({
    include: {
      vehicle: {
        select: {
          brand: true,
          model: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500",
  CONTACTED: "bg-blue-500",
  RESOLVED: "bg-green-500",
  SPAM: "bg-red-500",
}

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  CONTACTED: "Contactado",
  RESOLVED: "Resuelto",
  SPAM: "Spam",
}

export default async function InquiriesPage() {
  const inquiries = await getInquiries()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Consultas</h2>
        <p className="text-sm lg:text-base text-muted-foreground">
          Gestiona las consultas recibidas de los clientes
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Listado de Consultas ({inquiries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Vista móvil - Cards */}
          <div className="lg:hidden space-y-4">
            {inquiries.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No hay consultas aún</p>
              </div>
            ) : (
              inquiries.map((inquiry: any) => (
                <div key={inquiry.id} className="p-4 border rounded-lg bg-card space-y-3 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">{inquiry.name}</h3>
                      <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                      {inquiry.phone && (
                        <p className="text-sm text-muted-foreground">{inquiry.phone}</p>
                      )}
                    </div>
                    <Badge
                      variant="secondary"
                      className={statusColors[inquiry.status]}
                    >
                      {statusLabels[inquiry.status]}
                    </Badge>
                  </div>
                  
                  {inquiry.vehicle && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground mb-1">Vehículo de interés</p>
                      <p className="text-sm font-medium">
                        {inquiry.vehicle.brand} {inquiry.vehicle.model}
                      </p>
                    </div>
                  )}
                  
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground mb-1">Mensaje</p>
                    <p className="text-sm line-clamp-3">{inquiry.message}</p>
                  </div>
                  
                  <div className="text-xs text-muted-foreground pt-2">
                    {formatDistanceToNow(inquiry.createdAt, {
                      addSuffix: true,
                      locale: es,
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Vista desktop - Tabla */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Vehículo</TableHead>
                  <TableHead>Mensaje</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No hay consultas aún
                    </TableCell>
                  </TableRow>
                ) : (
                  inquiries.map((inquiry: any) => (
                    <TableRow key={inquiry.id}>
                      <TableCell className="font-medium">{inquiry.name}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{inquiry.email}</div>
                          {inquiry.phone && (
                            <div className="text-muted-foreground">{inquiry.phone}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {inquiry.vehicle ? (
                          <span className="text-sm">
                            {inquiry.vehicle.brand} {inquiry.vehicle.model}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">Consulta general</span>
                        )}
                      </TableCell>
                      <TableCell className="max-w-md truncate text-sm text-muted-foreground">
                        {inquiry.message}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={statusColors[inquiry.status]}
                        >
                          {statusLabels[inquiry.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDistanceToNow(inquiry.createdAt, {
                          addSuffix: true,
                          locale: es,
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
