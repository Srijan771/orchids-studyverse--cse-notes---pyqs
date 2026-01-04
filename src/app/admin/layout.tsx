import { AdminSidebar } from "@/components/AdminSidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminSidebar />
      <main className="flex-1 md:pl-64">
        <div className="mx-auto max-w-7xl p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  )
}
