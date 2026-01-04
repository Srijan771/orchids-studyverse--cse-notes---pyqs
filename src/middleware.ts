import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    const isLoginPage = request.nextUrl.pathname === '/admin/login'
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  
      // Protect admin routes
      if (isAdminRoute && !isLoginPage) {
        if (!user) {
          return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        // Check profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('status, role')
          .eq('id', user.id)
          .single()

        if (profileError) {
          console.error('Middleware profile fetch error:', profileError)
        }

        // Handle locked accounts
        if (profile && profile.status === 'locked') {
          await supabase.auth.signOut()
          return NextResponse.redirect(new URL('/admin/login?error=account_locked', request.url))
        }

        // Role-based route protection
        const ownerOnlyRoutes = ['/admin/logs']
        const isOwnerRoute = ownerOnlyRoutes.some(route => request.nextUrl.pathname.startsWith(route))
        
        if (isOwnerRoute && profile?.role !== 'owner') {
          return NextResponse.redirect(new URL('/admin', request.url))
        }
      }


  // Already logged in
  if (isLoginPage && user) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
