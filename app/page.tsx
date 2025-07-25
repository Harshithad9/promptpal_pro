"use client"

import { useState } from "react"
import { PromptProvider } from "@/contexts/prompt-context"
import { Header } from "@/components/header"
import { CategoryGrid } from "@/components/category-grid"
import { PromptWorkspace } from "@/components/prompt-workspace"
import { SavedPrompts } from "@/components/saved-prompts"
import { Analytics } from "@/components/analytics"
import { Settings } from "@/components/settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <PromptProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8 bg-white/80 backdrop-blur-sm">
              <TabsTrigger
                value="generate"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
              >
                Generate
              </TabsTrigger>
              <TabsTrigger
                value="saved"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
              >
                Library
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="space-y-8">
              {!selectedCategory ? (
                <CategoryGrid onCategorySelect={setSelectedCategory} />
              ) : (
                <PromptWorkspace categoryId={selectedCategory} onBack={() => setSelectedCategory(null)} />
              )}
            </TabsContent>

            <TabsContent value="saved">
              <SavedPrompts />
            </TabsContent>

            <TabsContent value="analytics">
              <Analytics />
            </TabsContent>

            <TabsContent value="settings">
              <Settings />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </PromptProvider>
  )
}
