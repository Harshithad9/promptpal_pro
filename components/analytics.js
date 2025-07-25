"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { TrendingUp, Zap, Heart, Calendar } from "lucide-react"
import { usePromptContext } from "../contexts/prompt-context"

export function Analytics() {
  const { state } = usePromptContext()

  const analytics = state.analytics || {
    totalGenerated: 0,
    categoriesUsed: {},
    favoritePrompts: 0,
    totalSaved: 0,
  }

  const savedPrompts = state.savedPrompts || []
  const totalSaved = savedPrompts.length
  const favoritePrompts = savedPrompts.filter((p) => p.isFavorite).length

  const categoryStats = Object.entries(analytics.categoriesUsed || {})
    .map(([category, count]) => ({
      category: category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      count,
      icon: getCategoryIcon(category),
    }))
    .sort((a, b) => b.count - a.count)

  function getCategoryIcon(category) {
    const icons = {
      "photo-generation": "📸",
      "resume-builder": "📄",
      coding: "💻",
      writing: "✍️",
      business: "💼",
      marketing: "📈",
      education: "🎓",
      productivity: "⚡",
    }
    return icons[category] || "📊"
  }

  const stats = [
    {
      title: "Total Prompts Generated",
      value: analytics.totalGenerated || 0,
      icon: Zap,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Prompts Saved",
      value: totalSaved,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Favorite Prompts",
      value: favoritePrompts,
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Categories Used",
      value: Object.keys(analytics.categoriesUsed || {}).length,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
        <p className="text-base sm:text-lg text-gray-600">Track your prompt generation activity and usage patterns</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white/80 backdrop-blur-sm border-2">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                >
                  <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Usage */}
      <Card className="bg-white/80 backdrop-blur-sm border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Category Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          {categoryStats.length > 0 ? (
            <div className="space-y-4">
              {categoryStats.map((stat) => (
                <div key={stat.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{stat.icon}</span>
                    <span className="font-medium text-sm sm:text-base">{stat.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs sm:text-sm">
                      {stat.count} {stat.count === 1 ? "prompt" : "prompts"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2">No usage data yet</h3>
              <p className="text-gray-600">Start generating prompts to see your analytics</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-white/80 backdrop-blur-sm border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {savedPrompts.length > 0 ? (
            <div className="space-y-3">
              {savedPrompts.slice(0, 5).map((prompt) => (
                <div key={prompt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base truncate">{prompt.title}</p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {new Date(prompt.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {prompt.category.replace("-", " ")}
                    </Badge>
                    {prompt.isFavorite && <Heart className="h-4 w-4 text-red-500 fill-current" />}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-lg font-semibold mb-2">No recent activity</h3>
              <p className="text-gray-600">Your recent prompt activity will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
