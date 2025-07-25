"use client"

import { useState } from "react"
import { PromptProvider } from "../contexts/prompt-context"
import { Header } from "../components/header"
import { CategoryGrid } from "../components/category-grid"
import { PromptWorkspace } from "../components/prompt-workspace"
import { SavedPrompts } from "../components/saved-prompts"
import { Analytics } from "../components/analytics"
import { Settings } from "../components/settings"
import { Footer } from "../components/footer"
import { InstructionModal } from "../components/instruction-modal"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [activeTab, setActiveTab] = useState("generate")

  const tabs = [
    { id: "generate", label: "Generate", icon: "🎯" },
    { id: "saved", label: "Library", icon: "📚" },
    { id: "analytics", label: "Analytics", icon: "📊" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ]

  return (
    <PromptProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
        <InstructionModal />
        <Header />

        <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 flex-1">
          <div className="w-full">
            {/* Custom Tab Navigation */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-lg p-1 shadow-lg border border-gray-200/50 w-full max-w-2xl">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      if (tab.id !== "generate") {
                        setSelectedCategory(null)
                      }
                    }}
                    className={`
                      flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 rounded-md font-medium transition-all duration-200 flex-1 text-sm sm:text-base touch-manipulation
                      ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                      }
                    `}
                  >
                    <span className="text-xs sm:text-sm">{tab.icon}</span>
                    <span className="hidden xs:inline sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "generate" && (
              <div className="space-y-6 sm:space-y-8">
                {!selectedCategory ? (
                  <CategoryGrid onCategorySelect={setSelectedCategory} />
                ) : (
                  <PromptWorkspace categoryId={selectedCategory} onBack={() => setSelectedCategory(null)} />
                )}
              </div>
            )}

            {activeTab === "saved" && <SavedPrompts />}
            {activeTab === "analytics" && <Analytics />}
            {activeTab === "settings" && <Settings />}
          </div>
        </main>

        <Footer />
      </div>
    </PromptProvider>
  )
}
