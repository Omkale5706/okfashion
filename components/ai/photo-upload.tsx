"use client"

import { useState, useRef, useCallback } from "react"
import { Camera, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface PhotoUploadProps {
  onImageUpload: (imageUrl: string) => void
}

export function PhotoUpload({ onImageUpload }: PhotoUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  // Handle drag and drop
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  // Handle image file selection
  const handleFile = useCallback(
    (file: File) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string
          setPreview(imageUrl)
          onImageUpload(imageUrl)
        }
        reader.readAsDataURL(file)
      }
    },
    [onImageUpload]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0])
      }
    },
    [handleFile]
  )

  // Camera controls
  const startCamera = useCallback(async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })
      setStream(newStream)
      setIsCameraActive(true)
      // Wait for video element to be ready before assigning srcObject
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = newStream
          videoRef.current.play()
        }
      }, 100)
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsCameraActive(false)
  }, [stream])

  // Capture photo from video
  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageUrl = canvas.toDataURL("image/jpeg")
        setPreview(imageUrl)
        onImageUpload(imageUrl)
        stopCamera()
      }
    }
  }, [onImageUpload, stopCamera])

  // Clear current preview
  const clearImage = useCallback(() => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [])

  return (
    <div className="space-y-4">
      {preview ? (
        <Card className="relative">
          <img
            src={preview || "/placeholder.svg"}
            alt="Uploaded preview"
            className="w-full h-64 object-cover rounded-lg"
          />
          <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={clearImage}>
            <X className="h-4 w-4" />
          </Button>
        </Card>
      ) : (
        <>
          {isCameraActive ? (
            <Card className="relative flex flex-col items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 object-cover rounded-lg bg-black"
                style={{ background: "black" }}
              />
              <canvas ref={canvasRef} className="hidden" />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <Button onClick={capturePhoto}>Capture Photo</Button>
                <Button variant="outline" onClick={stopCamera}>
                  Cancel
                </Button>
              </div>
            </Card>
          ) : (
            <Card
              className={`border-2 border-dashed p-8 text-center transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Upload className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-medium">Drop your photo here</p>
                  <p className="text-sm text-muted-foreground">or click to browse files</p>
                </div>
                <div className="flex gap-2 justify-center">
                  <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                  <Button onClick={startCamera} variant="outline">
                    <Camera className="h-4 w-4 mr-2" />
                    Use Camera
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
    </div>
  )
}