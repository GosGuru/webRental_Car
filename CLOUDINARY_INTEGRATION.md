# Integración de Cloudinary - Resumen

## ✅ Archivos Creados

1. **components/admin/CloudinaryUploadWidget.tsx**
   - Widget de subida con preview de imágenes
   - Soporte para múltiples imágenes (hasta 10)
   - Validación: JPG, PNG, WEBP (máx 5MB)
   - Botones para eliminar imágenes individuales

2. **CLOUDINARY_SETUP.md**
   - Guía completa de configuración paso a paso
   - Instrucciones para crear cuenta y upload preset
   - Solución de problemas comunes

## ✅ Archivos Modificados

### Backend (APIs)
1. **app/api/vehicles/route.ts**
   - Schema actualizado con campo `images: z.array(z.string())`
   - POST: Crea vehículo con imágenes en relación VehicleImage
   - Genera altText automático para cada imagen

2. **app/api/vehicles/[id]/route.ts**
   - Schema actualizado con campo `images`
   - PUT: Reemplaza todas las imágenes (deleteMany + create)
   - Mantiene orden de imágenes

### Frontend (Admin)
3. **components/admin/VehicleForm.tsx**
   - Importa CloudinaryUploadWidget
   - Estado `images` para manejar URLs
   - Nueva sección "Imágenes del Vehículo"
   - Integra widget con callbacks onUpload/onRemove

4. **app/admin/vehicles/[id]/edit/page.tsx**
   - Carga imágenes existentes del vehículo
   - Include images en query de Prisma
   - Transforma array de VehicleImage a array de URLs

### Configuración
5. **next.config.ts**
   - Agrega res.cloudinary.com a remotePatterns
   - Permite usar imágenes de Cloudinary en next/image

6. **.env**
   - Agrega NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
   - Agrega NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
   - Agrega CLOUDINARY_API_KEY
   - Agrega CLOUDINARY_API_SECRET

## 📦 Dependencias Instaladas

```bash
npm install cloudinary next-cloudinary
```

## 🔧 Configuración Requerida

### Paso 1: Crear cuenta en Cloudinary
https://cloudinary.com → Sign Up (cuenta gratuita)

### Paso 2: Crear Upload Preset
Settings → Upload → Add upload preset
- Name: `autosbustamante-vehicles`
- Mode: **Unsigned**
- Folder: `autosbustamante`

### Paso 3: Completar .env
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="tu-cloud-name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="autosbustamante-vehicles"
CLOUDINARY_API_KEY="tu-api-key"
CLOUDINARY_API_SECRET="tu-api-secret"
```

### Paso 4: Reiniciar servidor
```bash
Ctrl+C
bun dev
```

## 🎯 Funcionalidades Implementadas

### Widget de Subida
- ✅ Drag & drop de imágenes
- ✅ Múltiples imágenes (hasta 10)
- ✅ Preview en grilla responsive
- ✅ Eliminar imágenes individualmente
- ✅ Contador (X/10 imágenes)
- ✅ Validación de formato y tamaño

### Integración con Admin
- ✅ Formulario de nuevo vehículo
- ✅ Formulario de edición (carga imágenes existentes)
- ✅ Guardado en base de datos (tabla VehicleImage)
- ✅ Orden de imágenes preservado

### Frontend Público
- ✅ Listado: Muestra primera imagen
- ✅ Detalle: Galería completa con carousel
- ✅ Optimización automática (WebP, CDN)

## 🧪 Cómo Probar

1. **Configurar Cloudinary** (ver CLOUDINARY_SETUP.md)
2. **Iniciar servidor**: `bun dev`
3. **Ir al admin**: http://localhost:3000/admin/vehicles/new
4. **Iniciar sesión**: admin@autosbustamante.com / admin123
5. **Crear vehículo**: Completar formulario + subir imágenes
6. **Ver resultado**: http://localhost:3000/vehiculos

## 🔄 Flujo de Datos

```
1. Usuario hace clic en "Subir imágenes"
   ↓
2. Widget de Cloudinary se abre
   ↓
3. Usuario selecciona imágenes
   ↓
4. Cloudinary las sube y devuelve URLs
   ↓
5. URLs se guardan en estado React (setImages)
   ↓
6. Al guardar formulario, URLs van al backend
   ↓
7. Backend crea registros en VehicleImage
   ↓
8. Frontend público muestra imágenes desde Cloudinary
```

## 📊 Estructura de Datos

### VehicleImage (Prisma)
```prisma
model VehicleImage {
  id        String   @id @default(cuid())
  url       String   // URL de Cloudinary
  altText   String?  // "Brand Model - Imagen 1"
  order     Int      // Orden en galería (0, 1, 2...)
  vehicleId String
  vehicle   Vehicle  @relation(...)
}
```

### Request POST/PUT
```json
{
  "brand": "BMW",
  "model": "X5",
  "images": [
    "https://res.cloudinary.com/tu-cloud/image/upload/v123/autosbustamante/abc.jpg",
    "https://res.cloudinary.com/tu-cloud/image/upload/v123/autosbustamante/def.jpg"
  ]
}
```

## 🎨 Componente CloudinaryUploadWidget

### Props
```typescript
interface CloudinaryUploadWidgetProps {
  onUpload: (urls: string[]) => void       // Callback con nuevas URLs
  currentImages?: string[]                  // URLs actuales
  onRemove?: (url: string) => void         // Callback para eliminar
  maxFiles?: number                         // Máximo de imágenes (default: 10)
}
```

### Opciones del Widget
```typescript
{
  multiple: true,
  maxFiles: 10,
  resourceType: "image",
  clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
  maxFileSize: 5000000, // 5MB
  folder: "autosbustamante",
}
```

## 🚀 Próximos Pasos

### Fase 5: SEO Optimization
- [ ] Meta tags dinámicos en vehicle detail pages
- [ ] Open Graph tags para redes sociales
- [ ] Twitter Cards
- [ ] JSON-LD structured data (Vehicle schema)
- [ ] Sitemap.xml generation
- [ ] Robots.txt optimization

### Mejoras Opcionales
- [ ] Reordenar imágenes (drag & drop)
- [ ] Editar altText personalizado
- [ ] Marca de agua automática
- [ ] Transformaciones (crop, resize)
- [ ] Lazy loading avanzado

## 📝 Notas Importantes

⚠️ **El servidor debe reiniciarse** después de configurar variables de entorno

⚠️ **Upload preset debe ser "Unsigned"** para funcionar desde el navegador

⚠️ **Las variables NEXT_PUBLIC_*** son públicas (enviadas al navegador)

✅ **Las imágenes se guardan en Cloudinary**, no en tu servidor

✅ **CDN global** para carga rápida desde cualquier ubicación

✅ **Optimización automática** (WebP, compresión, responsive)
