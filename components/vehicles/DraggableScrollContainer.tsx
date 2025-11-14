"use client"

import { useRef, useState, useEffect, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DraggableScrollContainerProps {
  children: ReactNode
  className?: string
}

export function DraggableScrollContainer({ children, className = "" }: DraggableScrollContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = () => {
    if (!scrollRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    checkScroll()
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
      
      return () => {
        scrollElement.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    
    const scrollAmount = 380 // Ancho de card + gap
    const targetScroll = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
    
    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
  }

  return (
    <div className="relative group">
      {/* Botón Izquierdo */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll('left')}
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full shadow-lg bg-background/95 backdrop-blur-sm border-2 transition-all duration-300",
          canScrollLeft 
            ? "opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-primary hover:text-primary-foreground" 
            : "opacity-0 pointer-events-none"
        )}
        aria-label="Anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      {/* Contenedor del scroll */}
      <div
        ref={scrollRef}
        className={cn("overflow-x-auto pb-4 scrollbar-hide", className)}
      >
        {children}
      </div>

      {/* Botón Derecho */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll('right')}
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full shadow-lg bg-background/95 backdrop-blur-sm border-2 transition-all duration-300",
          canScrollRight 
            ? "opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-primary hover:text-primary-foreground" 
            : "opacity-0 pointer-events-none"
        )}
        aria-label="Siguiente"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}
