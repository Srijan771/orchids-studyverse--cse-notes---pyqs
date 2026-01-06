import { supabase } from "@/lib/supabase"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { NoteList } from "@/components/NoteList"

async function getNotes() {
  const { data } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
}

export default async function NotesPage() {
  const notes = await getNotes()

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight">Free Subject Notes</h1>
            <p className="mt-4 text-zinc-400 text-lg">
              Download comprehensive notes for BTech CSE 3rd Semester.
            </p>
          </div>

          <NoteList initialNotes={notes} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
