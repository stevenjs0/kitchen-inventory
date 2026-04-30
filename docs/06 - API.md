---
tags: [api, server-actions, endpoints]
parent: [[02 - Arquitectura]]
---

# API y Server Actions

## 📡 Arquitectura de Comunicación

```
┌─────────────────────────────────────────────────────────┐
│  UI Components (Client)                                 │
│    ↓ usa                                                │
│  Server Actions (thin wrappers)                         │
│    ↓ llama a                                            │
│  Use Cases (Application Layer)                          │
│    ↓ usa                                                │
│  Repositories (Infrastructure)                          │
│    ↓ consulta                                           │
│  Supabase (Database)                                    │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Server Actions

### Inventory Actions

```typescript
// lib/actions/inventory.actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { getInventoryService } from '@/features/inventory/application/services/inventory.service'
import { CreateInventoryItemDTO, UpdateInventoryItemDTO } from '@/features/inventory/domain/entities'

export async function createInventoryItem(data: CreateInventoryItemDTO) {
  const service = getInventoryService()
  
  const result = await service.createItem(data)
  
  if (result.success) {
    revalidatePath('/inventory')
    revalidatePath('/')
  }
  
  return result
}

export async function updateInventoryItem(
  id: string, 
  data: UpdateInventoryItemDTO
) {
  const service = getInventoryService()
  const result = await service.updateItem(id, data)
  
  if (result.success) {
    revalidatePath('/inventory')
    revalidatePath(`/inventory/${id}`)
  }
  
  return result
}

export async function deleteInventoryItem(id: string) {
  const service = getInventoryService()
  const result = await service.deleteItem(id)
  
  if (result.success) {
    revalidatePath('/inventory')
    revalidatePath('/')
  }
  
  return result
}

export async function updateStock(id: string, delta: number) {
  const service = getInventoryService()
  const result = await service.updateStock(id, delta)
  
  if (result.success) {
    revalidatePath('/inventory')
    revalidatePath('/')
  }
  
  return result
}

export async function searchInventoryItems(query: string) {
  const service = getInventoryService()
  return await service.searchItems(query)
}
```

### Locations Actions

```typescript
// lib/actions/locations.actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { getLocationsService } from '@/features/locations/application/services/locations.service'

export async function createLocation(data: {
  name: string
  section: string
  side?: string
  position?: string
  level: string
}) {
  const service = getLocationsService()
  const result = await service.createLocation(data)
  
  if (result.success) {
    revalidatePath('/locations')
    revalidatePath('/inventory')
  }
  
  return result
}

export async function getLocationsTree() {
  const service = getLocationsService()
  return await service.getAllLocations()
}
```

### Categories Actions

```typescript
// lib/actions/categories.actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { getCategoriesService } from '@/features/categories/application/services/categories.service'

export async function getAllCategories() {
  const service = getCategoriesService()
  return await service.getAllCategories()
}

export async function createCategory(data: {
  name: string
  description?: string
  color?: string
}) {
  const service = getCategoriesService()
  const result = await service.createCategory(data)
  
  if (result.success) {
    revalidatePath('/categories')
    revalidatePath('/inventory')
  }
  
  return result
}
```

---

## 🌐 API Routes

### Export Missing Items (Markdown)

```typescript
// app/api/export/missing/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getInventoryService } from '@/features/inventory/application/services/inventory.service'

export async function GET(request: NextRequest) {
  try {
    const service = getInventoryService()
    const missingItems = await service.getMissingItems()
    
    // Agrupar por sección
    const grouped = missingItems.reduce((acc, item) => {
      const section = item.location?.section || 'Sin Ubicación'
      if (!acc[section]) acc[section] = []
      acc[section].push(item)
      return acc
    }, {} as Record<string, typeof missingItems>)
    
    // Generar Markdown
    const today = new Date().toISOString().split('T')[0]
    let markdown = `# Lista de Faltantes - ${today}\n\n`
    
    for (const [section, items] of Object.entries(grouped)) {
      markdown += `## ${section}\n\n`
      for (const item of items) {
        const location = item.location?.full_path || 'Ubicación desconocida'
        markdown += `- [ ] ${item.name} (${location})\n`
      }
      markdown += '\n'
    }
    
    // Retornar como archivo descargable
    return new NextResponse(markdown, {
      headers: {
        'Content-Type': 'text/markdown',
        'Content-Disposition': `attachment; filename="faltantes-${today}.md"`,
      },
    })
  } catch (error) {
    console.error('Error exporting missing items:', error)
    return NextResponse.json(
      { error: 'Failed to export missing items' },
      { status: 500 }
    )
  }
}
```

### Export Missing Items (JSON)

```typescript
// app/api/export/missing/json/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getInventoryService } from '@/features/inventory/application/services/inventory.service'

export async function GET(request: NextRequest) {
  try {
    const service = getInventoryService()
    const missingItems = await service.getMissingItems()
    
    return NextResponse.json({
      exportedAt: new Date().toISOString(),
      totalMissing: missingItems.length,
      items: missingItems.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category?.name,
        location: item.location?.full_path,
        minStock: item.min_stock,
      })),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to export missing items' },
      { status: 500 }
    )
  }
}
```

---

## 📦 Use Cases (Application Layer)

### Inventory Service

```typescript
// features/inventory/application/services/inventory.service.ts
import { InventoryRepository } from '@/features/inventory/domain/ports'
import { InventoryItem, CreateInventoryItemDTO, UpdateInventoryItemDTO } from '@/features/inventory/domain/entities'

export class InventoryService {
  constructor(private repository: InventoryRepository) {}

  async createItem(data: CreateInventoryItemDTO): Promise<Result<InventoryItem>> {
    // Validaciones de dominio
    if (!data.name || data.name.trim().length === 0) {
      return { success: false, error: 'El nombre es requerido' }
    }
    
    if (data.stock_quantity < 0) {
      return { success: false, error: 'El stock no puede ser negativo' }
    }
    
    return await this.repository.create(data)
  }

  async updateItem(
    id: string, 
    data: UpdateInventoryItemDTO
  ): Promise<Result<InventoryItem>> {
    const existing = await this.repository.findById(id)
    
    if (!existing) {
      return { success: false, error: 'Item no encontrado' }
    }
    
    return await this.repository.update(id, data)
  }

  async deleteItem(id: string): Promise<Result<void>> {
    return await this.repository.delete(id)
  }

  async updateStock(id: string, delta: number): Promise<Result<InventoryItem>> {
    const item = await this.repository.findById(id)
    
    if (!item) {
      return { success: false, error: 'Item no encontrado' }
    }
    
    const newStock = item.stock_quantity + delta
    
    if (newStock < 0) {
      return { success: false, error: 'El stock no puede ser negativo' }
    }
    
    return await this.repository.update(id, { stock_quantity: newStock })
  }

  async searchItems(query: string): Promise<InventoryItem[]> {
    if (!query || query.trim().length < 2) {
      return []
    }
    
    return await this.repository.search(query)
  }

  async getMissingItems(): Promise<InventoryItem[]> {
    return await this.repository.findMissing()
  }

  async getItemsByCategory(categoryId: string): Promise<InventoryItem[]> {
    return await this.repository.findByCategory(categoryId)
  }

  async getItemsByLocation(locationId: string): Promise<InventoryItem[]> {
    return await this.repository.findByLocation(locationId)
  }
}

// Tipo de resultado
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string }
```

### Export Missing Use Case

```typescript
// features/inventory/application/use-cases/export-missing.use-case.ts
import { InventoryRepository } from '@/features/inventory/domain/ports'
import { InventoryItem } from '@/features/inventory/domain/entities'

export class ExportMissingUseCase {
  constructor(private repository: InventoryRepository) {}

  async execute(): Promise<ExportData> {
    const missingItems = await this.repository.findMissing()
    
    // Agrupar por sección
    const grouped = this.groupBySection(missingItems)
    
    return {
      exportedAt: new Date().toISOString(),
      totalMissing: missingItems.length,
      grouped,
    }
  }

  private groupBySection(items: InventoryItem[]): Record<string, InventoryItem[]> {
    return items.reduce((acc, item) => {
      const section = item.location?.section || 'Sin Ubicación'
      if (!acc[section]) acc[section] = []
      acc[section].push(item)
      return acc
    }, {} as Record<string, InventoryItem[]>)
  }

  toMarkdown(data: ExportData): string {
    const today = data.exportedAt.split('T')[0]
    let markdown = `# Lista de Faltantes - ${today}\n\n`
    
    for (const [section, items] of Object.entries(data.grouped)) {
      markdown += `## ${section}\n\n`
      for (const item of items) {
        const location = item.location?.full_path || 'Ubicación desconocida'
        markdown += `- [ ] ${item.name} (${location})\n`
      }
      markdown += '\n'
    }
    
    return markdown
  }
}

interface ExportData {
  exportedAt: string
  totalMissing: number
  grouped: Record<string, InventoryItem[]>
}
```

---

## 🔄 Flujo Completo: Actualizar Stock

```
1. Usuario toca [+1] en mobile
         ↓
2. Client Component (StockQuickUpdate)
         ↓
3. Server Action (updateStock)
         ↓
4. Use Case (InventoryService.updateStock)
         ↓
5. Repository (SupabaseInventoryRepository)
         ↓
6. Supabase (UPDATE inventory_items SET stock_quantity = ...)
         ↓
7. Optimistic update en UI (feedback inmediato)
         ↓
8. revalidatePath() (refresca datos en background)
```

**Código del componente:**

```tsx
// features/inventory/infrastructure/ui/stock-quick-update.tsx
'use client'

import { useState, useOptimistic } from 'react'
import { updateStock as updateStockAction } from '@/lib/actions/inventory.actions'

interface StockQuickUpdateProps {
  itemId: string
  currentStock: number
}

export function StockQuickUpdate({ itemId, currentStock }: StockQuickUpdateProps) {
  const [stock, setStock] = useState(currentStock)
  const [pending, setPending] = useState(false)

  const handleUpdate = async (delta: number) => {
    setPending(true)
    
    // Optimistic update
    const newStock = stock + delta
    setStock(newStock)
    
    try {
      await updateStockAction(itemId, delta)
    } catch (error) {
      // Rollback en caso de error
      setStock(stock - delta)
      console.error('Failed to update stock:', error)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleUpdate(-1)}
        disabled={pending || stock <= 0}
        className="w-10 h-10 rounded-full bg-red-100 text-red-600 
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        −
      </button>
      
      <span className={`w-8 text-center font-semibold ${
        stock === 0 ? 'text-red-600' : 
        stock < 3 ? 'text-amber-600' : 'text-green-600'
      }`}>
        {stock}
      </span>
      
      <button
        onClick={() => handleUpdate(1)}
        disabled={pending}
        className="w-10 h-10 rounded-full bg-green-100 text-green-600
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  )
}
```

---

## 🎯 Tipos y DTOs

```typescript
// features/inventory/domain/entities.ts

export interface InventoryItem {
  id: string
  name: string
  category_id: string
  location_id: string
  stock_quantity: number
  min_stock: number
  unit: string
  notes?: string
  is_active: boolean
  created_at: Date
  updated_at: Date
  last_stock_update?: Date
  
  // Relaciones (populadas)
  category?: Category
  location?: Location
}

export interface Category {
  id: string
  name: string
  description?: string
  color?: string
}

export interface Location {
  id: string
  name: string
  section: string
  side?: string
  position?: string
  level: string
  full_path: string
}

// DTOs para operaciones
export interface CreateInventoryItemDTO {
  name: string
  category_id: string
  location_id: string
  stock_quantity: number
  min_stock: number
  unit?: string
  notes?: string
}

export interface UpdateInventoryItemDTO {
  name?: string
  category_id?: string
  location_id?: string
  stock_quantity?: number
  min_stock?: number
  unit?: string
  notes?: string
}

export interface InventoryFilters {
  category_id?: string
  location_id?: string
  stock_status?: 'normal' | 'low' | 'empty'
  search?: string
}
```

---
*[[05 - UI Mobile]] | [[07 - Migración Firebase]]*
