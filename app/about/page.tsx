import { Navigation } from "@/components/ui/navigation"
import { AboutSection } from "@/components/sections/about-section"
import { Footer } from "@/components/ui/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
