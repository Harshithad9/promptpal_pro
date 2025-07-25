"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Eye, Clock, Target } from "lucide-react"

export function PromptPreview({ categoryId, formData }) {
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
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex items-center gap-2 text-purple-800 text-base sm:text-lg">
          <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
          Prompt Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 pt-0">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-purple-600">{completeness}%</div>
            <div className="text-xs sm:text-sm text-gray-600">Complete</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">{estimatedLength}</div>
            <div className="text-xs sm:text-sm text-gray-600">Est. Words</div>
          </div>
          <div className="text-center">
            <Badge variant="outline" className="text-xs sm:text-sm mb-1">
              {complexity}
            </Badge>
            <div className="text-xs sm:text-sm text-gray-600">Complexity</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <Target className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Optimization Tips:</span>
          </div>
          <ul className="text-xs sm:text-sm text-gray-600 space-y-1 ml-4 sm:ml-6">
            {completeness < 50 && <li>• Fill in more fields for a more detailed prompt</li>}
            {!formData.description && <li>• Add a detailed description for better results</li>}
            {completeness >= 80 && <li>• Great! Your prompt will be highly detailed and specific</li>}
          </ul>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>Estimated generation time: 2-3 seconds</span>
        </div>
      </CardContent>
    </Card>
  )
}
