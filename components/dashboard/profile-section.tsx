"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit, Save, X, Camera } from "lucide-react"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  isAdmin?: boolean
}

interface ProfileSectionProps {
  user: User
}

export function ProfileSection({ user }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  const handleSave = () => {
    // TODO: Implement profile update API call
    setIsEditing(false)
  }

  const handleCancel = () => {
    setName(user.name)
    setEmail(user.email)
    setIsEditing(false)
  }

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Profile</CardTitle>
          {!isEditing ? (
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4" />
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={handleSave}>
                <Save className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Button size="sm" variant="secondary" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          {user.isAdmin && <Badge variant="secondary">Admin</Badge>}
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            {isEditing ? (
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-300">{user.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            {isEditing ? (
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
            )}
          </div>
        </div>

        {/* Style Preferences */}
        <div className="space-y-4">
          <h4 className="font-medium">Style Preferences</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Casual</Badge>
            <Badge variant="outline">Modern</Badge>
            <Badge variant="outline">Minimalist</Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            View Style History
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Download My Data
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
