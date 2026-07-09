"use client";

import { Minus, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InventoryItem } from "@/features/inventory/domain/entities";
import { useBatchedStockUpdate } from "./use-batched-stock-update";

interface StockQuickUpdateProps {
  itemId: string;
  currentStock: number;
  onStockCommitted?: (item: InventoryItem) => void;
}

export function StockQuickUpdate({
  itemId,
  currentStock,
  onStockCommitted,
}: StockQuickUpdateProps) {
  const { stock, pending, applyDelta } = useBatchedStockUpdate({
    itemId,
    initialStock: currentStock,
    onStockCommitted,
  });

  return (
    <div className="flex items-center bg-muted/30 rounded-full p-1 border shadow-inner">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => applyDelta(-1)}
        disabled={pending || stock <= 0}
        className="h-8 w-8 rounded-full hover:bg-background transition-all"
      >
        <Minus className="h-3 w-3" />
      </Button>

      <div className="w-10 text-center relative">
        {pending ? (
          <Loader2 className="h-3 w-3 animate-spin mx-auto text-muted-foreground" />
        ) : (
          <span className="text-sm font-bold tabular-nums">{stock}</span>
        )}
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => applyDelta(1)}
        disabled={pending}
        className="h-8 w-8 rounded-full hover:bg-background transition-all"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}