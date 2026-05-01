"use client";

import { useState } from "react";
import { updateStock as updateStockAction } from "@/lib/actions/inventory.actions";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Loader2 } from "lucide-react";

interface StockQuickUpdateProps {
  itemId: string;
  currentStock: number;
}

export function StockQuickUpdate({ itemId, currentStock }: StockQuickUpdateProps) {
  const [stock, setStock] = useState(currentStock);
  const [pending, setPending] = useState(false);

  const handleUpdate = async (delta: number) => {
    setPending(true);

    const newStock = stock + delta;
    setStock(newStock);

    try {
      await updateStockAction(itemId, delta);
    } catch (error) {
      setStock(stock - delta);
      console.error("Failed to update stock:", error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex items-center bg-muted/30 rounded-full p-1 border shadow-inner">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleUpdate(-1)}
        disabled={pending || stock <= 0}
        className="h-8 w-8 rounded-full hover:bg-background transition-all"
      >
        <Minus className="h-3 w-3" />
      </Button>

      <div className="w-10 text-center relative">
        {pending ? (
          <Loader2 className="h-3 w-3 animate-spin mx-auto text-muted-foreground" />
        ) : (
          <span className="text-sm font-bold tabular-nums">
            {stock}
          </span>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleUpdate(1)}
        disabled={pending}
        className="h-8 w-8 rounded-full hover:bg-background transition-all"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}
