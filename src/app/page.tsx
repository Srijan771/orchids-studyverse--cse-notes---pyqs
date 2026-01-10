import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MessageCircle, BookOpen, GraduationCap, FileText, Target, Zap, Instagram } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ReviewsList } from "@/components/ReviewsList"
import { ReviewForm } from "@/components/ReviewForm"

export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Founders Section */}
        <div className="mx-auto max-w-4xl px-4 pt-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 rounded-2xl border border-white/5 bg-zinc-900/30 px-8 py-4 backdrop-blur-md">
            <Link href="https://instagram.com/srijan.sendry_" target="_blank" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[1.5px] group-hover:scale-110 transition-transform">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-black">
                  <Image 
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e8d42493-9eaa-4ac8-986b-467adebdf05c/98f11307-e6af-430f-b447-92b7cb887b79-resized-1767880628765.jpg?width=100&height=100&resize=contain" 
                    alt="Srijan Sendry"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Founder</p>
                <p className="text-sm font-semibold text-zinc-200">@srijan.sendry_</p>
              </div>
            </Link>
            
            <div className="hidden sm:block h-8 w-px bg-white/10" />
            
            <Link href="https://instagram.com/__prathvish__" target="_blank" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[1.5px] group-hover:scale-110 transition-transform">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-black">
                  <Image 
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e8d42493-9eaa-4ac8-986b-467adebdf05c/prathvish-1767880650983.jpg?width=100&height=100&resize=contain" 
                    alt="Prathvish"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Founder</p>
                <p className="text-sm font-semibold text-zinc-200">@__prathvish__</p>
              </div>
            </Link>
          </div>
        </div>

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
                The Ultimate Study Resource for BTech CSE Students
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-xl text-zinc-400">
                Free Notes. Affordable PYQ Solutions. Everything you need to prepare for your BTech Computer Science examinations.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
                  <Link href="/notes">Get Free Notes</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 border-white/10 px-8 text-base font-semibold hover:bg-white/5">
                  <Link href="/pyqs">Download PYQ Solutions</Link>
                </Button>
              </div>
            </MotionWrapper>
          </div>
        </section>

        {/* Detailed Introduction Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950/50">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Navigating Your BTech CSE Journey with StudyVerse</h2>
              <p className="text-xl text-zinc-400">A guide to Computer Science Engineering coursework</p>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-zinc-300 leading-relaxed mb-8">
                The journey through BTech Computer Science and Engineering is both challenging and rewarding. At StudyVerse, we provide educational materials that can help you in your examinations and build understanding of the core principles of computer science.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
                <div className="bg-black/40 rounded-2xl p-8 border border-white/5 hover:border-primary/20 transition-all group">
                  <BookOpen className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold text-white mb-4">Structured Learning Paths</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    Our platform organizes study materials by semester and subject, creating a clear roadmap for your preparation. We break down complex university syllabi into manageable modules.
                  </p>
                </div>
                
                <div className="bg-black/40 rounded-2xl p-8 border border-white/5 hover:border-primary/20 transition-all group">
                  <GraduationCap className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold text-white mb-4">Exam-Focused Content</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    We focus on providing content that directly helps in examinations, including detailed notes and solved previous year questions.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mt-12 mb-6">How to Use StudyVerse Effectively</h3>
              <p className="text-zinc-300 leading-relaxed mb-6">
                To maximize your academic performance, we recommend using our <strong>Subject Notes</strong> for regular preparation and <strong>PYQ Solutions</strong> as exams approach.
              </p>
            </div>
          </div>
        </section>

        {/* Subjects Grid Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold sm:text-4xl">Core 3rd Semester CSE Subjects</h2>
              <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">Study materials for all major subjects in your curriculum.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Data Structures</CardTitle>
                  <CardDescription className="text-zinc-400 mt-2">
                    In-depth coverage of Arrays, Linked Lists, Trees, and Graphs. Includes sorting and searching algorithm analysis.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">OOP in C++</CardTitle>
                  <CardDescription className="text-zinc-400 mt-2">
                    Learn classes, objects, inheritance, and polymorphism with coding examples and diagrams.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">EEES</CardTitle>
                    <CardDescription className="text-zinc-400 mt-2">
                      Energy, Environmental and Engineering Science concepts, ecology, and fundamental principles.
                    </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Discrete Math</CardTitle>
                  <CardDescription className="text-zinc-400 mt-2">
                    Detailed explanations of Set Theory, Logic, Combinatorics, and Graph Theory to build your mathematical base.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Digital System</CardTitle>
                  <CardDescription className="text-zinc-400 mt-2">
                    Digital logic design, boolean algebra, gates, and sequential circuits essentials.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Study Guidance Content Block */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950/50 border-y border-white/5">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-10 text-center">BTech CSE Semester Exam Preparation Guide</h2>
            <div className="space-y-12 text-zinc-300 leading-relaxed prose prose-invert prose-lg max-w-none text-center">
              <p>
                Successfully navigating university examinations requires a strategic approach to time management and resource utilization.
              </p>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Loved by Students</h2>
              <p className="mt-4 text-zinc-400">See what your peers are saying about StudyVerse</p>
            </div>
            
            <ReviewsList />

            <div className="mt-20 mx-auto max-w-2xl">
              <ReviewForm />
            </div>
          </div>
        </section>

        {/* Support CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950/50">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold">Need Any Help?</h2>
            <p className="mt-4 text-zinc-400 mb-8">
              Our support team is always ready to assist you with your queries. Whether you have questions about downloading notes, payment issues, or content requests, we are here to help you succeed in your academic journey.
            </p>
            <Button asChild variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5">
              <Link href="/helpline" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Visit Helpline Center
              </Link>
            </Button>
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
