import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Download, ArrowRight, Zap, Star, Users } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import Image from "next/image"

async function getNotices() {
  const { data } = await supabase
    .from('notices')
    .select('*')
    .eq('is_enabled', true)
    .order('created_at', { ascending: false })
  return data || []
}

export default async function Home() {
  const notices = await getNotices()

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[120px]" />
          </div>
          
          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <MotionWrapper>
              <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
                v1.0 is now live for 3rd Sem Students
              </Badge>
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
                StudyVerse
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-xl text-zinc-400">
                Free Notes. Smart Preparation. Affordable PYQs. Everything you need to ace your BTech CSE exams.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
                  <Link href="/notes">View Free Notes</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 border-white/10 px-8 text-base font-semibold hover:bg-white/5">
                  <Link href="/pyqs">Buy PYQ Solutions</Link>
                </Button>
              </div>
            </MotionWrapper>
          </div>
        </section>

        {/* Features / Highlights */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950/50">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="border-white/5 bg-black/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Free Subject Notes</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Comprehensive notes for all 3rd semester CSE subjects. Written by toppers.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-white/5 bg-black/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>₹9 PYQ Solutions</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Step-by-step solutions for previous year question papers at an unbeatable price.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-white/5 bg-black/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Download className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Instant Access</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Download PDFs instantly after purchase or for free. No waiting time.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Notices Section */}
        {notices.length > 0 && (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="mb-10 flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Important Notices</h2>
                <Badge variant="secondary">{notices.length} active</Badge>
              </div>
              <div className="space-y-4">
                {notices.map((notice) => (
                  <Card key={notice.id} className="border-primary/20 bg-primary/5 hover:border-primary/40 transition-colors">
                    <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">{notice.title}</h3>
                        <p className="mt-1 text-zinc-400">{notice.description}</p>
                      </div>
                      <span className="text-sm text-zinc-500 whitespace-nowrap">
                        {new Date(notice.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Stats Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-white/5">
          <div className="mx-auto max-w-7xl grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-zinc-400 mt-1 uppercase tracking-wider">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">1.2k+</div>
              <div className="text-sm text-zinc-400 mt-1 uppercase tracking-wider">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">50+</div>
              <div className="text-sm text-zinc-400 mt-1 uppercase tracking-wider">PDFs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">4.9/5</div>
              <div className="text-sm text-zinc-400 mt-1 uppercase tracking-wider">Rating</div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-3xl font-bold">Loved by Students</h2>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-white/5 bg-zinc-900/30 p-6 text-left">
                  <div className="flex gap-1 mb-4 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-zinc-300 italic">
                    "StudyVerse made my 3rd semester preparation so much easier. The PYQ solutions are clear and worth every penny!"
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-zinc-800" />
                    <div>
                      <div className="text-sm font-semibold text-white">BTech Student</div>
                      <div className="text-xs text-zinc-500">CSE, 3rd Sem</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function MotionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {children}
    </div>
  )
}
