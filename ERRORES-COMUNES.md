# Errores Comunes y Soluciones

## ⚠️ Warning de Hidratación: `bis_skin_checked="1"`

### Descripción del Error
```
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
- bis_skin_checked="1"
```

### ¿Qué es este error?
Este error **NO es causado por tu código**. Es provocado por extensiones del navegador (especialmente **Bitdefender** o extensiones de seguridad) que inyectan atributos adicionales en el HTML.

### ¿Afecta a producción?
**No**. Este error solo ocurre en desarrollo local cuando tienes extensiones instaladas. En producción (Vercel) no aparecerá.

### Soluciones

#### 1. Ignorar el warning (Más fácil)
Es completamente seguro ignorar este warning ya que no afecta la funcionalidad.

#### 2. Desactivar extensiones temporalmente
- Abre el navegador en modo incógnito (sin extensiones)
- O desactiva temporalmente Bitdefender/extensiones de seguridad

#### 3. Suprimir warnings específicos
Ya agregamos `suppressHydrationWarning` en los layouts principales para minimizar estos warnings.

---

## 🔧 Otros Errores Comunes

### Error: Prisma Client no inicializado
**Solución**: Ejecutar `npm run db:generate`

### Error 500 en API de vehículos
**Causas comunes**:
- Campo incorrecto en la base de datos (ej: `alt` vs `altText`)
- Tipo de dato incorrecto
- Validación de Zod fallida

**Solución**: Revisar logs del servidor y verificar que los campos coincidan con el schema de Prisma

### Error de tipos en TypeScript
**Solución**: 
1. Verificar que `types/api.ts` coincida con `prisma/schema.prisma`
2. Ejecutar `npm run type-check`

---

## 📝 Notas

- Los warnings de hidratación por extensiones del navegador son normales en desarrollo
- Siempre verifica que la aplicación funcione correctamente en producción (Vercel)
- Si un error solo aparece localmente, probablemente sea por extensiones del navegador
