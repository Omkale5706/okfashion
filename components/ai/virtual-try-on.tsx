"use client"

import { useState, useRef, useEffect } from "react"
import { X, RotateCcw, Download, Share2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface VirtualTryOnProps {
  userImage: string
  outfit: {
    id: number
    name: string
    items: string[]
    colors: string[]
    image: string
  }
  isOpen: boolean
  onClose: () => void
}

export function VirtualTryOn({ userImage, outfit, isOpen, onClose }: VirtualTryOnProps) {
  const [opacity, setOpacity] = useState([70])
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState([100])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (isOpen && userImage && outfit.image) {
      processVirtualTryOn()
    }
  }, [isOpen, userImage, outfit.image])

  const processVirtualTryOn = async () => {
    setIsProcessing(true)

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In production, this would call your AI service for actual virtual try-on
    // For now, we'll create a simple overlay effect
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (ctx) {
        canvas.width = 400
        canvas.height = 600

        // Load and draw user image
        const userImg = new Image()
        userImg.crossOrigin = "anonymous"
        userImg.onload = () => {
          ctx.drawImage(userImg, 0, 0, canvas.width, canvas.height)

          // Load and overlay outfit
          const outfitImg = new Image()
          outfitImg.crossOrigin = "anonymous"
          outfitImg.onload = () => {
            ctx.globalAlpha = opacity[0] / 100
            ctx.drawImage(
              outfitImg,
              position.x,
              position.y,
              canvas.width * (scale[0] / 100),
              canvas.height * (scale[0] / 100),
            )

            setProcessedImage(canvas.toDataURL())
            setIsProcessing(false)
          }
          outfitImg.src = outfit.image
        }
        userImg.src = userImage
      }
    }
  }

  const handleReset = () => {
    setOpacity([70])
    setPosition({ x: 0, y: 0 })
    setScale([100])
    processVirtualTryOn()
  }

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement("a")
      link.download = `virtual-try-on-${outfit.name}.png`
      link.href = processedImage
      link.click()
    }
  }

  const handleShare = async () => {
    if (processedImage && navigator.share) {
      try {
        const response = await fetch(processedImage)
        const blob = await response.blob()
        const file = new File([blob], `virtual-try-on-${outfit.name}.png`, { type: "image/png" })

        await navigator.share({
          title: `Virtual Try-On: ${outfit.name}`,
          text: "Check out my virtual try-on with OK Fashion AI!",
          files: [file],
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Virtual Try-On: {outfit.name}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Controls Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Adjustment Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Opacity Control */}
              <div>
                <label className="text-sm font-medium mb-2 block">Outfit Opacity: {opacity[0]}%</label>
                <Slider
                  value={opacity}
                  onValueChange={(value) => {
                    setOpacity(value)
                    processVirtualTryOn()
                  }}
                  max={100}
                  min={10}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Scale Control */}
              <div>
                <label className="text-sm font-medium mb-2 block">Outfit Size: {scale[0]}%</label>
                <Slider
                  value={scale}
                  onValueChange={(value) => {
                    setScale(value)
                    processVirtualTryOn()
                  }}
                  max={150}
                  min={50}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Position Controls */}
              <div>
                <label className="text-sm font-medium mb-2 block">Position</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPosition((prev) => ({ ...prev, y: prev.y - 10 }))
                      processVirtualTryOn()
                    }}
                  >
                    Move Up
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPosition((prev) => ({ ...prev, y: prev.y + 10 }))
                      processVirtualTryOn()
                    }}
                  >
                    Move Down
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPosition((prev) => ({ ...prev, x: prev.x - 10 }))
                      processVirtualTryOn()
                    }}
                  >
                    Move Left
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPosition((prev) => ({ ...prev, x: prev.x + 10 }))
                      processVirtualTryOn()
                    }}
                  >
                    Move Right
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleReset} className="flex-1 bg-transparent">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={handleDownload} className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={handleShare}
                className="w-full bg-transparent"
                disabled={!navigator.share}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Result
              </Button>

              {/* Outfit Details */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Outfit Details</h4>
                  <div className="space-y-2">
                    {outfit.items.map((item, index) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        • {item}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-1 mt-3">
                    {outfit.colors.map((color, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Preview Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Virtual Try-On Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {isProcessing ? (
                  <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                      <p className="text-sm text-muted-foreground">Processing virtual try-on...</p>
                    </div>
                  </div>
                ) : processedImage ? (
                  <div className="relative">
                    <img
                      src={processedImage || "/placeholder.svg"}
                      alt="Virtual try-on result"
                      className="w-full h-96 object-cover rounded-lg"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        // Open in fullscreen or larger view
                        window.open(processedImage, "_blank")
                      }}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Loading preview...</p>
                  </div>
                )}

                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* Comparison View */}
              {processedImage && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Before & After</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Original</p>
                      <img
                        src={userImage || "/placeholder.svg"}
                        alt="Original"
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">With Outfit</p>
                      <img
                        src={processedImage || "/placeholder.svg"}
                        alt="With outfit"
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
