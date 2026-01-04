import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, contact, issueType, message } = await req.json()
    
    if (!contact || !issueType || !message) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { error } = await supabase.from('support_requests').insert({
      name: name || "Anonymous",
      contact,
      issue_type: issueType,
      message,
      status: 'pending',
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Support request error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to submit request" },
      { status: 500 }
    )
  }
}
