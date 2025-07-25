"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Search, Heart, Copy, Trash2, ExternalLink, Filter } from "lucide-react"
import { usePromptContext } from "../contexts/prompt-context"
import { useToast } from "../hooks/use-toast"

export function SavedPrompts() {
  const { state, dispatch } = usePromptContext()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const savedPrompts = state.savedPrompts || []

  const filteredPrompts = savedPrompts.filter((prompt) => {
    const matchesSearch =
      prompt.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || prompt.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(savedPrompts.map((p) => p.category))]

  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content)
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy prompt",
        variant: "destructive",
      })
    }
  }

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_PROMPT", payload: id })
    toast({
      title: "Deleted",
      description: "Prompt removed from library",
    })
  }

  const handleToggleFavorite = (id) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: id })
  }

  const handleTryInChatGPT = (content) => {
    const encodedPrompt = encodeURIComponent(content)
    window.open(`https://chat.openai.com/?q=${encodedPrompt}`, "_blank")
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Prompt Library</h2>
        <p className="text-base sm:text-lg text-gray-600">
          Your saved prompts and favorites ({savedPrompts.length} total)
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/80 backdrop-blur-sm h-12 sm:h-10 text-base sm:text-sm touch-manipulation"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-base sm:text-sm touch-manipulation bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Prompts Grid */}
      {filteredPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredPrompts.map((prompt) => (
            <Card key={prompt.id} className="bg-white/80 backdrop-blur-sm border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base sm:text-lg truncate">{prompt.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {prompt.category.replace("-", " ")}
                      </Badge>
                      {prompt.isFavorite && <Heart className="h-4 w-4 text-red-500 fill-current" />}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleFavorite(prompt.id)}
                    className="p-1 h-8 w-8 touch-manipulation"
                  >
                    <Heart className={`h-4 w-4 ${prompt.isFavorite ? "text-red-500 fill-current" : "text-gray-400"}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-3">{prompt.content}</p>

                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-2 gap-2 sm:hidden">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(prompt.content)}
                      className="bg-transparent touch-manipulation h-10"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(prompt.id)}
                      className="bg-transparent text-red-600 hover:text-red-700 touch-manipulation h-10"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>

                  <Button
                    onClick={() => handleTryInChatGPT(prompt.content)}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-10 touch-manipulation"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Try in ChatGPT
                  </Button>

                  {/* Desktop buttons */}
                  <div className="hidden sm:flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(prompt.content)}
                      className="flex-1 bg-transparent"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(prompt.id)}
                      className="bg-transparent text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-xs text-gray-500 pt-2 border-t">
                  Created: {new Date(prompt.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold mb-2">
            {savedPrompts.length === 0 ? "No saved prompts yet" : "No prompts match your search"}
          </h3>
          <p className="text-gray-600 mb-4">
            {savedPrompts.length === 0
              ? "Generate and save prompts to build your personal library"
              : "Try adjusting your search terms or filters"}
          </p>
          {savedPrompts.length === 0 && (
            <Button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Start Creating Prompts
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
