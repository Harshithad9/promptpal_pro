"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface PromptFormProps {
  categoryId: string
  formData: Record<string, string>
  onFormDataChange: (data: Record<string, string>) => void
}

export function PromptForm({ categoryId, formData, onFormDataChange }: PromptFormProps) {
  const updateField = (field: string, value: string) => {
    onFormDataChange({ ...formData, [field]: value })
  }

  const renderFormFields = () => {
    switch (categoryId) {
      case "photo-generation":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="platform">AI Platform</Label>
                <Select onValueChange={(value) => updateField("platform", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="midjourney">Midjourney</SelectItem>
                    <SelectItem value="dalle">DALL-E 3</SelectItem>
                    <SelectItem value="stable-diffusion">Stable Diffusion</SelectItem>
                    <SelectItem value="leonardo">Leonardo AI</SelectItem>
                    <SelectItem value="firefly">Adobe Firefly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">Art Style</Label>
                <Select onValueChange={(value) => updateField("style", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photorealistic">Photorealistic</SelectItem>
                    <SelectItem value="digital-art">Digital Art</SelectItem>
                    <SelectItem value="oil-painting">Oil Painting</SelectItem>
                    <SelectItem value="watercolor">Watercolor</SelectItem>
                    <SelectItem value="anime">Anime/Manga</SelectItem>
                    <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Main Subject</Label>
              <Input
                id="subject"
                placeholder="e.g., a majestic dragon, futuristic cityscape, portrait of a woman"
                value={formData.subject || ""}
                onChange={(e) => updateField("subject", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mood">Mood/Atmosphere</Label>
                <Select onValueChange={(value) => updateField("mood", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dramatic">Dramatic</SelectItem>
                    <SelectItem value="peaceful">Peaceful</SelectItem>
                    <SelectItem value="mysterious">Mysterious</SelectItem>
                    <SelectItem value="energetic">Energetic</SelectItem>
                    <SelectItem value="romantic">Romantic</SelectItem>
                    <SelectItem value="dark">Dark & Moody</SelectItem>
                    <SelectItem value="bright">Bright & Cheerful</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lighting">Lighting</Label>
                <Select onValueChange={(value) => updateField("lighting", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select lighting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="golden-hour">Golden Hour</SelectItem>
                    <SelectItem value="studio">Studio Lighting</SelectItem>
                    <SelectItem value="natural">Natural Light</SelectItem>
                    <SelectItem value="neon">Neon Lighting</SelectItem>
                    <SelectItem value="candlelight">Candlelight</SelectItem>
                    <SelectItem value="dramatic">Dramatic Shadows</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="composition">Composition & Camera</Label>
              <Select onValueChange={(value) => updateField("composition", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select composition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="close-up">Close-up Portrait</SelectItem>
                  <SelectItem value="wide-shot">Wide Shot</SelectItem>
                  <SelectItem value="aerial">Aerial View</SelectItem>
                  <SelectItem value="low-angle">Low Angle</SelectItem>
                  <SelectItem value="macro">Macro Photography</SelectItem>
                  <SelectItem value="panoramic">Panoramic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="colors">Color Palette</Label>
              <Input
                id="colors"
                placeholder="e.g., vibrant blues and purples, warm earth tones, monochrome"
                value={formData.colors || ""}
                onChange={(e) => updateField("colors", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Additional Details</Label>
              <Textarea
                id="details"
                placeholder="Any specific details, objects, background elements, or technical specifications..."
                value={formData.details || ""}
                onChange={(e) => updateField("details", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quality">Quality Settings</Label>
              <Select onValueChange={(value) => updateField("quality", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Quality</SelectItem>
                  <SelectItem value="high">High Quality</SelectItem>
                  <SelectItem value="ultra">Ultra High Quality</SelectItem>
                  <SelectItem value="raw">RAW/Unprocessed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case "resume-builder":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="resumeType">Resume Type</Label>
                <Select onValueChange={(value) => updateField("resumeType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional Resume</SelectItem>
                    <SelectItem value="creative">Creative Resume</SelectItem>
                    <SelectItem value="ats-optimized">ATS-Optimized</SelectItem>
                    <SelectItem value="executive">Executive Resume</SelectItem>
                    <SelectItem value="cover-letter">Cover Letter</SelectItem>
                    <SelectItem value="linkedin">LinkedIn Profile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Select onValueChange={(value) => updateField("experienceLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                    <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                    <SelectItem value="executive">Executive (10+ years)</SelectItem>
                    <SelectItem value="career-change">Career Change</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetRole">Target Job Title</Label>
              <Input
                id="targetRole"
                placeholder="e.g., Senior Software Engineer, Marketing Manager, Data Scientist"
                value={formData.targetRole || ""}
                onChange={(e) => updateField("targetRole", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select onValueChange={(value) => updateField("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance & Banking</SelectItem>
                    <SelectItem value="marketing">Marketing & Advertising</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail & E-commerce</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companySize">Target Company Size</Label>
                <Select onValueChange={(value) => updateField("companySize", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup">Startup (1-50)</SelectItem>
                    <SelectItem value="small">Small (51-200)</SelectItem>
                    <SelectItem value="medium">Medium (201-1000)</SelectItem>
                    <SelectItem value="large">Large (1000+)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (5000+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keySkills">Key Skills & Technologies</Label>
              <Textarea
                id="keySkills"
                placeholder="List your most relevant skills, technologies, certifications, and tools..."
                value={formData.keySkills || ""}
                onChange={(e) => updateField("keySkills", e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="achievements">Key Achievements</Label>
              <Textarea
                id="achievements"
                placeholder="Describe your major accomplishments, quantifiable results, awards, or recognitions..."
                value={formData.achievements || ""}
                onChange={(e) => updateField("achievements", e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workHistory">Work History Summary</Label>
              <Textarea
                id="workHistory"
                placeholder="Brief overview of your work experience, key roles, and career progression..."
                value={formData.workHistory || ""}
                onChange={(e) => updateField("workHistory", e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="education">Education Level</Label>
                <Select onValueChange={(value) => updateField("education", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select education" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="associate">Associate Degree</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD/Doctorate</SelectItem>
                    <SelectItem value="bootcamp">Bootcamp/Certificate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type Preference</Label>
                <Select onValueChange={(value) => updateField("jobType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests">Special Requirements</Label>
              <Textarea
                id="specialRequests"
                placeholder="Any specific requirements like salary expectations, location preferences, or unique circumstances..."
                value={formData.specialRequests || ""}
                onChange={(e) => updateField("specialRequests", e.target.value)}
              />
            </div>
          </div>
        )

      case "coding":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Programming Language</Label>
                <Select onValueChange={(value) => updateField("language", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="nodejs">Node.js</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skillLevel">Skill Level</Label>
                <Select onValueChange={(value) => updateField("skillLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="problemType">Problem Type</Label>
              <Select onValueChange={(value) => updateField("problemType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select problem type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debugging">Debugging</SelectItem>
                  <SelectItem value="algorithm">Algorithm Design</SelectItem>
                  <SelectItem value="optimization">Code Optimization</SelectItem>
                  <SelectItem value="architecture">System Architecture</SelectItem>
                  <SelectItem value="testing">Testing Strategy</SelectItem>
                  <SelectItem value="refactoring">Code Refactoring</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Problem Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your coding challenge in detail..."
                value={formData.description || ""}
                onChange={(e) => updateField("description", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Specific Requirements</Label>
              <Textarea
                id="requirements"
                placeholder="Any specific requirements, constraints, or preferences..."
                value={formData.requirements || ""}
                onChange={(e) => updateField("requirements", e.target.value)}
              />
            </div>
          </div>
        )

      case "writing":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contentType">Content Type</Label>
                <Select onValueChange={(value) => updateField("contentType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog-post">Blog Post</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="social-media">Social Media</SelectItem>
                    <SelectItem value="email">Email Campaign</SelectItem>
                    <SelectItem value="landing-page">Landing Page</SelectItem>
                    <SelectItem value="product-description">Product Description</SelectItem>
                    <SelectItem value="press-release">Press Release</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select onValueChange={(value) => updateField("tone", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Input
                id="audience"
                placeholder="e.g., young professionals, small business owners, tech enthusiasts"
                value={formData.audience || ""}
                onChange={(e) => updateField("audience", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wordCount">Word Count: {formData.wordCount || 500}</Label>
              <Slider
                value={[Number.parseInt(formData.wordCount) || 500]}
                onValueChange={(value) => updateField("wordCount", value[0].toString())}
                max={3000}
                min={100}
                step={100}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="objective">Content Objective</Label>
              <Textarea
                id="objective"
                placeholder="What do you want to achieve with this content?"
                value={formData.objective || ""}
                onChange={(e) => updateField("objective", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">SEO Keywords</Label>
              <Input
                id="keywords"
                placeholder="Enter keywords separated by commas"
                value={formData.keywords || ""}
                onChange={(e) => updateField("keywords", e.target.value)}
              />
            </div>
          </div>
        )

      case "business":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select onValueChange={(value) => updateField("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stage">Business Stage</Label>
                <Select onValueChange={(value) => updateField("stage", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="growth">Growth Stage</SelectItem>
                    <SelectItem value="established">Established</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetMarket">Target Market</Label>
              <Input
                id="targetMarket"
                placeholder="Describe your target market or customer segment"
                value={formData.targetMarket || ""}
                onChange={(e) => updateField("targetMarket", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenges">Key Challenges</Label>
              <Textarea
                id="challenges"
                placeholder="What are the main challenges you're facing?"
                value={formData.challenges || ""}
                onChange={(e) => updateField("challenges", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals">Business Goals</Label>
              <Textarea
                id="goals"
                placeholder="What are your primary business objectives?"
                value={formData.goals || ""}
                onChange={(e) => updateField("goals", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="request">Specific Request</Label>
              <Textarea
                id="request"
                placeholder="What specific business guidance do you need?"
                value={formData.request || ""}
                onChange={(e) => updateField("request", e.target.value)}
              />
            </div>
          </div>
        )

      case "marketing":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="marketingChannel">Marketing Channel</Label>
                <Select onValueChange={(value) => updateField("marketingChannel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="social-media">Social Media</SelectItem>
                    <SelectItem value="email">Email Marketing</SelectItem>
                    <SelectItem value="content">Content Marketing</SelectItem>
                    <SelectItem value="paid-ads">Paid Advertising</SelectItem>
                    <SelectItem value="seo">SEO</SelectItem>
                    <SelectItem value="influencer">Influencer Marketing</SelectItem>
                    <SelectItem value="multi-channel">Multi-Channel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range</Label>
                <Select onValueChange={(value) => updateField("budget", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1k">Under $1,000</SelectItem>
                    <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                    <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10k-50k">$10,000 - $50,000</SelectItem>
                    <SelectItem value="50k-plus">$50,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                placeholder="Describe your ideal customer"
                value={formData.targetAudience || ""}
                onChange={(e) => updateField("targetAudience", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="objective">Campaign Objective</Label>
              <Select onValueChange={(value) => updateField("objective", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select objective" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
                  <SelectItem value="lead-generation">Lead Generation</SelectItem>
                  <SelectItem value="sales">Sales Conversion</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="retention">Customer Retention</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Campaign Timeline</Label>
              <Input
                id="timeline"
                placeholder="e.g., 3 months, Q1 2024, ongoing"
                value={formData.timeline || ""}
                onChange={(e) => updateField("timeline", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenge">Marketing Challenge</Label>
              <Textarea
                id="challenge"
                placeholder="What specific marketing challenge are you trying to solve?"
                value={formData.challenge || ""}
                onChange={(e) => updateField("challenge", e.target.value)}
              />
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what you need help with..."
                value={formData.description || ""}
                onChange={(e) => updateField("description", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="context">Additional Context</Label>
              <Textarea
                id="context"
                placeholder="Any additional context or requirements..."
                value={formData.context || ""}
                onChange={(e) => updateField("context", e.target.value)}
              />
            </div>
          </div>
        )
    }
  }

  return <div className="space-y-4">{renderFormFields()}</div>
}
