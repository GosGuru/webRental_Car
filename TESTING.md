# 🧪 Testing & Troubleshooting - Fase 1

## ✅ Checklist de Verificación

### 1. Dependencias Instaladas
```bash
npm install
```

**Verificar que estén instalados:**
- ✅ next@16.0.2
- ✅ react@19.x
- ✅ @prisma/client
- ✅ next-auth@beta
- ✅ @tanstack/react-query
- ✅ @tanstack/react-query-devtools (devDependency)
- ✅ react-hook-form
- ✅ zod
- ✅ tailwindcss
- ✅ shadcn/ui components

### 2. Variables de Entorno
Verificar que `.env` existe y contiene:
```bash
DATABASE_URL="prisma+postgres://localhost:51213/..."
AUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Prisma Client Generado
```bash
npx prisma generate
```

**Salida esperada:**
```
✔ Generated Prisma Client (v6.19.0) to .\node_modules\@prisma\client
```

### 4. Servidor de Desarrollo
```bash
npm run dev
```

**Salida esperada:**
```
▲ Next.js 16.0.2 (Turbopack)
- Local:        http://localhost:3000
✓ Ready in 3s
```

---

## 🐛 Errores Comunes y Soluciones

### Error 1: Module not found '@tanstack/react-query-devtools'
**Causa:** Falta instalar el paquete de devtools

**Solución:**
```bash
npm install -D @tanstack/react-query-devtools
```

---

### Error 2: @prisma/client did not initialize yet
**Causa:** Cliente de Prisma no generado

**Solución:**
```bash
npx prisma generate
```

---

### Error 3: Can't reach database server
**Causa:** Servidor Prisma Postgres local no está corriendo

**Soluciones:**

**Opción A - Usar Prisma Postgres local:**
```bash
# Terminal 1: Iniciar servidor Prisma
npx prisma dev

# Terminal 2: Aplicar migraciones
npx prisma migrate dev --name init
```

**Opción B - Usar base de datos externa (Recomendado):**

1. Crear base de datos en [Neon](https://neon.tech) o [Supabase](https://supabase.com)
2. Actualizar `.env`:
```bash
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
```
3. Aplicar migraciones:
```bash
npx prisma migrate dev --name init
```

---

### Error 4: Middleware deprecation warning
**Warning:**
```
⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.
```

**Acción:** Este es solo un warning de Next.js 16. El middleware funciona correctamente. Se actualizará en futuras versiones cuando la API de proxy esté estable.

---

### Error 5: Multiple lockfiles warning
**Warning:**
```
⚠ Next.js inferred your workspace root, but it may not be correct.
```

**Solución:** Crear `next.config.ts`:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
```

---

## 🧪 Tests de Funcionalidad

### Test 1: Página Principal
1. Abrir http://localhost:3000
2. Verificar que se muestra:
   - ✅ Título "Autosbustamante"
   - ✅ Botón "Ver Vehículos"
   - ✅ Botón "Panel Admin"
   - ✅ Mensaje "Fase 1 completada"

### Test 2: React Query Devtools
1. En http://localhost:3000
2. Buscar el ícono de React Query en la esquina inferior (desarrollo)
3. Verificar que abre el panel de devtools

### Test 3: TypeScript
```bash
npm run build
```
**No debe haber errores de tipos**

### Test 4: ESLint
```bash
npm run lint
```
**Salida esperada:** `✔ No ESLint warnings or errors`

---

## 📊 Verificación de Estructura

```bash
# Listar estructura clave
tree /F | findstr /V "node_modules .next"
```

**Estructura esperada:**
```
autosbustamante-web/
├── app/
│   ├── api/auth/[...nextauth]/route.ts ✅
│   ├── layout.tsx ✅
│   └── page.tsx ✅
├── components/
│   └── providers.tsx ✅
├── lib/
│   ├── prisma.ts ✅
│   └── utils.ts ✅
├── prisma/
│   └── schema.prisma ✅
├── types/
│   └── next-auth.d.ts ✅
├── auth.ts ✅
├── middleware.ts ✅
├── .env ✅
├── .env.example ✅
└── package.json ✅
```

---

## 🚀 Pasos para Producción (Futuro)

### 1. Base de Datos
- [ ] Migrar a Neon/Supabase
- [ ] Configurar connection pooling
- [ ] Habilitar SSL

### 2. Autenticación
- [ ] Cambiar AUTH_SECRET (openssl rand -base64 32)
- [ ] Configurar dominios permitidos
- [ ] Habilitar rate limiting

### 3. Variables de Entorno
- [ ] Configurar en Vercel
- [ ] Nunca commitear `.env`
- [ ] Validar todas las vars necesarias

### 4. Build
```bash
npm run build
npm start
```

---

## 📝 Comandos Útiles

```bash
# Desarrollo
npm run dev                    # Servidor desarrollo
npm run build                  # Build producción
npm run lint                   # Linter
npm run type-check            # TypeScript check (crear script)

# Prisma
npx prisma generate           # Generar cliente
npx prisma studio             # GUI base de datos
npx prisma migrate dev        # Nueva migración
npx prisma migrate reset      # Reset BD (⚠️ ELIMINA DATOS)
npx prisma db push            # Push schema sin migración

# shadcn/ui
npx shadcn@latest add button  # Agregar componente
npx shadcn@latest add card    # Agregar card
```

---

## 🎯 Estado Actual: FASE 1 COMPLETADA ✅

**Funcionalidades verificadas:**
- ✅ Next.js 16 corriendo
- ✅ TypeScript sin errores
- ✅ Tailwind CSS funcionando
- ✅ Prisma schema creado
- ✅ NextAuth configurado
- ✅ React Query configurado
- ✅ shadcn/ui inicializado

**Listo para:** Fase 2 - API Routes y Componentes UI
