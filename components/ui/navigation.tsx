"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"
import { Moon, Sun, User, LogOut, Shield, Sparkles, Heart } from "lucide-react"

export function Navigation() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            OK Fashion
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-text-primary hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-text-primary hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/services" className="text-text-primary hover:text-primary transition-colors">
              Services
            </Link>
            <Link
              href="/ai-stylist"
              className="text-text-primary hover:text-primary transition-colors flex items-center gap-1"
            >
              <Sparkles className="h-4 w-4" />
              AI Stylist
            </Link>
            {user && (
              <>
                <Link
                  href="/wishlist"
                  className="text-text-primary hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Heart className="h-4 w-4" />
                  Wishlist
                </Link>
                <Link href="/dashboard" className="text-text-primary hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </>
            )}
            {user && user.isAdmin && (
              <Link href="/admin" className="text-text-primary hover:text-primary transition-colors">
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-2">
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {user ? (
              <div className="flex items-center space-x-2">
                {user.isAdmin && (
                  <Link href="/admin">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-yellow-600" />
                    </Button>
                  </Link>
                )}
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user.name}</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout} className="p-2">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="gradient-accent text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
