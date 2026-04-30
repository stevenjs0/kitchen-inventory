---
tags: [requerimientos, funcionalidades]
parent: [[00 - Inicio]]
---

# Requerimientos del Sistema

## 📱 Requerimientos Funcionales

### RF-001: Gestión de Inventario (CRUD)

| Campo | Descripción |
|-------|-------------|
| **ID** | RF-001 |
| **Nombre** | ABM de Objetos de Inventario |
| **Descripción** | El sistema permitirá Alta, Baja y Modificación de objetos del inventario |
| **Prioridad** | Alta |

**Detalles:**
- Crear nuevo objeto con: nombre, categoría, ubicación, stock inicial, stock mínimo
- Editar objeto existente (cualquier campo)
- Eliminar objeto (soft delete: `is_active = false`)
- Validar que nombre no esté vacío
- Validar que stock sea número entero no negativo

---

### RF-002: Gestión de Categorías

| Campo | Descripción |
|-------|-------------|
| **ID** | RF-002 |
| **Nombre** | ABM de Categorías |
| **Descripción** | El sistema permitirá administrar categorías para clasificar objetos |
| **Prioridad** | Media |

**Detalles:**
- Crear, editar, eliminar categorías
- Nombre único (evitar duplicados)
- Descripción opcional
- No eliminar si tiene objetos asociados (o reasignar)

---

### RF-003: Gestión de Ubicaciones

| Campo | Descripción |
|-------|-------------|
| **ID** | RF-003 |
| **Nombre** | ABM de Ubicaciones |
| **Descripción** | El sistema permitirá administrar ubicaciones físicas de la cocina |
| **Prioridad** | Media |

**Detalles:**
- Estructura jerárquica: Sección → Lado → Posición → Nivel
- Ejemplo: `Alacena → Izquierda → Arriba → Primer Nivel`
- Generar `full_path` automático para búsqueda rápida

---

### RF-004: Búsqueda Rápida

| Campo | Descripción |
|-------|-------------|
| **ID** | RF-004 |
| **Nombre** | Buscador de Elementos |
| **Descripción** | El sistema permitirá buscar rápidamente cualquier elemento y mostrar su ubicación |
| **Prioridad** | Alta |

**Detalles:**
- Búsqueda por nombre (con debounce 300ms)
- Resultados muestran: **Nombre + Categoría + Ubicación exacta**
- Full-text search en español
- Highlight de matches

---

### RF-005: Filtrado Avanzado

| Campo | Descripción |
|-------|-------------|
| **ID** | RF-005 |
| **Nombre** | Filtros Múltiples |
| **Descripción** | El sistema permitirá filtrar inventario por múltiples criterios |
| **Prioridad** | Media |

**Filtros disponibles:**
- Por categoría (multi-select con chips)
- Por ubicación (árbol jerárquico)
- Por estado de stock:
  - ✅ Stock normal
  - ⚠️ Stock bajo (< mínimo)
  - ❌ Agotado (= 0)
- Por estado activo/inactivo

---

### RF-006: Actualización Rápida de Stock

| Campo | Descripción |
|-------|-------------|
| **ID** | RF-006 |
| **Nombre** | Quick Stock Update |
| **Descripción** | El sistema permitirá actualizar stock en ≤ 3 taps desde mobile |
| **Prioridad** | Alta |

**Interacción mobile:**
```
[Producto: Atún]
Ubicación: Condimentero Izquierdo, Tercer nivel
Stock actual: 3

[-1]  [2]  [+1]  [✏️]
```
- Botones grandes (min 44x44px)
- Input directo opcional
- Optimistic update (feedback inmediato)

---

### RF-007: Exportación de Faltantes

| Campo | Descripción |
|-------|-------------|
| **ID** | RF-007 |
| **Nombre** | Exportar Lista de Faltantes |
| **Descripción** | El sistema generará archivo Markdown con elementos en stock 0 |
| **Prioridad** | Media |

**Formato de salida:**

```markdown
# Lista de Faltantes - 2026-04-30

## Alacena
- [ ] Atun (Condimentero Izquierdo, Tercer nivel)
- [ ] Avena (Alacena Abajo Derecha, Primer Nivel)

## Condimentero
- [ ] Sal Rosada (Condimentero Derecho, Primer nivel)
```

**Características:**
- Agrupado por sección
- Checkbox para marcar como comprado
- Fecha automática
- Descarga directa como `.md`

---

## 📱 Requerimientos No Funcionales

### RNF-001: Mobile-First

| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-001 |
| **Nombre** | Diseño Mobile-First |
| **Descripción** | La UI debe estar optimizada para dispositivos móviles |

**Criterios:**
- Touch targets ≥ 44x44px (Apple HIG)
- Navegación inferior tipo app nativa
- Forms con inputs grandes y espaciados
- Loading states visibles
- Feedback táctil (hover/active states)

---

### RNF-002: Performance

| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-002 |
| **Nombre** | Performance de Carga |
| **Descripción** | El sistema debe cargar rápidamente incluso en conexiones lentas |

**Metas:**
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Lighthouse Performance ≥ 90

---

### RNF-003: Arquitectura Flexible

| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-003 |
| **Nombre** | Independencia de Base de Datos |
| **Descripción** | El sistema debe permitir migrar de Supabase a Firebase sin reescribir UI |

**Estrategia:**
- Repository Pattern
- Entities sin dependencias externas
- Interfaces claras en `domain/ports/`

---

### RNF-004: Offline (Opcional)

| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-004 |
| **Nombre** | Soporte Offline Básico |
| **Descripción** | El sistema debe permitir ver inventario sin conexión |

**Implementación:**
- Service Worker para cache de lecturas
- PWA manifest
- Sync pendiente cuando recupere conexión

---

## 📊 Matriz de Prioridades

| Feature | Prioridad | Esfuerzo | Valor |
|---------|-----------|----------|-------|
| CRUD Inventario | Alta | Bajo | Alto |
| Búsqueda Rápida | Alta | Medio | Alto |
| Quick Stock Update | Alta | Bajo | Alto |
| Filtrado Avanzado | Media | Medio | Medio |
| Exportar Faltantes | Media | Bajo | Medio |
| Gestión Categorías | Baja | Bajo | Bajo |
| Gestión Ubicaciones | Baja | Bajo | Bajo |
| Offline Support | Baja | Alto | Bajo |

---
*[[00 - Inicio]] | [[02 - Arquitectura]]*
