"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp } from "lucide-react"
import { usePromptContext } from "@/contexts/prompt-context"

const categories = [
  {
    id: "photo-generation",
    title: "AI Photo Generator",
    description: "Create stunning images with detailed prompts for Midjourney, DALL-E, Stable Diffusion",
    icon: "📸",
    gradient: "from-violet-500 to-purple-500",
    tags: ["Midjourney", "DALL-E", "Art"],
    trending: true,
    hot: true,
  },
  {
    id: "resume-builder",
    title: "Resume & CV Builder",
    description: "Professional resume content, cover letters, LinkedIn optimization",
    icon: "📄",
    gradient: "from-emerald-500 to-green-500",
    tags: ["Resume", "CV", "LinkedIn"],
    trending: true,
    hot: true,
  },
  {
    id: "coding",
    title: "Code Assistant",
    description: "Programming help, debugging, code reviews, and optimization",
    icon: "💻",
    gradient: "from-blue-500 to-cyan-500",
    tags: ["Programming", "Debug", "Review"],
    trending: true,
  },
  {
    id: "writing",
    title: "Content Writer",
    description: "Blog posts, articles, copywriting, and creative content",
    icon: "✍️",
    gradient: "from-purple-500 to-pink-500",
    tags: ["Blog", "Copy", "Creative"],
  },
  {
    id: "business",
    title: "Business Strategist",
    description: "Business plans, market analysis, and strategic planning",
    icon: "💼",
    gradient: "from-emerald-500 to-teal-500",
    tags: ["Strategy", "Analysis", "Planning"],
  },
  {
    id: "marketing",
    title: "Marketing Expert",
    description: "Social media, ads, email campaigns, and brand strategy",
    icon: "📈",
    gradient: "from-orange-500 to-red-500",
    tags: ["Social", "Ads", "Branding"],
    trending: true,
  },
  {
    id: "education",
    title: "Learning Coach",
    description: "Lesson plans, study guides, and educational content",
    icon: "🎓",
    gradient: "from-indigo-500 to-purple-500",
    tags: ["Teaching", "Learning", "Education"],
  },
  {
    id: "productivity",
    title: "Productivity Guru",
    description: "Workflow optimization, time management, and efficiency",
    icon: "⚡",
    gradient: "from-yellow-500 to-orange-500",
    tags: ["Workflow", "Efficiency", "Time"],
  },
]

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void
}

export function CategoryGrid({ onCategorySelect }: CategoryGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const { state } = usePromptContext()

  const filteredCategories = categories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getCategoryUsage = (categoryId: string) => {
    return state.analytics.categoriesUsed[categoryId] || 0
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Search and Header */}
      <div className="text-center space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your AI Assistant</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a specialized AI assistant to generate optimized prompts for your specific needs
          </p>
        </div>

        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <Card
            key={category.id}
            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-purple-200 bg-white/80 backdrop-blur-sm"
            onClick={() => onCategorySelect(category.id)}
          >
            <CardContent className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center text-2xl shadow-lg`}
                >
                  {category.icon}
                </div>
                <div className="flex flex-col items-end gap-1">
                  {category.hot && (
                    <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs animate-pulse">
                      🔥 HOT
                    </Badge>
                  )}
                  {category.trending && !category.hot && (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                  {getCategoryUsage(category.id) > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {getCategoryUsage(category.id)} uses
                    </Badge>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {category.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No categories found</h3>
          <p className="text-gray-600">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  )
}
