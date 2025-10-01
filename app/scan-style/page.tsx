import { Navigation } from "@/components/ui/navigation"
import { UploadSection } from "@/components/dashboard/upload-section"
import { Footer } from "@/components/ui/footer"

export default function ScanStylePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Scan Your Style</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Upload your photos and let our AI analyze your unique features to provide personalized fashion
              recommendations
            </p>
          </div>
          <UploadSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
