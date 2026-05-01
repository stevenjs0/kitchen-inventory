import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY son requeridos en .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log('🌱 Iniciando seeding...');

  // 1. Obtener IDs de Categorías por Nombre
  console.log('Fetching category IDs...');
  const { data: categoriesData, error: catFetchError } = await supabase.from('categories').select('id, name');
  if (catFetchError) throw catFetchError;
  
  const categoryMap = Object.fromEntries(categoriesData.map(c => [c.name, c.id]));

  // 2. Obtener IDs de Ubicaciones por Nombre
  console.log('Fetching location IDs...');
  const { data: locationsData, error: locFetchError } = await supabase.from('locations').select('id, name');
  if (locFetchError) throw locFetchError;

  const locationMap = Object.fromEntries(locationsData.map(l => [l.name, l.id]));

  // 3. Items con IDs dinámicos
  const items = [
    { 
      name: 'Accesorios de Lavabo', 
      category_id: categoryMap['Lavabo'], 
      location_id: locationMap['Alacena Arriba Izquierda, Primer Nivel'], 
      stock_quantity: 1, min_stock: 1, unit: 'unidad' 
    },
    { 
      name: 'Bandeja de Plastico', 
      category_id: categoryMap['Higiene'], 
      location_id: locationMap['Alacena Arriba Izquierda, Primer Nivel'], 
      stock_quantity: 2, min_stock: 1, unit: 'unidad' 
    },
    { 
      name: 'Atun', 
      category_id: categoryMap['Enlatados'], 
      location_id: locationMap['Condimentero Izquierdo, Tercer nivel'], 
      stock_quantity: 0, min_stock: 2, unit: 'unidad' 
    },
    { 
      name: 'Sal Rosada', 
      category_id: categoryMap['Sazon'], 
      location_id: locationMap['Condimentero Derecho, Primer nivel'], 
      stock_quantity: 1, min_stock: 1, unit: 'unidad' 
    },
    { 
      name: 'Avena', 
      category_id: categoryMap['Cereal'], 
      location_id: locationMap['Alacena Abajo Derecha, Primer Nivel'], 
      stock_quantity: 1, min_stock: 1, unit: 'unidad' 
    },
  ];

  // Filtrar items que no tengan categoría o ubicación mapeada
  const validItems = items.filter(item => item.category_id && item.location_id);
  
  if (validItems.length < items.length) {
    console.warn(`⚠️ Algunos items no se insertarán porque faltan categorías o ubicaciones en la DB.`);
  }

  console.log('Inserting sample items...');
  const { error: itemError } = await supabase.from('inventory_items').insert(validItems);
  if (itemError) console.error('Error items:', itemError);

  console.log('✅ Seeding completado!');
}

seed().catch(console.error);
