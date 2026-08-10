import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="container mx-auto p-4 space-y-8 pb-24 md:pb-8 max-w-6xl">
      <header className="space-y-2 pb-2 border-b">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-4 w-56" />
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-card/50 rounded-xl border p-4 space-y-4">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-[240px] w-full rounded-lg" />
          </div>
        ))}
      </div>

      <div className="bg-card/50 rounded-xl border p-4 space-y-4">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-[280px] w-full rounded-lg" />
      </div>
    </div>
  );
}