"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, UserPlus, Mail, Ban, Shield } from "lucide-react"

const mockUsers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/avatars/sarah.jpg",
    status: "active",
    role: "user",
    joinDate: "2025-01-10",
    lastActive: "2 hours ago",
    analysisCount: 12,
    recommendationsCount: 48,
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com",
    avatar: "/avatars/mike.jpg",
    status: "active",
    role: "user",
    joinDate: "2025-01-08",
    lastActive: "1 day ago",
    analysisCount: 8,
    recommendationsCount: 32,
  },
  {
    id: "3",
    name: "Emma Davis",
    email: "emma@example.com",
    avatar: "/avatars/emma.jpg",
    status: "inactive",
    role: "user",
    joinDate: "2025-01-05",
    lastActive: "1 week ago",
    analysisCount: 5,
    recommendationsCount: 20,
  },
  {
    id: "4",
    name: "Admin User",
    email: "admin@okfashion.com",
    avatar: "/avatars/admin.jpg",
    status: "active",
    role: "admin",
    joinDate: "2024-12-01",
    lastActive: "Online",
    analysisCount: 0,
    recommendationsCount: 0,
  },
]

export function UserManagement() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleUserAction = (userId: string, action: string) => {
    console.log(`Action ${action} for user ${userId}`)
    // In production, this would call the appropriate API
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </div>
            <Button className="gradient-primary text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Stats</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "destructive" : "outline"}>{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="text-gray-900 dark:text-white">Joined {user.joinDate}</div>
                        <div className="text-gray-600 dark:text-gray-300">Last active: {user.lastActive}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="text-gray-900 dark:text-white">{user.analysisCount} analyses</div>
                        <div className="text-gray-600 dark:text-gray-300">
                          {user.recommendationsCount} recommendations
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleUserAction(user.id, "view")}>
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction(user.id, "email")}>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          {user.role !== "admin" && (
                            <>
                              <DropdownMenuItem onClick={() => handleUserAction(user.id, "promote")}>
                                <Shield className="h-4 w-4 mr-2" />
                                Make Admin
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleUserAction(user.id, "suspend")}
                                className="text-red-600"
                              >
                                <Ban className="h-4 w-4 mr-2" />
                                Suspend User
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
