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

    // In production, update the database
    // For now, just return success
    return NextResponse.json({
      success: true,
      message: "Recommendation liked successfully",
      recommendationId,
    })
  } catch (error) {
    console.error("Like error:", error)
    return NextResponse.json({ message: "Failed to like recommendation" }, { status: 500 })
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

    // In production, update the database
    // For now, just return success
    return NextResponse.json({
      success: true,
      message: "Recommendation unliked successfully",
      recommendationId,
    })
  } catch (error) {
    console.error("Unlike error:", error)
    return NextResponse.json({ message: "Failed to unlike recommendation" }, { status: 500 })
  }
}
