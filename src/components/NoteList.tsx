"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Download, BookOpen, Search, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface Note {
  id: string
  title: string
  description: string
  subject: string
  semester: string
  pdf_url: string
  is_external: boolean
  thumbnail_url?: string
}

export function NoteList({ initialNotes }: { initialNotes: Note[] }) {
  const [notes, setNotes] = useState(initialNotes)
  const [search, setSearch] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("All")
  const [userName, setUserName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [pendingNote, setPendingNote] = useState<Note | null>(null)
  const [isThankYouOpen, setIsThankYouOpen] = useState(false)

  const subjects = ["All", ...Array.from(new Set(initialNotes.map(n => n.subject)))]

  useEffect(() => {
    const storedName = localStorage.getItem("studyverse_user_name")
    if (storedName) {
      setUserName(storedName)
    }
  }, [])

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) || 
                          note.subject.toLowerCase().includes(search.toLowerCase())
    const matchesSubject = selectedSubject === "All" || note.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  const handleDownloadClick = (note: Note) => {
    if (!userName) {
      setPendingNote(note)
      setIsDialogOpen(true)
    } else {
      performDownload(note)
    }
  }

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userName.trim()) return

    localStorage.setItem("studyverse_user_name", userName)
    setIsDialogOpen(false)
    if (pendingNote) {
      performDownload(pendingNote)
    }
  }

  const performDownload = async (note: Note) => {
    try {
      // Log the download
      await fetch("/api/downloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName,
          noteId: note.id,
          noteTitle: note.title
        })
      })

      // Start download
      if (typeof window !== "undefined") {
        // Try opening in new tab
        const win = window.open(note.pdf_url, '_blank')
        
        // If window.open was blocked (common in iframes/safari) or we're in Orchid environment
        if (!win || win.closed || typeof win.closed === 'undefined') {
          window.parent.postMessage({ 
            type: "OPEN_EXTERNAL_URL", 
            data: { url: note.pdf_url } 
          }, "*");
        }
      }

      setIsThankYouOpen(true)
      setTimeout(() => setIsThankYouOpen(false), 3000)
    } catch (error) {
      console.error("Download failed:", error)
      toast.error("Failed to start download. Please try again.")
    }
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {subjects.map(subject => (
            <Button
              key={subject}
              variant={selectedSubject === subject ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSubject(subject)}
              className="rounded-full"
            >
              {subject}
            </Button>
          ))}
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-zinc-900/50 border-white/10"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredNotes.map(note => (
          <Card key={note.id} className="border-white/5 bg-zinc-900/30 hover:border-primary/50 transition-all group">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                  {note.subject}
                </Badge>
                <span className="text-xs text-zinc-500">{note.semester}</span>
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">{note.title}</CardTitle>
              <CardDescription className="line-clamp-2">{note.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleDownloadClick(note)}
                className="w-full gap-2"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="py-20 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-zinc-700 mb-4" />
          <h3 className="text-xl font-semibold">No notes found</h3>
          <p className="text-zinc-500 mt-2">Try adjusting your search or filters.</p>
        </div>
      )}

      {/* Name Prompt Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-950 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Before downloading, may we know your name?</DialogTitle>
            <DialogDescription className="text-zinc-400">
              This helps us improve StudyVerse 😊. We only use this for internal statistics.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNameSubmit}>
            <div className="py-4">
              <Input
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-zinc-900 border-white/10"
                required
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">Continue to Download</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Thank You Message */}
      <Dialog open={isThankYouOpen} onOpenChange={setIsThankYouOpen}>
        <DialogContent className="bg-zinc-950 border-white/10 text-white text-center py-10">
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <DialogTitle className="text-2xl">Thank You, {userName}!</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Your download should start immediately. Happy studying!
            </DialogDescription>
            <Button onClick={() => setIsThankYouOpen(false)} variant="outline" className="mt-4">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
