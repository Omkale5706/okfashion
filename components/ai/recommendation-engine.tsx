"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Sparkles, Clock, Heart, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RecommendationEngineProps {
  userProfile: {
    bodyShape: string
    faceShape: string
    skinTone: string
    style: string
    preferences: string[]
    previousLikes: number[]
  }
}

export function RecommendationEngine({ userProfile }: RecommendationEngineProps) {
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [trends, setTrends] = useState<any[]>([])
  const [personalizedPicks, setPersonalizedPicks] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    generateRecommendations()
  }, [userProfile])

  const generateRecommendations = async () => {
    setIsLoading(true)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock AI-generated recommendations based on user profile
    const mockRecommendations = [
      {
        id: 1,
        type: "AI Curated",
        title: "Perfect for Your Body Shape",
        description: `Specially selected for ${userProfile.bodyShape} body type`,
        items: [
          {
            name: "Wrap Dress",
            reason: "Accentuates your waist perfectly",
            confidence: 94,
            image: "/placeholder.svg?height=200&width=150&text=Wrap+Dress",
          },
          {
            name: "High-Waisted Trousers",
            reason: "Elongates your silhouette",
            confidence: 91,
            image: "/placeholder.svg?height=200&width=150&text=Trousers",
          },
        ],
      },
      {
        id: 2,
        type: "Color Match",
        title: "Complements Your Skin Tone",
        description: `${userProfile.skinTone} undertones work beautifully with these colors`,
        items: [
          {
            name: "Emerald Blouse",
            reason: "Enhances your natural glow",
            confidence: 89,
            image: "/placeholder.svg?height=200&width=150&text=Emerald+Top",
          },
          {
            name: "Coral Cardigan",
            reason: "Brightens your complexion",
            confidence: 87,
            image: "/placeholder.svg?height=200&width=150&text=Coral+Cardigan",
          },
        ],
      },
    ]

    const mockTrends = [
      {
        id: 1,
        name: "Oversized Blazers",
        popularity: 95,
        description: "Power dressing meets comfort",
        matchScore: 88,
        image: "/placeholder.svg?height=200&width=150&text=Blazer",
      },
      {
        id: 2,
        name: "Midi Skirts",
        popularity: 87,
        description: "Versatile and elegant",
        matchScore: 92,
        image: "/placeholder.svg?height=200&width=150&text=Midi+Skirt",
      },
      {
        id: 3,
        name: "Statement Sleeves",
        popularity: 82,
        description: "Dramatic and feminine",
        matchScore: 79,
        image: "/placeholder.svg?height=200&width=150&text=Statement+Sleeves",
      },
    ]

    const mockPersonalized = [
      {
        id: 1,
        name: "Based on Your Likes",
        items: ["Floral prints", "A-line silhouettes", "Neutral colors"],
        confidence: 96,
        image: "/placeholder.svg?height=200&width=150&text=Personalized",
      },
      {
        id: 2,
        name: "Similar Users Loved",
        items: ["Bohemian accessories", "Layered jewelry", "Textured fabrics"],
        confidence: 84,
        image: "/placeholder.svg?height=200&width=150&text=Similar+Users",
      },
    ]

    setRecommendations(mockRecommendations)
    setTrends(mockTrends)
    setPersonalizedPicks(mockPersonalized)
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">AI is analyzing your style preferences...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">AI Style Recommendations</h2>
        <p className="text-muted-foreground">Personalized suggestions powered by advanced AI algorithms</p>
      </div>

      <Tabs defaultValue="ai-curated" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ai-curated" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Curated
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trending Now
          </TabsTrigger>
          <TabsTrigger value="personalized" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Just for You
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-curated" className="space-y-4">
          {recommendations.map((rec) => (
            <Card key={rec.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Badge variant="secondary">{rec.type}</Badge>
                      {rec.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {rec.items.map((item: any, index: number) => (
                    <Card key={index} className="border-muted">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{item.reason}</p>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{item.confidence}% match</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trends.map((trend) => (
              <Card key={trend.id}>
                <div className="relative">
                  <img src={trend.image || "/placeholder.svg"} alt={trend.name} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-2 left-2">{trend.popularity}% popular</Badge>
                  <Badge variant="secondary" className="absolute top-2 right-2">
                    {trend.matchScore}% match
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{trend.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{trend.description}</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Explore Trend
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="personalized" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {personalizedPicks.map((pick) => (
              <Card key={pick.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={pick.image || "/placeholder.svg"}
                      alt={pick.name}
                      className="w-20 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{pick.name}</h3>
                      <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                        {pick.items.map((item: string, index: number) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{pick.confidence}% confidence</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Learning Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Continuous Learning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Our AI learns from your preferences and feedback to provide better recommendations over time.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary mb-1">{userProfile.previousLikes.length}</div>
              <p className="text-sm text-muted-foreground">Items Liked</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">94%</div>
              <p className="text-sm text-muted-foreground">Accuracy Rate</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">12</div>
              <p className="text-sm text-muted-foreground">Style Updates</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
