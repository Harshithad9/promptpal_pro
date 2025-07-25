"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Badge } from "./ui/badge"
import { SettingsIcon, Download, Upload, Trash2, RefreshCw, HelpCircle } from "lucide-react"
import { usePromptContext } from "../contexts/prompt-context"
import { useToast } from "../hooks/use-toast"

export function Settings() {
  const { state, dispatch } = usePromptContext()
  const { toast } = useToast()
  const [exportFormat, setExportFormat] = useState("json")

  const handleExportData = () => {
    const data = {
      savedPrompts: state.savedPrompts || [],
      analytics: state.analytics || {},
      exportDate: new Date().toISOString(),
      version: "1.0",
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `promptpal-backup-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Data Exported",
      description: "Your data has been downloaded successfully",
    })
  }

  const handleImportData = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result)

        if (data.savedPrompts) {
          dispatch({ type: "IMPORT_PROMPTS", payload: data.savedPrompts })
        }
        if (data.analytics) {
          dispatch({ type: "IMPORT_ANALYTICS", payload: data.analytics })
        }

        toast({
          title: "Data Imported",
          description: "Your data has been imported successfully",
        })
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "Invalid file format or corrupted data",
          variant: "destructive",
        })
      }
    }
    reader.readAsText(file)
  }

  const handleClearAllData = () => {
    if (window.confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      dispatch({ type: "CLEAR_ALL_DATA" })
      toast({
        title: "Data Cleared",
        description: "All your data has been cleared",
      })
    }
  }

  const handleResetInstructions = () => {
    localStorage.removeItem("promptpal-instructions-seen")
    toast({
      title: "Instructions Reset",
      description: "Welcome message will show on next page load",
    })
  }

  const savedPrompts = state.savedPrompts || []
  const totalPrompts = savedPrompts.length
  const favoritePrompts = savedPrompts.filter((p) => p.isFavorite).length
  const totalGenerated = state.analytics?.totalGenerated || 0

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h2>
        <p className="text-base sm:text-lg text-gray-600">Manage your preferences and data</p>
      </div>

      {/* Account Overview */}
      <Card className="bg-white/80 backdrop-blur-sm border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-purple-600" />
            Account Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{totalGenerated}</div>
              <div className="text-sm text-gray-600">Prompts Generated</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{totalPrompts}</div>
              <div className="text-sm text-gray-600">Prompts Saved</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg col-span-2 sm:col-span-1">
              <div className="text-2xl font-bold text-red-600">{favoritePrompts}</div>
              <div className="text-sm text-gray-600">Favorites</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="bg-white/80 backdrop-blur-sm border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-blue-600" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Export Data */}
          <div className="space-y-3">
            <h3 className="font-semibold text-base sm:text-lg">Export Your Data</h3>
            <p className="text-sm text-gray-600">Download a backup of all your prompts and settings</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleExportData}
                className="bg-blue-600 hover:bg-blue-700 text-white touch-manipulation h-12 sm:h-auto"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Data (JSON)
              </Button>
              <Badge variant="secondary" className="self-start">
                {totalPrompts} prompts ready for export
              </Badge>
            </div>
          </div>

          {/* Import Data */}
          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-semibold text-base sm:text-lg">Import Data</h3>
            <p className="text-sm text-gray-600">Restore your data from a previous backup</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Label htmlFor="import-file" className="cursor-pointer">
                <div className="inline-flex items-center px-4 py-2 sm:py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors touch-manipulation h-12 sm:h-auto">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File to Import
                </div>
                <Input id="import-file" type="file" accept=".json" onChange={handleImportData} className="hidden" />
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Settings */}
      <Card className="bg-white/80 backdrop-blur-sm border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-gray-600" />
            App Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Reset Instructions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">Welcome Instructions</h3>
              <p className="text-sm text-gray-600">Show the welcome message again on next visit</p>
            </div>
            <Button
              variant="outline"
              onClick={handleResetInstructions}
              className="bg-transparent touch-manipulation h-12 sm:h-auto"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Instructions
            </Button>
          </div>

          {/* Help & Support */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">Help & Support</h3>
              <p className="text-sm text-gray-600">Get help with using PromptPal Pro</p>
            </div>
            <Button
              variant="outline"
              onClick={() => window.open("mailto:support@promptpal.pro", "_blank")}
              className="bg-transparent touch-manipulation h-12 sm:h-auto"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-white/80 backdrop-blur-sm border-2 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-800 mb-2">Clear All Data</h3>
              <p className="text-sm text-red-700 mb-4">
                This will permanently delete all your saved prompts, favorites, and analytics. This action cannot be
                undone.
              </p>
              <Button variant="destructive" onClick={handleClearAllData} className="touch-manipulation h-12 sm:h-auto">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card className="bg-white/80 backdrop-blur-sm border-2">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PP</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                PROMPTPAL PRO
              </span>
            </div>
            <p className="text-sm text-gray-600">Version 1.0.0</p>
            <p className="text-xs text-gray-500">Made with ❤️ for AI enthusiasts</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
