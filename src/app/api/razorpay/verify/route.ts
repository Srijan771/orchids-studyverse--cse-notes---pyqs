import { NextResponse } from "next/server"
import crypto from "crypto"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, pyqId } = await req.json()

    // Get key_secret from DB
    const { data: secretSetting } = await supabase
      .from('admin_settings')
      .select('value')
      .eq('key', 'razorpay_key_secret')
      .single()
    
    if (!secretSetting) {
      return NextResponse.json({ error: "Secret not found" }, { status: 500 })
    }

    const secret = secretSetting.value
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex")

    if (expectedSignature === razorpay_signature) {
      // Mark order as PAID
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'PAID', 
          razorpay_payment_id 
        })
        .eq('razorpay_order_id', razorpay_order_id)

      if (error) throw error

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("Verification error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
