"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ShoppingCart, Download, Lock, CircleCheck, AlertCircle, QrCode, ExternalLink, RefreshCcw } from "lucide-react"
import { toast } from "sonner"
import Script from "next/script"
import Image from "next/image"

interface PYQ {
  id: string
  title: string
  description: string
  subject: string
  year: string
  price: number
  pdf_url: string
  is_external: boolean
  thumbnail_url?: string
}

export function PYQList({ initialPYQs }: { initialPYQs: PYQ[] }) {
  const [pyqs, setPyqs] = useState(initialPYQs)
  const [search, setSearch] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("All")
  const [checkoutPYQ, setCheckoutPYQ] = useState<PYQ | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [userInfo, setUserInfo] = useState({ name: "", email: "" })
  const [transactionId, setTransactionId] = useState("")
  const [purchasedIds, setPurchasedIds] = useState<string[]>([])
  const [isVerifying, setIsVerifying] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<string>("upi")
  const [razorpayConfig, setRazorpayConfig] = useState<{ key_id: string; enabled: boolean } | null>(null)
  const [isRestoreOpen, setIsRestoreOpen] = useState(false)
  const [restoreEmail, setRestoreEmail] = useState("")

  const subjects = ["All", ...Array.from(new Set(initialPYQs.map(n => n.subject)))]

  useEffect(() => {
    // Load config
    fetch("/api/razorpay/config")
      .then(res => res.json())
      .then(data => setRazorpayConfig(data))
      .catch(err => console.error("Error loading razorpay config:", err))
    
    // Check local purchases
    const storedPurchases = localStorage.getItem("studyverse_purchases")
    if (storedPurchases) {
      setPurchasedIds(JSON.parse(storedPurchases))
    }

    // Check for server-side verified purchases if email exists
    const storedEmail = localStorage.getItem("studyverse_user_email")
    if (storedEmail) {
      setUserInfo(prev => ({ ...prev, email: storedEmail }))
      checkVerifiedPurchases(storedEmail)
    }

    // Add window focus listener to re-check purchases
    const handleFocus = () => {
      const email = localStorage.getItem("studyverse_user_email")
      if (email) {
        checkVerifiedPurchases(email)
      }
    }

    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [])

  const checkVerifiedPurchases = async (email: string) => {
    const trimmedEmail = email.trim().toLowerCase()
    if (!trimmedEmail) return

    try {
      const res = await fetch("/api/orders/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail })
      })
      const data = await res.json()
      if (data.purchasedIds) {
        const localPurchases = JSON.parse(localStorage.getItem("studyverse_purchases") || "[]")
        const combined = Array.from(new Set([...localPurchases, ...data.purchasedIds]))
        setPurchasedIds(combined)
        localStorage.setItem("studyverse_purchases", JSON.stringify(combined))
      }
    } catch (error) {
      console.error("Error checking verified purchases:", error)
    }
  }

  const handleRestore = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!restoreEmail) return
    const trimmedEmail = restoreEmail.trim().toLowerCase()
    setIsVerifying(true)
    await checkVerifiedPurchases(trimmedEmail)
    localStorage.setItem("studyverse_user_email", trimmedEmail)
    setIsVerifying(false)
    setIsRestoreOpen(false)
    toast.success("Purchases restored successfully!")
  }

  const filteredPYQs = pyqs.filter(pyq => {
    const matchesSearch = pyq.title.toLowerCase().includes(search.toLowerCase()) || 
                          pyq.subject.toLowerCase().includes(search.toLowerCase())
    const matchesSubject = selectedSubject === "All" || pyq.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  const handleBuyClick = (pyq: PYQ) => {
    setCheckoutPYQ(pyq)
    setIsCheckoutOpen(true)
  }

  const handleUPISubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInfo.name || !userInfo.email || !transactionId) {
      toast.error("Please fill all fields")
      return
    }
    if (!checkoutPYQ) return

    setIsVerifying(true)
    try {
      const res = await fetch("/api/upi/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pyqId: checkoutPYQ.id,
          userName: userInfo.name,
          userEmail: userInfo.email,
          transactionId: transactionId,
        })
      })

      const data = await res.json()
      if (data.error) throw new Error(data.error)

      const trimmedEmail = userInfo.email.trim().toLowerCase()
      toast.success("Payment submitted! Access will be granted after verification.")
      localStorage.setItem("studyverse_user_email", trimmedEmail)
      localStorage.setItem("studyverse_user_name", userInfo.name.trim())
      setIsCheckoutOpen(false)
      setTransactionId("")
    } catch (error: any) {
      console.error("UPI submission error:", error)
      toast.error(error.message || "Failed to submit payment.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInfo.name || !userInfo.email || !checkoutPYQ) return

    if (!razorpayConfig?.enabled) {
      toast.error("Online payment is currently unavailable.")
      return
    }

    setIsVerifying(true)
    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pyqId: checkoutPYQ.id,
          userName: userInfo.name,
          userEmail: userInfo.email,
        })
      })

      const order = await res.json()
      if (order.error) throw new Error(order.error)

      const options = {
        key: razorpayConfig.key_id,
        amount: order.amount,
        currency: "INR",
        name: "StudyVerse",
        description: `Payment for ${checkoutPYQ.title}`,
        order_id: order.id,
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              pyqId: checkoutPYQ.id,
            })
          })

          const verifyData = await verifyRes.json()
          if (verifyData.success) {
            toast.success("Payment successful!")
            const newPurchases = [...purchasedIds, checkoutPYQ.id]
            setPurchasedIds(newPurchases)
            localStorage.setItem("studyverse_purchases", JSON.stringify(newPurchases))
            setIsCheckoutOpen(false)
          } else {
            toast.error("Payment verification failed.")
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
        },
        theme: {
          color: "#3b82f6",
        },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch (error: any) {
      console.error("Checkout error:", error)
      toast.error(error.message || "Failed to initialize payment.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleDownload = (pyq: PYQ) => {
    if (!pyq.pdf_url) {
      toast.error("Download link not available")
      return
    }
    
    const userName = localStorage.getItem("studyverse_user_name") || "Purchased User"
    fetch("/api/downloads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName,
        noteId: pyq.id,
        noteTitle: pyq.title
      })
    }).catch(err => console.error("Error logging download:", err))

    const win = window.open(pyq.pdf_url, '_blank')
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.parent.postMessage({ 
        type: "OPEN_EXTERNAL_URL", 
        data: { url: pyq.pdf_url } 
      }, "*");
    }
  }

  return (
    <div className="space-y-8">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {subjects.map(subject => (
            <Button
              key={subject}
              variant={selectedSubject === subject ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSubject(subject)}
              className="rounded-full"
            >
              {subject}
            </Button>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row w-full max-w-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              placeholder="Search PYQs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-zinc-900/50 border-white/10"
            />
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsRestoreOpen(true)}
            className="border-white/10 text-zinc-400 hover:text-white"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Restore
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPYQs.map(pyq => {
          const isPurchased = purchasedIds.includes(pyq.id)
          return (
            <Card key={pyq.id} className="border-white/5 bg-zinc-900/30 hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                    {pyq.subject}
                  </Badge>
                  <span className="text-xs text-zinc-500">{pyq.year}</span>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">{pyq.title}</CardTitle>
                <CardDescription className="line-clamp-2">{pyq.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">₹{pyq.price}</span>
                  {isPurchased ? (
                    <Badge className="bg-green-500/10 text-green-500 border-none flex gap-1 items-center">
                      <CircleCheck className="h-3 w-3" /> Purchased
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                      Paid Resource
                    </Badge>
                  )}
                </div>
                {isPurchased ? (
                  <Button 
                    onClick={() => handleDownload(pyq)}
                    className="w-full gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <Download className="h-4 w-4" />
                    Download Solution
                  </Button>
                ) : (
                  <Button 
                    onClick={() => handleBuyClick(pyq)}
                    className="w-full gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Buy Solution
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredPYQs.length === 0 && (
        <div className="py-20 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-zinc-700 mb-4" />
          <h3 className="text-xl font-semibold">No PYQs found</h3>
          <p className="text-zinc-500 mt-2">Try adjusting your search or filters.</p>
        </div>
      )}

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="bg-zinc-950 border-white/10 text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription className="text-zinc-400">
              You're buying <strong>{checkoutPYQ?.title}</strong> for <strong>₹{checkoutPYQ?.price}</strong>.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="upi" onValueChange={setPaymentMethod} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-900 border border-white/5">
              <TabsTrigger value="upi" className="data-[state=active]:bg-zinc-800">Scan & Pay</TabsTrigger>
              <TabsTrigger value="razorpay" className="data-[state=active]:bg-zinc-800">Online Pay</TabsTrigger>
            </TabsList>

            <TabsContent value="upi" className="space-y-4 pt-4">
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg mb-4">
                <Image 
                  src="/upi-qr.png" 
                  alt="UPI QR Code" 
                  width={200} 
                  height={200}
                  className="rounded-md"
                />
                <p className="text-black font-bold mt-2">7224022412@mbk</p>
              </div>

              <div className="flex justify-center mb-4">
                <a 
                  href={`upi://pay?pa=7224022412@mbk&pn=StudyVerse&am=${checkoutPYQ?.price}&cu=INR`}
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in UPI App
                </a>
              </div>

              <form onSubmit={handleUPISubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Your Name</label>
                  <Input
                    placeholder="John Doe"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    className="bg-zinc-900 border-white/10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Email Address</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    className="bg-zinc-900 border-white/10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Transaction ID / UTR</label>
                  <Input
                    placeholder="12-digit number"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="bg-zinc-900 border-white/10"
                    required
                  />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={isVerifying}>
                  {isVerifying ? "Submitting..." : (
                      <>
                        <CircleCheck className="h-4 w-4" />
                        I have Paid ₹{checkoutPYQ?.price}
                      </>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="razorpay" className="space-y-4 pt-4">
              {!razorpayConfig?.enabled ? (
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-500 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Online payment is currently under maintenance.</p>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Full Name</label>
                    <Input
                      placeholder="John Doe"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                      className="bg-zinc-900 border-white/10"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Email Address</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                      className="bg-zinc-900 border-white/10"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isVerifying}>
                    {isVerifying ? "Processing..." : `Pay ₹${checkoutPYQ?.price} via Razorpay`}
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <Dialog open={isRestoreOpen} onOpenChange={setIsRestoreOpen}>
        <DialogContent className="bg-zinc-950 border-white/10 text-white sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Restore Purchases</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Enter the email address you used for payment.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRestore} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Email Address</label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={restoreEmail}
                onChange={(e) => setRestoreEmail(e.target.value)}
                className="bg-zinc-900 border-white/10"
                required
              />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={isVerifying}>
              {isVerifying ? "Checking..." : (
                <>
                  <RefreshCcw className="h-4 w-4" />
                  Restore Access
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
