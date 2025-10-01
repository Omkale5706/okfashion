import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ message: "Email, password, and name are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user (in real app, save to database)
    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name,
      isAdmin: false,
    }

    // Generate JWT
    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d",
    })

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      token,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
