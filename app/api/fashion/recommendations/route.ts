import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock recommendation database
const mockRecommendations = [
  {
    id: "1",
    userId: "1",
    type: "outfit",
    title: "Professional Power Look",
    description: "Perfect for important meetings and presentations",
    category: "professional",
    confidence: 0.95,
    colors: ["#2C3E50", "#FFFFFF", "#E74C3C"],
    tags: ["Professional", "Confident", "Modern"],
    image: "/professional-outfit.jpg",
    createdAt: "2025-01-15T10:00:00Z",
    liked: false,
    saved: true,
  },
  {
    id: "2",
    userId: "1",
    type: "hairstyle",
    title: "Sleek Straight Hair",
    description: "Polished look that works for any occasion",
    category: "versatile",
    confidence: 0.88,
    colors: ["#8B4513"],
    tags: ["Sleek", "Professional", "Timeless"],
    image: "/sleek-hair.jpg",
    createdAt: "2025-01-15T09:30:00Z",
    liked: true,
    saved: false,
  },
  {
    id: "3",
    userId: "1",
    type: "color",
    title: "Spring Fresh Palette",
    description: "Light, fresh colors that brighten your complexion",
    category: "seasonal",
    confidence: 0.92,
    colors: ["#FFB6C1", "#98FB98", "#87CEEB", "#F0E68C"],
    tags: ["Fresh", "Light", "Youthful"],
    image: "/spring-palette.jpg",
    createdAt: "2025-01-15T09:00:00Z",
    liked: false,
    saved: true,
  },
]

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    let userId: string

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any
      userId = decoded.userId
    } catch (jwtError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") // outfit, hairstyle, color
    const category = searchParams.get("category")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Filter recommendations
    let recommendations = mockRecommendations.filter((rec) => rec.userId === userId)

    if (type) {
      recommendations = recommendations.filter((rec) => rec.type === type)
    }

    if (category) {
      recommendations = recommendations.filter((rec) => rec.category === category)
    }

    recommendations = recommendations.slice(0, limit)

    return NextResponse.json({
      recommendations,
      total: recommendations.length,
    })
  } catch (error) {
    console.error("Recommendations fetch error:", error)
    return NextResponse.json({ message: "Failed to fetch recommendations" }, { status: 500 })
  }
}
