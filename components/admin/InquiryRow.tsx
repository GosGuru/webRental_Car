"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Check, Trash2, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface InquiryRowProps {
  inquiry: {
    id: string
    name: string
    email: string
    phone: string | null
    message: string
    status: string
    createdAt: Date
    vehicle?: {
      brand: string
      model: string
    } | null
  }
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500 hover:bg-yellow-600",
  CONTACTED: "bg-blue-500 hover:bg-blue-600",
  RESOLVED: "bg-green-500 hover:bg-green-600",
  SPAM: "bg-red-500 hover:bg-red-600",
}

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  CONTACTED: "Contactado",
  RESOLVED: "Resuelto",
  SPAM: "Spam",
}

export function InquiryRow({ inquiry }: InquiryRowProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const updateStatus = async (newStatus: string) => {
    if (isUpdating) return
    
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/inquiries/${inquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error("Error al actualizar")
      
      router.refresh()
    } catch (error) {
      console.error("Error:", error)
      alert("Error al actualizar el estado")
    } finally {
      setIsUpdating(false)
    }
  }

  const deleteInquiry = async () => {
    if (!confirm("¿Seguro que deseas eliminar esta consulta?")) return
    
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/inquiries/${inquiry.id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Error al eliminar")
      
      router.refresh()
    } catch (error) {
      console.error("Error:", error)
      alert("Error al eliminar la consulta")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <TableRow>
      <TableCell className="font-medium">{inquiry.name}</TableCell>
      <TableCell>
        <div className="text-sm space-y-1">
          <a href={`mailto:${inquiry.email}`} className="hover:text-primary transition-colors block">
            {inquiry.email}
          </a>
          {inquiry.phone && (
            <a href={`tel:${inquiry.phone}`} className="text-muted-foreground hover:text-primary transition-colors block">
              {inquiry.phone}
            </a>
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
      <TableCell className="max-w-md">
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left truncate block w-full">
              {inquiry.message}
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Mensaje completo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">De: {inquiry.name}</p>
                <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                {inquiry.phone && (
                  <p className="text-sm text-muted-foreground">{inquiry.phone}</p>
                )}
              </div>
              {inquiry.vehicle && (
                <div>
                  <p className="text-sm font-medium mb-1">Vehículo de interés:</p>
                  <p className="text-sm">{inquiry.vehicle.brand} {inquiry.vehicle.model}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium mb-2">Mensaje:</p>
                <p className="text-sm whitespace-pre-wrap">{inquiry.message}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </TableCell>
      <TableCell>
        <Badge
          variant="secondary"
          className={`${statusColors[inquiry.status]} text-white cursor-default`}
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
      <TableCell>
        <div className="flex items-center gap-2">
          {inquiry.status === "PENDING" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => updateStatus("CONTACTED")}
              disabled={isUpdating}
              className="h-8"
            >
              <Check className="h-3.5 w-3.5 mr-1" />
              Contactado
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                disabled={isUpdating}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => updateStatus("PENDING")}>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  Pendiente
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateStatus("CONTACTED")}>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  Contactado
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateStatus("RESOLVED")}>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  Resuelto
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => updateStatus("SPAM")} className="text-red-600">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  Spam
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={deleteInquiry} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  )
}
