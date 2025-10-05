"use client"

import { useEffect, useRef, useState } from "react"
import { FaceMesh } from "@mediapipe/face_mesh"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface BodyAnalysisProps {
  imageUrl: string | null
  analysisData: any
  isAnalyzing: boolean
  onLandmarksDetected?: (landmarks: any) => void
}

export function BodyAnalysis({ imageUrl, analysisData, isAnalyzing, onLandmarksDetected }: BodyAnalysisProps) {
  const [landmarks, setLandmarks] = useState<any>(null)
  const faceMeshRef = useRef<FaceMesh | null>(null)
  const isClosedRef = useRef(false)

  useEffect(() => {
    let img: HTMLImageElement | null = null
    let timeoutId: any

    async function detectLandmarks() {
      if (!imageUrl || isAnalyzing) return

      setLandmarks(null)

      img = new window.Image()
      img.crossOrigin = "anonymous"
      img.src = imageUrl

      await new Promise((resolve) => { img!.onload = resolve })

      if (faceMeshRef.current && !isClosedRef.current) {
        await faceMeshRef.current.close()
        isClosedRef.current = true
        faceMeshRef.current = null
      }

      faceMeshRef.current = new FaceMesh({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      })
      isClosedRef.current = false

      faceMeshRef.current.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      })

      faceMeshRef.current.onResults((results: any) => {
        let detected: any = null
        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
          const faceLandmarks = results.multiFaceLandmarks[0].map((point: any) => ({
            x: point.x,
            y: point.y,
            z: point.z,
          }))
          detected = { face: faceLandmarks, body: [] }
          setLandmarks(detected)
        } else {
          setLandmarks(null)
        }
        if (onLandmarksDetected) onLandmarksDetected(detected)
        clearTimeout(timeoutId)
      })

      await faceMeshRef.current.send({ image: img })

      // Failsafe: after 8 seconds, trigger callback to stop spinner
      timeoutId = setTimeout(() => {
        if (isAnalyzing && onLandmarksDetected) onLandmarksDetected(null)
      }, 8000)
    }

    detectLandmarks()

    return () => {
      if (faceMeshRef.current && !isClosedRef.current) {
        faceMeshRef.current.close()
        isClosedRef.current = true
        faceMeshRef.current = null
      }
      img = null
      clearTimeout(timeoutId)
    }
  }, [imageUrl, isAnalyzing, onLandmarksDetected])

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
      {landmarks && imageUrl && (
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">Detected Landmarks</h4>
            <div className="relative">
              <img src={imageUrl || "/placeholder.svg"} alt="Analysis" className="w-full h-48 object-cover rounded" />
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