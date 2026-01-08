"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Review {
  id: string
  rating: number
  comment: string
  user_name: string
  is_featured: boolean
  created_at: string
}

export function ReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews")
        if (res.ok) {
          const data = await res.json()
          setReviews(data)
        }
      } catch (error) {
        console.error("Failed to fetch reviews")
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  if (loading) {
    return <div className="text-center py-10 text-zinc-500">Loading reviews...</div>
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-10 text-zinc-500">
        No reviews yet. Be the first to share your experience!
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review) => (
        <Card key={review.id} className="border-white/5 bg-zinc-900/30 p-6 text-left relative overflow-hidden">
          {review.is_featured && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20 text-[10px] py-0">
                Featured
              </Badge>
            </div>
          )}
          <div className="flex gap-1 mb-4 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-zinc-700"}`}
              />
            ))}
          </div>
          <p className="text-zinc-300 italic">
            "{review.comment}"
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold uppercase">
              {review.user_name?.[0] || "?"}
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{review.user_name || "Anonymous"}</div>
              <div className="text-xs text-zinc-500">
                {new Date(review.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
