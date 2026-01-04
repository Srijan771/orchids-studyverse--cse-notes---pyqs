"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  Bell, 
  Settings, 
  History, 
  LogOut,
  GraduationCap,
  ShoppingCart,
  Star,
  LifeBuoy
} from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [mounted, setMounted] = React.useState(false)
  const [role, setRole] = React.useState<string | null>(null)

  React.useEffect(() => {
    setMounted(true)
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
      if (data) setRole(data.role)
    }
  }

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Notes", href: "/admin/notes", icon: FileText },
    { name: "Manage Subjects", href: "/admin/subjects", icon: GraduationCap },
    { name: "Manage PYQs", href: "/admin/pyqs", icon: BookOpen },
    { name: "Purchase Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "User Reviews", href: "/admin/reviews", icon: Star },
    { name: "Support Requests", href: "/admin/support", icon: LifeBuoy },
    { name: "Notices", href: "/admin/notices", icon: Bell },
    { name: "System Logs", href: "/admin/logs", icon: History, ownerOnly: true },
    { name: "Settings", href: "/admin/settings", icon: Settings, ownerOnly: true },
  ]

  const filteredItems = menuItems.filter(item => !item.ownerOnly || role === 'owner')

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success("Logged out successfully")
    router.push("/admin/login")
  }

  return (
    <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col border-r border-white/10 bg-zinc-950 md:flex">
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
        <GraduationCap className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold text-white">StudyVerse Admin</span>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {mounted && filteredItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-zinc-400 hover:bg-red-500/10 hover:text-red-500"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
