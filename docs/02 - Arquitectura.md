---
tags: [arquitectura, diseño, hexagonal]
parent: [[00 - Inicio]]
---

# Arquitectura del Sistema

## 🏛️ Arquitectura Hexagonal (Ports & Adapters)

```
                    ┌─────────────────────────────────────┐
                    │           UI Layer (Next.js)        │
                    │   Pages, Components, Server Actions │
                    └─────────────────┬───────────────────┘
                                      │
                    ┌─────────────────▼───────────────────┐
                    │      Application Layer (Core)       │
                    │   Use Cases, Services, DTOs         │
                    └─────────────────┬───────────────────┘
                                      │
                    ┌─────────────────▼───────────────────┐
                    │        Domain Layer (Pure)          │
                    │   Entities, Value Objects, Ports    │
                    └─────────────────┬───────────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
    ┌─────────▼─────────┐  ┌─────────▼─────────┐  ┌─────────▼─────────┐
    │   Supabase Repo   │  │   Firebase Repo   │  │   File Repo       │
    │   (Infrastructure)│  │   (Infrastructure)│  │   (Infrastructure)│
    └───────────────────┘  └───────────────────┘  └───────────────────┘
```

## 📂 Estructura de Directorios (Vertical Slicing)

```
src/
├── app/                          # App Router (thin layer)
│   ├── (auth)/                   # Grupo: autenticación
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/              # Grupo: auth required
│   │   ├── inventory/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── new/
│   │   │       └── page.tsx
│   │   ├── locations/
│   │   │   └── page.tsx
│   │   ├── categories/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   └── export/
│   │       └── missing/
│   │           └── route.ts
│   ├── layout.tsx
│   └── page.tsx
│
├── features/                     # 🟢 VERTICAL SLICING - Features independientes
│   ├── inventory/
│   │   ├── domain/
│   │   │   ├── entities.ts       # InventoryItem, Stock, Name
│   │   │   ├── value-objects.ts  # Validaciones de dominio
│   │   │   └── ports.ts          # InventoryRepository interface
│   │   ├── application/
│   │   │   ├── services/
│   │   │   │   └── inventory.service.ts
│   │   │   └── use-cases/
│   │   │       ├── create-item.use-case.ts
│   │   │       ├── update-stock.use-case.ts
│   │   │       ├── search-items.use-case.ts
│   │   │       └── export-missing.use-case.ts
│   │   └── infrastructure/
│   │       ├── repositories/
│   │       │   └── supabase-inventory.repository.ts
│   │       └── ui/
│   │           ├── inventory-list.tsx
│   │           ├── item-form.tsx
│   │           ├── stock-quick-update.tsx
│   │           └── search-bar.tsx
│   │
│   ├── locations/
│   │   ├── domain/
│   │   │   ├── entities.ts
│   │   │   └── ports.ts
│   │   ├── application/
│   │   │   └── services/
│   │   │       └── locations.service.ts
│   │   └── infrastructure/
│   │       ├── repositories/
│   │       │   └── supabase-locations.repository.ts
│   │       └── ui/
│   │           └── location-tree.tsx
│   │
│   └── categories/
│       ├── domain/
│       │   ├── entities.ts
│       │   └── ports.ts
│       ├── application/
│       │   └── services/
│       │       └── categories.service.ts
│       └── infrastructure/
│           ├── repositories/
│           │   └── supabase-categories.repository.ts
│           └── ui/
│               └── category-select.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client (cookies)
│   │   ├── middleware.ts         # Session management
│   │   └── types.ts              # DB types generados
│   ├── actions/                  # Server Actions (thin wrappers)
│   │   ├── inventory.actions.ts
│   │   ├── locations.actions.ts
│   │   └── categories.actions.ts
│   └── validations/
│       ├── inventory.schema.ts   # Zod schemas
│       ├── location.schema.ts
│       └── category.schema.ts
│
└── shared/
    ├── ui/                       # Componentes presentacionales genéricos
    │   ├── button.tsx
    │   ├── input.tsx
    │   ├── select.tsx
    │   ├── card.tsx
    │   ├── dialog.tsx
    │   ├── toast.tsx
    │   ├── mobile-nav.tsx
    │   └── loading.tsx
    └── utils/
        ├── cn.ts                 # clsx + tailwind-merge
        └── formatters.ts
```

## 🔄 Flujo de Dependencias

```
┌─────────────────────────────────────────────────────────────┐
│  app/                                                       │
│    ↓ importa de features/, lib/, shared/                    │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  features/{feature}/                                        │
│    infrastructure/ → application/ → domain/                 │
│    (depende)         (depende)        (CERO dependencias)   │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  shared/                                                    │
│    (no importa de features/ ni app/)                        │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Reglas de Arquitectura

| Capa | Puede importar de | No puede importar de |
|------|-------------------|----------------------|
| `domain/` | Nada externo | Ninguna otra capa |
| `application/` | `domain/` | `infrastructure/`, `app/` |
| `infrastructure/` | `domain/`, `application/` | Nada (es la capa externa) |
| `app/` | `features/`, `lib/`, `shared/` | Nada directo de `domain/` |
| `shared/` | Nada de `features/` | — |

## 🎯 Patrón Repository

```typescript
// features/inventory/domain/ports.ts
export interface InventoryRepository {
  findById(id: string): Promise<InventoryItem | null>;
  findAll(filters?: InventoryFilters): Promise<InventoryItem[]>;
  create(data: CreateInventoryItemDTO): Promise<InventoryItem>;
  update(id: string, data: UpdateInventoryItemDTO): Promise<InventoryItem>;
  delete(id: string): Promise<void>;
  updateStock(id: string, quantity: number): Promise<InventoryItem>;
  findMissing(): Promise<InventoryItem[]>;
}

// features/inventory/infrastructure/repositories/supabase-inventory.repository.ts
export class SupabaseInventoryRepository implements InventoryRepository {
  constructor(private db: SupabaseClient) {}
  
  async findById(id: string): Promise<InventoryItem | null> {
    const { data } = await this.db
      .from('inventory_items')
      .select('*, categories(*), locations(*)')
      .eq('id', id)
      .single();
    
    return data ? this.toEntity(data) : null;
  }
  
  // ... implementación de otros métodos
}
```

## 🔄 Migración a Firebase (Futura)

Para migrar a Firebase, solo necesitas:

1. **Crear nuevo repository:**
```typescript
// features/inventory/infrastructure/repositories/firebase-inventory.repository.ts
export class FirebaseInventoryRepository implements InventoryRepository {
  constructor(private firestore: Firestore) {}
  
  async findById(id: string): Promise<InventoryItem | null> {
    const doc = await getDoc(doc(this.firestore, 'inventory_items', id));
    return doc.exists() ? this.toEntity(doc.data()) : null;
  }
}
```

2. **Cambiar inyección de dependencia:**
```typescript
// lib/inventory.container.ts
export function getInventoryRepository() {
  // Cambiar aquí para usar Firebase
  return new SupabaseInventoryRepository(createClient());
  // return new FirebaseInventoryRepository(getFirestore());
}
```

**El resto del código NO cambia:**
- ✅ Use cases
- ✅ Entities
- ✅ UI components
- ✅ Server actions

---
*[[01 - Requerimientos]] | [[03 - Base de Datos]]*
