'use client';

import { useMemo } from 'react';
import { Pie, PieChart, Bar, BarChart, Cell, XAxis, YAxis } from 'recharts';
import { InventoryItem } from '@/features/inventory/domain/entities';
import { Room } from '@/features/rooms/domain/entities';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  aggregateStockByCategory,
  aggregateStockByRoom,
  aggregateStockStatus,
} from '../../domain/stats';

interface DashboardContainerProps {
  initialItems: InventoryItem[];
  rooms: Room[];
}

export function DashboardContainer({
  initialItems,
  rooms,
}: DashboardContainerProps) {
  const items = initialItems.filter((item) => item.is_active);

  const byCategory = useMemo(() => aggregateStockByCategory(items), [items]);
  const byRoom = useMemo(
    () => aggregateStockByRoom(items, rooms),
    [items, rooms],
  );
  const status = useMemo(() => aggregateStockStatus(items), [items]);

  const statusConfig = {
    total: { label: 'Total' },
    normal: { label: 'Normal', color: '#10B981' },
    low: { label: 'Bajo', color: '#F59E0B' },
    out: { label: 'Agotado', color: '#EF4444' },
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Stock por categoría</CardTitle>
            <CardDescription>
              Cantidad total de stock agrupada por categoría
            </CardDescription>
          </CardHeader>
          <CardContent>
            {byCategory.length === 0 ? (
              <EmptyState message="No hay items con categoría asignada" />
            ) : (
              <ChartContainer config={{}} className="h-[300px]">
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent nameKey="name" />}
                  />
                  <Pie
                    data={byCategory}
                    dataKey="total"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                  >
                    {byCategory.map((entry) => (
                      <Cell key={entry.categoryId} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Estado de stock</CardTitle>
            <CardDescription>
              Items según su estado respecto al stock mínimo (Normal, Bajo,
              Agotado)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status.length === 0 ? (
              <EmptyState />
            ) : (
              <ChartContainer
                config={statusConfig}
                className="h-[300px]"
              >
                <BarChart data={status} layout="vertical" margin={{ left: 10 }}>
                  <YAxis
                    dataKey="label"
                    type="category"
                    width={60}
                    tickLine={false}
                    axisLine={false}
                  />
                  <XAxis dataKey="count" type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        nameKey="status"
                        labelKey="label"
                      />
                    }
                  />
                  <Bar dataKey="count" radius={4} name="cantidad">
                    {status.map((entry) => (
                      <Cell
                        key={entry.status}
                        fill={statusConfig[entry.status].color}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Stock por ambiente</CardTitle>
          <CardDescription>
            Cantidad total de stock agrupada por ambiente
          </CardDescription>
        </CardHeader>
        <CardContent>
          {byRoom.length === 0 ? (
            <EmptyState />
          ) : (
            <ChartContainer config={{}} className="h-[320px]">
              <BarChart
                data={byRoom}
                margin={{ top: 10, left: 0, right: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  interval={0}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="total" radius={6} name="Stock">
                  {byRoom.map((entry) => (
                    <Cell key={entry.roomId} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * To keep the visual consistent with the empty state of other sections.
 */
function EmptyState({ message = 'Sin datos para mostrar' }: { message?: string }) {
  return (
    <div className="flex h-full min-h-[120px] items-center justify-center text-sm text-muted-foreground">
      {message}
    </div>
  );
}