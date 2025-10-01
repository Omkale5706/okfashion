import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Heart, Sparkles, TrendingUp } from "lucide-react"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  isAdmin?: boolean
}

interface DashboardOverviewProps {
  user: User
}

export function DashboardOverview({ user }: DashboardOverviewProps) {
  const stats = [
    {
      title: "Photos Analyzed",
      value: "12",
      description: "AI style scans completed",
      icon: Camera,
      color: "text-blue-600",
    },
    {
      title: "Recommendations",
      value: "48",
      description: "Personalized suggestions",
      icon: Sparkles,
      color: "text-purple-600",
    },
    {
      title: "Saved Outfits",
      value: "23",
      description: "Favorite combinations",
      icon: Heart,
      color: "text-pink-600",
    },
    {
      title: "Style Score",
      value: "87%",
      description: "Fashion compatibility",
      icon: TrendingUp,
      color: "text-green-600",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user.name.split(" ")[0]}!</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Here's your style journey overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <CardDescription className="text-xs">{stat.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
