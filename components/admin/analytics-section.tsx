"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, Camera, Heart, Share } from "lucide-react"

const analyticsData = {
  userGrowth: {
    current: 1247,
    previous: 1112,
    change: 12.1,
    trend: "up",
  },
  analysisVolume: {
    current: 8432,
    previous: 6891,
    change: 22.4,
    trend: "up",
  },
  engagement: {
    current: 94.2,
    previous: 92.1,
    change: 2.3,
    trend: "up",
  },
  satisfaction: {
    current: 4.8,
    previous: 4.6,
    change: 4.3,
    trend: "up",
  },
}

const topRecommendations = [
  { type: "Outfit", title: "Summer Casual Look", likes: 342, saves: 189, shares: 67 },
  { type: "Hairstyle", title: "Layered Bob Cut", likes: 298, saves: 156, shares: 43 },
  { type: "Color", title: "Autumn Palette", likes: 276, saves: 201, shares: 89 },
  { type: "Outfit", title: "Professional Power Look", likes: 234, saves: 134, shares: 32 },
  { type: "Hairstyle", title: "Textured Pixie", likes: 198, saves: 98, shares: 21 },
]

const userDemographics = [
  { ageGroup: "18-24", percentage: 28, count: 349 },
  { ageGroup: "25-34", percentage: 35, count: 437 },
  { ageGroup: "35-44", percentage: 22, count: 274 },
  { ageGroup: "45-54", percentage: 12, count: 150 },
  { ageGroup: "55+", percentage: 3, count: 37 },
]

const popularFeatures = [
  { feature: "Style Analysis", usage: 89, trend: "up" },
  { feature: "Outfit Recommendations", usage: 76, trend: "up" },
  { feature: "Color Analysis", usage: 68, trend: "stable" },
  { feature: "Hairstyle Suggestions", usage: 54, trend: "up" },
  { feature: "Save Favorites", usage: 43, trend: "down" },
]

export function AnalyticsSection() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{analyticsData.userGrowth.current}</div>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="default" className="bg-green-100 text-green-800">
                <TrendingUp className="h-3 w-3 mr-1" />+{analyticsData.userGrowth.change}%
              </Badge>
              <p className="text-xs text-gray-600 dark:text-gray-400">vs last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Analyses</CardTitle>
            <Camera className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {analyticsData.analysisVolume.current}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="default" className="bg-green-100 text-green-800">
                <TrendingUp className="h-3 w-3 mr-1" />+{analyticsData.analysisVolume.change}%
              </Badge>
              <p className="text-xs text-gray-600 dark:text-gray-400">this month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Engagement</CardTitle>
            <Heart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{analyticsData.engagement.current}%</div>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="default" className="bg-green-100 text-green-800">
                <TrendingUp className="h-3 w-3 mr-1" />+{analyticsData.engagement.change}%
              </Badge>
              <p className="text-xs text-gray-600 dark:text-gray-400">user engagement</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Satisfaction</CardTitle>
            <Share className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {analyticsData.satisfaction.current}/5
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="default" className="bg-green-100 text-green-800">
                <TrendingUp className="h-3 w-3 mr-1" />+{analyticsData.satisfaction.change}%
              </Badge>
              <p className="text-xs text-gray-600 dark:text-gray-400">avg rating</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Recommendations */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Top Recommendations</CardTitle>
            <CardDescription>Most popular recommendations this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRecommendations.map((rec, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{rec.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{rec.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{rec.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>{rec.saves}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share className="h-3 w-3" />
                      <span>{rec.shares}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Demographics */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>User Demographics</CardTitle>
            <CardDescription>Age distribution of users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userDemographics.map((demo, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{demo.ageGroup}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {demo.percentage}% ({demo.count})
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${demo.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Usage */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Feature Usage</CardTitle>
          <CardDescription>Most used features and their trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {popularFeatures.map((feature, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{feature.usage}%</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">{feature.feature}</div>
                <Badge
                  variant={feature.trend === "up" ? "default" : feature.trend === "down" ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {feature.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : feature.trend === "down" ? (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  ) : null}
                  {feature.trend}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
