"use client"

import { usePromptContext } from "@/contexts/prompt-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Cog } from "lucide-react"

export function Settings() {
  const {
    state: {
      settings: { autoSave, showAnalytics },
    },
    dispatch,
  } = usePromptContext()

  return (
    <Card className="mx-auto max-w-xl bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cog className="h-5 w-5" />
          App Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Auto-save toggle */}
        <div className="flex items-center justify-between">
          <Label htmlFor="autosave" className="text-gray-700">
            Auto-save data to localStorage
          </Label>
          <Switch
            id="autosave"
            checked={autoSave}
            onCheckedChange={(value) => dispatch({ type: "UPDATE_SETTINGS", payload: { autoSave: value } })}
          />
        </div>

        {/* Analytics toggle */}
        <div className="flex items-center justify-between">
          <Label htmlFor="analytics" className="text-gray-700">
            Show analytics tab
          </Label>
          <Switch
            id="analytics"
            checked={showAnalytics}
            onCheckedChange={(value) => dispatch({ type: "UPDATE_SETTINGS", payload: { showAnalytics: value } })}
          />
        </div>
      </CardContent>
    </Card>
  )
}
