"use client"

import { useAuth } from "@/contexts/auth-context"
import { Navigation } from "@/components/ui/navigation"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { ProfileSection } from "@/components/dashboard/profile-section"
import { RecommendationsSection } from "@/components/dashboard/recommendations-section"
import { UploadSection } from "@/components/dashboard/upload-section"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
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

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardOverview user={user} />
          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-8">
              <UploadSection />
              <RecommendationsSection />
            </div>
            <div>
              <ProfileSection user={user} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
