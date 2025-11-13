# Autos Bustamante - Sistema de Gestión de Vehículos

Sistema completo de gestión y venta de vehículos de segunda mano con **panel administrativo mobile-first**.

## ✨ Novedades - v1.1.0 (Noviembre 2025)

🎉 **Panel Admin 100% Responsive y Optimizado para Móvil**

- ✅ Bottom Navigation Bar (iOS/Material Design compliant)
- ✅ Vistas adaptativas: Tablas → Cards en móvil
- ✅ Touch-optimized (44px+ touch targets, WCAG AA)
- ✅ Bottom Sheets para acciones móviles
- ✅ Formularios responsive (1-2-3 columnas adaptativos)
- ✅ Performance optimizado (Lighthouse 92+)
- ✅ 100% Feature Parity (móvil = desktop)

📱 **Ver documentación completa:**
- [Guía Completa Mobile Admin](./MOBILE-ADMIN-GUIDE.md)
- [Resumen de Implementación](./MOBILE-IMPLEMENTATION-SUMMARY.md)
- [Antes y Después Visual](./MOBILE-BEFORE-AFTER.md)
- [Guía de Pruebas](./MOBILE-TESTING-GUIDE.md)

---

## 🚀 Stack Tecnológico

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Base de Datos**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Autenticación**: NextAuth v5
- **Estilos**: Tailwind CSS + shadcn/ui
- **Imágenes**: Cloudinary
- **Deployment**: Vercel

---

## 📦 Instalación Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/GosGuru/webRental_Car.git
cd webRental_Car
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz:
```env
# Base de datos
DATABASE_URL="postgresql://..."

# NextAuth
AUTH_SECRET="tu-secret-aleatorio"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="tu-cloud-name"
CLOUDINARY_API_KEY="tu-api-key"
CLOUDINARY_API_SECRET="tu-api-secret"
```

### 4. Configurar base de datos
```bash
npm run db:generate  # Generar Prisma Client
npm run db:push      # Crear tablas
npm run db:seed      # Datos de ejemplo (opcional)
```

### 5. Crear usuario admin
```bash
npm run db:setup-admin
```

### 6. Iniciar servidor
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deploy en Vercel

### Configuración Requerida

#### 1. Generar AUTH_SECRET
```bash
# En PowerShell:
.\generate-auth-secret.ps1

# O manualmente:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### 2. Configurar Variables en Vercel
Ve a **Settings** → **Environment Variables** y agrega:

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | Connection string de Neon |
| `AUTH_SECRET` | Secret generado (NO uses el de desarrollo) |
| `NEXTAUTH_URL` | `https://tu-dominio.vercel.app` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Tu cloud name |
| `CLOUDINARY_API_KEY` | Tu API key |
| `CLOUDINARY_API_SECRET` | Tu API secret |

**📖 Guía detallada**: Ver [VERCEL-CONFIG.md](./VERCEL-CONFIG.md)

#### 3. Deploy
```bash
git push origin main
```

Vercel desplegará automáticamente.

---

## 🎯 Características

### Panel Público
- ✅ Catálogo de vehículos con filtros avanzados
- ✅ Vista detallada de cada vehículo
- ✅ Formulario de contacto
- ✅ SEO optimizado
- ✅ Responsive design

### Panel Administrativo
- ✅ Gestión completa de vehículos (CRUD)
- ✅ Upload de imágenes a Cloudinary
- ✅ Sistema de categorías
- ✅ Gestión de consultas
- ✅ Múltiples filtros y búsqueda

---

## 📝 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter
npm run type-check   # Verificar tipos

# Base de datos
npm run db:generate     # Generar Prisma Client
npm run db:migrate      # Crear migración
npm run db:push         # Push schema
npm run db:studio       # Abrir Prisma Studio
npm run db:seed         # Datos de ejemplo
npm run db:setup-admin  # Crear usuario admin
```

---

## 🔐 Acceso Admin

### Local
- URL: `http://localhost:3000/admin`
- Credenciales: Las que configuraste con `npm run db:setup-admin`

### Producción
1. Crear usuario admin en la base de datos de producción
2. Ir a `https://tu-dominio.vercel.app/admin`
3. Login con credenciales

---

## 🐛 Solución de Problemas

### "Redirecciona al home en /admin"
**Causa**: No autenticado o AUTH_SECRET incorrecto  
**Solución**: Ver [VERCEL-CONFIG.md](./VERCEL-CONFIG.md)

### "Error de Prisma Client"
**Causa**: Prisma Client no generado  
**Solución**: `npm run db:generate`

### Errores de hidratación
**Causa**: Extensiones del navegador  
**Solución**: Ver [ERRORES-COMUNES.md](./ERRORES-COMUNES.md)

---

## 📚 Documentación Adicional

- [Configuración de Vercel](./VERCEL-CONFIG.md)
- [Errores Comunes](./ERRORES-COMUNES.md)
- [Configuración de Cloudinary](./CLOUDINARY_SETUP.md)

---

## 👥 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-caracteristica`)
3. Commit cambios (`git commit -m 'Agregar característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es privado.

---

## 💼 Contacto

**Autos Bustamante**  
📧 autosbustamante@hotmail.com  
📞 675 689 111  
📍 Camino de Alcolea, 27 - 14940 Cabra, Córdoba
