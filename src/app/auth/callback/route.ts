import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const currentUrl = new URL(request.url)
  const code = currentUrl.searchParams.get('code')
  const nextParam = currentUrl.searchParams.get('next') ?? '/inventory'
  const next = nextParam.startsWith('/') && !nextParam.startsWith('//') ? nextParam : '/inventory'

  if (code) {
    const cookieStore = await cookies()
    const url = process.env.SUPABASE_LOCAL_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!
    const key = process.env.SUPABASE_LOCAL_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    const supabase = createServerClient(
      url,
      key,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
            }
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(new URL(next, currentUrl.origin))
    }
  }

  return NextResponse.redirect(new URL('/login?error=auth', currentUrl.origin))
}