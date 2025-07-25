"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

const initialState = {
  savedPrompts: [],
  templates: [],
  analytics: {
    totalPrompts: 0,
    totalUsage: 0,
    totalGenerated: 0,
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

function promptReducer(state, action) {
  switch (action.type) {
    case "SAVE_PROMPT":
      // Check for duplicates
      const isDuplicate = state.savedPrompts.some((p) => p.content === action.payload.content)
      if (isDuplicate) return state

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
          p.id === action.payload
            ? { ...p, usageCount: (p.usageCount || 0) + 1, lastUsed: new Date().toISOString() }
            : p,
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

    case "UPDATE_ANALYTICS":
      return {
        ...state,
        analytics: {
          ...state.analytics,
          totalGenerated: (state.analytics.totalGenerated || 0) + (action.payload.totalGenerated || 0),
          categoriesUsed: {
            ...state.analytics.categoriesUsed,
            [action.payload.categoryUsed]: (state.analytics.categoriesUsed[action.payload.categoryUsed] || 0) + 1,
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

    case "CLEAR_ALL_DATA":
      return initialState

    case "IMPORT_PROMPTS":
      return {
        ...state,
        savedPrompts: [...action.payload, ...state.savedPrompts],
      }

    case "IMPORT_ANALYTICS":
      return {
        ...state,
        analytics: { ...state.analytics, ...action.payload },
      }

    default:
      return state
  }
}

const PromptContext = createContext(null)

export function PromptProvider({ children }) {
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
