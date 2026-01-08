import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Target, Heart, Users, BookOpen, Award } from "lucide-react"
import { AdSense } from "@/components/AdSense"

export const metadata = {
  title: "About Us - StudyVerse",
  description: "Learn about StudyVerse, our mission to provide free and affordable study materials for BTech CSE students, and the team behind the platform.",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              About StudyVerse
            </h1>
            <p className="mt-4 text-xl text-zinc-400">
              Empowering BTech CSE students with quality educational resources
            </p>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Who We Are</h2>
              <p className="text-zinc-300 leading-relaxed">
                StudyVerse is an educational initiative founded by BTech Computer Science and Engineering students who understand the challenges of academic life. We are Srijan and Prathvish, two passionate students who experienced firsthand the difficulty of finding comprehensive, well-organized study materials during our own academic journey. This shared experience inspired us to create a platform that would make quality education accessible to all engineering students.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                  Our team consists of students who have completed these subjects and want to help their peers. We believe that students should have access to study materials, regardless of their financial situation. This belief guides everything we do at StudyVerse, from providing free notes to offering affordable previous year question solutions.
                </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-zinc-300 leading-relaxed">
                Our mission is to provide free and affordable study resources to BTech Computer Science and Engineering students across India. We aim to help students who rely on self-study have access to organized materials. By offering notes and PYQ solutions at minimal cost, we aim to make study resources more accessible.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                We are working on expanding our platform to cover more subjects, semesters, and universities. Our goal is to be a useful resource for engineering students seeking well-structured study materials for their academic preparation.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
              <Card className="border-white/5 bg-zinc-900/30">
                <CardContent className="pt-6">
                  <Target className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
                  <p className="text-zinc-400">
                    To be a useful platform for engineering study materials, helping students with their academic preparation through accessible educational content.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-white/5 bg-zinc-900/30">
                <CardContent className="pt-6">
                  <Heart className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Our Values</h3>
                  <p className="text-zinc-400">
                    We believe in accessibility, quality, and community. Every decision we make is guided by our commitment to making education affordable while maintaining standards of content quality.
                  </p>
                </CardContent>
              </Card>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">What We Offer</h2>
              <p className="text-zinc-300 leading-relaxed">
                StudyVerse provides study materials designed for BTech CSE students. Our offerings include subject notes covering major third-semester subjects such as Data Structures, Object-Oriented Programming, Database Management Systems, and Discrete Mathematics. Each set of notes is prepared by students who have completed these subjects.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                In addition to free notes, we offer Previous Year Question (PYQ) solutions at an affordable price of just nine rupees per paper. These solutions provide step-by-step answers to questions from past examinations, helping students understand the exam pattern, frequently asked topics, and answering techniques. Our PYQ solutions can help with exam preparation by showing students the types of questions they may encounter.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                All our materials are available for instant download in PDF format, suitable for both digital reading and printing. We update our content to reflect changes in university syllabi and examination patterns.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
              <Card className="border-white/5 bg-zinc-900/30">
                <CardContent className="pt-6 text-center">
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-white">50+ PDFs</h3>
                  <p className="text-sm text-zinc-400 mt-2">Comprehensive study materials covering all major subjects</p>
                </CardContent>
              </Card>
              <Card className="border-white/5 bg-zinc-900/30">
                <CardContent className="pt-6 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-white">500+ Students</h3>
                  <p className="text-sm text-zinc-400 mt-2">Trusted by students from various colleges and universities</p>
                </CardContent>
              </Card>
              <Card className="border-white/5 bg-zinc-900/30">
                <CardContent className="pt-6 text-center">
                  <Award className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-white">4.9/5 Rating</h3>
                  <p className="text-sm text-zinc-400 mt-2">Consistently rated highly by our users</p>
                </CardContent>
              </Card>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Meet the Team</h2>
              <p className="text-zinc-300 leading-relaxed">
                StudyVerse was founded by two students who are passionate about education and technology. Our founders combine their academic experience and technical skills to create a platform for engineering students.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <GraduationCap className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Srijan</h3>
                        <p className="text-zinc-400">Co-Founder</p>
                      </div>
                    </div>
                    <p className="text-zinc-300">
                      A BTech CSE student with a passion for creating educational content. Srijan leads the content curation and reviews materials. His experience as a student helps him understand what fellow students need.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <GraduationCap className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Prathvish</h3>
                        <p className="text-zinc-400">Co-Founder</p>
                      </div>
                    </div>
                    <p className="text-zinc-300">
                      A BTech CSE student who handles the technical side of the team. Prathvish manages the platform development and user experience, working to keep StudyVerse reliable and easy to use for all students.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Our Approach to Content</h2>
              <p className="text-zinc-300 leading-relaxed">
                At StudyVerse, we focus on content quality. Every piece of content on our platform goes through a review process. Our notes are summaries that highlight key concepts, include worked examples, and focus on topics that are frequently tested in examinations.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                We seek feedback from our users and improve our materials based on their suggestions. Our goal is to provide information in an accessible and understandable format. We believe that good study materials should make learning easier, not more complicated.
              </p>
            </section>

            <section className="bg-primary/10 border border-primary/20 rounded-xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Join Our Community</h2>
              <p className="text-zinc-300 leading-relaxed">
                StudyVerse is more than just a platform for downloading notes. We are building a community of students who support each other in their academic journey. By using StudyVerse, you become part of a network of learners who share the same goals and challenges. We encourage you to provide feedback, suggest improvements, and help us grow this platform for the benefit of all students.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                Whether you are preparing for your first semester exam or your final year project, StudyVerse is here to support you every step of the way. Thank you for trusting us with your education, and we look forward to being a part of your academic success story.
              </p>
            </section>
          </div>

          <div className="mt-12">
            <AdSense />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
