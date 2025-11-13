"use client"

import { useRef, useState, useEffect, type ReactNode } from "react"

interface DraggableScrollContainerProps {
  children: ReactNode
  className?: string
}

export function DraggableScrollContainer({ children, className = "" }: DraggableScrollContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    // Solo en desktop
    if (isMobile || !scrollRef.current) return
    
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
    
    // Cambiar cursor
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grabbing'
      scrollRef.current.style.userSelect = 'none'
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile && scrollRef.current) {
      setIsDragging(false)
      scrollRef.current.style.cursor = 'grab'
    }
  }

  const handleMouseUp = () => {
    if (!isMobile && scrollRef.current) {
      setIsDragging(false)
      scrollRef.current.style.cursor = 'grab'
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isMobile || !scrollRef.current) return
    
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2 // Velocidad del scroll
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div
      ref={scrollRef}
      className={className}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        cursor: isMobile ? 'default' : 'grab',
      }}
    >
      {children}
    </div>
  )
}
