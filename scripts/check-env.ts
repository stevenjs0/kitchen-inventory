import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const required = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
];

const optional = [
  'NEXT_PUBLIC_SUPABASE_LOCAL_URL',
  'NEXT_PUBLIC_SUPABASE_LOCAL_ANON_KEY',
];

console.log('Verificando variables de entorno en .env.local:');

let missing = 0;

required.forEach((v) => {
  const present = Boolean(process.env[v]);
  if (!present) missing++;
  console.log(`${v}: ${present ? 'Presente ✅' : 'Ausente ❌'}`);
});

optional.forEach((v) => {
  console.log(`${v}: ${process.env[v] ? 'Presente ✅' : 'Ausente (opcional)'}`);
});

if (missing > 0) {
  console.error(`\nFaltan ${missing} variables requeridas.`);
  process.exit(1);
}
