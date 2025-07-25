"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { X, Sparkles, Zap, BookOpen, TrendingUp, Target, ArrowRight } from "lucide-react"

export function InstructionModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has seen the instructions before
    const hasSeenInstructions = localStorage.getItem("promptpal-instructions-seen")
    if (!hasSeenInstructions) {
      setIsOpen(true)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("promptpal-instructions-seen", "true")
  }

  if (!isOpen) return null

  const steps = [
    {
      icon: "🎯",
      title: "Choose Category",
      description: "Select from 12 specialized AI assistants",
    },
    {
      icon: "📝",
      title: "Fill Details",
      description: "Complete the customized form fields",
    },
    {
      icon: "✨",
      title: "Generate Prompt",
      description: "Get your optimized AI prompt instantly",
    },
    {
      icon: "📋",
      title: "Copy & Use",
      description: "Copy to clipboard and use in any AI tool",
    },
    {
      icon: "💾",
      title: "Save & Track",
      description: "Save favorites and monitor analytics",
    },
  ]

  const usageInstructions = [
    {
      step: "1",
      title: "Select Your Category",
      description: "Browse through 12 specialized categories and click on the one that matches your needs",
      example: "Need a portfolio? Click 'Portfolio Builder'. Want to create images? Choose 'AI Photo Generator'",
    },
    {
      step: "2",
      title: "Fill Out the Form",
      description: "Complete the detailed form with your specific requirements and preferences",
      example: "For Portfolio Builder: Enter your profession, skills, projects, and desired style",
    },
    {
      step: "3",
      title: "Generate Your Prompt",
      description: "Click the 'Generate Optimized Prompt' button and wait for your custom prompt",
      example: "The AI will create a detailed, professional prompt tailored to your inputs",
    },
    {
      step: "4",
      title: "Copy and Use",
      description: "Copy the generated prompt and paste it into ChatGPT, Claude, or any AI tool",
      example: "Paste into ChatGPT and get amazing results based on your customized prompt",
    },
    {
      step: "5",
      title: "Save and Manage",
      description: "Save your best prompts, track usage analytics, and build your prompt library",
      example: "Star your favorites, export your data, and see which categories you use most",
    },
  ]

  const proTips = [
    "Be specific in your inputs for better prompts",
    "Save successful prompts to build your library",
    "Use analytics to track your most effective categories",
    "Export your data to backup your prompt collection",
  ]

  const featuredCategories = [
    { name: "Portfolio Builder", icon: "🎨", badge: "NEW", color: "bg-green-100 text-green-700" },
    { name: "AI Photo Generator", icon: "📸", badge: "HOT", color: "bg-red-100 text-red-700" },
    { name: "Startup Advisor", icon: "🚀", badge: "NEW", color: "bg-green-100 text-green-700" },
    { name: "Social Media Manager", icon: "📱", badge: "HOT", color: "bg-red-100 text-red-700" },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
        <CardHeader className="relative text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl sm:text-3xl font-bold">Welcome to PromptPal Pro</CardTitle>
              <p className="text-purple-100 mt-1">Your AI Prompt Engineering Assistant</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-8">
          {/* What is PromptPal Pro */}
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">What is PromptPal Pro?</h3>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              PromptPal Pro is a specialized tool that helps you create optimized, professional prompts for AI tools
              like ChatGPT, Claude, and Gemini. Instead of struggling with generic prompts, get customized, expert-level
              prompts tailored to your specific needs across 12 different categories.
            </p>
          </div>

          {/* Detailed Usage Instructions */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 text-center flex items-center justify-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              How to Use PromptPal Pro - Step by Step
            </h3>

            <div className="space-y-4">
              {usageInstructions.map((instruction, index) => (
                <Card key={index} className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-white">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {instruction.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2 text-gray-900">{instruction.title}</h4>
                        <p className="text-gray-700 mb-2">{instruction.description}</p>
                        <div className="bg-blue-50 border-l-4 border-l-blue-400 p-3 rounded">
                          <p className="text-sm text-blue-800">
                            <strong>Example:</strong> {instruction.example}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Overview Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 text-center">Quick Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <Card
                  key={index}
                  className="text-center p-4 border-2 border-gray-100 hover:border-purple-200 transition-colors"
                >
                  <div className="text-3xl mb-2">{step.icon}</div>
                  <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-gray-600 leading-tight">{step.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Pro Tips for Better Results
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {proTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 text-center flex items-center justify-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              Featured Categories
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {featuredCategories.map((category, index) => (
                <Card key={index} className="text-center p-3 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-1">{category.icon}</div>
                  <h4 className="font-medium text-xs mb-1">{category.name}</h4>
                  <Badge variant="secondary" className={`text-xs px-2 py-0.5 ${category.color}`}>
                    {category.badge}
                  </Badge>
                </Card>
              ))}
            </div>
          </div>

          {/* Get Started Button */}
          <div className="text-center pt-4">
            <Button
              onClick={handleClose}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto"
            >
              <BookOpen className="h-5 w-5" />
              Get Started Now
            </Button>
            <p className="text-xs text-gray-500 mt-2">This message won't appear again</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
