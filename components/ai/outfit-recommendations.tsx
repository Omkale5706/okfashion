"use client"

import { useState } from "react"
import { Heart, Share2, ShoppingBag, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VirtualTryOn } from "./virtual-try-on"

interface OutfitRecommendationsProps {
  analysisData: any
  userImage: string | null
}

export function OutfitRecommendations({ analysisData, userImage }: OutfitRecommendationsProps) {
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [selectedOutfit, setSelectedOutfit] = useState<any>(null)
  const [showTryOn, setShowTryOn] = useState(false)

  // Mock outfit recommendations based on analysis
  const outfits = [
    {
      id: 1,
      name: "Casual Chic Ensemble",
      items: ["High-waisted jeans", "Silk blouse", "Blazer", "Ankle boots"],
      colors: ["Navy", "Cream", "Camel"],
      occasion: "Work/Casual",
      confidence: 95,
      image: "/casual-chic-outfit.jpg",
    },
    {
      id: 2,
      name: "Weekend Comfort",
      items: ["Midi dress", "Denim jacket", "White sneakers", "Crossbody bag"],
      colors: ["Sage green", "Light denim", "White"],
      occasion: "Weekend/Casual",
      confidence: 88,
      image: "/weekend-casual-dress.jpg",
    },
    {
      id: 3,
      name: "Evening Elegance",
      items: ["A-line dress", "Statement earrings", "Heeled sandals", "Clutch"],
      colors: ["Black", "Gold accents"],
      occasion: "Evening/Formal",
      confidence: 92,
      image: "/elegant-evening-dress.png",
    },
  ]

  const toggleFavorite = (outfitId: number) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(outfitId)) {
      newFavorites.delete(outfitId)
    } else {
      newFavorites.add(outfitId)
    }
    setFavorites(newFavorites)
  }

  const handleTryOn = (outfit: any) => {
    if (userImage) {
      setSelectedOutfit(outfit)
      setShowTryOn(true)
    }
  }

  const handleShare = async (outfit: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out this outfit: ${outfit.name}`,
          text: `I found this amazing ${outfit.name} outfit on OK Fashion AI!`,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Your Personalized Outfits</h3>
        <p className="text-muted-foreground">
          Based on your {analysisData.bodyShape} body shape and {analysisData.style} style
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {outfits.map((outfit) => (
          <Card key={outfit.id} className="overflow-hidden">
            <div className="relative">
              <img src={outfit.image || "/placeholder.svg"} alt={outfit.name} className="w-full h-64 object-cover" />
              <div className="absolute top-2 right-2 flex gap-1">
                <Button
                  size="sm"
                  variant={favorites.has(outfit.id) ? "default" : "secondary"}
                  onClick={() => toggleFavorite(outfit.id)}
                >
                  <Heart className={`h-4 w-4 ${favorites.has(outfit.id) ? "fill-current" : ""}`} />
                </Button>
                <Button size="sm" variant="secondary" onClick={() => handleShare(outfit)}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <Badge className="absolute bottom-2 left-2" variant={outfit.confidence > 90 ? "default" : "secondary"}>
                {outfit.confidence}% match
              </Badge>
            </div>

            <CardHeader>
              <CardTitle className="text-lg">{outfit.name}</CardTitle>
              <Badge variant="outline">{outfit.occasion}</Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Items:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {outfit.items.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Colors:</h4>
                <div className="flex gap-2">
                  {outfit.colors.map((color, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => handleTryOn(outfit)} disabled={!userImage}>
                  <Eye className="h-4 w-4 mr-2" />
                  Try On
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Shop
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Virtual Try-On Modal */}
      {selectedOutfit && userImage && (
        <VirtualTryOn
          userImage={userImage}
          outfit={selectedOutfit}
          isOpen={showTryOn}
          onClose={() => {
            setShowTryOn(false)
            setSelectedOutfit(null)
          }}
        />
      )}
    </div>
  )
}
