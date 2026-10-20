"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { updateStock as updateStockAction } from "@/lib/actions/inventory.actions";
import { InventoryItem } from "@/features/inventory/domain/entities";

const FLUSH_DELAY_MS = 400;

interface UseBatchedStockUpdateOptions {
  itemId: string;
  initialStock: number;
  onStockCommitted?: (item: InventoryItem) => void;
}

interface UseBatchedStockUpdateResult {
  stock: number;
  pending: boolean;
  applyDelta: (delta: number) => void;
}

export function useBatchedStockUpdate({
  itemId,
  initialStock,
  onStockCommitted,
}: UseBatchedStockUpdateOptions): UseBatchedStockUpdateResult {
  const [stock, setStock] = useState(initialStock);
  const [pending, setPending] = useState(false);

  const confirmedStockRef = useRef(initialStock);

  const bufferRef = useRef<{
    delta: number;
    timer: ReturnType<typeof setTimeout> | null;
  }>({
    delta: 0,
    timer: null,
  });

  const onCommittedRef = useRef(onStockCommitted);
  useEffect(() => {
    onCommittedRef.current = onStockCommitted;
  }, [onStockCommitted]);

  useEffect(() => {
    if (bufferRef.current.delta !== 0) return;
    confirmedStockRef.current = initialStock;
    setStock(initialStock);
  }, [initialStock]);

  const flush = useCallback(async () => {
    const { delta, timer } = bufferRef.current;
    if (timer) {
      clearTimeout(timer);
      bufferRef.current.timer = null;
    }
    if (delta === 0) return;

    bufferRef.current.delta = 0;

    setPending(true);
    try {
      const result = await updateStockAction(itemId, delta);

      if (!result.success) {
        if (result.data) {
          confirmedStockRef.current = result.data.stock_quantity;
        }
        setStock(confirmedStockRef.current + bufferRef.current.delta);
        toast.error(result.error || "No se pudo actualizar el stock");
        return;
      }

      if (result.data) {
        confirmedStockRef.current = result.data.stock_quantity;
        onCommittedRef.current?.(result.data);
      }
      setStock(confirmedStockRef.current + bufferRef.current.delta);
      toast.success(
        delta > 0 ? "Stock incrementado" : "Stock decrementado",
      );
    } catch (error) {
      setStock(confirmedStockRef.current + bufferRef.current.delta);
      console.error("Failed to update stock:", error);
      toast.error("Error inesperado al actualizar el stock");
    } finally {
      setPending(false);
    }
  }, [itemId]);

  const scheduleFlush = useCallback(() => {
    if (bufferRef.current.timer) clearTimeout(bufferRef.current.timer);
    bufferRef.current.timer = setTimeout(() => {
      bufferRef.current.timer = null;
      void flush();
    }, FLUSH_DELAY_MS);
  }, [flush]);

  const applyDelta = useCallback(
    (delta: number) => {
      const next = confirmedStockRef.current + bufferRef.current.delta + delta;

      if (next < 0) return;

      bufferRef.current.delta += delta;
      setStock(next);
      scheduleFlush();
    },
    [scheduleFlush],
  );

  useEffect(() => {
    const buffer = bufferRef.current;
    return () => {
      if (buffer.delta !== 0 || buffer.timer) {
        void flush();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { stock, pending, applyDelta };
}
