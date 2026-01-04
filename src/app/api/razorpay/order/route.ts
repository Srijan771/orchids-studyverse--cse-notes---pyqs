import { NextResponse } from "next/server"
import { getRazorpayInstance } from "@/lib/razorpay-instance"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(req: Request) {
  try {
    const { pyqId, userName, userEmail } = await req.json()

    if (!pyqId || !userName || !userEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get PYQ price
    const { data: pyq } = await supabase
      .from('pyqs')
      .select('price')
      .eq('id', pyqId)
      .single()
    
    if (!pyq) return NextResponse.json({ error: "PYQ not found" }, { status: 404 })

    const razorpay = await getRazorpayInstance()
    if (!razorpay) {
      return NextResponse.json({ error: "Payment system unavailable" }, { status: 503 })
    }

    // Create Razorpay Order
    const amount = Math.round(pyq.price * 100) // in paisa
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    })

    // Store order in DB
    const { error } = await supabase
      .from('orders')
      .insert({
        pyq_id: pyqId,
        user_name: userName,
        user_email: userEmail,
        status: 'PENDING',
        razorpay_order_id: order.id,
      })

    if (error) throw error

    return NextResponse.json(order)
  } catch (error: any) {
    console.error("Razorpay order creation error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
