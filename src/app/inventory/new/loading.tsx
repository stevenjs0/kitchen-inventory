import { Skeleton } from '@/components/ui/skeleton';

export default function NewItemLoading() {
  return (
    <div className="container mx-auto p-4 space-y-8 pb-24 md:pb-8 max-w-2xl">
      <header className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <div className="pb-2 border-b space-y-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </header>

      <div className="bg-card/50 rounded-xl border p-6 space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-28 rounded-xl" />
            ))}
          </div>
        </div>
        <Skeleton className="h-12 w-full rounded-md" />
        <Skeleton className="h-12 w-full rounded-md" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-md" />
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-12 flex-1 rounded-lg" />
          <Skeleton className="h-12 flex-1 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
