import { type NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/middleware'

const publicRoutes = ['/login', '/auth', '/_not-found']
const authRoutes = ['/login']

// Match exacto o por segmento: '/login-otro' no debe matchear '/login'.
function matchesRoute(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(route + '/')
}

export async function proxy(request: NextRequest) {
  const { supabase, supabaseResponse } = createMiddlewareClient(request)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isPublicRoute = publicRoutes.some((route) =>
    matchesRoute(request.nextUrl.pathname, route)
  )
  const isAuthRoute = authRoutes.some((route) =>
    matchesRoute(request.nextUrl.pathname, route)
  )

  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (user && isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/inventory'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}