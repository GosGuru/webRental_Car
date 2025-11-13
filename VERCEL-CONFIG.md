# Configuración de Variables de Entorno en Vercel

## 🚀 Variables Requeridas para Producción

### 1. Base de Datos
```env
DATABASE_URL="tu_conexion_neon_aqui"
```
**Cómo obtenerla:**
- Ve a [Neon.tech](https://neon.tech)
- Copia tu connection string
- Debe tener este formato: `postgresql://user:password@host/database?sslmode=require`

---

### 2. NextAuth (Autenticación)

#### AUTH_SECRET (REQUERIDO)
```env
AUTH_SECRET="genera_un_secreto_aleatorio_fuerte"
```

**Genera un secreto seguro:**
```bash
# Opción 1: En PowerShell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Opción 2: En línea
# Ve a: https://generate-secret.vercel.app/32
```

#### NEXTAUTH_URL
```env
NEXTAUTH_URL="https://tu-dominio.vercel.app"
```
**Nota:** Vercel lo detecta automáticamente, pero es mejor configurarlo explícitamente.

---

### 3. Cloudinary (Imágenes)
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="ducwoqzpy"
CLOUDINARY_API_KEY="979756267213315"
CLOUDINARY_API_SECRET="AViaHnlF4y1Kf0cDHVSeKGxLXbo"
```

---

## 📋 Pasos para Configurar en Vercel

### 1. Ir a Variables de Entorno
1. Abre tu proyecto en [Vercel](https://vercel.com)
2. Ve a **Settings** → **Environment Variables**

### 2. Agregar Variables
Para cada variable:
1. Click en **Add**
2. **Key**: Nombre de la variable (ej: `AUTH_SECRET`)
3. **Value**: El valor correspondiente
4. **Environments**: Selecciona **Production**, **Preview**, y **Development**
5. Click **Save**

### 3. Variables Necesarias

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://...` | Conexión a Neon |
| `AUTH_SECRET` | (generar) | Secreto para NextAuth |
| `NEXTAUTH_URL` | `https://tu-app.vercel.app` | URL de producción |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `ducwoqzpy` | Cloud name de Cloudinary |
| `CLOUDINARY_API_KEY` | `979756267213315` | API Key de Cloudinary |
| `CLOUDINARY_API_SECRET` | `AViaHnlF4y1Kf0cDHVSeKGxLXbo` | API Secret de Cloudinary |

### 4. Re-deploy
Después de agregar las variables:
1. Ve a **Deployments**
2. Click en el último deployment
3. Click **Redeploy**

---

## 🔐 Crear Usuario Admin en Producción

Una vez que el sitio esté desplegado:

### Opción 1: Desde Prisma Studio
1. Abre tu base de datos en [Neon.tech](https://console.neon.tech)
2. O usa Prisma Studio localmente conectado a producción

### Opción 2: Script SQL directo
```sql
-- Conecta a tu base de datos Neon y ejecuta:
INSERT INTO users (id, email, password, name, role, "emailVerified", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  'admin@autosbustamante.com',
  '$2a$10$YourHashedPasswordHere', -- Genera esto con bcrypt
  'Admin',
  'ADMIN',
  NOW(),
  NOW(),
  NOW()
);
```

### Opción 3: Crear desde el código (Recomendado)
Ejecuta localmente apuntando a producción:
```bash
# Cambiar DATABASE_URL en .env temporalmente a la de producción
# Luego ejecutar:
npm run db:setup-admin
```

---

## ✅ Verificación

### Checklist de Variables
- [ ] `DATABASE_URL` configurado
- [ ] `AUTH_SECRET` generado (NO usar el de desarrollo)
- [ ] `NEXTAUTH_URL` apunta a tu dominio de Vercel
- [ ] Variables de Cloudinary configuradas
- [ ] Re-deploy realizado
- [ ] Usuario admin creado

### Probar Login
1. Ve a `https://tu-app.vercel.app/auth/login`
2. Ingresa credenciales de admin
3. Deberías ser redirigido a `/admin`

---

## 🐛 Solución de Problemas

### "Redirecciona al home en lugar de /admin"
**Causa:** No estás autenticado o `AUTH_SECRET` está mal
**Solución:** 
1. Verifica que `AUTH_SECRET` esté configurado en Vercel
2. Re-deploya la aplicación
3. Limpia cookies del navegador
4. Intenta hacer login nuevamente

### "Session inválida"
**Causa:** `AUTH_SECRET` cambió después del login
**Solución:** Limpia cookies y vuelve a hacer login

### "Error de conexión a base de datos"
**Causa:** `DATABASE_URL` incorrecto
**Solución:** Verifica el connection string en Neon.tech

---

## 📝 Notas Importantes

1. **Nunca uses** `development-secret-key-change-in-production` en producción
2. **Guarda** tus variables de entorno en un gestor de contraseñas
3. **No compartas** tus secrets en el repositorio
4. **Usa diferentes** `AUTH_SECRET` para desarrollo y producción
