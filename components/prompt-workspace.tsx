"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Wand2, Copy, Save, ExternalLink, Check, RefreshCw, Settings, Sparkles } from "lucide-react"
import { PromptForm } from "@/components/prompt-form"
import { PromptPreview } from "@/components/prompt-preview"
import { usePromptContext } from "@/contexts/prompt-context"
import { useToast } from "@/hooks/use-toast"

const categories = [
  {
    id: "photo-generation",
    title: "AI Photo Generator",
    description: "Create stunning images with detailed prompts for Midjourney, DALL-E, Stable Diffusion",
    icon: "📸",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: "resume-builder",
    title: "Resume & CV Builder",
    description: "Professional resume content, cover letters, LinkedIn optimization",
    icon: "📄",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    id: "coding",
    title: "Code Assistant",
    description: "Programming help, debugging, code reviews, and optimization",
    icon: "💻",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "writing",
    title: "Content Writer",
    description: "Blog posts, articles, copywriting, and creative content",
    icon: "✍️",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "business",
    title: "Business Strategist",
    description: "Business plans, market analysis, and strategic planning",
    icon: "💼",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "marketing",
    title: "Marketing Expert",
    description: "Social media, ads, email campaigns, and brand strategy",
    icon: "📈",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "education",
    title: "Learning Coach",
    description: "Lesson plans, study guides, and educational content",
    icon: "🎓",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "research",
    title: "Research Assistant",
    description: "Data analysis, research methodology, and insights",
    icon: "🔬",
    gradient: "from-teal-500 to-blue-500",
  },
  {
    id: "creative",
    title: "Creative Director",
    description: "Design briefs, creative concepts, and artistic direction",
    icon: "🎨",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "productivity",
    title: "Productivity Guru",
    description: "Workflow optimization, time management, and efficiency",
    icon: "⚡",
    gradient: "from-yellow-500 to-orange-500",
  },
]

interface PromptWorkspaceProps {
  categoryId: string
  onBack: () => void
}

export function PromptWorkspace({ categoryId, onBack }: PromptWorkspaceProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const { dispatch } = usePromptContext()
  const { toast } = useToast()

  const category = categories.find((cat) => cat.id === categoryId)

  const handleGenerate = async () => {
    setIsGenerating(true)

    // Simulate AI generation with realistic delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const prompt = generateAdvancedPrompt(categoryId, formData)
    setGeneratedPrompt(prompt)
    setIsGenerating(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy prompt",
        variant: "destructive",
      })
    }
  }

  const handleSave = () => {
    if (!generatedPrompt) return

    const promptData = {
      id: Date.now().toString(),
      prompt: generatedPrompt,
      category: categoryId,
      categoryTitle: category?.title || "",
      tags: Object.keys(formData).filter((key) => formData[key]),
      isFavorite: false,
      usageCount: 0,
      createdAt: new Date().toISOString(),
    }

    dispatch({ type: "SAVE_PROMPT", payload: promptData })
    toast({
      title: "Saved!",
      description: "Prompt saved to your library",
    })
  }

  const handleTryInChatGPT = () => {
    if (!generatedPrompt) return

    dispatch({ type: "UPDATE_USAGE", payload: Date.now().toString() })
    const encodedPrompt = encodeURIComponent(generatedPrompt)
    window.open(`https://chat.openai.com/?q=${encodedPrompt}`, "_blank")
  }

  if (!category) return null

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Categories
        </Button>

        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center text-2xl shadow-lg`}
          >
            {category.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{category.title}</h1>
            <p className="text-gray-600">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Customize Your Prompt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PromptForm categoryId={categoryId} formData={formData} onFormDataChange={setFormData} />

              <Button
                onClick={handleGenerate}
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Prompt
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Generated Prompt Section */}
        <div className="space-y-6">
          {generatedPrompt && (
            <Card className="bg-white/80 backdrop-blur-sm border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Generated Prompt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={generatedPrompt}
                  readOnly
                  className="min-h-[300px] resize-none bg-gray-50 font-mono text-sm"
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={handleCopy} variant="outline" className="flex-1 bg-transparent">
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>

                  <Button onClick={handleSave} variant="outline" className="flex-1 bg-transparent">
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>

                  <Button
                    onClick={handleTryInChatGPT}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Try in ChatGPT
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preview Section */}
          <PromptPreview categoryId={categoryId} formData={formData} />
        </div>
      </div>
    </div>
  )
}

function generateAdvancedPrompt(categoryId: string, formData: Record<string, string>): string {
  const basePrompts = {
    "photo-generation": `Create a detailed ${formData.platform || "AI image generation"} prompt for generating high-quality images.

**Image Specifications:**
- Platform: ${formData.platform || "Universal AI"}
- Art Style: ${formData.style || "Photorealistic"}
- Main Subject: ${formData.subject || "Not specified"}
- Mood/Atmosphere: ${formData.mood || "Balanced"}
- Lighting: ${formData.lighting || "Natural"}
- Composition: ${formData.composition || "Standard"}
- Color Palette: ${formData.colors || "Natural colors"}
- Quality: ${formData.quality || "High quality"}

**Additional Details:**
${formData.details || "Standard composition"}

**Generate a comprehensive prompt that includes:**
1. **Main Prompt**: Detailed description optimized for ${formData.platform || "AI image generation"}
2. **Technical Parameters**: Recommended settings, aspect ratios, and quality modifiers
3. **Style Modifiers**: Specific artistic techniques and visual elements
4. **Negative Prompts**: What to avoid in the generation
5. **Alternative Variations**: 3-5 prompt variations for different results
6. **Platform-Specific Tips**: Best practices for ${formData.platform || "your chosen platform"}

**Format the output as:**
- Clear, descriptive language
- Comma-separated keywords and phrases
- Technical parameters in brackets
- Weight modifiers where applicable

Make the prompt highly detailed and optimized for professional-quality image generation.`,

    "resume-builder": `You are a professional career coach and ATS optimization expert. Create comprehensive resume content for:

**Position Details:**
- Target Role: ${formData.targetRole || "Not specified"}
- Industry: ${formData.industry || "Not specified"}
- Experience Level: ${formData.experienceLevel || "Not specified"}
- Company Size: ${formData.companySize || "Any size"}
- Job Type: ${formData.jobType || "Full-time"}
- Education: ${formData.education || "Not specified"}

**Candidate Profile:**
- Key Skills: ${formData.keySkills || "Not specified"}
- Major Achievements: ${formData.achievements || "Not specified"}
- Work History: ${formData.workHistory || "Not specified"}
- Special Requirements: ${formData.specialRequests || "None"}

**Resume Type:** ${formData.resumeType || "Professional Resume"}

**Please provide:**

1. **Professional Summary** (3-4 lines)
   - Compelling opening statement
   - Key value proposition
   - Years of experience highlight
   - Industry-specific keywords

2. **Core Competencies** (8-12 skills)
   - Technical skills relevant to the role
   - Soft skills that matter
   - Industry certifications
   - Tools and technologies

3. **Professional Experience** (3-4 bullet points per role)
   - Action-oriented descriptions
   - Quantifiable achievements
   - Impact-focused statements
   - ATS-friendly keywords

4. **Key Achievements Section**
   - 4-6 standout accomplishments
   - Metrics and percentages
   - Awards and recognitions
   - Project successes

5. **Skills Matrix**
   - Technical skills with proficiency levels
   - Relevant software and tools
   - Industry-specific competencies
   - Emerging technologies

6. **ATS Optimization**
   - Industry keywords to include
   - Formatting recommendations
   - Section headers that work
   - Keyword density suggestions

7. **Cover Letter Template** (if applicable)
   - Opening paragraph
   - Body paragraphs with examples
   - Closing with call-to-action

8. **LinkedIn Profile Optimization**
   - Headline suggestions
   - Summary section
   - Skills to highlight
   - Keywords for searchability

**Additional Deliverables:**
- Interview preparation talking points
- Salary negotiation key points
- Follow-up email templates
- Portfolio/work samples suggestions

Focus on making the content ATS-friendly, keyword-rich, and tailored to the specific role and industry.`,
    coding: `You are a senior software engineer and code mentor with expertise in ${formData.language || "multiple programming languages"}. 

**Context:**
- Programming Language: ${formData.language || "Not specified"}
- Problem Type: ${formData.problemType || "General coding"}
- Skill Level: ${formData.skillLevel || "Intermediate"}
- Specific Requirements: ${formData.requirements || "None specified"}

**Task:**
${formData.description || "Provide coding assistance"}

**Please provide:**
1. **Solution**: Clean, well-commented code that follows best practices
2. **Explanation**: Step-by-step breakdown of the approach
3. **Optimization**: Performance considerations and potential improvements
4. **Testing**: Suggest test cases and edge cases to consider
5. **Best Practices**: Industry standards and conventions to follow
6. **Alternative Approaches**: Different ways to solve the same problem

**Additional Requirements:**
- Use clear variable names and proper code structure
- Include error handling where appropriate
- Explain any complex algorithms or logic
- Provide examples of usage if applicable`,

    writing: `You are a professional content strategist and copywriter with expertise in ${formData.contentType || "various content formats"}.

**Content Brief:**
- Content Type: ${formData.contentType || "Not specified"}
- Target Audience: ${formData.audience || "General audience"}
- Tone: ${formData.tone || "Professional"}
- Word Count: ${formData.wordCount || "Flexible"}
- Key Topics: ${formData.topics || "Not specified"}
- SEO Keywords: ${formData.keywords || "None specified"}

**Objective:**
${formData.objective || "Create engaging content"}

**Please deliver:**
1. **Compelling Headline**: 3-5 attention-grabbing title options
2. **Content Structure**: Detailed outline with main points
3. **Opening Hook**: Engaging introduction that captures attention
4. **Main Content**: Well-researched, valuable information
5. **Call-to-Action**: Clear next steps for readers
6. **SEO Optimization**: Natural keyword integration and meta description
7. **Engagement Elements**: Questions, statistics, or interactive elements

**Style Guidelines:**
- Match the specified tone throughout
- Use active voice and clear, concise language
- Include relevant examples and case studies
- Ensure content is scannable with headers and bullet points`,

    business: `You are a senior business consultant and strategic advisor with expertise in ${formData.businessArea || "business strategy"}.

**Business Context:**
- Industry: ${formData.industry || "Not specified"}
- Business Stage: ${formData.stage || "Not specified"}
- Target Market: ${formData.targetMarket || "Not specified"}
- Key Challenges: ${formData.challenges || "Not specified"}
- Goals: ${formData.goals || "Not specified"}

**Consultation Request:**
${formData.request || "Provide business guidance"}

**Please provide:**
1. **Situation Analysis**: Current state assessment and key insights
2. **Strategic Recommendations**: Actionable strategies and tactics
3. **Implementation Plan**: Step-by-step execution roadmap
4. **Risk Assessment**: Potential challenges and mitigation strategies
5. **Success Metrics**: KPIs and measurement frameworks
6. **Resource Requirements**: Budget, team, and tool considerations
7. **Timeline**: Realistic milestones and deadlines

**Deliverable Format:**
- Executive summary for stakeholders
- Detailed analysis with supporting data
- Visual frameworks where applicable
- Next steps and action items`,

    marketing: `You are a senior marketing strategist and growth expert specializing in ${formData.marketingChannel || "digital marketing"}.

**Campaign Brief:**
- Marketing Channel: ${formData.marketingChannel || "Multi-channel"}
- Target Audience: ${formData.targetAudience || "Not specified"}
- Campaign Objective: ${formData.objective || "Brand awareness"}
- Budget Range: ${formData.budget || "Flexible"}
- Timeline: ${formData.timeline || "Not specified"}
- Key Messages: ${formData.messages || "Not specified"}

**Challenge:**
${formData.challenge || "Develop marketing strategy"}

**Please create:**
1. **Campaign Strategy**: Overall approach and positioning
2. **Target Audience Analysis**: Demographics, psychographics, and behaviors
3. **Channel Strategy**: Platform selection and content adaptation
4. **Content Calendar**: Posting schedule and content themes
5. **Creative Concepts**: Ad copy, visuals, and messaging variations
6. **Performance Metrics**: KPIs and tracking mechanisms
7. **Budget Allocation**: Resource distribution across channels
8. **A/B Testing Plan**: Optimization and iteration strategy

**Success Criteria:**
- Measurable ROI and conversion goals
- Brand awareness and engagement metrics
- Customer acquisition and retention targets`,
  }

  return (
    basePrompts[categoryId as keyof typeof basePrompts] ||
    `You are an expert assistant specializing in ${categoryId}. Please help with: ${formData.description || "the requested task"}.`
  )
}
