import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Camera, Sparkles, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

const stats = [
  {
    title: "Total Users",
    value: "1,247",
    change: "+12%",
    changeType: "positive",
    icon: Users,
    description: "Active users this month",
  },
  {
    title: "Photos Analyzed",
    value: "8,432",
    change: "+23%",
    changeType: "positive",
    icon: Camera,
    description: "AI analyses completed",
  },
  {
    title: "Recommendations",
    value: "25,891",
    change: "+18%",
    changeType: "positive",
    icon: Sparkles,
    description: "Generated this month",
  },
  {
    title: "User Satisfaction",
    value: "94.2%",
    change: "+2.1%",
    changeType: "positive",
    icon: TrendingUp,
    description: "Based on user feedback",
  },
]

const systemStatus = [
  { service: "AI Analysis API", status: "operational", uptime: "99.9%" },
  { service: "Image Upload Service", status: "operational", uptime: "99.8%" },
  { service: "Recommendation Engine", status: "operational", uptime: "99.7%" },
  { service: "User Authentication", status: "operational", uptime: "100%" },
  { service: "Database", status: "maintenance", uptime: "98.5%" },
]

const recentActivity = [
  { user: "Sarah Johnson", action: "Uploaded 3 photos for analysis", time: "2 minutes ago" },
  { user: "Mike Chen", action: "Saved outfit recommendation", time: "5 minutes ago" },
  { user: "Emma Davis", action: "Completed style analysis", time: "8 minutes ago" },
  { user: "Alex Rodriguez", action: "Liked hairstyle suggestion", time: "12 minutes ago" },
  { user: "Lisa Wang", action: "Shared color palette", time: "15 minutes ago" },
]

export function AdminOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant={stat.changeType === "positive" ? "default" : "destructive"} className="text-xs">
                  {stat.change}
                </Badge>
                <p className="text-xs text-gray-600 dark:text-gray-400">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* System Status */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current status of all services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemStatus.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {service.status === "operational" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{service.service}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={service.status === "operational" ? "default" : "secondary"}
                      className={service.status === "operational" ? "bg-green-100 text-green-800" : ""}
                    >
                      {service.status}
                    </Badge>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{service.uptime}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.user}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{activity.action}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
