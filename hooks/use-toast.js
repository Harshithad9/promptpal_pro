"use client"

import { useState, useCallback } from "react"

export function useToast() {
  const [toasts, setToasts] = useState([])

  const toast = useCallback(({ title, description, variant = "default" }) => {
    const id = Date.now().toString()
    const newToast = { id, title, description, variant }

    setToasts((prev) => [...prev, newToast])

    // Show browser notification as fallback
    if (title && description) {
      // Create a simple toast notification
      const toastElement = document.createElement("div")
      toastElement.className = `fixed top-4 right-4 z-50 bg-white border rounded-lg shadow-lg p-4 max-w-sm ${
        variant === "destructive" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"
      }`
      toastElement.innerHTML = `
        <div class="flex items-start gap-3">
          <div class="flex-1">
            <p class="font-medium text-gray-900">${title}</p>
            <p class="text-sm text-gray-600">${description}</p>
          </div>
        </div>
      `

      document.body.appendChild(toastElement)

      // Remove after 3 seconds
      setTimeout(() => {
        if (toastElement.parentNode) {
          toastElement.parentNode.removeChild(toastElement)
        }
      }, 3000)
    }

    // Auto remove from state after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  return { toast, toasts }
}
