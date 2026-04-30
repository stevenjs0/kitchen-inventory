---
tags: [ui, mobile, diseño, componentes]
parent: [[00 - Inicio]]
---

# Diseño UI Mobile-First

## 📱 Principios de Diseño

### 1. Touch Targets (Apple HIG)

```
✅ Mínimo: 44x44 puntos
✅ Ideal: 48x48 puntos
✅ Espaciado entre elementos: 8px mínimo
```

### 2. Jerarquía Visual

```
┌─────────────────────────────────────┐
│  HEADER (sticky)                    │
│  [🔍 Buscador____________] [📷]    │
├─────────────────────────────────────┤
│  FILTROS (scroll horizontal)        │
│  [Todos] [Sazon] [Granos] [Hierbas] │
├─────────────────────────────────────┤
│  LISTA (scroll vertical)            │
│  ┌─────────────────────────────┐    │
│  │ 🥫 Atun                     │    │
│  │    Enlatados                │    │
│  │ 📍 Condimentero Izq, 3er   │    │
│  │    [0] ⚠️ Agotado           │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ 🌾 Avena                    │    │
│  │    Cereal                   │    │
│  │ 📍 Alacena Abajo Der, 1er  │    │
│  │    [5] ✅                   │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  NAV BAR (fixed bottom)             │
│  [🏠] [📦] [📍] [⚙️]               │
└─────────────────────────────────────┘
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores

```css
/* Primarios */
--primary: #10B981;        /* Verde esmeralda - acciones principales */
--primary-foreground: #fff;

/* Estados de Stock */
--stock-normal: #10B981;   /* Verde - stock OK */
--stock-low: #F59E0B;      /* Ámbar - stock bajo */
--stock-empty: #EF4444;    /* Rojo - agotado */

/* Categorías (colores definidos en DB) */
--cat-aceite: #FCD34D;
--cat-cereal: #F97316;
--cat-sazon: #EF4444;
--cat-hierbas: #22C55E;
/* ... ver [[04 - Seeders#Categorías]] */

/* Neutros */
--background: #FAFAFA;
--card: #FFFFFF;
--border: #E5E7EB;
--muted: #6B7280;
```

### Tipografía

```css
/* Tamaños mobile-first */
--text-xs: 0.75rem;    /* 12px - metadata */
--text-sm: 0.875rem;   /* 14px - secondary */
--text-base: 1rem;     /* 16px - body */
--text-lg: 1.125rem;   /* 18px - titles */
--text-xl: 1.25rem;    /* 20px - headers */

/* Pesos */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## 🧩 Componentes Clave

### 1. SearchBar (Sticky Header)

```tsx
// features/inventory/infrastructure/ui/search-bar.tsx
┌──────────────────────────────────────────┐
│ 🔍 [Buscar (atún, harina...)]    [📷]   │
└──────────────────────────────────────────┘

Props:
- value: string
- onSearch: (query: string) => void
- placeholder?: string
- showBarcodeScanner?: boolean
```

**Comportamiento:**
- Sticky en top del viewport
- Debounce 300ms en búsqueda
- Icono de escáner de código de barras (futuro)

---

### 2. FilterChips (Scroll Horizontal)

```tsx
// features/inventory/infrastructure/ui/filter-chips.tsx
┌────────────────────────────────────────────────────┐
│ [Todos ●] [Sazon] [Granos] [Hierbas] [Salsas ▼]  │
└────────────────────────────────────────────────────┘

Props:
- categories: Category[]
- selected: string[]
- onToggle: (categoryId: string) => void
- maxVisible?: number
```

**Comportamiento:**
- Scroll horizontal con snap
- Primer chip siempre visible ("Todos")
- Badge con count de items por categoría

---

### 3. InventoryCard

```tsx
// features/inventory/infrastructure/ui/inventory-card.tsx
┌──────────────────────────────────────────┐
│ 🥫 Atun                           [⚠️ 0] │
│    Enlatados                             │
│                                          │
│ 📍 Condimentero Izquierdo               │
│    Tercer nivel                          │
│                                          │
│ [−1]  [ 2 ]  [+1]     [✏️ Editar]       │
└──────────────────────────────────────────┘

Props:
- item: InventoryItem
- onStockChange: (id: string, delta: number) => void
- onEdit: (id: string) => void
```

**Estados:**
```tsx
// Stock normal (>= min_stock)
[5] ✅ verde

// Stock bajo (< min_stock)
[2] ⚠️ ámbar

// Agotado (= 0)
[0] ❌ rojo
```

---

### 4. StockQuickUpdate

```tsx
// features/inventory/infrastructure/ui/stock-quick-update.tsx

// Vista rápida (inline en card)
┌─────────────────────────────┐
│ [−]  [ 3 ]  [+]    [✏️]    │
└─────────────────────────────┘

// Modal de edición directa
┌─────────────────────────────┐
│  Actualizar Stock           │
│                             │
│  Atun                       │
│  Stock actual: 3            │
│                             │
│  [−5] [−1] [ 3 ] [+1] [+5] │
│                             │
│  O ingresar manualmente:    │
│  [_____]                    │
│                             │
│  [Cancelar]  [Guardar]      │
└─────────────────────────────┘
```

---

### 5. MobileNav (Bottom Bar)

```tsx
// shared/ui/mobile-nav.tsx
┌──────────────────────────────────────────┐
│  [🏠]     [📦]      [📍]     [⚙️]       │
│  Inicio   Inventario  Lugares  Ajustes  │
└──────────────────────────────────────────┘

Items:
- { href: '/', icon: Home, label: 'Inicio' }
- { href: '/inventory', icon: Box, label: 'Inventario' }
- { href: '/locations', icon: MapPin, label: 'Lugares' }
- { href: '/settings', icon: Settings, label: 'Ajustes' }
```

**Comportamiento:**
- Fixed en bottom
- Active state con color primario
- Safe area padding para dispositivos con notch

---

### 6. MissingList (Export View)

```tsx
// features/inventory/infrastructure/ui/missing-list.tsx
┌──────────────────────────────────────────┐
│  📋 Lista de Faltantes                   │
│     2026-04-30                           │
├──────────────────────────────────────────┤
│  ## Alacena                              │
│  ☐ Atun (Condimentero Izq, 3er)         │
│  ☐ Avena (Alacena Abajo Der, 1er)       │
│                                          │
│  ## Condimentero                         │
│  ☐ Sal Rosada (Condimentero Der, 1er)   │
├──────────────────────────────────────────┤
│  [📤 Exportar MD]  [🖨️ Imprimir]        │
└──────────────────────────────────────────┘
```

---

## 📐 Layouts por Página

### Página de Inicio / Inventario

```tsx
┌─────────────────────────────────────┐
│ [🔍 Buscar...]              [📷]    │ ← sticky
├─────────────────────────────────────┤
│ [Todos] [Sazon] [Granos] [+12 ▼]   │ ← scroll horizontal
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🥫 Atun              [⚠️ 0] │   │
│  │    Enlatados                │   │
│  │ 📍 Condimentero Izq, 3er   │   │
│  │ [−] [0] [+]    [✏️]        │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🌾 Avena             [✅ 5] │   │
│  │    Cereal                   │   │
│  │ 📍 Alacena Abajo Der, 1er  │   │
│  │ [−] [5] [+]    [✏️]        │   │
│  └─────────────────────────────┘   │
│                                     │
│         ... más items ...           │
│                                     │
├─────────────────────────────────────┤
│ [🏠]   [📦●]    [📍]     [⚙️]       │ ← fixed bottom
└─────────────────────────────────────┘
```

### Página de Detalle de Item

```tsx
┌─────────────────────────────────────┐
│ [← Volver]              [✏️] [🗑️]  │
├─────────────────────────────────────┤
│                                     │
│           🥫 ATUN                   │
│                                     │
│  Categoría:  Enlatados              │
│  Ubicación:  Condimentero Izq       │
│              Tercer nivel           │
│                                     │
│  ┌─────────────────────────────┐   │
│  │      STOCK ACTUAL: 0        │   │
│  │         ⚠️ AGOTADO          │   │
│  └─────────────────────────────┘   │
│                                     │
│  Stock mínimo: 2                    │
│  Unidad: unidad                     │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Actualizar rápidamente:    │   │
│  │  [−5] [−1] [0] [+1] [+5]    │   │
│  │  [_____] [Actualizar]       │   │
│  └─────────────────────────────┘   │
│                                     │
│  Notas:                             │
│  ┌─────────────────────────────┐   │
│  │ Recordar comprar en         │   │
│  │ próxima visita al súper     │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│ [🏠]   [📦●]    [📍]     [⚙️]       │
└─────────────────────────────────────┘
```

### Página de Ubicaciones

```tsx
┌─────────────────────────────────────┐
│ [← Inventario]           [+]        │
│  📍 Ubicaciones                     │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │ 🏠 Alacena                  │   │
│  │    45 items                 │   │
│  │    ┌─────────────────────┐  │   │
│  │    │ ▸ Arriba Izquierda  │  │   │
│  │    │ ▸ Arriba Derecha    │  │   │
│  │    │ ▸ Abajo Izquierda   │  │   │
│  │    │ ▸ Abajo Derecha     │  │   │
│  │    └─────────────────────┘  │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🧂 Condimentero             │   │
│  │    38 items                 │   │
│  │    ┌─────────────────────┐  │   │
│  │    │ ▸ Izquierdo         │  │   │
│  │    │ ▸ Derecho           │  │   │
│  │    └─────────────────────┘  │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│ [🏠]   [📦]     [📍●]    [⚙️]       │
└─────────────────────────────────────┘
```

---

## 🎯 Optimizaciones Mobile

### 1. Virtual Scrolling (para listas largas)

```tsx
// Usar react-window o tanstack-virtual para >50 items
import { useVirtualizer } from '@tanstack/react-virtual'

// Renderiza solo items visibles en viewport
```

### 2. Optimistic Updates

```tsx
// Actualizar UI inmediatamente, sync en background
const updateStock = async (id: string, delta: number) => {
  // Optimistic update
  setItems(prev => prev.map(item => 
    item.id === id 
      ? { ...item, stock_quantity: item.stock_quantity + delta }
      : item
  ))
  
  // Sync con servidor
  await inventoryService.updateStock(id, delta)
}
```

### 3. Swipe Actions (Opcional)

```tsx
// Usar react-swipeable para acciones rápidas
<Swipeable
  onSwipedLeft={() => handleEdit(item.id)}
  onSwipedRight={() => handleDelete(item.id)}
>
  <InventoryCard {...item} />
</Swipeable>
```

---

## 📱 Breakpoints Tailwind

```ts
// tailwind.config.ts
module.exports = {
  theme: {
    screens: {
      'sm': '640px',   // Mobile landscape
      'md': '768px',   // Tablet
      'lg': '1024px',  // Desktop pequeño
      'xl': '1280px',  // Desktop
      '2xl': '1536px', // Desktop grande
    }
  }
}
```

**Mobile-first approach:**
```tsx
// Estilos base = mobile
<div className="p-4 md:p-6 lg:p-8">
  {/* Padding: 16px mobile, 24px tablet, 32px desktop */}
</div>
```

---
*[[04 - Seeders]] | [[06 - API]]*
