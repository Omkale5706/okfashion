"use client"

import { useState } from "react"

interface AnalysisResult {
  faceShape: string
  skinTone: string
  bodyType: string
  colorSeason: string
  stylePersonality: string
  confidence: number
}

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

interface AnalysisResponse {
  success: boolean
  analysisId: string
  analysis: AnalysisResult
  recommendations: Recommendation[]
  message: string
}

export function useFashionAPI() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token")
    return {
      Authorization: `Bearer ${token}`,
    }
  }

  const analyzeImages = async (images: File[]): Promise<AnalysisResponse | null> => {
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      images.forEach((image) => {
        formData.append("images", image)
      })

      const response = await fetch("/api/fashion/analyze", {
        method: "POST",
        headers: getAuthHeaders(),
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Analysis failed")
      }

      const result = await response.json()
      return result
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const getRecommendations = async (type?: string, category?: string, limit?: number): Promise<Recommendation[]> => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (type) params.append("type", type)
      if (category) params.append("category", category)
      if (limit) params.append("limit", limit.toString())

      const response = await fetch(`/api/fashion/recommendations?${params}`, {
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch recommendations")
      }

      const result = await response.json()
      return result.recommendations
    } catch (err: any) {
      setError(err.message)
      return []
    } finally {
      setLoading(false)
    }
  }

  const likeRecommendation = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/fashion/recommendations/${id}/like`, {
        method: "POST",
        headers: getAuthHeaders(),
      })

      return response.ok
    } catch (err) {
      console.error("Failed to like recommendation:", err)
      return false
    }
  }

  const unlikeRecommendation = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/fashion/recommendations/${id}/like`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })

      return response.ok
    } catch (err) {
      console.error("Failed to unlike recommendation:", err)
      return false
    }
  }

  const saveRecommendation = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/fashion/recommendations/${id}/save`, {
        method: "POST",
        headers: getAuthHeaders(),
      })

      return response.ok
    } catch (err) {
      console.error("Failed to save recommendation:", err)
      return false
    }
  }

  const unsaveRecommendation = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/fashion/recommendations/${id}/save`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })

      return response.ok
    } catch (err) {
      console.error("Failed to unsave recommendation:", err)
      return false
    }
  }

  return {
    loading,
    error,
    analyzeImages,
    getRecommendations,
    likeRecommendation,
    unlikeRecommendation,
    saveRecommendation,
    unsaveRecommendation,
  }
}
