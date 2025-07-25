"use client"

import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Search, TrendingUp } from "lucide-react"
import { usePromptContext } from "../contexts/prompt-context"

const categories = [
  {
    id: "portfolio-builder",
    title: "Portfolio Builder",
    description: "Create stunning developer/designer portfolios, showcase projects effectively",
    icon: "🎨",
    gradient: "from-pink-500 to-rose-500",
    tags: ["Portfolio", "Projects", "Showcase"],
    trending: true,
    hot: true,
    new: true,
  },
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
    id: "startup-advisor",
    title: "Startup Advisor",
    description: "Pitch decks, investor presentations, startup strategy and funding guidance",
    icon: "🚀",
    gradient: "from-red-500 to-pink-500",
    tags: ["Startup", "Pitch", "Funding"],
    trending: true,
    new: true,
  },
  {
    id: "social-media",
    title: "Social Media Manager",
    description: "Viral content, Instagram captions, TikTok scripts, Twitter threads",
    icon: "📱",
    gradient: "from-purple-500 to-indigo-500",
    tags: ["Instagram", "TikTok", "Viral"],
    trending: true,
    hot: true,
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
  {
    id: "ai-automation",
    title: "AI Automation Expert",
    description: "Workflow automation, AI tools integration, process optimization",
    icon: "🤖",
    gradient: "from-cyan-500 to-blue-500",
    tags: ["Automation", "AI Tools", "Workflow"],
    trending: true,
    new: true,
  },
]

export function CategoryGrid({ onCategorySelect }) {
  const [searchTerm, setSearchTerm] = useState("")
  const { state } = usePromptContext()

  const filteredCategories = categories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getCategoryUsage = (categoryId) => {
    return state.analytics.categoriesUsed[categoryId] || 0
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* Search and Header */}
      <div className="text-center space-y-4 sm:space-y-6 px-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Choose Your AI Assistant</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Select from 12 specialized AI assistants to generate optimized prompts for your specific needs
          </p>
        </div>

        <div className="relative max-w-sm sm:max-w-md mx-auto px-4 sm:px-0">
          <Search className="absolute left-6 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 sm:pl-10 bg-white/80 backdrop-blur-sm border-gray-200 h-12 sm:h-10 text-base sm:text-sm touch-manipulation"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-0">
        {filteredCategories.map((category) => (
          <Card
            key={category.id}
            className="group cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl border-2 hover:border-purple-200 bg-white/80 backdrop-blur-sm touch-manipulation"
            onClick={() => onCategorySelect(category.id)}
          >
            <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center text-xl sm:text-2xl shadow-lg`}
                >
                  {category.icon}
                </div>
                <div className="flex flex-col items-end gap-1">
                  {category.new && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 text-xs animate-pulse px-2 py-0.5"
                    >
                      ✨ NEW
                    </Badge>
                  )}
                  {category.hot && !category.new && (
                    <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs animate-pulse px-2 py-0.5">
                      🔥 HOT
                    </Badge>
                  )}
                  {category.trending && !category.hot && !category.new && (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                  {getCategoryUsage(category.id) > 0 && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      {getCategoryUsage(category.id)} uses
                    </Badge>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors leading-tight">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {category.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {category.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5">
                    {tag}
                  </Badge>
                ))}
                {category.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5">
                    +{category.tags.length - 3}
                  </Badge>
                )}
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
