import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(req: Request) {
  try {
    const { userName, noteId } = await req.json()

    if (!userName || !noteId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { error } = await supabase
      .from("downloads")
      .insert([
        {
          user_name: userName,
          note_id: noteId,
        },
      ])

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error logging download:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
