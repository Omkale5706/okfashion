"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, RefreshCw, AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react"

const mockLogs = [
  {
    id: "1",
    timestamp: "2025-01-15 14:32:15",
    level: "info",
    service: "AI Analysis",
    message: "Image analysis completed successfully for user sarah@example.com",
    userId: "user_123",
    details: "Face shape: oval, Skin tone: warm, Confidence: 92%",
  },
  {
    id: "2",
    timestamp: "2025-01-15 14:31:42",
    level: "warning",
    service: "Image Upload",
    message: "Large file size detected (8.2MB) for user mike@example.com",
    userId: "user_456",
    details: "File compressed from 8.2MB to 2.1MB",
  },
  {
    id: "3",
    timestamp: "2025-01-15 14:30:18",
    level: "error",
    service: "Recommendation Engine",
    message: "Failed to generate hairstyle recommendations",
    userId: "user_789",
    details: "Error: Face detection confidence too low (45%)",
  },
  {
    id: "4",
    timestamp: "2025-01-15 14:29:33",
    level: "info",
    service: "User Auth",
    message: "New user registration: emma@example.com",
    userId: "user_101",
    details: "Account created successfully, verification email sent",
  },
  {
    id: "5",
    timestamp: "2025-01-15 14:28:07",
    level: "info",
    service: "Database",
    message: "Backup completed successfully",
    userId: "system",
    details: "Size: 2.4GB, Duration: 45 seconds",
  },
  {
    id: "6",
    timestamp: "2025-01-15 14:27:21",
    level: "warning",
    service: "API Rate Limit",
    message: "Rate limit exceeded for IP 192.168.1.100",
    userId: "anonymous",
    details: "Requests: 1000/hour, Blocked for 15 minutes",
  },
]

const logLevels = [
  { value: "all", label: "All Levels" },
  { value: "info", label: "Info" },
  { value: "warning", label: "Warning" },
  { value: "error", label: "Error" },
]

const services = [
  { value: "all", label: "All Services" },
  { value: "AI Analysis", label: "AI Analysis" },
  { value: "Image Upload", label: "Image Upload" },
  { value: "Recommendation Engine", label: "Recommendation Engine" },
  { value: "User Auth", label: "User Auth" },
  { value: "Database", label: "Database" },
  { value: "API Rate Limit", label: "API Rate Limit" },
]

const getLogIcon = (level: string) => {
  switch (level) {
    case "info":
      return <Info className="h-4 w-4 text-blue-500" />
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    case "error":
      return <XCircle className="h-4 w-4 text-red-500" />
    default:
      return <CheckCircle className="h-4 w-4 text-green-500" />
  }
}

const getLogBadgeVariant = (level: string) => {
  switch (level) {
    case "info":
      return "default"
    case "warning":
      return "secondary"
    case "error":
      return "destructive"
    default:
      return "outline"
  }
}

export function SystemLogs() {
  const [logs, setLogs] = useState(mockLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedService, setSelectedService] = useState("all")

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLevel = selectedLevel === "all" || log.level === selectedLevel
    const matchesService = selectedService === "all" || log.service === selectedService

    return matchesSearch && matchesLevel && matchesService
  })

  const handleRefresh = () => {
    // In production, this would fetch fresh logs
    console.log("Refreshing logs...")
  }

  const handleExport = () => {
    // In production, this would export logs to CSV/JSON
    console.log("Exporting logs...")
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Monitor system activity and troubleshoot issues</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Log Level" />
              </SelectTrigger>
              <SelectContent>
                {logLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.value} value={service.value}>
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Logs List */}
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">{getLogIcon(log.level)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant={getLogBadgeVariant(log.level)} className="text-xs">
                        {log.level.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {log.service}
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{log.timestamp}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{log.message}</p>
                    {log.details && <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{log.details}</p>}
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>User: {log.userId}</span>
                      <span>ID: {log.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500 dark:text-gray-400">No logs found matching your criteria</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
