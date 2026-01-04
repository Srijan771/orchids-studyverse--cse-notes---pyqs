"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, FileText, ExternalLink, IndianRupee } from "lucide-react"
import { toast } from "sonner"

export default function AdminPYQsPage() {
  const supabase = createClient()
  const [pyqs, setPyqs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPYQ, setCurrentPYQ] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "Data Structures",
    year: "2023",
    price: 9,
    pdf_url: "",
    is_external: false,
    file: null as File | null
  })

  useEffect(() => {
    fetchPYQs()
  }, [])

  const fetchPYQs = async () => {
    const { data } = await supabase.from('pyqs').select('*').order('created_at', { ascending: false })
    setPyqs(data || [])
    setIsLoading(false)
  }

  const handleOpenDialog = (pyq: any = null) => {
    if (pyq) {
      setCurrentPYQ(pyq)
      setFormData({
        title: pyq.title,
        description: pyq.description || "",
        subject: pyq.subject,
        year: pyq.year,
        price: pyq.price,
        pdf_url: pyq.pdf_url,
        is_external: pyq.is_external,
        file: null
      })
    } else {
      setCurrentPYQ(null)
      setFormData({
        title: "",
        description: "",
        subject: "Data Structures",
        year: "2023",
        price: 9,
        pdf_url: "",
        is_external: false,
        file: null
      })
    }
    setIsDialogOpen(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0], is_external: false })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let finalPdfUrl = formData.pdf_url

      if (formData.file) {
        const fileExt = formData.file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const { data, error: uploadError } = await supabase.storage
          .from('studyverse')
          .upload(`pyqs/${fileName}`, formData.file)
        
        if (uploadError) throw uploadError
        
        const { data: { publicUrl } } = supabase.storage
          .from('studyverse')
          .getPublicUrl(`pyqs/${fileName}`)
        
        finalPdfUrl = publicUrl
      }

      const pyqData = {
        title: formData.title,
        description: formData.description,
        subject: formData.subject,
        year: formData.year,
        price: formData.price,
        pdf_url: finalPdfUrl,
        is_external: formData.is_external,
      }

      if (currentPYQ) {
        const { error } = await supabase.from('pyqs').update(pyqData).eq('id', currentPYQ.id)
        if (error) throw error
        toast.success("PYQ updated successfully")
      } else {
        const { error } = await supabase.from('pyqs').insert([pyqData])
        if (error) throw error
        toast.success("PYQ added successfully")
      }

      setIsDialogOpen(false)
      fetchPYQs()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this PYQ?")) return

    try {
      const { error } = await supabase.from('pyqs').delete().eq('id', id)
      if (error) throw error
      toast.success("PYQ deleted successfully")
      fetchPYQs()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage PYQ Solutions</h1>
          <p className="text-zinc-400">Manage paid previous year question solutions.</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="h-4 w-4" /> Add New PYQ
        </Button>
      </div>

      <div className="rounded-xl border border-white/10 bg-zinc-900/50">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead className="text-zinc-400">Title</TableHead>
              <TableHead className="text-zinc-400">Subject / Year</TableHead>
              <TableHead className="text-zinc-400">Price</TableHead>
              <TableHead className="text-zinc-400">Type</TableHead>
              <TableHead className="text-right text-zinc-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pyqs.map((pyq) => (
              <TableRow key={pyq.id} className="border-white/5 hover:bg-white/5">
                <TableCell className="font-medium text-white">{pyq.title}</TableCell>
                <TableCell className="text-zinc-400">{pyq.subject} ({pyq.year})</TableCell>
                <TableCell className="text-white font-bold">₹{pyq.price}</TableCell>
                <TableCell>
                  {pyq.is_external ? (
                    <span className="flex items-center gap-1 text-xs text-blue-400">
                      <ExternalLink className="h-3 w-3" /> External Link
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-green-400">
                      <FileText className="h-3 w-3" /> Uploaded PDF
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(pyq)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(pyq.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {pyqs.length === 0 && !isLoading && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-zinc-500">
                  No PYQs found. Start by adding one!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-950 border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>{currentPYQ ? "Edit PYQ" : "Add New PYQ"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input 
                  value={formData.title} 
                  onChange={e => setFormData({ ...formData, title: e.target.value })} 
                  className="bg-zinc-900 border-white/10" required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Select value={formData.subject} onValueChange={v => setFormData({ ...formData, subject: v })}>
                  <SelectTrigger className="bg-zinc-900 border-white/10">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-950 border-white/10">
                    <SelectItem value="Discrete Structures">Discrete Structures</SelectItem>
                    <SelectItem value="Data Structures">Data Structures</SelectItem>
                    <SelectItem value="Digital Systems">Digital Systems</SelectItem>
                    <SelectItem value="OOPM">OOPM</SelectItem>
                    <SelectItem value="EEES">EEES</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Year</label>
                <Input 
                  value={formData.year} 
                  onChange={e => setFormData({ ...formData, year: e.target.value })} 
                  placeholder="e.g. 2023"
                  className="bg-zinc-900 border-white/10" required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price (₹)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-zinc-500" />
                  <Input 
                    type="number"
                    value={formData.price} 
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} 
                    className="bg-zinc-900 border-white/10 pl-8" required 
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                value={formData.description} 
                onChange={e => setFormData({ ...formData, description: e.target.value })} 
                className="bg-zinc-900 border-white/10" 
              />
            </div>

            <div className="space-y-4 rounded-lg border border-white/5 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold">PDF Content Source</label>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant={!formData.is_external ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFormData({ ...formData, is_external: false })}
                  >
                    Upload File
                  </Button>
                  <Button 
                    type="button" 
                    variant={formData.is_external ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFormData({ ...formData, is_external: true })}
                  >
                    External Link
                  </Button>
                </div>
              </div>

              {formData.is_external ? (
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">PDF URL</label>
                  <Input 
                    value={formData.pdf_url} 
                    onChange={e => setFormData({ ...formData, pdf_url: e.target.value })} 
                    placeholder="https://drive.google.com/..."
                    className="bg-zinc-900 border-white/10" 
                    required 
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Choose PDF File</label>
                  <Input 
                    type="file" 
                    accept=".pdf" 
                    onChange={handleFileChange}
                    className="bg-zinc-900 border-white/10" 
                  />
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : (currentPYQ ? "Update PYQ" : "Add PYQ")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
