"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { ArrowLeft, Copy, Save, ExternalLink, Check, Sparkles } from "lucide-react"
import { PromptForm } from "./prompt-form"
import { usePromptContext } from "../contexts/prompt-context"
import { useToast } from "../hooks/use-toast"

const categories = [
  {
    id: "portfolio-builder",
    title: "Portfolio Builder",
    description: "Create stunning developer/designer portfolios, showcase projects effectively",
    icon: "🎨",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "photo-generation",
    title: "AI Photo Generator",
    description: "Create stunning images with detailed prompts for Midjourney, DALL-E, Stable Diffusion",
    icon: "📸",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: "resume-builder",
    title: "Resume & CV Builder",
    description: "Professional resume content, cover letters, LinkedIn optimization",
    icon: "📄",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    id: "coding",
    title: "Code Assistant",
    description: "Programming help, debugging, code reviews, and optimization",
    icon: "💻",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "startup-advisor",
    title: "Startup Advisor",
    description: "Pitch decks, investor presentations, startup strategy and funding guidance",
    icon: "🚀",
    gradient: "from-red-500 to-pink-500",
  },
  {
    id: "social-media",
    title: "Social Media Manager",
    description: "Viral content, Instagram captions, TikTok scripts, Twitter threads",
    icon: "📱",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    id: "writing",
    title: "Content Writer",
    description: "Blog posts, articles, copywriting, and creative content",
    icon: "✍️",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "business",
    title: "Business Strategist",
    description: "Business plans, market analysis, and strategic planning",
    icon: "💼",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "marketing",
    title: "Marketing Expert",
    description: "Social media, ads, email campaigns, and brand strategy",
    icon: "📈",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "education",
    title: "Learning Coach",
    description: "Lesson plans, study guides, and educational content",
    icon: "🎓",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "productivity",
    title: "Productivity Guru",
    description: "Workflow optimization, time management, and efficiency",
    icon: "⚡",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: "ai-automation",
    title: "AI Automation Expert",
    description: "Workflow automation, AI tools integration, process optimization",
    icon: "🤖",
    gradient: "from-cyan-500 to-blue-500",
  },
]

export function PromptWorkspace({ categoryId, onBack }) {
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const [copied, setCopied] = useState(false)
  const { dispatch } = usePromptContext()
  const { toast } = useToast()

  const category = categories.find((cat) => cat.id === categoryId)

  const handleGenerate = (prompt) => {
    setGeneratedPrompt(prompt)

    // Save to context
    const promptData = {
      id: Date.now().toString(),
      category: categoryId,
      title: `${category?.title || "Generated"} Prompt`,
      content: prompt,
      createdAt: new Date().toISOString(),
      isFavorite: false,
      usageCount: 0,
    }

    dispatch({ type: "SAVE_PROMPT", payload: promptData })

    // Update analytics
    dispatch({
      type: "UPDATE_ANALYTICS",
      payload: {
        totalGenerated: 1,
        categoryUsed: categoryId,
      },
    })

    toast({
      title: "Prompt Generated!",
      description: "Your optimized prompt is ready to use",
    })
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy prompt",
        variant: "destructive",
      })
    }
  }

  const handleSave = () => {
    if (!generatedPrompt) return

    const promptData = {
      id: Date.now().toString(),
      prompt: generatedPrompt,
      category: categoryId,
      categoryTitle: category?.title || "",
      tags: [categoryId],
      isFavorite: true, // Mark as favorite when manually saved
      usageCount: 0,
      createdAt: new Date().toISOString(),
    }

    dispatch({ type: "SAVE_PROMPT", payload: promptData })
    toast({
      title: "Saved!",
      description: "Prompt saved to your library",
    })
  }

  const handleTryInChatGPT = () => {
    if (!generatedPrompt) return

    dispatch({ type: "UPDATE_USAGE", payload: Date.now().toString() })
    const encodedPrompt = encodeURIComponent(generatedPrompt)
    window.open(`https://chat.openai.com/?q=${encodedPrompt}`, "_blank")
  }

  if (!category) return null

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 touch-manipulation -ml-2 sm:ml-0">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to Categories</span>
          <span className="sm:hidden">Back</span>
        </Button>

        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center text-xl sm:text-2xl shadow-lg flex-shrink-0`}
          >
            {category.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{category.title}</h1>
            <p className="text-sm sm:text-base text-gray-600 line-clamp-2 sm:line-clamp-1">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {/* Form Section */}
        <div className="space-y-4 sm:space-y-6 order-1">
          <PromptForm categoryId={categoryId} onGenerate={handleGenerate} />
        </div>

        {/* Generated Prompt Section */}
        <div className="space-y-4 sm:space-y-6 order-2 lg:order-2">
          {generatedPrompt && (
            <Card className="bg-white/80 backdrop-blur-sm border-2">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                  Generated Prompt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <Textarea
                  value={generatedPrompt}
                  readOnly
                  className="min-h-[200px] sm:min-h-[300px] resize-none bg-gray-50 font-mono text-xs sm:text-sm touch-manipulation"
                />

                <div className="flex flex-col gap-2 sm:gap-3">
                  <div className="grid grid-cols-2 gap-2 sm:hidden">
                    <Button onClick={handleCopy} variant="outline" className="bg-transparent touch-manipulation h-12">
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>

                    <Button onClick={handleSave} variant="outline" className="bg-transparent touch-manipulation h-12">
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  </div>

                  <Button
                    onClick={handleTryInChatGPT}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 touch-manipulation h-12 sm:h-10"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Try in ChatGPT
                  </Button>

                  {/* Desktop buttons */}
                  <div className="hidden sm:flex sm:flex-row gap-3">
                    <Button onClick={handleCopy} variant="outline" className="flex-1 bg-transparent">
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>

                    <Button onClick={handleSave} variant="outline" className="flex-1 bg-transparent">
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!generatedPrompt && (
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-dashed">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">✨</div>
                <h3 className="text-lg font-semibold mb-2">Your Generated Prompt Will Appear Here</h3>
                <p className="text-gray-600">Fill out the form and click "Generate Optimized Prompt" to get started</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
