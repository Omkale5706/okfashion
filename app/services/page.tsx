import { Navigation } from "@/components/ui/navigation"
import { ServicesSection } from "@/components/sections/services-section"
import { Footer } from "@/components/ui/footer"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <ServicesSection />
      </main>
      <Footer />
    </div>
  )
}
