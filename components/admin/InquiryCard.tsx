"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Check, Trash2, MoreVertical, Phone, Mail } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

interface InquiryCardProps {
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

export function InquiryCard({ inquiry }: InquiryCardProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)
  const [showFullMessage, setShowFullMessage] = useState(false)

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
    <div className="p-4 lg:p-6 border rounded-lg bg-card space-y-4 hover:shadow-md transition-all">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base lg:text-lg truncate">{inquiry.name}</h3>
          <div className="space-y-1 mt-1">
            <a 
              href={`mailto:${inquiry.email}`} 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{inquiry.email}</span>
            </a>
            {inquiry.phone && (
              <a 
                href={`tel:${inquiry.phone}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span>{inquiry.phone}</span>
              </a>
            )}
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 shrink-0"
              disabled={isUpdating}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => updateStatus("PENDING")}>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                Marcar Pendiente
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateStatus("CONTACTED")}>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                Marcar Contactado
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateStatus("RESOLVED")}>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                Marcar Resuelto
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => updateStatus("SPAM")} className="text-red-600">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                Marcar como Spam
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

      {/* Status Badge */}
      <div>
        <Badge
          variant="secondary"
          className={`${statusColors[inquiry.status]} text-white`}
        >
          {statusLabels[inquiry.status]}
        </Badge>
      </div>

      {/* Vehicle Info */}
      {inquiry.vehicle && (
        <div className="pt-3 border-t">
          <p className="text-xs text-muted-foreground mb-1">Vehículo de interés</p>
          <p className="text-sm font-medium">
            {inquiry.vehicle.brand} {inquiry.vehicle.model}
          </p>
        </div>
      )}

      {/* Message */}
      <div className="pt-3 border-t">
        <p className="text-xs text-muted-foreground mb-2">Mensaje</p>
        <p className={`text-sm whitespace-pre-wrap ${!showFullMessage && 'line-clamp-3'}`}>
          {inquiry.message}
        </p>
        {inquiry.message.length > 150 && (
          <button
            onClick={() => setShowFullMessage(!showFullMessage)}
            className="text-xs text-primary hover:underline mt-2"
          >
            {showFullMessage ? "Ver menos" : "Ver más"}
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t text-xs text-muted-foreground">
        <span>
          {formatDistanceToNow(inquiry.createdAt, {
            addSuffix: true,
            locale: es,
          })}
        </span>
        {inquiry.status === "PENDING" && (
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs"
            onClick={() => updateStatus("CONTACTED")}
            disabled={isUpdating}
          >
            <Check className="h-3 w-3 mr-1" />
            Marcar Contactado
          </Button>
        )}
      </div>
    </div>
  )
}
