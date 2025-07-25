"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export function Analytics() {
  return (
    <Card className="mx-auto max-w-xl bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Usage Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center py-12 text-gray-600">
        <p className="text-lg">Analytics dashboard coming soon 🚀</p>
        <p className="text-sm mt-2">Track prompt usage, favorites, and more once this feature is fully implemented.</p>
      </CardContent>
    </Card>
  )
}
