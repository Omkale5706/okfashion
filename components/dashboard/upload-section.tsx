"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, Camera, X, CheckCircle, AlertCircle } from "lucide-react"
import { useFashionAPI } from "@/hooks/use-fashion-api"

export function UploadSection() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const { loading, error, analyzeImages } = useFashionAPI()

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files).filter((file) => file.type.startsWith("image/"))
    setUploadedFiles((prev) => [...prev, ...newFiles])
  }, [])

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAnalyze = async () => {
    if (uploadedFiles.length === 0) return

    const result = await analyzeImages(uploadedFiles)
    if (result) {
      setAnalysisResult(result)
    }
  }

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Camera className="h-5 w-5" />
          <span>Style Analysis</span>
        </CardTitle>
        <CardDescription>Upload your photos to get personalized fashion recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Success Alert */}
        {analysisResult && (
          <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Analysis completed! Found {analysisResult.recommendations.length} personalized recommendations for you.
            </AlertDescription>
          </Alert>
        )}

        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">Upload your photos</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Drag and drop or click to select face and body photos
          </p>
          <Button variant="outline">Choose Files</Button>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
          />
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium">Uploaded Photos ({uploadedFiles.length})</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <img
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">Analysis Results</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-blue-800 dark:text-blue-200">Face Shape:</span>{" "}
                <span className="text-blue-700 dark:text-blue-300 capitalize">{analysisResult.analysis.faceShape}</span>
              </div>
              <div>
                <span className="font-medium text-blue-800 dark:text-blue-200">Skin Tone:</span>{" "}
                <span className="text-blue-700 dark:text-blue-300 capitalize">{analysisResult.analysis.skinTone}</span>
              </div>
              <div>
                <span className="font-medium text-blue-800 dark:text-blue-200">Body Type:</span>{" "}
                <span className="text-blue-700 dark:text-blue-300 capitalize">{analysisResult.analysis.bodyType}</span>
              </div>
              <div>
                <span className="font-medium text-blue-800 dark:text-blue-200">Color Season:</span>{" "}
                <span className="text-blue-700 dark:text-blue-300 capitalize">
                  {analysisResult.analysis.colorSeason}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <span className="font-medium text-blue-800 dark:text-blue-200">Confidence:</span>{" "}
              <span className="text-blue-700 dark:text-blue-300">
                {Math.round(analysisResult.analysis.confidence * 100)}%
              </span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={handleAnalyze}
          disabled={uploadedFiles.length === 0 || loading}
          className="w-full gradient-primary text-white"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Analyzing...
            </>
          ) : analysisResult ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Analysis Complete
            </>
          ) : (
            "Analyze My Style"
          )}
        </Button>

        {/* Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Tips for best results:</h5>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Upload clear, well-lit photos</li>
            <li>• Include both face and full-body shots</li>
            <li>• Wear minimal makeup for accurate analysis</li>
            <li>• Use neutral backgrounds when possible</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
