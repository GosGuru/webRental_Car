# Configuración de Cloudinary

Este documento explica cómo configurar Cloudinary para la gestión de imágenes en Autosbustamante.

## Paso 1: Crear Cuenta en Cloudinary

1. Ve a [https://cloudinary.com](https://cloudinary.com)
2. Haz clic en "Sign Up" (Registrarse)
3. Crea una cuenta gratuita (incluye 25GB de almacenamiento gratis)

## Paso 2: Obtener Credenciales

Una vez que hayas iniciado sesión:

1. Ve al **Dashboard** (Panel de control)
2. Encontrarás tres valores importantes:
   - **Cloud Name** (Nombre de nube)
   - **API Key** (Clave API)
   - **API Secret** (Secreto API)

## Paso 3: Crear Upload Preset (Configuración de Subida)

1. En el Dashboard de Cloudinary, ve a **Settings** (Configuración) → **Upload**
2. Desplázate hasta la sección **Upload presets**
3. Haz clic en **Add upload preset**
4. Configura el preset:
   - **Preset name**: `autosbustamante-vehicles`
   - **Signing Mode**: Selecciona **Unsigned** (Sin firmar)
   - **Folder**: `autosbustamante` (opcional pero recomendado)
   - **Use filename or externally defined Public ID**: Puedes activarlo
   - **Unique filename**: Activado (recomendado)
5. Haz clic en **Save**

## Paso 4: Configurar Variables de Entorno

Abre el archivo `.env` en la raíz del proyecto y completa estos valores:

```env
# ===========================
# CLOUDINARY (Image Storage)
# ===========================
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="tu-cloud-name-aqui"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="autosbustamante-vehicles"
CLOUDINARY_API_KEY="tu-api-key-aqui"
CLOUDINARY_API_SECRET="tu-api-secret-aqui"
```

### Ejemplo (NO USES ESTOS VALORES):
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="autosbustamante"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="autosbustamante-vehicles"
CLOUDINARY_API_KEY="123456789012345"
CLOUDINARY_API_SECRET="abcdefghijklmnopqrstuvwxyz123456"
```

## Paso 5: Reiniciar el Servidor

Después de configurar las variables de entorno:

```bash
# Detén el servidor con Ctrl+C
# Luego reinícialo:
npm run dev
# o
bun dev
```

## Paso 6: Probar la Funcionalidad

1. Ve a **http://localhost:3000/admin/vehicles/new**
2. Inicia sesión si no lo has hecho
3. En el formulario de nuevo vehículo, verás la sección **"Imágenes del Vehículo"**
4. Haz clic en **"Subir imágenes"**
5. Se abrirá el widget de Cloudinary
6. Selecciona una o varias imágenes desde tu computadora
7. Las imágenes se subirán automáticamente a Cloudinary
8. Verás las miniaturas de las imágenes subidas

## Características Implementadas

### Widget de Subida
- **Múltiples imágenes**: Puedes subir hasta 10 imágenes por vehículo
- **Formatos permitidos**: JPG, JPEG, PNG, WEBP
- **Tamaño máximo**: 5MB por imagen
- **Organización**: Las imágenes se guardan en la carpeta `autosbustamante` en Cloudinary

### Vista Previa
- Miniaturas de imágenes en grilla responsive (2-4 columnas)
- Botón para eliminar imágenes individuales
- Contador de imágenes actuales vs máximo permitido

### Integración con Base de Datos
- Las URLs de Cloudinary se guardan en la tabla `VehicleImage`
- Se mantiene el orden de las imágenes
- Se genera automáticamente un `altText` descriptivo
- Las imágenes se eliminan de la BD cuando se elimina el vehículo (cascada)

## Gestión de Imágenes Existentes

### Al Editar un Vehículo
1. Las imágenes actuales se cargan automáticamente
2. Puedes eliminar imágenes individuales haciendo clic en el botón X
3. Puedes agregar nuevas imágenes
4. Al guardar, se actualizan todas las imágenes en la base de datos

### Optimización Automática
Cloudinary optimiza automáticamente las imágenes:
- Conversión a formatos modernos (WebP)
- Compresión inteligente sin pérdida de calidad
- CDN global para carga rápida
- Transformaciones on-the-fly (redimensionado, recorte, etc.)

## Uso en el Frontend Público

Las imágenes subidas se mostrarán automáticamente en:

1. **Listado de vehículos** (`/vehiculos`)
   - Imagen principal (primera imagen)
   - Optimizada para tarjetas

2. **Detalle del vehículo** (`/vehiculos/[slug]`)
   - Galería completa con carousel
   - Navegación entre imágenes
   - Vista ampliada

3. **Vehículos destacados** (Página principal)
   - Imagen principal destacada
   - Tarjetas optimizadas

## Solución de Problemas

### Error: "Upload widget not showing"
- Verifica que `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` esté configurado
- Asegúrate de que el preset sea "Unsigned"
- Revisa la consola del navegador para errores

### Error: "Upload failed"
- Verifica el tamaño del archivo (máx 5MB)
- Confirma que el formato sea JPG, PNG o WEBP
- Revisa que el upload preset exista en Cloudinary

### Error: "Cloud name not set"
- El archivo `.env` debe estar en la raíz del proyecto
- El servidor debe reiniciarse después de cambiar `.env`
- Las variables que empiezan con `NEXT_PUBLIC_` deben estar disponibles

## Próximos Pasos Opcionales

### Transformaciones Avanzadas
Puedes configurar transformaciones automáticas en Cloudinary:
- Marca de agua
- Redimensionado automático
- Filtros y efectos
- Recorte inteligente

### Respaldo de Imágenes
- Cloudinary mantiene backups automáticos
- Puedes exportar todas las imágenes desde el Dashboard
- Se recomienda mantener copias locales de imágenes importantes

## Recursos Adicionales

- [Documentación de Cloudinary](https://cloudinary.com/documentation)
- [Next Cloudinary Docs](https://next-cloudinary.spacejelly.dev/)
- [Guía de Upload Presets](https://cloudinary.com/documentation/upload_presets)
