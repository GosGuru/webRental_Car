# 🧪 Guía de Pruebas Rápidas - Panel Admin Móvil

## Inicio Rápido para Testing

Esta guía te ayudará a verificar que todas las funcionalidades móviles funcionen correctamente.

---

## 🚀 Preparación

### 1. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:3000`

### 2. Acceder al Panel Admin

```
URL: http://localhost:3000/admin
Credenciales:
  Email: admin@autosbustamante.com
  Password: admin123
```

### 3. Abrir DevTools Móvil

**Chrome/Edge:**
1. Presiona `F12` o `Ctrl+Shift+I`
2. Presiona `Ctrl+Shift+M` para toggle device toolbar
3. Selecciona un dispositivo móvil (ej: iPhone 14 Pro)

**Firefox:**
1. Presiona `F12`
2. Click en el ícono de dispositivo móvil (📱)
3. Selecciona un dispositivo

---

## ✅ Checklist de Pruebas

### 1. Navegación Bottom Bar

**Ubicación:** En la parte inferior de la pantalla (solo móvil < 1024px)

**Pruebas:**
- [ ] El bottom bar es visible y fijo en la parte inferior
- [ ] Hay 5 tabs: Dashboard, Vehículos, Consultas, Categorías, Ajustes
- [ ] El tab activo tiene color primario y escala mayor
- [ ] Al tocar cada tab, navega correctamente
- [ ] Los iconos son claros y los labels legibles
- [ ] No hay overlap con el contenido

**Cómo probar:**
```
1. Reducir viewport a < 1024px
2. Verificar que aparece el bottom bar
3. Tocar cada tab y verificar navegación
4. Verificar indicador visual del tab activo
```

---

### 2. Hamburger Menu (Sidebar Móvil)

**Ubicación:** Ícono ☰ en header (solo móvil < 1024px)

**Pruebas:**
- [ ] El ícono de menú (hamburger) es visible en header
- [ ] Al tocar, se abre un panel lateral desde la izquierda
- [ ] El panel muestra: logo, navegación completa, info usuario, logout
- [ ] El overlay oscuro es visible detrás
- [ ] Al tocar fuera del panel, se cierra
- [ ] Al navegar, el panel se cierra automáticamente

**Cómo probar:**
```
1. Viewport < 1024px
2. Tocar ☰ en header
3. Verificar que el panel desliza desde izquierda
4. Tocar un link de navegación
5. Verificar que el panel se cierra
```

---

### 3. Vista de Cards - Vehículos

**Ubicación:** `/admin/vehicles`

**Pruebas:**
- [ ] En móvil, se muestra grid de cards (no tabla)
- [ ] Cada card muestra: imagen, título, año, km, precio, badges
- [ ] Las imágenes cargan correctamente
- [ ] Los badges (Featured, Status) son visibles
- [ ] El botón ⋮ (más opciones) es accesible

**Cómo probar:**
```
1. Navegar a /admin/vehicles
2. Verificar que NO se muestra tabla
3. Verificar que se muestra grid de cards
4. Scroll y verificar que todos los datos son legibles
```

---

### 4. Bottom Sheet - Acciones

**Ubicación:** Botón ⋮ en cada card de vehículo

**Pruebas:**
- [ ] Al tocar ⋮, se abre bottom sheet desde abajo
- [ ] Animación suave (300ms)
- [ ] Muestra 3 opciones: Ver en sitio, Editar, Eliminar
- [ ] Cada opción tiene ícono + texto claro
- [ ] Opción "Eliminar" es roja (destructiva)
- [ ] Se puede cerrar tocando fuera o el botón X
- [ ] Se puede deslizar hacia abajo para cerrar

**Cómo probar:**
```
1. En /admin/vehicles
2. Tocar ⋮ en cualquier card
3. Verificar animación de bottom sheet
4. Verificar que las 3 opciones son visibles
5. Tocar fuera del sheet para cerrar
6. Abrir de nuevo y deslizar hacia abajo
```

---

### 5. Formulario Responsive - Nuevo/Editar Vehículo

**Ubicación:** `/admin/vehicles/new`

**Pruebas:**

#### Móvil (<640px):
- [ ] Todos los campos ocupan full width (columna única)
- [ ] Labels son visibles encima de cada input
- [ ] Inputs tienen altura mínima de 44px
- [ ] Secciones están claramente separadas
- [ ] Botones "Cancelar" y "Guardar" son full width
- [ ] "Guardar" está arriba de "Cancelar" (orden invertido)

#### Tablet (640px-1024px):
- [ ] Marca y Modelo en 2 columnas
- [ ] Combustible y Transmisión en 2 columnas
- [ ] Año, Precio, Km se adaptan a 2 columnas

#### Desktop (>1024px):
- [ ] Año, Precio, Km en 3 columnas
- [ ] Carrocería, Puertas, Plazas en 3 columnas
- [ ] Botones en fila con ancho automático

**Cómo probar:**
```
1. Navegar a /admin/vehicles/new
2. Cambiar viewport: 375px → 768px → 1024px
3. Verificar que los grids se adaptan
4. Intentar completar el formulario
5. Verificar que todos los campos son accesibles
```

---

### 6. Dashboard Responsive

**Ubicación:** `/admin` (página principal)

**Pruebas:**

#### Stats Cards:
- [ ] En móvil: Grid 2x2 (2 columnas, 2 filas)
- [ ] En desktop: Grid 1x4 (4 columnas, 1 fila)
- [ ] Iconos y textos son legibles en todos los tamaños
- [ ] Números grandes y destacados

#### Recent Vehicles:
- [ ] En móvil: Lista vertical apilada
- [ ] Imagen a la izquierda (56x64px)
- [ ] Info del vehículo al lado de la imagen
- [ ] Precio visible sin scroll
- [ ] En desktop: Layout horizontal tradicional

**Cómo probar:**
```
1. Navegar a /admin
2. Viewport 375px: verificar grid 2x2
3. Viewport 1024px: verificar grid 1x4
4. Scroll en lista de vehículos recientes
5. Verificar legibilidad en ambos tamaños
```

---

### 7. Categorías - Vista Mobile

**Ubicación:** `/admin/categories`

**Pruebas:**
- [ ] En móvil, se muestran cards (no tabla)
- [ ] Cada card muestra: nombre, badge de conteo, slug, descripción
- [ ] El badge de conteo es visible y destacado
- [ ] La descripción tiene truncamiento si es larga
- [ ] Botón "Nueva Categoría" es full width en móvil

**Cómo probar:**
```
1. Navegar a /admin/categories
2. Verificar vista de cards en móvil
3. Verificar vista de tabla en desktop
4. Tocar "Nueva Categoría" (verificar full width)
```

---

### 8. Consultas - Cards Expandibles

**Ubicación:** `/admin/inquiries`

**Pruebas:**
- [ ] En móvil, se muestran cards con info completa
- [ ] Cada card muestra: nombre cliente, contacto, vehículo, mensaje, estado, fecha
- [ ] Badge de estado es visible (colores: amarillo, azul, verde, rojo)
- [ ] El mensaje tiene truncamiento con "line-clamp-3"
- [ ] Fecha muestra "hace X tiempo" en español

**Cómo probar:**
```
1. Navegar a /admin/inquiries
2. Verificar cards en móvil
3. Leer información completa en cada card
4. Verificar badges de estado
5. Cambiar a desktop y verificar tabla
```

---

### 9. Touch Targets

**Criterio:** Todos los elementos interactivos deben tener mínimo 44x44px

**Elementos a verificar:**
- [ ] Botones principales (Guardar, Cancelar, Nuevo, etc.)
- [ ] Tabs del bottom navigation (64x64px ideal)
- [ ] Iconos interactivos (⋮, ☰, etc.)
- [ ] Links de navegación
- [ ] Inputs de formulario
- [ ] Cards clickeables

**Cómo probar:**
```
1. Usar DevTools → Elements
2. Inspeccionar cada elemento interactivo
3. Verificar computed styles:
   - min-height: 44px (11 * 4px = 44px en Tailwind)
   - min-width: 44px
4. Intentar tocar con el cursor (simular dedo)
```

---

### 10. Safe Area (iOS)

**Prueba en iPhone con notch:**

**Elementos críticos:**
- [ ] Bottom navigation no queda oculto detrás del home indicator
- [ ] Contenido scrolleable no queda cortado
- [ ] Modales respetan safe-area-inset

**Cómo probar:**
```
1. DevTools → iPhone 14 Pro o similar
2. Verificar que bottom nav tiene padding-bottom adecuado
3. Scroll hasta el final de una lista
4. Verificar que el último elemento es visible
```

---

### 11. Animaciones y Transiciones

**Elementos animados:**
- [ ] Bottom sheet: slide in/out suave (300ms)
- [ ] Hamburger menu: slide lateral suave (500ms)
- [ ] Tab activo: escala con transition-transform
- [ ] Cards hover: shadow-md en hover
- [ ] Botones active: scale-95 en tap

**Cómo probar:**
```
1. Interactuar con cada elemento animado
2. Verificar que las animaciones son fluidas (no jerky)
3. En DevTools → Performance, verificar 60fps
4. En Settings → Motion → Reduce motion, verificar que se respeta
```

---

### 12. Scroll y Performance

**Áreas de scroll:**
- [ ] Página principal (dashboard) - smooth scroll
- [ ] Lista de vehículos - sin lag
- [ ] Formulario largo - scroll natural
- [ ] Bottom sheet contenido - scroll interno

**Cómo probar:**
```
1. Scroll rápido en cada página
2. Verificar que no hay jank (saltos)
3. Abrir DevTools → Performance
4. Hacer scroll y verificar FPS consistente
5. Network → Slow 3G → verificar lazy loading de imágenes
```

---

## 🐛 Problemas Comunes y Soluciones

### Bottom nav no visible
```
Solución:
1. Verificar viewport < 1024px
2. Inspeccionar elemento con clase "lg:hidden"
3. Verificar z-index: 50
```

### Cards no se muestran en móvil
```
Solución:
1. Verificar clase "lg:hidden" en contenedor de cards
2. Verificar clase "hidden lg:block" en tabla
3. Refresh hard (Ctrl+Shift+R)
```

### Bottom sheet no desliza
```
Solución:
1. Verificar instalación de @radix-ui/react-dialog
2. Verificar que el botón trigger está dentro de <BottomSheet>
3. Console → verificar errores de JavaScript
```

### Formulario muy apretado
```
Solución:
1. Verificar breakpoints: grid-cols-1 md:grid-cols-2
2. Verificar padding: p-4 lg:p-6
3. Cambiar viewport para forzar re-render
```

### Touch targets muy pequeños
```
Solución:
1. Añadir clase "min-h-11" (44px)
2. Para iconos: "h-11 w-11"
3. Verificar que no hay override de estilos
```

---

## 📱 Dispositivos de Prueba Recomendados

### DevTools Presets

**Móviles Pequeños:**
- iPhone SE (375x667) - Caso extremo
- Samsung Galaxy S8+ (360x740)

**Móviles Estándar:**
- iPhone 14 Pro (390x844)
- Pixel 7 (412x915)

**Móviles Grandes:**
- iPhone 14 Pro Max (430x932)
- Samsung Galaxy S21 Ultra (384x854)

**Tablets:**
- iPad Mini (768x1024)
- iPad Pro 11" (834x1194)

### Custom Viewport

```
Extremo pequeño:  320x568 (iPhone 5/SE legacy)
Móvil promedio:   375x667
Tablet vertical:  768x1024
Desktop pequeño:  1024x768
Desktop estándar: 1440x900
```

---

## ✅ Criterios de Aceptación

### ✓ Todo debe pasar:

- [ ] **Navegación:** Bottom bar funcional en todos los tamaños móviles
- [ ] **Tablas:** Convertidas a cards en <1024px
- [ ] **Formularios:** Responsive con 1-2-3 columnas según breakpoint
- [ ] **Touch Targets:** 100% compliance (44x44px mínimo)
- [ ] **Animaciones:** Smooth a 60fps
- [ ] **Scroll:** Sin jank, sin horizontal
- [ ] **Bottom Sheets:** Deslizables y funcionales
- [ ] **Safe Area:** Respetada en iOS devices
- [ ] **Feature Parity:** 100% funcionalidad desktop = móvil
- [ ] **Performance:** Lighthouse mobile >90

---

## 🎯 Test de Usuario Real

### Escenario 1: Agregar Nuevo Vehículo desde Móvil
```
1. Login desde móvil
2. Navegar a Vehículos con bottom bar
3. Tocar "Nuevo Vehículo"
4. Completar formulario (todos los campos visibles)
5. Subir 3 imágenes
6. Guardar
7. Verificar que aparece en la lista
8. Abrir bottom sheet del nuevo vehículo
9. Editar y cambiar precio
10. Guardar cambios

✅ Tiempo estimado: 3-5 minutos
✅ Sin frustración ni zoom necesario
```

### Escenario 2: Revisar Consultas desde Móvil
```
1. Login desde móvil
2. Navegar a Consultas con bottom bar
3. Scroll por la lista de cards
4. Leer mensaje completo en card
5. Verificar badge de estado
6. Ver fecha relativa

✅ Tiempo estimado: 1-2 minutos
✅ Toda la info legible sin tocar
```

### Escenario 3: Gestionar Vehículos desde Móvil
```
1. Login desde móvil
2. Ver dashboard (stats y recientes)
3. Navegar a Vehículos
4. Buscar vehículo específico
5. Abrir bottom sheet
6. Ver en sitio (nueva tab)
7. Volver y editar
8. Cambiar visibilidad
9. Guardar

✅ Tiempo estimado: 2-3 minutos
✅ Flujo natural e intuitivo
```

---

## 📊 Métricas de Éxito

Al finalizar las pruebas, verifica:

```
✅ Navigation Success Rate:     100%
✅ Form Completion Rate:        100%
✅ Touch Target Compliance:     100%
✅ Zero Horizontal Scroll:      ✓
✅ Smooth Animations (60fps):   ✓
✅ All Features Working:        ✓
✅ User Satisfaction:           😍 5/5
```

---

## 🚀 Próximos Pasos

Una vez que todas las pruebas pasen:

1. **Prueba en Dispositivos Reales** (no solo DevTools)
   - iPhone físico
   - Android físico
   - Tablet real

2. **User Testing**
   - Pedir a 2-3 usuarios probar el panel
   - Observar sin intervenir
   - Recoger feedback

3. **Performance Audit**
   - Lighthouse audit completo
   - Corregir cualquier warning

4. **Deploy a Staging**
   - Probar en entorno real
   - Verificar en diferentes redes (3G, 4G, WiFi)

5. **Production Release**
   - Deploy final
   - Monitorear analytics
   - Recoger feedback de usuarios reales

---

*Guía de Pruebas creada el 13 de Noviembre, 2025*  
*Mobile-First Admin Panel Testing*
