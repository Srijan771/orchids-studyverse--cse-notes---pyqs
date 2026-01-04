"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

export default function AdminSubjectsPage() {
  const supabase = createClient()
  const [subjects, setSubjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentSubject, setCurrentSubject] = useState<any>(null)
    const [formData, setFormData] = useState({
      name: "",
      description: "",
      thumbnail_url: "",
      thumbnailFile: null as File | null
    })

    useEffect(() => {
      fetchSubjects()
    }, [])

    const fetchSubjects = async () => {
      const { data } = await supabase.from('subjects').select('*').order('name', { ascending: true })
      setSubjects(data || [])
      setIsLoading(false)
    }

    const handleOpenDialog = (subject: any = null) => {
      if (subject) {
        setCurrentSubject(subject)
        setFormData({
          name: subject.name,
          description: subject.description || "",
          thumbnail_url: subject.thumbnail_url || "",
          thumbnailFile: null
        })
      } else {
        setCurrentSubject(null)
        setFormData({
          name: "",
          description: "",
          thumbnail_url: "",
          thumbnailFile: null
        })
      }
      setIsDialogOpen(true)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setFormData({ ...formData, thumbnailFile: e.target.files[0] })
      }
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)

      try {
        let finalThumbnailUrl = formData.thumbnail_url

        if (formData.thumbnailFile) {
          const fileExt = formData.thumbnailFile.name.split('.').pop()
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
          const { error: uploadError } = await supabase.storage
            .from('studyverse')
            .upload(`subject-thumbnails/${fileName}`, formData.thumbnailFile)
          
          if (uploadError) throw uploadError
          
          const { data: { publicUrl } } = supabase.storage
            .from('studyverse')
            .getPublicUrl(`subject-thumbnails/${fileName}`)
          
          finalThumbnailUrl = publicUrl
        }

        const subjectData = {
          name: formData.name,
          description: formData.description,
          thumbnail_url: finalThumbnailUrl || null,
        }

        if (currentSubject) {
          const { error } = await supabase.from('subjects').update(subjectData).eq('id', currentSubject.id)
          if (error) throw error
          toast.success("Subject updated successfully")
        } else {
          const { error } = await supabase.from('subjects').insert([subjectData])
          if (error) throw error
          toast.success("Subject added successfully")
        }

        setIsDialogOpen(false)
        fetchSubjects()
      } catch (error: any) {
        toast.error(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    const handleDelete = async (id: string) => {
      if (!window.confirm("Are you sure? This might affect existing notes linked to this subject name.")) return

      try {
        const { error } = await supabase.from('subjects').delete().eq('id', id)
        if (error) throw error
        toast.success("Subject deleted successfully")
        fetchSubjects()
      } catch (error: any) {
        toast.error(error.message)
      }
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Manage Subjects</h1>
            <p className="text-zinc-400">Add thumbnails and manage subject names.</p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="gap-2">
            <Plus className="h-4 w-4" /> Add New Subject
          </Button>
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-900/50">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-zinc-400 w-24">Thumbnail</TableHead>
                <TableHead className="text-zinc-400">Subject Name</TableHead>
                <TableHead className="text-zinc-400">Description</TableHead>
                <TableHead className="text-right text-zinc-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.id} className="border-white/5 hover:bg-white/5">
                  <TableCell>
                    {subject.thumbnail_url ? (
                      <div className="w-16 h-10 rounded overflow-hidden bg-zinc-800">
                        <Image src={subject.thumbnail_url} alt="" width={64} height={40} className="object-cover w-full h-full" />
                      </div>
                    ) : (
                      <div className="w-16 h-10 rounded bg-zinc-800 flex items-center justify-center">
                        <ImageIcon className="h-4 w-4 text-zinc-600" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-white">{subject.name}</TableCell>
                  <TableCell className="text-zinc-400 max-w-xs truncate">{subject.description}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(subject)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(subject.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {subjects.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={4} className="py-10 text-center text-zinc-500">
                    No subjects found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-zinc-950 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>{currentSubject ? "Edit Subject" : "Add New Subject"}</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Update the subject name, description, and thumbnail image.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject Name</label>
                <Input 
                  value={formData.name} 
                  onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  className="bg-zinc-900 border-white/10" required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  value={formData.description} 
                  onChange={e => setFormData({ ...formData, description: e.target.value })} 
                  className="bg-zinc-900 border-white/10 min-h-[100px]"
                  placeholder="Subject description for coverage section..."
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
                    onChange={handleFileChange}
                    className="bg-zinc-900 border-white/10" 
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : (currentSubject ? "Update Subject" : "Add Subject")}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )

}
