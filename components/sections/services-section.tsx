import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shirt, Scissors, Palette, Sparkles } from "lucide-react"

const services = [
  {
    icon: Shirt,
    title: "Accessory Matching",
    description:
      "Complete your look with the right accessories. Get suggestions for jewelry, bags, shoes, and other accessories that complement your style.",
  },
  {
    icon: Scissors,
    title: "Face Shape Analysis",
    description:
      "Understand your unique face shape and receive tailored recommendations for hairstyles, glasses, and makeup that enhance your best features.",
  },
  {
    icon: Sparkles,
    title: "Style Transformation",
    description:
      "Ready for a complete makeover? Our AI creates comprehensive style guides that transform your entire wardrobe and appearance.",
  },
  {
    icon: Shirt,
    title: "Outfit Recommendations",
    description:
      "Get personalized outfit suggestions based on your body type, style preferences, and occasion. Our AI considers fit, color coordination, and current trends.",
  },
  {
    icon: Scissors,
    title: "Hairstyle Suggestions",
    description:
      "Discover hairstyles that complement your face shape and features. From casual to formal looks, find the perfect cut and style for any occasion.",
  },
  {
    icon: Palette,
    title: "Color Analysis",
    description:
      "Learn which colors enhance your natural beauty. Our AI analyzes your skin tone, hair color, and eye color to recommend your perfect palette.",
  },
]

export function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-balance">Our AI Services</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-pretty">
            Comprehensive styling solutions powered by advanced artificial intelligence
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
