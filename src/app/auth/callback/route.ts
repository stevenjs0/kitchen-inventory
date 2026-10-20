import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const currentUrl = new URL(request.url)
  const code = currentUrl.searchParams.get('code')
  const nextParam = currentUrl.searchParams.get('next') ?? '/inventory'
  const next = nextParam.startsWith('/') && !nextParam.startsWith('//') ? nextParam : '/inventory'

  if (code) {
    const supabase = await createClient()

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(new URL(next, currentUrl.origin))
    }
  }

  return NextResponse.redirect(new URL('/login?error=auth', currentUrl.origin))
}
