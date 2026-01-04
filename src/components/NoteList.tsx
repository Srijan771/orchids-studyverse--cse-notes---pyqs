"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Download, ExternalLink, ArrowLeft, BookOpen, FileText, PenTool, Monitor, CircleCheck } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface Note {
  id: string
  title: string
  description: string
  subject: string
  semester: string
  pdf_url: string | null
  external_link: string | null
  is_external: boolean
  thumbnail_url: string | null
  note_type: string
}

interface Subject {
  id: string
  name: string
  thumbnail_url: string | null
}

const NOTE_TYPE_CONFIG: Record<string, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  cheat_sheet: { label: "Cheat Sheet", icon: FileText },
  handwritten_notes: { label: "Handwritten Notes", icon: PenTool },
  complete_notes: { label: "Complete Notes", icon: Monitor },
}

export function NoteList({ initialNotes, subjects }: { initialNotes: Note[], subjects: Subject[] }) {
  const [userName, setUserName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<{ note: Note; type: "pdf" | "link" } | null>(null)
  const [isThankYouOpen, setIsThankYouOpen] = useState(false)

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [selectedNoteType, setSelectedNoteType] = useState<string | null>(null)

  useEffect(() => {
    const storedName = localStorage.getItem("studyverse_user_name")
    if (storedName) {
      setUserName(storedName)
    }
  }, [])

  const subjectsWithNotes = useMemo(() => {
    return subjects.filter(subject => initialNotes.some(n => n.subject === subject.name))
  }, [initialNotes, subjects])

  const noteTypesForSubject = useMemo(() => {
    if (!selectedSubject) return []
    const types = Array.from(new Set(
      initialNotes
        .filter(n => n.subject === selectedSubject)
        .map(n => n.note_type || "cheat_sheet")
    ))
    return types.filter(type => NOTE_TYPE_CONFIG[type])
  }, [selectedSubject, initialNotes])

  const notesForDisplay = useMemo(() => {
    if (!selectedSubject || !selectedNoteType) return []
    return initialNotes.filter(
      n => n.subject === selectedSubject && (n.note_type || "cheat_sheet") === selectedNoteType
    )
  }, [selectedSubject, selectedNoteType, initialNotes])

  const handleActionClick = (note: Note, type: "pdf" | "link") => {
    if (!userName) {
      setPendingAction({ note, type })
      setIsDialogOpen(true)
    } else {
      performAction(note, type)
    }
  }

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userName.trim()) return

    localStorage.setItem("studyverse_user_name", userName)
    setIsDialogOpen(false)
    if (pendingAction) {
      performAction(pendingAction.note, pendingAction.type)
    }
  }

  const performAction = async (note: Note, type: "pdf" | "link") => {
    try {
      await fetch("/api/downloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName,
          noteId: note.id,
          noteTitle: note.title
        })
      })

      const url = type === "pdf" ? note.pdf_url : note.external_link
      if (!url) return

      if (typeof window !== "undefined") {
        const win = window.open(url, '_blank')
        if (!win || win.closed || typeof win.closed === 'undefined') {
          window.parent.postMessage({ 
            type: "OPEN_EXTERNAL_URL", 
            data: { url } 
          }, "*")
        }
      }

      setIsThankYouOpen(true)
      setTimeout(() => setIsThankYouOpen(false), 3000)
    } catch (error) {
      console.error("Action failed:", error)
      toast.error("Failed to open. Please try again.")
    }
  }

  const handleBack = () => {
    if (selectedNoteType) {
      setSelectedNoteType(null)
    } else if (selectedSubject) {
      setSelectedSubject(null)
    }
  }

  if (!selectedSubject) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {subjectsWithNotes.map(subject => (
            <Card 
              key={subject.id} 
              className="border-white/5 bg-zinc-900/30 hover:border-primary/50 transition-all cursor-pointer group overflow-hidden"
              onClick={() => setSelectedSubject(subject.name)}
            >
              <div className="aspect-square relative bg-zinc-800 flex items-center justify-center">
                {subject.thumbnail_url ? (
                  <Image 
                    src={subject.thumbnail_url} 
                    alt={subject.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <BookOpen className="h-12 w-12 text-zinc-600" />
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-white text-center group-hover:text-primary transition-colors truncate">
                  {subject.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {subjectsWithNotes.length === 0 && (
          <div className="py-20 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-zinc-700 mb-4" />
            <h3 className="text-xl font-semibold">No notes available</h3>
            <p className="text-zinc-500 mt-2">Check back later for updates.</p>
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-zinc-950 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Before continuing, may we know your name?</DialogTitle>
              <DialogDescription className="text-zinc-400">
                This helps us improve StudyVerse. We only use this for internal statistics.
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
                <Button type="submit" className="w-full">Continue</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isThankYouOpen} onOpenChange={setIsThankYouOpen}>
          <DialogContent className="bg-zinc-950 border-white/10 text-white text-center py-10">
            <div className="flex flex-col items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <CircleCheck className="h-10 w-10 text-green-500" />
              </div>
              <DialogTitle className="text-2xl">Thank You, {userName}!</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Your file should open shortly. Happy studying!
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

  if (!selectedNoteType) {
    return (
      <div className="space-y-8">
        <Button variant="ghost" onClick={handleBack} className="gap-2 text-zinc-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to Subjects
        </Button>

        <div>
          <h2 className="text-2xl font-bold text-white mb-6">{selectedSubject}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {noteTypesForSubject.map(type => {
              const config = NOTE_TYPE_CONFIG[type]
              const Icon = config.icon
              return (
                <Card 
                  key={type} 
                  className="border-white/5 bg-zinc-900/30 hover:border-primary/50 transition-all cursor-pointer group"
                  onClick={() => setSelectedNoteType(type)}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                      {config.label}
                    </h3>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-zinc-950 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Before continuing, may we know your name?</DialogTitle>
              <DialogDescription className="text-zinc-400">
                This helps us improve StudyVerse. We only use this for internal statistics.
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
                <Button type="submit" className="w-full">Continue</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isThankYouOpen} onOpenChange={setIsThankYouOpen}>
          <DialogContent className="bg-zinc-950 border-white/10 text-white text-center py-10">
            <div className="flex flex-col items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <CircleCheck className="h-10 w-10 text-green-500" />
              </div>
              <DialogTitle className="text-2xl">Thank You, {userName}!</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Your file should open shortly. Happy studying!
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

  return (
    <div className="space-y-8">
      <Button variant="ghost" onClick={handleBack} className="gap-2 text-zinc-400 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to {selectedSubject}
      </Button>

      <div>
        <h2 className="text-2xl font-bold text-white mb-2">{selectedSubject}</h2>
        <p className="text-zinc-400 mb-6">{NOTE_TYPE_CONFIG[selectedNoteType]?.label}</p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notesForDisplay.map(note => (
            <Card key={note.id} className="border-white/5 bg-zinc-900/30 overflow-hidden group">
              <div className="aspect-video relative bg-zinc-800">
                {note.thumbnail_url ? (
                  <Image 
                    src={note.thumbnail_url} 
                    alt={note.title} 
                    fill 
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileText className="h-12 w-12 text-zinc-600" />
                  </div>
                )}
              </div>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold text-white line-clamp-2">{note.title}</h3>
                <div className="flex gap-2">
                  {note.pdf_url && (
                    <Button 
                      onClick={() => handleActionClick(note, "pdf")}
                      className="flex-1 gap-2"
                      size="sm"
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  )}
                  {note.external_link && (
                    <Button 
                      onClick={() => handleActionClick(note, "link")}
                      variant="outline"
                      className="flex-1 gap-2"
                      size="sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open Link
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notesForDisplay.length === 0 && (
          <div className="py-20 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-zinc-700 mb-4" />
            <h3 className="text-xl font-semibold">No notes found</h3>
            <p className="text-zinc-500 mt-2">Check back later for updates.</p>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-950 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Before continuing, may we know your name?</DialogTitle>
            <DialogDescription className="text-zinc-400">
              This helps us improve StudyVerse. We only use this for internal statistics.
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
              <Button type="submit" className="w-full">Continue</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isThankYouOpen} onOpenChange={setIsThankYouOpen}>
        <DialogContent className="bg-zinc-950 border-white/10 text-white text-center py-10">
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
              <CircleCheck className="h-10 w-10 text-green-500" />
            </div>
            <DialogTitle className="text-2xl">Thank You, {userName}!</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Your file should open shortly. Happy studying!
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
