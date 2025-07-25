"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Clock, Target } from "lucide-react"

interface PromptPreviewProps {
  categoryId: string
  formData: Record<string, string>
}

export function PromptPreview({ categoryId, formData }: PromptPreviewProps) {
  const getPreviewData = () => {
    const filledFields = Object.keys(formData).filter((key) => formData[key]?.trim())
    const completeness = Math.round((filledFields.length / Math.max(Object.keys(formData).length, 1)) * 100)

    return {
      completeness,
      estimatedLength: Math.max(200, filledFields.length * 50),
      complexity: filledFields.length > 3 ? "Advanced" : filledFields.length > 1 ? "Intermediate" : "Basic",
    }
  }

  const { completeness, estimatedLength, complexity } = getPreviewData()

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-800">
          <Eye className="h-5 w-5" />
          Prompt Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{completeness}%</div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{estimatedLength}</div>
            <div className="text-sm text-gray-600">Est. Words</div>
          </div>
          <div className="text-center">
            <Badge variant="outline" className="text-sm">
              {complexity}
            </Badge>
            <div className="text-sm text-gray-600 mt-1">Complexity</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Target className="h-4 w-4" />
            <span>Optimization Tips:</span>
          </div>
          <ul className="text-sm text-gray-600 space-y-1 ml-6">
            {completeness < 50 && <li>• Fill in more fields for a more detailed prompt</li>}
            {!formData.description && <li>• Add a detailed description for better results</li>}
            {completeness >= 80 && <li>• Great! Your prompt will be highly detailed and specific</li>}
          </ul>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Estimated generation time: 2-3 seconds</span>
        </div>
      </CardContent>
    </Card>
  )
}
