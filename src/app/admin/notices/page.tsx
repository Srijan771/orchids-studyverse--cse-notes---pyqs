"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus, Pencil, Trash2, Bell } from "lucide-react"
import { toast } from "sonner"

export default function AdminNoticesPage() {
  const supabase = createClient()
  const [notices, setNotices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentNotice, setCurrentNotice] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    is_enabled: true
  })

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    const { data } = await supabase.from('notices').select('*').order('created_at', { ascending: false })
    setNotices(data || [])
    setIsLoading(false)
  }

  const handleOpenDialog = (notice: any = null) => {
    if (notice) {
      setCurrentNotice(notice)
      setFormData({
        title: notice.title,
        description: notice.description || "",
        is_enabled: notice.is_enabled
      })
    } else {
      setCurrentNotice(null)
      setFormData({
        title: "",
        description: "",
        is_enabled: true
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const noticeData = {
        title: formData.title,
        description: formData.description,
        is_enabled: formData.is_enabled,
      }

      if (currentNotice) {
        const { error } = await supabase.from('notices').update(noticeData).eq('id', currentNotice.id)
        if (error) throw error
        toast.success("Notice updated successfully")
      } else {
        const { error } = await supabase.from('notices').insert([noticeData])
        if (error) throw error
        toast.success("Notice added successfully")
      }

      setIsDialogOpen(false)
      fetchNotices()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notice?")) return

    try {
      const { error } = await supabase.from('notices').delete().eq('id', id)
      if (error) throw error
      toast.success("Notice deleted successfully")
      fetchNotices()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const toggleNotice = async (id: string, enabled: boolean) => {
    try {
      const { error } = await supabase.from('notices').update({ is_enabled: enabled }).eq('id', id)
      if (error) throw error
      fetchNotices()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Notices</h1>
          <p className="text-zinc-400">Post announcements that appear on the homepage.</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="h-4 w-4" /> New Notice
        </Button>
      </div>

      <div className="rounded-xl border border-white/10 bg-zinc-900/50">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead className="text-zinc-400">Title</TableHead>
              <TableHead className="text-zinc-400">Status</TableHead>
              <TableHead className="text-zinc-400">Created At</TableHead>
              <TableHead className="text-right text-zinc-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notices.map((notice) => (
              <TableRow key={notice.id} className="border-white/5 hover:bg-white/5">
                <TableCell>
                  <div className="font-medium text-white">{notice.title}</div>
                  <div className="text-xs text-zinc-500 truncate max-w-md">{notice.description}</div>
                </TableCell>
                <TableCell>
                  <Switch 
                    checked={notice.is_enabled} 
                    onCheckedChange={(v) => toggleNotice(notice.id, v)} 
                  />
                </TableCell>
                <TableCell className="text-zinc-500 text-sm">
                  {new Date(notice.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(notice)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(notice.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {notices.length === 0 && !isLoading && (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-zinc-500">
                  No notices found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-950 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>{currentNotice ? "Edit Notice" : "Add New Notice"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input 
                value={formData.title} 
                onChange={e => setFormData({ ...formData, title: e.target.value })} 
                placeholder="e.g. New 2023 PYQ Solutions Added"
                className="bg-zinc-900 border-white/10" required 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                value={formData.description} 
                onChange={e => setFormData({ ...formData, description: e.target.value })} 
                placeholder="Briefly describe the notice..."
                className="bg-zinc-900 border-white/10" 
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch 
                checked={formData.is_enabled} 
                onCheckedChange={(v) => setFormData({ ...formData, is_enabled: v })} 
              />
              <label className="text-sm">Enabled (Visible on Homepage)</label>
            </div>

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : (currentNotice ? "Update Notice" : "Create Notice")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
