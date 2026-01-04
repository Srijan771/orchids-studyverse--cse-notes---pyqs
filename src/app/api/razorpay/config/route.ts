import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data: settings } = await supabase
      .from('admin_settings')
      .select('key, value')
      .in('key', ['razorpay_key_id', 'razorpay_enabled'])
    
    const config = settings?.reduce((acc: any, curr) => {
      acc[curr.key] = curr.value
      return acc
    }, {})

    return NextResponse.json({
      key_id: config?.razorpay_key_id || "",
      enabled: config?.razorpay_enabled === 'true',
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
