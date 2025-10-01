"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Share, ShoppingBag, Palette, Scissors, Shirt } from "lucide-react"
import { useFashionAPI } from "@/hooks/use-fashion-api"

interface Recommendation {
  id: string
  type: "outfit" | "hairstyle" | "color"
  title: string
  description: string
  category: string
  confidence: number
  colors: string[]
  tags: string[]
  image?: string
  liked?: boolean
  saved?: boolean
}

const getIcon = (type: string) => {
  switch (type) {
    case "outfit":
      return Shirt
    case "hairstyle":
      return Scissors
    case "color":
      return Palette
    default:
      return Shirt
  }
}

export function RecommendationsSection() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const {
    loading,
    getRecommendations,
    likeRecommendation,
    unlikeRecommendation,
    saveRecommendation,
    unsaveRecommendation,
  } = useFashionAPI()

  useEffect(() => {
    loadRecommendations()
  }, [])

  const loadRecommendations = async () => {
    const recs = await getRecommendations()
    setRecommendations(recs)
  }

  const handleLike = async (id: string, currentlyLiked: boolean) => {
    const success = currentlyLiked ? await unlikeRecommendation(id) : await likeRecommendation(id)

    if (success) {
      setRecommendations((prev) => prev.map((rec) => (rec.id === id ? { ...rec, liked: !currentlyLiked } : rec)))
    }
  }

  const handleSave = async (id: string, currentlySaved: boolean) => {
    const success = currentlySaved ? await unsaveRecommendation(id) : await saveRecommendation(id)

    if (success) {
      setRecommendations((prev) => prev.map((rec) => (rec.id === id ? { ...rec, saved: !currentlySaved } : rec)))
    }
  }

  if (loading) {
    return (
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle>Your Recommendations</CardTitle>
        <CardDescription>AI-powered suggestions based on your uploaded photos</CardDescription>
      </CardHeader>
      <CardContent>
        {recommendations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec) => {
              const Icon = getIcon(rec.type)
              return (
                <div key={rec.id} className="group">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img src={rec.image || "/placeholder.svg"} alt={rec.title} className="w-full h-48 object-cover" />
                      <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <Badge variant="secondary" className="bg-white/90 text-gray-900">
                          {Math.round(rec.confidence * 100)}% match
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{rec.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{rec.description}</p>

                      {/* Color palette */}
                      {rec.colors && (
                        <div className="flex space-x-1 mb-3">
                          {rec.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {rec.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex-1"
                          onClick={() => handleLike(rec.id, rec.liked || false)}
                        >
                          <Heart className={`h-4 w-4 mr-1 ${rec.liked ? "fill-red-500 text-red-500" : ""}`} />
                          {rec.liked ? "Liked" : "Like"}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleSave(rec.id, rec.saved || false)}>
                          <ShoppingBag className={`h-4 w-4 ${rec.saved ? "fill-blue-500 text-blue-500" : ""}`} />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shirt className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No recommendations yet</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Upload your photos to get personalized suggestions</p>
            <Button variant="outline" onClick={loadRecommendations}>
              Refresh
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
