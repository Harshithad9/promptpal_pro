"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Star, TrendingUp } from "lucide-react"
import { usePromptContext } from "@/contexts/prompt-context"
import { useToast } from "@/hooks/use-toast"

export function SavedPrompts() {
  const { state, dispatch } = usePromptContext()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const filteredPrompts = state.savedPrompts
    .filter(prompt => {
      const matchesSearch = prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prompt.categoryTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = filterCategory === "all" || 
                             prompt.category === filterCategory ||
                             (filterCategory === "favorites" && prompt.isFavorite)
      
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "usage":
          return b.usageCount - a.usageCount
        case "favorites":
          return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0)
        default:
          return 0
      }
    })

  const handleCopy = async (prompt: string, id: string) => {
    try {
      await navigator.clipboard.writeText(prompt)
      dispatch({ type: 'UPDATE_USAGE', payload: id })
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard"
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy prompt",
        variant: "destructive"
      })
    }
  }

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_PROMPT', payload: id })
    toast({
      title: "Deleted",
      description: "Prompt removed from library"
    })
  }

  const handleToggleFavorite = (id: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id })
  }

  const handleTryInChatGPT = (prompt: string, id: string) => {
    dispatch({ type: 'UPDATE_USAGE', payload: id })
    const encodedPrompt = encodeURIComponent(prompt)
    window.open(`https://chat.openai.com/?q=${encodedPrompt}`, "_blank")
  }

  if (state.savedPrompts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-8xl mb-6">📚</div>
        <h3 className="text-2xl font-semibold mb-4">Your Prompt Library is Empty</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Start generating and saving prompts to build your personal AI assistant library
        </p>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
          Generate Your First Prompt
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Prompt Library</h2>
          <p className="text-gray-600">
            {state.savedPrompts.length} prompts • {state.analytics.favoritePrompts} favorites
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="all">All Categories</option>
            <option value="favorites">Favorites</option>
            <option value="coding">Code Assistant</option>
            <option value="writing">Content Writer</option>
            <option value="business">Business Strategist</option>
            <option value="marketing">Marketing Expert</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="recent">Most Recent</option>
            <option value="usage">Most Used</option>
            <option value="favorites">Favorites First</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Total Prompts</p>
                <p className="text-2xl font-bold">{state.savedPrompts.length}</p>
              </div>
              <Star className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Usage</p>
                <p className="text-2xl font-bold">{state.analytics.totalUsage}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100">Favorites</p>
                <p className="text-2xl font-bol\
