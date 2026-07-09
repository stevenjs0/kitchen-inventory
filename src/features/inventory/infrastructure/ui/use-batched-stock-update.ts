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
  flushNow: () => Promise<void>;
}

export function useBatchedStockUpdate({
  itemId,
  initialStock,
  onStockCommitted,
}: UseBatchedStockUpdateOptions): UseBatchedStockUpdateResult {
  const [stock, setStock] = useState(initialStock);
  const [pending, setPending] = useState(false);

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
        setStock((current) => current - delta);
        toast.error(result.error || "No se pudo actualizar el stock");
        return;
      }
      if (result.data) {
        setStock(result.data.stock_quantity);
        onCommittedRef.current?.(result.data);
      }
      toast.success(
        delta > 0 ? "Stock incrementado" : "Stock decrementado",
      );
    } catch (error) {
      setStock((current) => current - delta);
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
      setStock((current) => {
        const next = current + delta;
        if (next < 0) return current;
        return next;
      });
      if (stock + delta < 0) return;

      bufferRef.current.delta += delta;
      scheduleFlush();
    },
    [scheduleFlush, stock],
  );

  const flushNow = useCallback(async () => {
    await flush();
  }, [flush]);

  useEffect(() => {
    const buffer = bufferRef.current;
    return () => {
      if (buffer.delta !== 0 || buffer.timer) {
        void flush();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { stock, pending, applyDelta, flushNow };
}