"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, FileText, ExternalLink, Upload } from "lucide-react"
import { toast } from "sonner"

export default function AdminNotesPage() {
  const supabase = createClient()
  const [notes, setNotes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentNote, setCurrentNote] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "Data Structures",
    semester: "3rd Semester",
    pdf_url: "",
    is_external: false,
    file: null as File | null
  })

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    const { data } = await supabase.from('notes').select('*').order('created_at', { ascending: false })
    setNotes(data || [])
    setIsLoading(false)
  }

  const handleOpenDialog = (note: any = null) => {
    if (note) {
      setCurrentNote(note)
      setFormData({
        title: note.title,
        description: note.description || "",
        subject: note.subject,
        semester: note.semester,
        pdf_url: note.pdf_url,
        is_external: note.is_external,
        file: null
      })
    } else {
      setCurrentNote(null)
      setFormData({
        title: "",
        description: "",
        subject: "Data Structures",
        semester: "3rd Semester",
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

      // Handle File Upload if present
      if (formData.file) {
        const fileExt = formData.file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const { data, error: uploadError } = await supabase.storage
          .from('studyverse')
          .upload(`notes/${fileName}`, formData.file)
        
        if (uploadError) throw uploadError
        
        const { data: { publicUrl } } = supabase.storage
          .from('studyverse')
          .getPublicUrl(`notes/${fileName}`)
        
        finalPdfUrl = publicUrl
      }

      const noteData = {
        title: formData.title,
        description: formData.description,
        subject: formData.subject,
        semester: formData.semester,
        pdf_url: finalPdfUrl,
        is_external: formData.is_external,
      }

      if (currentNote) {
        const { error } = await supabase.from('notes').update(noteData).eq('id', currentNote.id)
        if (error) throw error
        toast.success("Note updated successfully")
      } else {
        const { error } = await supabase.from('notes').insert([noteData])
        if (error) throw error
        toast.success("Note added successfully")
      }

      setIsDialogOpen(false)
      fetchNotes()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return

    try {
      const { error } = await supabase.from('notes').delete().eq('id', id)
      if (error) throw error
      toast.success("Note deleted successfully")
      fetchNotes()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Free Notes</h1>
          <p className="text-zinc-400">Upload or link subject notes for students.</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="h-4 w-4" /> Add New Note
        </Button>
      </div>

      <div className="rounded-xl border border-white/10 bg-zinc-900/50">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead className="text-zinc-400">Title</TableHead>
              <TableHead className="text-zinc-400">Subject</TableHead>
              <TableHead className="text-zinc-400">Type</TableHead>
              <TableHead className="text-zinc-400">Added On</TableHead>
              <TableHead className="text-right text-zinc-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notes.map((note) => (
              <TableRow key={note.id} className="border-white/5 hover:bg-white/5">
                <TableCell className="font-medium text-white">{note.title}</TableCell>
                <TableCell className="text-zinc-400">{note.subject}</TableCell>
                <TableCell>
                  {note.is_external ? (
                    <span className="flex items-center gap-1 text-xs text-blue-400">
                      <ExternalLink className="h-3 w-3" /> External Link
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-green-400">
                      <FileText className="h-3 w-3" /> Uploaded PDF
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-zinc-500">
                  {new Date(note.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(note)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(note.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {notes.length === 0 && !isLoading && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-zinc-500">
                  No notes found. Start by adding one!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-950 border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>{currentNote ? "Edit Note" : "Add New Note"}</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Fill in the details for the subject note.
            </DialogDescription>
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
                  <label className="text-sm text-zinc-400">PDF URL (Google Drive, Dropbox, etc.)</label>
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
                  <div className="flex items-center gap-4">
                    <Input 
                      type="file" 
                      accept=".pdf" 
                      onChange={handleFileChange}
                      className="bg-zinc-900 border-white/10" 
                    />
                    {currentNote && !formData.file && (
                      <span className="text-xs text-zinc-500 italic truncate max-w-[200px]">
                        Currently: {currentNote.pdf_url.split('/').pop()}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : (currentNote ? "Update Note" : "Add Note")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
