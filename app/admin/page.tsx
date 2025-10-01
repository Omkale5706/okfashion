"use client"

import { useAuth } from "@/contexts/auth-context"
import { Navigation } from "@/components/ui/navigation"
import { AdminOverview } from "@/components/admin/admin-overview"
import { UserManagement } from "@/components/admin/user-management"
import { AnalyticsSection } from "@/components/admin/analytics-section"
import { SystemLogs } from "@/components/admin/system-logs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.push("/")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!user || !user.isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Manage users, monitor system, and view analytics</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="logs">System Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <AdminOverview />
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <UserManagement />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <AnalyticsSection />
            </TabsContent>

            <TabsContent value="logs" className="space-y-6">
              <SystemLogs />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
