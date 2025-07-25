// Categories data
const categories = [
  {
    id: "coding",
    title: "Coding Help",
    description: "Get assistance with programming, debugging, and code optimization",
    icon: "💻",
    color: "bg-blue-500",
  },
  {
    id: "resume",
    title: "Resume Writing",
    description: "Create compelling resumes and cover letters",
    icon: "📄",
    color: "bg-green-500",
  },
  {
    id: "social-media",
    title: "Social Media",
    description: "Generate engaging posts and content for social platforms",
    icon: "📱",
    color: "bg-pink-500",
  },
  {
    id: "blogging",
    title: "Blogging",
    description: "Create blog posts, articles, and written content",
    icon: "✍️",
    color: "bg-purple-500",
  },
  {
    id: "marketing",
    title: "Marketing",
    description: "Develop marketing copy, ads, and promotional content",
    icon: "📈",
    color: "bg-orange-500",
  },
  {
    id: "creative",
    title: "Creative Writing",
    description: "Generate stories, poems, and creative content",
    icon: "🎨",
    color: "bg-indigo-500",
  },
  {
    id: "business",
    title: "Business",
    description: "Create business plans, proposals, and professional documents",
    icon: "💼",
    color: "bg-gray-600",
  },
  {
    id: "education",
    title: "Education",
    description: "Generate lesson plans, study guides, and educational content",
    icon: "🎓",
    color: "bg-teal-500",
  },
]

// Global state
let selectedCategory = null
let generatedPrompt = ""
let formData = {}

// DOM elements
const generateTab = document.getElementById("generate-tab")
const savedTab = document.getElementById("saved-tab")
const generateContent = document.getElementById("generate-content")
const savedContent = document.getElementById("saved-content")
const categorySelection = document.getElementById("category-selection")
const promptGeneration = document.getElementById("prompt-generation")
const categoriesGrid = document.getElementById("categories-grid")
const backButton = document.getElementById("back-button")
const promptForm = document.getElementById("prompt-form")
const generateButton = document.getElementById("generate-button")
const generatedPromptCard = document.getElementById("generated-prompt-card")
const generatedPromptText = document.getElementById("generated-prompt-text")
const copyButton = document.getElementById("copy-button")
const saveButton = document.getElementById("save-button")
const tryChatGPTButton = document.getElementById("try-chatgpt-button")
const savedPromptsContainer = document.getElementById("saved-prompts-container")
const noSavedPrompts = document.getElementById("no-saved-prompts")

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  initializeTabs()
  renderCategories()
  renderSavedPrompts()
  setupEventListeners()
})

// Tab functionality
function initializeTabs() {
  generateTab.addEventListener("click", () => switchTab("generate"))
  savedTab.addEventListener("click", () => switchTab("saved"))
}

function switchTab(tab) {
  if (tab === "generate") {
    generateTab.classList.add("active")
    savedTab.classList.remove("active")
    generateContent.classList.remove("hidden")
    savedContent.classList.add("hidden")
  } else {
    savedTab.classList.add("active")
    generateTab.classList.remove("active")
    savedContent.classList.remove("hidden")
    generateContent.classList.add("hidden")
    renderSavedPrompts()
  }
}

// Render categories
function renderCategories() {
  categoriesGrid.innerHTML = categories
    .map(
      (category) => `
        <div class="category-card bg-white rounded-lg border-2 shadow-sm cursor-pointer p-6 hover:border-purple-200" 
             onclick="selectCategory('${category.id}')">
            <div class="w-12 h-12 rounded-lg ${category.color} flex items-center justify-center text-white text-xl mb-4">
                ${category.icon}
            </div>
            <h3 class="text-lg font-semibold mb-2">${category.title}</h3>
            <p class="text-gray-600 text-sm">${category.description}</p>
        </div>
    `,
    )
    .join("")
}

// Category selection
function selectCategory(categoryId) {
  selectedCategory = categoryId
  const category = categories.find((cat) => cat.id === categoryId)

  // Update UI
  document.getElementById("selected-category-icon").className =
    `w-10 h-10 rounded-lg ${category.color} flex items-center justify-center text-white text-lg`
  document.getElementById("selected-category-icon").textContent = category.icon
  document.getElementById("selected-category-title").textContent = category.title
  document.getElementById("selected-category-description").textContent = category.description

  // Show prompt generation view
  categorySelection.classList.add("hidden")
  promptGeneration.classList.remove("hidden")

  // Render form
  renderForm(categoryId)

  // Reset form data and generated prompt
  formData = {}
  generatedPrompt = ""
  generatedPromptCard.classList.add("hidden")
}

// Back to categories
function backToCategories() {
  selectedCategory = null
  categorySelection.classList.remove("hidden")
  promptGeneration.classList.add("hidden")
  generatedPromptCard.classList.add("hidden")
}

// Render form based on category
function renderForm(category) {
  let formHTML = ""

  switch (category) {
    case "coding":
      formHTML = `
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Programming Language</label>
                    <select name="language" class="w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Select language</option>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                        <option value="react">React</option>
                        <option value="nodejs">Node.js</option>
                    </select>
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Problem Description</label>
                    <textarea name="problem" placeholder="Describe the coding problem or task..." class="w-full p-2 border border-gray-300 rounded-md h-24"></textarea>
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Skill Level</label>
                    <select name="level" class="w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Select level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
            `
      break

    case "resume":
      formHTML = `
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Target Job Title</label>
                    <input type="text" name="jobTitle" placeholder="e.g., Software Engineer, Marketing Manager" class="w-full p-2 border border-gray-300 rounded-md">
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Industry</label>
                    <input type="text" name="industry" placeholder="e.g., Technology, Healthcare, Finance" class="w-full p-2 border border-gray-300 rounded-md">
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Years of Experience</label>
                    <select name="experience" class="w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Select experience</option>
                        <option value="entry">Entry Level (0-2 years)</option>
                        <option value="mid">Mid Level (3-5 years)</option>
                        <option value="senior">Senior Level (6+ years)</option>
                    </select>
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Key Skills</label>
                    <input type="text" name="skills" placeholder="e.g., JavaScript, Project Management, Data Analysis" class="w-full p-2 border border-gray-300 rounded-md">
                </div>
            `
      break

    case "social-media":
      formHTML = `
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Platform</label>
                    <select name="platform" class="w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Select platform</option>
                        <option value="twitter">Twitter/X</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="instagram">Instagram</option>
                        <option value="facebook">Facebook</option>
                        <option value="tiktok">TikTok</option>
                    </select>
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Topic/Theme</label>
                    <input type="text" name="topic" placeholder="e.g., productivity tips, tech trends, lifestyle" class="w-full p-2 border border-gray-300 rounded-md">
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Tone</label>
                    <select name="tone" class="w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Select tone</option>
                        <option value="professional">Professional</option>
                        <option value="casual">Casual</option>
                        <option value="humorous">Humorous</option>
                        <option value="inspirational">Inspirational</option>
                    </select>
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Target Audience</label>
                    <input type="text" name="audience" placeholder="e.g., young professionals, entrepreneurs, students" class="w-full p-2 border border-gray-300 rounded-md">
                </div>
            `
      break

    case "blogging":
      formHTML = `
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Blog Topic</label>
                    <input type="text" name="topic" placeholder="e.g., sustainable living, AI trends, travel tips" class="w-full p-2 border border-gray-300 rounded-md">
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Keywords</label>
                    <input type="text" name="keywords" placeholder="e.g., SEO, optimization, content marketing" class="w-full p-2 border border-gray-300 rounded-md">
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Article Length</label>
                    <select name="length" class="w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Select length</option>
                        <option value="short">Short (500-800 words)</option>
                        <option value="medium">Medium (800-1500 words)</option>
                        <option value="long">Long (1500+ words)</option>
                    </select>
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Writing Style</label>
                    <select name="style" class="w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Select style</option>
                        <option value="informative">Informative</option>
                        <option value="conversational">Conversational</option>
                        <option value="academic">Academic</option>
                        <option value="storytelling">Storytelling</option>
                    </select>
                </div>
            `
      break

    default:
      formHTML = `
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Topic</label>
                    <input type="text" name="topic" placeholder="Enter your topic..." class="w-full p-2 border border-gray-300 rounded-md">
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Tone</label>
                    <select name="tone" class="w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Select tone</option>
                        <option value="professional">Professional</option>
                        <option value="casual">Casual</option>
                        <option value="formal">Formal</option>
                        <option value="creative">Creative</option>
                    </select>
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Keywords</label>
                    <input type="text" name="keywords" placeholder="Enter relevant keywords..." class="w-full p-2 border border-gray-300 rounded-md">
                </div>
            `
  }

  promptForm.innerHTML = formHTML

  // Add event listeners to form inputs
  const inputs = promptForm.querySelectorAll("input, select, textarea")
  inputs.forEach((input) => {
    input.addEventListener("change", updateFormData)
    input.addEventListener("input", updateFormData)
  })
}

// Update form data
function updateFormData(event) {
  formData[event.target.name] = event.target.value
}

// Generate prompt
async function generatePrompt() {
  const button = generateButton
  const originalHTML = button.innerHTML

  // Show loading state
  button.innerHTML = `
        <svg class="h-4 w-4 loading-spinner" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg>
        Generating...
    `
  button.disabled = true

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generate prompt based on category and form data
  generatedPrompt = createPrompt(selectedCategory, formData)

  // Show generated prompt
  generatedPromptText.value = generatedPrompt
  generatedPromptCard.classList.remove("hidden")

  // Reset button
  button.innerHTML = originalHTML
  button.disabled = false
}

// Create prompt based on category and form data
function createPrompt(category, data) {
  switch (category) {
    case "coding":
      return `You are an expert ${data.language || "programming"} developer. I need help with the following coding task:

Problem: ${data.problem || "Not specified"}
Skill Level: ${data.level || "intermediate"}
Programming Language: ${data.language || "any suitable language"}

Please provide:
1. A clear, well-commented solution
2. Explanation of the approach and logic
3. Best practices and optimization tips
4. Alternative approaches if applicable
5. Common pitfalls to avoid

Make sure the code is production-ready and follows industry standards.`

    case "resume":
      return `You are a professional career coach and resume expert. Help me create a compelling resume for the following position:

Job Title: ${data.jobTitle || "Not specified"}
Industry: ${data.industry || "Not specified"}
Experience Level: ${data.experience || "Not specified"}
Key Skills: ${data.skills || "Not specified"}

Please provide:
1. A professional summary that highlights my strengths
2. Optimized work experience descriptions with quantifiable achievements
3. Skills section tailored to the target role
4. Industry-specific keywords for ATS optimization
5. Formatting and structure recommendations
6. Tips for customizing the resume for specific job applications

Focus on making the resume stand out while maintaining professionalism and relevance to the target position.`

    case "social-media":
      return `You are a social media marketing expert specializing in ${data.platform || "various platforms"}. Create engaging content for:

Platform: ${data.platform || "Not specified"}
Topic/Theme: ${data.topic || "Not specified"}
Tone: ${data.tone || "professional"}
Target Audience: ${data.audience || "general audience"}

Please provide:
1. ${data.platform === "twitter" ? "3-5 tweet variations" : "Multiple post variations"}
2. Relevant hashtags for maximum reach
3. Engagement strategies (questions, calls-to-action)
4. Visual content suggestions
5. Best posting times and frequency recommendations
6. Platform-specific optimization tips

Make the content authentic, engaging, and aligned with current trends while maintaining the specified tone.`

    case "blogging":
      return `You are a professional content writer and SEO expert. Help me create a comprehensive blog post about:

Topic: ${data.topic || "Not specified"}
Target Keywords: ${data.keywords || "Not specified"}
Article Length: ${data.length || "medium"}
Writing Style: ${data.style || "informative"}

Please provide:
1. An attention-grabbing headline and 3-5 alternative titles
2. A detailed outline with H2 and H3 headings
3. An engaging introduction that hooks readers
4. Key points to cover in each section
5. SEO optimization suggestions (meta description, internal linking opportunities)
6. A compelling conclusion with call-to-action
7. Content promotion strategies

Ensure the content is valuable, well-researched, and optimized for both readers and search engines.`

    default:
      return `You are an expert assistant specializing in ${category}. Please help me with the following:

Topic: ${data.topic || "Not specified"}
Tone: ${data.tone || "professional"}
Keywords: ${data.keywords || "Not specified"}

Please provide comprehensive, well-structured, and actionable content that addresses the topic thoroughly. Include relevant examples, best practices, and practical tips where applicable.`
  }
}

// Copy to clipboard
async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(generatedPrompt)

    // Update button temporarily
    const originalHTML = copyButton.innerHTML
    copyButton.innerHTML = `
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Copied!
        `

    showToast("Copied!", "Prompt copied to clipboard")

    setTimeout(() => {
      copyButton.innerHTML = originalHTML
    }, 2000)
  } catch (err) {
    showToast("Error", "Failed to copy prompt", "error")
  }
}

// Save prompt
function savePrompt() {
  const category = categories.find((cat) => cat.id === selectedCategory)
  const promptData = {
    id: Date.now().toString(),
    prompt: generatedPrompt,
    category: selectedCategory,
    categoryTitle: category.title,
    createdAt: new Date().toISOString(),
  }

  // Get existing prompts
  const existingPrompts = JSON.parse(localStorage.getItem("promptpal_saved_prompts") || "[]")

  // Check for duplicates
  const isDuplicate = existingPrompts.some((p) => p.prompt === generatedPrompt)
  if (isDuplicate) {
    showToast("Already saved", "This prompt is already in your collection", "error")
    return
  }

  // Add new prompt
  existingPrompts.unshift(promptData)
  localStorage.setItem("promptpal_saved_prompts", JSON.stringify(existingPrompts))

  showToast("Saved!", "Prompt saved to your collection")
}

// Try in ChatGPT
function tryInChatGPT() {
  const encodedPrompt = encodeURIComponent(generatedPrompt)
  window.open(`https://chat.openai.com/?q=${encodedPrompt}`, "_blank")
}

// Render saved prompts
function renderSavedPrompts() {
  const savedPrompts = JSON.parse(localStorage.getItem("promptpal_saved_prompts") || "[]")

  if (savedPrompts.length === 0) {
    savedPromptsContainer.innerHTML = ""
    noSavedPrompts.classList.remove("hidden")
    return
  }

  noSavedPrompts.classList.add("hidden")
  savedPromptsContainer.innerHTML = savedPrompts
    .map(
      (prompt) => `
        <div class="bg-white rounded-lg border shadow-sm mb-6">
            <div class="p-6 border-b">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-800">
                            ${prompt.categoryTitle}
                        </span>
                        <span class="text-sm text-gray-500">${new Date(prompt.createdAt).toLocaleDateString()}</span>
                    </div>
                    <button onclick="deletePrompt('${prompt.id}')" class="text-red-500 hover:text-red-700 p-1">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="p-6 space-y-4">
                <textarea readonly class="w-full min-h-[120px] p-3 border rounded-md resize-none bg-gray-50">${prompt.prompt}</textarea>
                <div class="flex flex-col sm:flex-row gap-2">
                    <button onclick="copySavedPrompt('${prompt.id}')" class="flex-1 border border-gray-300 bg-transparent px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                        Copy
                    </button>
                    <button onclick="trySavedPromptInChatGPT('${prompt.id}')" class="flex-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                        Try in ChatGPT
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Delete saved prompt
function deletePrompt(id) {
  const savedPrompts = JSON.parse(localStorage.getItem("promptpal_saved_prompts") || "[]")
  const filtered = savedPrompts.filter((p) => p.id !== id)
  localStorage.setItem("promptpal_saved_prompts", JSON.stringify(filtered))
  renderSavedPrompts()
  showToast("Deleted", "Prompt removed from your collection")
}

// Copy saved prompt
async function copySavedPrompt(id) {
  const savedPrompts = JSON.parse(localStorage.getItem("promptpal_saved_prompts") || "[]")
  const prompt = savedPrompts.find((p) => p.id === id)

  if (prompt) {
    try {
      await navigator.clipboard.writeText(prompt.prompt)
      showToast("Copied!", "Prompt copied to clipboard")
    } catch (err) {
      showToast("Error", "Failed to copy prompt", "error")
    }
  }
}

// Try saved prompt in ChatGPT
function trySavedPromptInChatGPT(id) {
  const savedPrompts = JSON.parse(localStorage.getItem("promptpal_saved_prompts") || "[]")
  const prompt = savedPrompts.find((p) => p.id === id)

  if (prompt) {
    const encodedPrompt = encodeURIComponent(prompt.prompt)
    window.open(`https://chat.openai.com/?q=${encodedPrompt}`, "_blank")
  }
}

// Show toast notification
function showToast(title, message, type = "success") {
  const toast = document.createElement("div")
  toast.className = `toast bg-white border rounded-lg shadow-lg p-4 max-w-sm ${type === "error" ? "border-red-200" : "border-green-200"}`

  toast.innerHTML = `
        <div class="flex items-start gap-3">
            <div class="flex-shrink-0">
                ${
                  type === "error"
                    ? '<svg class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
                    : '<svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
                }
            </div>
            <div class="flex-1">
                <p class="font-medium text-gray-900">${title}</p>
                <p class="text-sm text-gray-600">${message}</p>
            </div>
        </div>
    `

  document.getElementById("toast-container").appendChild(toast)

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.add("removing")
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  }, 3000)
}

// Setup event listeners
function setupEventListeners() {
  backButton.addEventListener("click", backToCategories)
  generateButton.addEventListener("click", generatePrompt)
  copyButton.addEventListener("click", copyToClipboard)
  saveButton.addEventListener("click", savePrompt)
  tryChatGPTButton.addEventListener("click", tryInChatGPT)
}
