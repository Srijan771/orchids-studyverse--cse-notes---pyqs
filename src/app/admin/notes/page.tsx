"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, FileText, ExternalLink, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

const NOTE_TYPES = [
  { value: "cheat_sheet", label: "Cheat Sheet" },
  { value: "handwritten_notes", label: "Handwritten Notes" },
  { value: "complete_notes", label: "Complete Notes" },
]

export default function AdminNotesPage() {
  const supabase = createClient()
  const [notes, setNotes] = useState<any[]>([])
  const [subjects, setSubjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentNote, setCurrentNote] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    semester: "3rd Semester",
    note_type: "cheat_sheet",
    pdf_url: "",
    external_link: "",
    thumbnail_url: "",
    pdfFile: null as File | null,
    thumbnailFile: null as File | null
  })

  useEffect(() => {
    fetchNotes()
    fetchSubjects()
  }, [])

  const fetchNotes = async () => {
    const { data } = await supabase.from('notes').select('*').order('created_at', { ascending: false })
    setNotes(data || [])
    setIsLoading(false)
  }

  const fetchSubjects = async () => {
    const { data } = await supabase.from('subjects').select('*').order('name', { ascending: true })
    setSubjects(data || [])
    if (data && data.length > 0 && !formData.subject) {
      setFormData(prev => ({ ...prev, subject: data[0].name }))
    }
  }

  const handleOpenDialog = (note: any = null) => {
    if (note) {
      setCurrentNote(note)
      setFormData({
        title: note.title,
        description: note.description || "",
        subject: note.subject,
        semester: note.semester,
        note_type: note.note_type || "cheat_sheet",
        pdf_url: note.pdf_url || "",
        external_link: note.external_link || "",
        thumbnail_url: note.thumbnail_url || "",
        pdfFile: null,
        thumbnailFile: null
      })
    } else {
      setCurrentNote(null)
      setFormData({
        title: "",
        description: "",
        subject: subjects.length > 0 ? subjects[0].name : "",
        semester: "3rd Semester",
        note_type: "cheat_sheet",
        pdf_url: "",
        external_link: "",
        thumbnail_url: "",
        pdfFile: null,
        thumbnailFile: null
      })
    }
    setIsDialogOpen(true)
  }

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, pdfFile: e.target.files[0] })
    }
  }

  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, thumbnailFile: e.target.files[0] })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let finalPdfUrl = formData.pdf_url
      let finalThumbnailUrl = formData.thumbnail_url

      if (formData.pdfFile) {
        const fileExt = formData.pdfFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const { error: uploadError } = await supabase.storage
          .from('studyverse')
          .upload(`notes/${fileName}`, formData.pdfFile)
        
        if (uploadError) throw uploadError
        
        const { data: { publicUrl } } = supabase.storage
          .from('studyverse')
          .getPublicUrl(`notes/${fileName}`)
        
        finalPdfUrl = publicUrl
      }

      if (formData.thumbnailFile) {
        const fileExt = formData.thumbnailFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const { error: uploadError } = await supabase.storage
          .from('studyverse')
          .upload(`thumbnails/${fileName}`, formData.thumbnailFile)
        
        if (uploadError) throw uploadError
        
        const { data: { publicUrl } } = supabase.storage
          .from('studyverse')
          .getPublicUrl(`thumbnails/${fileName}`)
        
        finalThumbnailUrl = publicUrl
      }

      const noteData = {
        title: formData.title,
        description: formData.description,
        subject: formData.subject,
        semester: formData.semester,
        note_type: formData.note_type,
        pdf_url: finalPdfUrl || null,
        external_link: formData.external_link || null,
        thumbnail_url: finalThumbnailUrl || null,
        is_external: !!formData.external_link && !finalPdfUrl,
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
    if (!window.confirm("Are you sure you want to delete this note?")) return

    try {
      const { error } = await supabase.from('notes').delete().eq('id', id)
      if (error) throw error
      toast.success("Note deleted successfully")
      fetchNotes()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const getNoteTypeLabel = (type: string) => {
    return NOTE_TYPES.find(t => t.value === type)?.label || type
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Notes</h1>
          <p className="text-zinc-400">Upload notes with PDF, external links, and thumbnails.</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="h-4 w-4" /> Add New Note
        </Button>
      </div>

      <div className="rounded-xl border border-white/10 bg-zinc-900/50">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead className="text-zinc-400">Thumbnail</TableHead>
              <TableHead className="text-zinc-400">Title</TableHead>
              <TableHead className="text-zinc-400">Subject</TableHead>
              <TableHead className="text-zinc-400">Type</TableHead>
              <TableHead className="text-zinc-400">Sources</TableHead>
              <TableHead className="text-right text-zinc-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notes.map((note) => (
              <TableRow key={note.id} className="border-white/5 hover:bg-white/5">
                <TableCell>
                  {note.thumbnail_url ? (
                    <div className="w-12 h-12 rounded overflow-hidden bg-zinc-800">
                      <Image src={note.thumbnail_url} alt="" width={48} height={48} className="object-cover w-full h-full" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded bg-zinc-800 flex items-center justify-center">
                      <ImageIcon className="h-5 w-5 text-zinc-600" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium text-white">{note.title}</TableCell>
                <TableCell className="text-zinc-400">{note.subject}</TableCell>
                <TableCell>
                  <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                    {getNoteTypeLabel(note.note_type)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {note.pdf_url && (
                      <span className="flex items-center gap-1 text-xs text-green-400">
                        <FileText className="h-3 w-3" /> PDF
                      </span>
                    )}
                    {note.external_link && (
                      <span className="flex items-center gap-1 text-xs text-blue-400">
                        <ExternalLink className="h-3 w-3" /> Link
                      </span>
                    )}
                  </div>
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
                <TableCell colSpan={6} className="py-10 text-center text-zinc-500">
                  No notes found. Start by adding one!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-950 border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentNote ? "Edit Note" : "Add New Note"}</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Fill in the details for the note.
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
                      {subjects.map(sub => (
                        <SelectItem key={sub.id} value={sub.name}>{sub.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Note Type</label>
              <Select value={formData.note_type} onValueChange={v => setFormData({ ...formData, note_type: v })}>
                <SelectTrigger className="bg-zinc-900 border-white/10">
                  <SelectValue placeholder="Select Note Type" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-white/10">
                  {NOTE_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <label className="text-sm font-semibold">Thumbnail Image</label>
              <div className="flex items-center gap-4">
                {(formData.thumbnail_url || formData.thumbnailFile) && (
                  <div className="w-20 h-20 rounded overflow-hidden bg-zinc-800">
                    {formData.thumbnailFile ? (
                      <img src={URL.createObjectURL(formData.thumbnailFile)} alt="" className="object-cover w-full h-full" />
                    ) : formData.thumbnail_url ? (
                      <Image src={formData.thumbnail_url} alt="" width={80} height={80} className="object-cover w-full h-full" />
                    ) : null}
                  </div>
                )}
                <Input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleThumbnailFileChange}
                  className="bg-zinc-900 border-white/10" 
                />
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-white/5 bg-white/5 p-4">
              <label className="text-sm font-semibold">PDF File (Upload)</label>
              <div className="space-y-2">
                <Input 
                  type="file" 
                  accept=".pdf" 
                  onChange={handlePdfFileChange}
                  className="bg-zinc-900 border-white/10" 
                />
                {currentNote?.pdf_url && !formData.pdfFile && (
                  <p className="text-xs text-zinc-500">Current PDF: {currentNote.pdf_url.split('/').pop()}</p>
                )}
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-white/5 bg-white/5 p-4">
              <label className="text-sm font-semibold">External Link (Optional)</label>
              <Input 
                value={formData.external_link} 
                onChange={e => setFormData({ ...formData, external_link: e.target.value })} 
                placeholder="https://drive.google.com/..."
                className="bg-zinc-900 border-white/10" 
              />
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
