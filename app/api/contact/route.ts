import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, category, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "All required fields must be filled" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
    }

    // In production, you would:
    // 1. Save the message to database
    // 2. Send email notification to admin
    // 3. Send confirmation email to user
    // 4. Integrate with customer support system

    console.log("Contact form submission:", {
      name,
      email,
      subject,
      category,
      message,
      timestamp: new Date().toISOString(),
    })

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 })
  }
}
