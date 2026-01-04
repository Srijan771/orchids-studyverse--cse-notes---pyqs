import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleCheck, Download, ArrowRight, Zap, Star, Users, MessageCircle, BookOpen, GraduationCap, FileText, Clock, Target } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import Image from "next/image"
import { ReviewsList } from "@/components/ReviewsList"
import { ReviewForm } from "@/components/ReviewForm"
import { AdSense } from "@/components/AdSense"

export const dynamic = 'force-dynamic'

async function getNotices() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("Supabase environment variables are missing")
      return []
    }
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .eq('is_enabled', true)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error("Supabase error fetching notices:", error)
      return []
    }
    return data || []
  } catch (error) {
    console.error("Failed to fetch notices:", error)
    return []
  }
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

        {/* Detailed Introduction Section - Essential for AdSense Compliance */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950/50">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Navigating Your BTech CSE Journey with StudyVerse</h2>
              <p className="text-xl text-zinc-400">A guide to Computer Science Engineering coursework</p>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-zinc-300 leading-relaxed mb-8">
                The journey through BTech Computer Science and Engineering is both challenging and rewarding. As technology continues to evolve, the foundations laid during your engineering years become relevant for your career. At StudyVerse, we provide educational materials that can help you in your examinations and build understanding of the core principles of computer science.
              </p>
              
              <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Importance of Core CS Subjects</h3>
              <p className="text-zinc-300 leading-relaxed mb-6">
                The third semester marks a significant transition in the CSE curriculum. This is where you move from basic engineering mathematics and physics to the fundamental building blocks of software development and system design. Subjects like Data Structures and Algorithms (DSA) are relevant for both university exams and technical interviews.
              </p>
              
              <p className="text-zinc-300 leading-relaxed mb-8">
                Understanding Object-Oriented Programming (OOP) allows you to write scalable, maintainable, and efficient code. Similarly, Database Management Systems (DBMS) provides the knowledge required to handle data, which is used in modern application development. At StudyVerse, our notes cover real-world applications alongside the theoretical requirements of your university syllabus.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
                <div className="bg-black/40 rounded-2xl p-8 border border-white/5 hover:border-primary/20 transition-all group">
                  <BookOpen className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold text-white mb-4">Structured Learning Paths</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    Our platform organizes study materials by semester and subject, creating a clear roadmap for your preparation. We break down complex university syllabi into manageable modules, ensuring that you cover every essential topic without feeling overwhelmed. Each module is designed to build upon the previous one, ensuring a logical flow of information.
                  </p>
                </div>
                
                <div className="bg-black/40 rounded-2xl p-8 border border-white/5 hover:border-primary/20 transition-all group">
                  <GraduationCap className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold text-white mb-4">Exam-Focused Content</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    Our platform organizes study materials by semester and subject, creating a clear roadmap for your preparation. We break down university syllabi into manageable modules, ensuring that you can cover topics systematically. Each module is designed to build upon the previous one, ensuring a logical flow of information.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mt-12 mb-6">How to Use StudyVerse Effectively</h3>
              <p className="text-zinc-300 leading-relaxed mb-6">
                To maximize your academic performance, we recommend a three-step preparation strategy using StudyVerse. First, use our <strong>Subject Notes</strong> to understand the core concepts during your regular semester classes. These notes are concise, making them suitable for pre-lecture reading or post-lecture revision.
              </p>
              
              <p className="text-zinc-300 leading-relaxed mb-6">
                Second, as your mid-semester and end-semester exams approach, shift your focus to our <strong>Previous Year Question (PYQ) Solutions</strong>. Practicing with real exam questions can help you identify frequently asked topics. At just ₹9 per paper, our solutions provide step-by-step guidance on how to tackle questions.
              </p>
              
              <p className="text-zinc-300 leading-relaxed mb-12">
                Finally, use the <strong>Important Notices</strong> section to stay updated on university circulars, exam schedules, and practical dates. We act as a bridge between the university administration and the student community, ensuring you never miss a critical deadline.
              </p>

              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 my-16">
                <h3 className="text-2xl font-bold text-white mb-6">A Message from the Founders</h3>
                <p className="text-zinc-300 italic leading-relaxed">
                  &quot;StudyVerse was born out of our own experience finding study materials. We realized that many students needed accessible resources. By providing notes for free and keeping our premium solutions affordable, we want to make study materials available to every BTech CSE student. Your support through feedback and word-of-mouth helps us reach more students and continue our work.&quot;
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-1 w-12 bg-primary"></div>
                  <span className="text-zinc-400 font-semibold tracking-wider uppercase text-sm">Srijan & Prathvish, Founders of StudyVerse</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mt-12 mb-6">Looking Beyond the Semester</h3>
              <p className="text-zinc-300 leading-relaxed mb-6">
                While our primary focus is on helping you prepare for your university examinations, StudyVerse is also working on expanding our resources. We are adding career guidance, internship opportunities, and technical interview preparation materials. A solid academic foundation can be a helpful step towards a career in the technology industry.
              </p>
              
              <p className="text-zinc-300 leading-relaxed mb-12">
                As you navigate through your engineering journey, remember that consistency is key. Small, daily efforts in understanding your subjects can yield good results over four years. StudyVerse is here to support those daily efforts with study materials for the BTech CSE community.
              </p>
            </div>
          </div>
        </section>

        {/* Ad placement after first large content block */}
        <div className="mx-auto max-w-5xl px-4 py-8">
          <AdSense />
        </div>

        {/* Subjects Grid Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold sm:text-4xl">Core 3rd Semester CSE Subjects</h2>
              <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">Study materials for all major subjects in your curriculum.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
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
                  <CardTitle className="text-xl">OOP in Java/C++</CardTitle>
                  <CardDescription className="text-zinc-400 mt-2">
                    Learn classes, objects, inheritance, and polymorphism with coding examples and diagrams.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">DBMS Essentials</CardTitle>
                  <CardDescription className="text-zinc-400 mt-2">
                    Learn SQL, Normalization, ER Modeling, and Transaction management with comprehensive exam-oriented notes.
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
            </div>
          </div>
        </section>

        {/* Why Choose StudyVerse - More Rich Content */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-8">Why Students Use StudyVerse</h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="mt-1 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-2">Student-Created Content</h4>
                      <p className="text-zinc-400">Notes are written by students who have completed these subjects.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-2">Affordable Pricing</h4>
                      <p className="text-zinc-400">We believe in education for all. That&apos;s why our premium solutions are priced affordably.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-2">Quick PDF Downloads</h4>
                      <p className="text-zinc-400">No pop-ups, no redirects, no waiting. Get your study materials quickly.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
                <div className="relative bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center gap-4 mb-8">
                    <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                    <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                    <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                    <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                    <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-white ml-2">4.9/5 Overall Rating</span>
                  </div>
                  <p className="text-zinc-300 italic mb-8 leading-relaxed">
                    &quot;The DSA notes on StudyVerse helped me understand AVL trees and Graphs. The diagrams made it easier to follow. I recommend it to other CSE students.&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-zinc-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Rahul K.</p>
                      <p className="text-xs text-zinc-500">3rd Year, NIT Surathkal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Study Guidance Content Block */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950/50 border-y border-white/5">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-10 text-center">BTech CSE Semester Exam Preparation Guide</h2>
            <div className="space-y-12 text-zinc-300 leading-relaxed prose prose-invert prose-lg max-w-none">
              <p>
                Successfully navigating university examinations requires a strategic approach to time management and resource utilization. Many students start their preparation late or focus on materials that may not align with the exam pattern. Here is a guide to preparing for your BTech CSE exams.
              </p>
              
              <div>
                <h4 className="text-xl font-bold text-white mb-4">1. Understand the Weightage</h4>
                <p>
                  Not all chapters are created equal. University question papers usually follow a predictable pattern where certain units carry more weightage. Before you start studying, analyze the previous years of question papers (available on StudyVerse) to identify which topics frequently appear. Focus your initial energy on these topics.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-4">2. The Power of Visual Representation</h4>
                <p>
                  In engineering subjects, especially for courses like Computer Organization or Database Systems, a well-labeled diagram can be helpful. Practice drawing circuit diagrams, ER models, and flowcharts. In your exam, leading with a diagram and following with an explanation can help organize your answer.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-4">3. Solve, Don&apos;t Just Read</h4>
                <p>
                  For mathematical and logical subjects like Discrete Mathematics or Theory of Computation, reading the notes is only the first step. You should solve the problems by hand. Numerical mistakes are a common reason for marks deduction in engineering exams. Use our ₹9 PYQ solutions to check your steps and identify where you might be making errors.
                </p>
              </div>

              <div className="bg-zinc-900/40 p-8 rounded-2xl border border-white/5">
                <h4 className="text-xl font-bold text-white mb-4">Tip: Structured Answers</h4>
                <p>
                  When answering a long-form theory question, consider using bullet points instead of long paragraphs. Highlighting or underlining key technical terms can make it easier for the evaluator to find the points they are looking for in the marking scheme.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ad placement before notices */}
        <div className="mx-auto max-w-5xl px-4 py-8">
          <AdSense />
        </div>

        {/* Notices Section */}
        {notices.length > 0 && (
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h2 className="text-3xl font-bold tracking-tight">University Notices & Updates</h2>
                  <p className="mt-2 text-zinc-400">Stay informed about the latest academic announcements</p>
                </div>
                <Badge variant="secondary" className="px-4 py-1 text-sm">{notices.length} active announcements</Badge>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {notices.map((notice) => (
                  <Card key={notice.id} className="border-primary/20 bg-primary/5 hover:border-primary/40 transition-all hover:-translate-y-1">
                    <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-8 gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                            {new Date(notice.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{notice.title}</h3>
                        <p className="text-zinc-400 leading-relaxed">{notice.description}</p>
                      </div>
                      <Button variant="outline" className="border-white/10 hover:bg-white/5 shrink-0">
                        View Details
                      </Button>
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

        {/* Ad at bottom after all content */}
        <div className="mx-auto max-w-5xl px-4 py-12">
          <AdSense />
        </div>
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
