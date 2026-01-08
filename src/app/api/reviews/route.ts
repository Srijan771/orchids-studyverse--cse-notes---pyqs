import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  try {
    const { rating, comment, userName } = await req.json()
    const supabase = await createClient()
    const cookieStore = await cookies()
    
    // Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser()
    
    // Get session ID from cookie or generate one
    let sessionId = cookieStore.get('review_session_id')?.value
    if (!sessionId) {
      sessionId = crypto.randomUUID()
      cookieStore.set('review_session_id', sessionId, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        httpOnly: true,
      })
    }

    const userIdentifier = user?.id || sessionId

    // Check if user has already submitted a review
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('user_identifier', userIdentifier)
      .single()

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already submitted a review" },
        { status: 400 }
      )
    }

    const { error } = await supabase.from('reviews').insert({
      rating,
      comment,
      user_name: userName || "Anonymous",
      user_identifier: userIdentifier,
      status: 'pending',
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Review submission error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to submit review" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('status', 'approved')
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch reviews" },
      { status: 500 }
    )
  }
}
