import { getInventoryItemById, updateInventoryItem } from "@/lib/actions/inventory.actions";
import { getAllCategories } from "@/lib/actions/categories.actions";
import { getLocationsTree } from "@/lib/actions/locations.actions";
import { getAllRooms } from "@/lib/actions/rooms.actions";
import { CreateInventoryItemDTO } from "@/features/inventory/domain/entities";
import { ItemForm } from "@/features/inventory/infrastructure/ui/item-form";
import { DeleteItemButton } from "@/features/inventory/infrastructure/ui/delete-item-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatStockStatus } from "@/shared/utils/formatters";
import { ChevronLeft, Edit3, MapPin, Tag, Calendar, AlertCircle } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ edit?: string }>;
};

export default async function ItemPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const { edit } = await searchParams;
  const isEditing = edit === "true";

  const [item, categories, locations, rooms] = await Promise.all([
    getInventoryItemById(id),
    getAllCategories(),
    getLocationsTree(),
    getAllRooms(),
  ]);

  if (!item) {
    notFound();
  }

  const handleUpdate = async (data: CreateInventoryItemDTO) => {
    "use server";
    await updateInventoryItem(id, data);
    revalidatePath(`/inventory/${id}`);
    redirect(`/inventory/${id}`);
  };

  const stockInfo = formatStockStatus(item.stock_quantity, item.min_stock);
  const badgeVariant: "destructive" | "warning" | "success" | "secondary" =
    stockInfo.color.includes('red') ? 'destructive' :
    stockInfo.color.includes('amber') ? 'warning' :
    stockInfo.color.includes('green') ? 'success' : 'secondary';

  if (isEditing) {
    return (
      <div className="container mx-auto p-4 space-y-8 pb-24 md:pb-8 max-w-2xl">
        <header className="flex items-center gap-4">
          <Link href={`/inventory/${id}`}>
            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Editar Item</h1>
            <p className="text-sm text-muted-foreground">{item.name}</p>
          </div>
        </header>
        <main className="bg-card/50 backdrop-blur-sm rounded-3xl border p-6 shadow-sm">
        <ItemForm
          item={item}
          categories={categories}
          locations={locations}
          rooms={rooms}
          onSubmit={handleUpdate}
        />
        </main>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8 pb-24 md:pb-8 max-w-2xl">
      <header className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <Link href="/inventory">
            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{item.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={badgeVariant} className="uppercase tracking-tighter text-[10px]">
                {stockInfo.label}
              </Badge>
              <span className="text-sm text-muted-foreground">{item.category?.name}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <DeleteItemButton itemId={item.id} itemName={item.name} />
          <Link href={`/inventory/${id}?edit=true`}>
            <Button variant="outline" size="sm" className="rounded-full gap-2">
              <Edit3 className="h-4 w-4" /> Editar
            </Button>
          </Link>
        </div>
      </header>

      <main className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card/50 backdrop-blur-sm rounded-3xl border p-6 flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Stock Actual</span>
            <span className="text-5xl font-black text-primary">{item.stock_quantity}</span>
            <span className="text-xs font-bold text-muted-foreground uppercase">{item.unit || 'unidades'}</span>
          </div>
          <div className="bg-card/50 backdrop-blur-sm rounded-3xl border p-6 flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Mínimo</span>
            <span className="text-5xl font-black text-amber-500">{item.min_stock}</span>
            <span className="text-xs font-bold text-muted-foreground uppercase">{item.unit || 'unidades'}</span>
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-sm rounded-3xl border divide-y overflow-hidden">
          <div className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Ubicación Exacta</p>
              <p className="font-semibold">{item.location?.full_path || 'No especificada'}</p>
            </div>
          </div>
          <div className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Tag className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Categoría</p>
              <p className="font-semibold">{item.category?.name || 'General'}</p>
            </div>
          </div>
          <div className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Última Actualización</p>
              <p className="font-semibold">
                {new Date(item.updated_at).toLocaleDateString('es-ES', { dateStyle: 'long' })}
                {item.updated_by && <span className="text-muted-foreground font-normal"> por {item.updated_by}</span>}
              </p>
            </div>
          </div>
        </div>

        {item.notes && (
          <div className="bg-card/50 backdrop-blur-sm rounded-3xl border p-6 space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <AlertCircle className="h-4 w-4" />
              <h3 className="font-bold text-sm uppercase tracking-widest">Notas</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.notes}</p>
          </div>
        )}
      </main>
    </div>
  );
}
