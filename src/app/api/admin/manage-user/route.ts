import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function POST(request: Request) {
  const supabaseAuth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.headers.get('cookie')?.split(';').find(c => c.trim().startsWith(`${name}=`))?.split('=')[1]
        },
        set(name: string, value: string, options: CookieOptions) {},
        remove(name: string, options: CookieOptions) {},
      },
    }
  )

  const { data: { user } } = await supabaseAuth.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Check if user is owner
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'owner') {
    return NextResponse.json({ error: "Forbidden: Owner only" }, { status: 403 })
  }

  const { action, userId, details } = await request.json()

  try {
    if (action === 'reset_password') {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        password: details.newPassword
      })
      if (error) throw error
      return NextResponse.json({ success: true })
    }

    if (action === 'toggle_lock') {
      const { data: targetProfile } = await supabaseAdmin
        .from('profiles')
        .select('status')
        .eq('id', userId)
        .single()
      
      const newStatus = targetProfile?.status === 'active' ? 'locked' : 'active'
      
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({ status: newStatus })
        .eq('id', userId)

      if (error) throw error
      return NextResponse.json({ success: true, newStatus })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
