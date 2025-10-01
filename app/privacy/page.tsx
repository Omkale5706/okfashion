import { Navigation } from "@/components/ui/navigation"
import { Footer } from "@/components/ui/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-600 dark:text-gray-300">Last updated: January 15, 2025</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  We collect information you provide directly to us, such as when you create an account, upload photos
                  for analysis, or contact us for support.
                </p>
                <ul>
                  <li>Personal information (name, email address)</li>
                  <li>Photos you upload for AI analysis</li>
                  <li>Style preferences and recommendations history</li>
                  <li>Usage data and analytics</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Provide personalized fashion recommendations</li>
                  <li>Improve our AI analysis algorithms</li>
                  <li>Send you updates about our services</li>
                  <li>Respond to your questions and provide customer support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  We implement appropriate security measures to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. Your photos are encrypted and stored securely.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  If you have any questions about this Privacy Policy, please contact us at privacy@okfashion.com or
                  through our contact form.
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
