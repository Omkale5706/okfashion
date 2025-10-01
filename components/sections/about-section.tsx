import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AboutSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main about content */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-balance">About OK Fashion</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 text-pretty">
            Revolutionizing fashion choices through artificial intelligence
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left content */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                We believe everyone deserves to look and feel their best. OK Fashion uses cutting-edge AI technology to
                analyze your unique features and provide personalized fashion recommendations that enhance your natural
                beauty.
              </p>
              <p>
                No more fashion mistakes or endless hours wondering what looks good on you. Our AI understands face
                shapes, body types, skin tones, and personal style preferences to deliver suggestions that are perfectly
                tailored to you.
              </p>
            </div>
          </div>

          {/* Right content - Decorative element */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center">
                {/* Colorful dots representing AI analysis */}
                <div className="relative w-32 h-32">
                  <div className="absolute top-4 left-4 w-6 h-6 bg-yellow-400 rounded-full animate-pulse" />
                  <div className="absolute top-8 right-6 w-4 h-4 bg-blue-400 rounded-full animate-bounce" />
                  <div className="absolute bottom-6 left-8 w-5 h-5 bg-green-400 rounded-full animate-ping" />
                  <div className="absolute bottom-4 right-4 w-7 h-7 bg-purple-400 rounded-full animate-pulse" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-orange-400 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Founder section */}
        <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">Founded by Om Kale</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              A passionate technologist and fashion enthusiast dedicated to solving the universal problem of poor
              fashion choices through innovative AI solutions.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
