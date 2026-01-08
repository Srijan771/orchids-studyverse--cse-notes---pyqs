"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export function ReviewForm() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState("")
  const [userName, setUserName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      toast.error("Please select a rating")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment, userName }),
      })

      if (res.ok) {
        setIsSubmitted(true)
        toast.success("Review submitted for approval!")
      } else {
        const data = await res.json()
        toast.error(data.error || "Failed to submit review")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-lg border border-white/5 bg-zinc-900/50 p-6 text-center">
        <h3 className="text-xl font-bold text-white">Thank you!</h3>
        <p className="mt-2 text-zinc-400">Your review has been submitted and is pending approval.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-white/5 bg-zinc-900/30 p-6">
      <h3 className="text-xl font-bold text-white">Leave a Review</h3>
      
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              className={`h-6 w-6 ${
                star <= (hover || rating) ? "fill-yellow-500 text-yellow-500" : "text-zinc-600"
              } transition-colors`}
            />
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <Input
          placeholder="Your Name (Optional)"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="bg-black/50 border-white/10"
        />
        <Textarea
          placeholder="Write a short review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="bg-black/50 border-white/10 min-h-[100px]"
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  )
}
