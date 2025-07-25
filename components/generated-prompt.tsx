"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Save, ExternalLink, Check } from "lucide-react"
import { savePrompt } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"

interface GeneratedPromptProps {
  prompt: string
  category: string
  categoryTitle: string
}

export function GeneratedPrompt({ prompt, category, categoryTitle }: GeneratedPromptProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
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
    const saved = savePrompt({
      id: Date.now().toString(),
      prompt,
      category,
      categoryTitle,
      createdAt: new Date().toISOString(),
    })

    if (saved) {
      toast({
        title: "Saved!",
        description: "Prompt saved to your collection",
      })
    } else {
      toast({
        title: "Already saved",
        description: "This prompt is already in your collection",
        variant: "destructive",
      })
    }
  }

  const handleTryInChatGPT = () => {
    const encodedPrompt = encodeURIComponent(prompt)
    window.open(`https://chat.openai.com/?q=${encodedPrompt}`, "_blank")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Prompt</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea value={prompt} readOnly className="min-h-[200px] resize-none" />

        <div className="flex flex-col sm:flex-row gap-2">
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

          <Button onClick={handleTryInChatGPT} className="flex-1">
            <ExternalLink className="mr-2 h-4 w-4" />
            Try in ChatGPT
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
