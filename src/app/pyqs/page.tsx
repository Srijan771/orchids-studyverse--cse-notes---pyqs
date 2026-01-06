import { supabase } from "@/lib/supabase"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { PYQList } from "@/components/PYQList"

async function getPYQs() {
  const { data } = await supabase
    .from('pyqs')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
}

export default async function PYQsPage() {
  const pyqs = await getPYQs()

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight">PYQ Solutions</h1>
            <p className="mt-4 text-zinc-400 text-lg">
              Ace your exams with step-by-step solutions for Previous Year Questions at just ₹9 per paper.
            </p>
          </div>

          <PYQList initialPYQs={pyqs} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
