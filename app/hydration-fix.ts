/**
 * Hydration Fix
 * 
 * Este archivo contiene utilidades para prevenir errores de hidratación
 * causados por extensiones del navegador que modifican el DOM.
 * 
 * Extensiones conocidas que causan problemas:
 * - Avast / AVG (agregan bis_skin_checked)
 * - Grammarly
 * - LastPass
 * - Otros antivirus y extensiones de seguridad
 * 
 * SOLUCIÓN IMPLEMENTADA:
 * - suppressHydrationWarning solo en <html> y <body> del layout raíz
 * - Esto permite que React ignore diferencias en atributos inyectados por extensiones
 * - Todo el resto del código es estable y sin suppressHydrationWarning
 * 
 * Esta es la solución recomendada por el equipo de React/Next.js
 * https://react.dev/link/hydration-mismatch
 */

/**
 * Función para limpiar atributos inyectados por extensiones
 * Solo debe ejecutarse en el cliente si es necesario
 */
export function cleanDOMAttributes() {
  if (typeof window === 'undefined') return
  
  // Lista de atributos conocidos que agregan extensiones
  const unwantedAttributes = [
    'bis_skin_checked',
    'data-gr-ext-installed', // Grammarly
    'data-lastpass-icon-root',
  ]
  
  unwantedAttributes.forEach(attr => {
    const elements = document.querySelectorAll(`[${attr}]`)
    elements.forEach(el => {
      el.removeAttribute(attr)
    })
  })
}

// No es necesario usar esta función en la mayoría de casos
// suppressHydrationWarning en html/body es suficiente
