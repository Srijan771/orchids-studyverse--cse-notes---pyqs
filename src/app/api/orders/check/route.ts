import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const trimmedEmail = email.trim().toLowerCase()

    const { data: orders, error } = await supabase
      .from('orders')
      .select('pyq_id')
      .eq('user_email', trimmedEmail)
      .eq('status', 'COMPLETED')

    if (error) throw error

    const purchasedIds = orders.map(order => order.pyq_id)

    return NextResponse.json({ purchasedIds })
  } catch (error: any) {
    console.error("Order check error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
