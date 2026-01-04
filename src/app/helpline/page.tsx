"use client"

import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"
import { Headphones, Mail, Phone, MessageSquare } from "lucide-react"

export default function HelplinePage() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    issueType: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.contact || !formData.issueType || !formData.message) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setIsSubmitted(true)
        toast.success("Request submitted successfully!")
      } else {
        const data = await res.json()
        toast.error(data.error || "Failed to submit request")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Helpline & Support
            </h1>
            <p className="mt-4 text-xl text-zinc-400">
              Need help with notes or payments? We're here for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="border-white/5 bg-zinc-900/30">
              <CardContent className="pt-6 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-bold">Email Support</h3>
                <p className="text-sm text-zinc-400 mt-2">Fast response within 24 hours</p>
              </CardContent>
            </Card>
            <Card className="border-white/5 bg-zinc-900/30">
              <CardContent className="pt-6 text-center">
                <MessageSquare className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-bold">Chat Support</h3>
                <p className="text-sm text-zinc-400 mt-2">Available on WhatsApp</p>
              </CardContent>
            </Card>
            <Card className="border-white/5 bg-zinc-900/30">
              <CardContent className="pt-6 text-center">
                <Headphones className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-bold">24/7 Help</h3>
                <p className="text-sm text-zinc-400 mt-2">For urgent technical issues</p>
              </CardContent>
            </Card>
          </div>

          <div className="mx-auto max-w-2xl">
            {isSubmitted ? (
              <Card className="border-primary/20 bg-primary/5 text-center p-8">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Request Received!</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Your support request has been saved. Our team will contact you shortly on {formData.contact}.
                  </CardDescription>
                </CardHeader>
                <Button onClick={() => setIsSubmitted(false)} className="mt-4">
                  Send Another Message
                </Button>
              </Card>
            ) : (
              <Card className="border-white/5 bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name (Optional)</label>
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-black/50 border-white/10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email or Phone Number <span className="text-red-500">*</span></label>
                      <Input
                        placeholder="How can we reach you?"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="bg-black/50 border-white/10"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Issue Type <span className="text-red-500">*</span></label>
                      <Select
                        onValueChange={(value) => setFormData({ ...formData, issueType: value })}
                        required
                      >
                        <SelectTrigger className="bg-black/50 border-white/10">
                          <SelectValue placeholder="Select issue type" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-white/10 text-white">
                          <SelectItem value="payment">Payment Issue</SelectItem>
                          <SelectItem value="download">Download Issue</SelectItem>
                          <SelectItem value="content">Content Suggestion</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message <span className="text-red-500">*</span></label>
                      <Textarea
                        placeholder="Describe your issue in detail..."
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-black/50 border-white/10 min-h-[120px]"
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full h-12">
                      {isSubmitting ? "Submitting..." : "Send Request"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
