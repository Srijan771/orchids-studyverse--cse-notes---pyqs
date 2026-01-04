"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CircleCheck, XCircle, Clock, ExternalLink, RefreshCcw } from "lucide-react"
import { toast } from "sonner"

export default function AdminOrdersPage() {
  const supabase = createClient()
  const [orders, setOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('orders')
      .select('*, pyqs(title)')
      .order('created_at', { ascending: false })
    
    if (error) {
      toast.error("Failed to fetch orders")
    } else {
      setOrders(data || [])
    }
    setIsLoading(false)
  }

  const handleVerify = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status, admin_verified: status === 'COMPLETED' })
        .eq('id', orderId)
      
      if (error) throw error
      
      toast.success(`Order ${status.toLowerCase()} successfully`)
      fetchOrders()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge className="bg-green-500/10 text-green-500 border-none"><CircleCheck className="h-3 w-3 mr-1" /> Verified</Badge>
      case 'PENDING_VERIFICATION':
        return <Badge className="bg-amber-500/10 text-amber-500 border-none"><Clock className="h-3 w-3 mr-1" /> Manual Review</Badge>
      case 'FAILED':
        return <Badge className="bg-red-500/10 text-red-500 border-none"><XCircle className="h-3 w-3 mr-1" /> Failed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Purchase Orders</h1>
          <p className="text-zinc-400">Track and verify manual UPI payments.</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchOrders} className="gap-2">
          <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
        </Button>
      </div>

      <div className="rounded-xl border border-white/10 bg-zinc-900/50">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead className="text-zinc-400">Date</TableHead>
              <TableHead className="text-zinc-400">Customer</TableHead>
              <TableHead className="text-zinc-400">Product</TableHead>
              <TableHead className="text-zinc-400">Payment Method</TableHead>
              <TableHead className="text-zinc-400">Transaction ID</TableHead>
              <TableHead className="text-zinc-400">Status</TableHead>
              <TableHead className="text-right text-zinc-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="border-white/5 hover:bg-white/5">
                <TableCell className="text-xs text-zinc-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-white">{order.user_name}</span>
                    <span className="text-xs text-zinc-500">{order.user_email}</span>
                  </div>
                </TableCell>
                <TableCell className="text-zinc-300 font-medium">
                  {order.pyqs?.title || 'Unknown Product'}
                </TableCell>
                <TableCell>
                  <span className="capitalize text-zinc-400">{order.payment_method?.replace('_', ' ')}</span>
                </TableCell>
                <TableCell className="font-mono text-xs text-zinc-400">
                  {order.upi_transaction_id || order.razorpay_payment_id || '-'}
                </TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  {order.status === 'PENDING_VERIFICATION' && (
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 h-8 px-2"
                        onClick={() => handleVerify(order.id, 'COMPLETED')}
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-red-500 hover:text-red-400 h-8 px-2"
                        onClick={() => handleVerify(order.id, 'FAILED')}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {orders.length === 0 && !isLoading && (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-zinc-500">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
