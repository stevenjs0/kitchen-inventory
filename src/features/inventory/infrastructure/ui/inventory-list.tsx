'use client';

import { InventoryItem } from '@/features/inventory/domain/entities';
import { StockQuickUpdate } from './stock-quick-update';
import { formatStockStatus } from '@/shared/utils/formatters';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { MapPin, ChevronRight, Edit3, Eye, Tag } from 'lucide-react';

interface InventoryListProps {
  items: InventoryItem[];
}

export function InventoryList({ items }: InventoryListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground">
        <p>No hay items en el inventario</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {items.map((item) => {
        const stockInfo = formatStockStatus(
          item.stock_quantity,
          item.min_stock,
        );

        // Map status color to badge variant
        const badgeVariant:
          | 'destructive'
          | 'warning'
          | 'success'
          | 'secondary' = stockInfo.color.includes('red')
          ? 'destructive'
          : stockInfo.color.includes('amber')
            ? 'warning'
            : stockInfo.color.includes('green')
              ? 'success'
              : 'secondary';

        return (
          <Card
            key={item.id}
            className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-200 bg-card/50 backdrop-blur-sm border-l-4"
            style={{
              borderLeftColor: stockInfo.color.includes('red')
                ? 'rgb(239, 68, 68)'
                : stockInfo.color.includes('amber')
                  ? 'rgb(245, 158, 11)'
                  : 'transparent',
            }}
          >
            <CardHeader className="p-4 pb-2 flex flex-row items-start gap-3">
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-base leading-tight truncate">
                  {item.name}
                </h3>
                <Badge
                  variant={badgeVariant}
                  className="text-[10px] px-1.5 py-0 h-4 uppercase tracking-tighter shrink-0"
                >
                  {stockInfo.label}
                </Badge>
              </div>
              {item.category && (
                <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider">
                  <Tag
                    className="h-3 w-3 shrink-0"
                    style={{ color: item.category.color || '#6B7280' }}
                  />
                  <span
                    className="truncate"
                    style={{ color: item.category.color || '#6B7280' }}
                  >
                    {item.category.name}
                  </span>
                </div>
              )}
            </div>
            <StockQuickUpdate
              itemId={item.id}
              currentStock={item.stock_quantity}
            />
          </CardHeader>

            <CardContent className="p-4 pt-0 pb-3 space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">{item.location?.full_path}</span>
              </div>
              {(item.updated_by || item.updated_at) && (
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
                  <span>
                    Actualizado{item.updated_by ? ` por ${item.updated_by}` : ''}
                    {item.updated_at ? ` • ${new Date(item.updated_at).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}` : ''}
                  </span>
                </div>
              )}
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-end gap-2">
              <Link href={`/inventory/${item.id}?edit=true`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                >
                  <Edit3 className="h-3.5 w-3.5 mr-1" />
                  <span className="text-xs">Editar</span>
                </Button>
              </Link>
              <Link href={`/inventory/${item.id}`}>
                <Button variant="secondary" size="sm" className="h-8 px-2">
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  <span className="text-xs">Detalles</span>
                  <ChevronRight className="h-3 w-3 ml-0.5" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
