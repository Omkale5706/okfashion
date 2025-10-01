import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-hero" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">Ready to Transform Your Style?</h2>
        <p className="text-xl text-white/90 mb-8 text-pretty leading-relaxed">
          Join thousands of users who have discovered their perfect style with OK Fashion AI
        </p>

        <Link href="/signup">
          <Button
            size="lg"
            className="gradient-accent text-white hover:opacity-90 transition-opacity text-lg px-8 py-4"
          >
            START YOUR STYLE JOURNEY
          </Button>
        </Link>
      </div>
    </section>
  )
}
