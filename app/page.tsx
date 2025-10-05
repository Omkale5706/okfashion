import { Navigation } from "@/components/ui/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { CTASection } from "@/components/sections/cta-section"
import { Footer } from "@/components/ui/footer"
import FaceDetection from "@/components/ai/FaceDetection"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
