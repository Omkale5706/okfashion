import Link from "next/link"
import { Heart } from "lucide-react"
import { NewsletterSignup } from "@/components/ui/newsletter-signup"

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">OK Fashion</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Your AI-powered fashion stylist. Transform your style with personalized recommendations that enhance your
              natural beauty.
            </p>
            <div>
              <h4 className="text-lg font-semibold mb-3">Stay Updated</h4>
              <p className="text-gray-300 text-sm mb-4">
                Subscribe to our newsletter for the latest fashion trends and AI styling tips.
              </p>
              <NewsletterSignup />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services#outfit" className="text-gray-300 hover:text-white transition-colors">
                  Outfit Recommendations
                </Link>
              </li>
              <li>
                <Link href="/services#hairstyle" className="text-gray-300 hover:text-white transition-colors">
                  Hairstyle Suggestions
                </Link>
              </li>
              <li>
                <Link href="/services#color" className="text-gray-300 hover:text-white transition-colors">
                  Color Analysis
                </Link>
              </li>
              <li>
                <Link href="/services#style" className="text-gray-300 hover:text-white transition-colors">
                  Style Transformation
                </Link>
              </li>
              <li>
                <Link href="/scan-style" className="text-gray-300 hover:text-white transition-colors">
                  Scan Your Style
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-300 flex items-center justify-center gap-2">
            © 2025 OK Fashion. Made with <Heart className="h-4 w-4 text-red-500" /> Om Kale
          </p>
        </div>
      </div>
    </footer>
  )
}
