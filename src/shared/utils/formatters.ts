import type { StockStatus } from "@/features/inventory/domain/entities";

export function formatStockStatus(stock: number, minStock: number): {
  status: StockStatus;
  label: string;
  color: string;
} {
  if (stock === 0) {
    return { status: "out", label: "Agotado", color: "text-red-600" };
  }
  if (stock < minStock) {
    return { status: "low", label: "Stock bajo", color: "text-amber-600" };
  }
  return { status: "normal", label: "Normal", color: "text-green-600" };
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString("es-AR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
