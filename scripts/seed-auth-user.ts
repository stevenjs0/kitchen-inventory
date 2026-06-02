import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_LOCAL_URL || 'http://127.0.0.1:54321';
const SERVICE_ROLE_KEY = process.env.SUPABASE_LOCAL_SERVICE_ROLE_KEY || '';

async function seedAuthUser() {
  if (!SUPABASE_URL.includes('127.0.0.1') && !SUPABASE_URL.includes('localhost')) {
    console.error('ABORTED: seed-auth-user.ts can only run against local Supabase. Current URL:', SUPABASE_URL);
    process.exit(1);
  }

  if (!SERVICE_ROLE_KEY) {
    console.error('ABORTED: SUPABASE_LOCAL_SERVICE_ROLE_KEY env var is required. Set it in .env.local');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await supabase.auth.admin.createUser({
    email: 'dev@inventario.local',
    password: 'dev123456',
    email_confirm: true,
    user_metadata: { full_name: 'Dev Local' },
  });

  if (error) {
    if (error.message.includes('already registered') || error.message.includes('already exists') || error.status === 422) {
      console.log('User dev@inventario.local already exists, skipping.');
      return;
    }
    console.error('Error creating user:', error.message);
    process.exit(1);
  }

  console.log(`Created user: ${data.user.email} (id: ${data.user.id})`);
}

seedAuthUser();
