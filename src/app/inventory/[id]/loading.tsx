import { Skeleton } from '@/components/ui/skeleton';

export default function ItemDetailLoading() {
  return (
    <div className="container mx-auto p-4 space-y-8 pb-24 md:pb-8 max-w-2xl">
      <header className="flex justify-between items-start">
        <div className="flex items-center gap-4 flex-1">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-full" />
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-40 rounded-3xl" />
        <Skeleton className="h-40 rounded-3xl" />
      </div>

      <Skeleton className="h-48 rounded-3xl" />
    </div>
  );
}
