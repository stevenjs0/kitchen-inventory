---
tags: [inicio, proyecto]
created: 2026-04-30
---

# Sistema de Inventario de Cocina

## 📋 Descripción del Proyecto

Sistema web para gestión de inventario de cocina grande, con enfoque en **usabilidad máxima en mobile** para permitir actualizaciones rápidas de cualquier elemento o ubicación.

## 🎯 Objetivos

1. **Actualización fácil y rápida** desde el celular (≤ 3 taps)
2. **Búsqueda rápida** para identificar ubicación de elementos
3. **Filtrado avanzado** por categoría, ubicación, estado
4. **Exportación a Markdown** de elementos faltantes (stock = 0)
5. **Arquitectura flexible** para posible migración a Firebase

## 🏗️ Arquitectura

- **Framework:** Next.js 14+ (App Router)
- **Base de Datos:** Supabase (PostgreSQL)
- **UI:** Tailwind CSS + shadcn/ui
- **Arquitectura:** Hexagonal con Vertical Slicing

## 📁 Estructura del Vault

| Nota | Descripción |
|------|-------------|
| [[01 - Requerimientos]] | Detalle completo de funcionalidades |
| [[02 - Arquitectura]] | Arquitectura hexagonal y vertical slicing |
| [[03 - Base de Datos]] | Schema SQL y diseño de tablas |
| [[04 - Seeders]] | Datos iniciales de la cocina |
| [[05 - UI Mobile]] | Diseño y componentes mobile-first |
| [[06 - API]] | Endpoints y Server Actions |
| [[07 - Migración Firebase]] | Guía para futura migración |

## 🔗 Enlaces Rápidos

- [[03 - Base de Datos#Tablas Principales]]
- [[04 - Seeders#Categorías]]
- [[04 - Seeders#Ubicaciones]]
- [[05 - UI Mobile#Componentes Clave]]

---
*Última actualización: 2026-04-30*
