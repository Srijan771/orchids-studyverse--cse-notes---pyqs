import { supabase } from "@/lib/supabase"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { PYQList } from "@/components/PYQList"
import { AdSense } from "@/components/AdSense"
import { FileText, Zap, Target, TrendingUp, HelpCircle, BookOpen, Calculator, Code, CircleCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export const dynamic = 'force-dynamic'

async function getPYQs() {
  const { data } = await supabase
    .from('pyqs')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
}

async function getSubjects() {
  const { data } = await supabase
    .from('subjects')
    .select('*')
    .not('description', 'is', null)
    .order('name', { ascending: true })
  return data || []
}

export const metadata = {
  title: "Solved Previous Year Question Papers - BTech CSE | StudyVerse",
  description: "Get step-by-step solutions for BTech CSE previous year question papers at just ₹9. Review exam patterns and identify frequently asked topics.",
}

export default async function PYQsPage() {
  const [pyqs, subjects] = await Promise.all([
    getPYQs(),
    getSubjects()
  ])

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Solutions for Previous Year Question Papers</h1>
              <p className="mt-6 text-zinc-400 text-lg max-w-3xl leading-relaxed">
                Prepare for your BTech Computer Science examinations with step-by-step solutions to past university question papers. Available for just ₹9, our resources can help you understand exam patterns.
              </p>
            </div>

          <div className="prose prose-invert max-w-none mb-16">
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Why Practice with PYQs</h2>
              <p className="text-zinc-300 leading-relaxed text-lg">
                In engineering, understanding the subject matter is one part of exam preparation. Another important part is knowing how to answer questions effectively. Previous Year Question (PYQ) papers can indicate which topics are commonly asked by examiners.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-6 text-lg">
                At StudyVerse, we provide solutions that show how to approach different types of questions. Each solution demonstrates answer structure, diagrammatic representation, and logical derivation.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-16">
              <Card className="border-white/5 bg-zinc-900/40 hover:border-primary/20 transition-all">
                <CardContent className="pt-8 text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-white text-lg">Pattern Analysis</h3>
                  <p className="text-sm text-zinc-400 mt-3 leading-relaxed">Identify recurring themes and frequently asked questions from past years.</p>
                </CardContent>
              </Card>
              <Card className="border-white/5 bg-zinc-900/40 hover:border-primary/20 transition-all">
                <CardContent className="pt-8 text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-white text-lg">Step-by-Step Logic</h3>
                  <p className="text-sm text-zinc-400 mt-3 leading-relaxed">Mathematical and logical proofs broken down into clear steps.</p>
                </CardContent>
              </Card>
              <Card className="border-white/5 bg-zinc-900/40 hover:border-primary/20 transition-all">
                <CardContent className="pt-8 text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-white text-lg">Answer Structure</h3>
                  <p className="text-sm text-zinc-400 mt-3 leading-relaxed">Learn how to organize answers for university examinations.</p>
                </CardContent>
              </Card>
              <Card className="border-white/5 bg-zinc-900/40 hover:border-primary/20 transition-all">
                <CardContent className="pt-8 text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-white text-lg">Digital Format</h3>
                  <p className="text-sm text-zinc-400 mt-3 leading-relaxed">PDF format allows for revision on any device.</p>
                </CardContent>
              </Card>
            </div>

            <section className="mb-12 bg-zinc-950 p-8 rounded-2xl border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-6">3rd Semester PYQ Coverage</h2>
              <p className="text-zinc-300 leading-relaxed mb-8">
                The 3rd semester includes subjects that require different problem-solving approaches. Our solutions cover the specific requirements of each subject:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {subjects.map((subject) => (
                  <div key={subject.id} className="flex gap-4">
                    <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-white/5 overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {subject.thumbnail_url ? (
                        <Image src={subject.thumbnail_url} alt="" width={48} height={48} className="object-cover w-full h-full" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-zinc-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-1">{subject.name}</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">{subject.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">How to Practice with PYQs</h2>
              <p className="text-zinc-300 leading-relaxed">
                Simply reading solutions is not enough. To benefit from PYQ solutions, consider the &quot;Blind Attempt&quot; technique. Pick a question paper, set a timer for 3 hours, and attempt the questions without looking at the solutions. Once finished, use our PDF to check yourself. Identify where your logic could be improved or where your explanation was lacking. This feedback loop can help improve your preparation.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                Pay attention to the presentation style in our solutions. Notice how we use headers, numbered lists, and keywords. Using a similar style in your university exams can help organize your answers.
              </p>
            </section>

            <section className="bg-zinc-900 border border-white/5 rounded-2xl p-8 mb-12 shadow-inner">
              <h2 className="text-2xl font-bold text-white mb-4">Affordable Pricing</h2>
              <p className="text-zinc-300 leading-relaxed">
                At StudyVerse, we maintain a flat price of just ₹9 per paper. This covers our infrastructure costs while remaining accessible to students. Each paper is a PDF that you can use on your phone, tablet, or laptop.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-6">
                  <div className="flex items-center gap-3">
                    <CircleCheck className="h-5 w-5 text-primary" />
                    <span className="text-zinc-300 text-sm">Secure Payment Gateway</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CircleCheck className="h-5 w-5 text-primary" />
                    <span className="text-zinc-300 text-sm">Instant Download Link</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CircleCheck className="h-5 w-5 text-primary" />
                    <span className="text-zinc-300 text-sm">Life-time Access</span>
                  </div>
              </div>
            </section>
          </div>

          <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-white">Available PYQ Solutions</h2>
              <p className="text-zinc-400 mb-8 max-w-2xl">
                Browse through our library of solved question papers. Each purchase supports our work to provide affordable study materials for the BTech CSE community.
              </p>
            <PYQList initialPYQs={pyqs} />
          </div>

          <div className="mt-16 pt-8 border-t border-white/5">
            <AdSense />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
