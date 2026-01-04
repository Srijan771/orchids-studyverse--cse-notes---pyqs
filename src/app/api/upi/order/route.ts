import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(req: Request) {
  try {
    const { pyqId, userName, userEmail, transactionId } = await req.json()

    if (!pyqId || !userName || !userEmail || !transactionId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const trimmedEmail = userEmail.trim().toLowerCase()

    // Store manual UPI order in DB
    const { error } = await supabase
      .from('orders')
      .insert({
        pyq_id: pyqId,
        user_name: userName,
        user_email: trimmedEmail,
        status: 'PENDING_VERIFICATION',
        payment_method: 'upi_manual',
        upi_transaction_id: transactionId,
      })

    if (error) throw error

    return NextResponse.json({ success: true, message: "Payment submission received. Access will be granted after verification." })
  } catch (error: any) {
    console.error("UPI order creation error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
