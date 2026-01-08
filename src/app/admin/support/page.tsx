"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Mail, Phone, Trash2, ExternalLink } from "lucide-react"
import { toast } from "sonner"

interface SupportRequest {
  id: string
  name: string
  contact: string
  issue_type: string
  message: string
  status: string
  created_at: string
}

export default function AdminSupportPage() {
  const [requests, setRequests] = useState<SupportRequest[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('support_requests')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) toast.error("Failed to fetch requests")
    else setRequests(data || [])
    setLoading(false)
  }

  const markResolved = async (id: string) => {
    const { error } = await supabase.from('support_requests').update({ status: 'resolved' }).eq('id', id)
    if (error) toast.error("Update failed")
    else {
      toast.success("Marked as resolved")
      fetchRequests()
    }
  }

  const deleteRequest = async (id: string) => {
    if (!confirm("Are you sure you want to delete this request?")) return
    const { error } = await supabase.from('support_requests').delete().eq('id', id)
    if (error) toast.error("Delete failed")
    else {
      toast.success("Request deleted")
      fetchRequests()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Support Requests</h1>
          <p className="text-zinc-400">Handle student queries and technical issues</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {requests.map((req) => (
            <Card key={req.id} className={`border-white/10 ${req.status === 'resolved' ? 'bg-zinc-900/20 opacity-75' : 'bg-zinc-900/50'}`}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <Badge variant={req.status === 'resolved' ? 'default' : 'secondary'} className={req.status === 'resolved' ? 'bg-green-500/20 text-green-500 border-green-500/20' : ''}>
                        {req.status === 'resolved' ? 'Resolved' : 'Pending'}
                      </Badge>
                      <Badge variant="outline" className="border-primary/20 text-primary">
                        {req.issue_type}
                      </Badge>
                      <span className="text-xs text-zinc-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(req.created_at).toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        {req.name} 
                        <span className="text-sm font-normal text-zinc-500">({req.contact})</span>
                      </h3>
                      <p className="mt-2 text-zinc-300 bg-black/30 p-4 rounded-lg border border-white/5">
                        {req.message}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <a href={`mailto:${req.contact}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                        <Mail className="h-4 w-4" /> Email Student
                      </a>
                      <a href={`tel:${req.contact}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                        <Phone className="h-4 w-4" /> Call Student
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-2 shrink-0">
                    {req.status !== 'resolved' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => markResolved(req.id)}>
                        <CheckCircle className="h-4 w-4 mr-2" /> Mark Resolved
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="text-zinc-500 hover:text-red-500 border-white/5" onClick={() => deleteRequest(req.id)}>
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {requests.length === 0 && (
            <div className="text-center py-12 text-zinc-500 border border-dashed border-white/10 rounded-lg">
              No support requests found.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
