export interface SavedPrompt {
  id: string
  prompt: string
  category: string
  categoryTitle: string
  createdAt: string
}

const STORAGE_KEY = "promptpal_saved_prompts"

export function getSavedPrompts(): SavedPrompt[] {
  if (typeof window === "undefined") return []

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error("Error loading saved prompts:", error)
    return []
  }
}

export function savePrompt(prompt: SavedPrompt): boolean {
  if (typeof window === "undefined") return false

  try {
    const existing = getSavedPrompts()

    // Check if prompt already exists (by content)
    const isDuplicate = existing.some((p) => p.prompt === prompt.prompt)
    if (isDuplicate) return false

    const updated = [prompt, ...existing]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return true
  } catch (error) {
    console.error("Error saving prompt:", error)
    return false
  }
}

export function deletePrompt(id: string): void {
  if (typeof window === "undefined") return

  try {
    const existing = getSavedPrompts()
    const filtered = existing.filter((p) => p.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error("Error deleting prompt:", error)
  }
}
