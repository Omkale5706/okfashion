import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock user database
const users = [
  {
    id: "1",
    email: "admin@okfashion.com",
    name: "Admin User",
    isAdmin: true,
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Demo User",
    isAdmin: false,
  },
]

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any

      // Find user
      const user = users.find((u) => u.id === decoded.userId)
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 })
      }

      return NextResponse.json(user)
    } catch (jwtError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }
  } catch (error) {
    console.error("Auth verification error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
