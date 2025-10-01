import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
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

    const recommendationId = params.id

    // In production, save to user's saved recommendations
    return NextResponse.json({
      success: true,
      message: "Recommendation saved successfully",
      recommendationId,
    })
  } catch (error) {
    console.error("Save error:", error)
    return NextResponse.json({ message: "Failed to save recommendation" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const recommendationId = params.id

    // In production, remove from user's saved recommendations
    return NextResponse.json({
      success: true,
      message: "Recommendation unsaved successfully",
      recommendationId,
    })
  } catch (error) {
    console.error("Unsave error:", error)
    return NextResponse.json({ message: "Failed to unsave recommendation" }, { status: 500 })
  }
}
