import { Navigation } from "@/components/ui/navigation"
import { Footer } from "@/components/ui/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
            <p className="text-gray-600 dark:text-gray-300">Last updated: January 15, 2025</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  By accessing and using OK Fashion, you accept and agree to be bound by the terms and provision of this
                  agreement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Use License</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Permission is granted to temporarily use OK Fashion for personal, non-commercial transitory viewing
                  only. This is the grant of a license, not a transfer of title.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Content</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  You retain ownership of photos and content you upload. By uploading content, you grant us permission
                  to use it for providing our AI analysis services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  The materials on OK Fashion are provided on an 'as is' basis. OK Fashion makes no warranties,
                  expressed or implied, and hereby disclaims and negates all other warranties.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
