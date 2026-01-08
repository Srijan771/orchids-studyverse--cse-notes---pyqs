import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BookOpen, ShoppingCart, Download, TrendingUp, History } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export const dynamic = 'force-dynamic'

async function getStats() {
  const supabase = await createClient()
  const [
    { count: notesCount },
    { count: pyqsCount },
    { count: ordersCount },
    { count: downloadsCount }
  ] = await Promise.all([
    supabase.from('notes').select('*', { count: 'exact', head: true }),
    supabase.from('pyqs').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'PAID'),
    supabase.from('downloads').select('*', { count: 'exact', head: true })
  ])

  return {
    notes: notesCount || 0,
    pyqs: pyqsCount || 0,
    orders: ordersCount || 0,
    downloads: downloadsCount || 0
  }
}

async function getProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  
  return profile
}

export default async function AdminDashboard() {
  const [stats, profile] = await Promise.all([
    getStats(),
    getProfile()
  ])

  const isOwner = profile?.role === 'owner'

  const cards = [
    { name: "Total Notes", value: stats.notes, icon: FileText, color: "text-blue-500" },
    { name: "PYQ Solutions", value: stats.pyqs, icon: BookOpen, color: "text-purple-500" },
    { name: "Paid Orders", value: stats.orders, icon: ShoppingCart, color: "text-green-500" },
    { name: "Free Downloads", value: stats.downloads, icon: Download, color: "text-orange-500" },
  ]

  const quickActions = [
    { href: "/admin/notes", label: "Upload New Note", icon: FileText },
    { href: "/admin/pyqs", label: "Add PYQ Solution", icon: BookOpen },
    { href: "/admin/notices", label: "Post Announcement", icon: TrendingUp },
    { href: "/admin/settings", label: "Settings", icon: ShoppingCart, ownerOnly: true },
    { href: "/admin/logs", label: "View System Logs", icon: History, ownerOnly: true },
  ].filter(action => !action.ownerOnly || isOwner)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-zinc-400">Welcome back, {isOwner ? 'Owner' : 'Admin'}. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.name} className="border-white/10 bg-zinc-900/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">{card.name}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span>+12% from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-white/10 bg-zinc-900/50">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <AdminQuickAction key={action.href} {...action} />
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-zinc-900/50">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <StatusItem label="Database" status="Healthy" color="bg-green-500" />
            <StatusItem label="Storage" status="Healthy" color="bg-green-500" />
            <StatusItem label="Razorpay API" status="Connected" color="bg-green-500" />
            <StatusItem label="Auth Service" status="Active" color="bg-green-500" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AdminQuickAction({ href, label, icon: Icon }: any) {
  return (
    <a 
      href={href}
      className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/5 bg-black/40 p-6 transition-all hover:bg-white/5 hover:border-primary/50 group"
    >
      <Icon className="h-6 w-6 text-zinc-400 group-hover:text-primary transition-colors" />
      <span className="text-sm font-medium text-zinc-300">{label}</span>
    </a>
  )
}

function StatusItem({ label, status, color }: any) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
      <span className="text-sm text-zinc-400">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${color}`} />
        <span className="text-sm font-medium text-white">{status}</span>
      </div>
    </div>
  )
}
