"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface BodyAnalysisProps {
  imageUrl: string | null
  analysisData: any
  isAnalyzing: boolean
}

export function BodyAnalysis({ imageUrl, analysisData, isAnalyzing }: BodyAnalysisProps) {
  const [landmarks, setLandmarks] = useState<any>(null)

  useEffect(() => {
    if (imageUrl && !isAnalyzing) {
      // Simulate MediaPipe landmark detection
      // In production, this would use actual MediaPipe
      const mockLandmarks = {
        face: [
          { x: 0.5, y: 0.3, z: 0 }, // nose
          { x: 0.45, y: 0.28, z: 0 }, // left eye
          { x: 0.55, y: 0.28, z: 0 }, // right eye
        ],
        body: [
          { x: 0.5, y: 0.4, z: 0 }, // neck
          { x: 0.4, y: 0.5, z: 0 }, // left shoulder
          { x: 0.6, y: 0.5, z: 0 }, // right shoulder
          { x: 0.45, y: 0.7, z: 0 }, // left hip
          { x: 0.55, y: 0.7, z: 0 }, // right hip
        ],
      }
      setLandmarks(mockLandmarks)
    }
  }, [imageUrl, isAnalyzing])

  if (isAnalyzing) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Analyzing your photo...</p>
        </div>
      </div>
    )
  }

  if (!analysisData) {
    return <div className="text-center py-8 text-muted-foreground">Upload a photo to see analysis results</div>
  }

  return (
    <div className="space-y-6">
      {/* Analysis Results */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Body Shape</h4>
            <Badge variant="secondary">{analysisData.bodyShape}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Face Shape</h4>
            <Badge variant="secondary">{analysisData.faceShape}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Skin Tone</h4>
            <Badge variant="secondary">{analysisData.skinTone}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Style</h4>
            <Badge variant="secondary">{analysisData.style}</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Measurements */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-medium mb-3">Body Measurements</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Shoulders:</span>
              <span className="text-sm font-medium">{analysisData.measurements.shoulders}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Waist:</span>
              <span className="text-sm font-medium">{analysisData.measurements.waist}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Hips:</span>
              <span className="text-sm font-medium">{analysisData.measurements.hips}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Landmark Visualization */}
      {landmarks && imageUrl && (
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">Detected Landmarks</h4>
            <div className="relative">
              <img src={imageUrl || "/placeholder.svg"} alt="Analysis" className="w-full h-48 object-cover rounded" />
              {/* Overlay landmarks - simplified visualization */}
              <div className="absolute inset-0">
                {landmarks.face.map((point: any, index: number) => (
                  <div
                    key={`face-${index}`}
                    className="absolute w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1 -translate-y-1"
                    style={{
                      left: `${point.x * 100}%`,
                      top: `${point.y * 100}%`,
                    }}
                  />
                ))}
                {landmarks.body.map((point: any, index: number) => (
                  <div
                    key={`body-${index}`}
                    className="absolute w-2 h-2 bg-green-500 rounded-full transform -translate-x-1 -translate-y-1"
                    style={{
                      left: `${point.x * 100}%`,
                      top: `${point.y * 100}%`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-4 mt-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Face landmarks</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Body landmarks</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

