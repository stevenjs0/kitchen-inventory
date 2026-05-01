import { NextResponse } from "next/server";
import { getMissingInventoryItems } from "@/lib/actions/inventory.actions";

export async function GET() {
  const items = await getMissingInventoryItems();

  if (!items || items.length === 0) {
    return new NextResponse("# Lista de Faltantes - " + new Date().toLocaleDateString() + "\n\nNo hay faltantes en este momento.", {
      headers: {
        "Content-Type": "text/markdown",
        "Content-Disposition": `attachment; filename="faltantes-${new Date().toISOString().split('T')[0]}.md"`,
      },
    });
  }

  // Group by section
  const grouped: Record<string, typeof items> = {};
  items.forEach((item) => {
    const section = item.location?.section || "Sin ubicación";
    if (!grouped[section]) {
      grouped[section] = [];
    }
    grouped[section].push(item);
  });

  const date = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let markdown = `# Lista de Faltantes - ${date}\n\n`;

  Object.entries(grouped).forEach(([section, sectionItems]) => {
    markdown += `## ${section}\n`;
    sectionItems.forEach((item) => {
      markdown += `- [ ] ${item.name} (${item.location?.full_path || 'Sin ubicación'})\n`;
    });
    markdown += `\n`;
  });

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="faltantes-${new Date().toISOString().split('T')[0]}.md"`,
    },
  });
}
