"use client"

import { useState, useCallback } from "react"
import { Camera, Sparkles, User, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/ui/navigation"
import { Footer } from "@/components/ui/footer"
import { PhotoUpload } from "@/components/ai/photo-upload"
import { BodyAnalysis } from "@/components/ai/body-analysis"
import { OutfitRecommendations } from "@/components/ai/outfit-recommendations"
import { RecommendationEngine } from "@/components/ai/recommendation-engine"
import { TrendAnalyzer } from "@/components/ai/trend-analyzer"

export default function AIStylistPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleImageUpload = useCallback(async (imageUrl: string) => {
    setUploadedImage(imageUrl)
    setIsAnalyzing(true)

    try {
      // Simulate AI analysis - in production, this would call your AI service
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockAnalysis = {
        bodyShape: "hourglass",
        faceShape: "oval",
        skinTone: "warm",
        style: "casual-chic",
        measurements: {
          shoulders: "medium",
          waist: "defined",
          hips: "proportional",
        },
      }

      setAnalysisData(mockAnalysis)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  // Mock user profile for recommendations
  const userProfile = {
    bodyShape: analysisData?.bodyShape || "hourglass",
    faceShape: analysisData?.faceShape || "oval",
    skinTone: analysisData?.skinTone || "warm",
    style: analysisData?.style || "casual-chic",
    preferences: ["floral prints", "neutral colors", "comfortable fits"],
    previousLikes: [1, 3, 5, 7, 9, 12, 15],
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">AI Fashion Stylist</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your photo and get personalized outfit recommendations powered by AI
          </p>
        </div>

        <Tabs defaultValue="photo-analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="photo-analysis" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Photo Analysis
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              AI Recommendations
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Fashion Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="photo-analysis" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Photo Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Upload Your Photo
                  </CardTitle>
                  <CardDescription>Take a photo or upload an image for AI analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <PhotoUpload onImageUpload={handleImageUpload} />
                </CardContent>
              </Card>

              {/* Analysis Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    AI Analysis
                  </CardTitle>
                  <CardDescription>Body shape, face features, and style analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  {uploadedImage ? (
                    <BodyAnalysis imageUrl={uploadedImage} analysisData={analysisData} isAnalyzing={isAnalyzing} />
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Upload a photo to see AI analysis results
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Outfit Recommendations */}
            {analysisData && (
              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personalized Recommendations
                    </CardTitle>
                    <CardDescription>Outfits curated just for you based on AI analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OutfitRecommendations analysisData={analysisData} userImage={uploadedImage} />
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recommendations">
            <RecommendationEngine userProfile={userProfile} />
          </TabsContent>

          <TabsContent value="trends">
            <TrendAnalyzer />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
