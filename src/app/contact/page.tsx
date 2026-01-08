import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, Instagram, Linkedin, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { AdSense } from "@/components/AdSense"

export const metadata = {
  title: "Contact Us - StudyVerse",
  description: "Get in touch with StudyVerse. Contact our support team for help with notes, PYQ solutions, payments, or any questions about our educational platform.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-4 text-xl text-zinc-400">
              We are here to help you with any questions or concerns
            </p>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
              <p className="text-zinc-300 leading-relaxed">
                At StudyVerse, we value our users and aim to provide support. Whether you have questions about our study materials, need help with a download, have payment-related inquiries, or want to suggest new content, our team is ready to assist you. We understand that timely support is helpful, especially during exam preparation periods, and we try to respond to all inquiries promptly.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                Our support team consists of the founders themselves, Srijan and Prathvish, who personally handle all user inquiries to ensure you receive accurate and helpful responses. Being students ourselves, we understand the urgency and stress that comes with academic deadlines, and we prioritize resolving issues that affect your studies.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="border-white/5 bg-zinc-900/30">
                <CardContent className="pt-6">
                  <Mail className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
                  <p className="text-zinc-400 mb-4">
                    Send us an email for detailed inquiries, feedback, or support requests. We typically respond within 24 hours.
                  </p>
                  <div className="space-y-2">
                    <a href="mailto:princesrijan77@gmail.com" className="block text-primary hover:underline">
                      princesrijan77@gmail.com
                    </a>
                    <a href="mailto:prathvishsinghyadavgwl@gmail.com" className="block text-primary hover:underline">
                      prathvishsinghyadavgwl@gmail.com
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-white/5 bg-zinc-900/30">
                <CardContent className="pt-6">
                  <Clock className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Response Time</h3>
                  <p className="text-zinc-400 mb-4">
                    We aim to respond to all inquiries within 24 hours. During exam seasons, we prioritize urgent support requests related to downloads and payments.
                  </p>
                  <p className="text-zinc-300 text-sm">
                    <strong>Regular Hours:</strong> Within 24 hours<br />
                    <strong>Urgent Issues:</strong> Same day response
                  </p>
                </CardContent>
              </Card>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Connect on Social Media</h2>
              <p className="text-zinc-300 leading-relaxed">
                Follow us on social media to stay updated with the latest notes, announcements, and study tips. Our social media channels are also great places to connect with other students using StudyVerse and share study strategies. Feel free to reach out to us through direct messages on Instagram or connect with us professionally on LinkedIn.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Instagram className="h-6 w-6 text-primary" />
                      <h3 className="font-bold text-white">Srijan on Instagram</h3>
                    </div>
                    <a 
                      href="https://www.instagram.com/srijan.sendry_" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-primary transition-colors"
                    >
                      @srijan.sendry_
                    </a>
                  </CardContent>
                </Card>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Instagram className="h-6 w-6 text-primary" />
                      <h3 className="font-bold text-white">Prathvish on Instagram</h3>
                    </div>
                    <a 
                      href="https://www.instagram.com/__prathvish__" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-primary transition-colors"
                    >
                      @__prathvish__
                    </a>
                  </CardContent>
                </Card>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Linkedin className="h-6 w-6 text-primary" />
                      <h3 className="font-bold text-white">Srijan on LinkedIn</h3>
                    </div>
                    <a 
                      href="https://www.linkedin.com/in/srijan-sendry-06751921b" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-primary transition-colors"
                    >
                      Connect on LinkedIn
                    </a>
                  </CardContent>
                </Card>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Linkedin className="h-6 w-6 text-primary" />
                      <h3 className="font-bold text-white">Prathvish on LinkedIn</h3>
                    </div>
                    <a 
                      href="https://www.linkedin.com/in/prathvish-singh-yadav-788960317" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-primary transition-colors"
                    >
                      Connect on LinkedIn
                    </a>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Common Support Topics</h2>
              <p className="text-zinc-300 leading-relaxed">
                Before reaching out, you might find answers to your questions in our frequently asked support topics below. We have compiled solutions to the most common issues our users encounter to help you get quick assistance.
              </p>
              
              <div className="space-y-6 mt-6">
                <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2">Download Issues</h3>
                  <p className="text-zinc-400">
                    If you are having trouble downloading notes or PYQ solutions, please ensure you have a stable internet connection. Try refreshing the page or clearing your browser cache. If the issue persists, contact us with the name of the document you are trying to download and any error messages you see.
                  </p>
                </div>
                
                <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2">Payment Problems</h3>
                  <p className="text-zinc-400">
                    If your payment was successful but you did not receive access to the purchased content, please wait a few minutes and refresh the page. If the issue continues, send us your payment receipt or transaction ID along with the email or phone number used during payment, and we will verify and provide access immediately.
                  </p>
                </div>
                
                <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2">Content Requests</h3>
                  <p className="text-zinc-400">
                    We are always looking to expand our content library. If you need notes for a specific subject that is not yet available on our platform, or if you would like to request PYQ solutions for a particular exam year, please let us know. We prioritize content requests based on demand and availability.
                  </p>
                </div>
                
                <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2">Feedback and Suggestions</h3>
                  <p className="text-zinc-400">
                    Your feedback helps us improve StudyVerse. Whether you have suggestions for new features, improvements to existing content, or general comments about your experience, we would love to hear from you. Every piece of feedback is reviewed by our team and considered for future updates.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-primary/10 border border-primary/20 rounded-xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Need Immediate Help?</h2>
              <p className="text-zinc-300 leading-relaxed mb-6">
                For urgent issues, especially during exam periods, we recommend using our dedicated Helpline Center. You can submit a support ticket with details of your issue, and our team will prioritize urgent requests. The Helpline Center allows you to track the status of your request and receive updates.
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/helpline" className="flex items-center justify-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Visit Helpline Center
                </Link>
              </Button>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Our Commitment to You</h2>
              <p className="text-zinc-300 leading-relaxed">
                At StudyVerse, we are committed to providing study materials and customer support. We understand that behind every support request is a student who needs help, and we treat every inquiry with attention. Our goal is to ensure that your experience with StudyVerse is smooth and that you can focus on what matters most - your studies.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                We work to improve our support processes and response times. If you have had a positive or negative experience with our support, please let us know so we can continue to improve. Your satisfaction is important to us, and we appreciate the trust you place in StudyVerse for your educational needs.
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
