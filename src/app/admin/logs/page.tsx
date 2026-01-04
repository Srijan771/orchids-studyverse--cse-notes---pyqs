"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Download, User } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminLogsPage() {
  const supabase = createClient()
  const [orders, setOrders] = React.useState<any[]>([])
  const [downloads, setDownloads] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    setIsLoading(true)
    const [
      { data: ordersData },
      { data: downloadsData }
    ] = await Promise.all([
      supabase.from('orders').select('*, pyqs(title)').order('created_at', { ascending: false }),
      supabase.from('downloads').select('*, notes(title)').order('created_at', { ascending: false })
    ])

    setOrders(ordersData || [])
    setDownloads(downloadsData || [])
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Logs & Transactions</h1>
        <p className="text-zinc-400">Monitor purchases and free note downloads.</p>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="bg-zinc-900 border-white/10">
          <TabsTrigger value="orders" className="flex gap-2">
            <ShoppingCart className="h-4 w-4" /> Paid Orders
          </TabsTrigger>
          <TabsTrigger value="downloads" className="flex gap-2">
            <Download className="h-4 w-4" /> Free Downloads
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          <div className="rounded-xl border border-white/10 bg-zinc-900/50 overflow-hidden">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/10">
                  <TableHead className="text-zinc-400">User / Email</TableHead>
                  <TableHead className="text-zinc-400">PYQ Item</TableHead>
                  <TableHead className="text-zinc-400">Status</TableHead>
                  <TableHead className="text-zinc-400">Date & Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell>
                      <div className="font-medium text-white">{order.user_name}</div>
                      <div className="text-xs text-zinc-500">{order.user_email}</div>
                    </TableCell>
                    <TableCell className="text-zinc-300">
                      {order.pyqs?.title || "Unknown PYQ"}
                    </TableCell>
                    <TableCell>
                      <Badge className={order.status === 'PAID' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-500 text-sm">
                      {new Date(order.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                {orders.length === 0 && !isLoading && (
                  <TableRow>
                    <TableCell colSpan={4} className="py-20 text-center text-zinc-500">
                      No orders found yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="downloads" className="mt-6">
          <div className="rounded-xl border border-white/10 bg-zinc-900/50 overflow-hidden">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/10">
                  <TableHead className="text-zinc-400">User Name</TableHead>
                  <TableHead className="text-zinc-400">Note Title</TableHead>
                  <TableHead className="text-zinc-400">Date & Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {downloads.map((download) => (
                  <TableRow key={download.id} className="border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center">
                        <User className="h-4 w-4 text-zinc-400" />
                      </div>
                      <span className="font-medium text-white">{download.user_name}</span>
                    </TableCell>
                    <TableCell className="text-zinc-300">
                      {download.notes?.title || "Unknown Note"}
                    </TableCell>
                    <TableCell className="text-zinc-500 text-sm">
                      {new Date(download.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                {downloads.length === 0 && !isLoading && (
                  <TableRow>
                    <TableCell colSpan={3} className="py-20 text-center text-zinc-500">
                      No downloads recorded yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
