import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-balance">
              Your AI Fashion{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Stylist
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 text-pretty leading-relaxed">
              Transform your style with AI-powered fashion recommendations. Upload your photo and discover personalized
              outfits, hairstyles, and color combinations that perfectly match your unique features.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/scan-style">
                <Button size="lg" className="gradient-primary text-white hover:opacity-90 transition-opacity">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Scan Your Style
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="border-gray-300 dark:border-gray-600 bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Right content - Fashion illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Large pink circle background */}
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center shadow-2xl">
                {/* Dress icon */}
                <div className="text-blue-600 transform scale-150">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 13V22H9V13L3 7V9L9 15V22H15V15L21 9Z" />
                  </svg>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full animate-pulse" />
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-purple-400 rounded-full animate-ping" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
