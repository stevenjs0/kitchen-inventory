import 'server-only';
import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { User } from '@supabase/supabase-js';

export class SessionRequiredError extends Error {
  constructor(message = 'Debes iniciar sesión para continuar') {
    super(message);
    this.name = 'SessionRequiredError';
  }
}

/**
 * Guard server-side de autenticación.
 *
 * Usa `auth.getUser()` (NO `getSession()`): este método valida la JWT contra el
 * servidor de Supabase, así el usuario no puede ser falsificado con cookies
 * editadas a mano. `getSession()` solo lee el session de las cookies sin validarlo.
 *
 * Al envolverlo en `cache()`, la sesión se resuelve una sola vez por request y se
 * reutiliza en todos los servicios de esa request (patrón Session-per-Request).
 */
export const requireUser = cache(async (): Promise<User> => {
  const client = await createClient();
  const {
    data: { user },
    error,
  } = await client.auth.getUser();

  if (error || !user) {
    throw new SessionRequiredError();
  }

  return user;
});