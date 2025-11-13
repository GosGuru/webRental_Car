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
import { InquiryCard } from "@/components/admin/InquiryCard"
import { InquiryRow } from "@/components/admin/InquiryRow"

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
              inquiries.map((inquiry) => (
                <InquiryCard key={inquiry.id} inquiry={inquiry} />
              ))
            )}
          </div>

          {/* Vista desktop - Tabla */}
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Vehículo</TableHead>
                  <TableHead>Mensaje</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No hay consultas aún
                    </TableCell>
                  </TableRow>
                ) : (
                  inquiries.map((inquiry) => (
                    <InquiryRow key={inquiry.id} inquiry={inquiry} />
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
