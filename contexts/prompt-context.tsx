"use client"

import type React from "react"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

export interface SavedPrompt {
  id: string
  prompt: string
  category: string
  categoryTitle: string
  tags: string[]
  isFavorite: boolean
  usageCount: number
  createdAt: string
  lastUsed?: string
  customTitle?: string
}

export interface PromptTemplate {
  id: string
  name: string
  category: string
  template: string
  variables: string[]
  description: string
}

export interface AnalyticsData {
  totalPrompts: number
  totalUsage: number
  categoriesUsed: Record<string, number>
  dailyUsage: Record<string, number>
  favoritePrompts: number
}

interface PromptState {
  savedPrompts: SavedPrompt[]
  templates: PromptTemplate[]
  analytics: AnalyticsData
  settings: {
    theme: "light" | "dark"
    autoSave: boolean
    showAnalytics: boolean
  }
}

type PromptAction =
  | { type: "SAVE_PROMPT"; payload: SavedPrompt }
  | { type: "DELETE_PROMPT"; payload: string }
  | { type: "TOGGLE_FAVORITE"; payload: string }
  | { type: "UPDATE_USAGE"; payload: string }
  | { type: "UPDATE_SETTINGS"; payload: Partial<PromptState["settings"]> }
  | { type: "LOAD_DATA"; payload: PromptState }

const initialState: PromptState = {
  savedPrompts: [],
  templates: [],
  analytics: {
    totalPrompts: 0,
    totalUsage: 0,
    categoriesUsed: {},
    dailyUsage: {},
    favoritePrompts: 0,
  },
  settings: {
    theme: "light",
    autoSave: true,
    showAnalytics: true,
  },
}

function promptReducer(state: PromptState, action: PromptAction): PromptState {
  switch (action.type) {
    case "SAVE_PROMPT":
      const newPrompts = [action.payload, ...state.savedPrompts]
      return {
        ...state,
        savedPrompts: newPrompts,
        analytics: {
          ...state.analytics,
          totalPrompts: newPrompts.length,
          categoriesUsed: {
            ...state.analytics.categoriesUsed,
            [action.payload.category]: (state.analytics.categoriesUsed[action.payload.category] || 0) + 1,
          },
        },
      }

    case "DELETE_PROMPT":
      const filteredPrompts = state.savedPrompts.filter((p) => p.id !== action.payload)
      return {
        ...state,
        savedPrompts: filteredPrompts,
        analytics: {
          ...state.analytics,
          totalPrompts: filteredPrompts.length,
        },
      }

    case "TOGGLE_FAVORITE":
      const updatedPrompts = state.savedPrompts.map((p) =>
        p.id === action.payload ? { ...p, isFavorite: !p.isFavorite } : p,
      )
      return {
        ...state,
        savedPrompts: updatedPrompts,
        analytics: {
          ...state.analytics,
          favoritePrompts: updatedPrompts.filter((p) => p.isFavorite).length,
        },
      }

    case "UPDATE_USAGE":
      const today = new Date().toISOString().split("T")[0]
      return {
        ...state,
        savedPrompts: state.savedPrompts.map((p) =>
          p.id === action.payload ? { ...p, usageCount: p.usageCount + 1, lastUsed: new Date().toISOString() } : p,
        ),
        analytics: {
          ...state.analytics,
          totalUsage: state.analytics.totalUsage + 1,
          dailyUsage: {
            ...state.analytics.dailyUsage,
            [today]: (state.analytics.dailyUsage[today] || 0) + 1,
          },
        },
      }

    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      }

    case "LOAD_DATA":
      return action.payload

    default:
      return state
  }
}

const PromptContext = createContext<{
  state: PromptState
  dispatch: React.Dispatch<PromptAction>
} | null>(null)

export function PromptProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(promptReducer, initialState)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("promptpal-pro-data")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        dispatch({ type: "LOAD_DATA", payload: parsedData })
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (state.settings.autoSave) {
      localStorage.setItem("promptpal-pro-data", JSON.stringify(state))
    }
  }, [state])

  return <PromptContext.Provider value={{ state, dispatch }}>{children}</PromptContext.Provider>
}

export function usePromptContext() {
  const context = useContext(PromptContext)
  if (!context) {
    throw new Error("usePromptContext must be used within a PromptProvider")
  }
  return context
}
