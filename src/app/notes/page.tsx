import { supabase } from "@/lib/supabase"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { NoteList } from "@/components/NoteList"

export const dynamic = 'force-dynamic'

async function getNotes() {
  const { data } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
}

async function getSubjects() {
  const { data } = await supabase
    .from('subjects')
    .select('*')
    .order('name', { ascending: true })
  return data || []
}

export const metadata = {
  title: "Free BTech CSE Study Notes - 3rd Semester | StudyVerse",
  description: "Download study notes for BTech CSE 3rd semester. Coverage of DSA, OOP, DBMS, and Discrete Mathematics for university exams.",
}

export default async function NotesPage() {
  const [notes, subjects] = await Promise.all([
    getNotes(),
    getSubjects()
  ])

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Study Notes</h1>
            <p className="mt-4 text-zinc-400 text-lg max-w-2xl">
              Select a subject to view available notes.
            </p>
          </div>

          <NoteList initialNotes={notes} subjects={subjects} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
