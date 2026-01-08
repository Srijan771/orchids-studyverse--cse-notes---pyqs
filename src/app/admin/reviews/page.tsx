"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, CheckCircle, XCircle, Trash2, Pin } from "lucide-react"
import { toast } from "sonner"

interface Review {
  id: string
  rating: number
  comment: string
  user_name: string
  status: string
  is_featured: boolean
  created_at: string
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchReviews()
    fetchRole()
  }, [])

  const fetchRole = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      setRole(data?.role || null)
    }
  }

  const fetchReviews = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) toast.error("Failed to fetch reviews")
    else setReviews(data || [])
    setLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('reviews').update({ status }).eq('id', id)
    if (error) toast.error("Update failed")
    else {
      toast.success(`Review ${status}`)
      fetchReviews()
    }
  }

  const toggleFeatured = async (id: string, is_featured: boolean) => {
    if (role !== 'owner') {
      toast.error("Only owners can pin reviews")
      return
    }
    const { error } = await supabase.from('reviews').update({ is_featured }).eq('id', id)
    if (error) toast.error("Update failed")
    else {
      toast.success(is_featured ? "Review pinned" : "Review unpinned")
      fetchReviews()
    }
  }

  const deleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return
    const { error } = await supabase.from('reviews').delete().eq('id', id)
    if (error) toast.error("Delete failed")
    else {
      toast.success("Review deleted")
      fetchReviews()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Reviews</h1>
          <p className="text-zinc-400">Manage and moderate student feedback</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <Card key={review.id} className="border-white/10 bg-zinc-900/50">
              <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-6">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-zinc-700"}`} />
                      ))}
                    </div>
                    <Badge variant={review.status === 'approved' ? 'default' : review.status === 'pending' ? 'secondary' : 'destructive'}>
                      {review.status}
                    </Badge>
                    {review.is_featured && (
                      <Badge variant="outline" className="border-primary/50 text-primary flex gap-1 items-center">
                        <Pin className="h-3 w-3" /> Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-white italic">"{review.comment}"</p>
                  <div className="text-sm text-zinc-500">
                    By {review.user_name} • {new Date(review.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {review.status !== 'approved' && (
                    <Button size="sm" variant="outline" className="text-green-500 hover:text-green-400 border-green-500/20" onClick={() => updateStatus(review.id, 'approved')}>
                      <CheckCircle className="h-4 w-4 mr-1" /> Approve
                    </Button>
                  )}
                  {review.status !== 'rejected' && (
                    <Button size="sm" variant="outline" className="text-red-500 hover:text-red-400 border-red-500/20" onClick={() => updateStatus(review.id, 'rejected')}>
                      <XCircle className="h-4 w-4 mr-1" /> Reject
                    </Button>
                  )}
                  {role === 'owner' && (
                    <Button size="sm" variant="outline" className={review.is_featured ? "text-primary" : "text-zinc-400"} onClick={() => toggleFeatured(review.id, !review.is_featured)}>
                      <Pin className="h-4 w-4 mr-1" /> {review.is_featured ? "Unpin" : "Pin"}
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="text-zinc-500 hover:text-red-500" onClick={() => deleteReview(review.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {reviews.length === 0 && (
            <div className="text-center py-12 text-zinc-500 border border-dashed border-white/10 rounded-lg">
              No reviews found.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
