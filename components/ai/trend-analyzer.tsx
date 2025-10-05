"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Calendar, Globe, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function TrendAnalyzer() {
  const [trends, setTrends] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTrends()
  }, [])

  const fetchTrends = async () => {
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockTrends = [
      {
        id: 1,
        name: "Sustainable Fashion",
        category: "Lifestyle",
        growth: 45,
        popularity: 89,
        region: "Global",
        description: "Eco-friendly materials and ethical production",
        keywords: ["organic cotton", "recycled materials", "ethical brands"],
        timeframe: "Rising for 6 months",
      },
      {
        id: 2,
        name: "Y2K Revival",
        category: "Aesthetic",
        growth: 78,
        popularity: 76,
        region: "North America",
        description: "Early 2000s fashion making a comeback",
        keywords: ["low-rise jeans", "metallic fabrics", "chunky sneakers"],
        timeframe: "Peak season",
      },
      {
        id: 3,
        name: "Cottagecore",
        category: "Lifestyle",
        growth: 32,
        popularity: 68,
        region: "Europe",
        description: "Romantic, rural-inspired fashion",
        keywords: ["floral prints", "puff sleeves", "midi dresses"],
        timeframe: "Steady growth",
      },
      {
        id: 4,
        name: "Gender-Neutral Fashion",
        category: "Inclusive",
        growth: 56,
        popularity: 71,
        region: "Global",
        description: "Clothing designed for all gender identities",
        keywords: ["unisex", "neutral colors", "versatile cuts"],
        timeframe: "Emerging trend",
      },
    ]

    setTrends(mockTrends)
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Analyzing global fashion trends...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Fashion Trend Analysis</h2>
        <p className="text-muted-foreground">Real-time insights from global fashion data</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {trends.map((trend) => (
          <Card key={trend.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {trend.name}
                </CardTitle>
                <Badge variant="secondary">{trend.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{trend.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Growth Rate</span>
                  </div>
                  <Progress value={trend.growth} className="mb-1" />
                  <span className="text-xs text-muted-foreground">+{trend.growth}% this month</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Popularity</span>
                  </div>
                  <Progress value={trend.popularity} className="mb-1" />
                  <span className="text-xs text-muted-foreground">{trend.popularity}% engagement</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  {trend.region}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {trend.timeframe}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Key Elements:</h4>
                <div className="flex flex-wrap gap-2">
                  {trend.keywords.map((keyword: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trend Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{trends.length}</div>
              <p className="text-sm text-muted-foreground">Active Trends</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">
                +{Math.round(trends.reduce((acc, t) => acc + t.growth, 0) / trends.length)}%
              </div>
              <p className="text-sm text-muted-foreground">Average Growth</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">
                {Math.round(trends.reduce((acc, t) => acc + t.popularity, 0) / trends.length)}%
              </div>
              <p className="text-sm text-muted-foreground">Match Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}