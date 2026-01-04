"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Shield, CreditCard, Lock, Key, Users, UserPlus, Trash2, Ban, Unlock } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminSettingsPage() {
  const supabase = createClient()
  const router = useRouter()
  const [role, setRole] = useState<string | null>(null)
  const [admins, setAdmins] = useState<any[]>([])
  const [settings, setSettings] = useState<any>({
    razorpay_key_id: "",
    razorpay_key_secret: "",
    razorpay_enabled: "false",
    razorpay_mode: "test",
    admin_email: "princesrijan77@gmail.com",
    secret_passkey: "studyverse_secret_123",
  })
  
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
    passkey: "",
  })
  
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAccess()
  }, [])

  const checkAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push("/admin/login")
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile) {
      router.push("/admin/login")
      return
    }

    setRole(profile.role)
    if (profile.role === 'owner') {
      await Promise.all([fetchSettings(), fetchAdmins()])
    }
    setIsLoading(false)
  }

  const fetchAdmins = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'admin') // Only fetch admins, hide owner
      .order('created_at', { ascending: false })
    if (data) setAdmins(data)
  }

  const handleToggleLock = async (userId: string) => {
    try {
      const res = await fetch("/api/admin/manage-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_lock", userId })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast.success(`Account ${data.newStatus === 'active' ? 'unlocked' : 'locked'} successfully`)
      fetchAdmins()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleResetPassword = async (userId: string) => {
    const newPassword = window.prompt("Enter new password for this admin:")
    if (!newPassword || newPassword.length < 6) {
      toast.error("Invalid password")
      return
    }

    try {
      const res = await fetch("/api/admin/manage-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "reset_password", 
          userId, 
          details: { newPassword } 
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast.success("Password reset successfully")
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const fetchSettings = async () => {
    const { data } = await supabase.from('admin_settings').select('*')
    if (data) {
      const s = data.reduce((acc: any, curr) => {
        acc[curr.key] = curr.value
        return acc
      }, {})
      setSettings((prev: any) => ({ ...prev, ...s }))
    }
  }

  const handleUpdateSettings = async (keys: string[]) => {
    setIsLoading(true)
    try {
      const updates = keys.map(key => ({
        key,
        value: String(settings[key]),
        updated_at: new Date().toISOString()
      }))

      const { error } = await supabase.from('admin_settings').upsert(updates)
      if (error) throw error
      toast.success("Settings updated successfully")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

      const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault()
        if (passwords.new !== passwords.confirm) {
          toast.error("New passwords do not match")
          return
        }

        if (passwords.passkey !== settings.secret_passkey) {
          toast.error("Invalid secret passkey")
          return
        }

        setIsLoading(true)
        try {
          const { error } = await supabase.auth.updateUser({
            password: passwords.new
          })
          if (error) throw error
            toast.success("Password changed successfully")
            
            setPasswords({ current: "", new: "", confirm: "", passkey: "" })
          } catch (error: any) {
          toast.error(error.message)
        } finally {
          setIsLoading(false)
        }
      }



  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">System Settings</h1>
          <p className="text-zinc-400">Configure your account and platform settings.</p>
        </div>
        <div className={cn(
          "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold border",
          role === 'owner' ? "bg-primary/10 text-primary border-primary/20" : "bg-blue-500/10 text-blue-500 border-blue-500/20"
        )}>
          <Shield className="h-4 w-4" />
          {role?.toUpperCase()} MODE
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {role === 'owner' && (
          <>
            {/* User Management Section */}
            <Card className="border-white/10 bg-zinc-900/50 lg:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle>User Management</CardTitle>
                </div>
                <CardDescription>Manage administrator accounts, reset passwords, and lock/unlock access.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-white/5 bg-black/30 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/5">
                        <th className="px-6 py-4 font-semibold">Email</th>
                        <th className="px-6 py-4 font-semibold">Role</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Joined</th>
                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {admins.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                            No secondary administrators found.
                          </td>
                        </tr>
                      ) : admins.map((admin) => (
                        <tr key={admin.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 font-medium">{admin.email}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-500 border border-blue-500/20">
                              {admin.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium border",
                              admin.status === 'active' 
                                ? "bg-green-500/10 text-green-500 border-green-500/20" 
                                : "bg-red-500/10 text-red-500 border-red-500/20"
                            )}>
                              {admin.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-zinc-500">
                            {new Date(admin.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 text-zinc-400 hover:text-white"
                              onClick={() => handleResetPassword(admin.id)}
                            >
                              <Lock className="h-3 w-3 mr-1" /> Reset Pass
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className={cn(
                                "h-8",
                                admin.status === 'active' ? "text-red-400 hover:text-red-300" : "text-green-400 hover:text-green-300"
                              )}
                              onClick={() => handleToggleLock(admin.id)}
                            >
                              {admin.status === 'active' ? <Ban className="h-3 w-3 mr-1" /> : <Unlock className="h-3 w-3 mr-1" />}
                              {admin.status === 'active' ? 'Lock' : 'Unlock'}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Razorpay Settings */}
            <Card className="border-white/10 bg-zinc-900/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <CardTitle>Razorpay Configuration</CardTitle>
                </div>
                <CardDescription>Configure your payment gateway credentials.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-4">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Enable Payments</label>
                    <p className="text-xs text-zinc-500">Allow users to buy PYQ solutions.</p>
                  </div>
                  <Switch 
                    checked={settings.razorpay_enabled === "true"} 
                    onCheckedChange={(v) => setSettings({ ...settings, razorpay_enabled: String(v) })}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Key ID</label>
                  <Input 
                    value={settings.razorpay_key_id} 
                    onChange={e => setSettings({ ...settings, razorpay_key_id: e.target.value })}
                    className="bg-black/50 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Key Secret</label>
                  <Input 
                    type="password"
                    value={settings.razorpay_key_secret} 
                    onChange={e => setSettings({ ...settings, razorpay_key_secret: e.target.value })}
                    className="bg-black/50 border-white/10"
                  />
                </div>

                <Button 
                  onClick={() => handleUpdateSettings(['razorpay_key_id', 'razorpay_key_secret', 'razorpay_enabled'])}
                  className="w-full"
                  disabled={isLoading}
                >
                  Save Payment Settings
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {/* Security Settings */}
        <Card className={cn("border-white/10 bg-zinc-900/50", role !== 'owner' && "lg:col-span-2")}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>{role === 'owner' ? 'Owner Security' : 'Profile Security'}</CardTitle>
            </div>
            <CardDescription>Manage your access credentials.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <Input 
                  type="password"
                  value={passwords.new}
                  onChange={e => setPasswords({ ...passwords, new: e.target.value })}
                  className="bg-black/50 border-white/10"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm New Password</label>
                <Input 
                  type="password"
                  value={passwords.confirm}
                  onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                  className="bg-black/50 border-white/10"
                  required
                />
              </div>
              {role === 'owner' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    <Key className="h-3 w-3" /> Secret Passkey
                  </label>
                  <Input 
                    type="password"
                    value={passwords.passkey}
                    onChange={e => setPasswords({ ...passwords, passkey: e.target.value })}
                    className="bg-black/50 border-white/10 border-primary/30"
                    required
                  />
                  <p className="text-[10px] text-zinc-500 italic">Required to authorize sensitive changes.</p>
                </div>
              )}

              <Button type="submit" variant="secondary" className="w-full" disabled={isLoading}>
                Update Password
              </Button>
            </form>

            {role === 'owner' && (
              <div className="border-t border-white/5 pt-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Update Secret Passkey</label>
                  <Input 
                    value={settings.secret_passkey} 
                    onChange={e => setSettings({ ...settings, secret_passkey: e.target.value })}
                    className="bg-black/50 border-white/10"
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleUpdateSettings(['secret_passkey'])}
                  disabled={isLoading}
                >
                  Save New Passkey
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
