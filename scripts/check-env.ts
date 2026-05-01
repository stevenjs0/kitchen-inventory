import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const vars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'DATABASE_URL',
  'DIRECT_URL'
];

console.log('Verificando variables de entorno en .env.local:');
vars.forEach(v => {
  console.log(`${v}: ${process.env[v] ? 'Presente ✅' : 'Ausente ❌'}`);
});
