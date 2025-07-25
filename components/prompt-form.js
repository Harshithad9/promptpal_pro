"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Sparkles, Wand2 } from "lucide-react"
import { usePromptContext } from "../contexts/prompt-context"

const categoryForms = {
  "photo-generation": {
    title: "AI Photo Generation",
    description: "Create detailed prompts for Midjourney, DALL-E, Stable Diffusion",
    icon: "📸",
    fields: [
      {
        name: "subject",
        label: "Main Subject",
        type: "text",
        placeholder: "e.g., A majestic lion, A futuristic city, Portrait of a woman",
        required: true,
      },
      {
        name: "style",
        label: "Art Style",
        type: "select",
        options: [
          "Photorealistic",
          "Digital Art",
          "Oil Painting",
          "Watercolor",
          "Anime/Manga",
          "Abstract",
          "Minimalist",
          "Vintage",
          "Cyberpunk",
          "Fantasy",
        ],
        required: true,
      },
      {
        name: "setting",
        label: "Setting/Environment",
        type: "text",
        placeholder: "e.g., Mountain landscape, Urban street, Studio backdrop",
      },
      {
        name: "mood",
        label: "Mood/Atmosphere",
        type: "select",
        options: [
          "Dramatic",
          "Peaceful",
          "Energetic",
          "Mysterious",
          "Romantic",
          "Dark",
          "Bright",
          "Moody",
          "Ethereal",
          "Intense",
        ],
      },
      {
        name: "lighting",
        label: "Lighting",
        type: "select",
        options: [
          "Natural sunlight",
          "Golden hour",
          "Blue hour",
          "Studio lighting",
          "Neon lights",
          "Candlelight",
          "Dramatic shadows",
          "Soft diffused",
          "Backlighting",
          "Rim lighting",
        ],
      },
      {
        name: "camera",
        label: "Camera Angle",
        type: "select",
        options: [
          "Close-up",
          "Medium shot",
          "Wide shot",
          "Bird's eye view",
          "Low angle",
          "High angle",
          "Dutch angle",
          "Over shoulder",
          "Profile",
          "Straight on",
        ],
      },
      {
        name: "resolution",
        label: "Quality/Resolution",
        type: "select",
        options: [
          "4K",
          "8K",
          "Ultra HD",
          "High resolution",
          "Cinematic",
          "Professional photography",
          "Award winning",
          "Masterpiece",
        ],
      },
      {
        name: "additional",
        label: "Additional Details",
        type: "textarea",
        placeholder: "Any specific details, colors, emotions, or technical specifications...",
      },
    ],
  },
  "resume-builder": {
    title: "Resume & CV Builder",
    description: "Professional resume content and optimization",
    icon: "📄",
    fields: [
      {
        name: "position",
        label: "Target Position",
        type: "text",
        placeholder: "e.g., Senior Software Engineer, Marketing Manager",
        required: true,
      },
      {
        name: "industry",
        label: "Industry",
        type: "select",
        options: [
          "Technology",
          "Healthcare",
          "Finance",
          "Education",
          "Marketing",
          "Sales",
          "Engineering",
          "Design",
          "Consulting",
          "Non-profit",
          "Government",
          "Retail",
          "Manufacturing",
          "Other",
        ],
        required: true,
      },
      {
        name: "experience",
        label: "Experience Level",
        type: "select",
        options: [
          "Entry Level (0-2 years)",
          "Mid Level (3-5 years)",
          "Senior Level (6-10 years)",
          "Executive Level (10+ years)",
          "Career Change",
        ],
        required: true,
      },
      {
        name: "skills",
        label: "Key Skills",
        type: "textarea",
        placeholder: "List your top 8-10 relevant skills, separated by commas",
        required: true,
      },
      {
        name: "achievements",
        label: "Major Achievements",
        type: "textarea",
        placeholder: "Quantifiable accomplishments, awards, or notable projects",
        required: true,
      },
      {
        name: "education",
        label: "Education Level",
        type: "select",
        options: [
          "High School",
          "Associate Degree",
          "Bachelor's Degree",
          "Master's Degree",
          "PhD",
          "Professional Certification",
          "Bootcamp/Training",
        ],
      },
      {
        name: "certifications",
        label: "Certifications",
        type: "text",
        placeholder: "Relevant professional certifications",
      },
      {
        name: "objective",
        label: "Career Objective",
        type: "textarea",
        placeholder: "What are your career goals and what value do you bring?",
      },
    ],
  },
  coding: {
    title: "Code Assistant",
    description: "Programming help and code optimization",
    icon: "💻",
    fields: [
      {
        name: "language",
        label: "Programming Language",
        type: "select",
        options: [
          "JavaScript",
          "Python",
          "Java",
          "C++",
          "C#",
          "Go",
          "Rust",
          "PHP",
          "Ruby",
          "Swift",
          "Kotlin",
          "TypeScript",
          "Other",
        ],
        required: true,
      },
      {
        name: "framework",
        label: "Framework/Library",
        type: "select",
        options: [
          "React",
          "Vue.js",
          "Angular",
          "Node.js",
          "Express",
          "Django",
          "Flask",
          "Spring",
          "Laravel",
          ".NET",
          "React Native",
          "Flutter",
          "None",
          "Other",
        ],
      },
      {
        name: "projectType",
        label: "Project Type",
        type: "select",
        options: [
          "Web Application",
          "Mobile App",
          "Desktop Application",
          "API/Backend",
          "Database",
          "Algorithm",
          "Data Analysis",
          "Machine Learning",
          "Game Development",
          "DevOps/Infrastructure",
        ],
        required: true,
      },
      {
        name: "requirements",
        label: "Specific Requirements",
        type: "textarea",
        placeholder: "Describe what you want to build or the problem you're solving",
        required: true,
      },
      {
        name: "complexity",
        label: "Complexity Level",
        type: "select",
        options: ["Beginner", "Intermediate", "Advanced", "Expert"],
      },
      {
        name: "errorHandling",
        label: "Error Handling Needs",
        type: "select",
        options: ["Basic", "Comprehensive", "Production-ready", "Custom validation"],
      },
      {
        name: "documentation",
        label: "Documentation Level",
        type: "select",
        options: ["Comments only", "Basic documentation", "Comprehensive docs", "API documentation"],
      },
      {
        name: "context",
        label: "Additional Context",
        type: "textarea",
        placeholder: "Any constraints, existing code, or specific patterns to follow",
      },
    ],
  },
  writing: {
    title: "Content Writer",
    description: "Blog posts, articles, and creative content",
    icon: "✍️",
    fields: [
      {
        name: "contentType",
        label: "Content Type",
        type: "select",
        options: [
          "Blog Post",
          "Article",
          "Social Media Post",
          "Email Newsletter",
          "Product Description",
          "Landing Page Copy",
          "Press Release",
          "Case Study",
          "White Paper",
        ],
        required: true,
      },
      {
        name: "topic",
        label: "Topic/Subject",
        type: "text",
        placeholder: "Main topic or subject matter",
        required: true,
      },
      {
        name: "audience",
        label: "Target Audience",
        type: "text",
        placeholder: "Who is your target reader? (demographics, interests, expertise level)",
        required: true,
      },
      {
        name: "tone",
        label: "Tone of Voice",
        type: "select",
        options: [
          "Professional",
          "Casual",
          "Friendly",
          "Authoritative",
          "Conversational",
          "Formal",
          "Humorous",
          "Inspirational",
          "Educational",
          "Persuasive",
        ],
        required: true,
      },
      {
        name: "objective",
        label: "Content Objective",
        type: "select",
        options: [
          "Inform/Educate",
          "Persuade/Sell",
          "Entertain",
          "Build Brand Awareness",
          "Generate Leads",
          "Drive Traffic",
          "Establish Authority",
          "Engage Community",
        ],
      },
      {
        name: "keyPoints",
        label: "Key Points to Cover",
        type: "textarea",
        placeholder: "Main points, arguments, or information to include",
        required: true,
      },
      {
        name: "wordCount",
        label: "Target Word Count",
        type: "select",
        options: [
          "Short (100-300 words)",
          "Medium (300-800 words)",
          "Long (800-1500 words)",
          "Very Long (1500+ words)",
          "No preference",
        ],
      },
      { name: "seo", label: "SEO Keywords", type: "text", placeholder: "Primary keywords to target (optional)" },
      {
        name: "cta",
        label: "Call to Action",
        type: "text",
        placeholder: "What action should readers take after reading?",
      },
    ],
  },
  business: {
    title: "Business Strategist",
    description: "Business plans and strategic analysis",
    icon: "💼",
    fields: [
      {
        name: "businessType",
        label: "Business Type",
        type: "select",
        options: [
          "Startup",
          "Small Business",
          "Enterprise",
          "Non-profit",
          "E-commerce",
          "SaaS",
          "Consulting",
          "Retail",
          "Manufacturing",
          "Service-based",
        ],
        required: true,
      },
      {
        name: "industry",
        label: "Industry",
        type: "select",
        options: [
          "Technology",
          "Healthcare",
          "Finance",
          "Education",
          "Retail",
          "Manufacturing",
          "Consulting",
          "Real Estate",
          "Food & Beverage",
          "Entertainment",
          "Transportation",
          "Energy",
          "Other",
        ],
        required: true,
      },
      {
        name: "stage",
        label: "Business Stage",
        type: "select",
        options: [
          "Idea/Concept",
          "Pre-launch",
          "Startup (0-2 years)",
          "Growth (2-5 years)",
          "Established (5+ years)",
          "Expansion",
          "Pivot/Restructure",
        ],
        required: true,
      },
      {
        name: "targetMarket",
        label: "Target Market",
        type: "textarea",
        placeholder: "Describe your ideal customers, market size, demographics",
        required: true,
      },
      {
        name: "businessModel",
        label: "Business Model",
        type: "select",
        options: [
          "B2B",
          "B2C",
          "B2B2C",
          "Subscription",
          "Marketplace",
          "Freemium",
          "E-commerce",
          "Consulting",
          "Licensing",
          "Franchise",
          "Other",
        ],
      },
      {
        name: "competitive",
        label: "Competitive Advantage",
        type: "textarea",
        placeholder: "What makes your business unique? Key differentiators",
        required: true,
      },
      {
        name: "challenges",
        label: "Current Challenges",
        type: "textarea",
        placeholder: "Main obstacles or problems you're facing",
      },
      {
        name: "goals",
        label: "Business Goals",
        type: "textarea",
        placeholder: "Short-term and long-term objectives",
        required: true,
      },
      {
        name: "budget",
        label: "Budget Range",
        type: "select",
        options: [
          "Under $10K",
          "$10K - $50K",
          "$50K - $100K",
          "$100K - $500K",
          "$500K - $1M",
          "Over $1M",
          "Seeking Investment",
        ],
      },
      {
        name: "timeline",
        label: "Timeline",
        type: "select",
        options: ["1-3 months", "3-6 months", "6-12 months", "1-2 years", "2+ years", "Ongoing"],
      },
    ],
  },
  marketing: {
    title: "Marketing Expert",
    description: "Marketing campaigns and brand strategy",
    icon: "📈",
    fields: [
      {
        name: "product",
        label: "Product/Service",
        type: "text",
        placeholder: "What are you marketing?",
        required: true,
      },
      {
        name: "campaignType",
        label: "Campaign Type",
        type: "select",
        options: [
          "Brand Awareness",
          "Lead Generation",
          "Sales/Conversion",
          "Product Launch",
          "Social Media",
          "Email Marketing",
          "Content Marketing",
          "Influencer Marketing",
          "Paid Advertising",
        ],
        required: true,
      },
      {
        name: "audience",
        label: "Target Audience",
        type: "textarea",
        placeholder: "Demographics, psychographics, behaviors, pain points",
        required: true,
      },
      {
        name: "platforms",
        label: "Marketing Platforms",
        type: "select",
        options: [
          "Social Media (Facebook, Instagram)",
          "Google Ads",
          "LinkedIn",
          "TikTok",
          "YouTube",
          "Email",
          "Content/SEO",
          "Influencer",
          "Traditional Media",
          "Multiple Platforms",
        ],
        required: true,
      },
      {
        name: "budget",
        label: "Marketing Budget",
        type: "select",
        options: ["Under $1K", "$1K - $5K", "$5K - $10K", "$10K - $25K", "$25K - $50K", "$50K+", "No specific budget"],
      },
      {
        name: "goals",
        label: "Campaign Goals",
        type: "textarea",
        placeholder: "Specific, measurable objectives (e.g., increase sales by 20%, generate 500 leads)",
        required: true,
      },
      { name: "competitors", label: "Main Competitors", type: "text", placeholder: "Who are you competing against?" },
      {
        name: "usp",
        label: "Unique Selling Proposition",
        type: "textarea",
        placeholder: "What makes your product/service unique?",
        required: true,
      },
      {
        name: "timeline",
        label: "Campaign Timeline",
        type: "select",
        options: ["1 week", "2-4 weeks", "1-3 months", "3-6 months", "6+ months", "Ongoing campaign"],
      },
    ],
  },
  education: {
    title: "Learning Coach",
    description: "Educational content and lesson planning",
    icon: "🎓",
    fields: [
      {
        name: "subject",
        label: "Subject/Topic",
        type: "text",
        placeholder: "What subject or skill are you teaching?",
        required: true,
      },
      {
        name: "level",
        label: "Education Level",
        type: "select",
        options: [
          "Elementary (K-5)",
          "Middle School (6-8)",
          "High School (9-12)",
          "College/University",
          "Adult Education",
          "Professional Training",
          "Online Course",
          "Workshop/Seminar",
        ],
        required: true,
      },
      {
        name: "audience",
        label: "Target Audience",
        type: "textarea",
        placeholder: "Age group, background knowledge, learning goals",
        required: true,
      },
      {
        name: "duration",
        label: "Lesson Duration",
        type: "select",
        options: [
          "15-30 minutes",
          "30-45 minutes",
          "45-60 minutes",
          "1-2 hours",
          "Half day",
          "Full day",
          "Multi-day course",
          "Self-paced",
        ],
      },
      {
        name: "format",
        label: "Teaching Format",
        type: "select",
        options: [
          "In-person classroom",
          "Online live",
          "Pre-recorded video",
          "Interactive workshop",
          "One-on-one tutoring",
          "Group study",
          "Hybrid",
          "Self-study materials",
        ],
        required: true,
      },
      {
        name: "objectives",
        label: "Learning Objectives",
        type: "textarea",
        placeholder: "What should students be able to do after this lesson?",
        required: true,
      },
      {
        name: "methods",
        label: "Teaching Methods",
        type: "select",
        options: [
          "Lecture",
          "Interactive discussion",
          "Hands-on activities",
          "Problem-solving",
          "Case studies",
          "Group work",
          "Multimedia presentation",
          "Gamification",
          "Mixed methods",
        ],
      },
      {
        name: "prerequisites",
        label: "Prerequisites",
        type: "text",
        placeholder: "What should students know before this lesson?",
      },
      {
        name: "assessment",
        label: "Assessment Method",
        type: "select",
        options: [
          "Quiz/Test",
          "Project",
          "Presentation",
          "Discussion",
          "Practical demonstration",
          "Portfolio",
          "Peer review",
          "Self-assessment",
          "No formal assessment",
        ],
      },
    ],
  },
  productivity: {
    title: "Productivity Guru",
    description: "Workflow optimization and efficiency",
    icon: "⚡",
    fields: [
      {
        name: "focusArea",
        label: "Focus Area",
        type: "select",
        options: [
          "Time Management",
          "Task Organization",
          "Workflow Automation",
          "Goal Setting",
          "Habit Building",
          "Stress Management",
          "Work-Life Balance",
          "Team Productivity",
          "Digital Organization",
        ],
        required: true,
      },
      {
        name: "challenges",
        label: "Current Challenges",
        type: "textarea",
        placeholder: "What productivity issues are you facing?",
        required: true,
      },
      {
        name: "workStyle",
        label: "Work Style",
        type: "select",
        options: [
          "Remote work",
          "Office-based",
          "Hybrid",
          "Freelance",
          "Entrepreneur",
          "Student",
          "Team leader",
          "Individual contributor",
        ],
        required: true,
      },
      {
        name: "timeAvailable",
        label: "Time Available",
        type: "select",
        options: [
          "15-30 minutes/day",
          "30-60 minutes/day",
          "1-2 hours/day",
          "2-4 hours/day",
          "Flexible schedule",
          "Weekend focus",
          "Irregular schedule",
        ],
      },
      {
        name: "currentTools",
        label: "Current Tools",
        type: "text",
        placeholder: "What productivity tools/apps do you currently use?",
      },
      {
        name: "goals",
        label: "Productivity Goals",
        type: "textarea",
        placeholder: "What do you want to achieve? Be specific",
        required: true,
      },
      {
        name: "obstacles",
        label: "Main Obstacles",
        type: "select",
        options: [
          "Procrastination",
          "Distractions",
          "Overwhelm",
          "Poor planning",
          "Lack of motivation",
          "Too many tasks",
          "Interruptions",
          "Technology issues",
          "Perfectionism",
        ],
      },
      {
        name: "preferences",
        label: "Learning Preferences",
        type: "select",
        options: [
          "Step-by-step guides",
          "Quick tips",
          "Detailed systems",
          "Visual methods",
          "Technology solutions",
          "Analog/paper methods",
          "Habit-based approach",
          "Flexible framework",
        ],
      },
    ],
  },
  "portfolio-builder": {
    title: "Portfolio Builder",
    description: "Create stunning developer/designer portfolios and showcase projects",
    icon: "🎨",
    fields: [
      {
        name: "profession",
        label: "Your Profession",
        type: "select",
        options: [
          "Frontend Developer",
          "Backend Developer",
          "Full Stack Developer",
          "Mobile App Developer",
          "UI/UX Designer",
          "Graphic Designer",
          "Data Scientist",
          "DevOps Engineer",
          "Product Manager",
          "Digital Marketer",
          "Content Creator",
          "Other",
        ],
        required: true,
      },
      {
        name: "experience",
        label: "Experience Level",
        type: "select",
        options: [
          "Student/Beginner (0-1 years)",
          "Junior (1-3 years)",
          "Mid-level (3-5 years)",
          "Senior (5+ years)",
          "Career Changer",
        ],
        required: true,
      },
      {
        name: "skills",
        label: "Technical Skills",
        type: "textarea",
        placeholder: "List your main technical skills (e.g., React, Python, Figma, AWS)",
        required: true,
      },
      {
        name: "projects",
        label: "Key Projects",
        type: "textarea",
        placeholder: "Describe 2-3 of your best projects with technologies used",
        required: true,
      },
      {
        name: "style",
        label: "Portfolio Style",
        type: "select",
        options: [
          "Minimalist & Clean",
          "Creative & Artistic",
          "Professional & Corporate",
          "Modern & Trendy",
          "Dark & Sleek",
          "Colorful & Vibrant",
          "Interactive & Animated",
        ],
        required: true,
      },
      {
        name: "target",
        label: "Target Audience",
        type: "select",
        options: [
          "Potential Employers",
          "Freelance Clients",
          "Startup Companies",
          "Enterprise Companies",
          "Creative Agencies",
          "Tech Companies",
          "General Audience",
        ],
      },
      {
        name: "sections",
        label: "Portfolio Sections",
        type: "textarea",
        placeholder: "What sections do you want? (e.g., About, Projects, Skills, Contact, Blog)",
      },
      {
        name: "goals",
        label: "Portfolio Goals",
        type: "textarea",
        placeholder: "What do you want to achieve with your portfolio?",
        required: true,
      },
    ],
  },
  "startup-advisor": {
    title: "Startup Advisor",
    description: "Pitch decks, investor presentations, and startup strategy",
    icon: "🚀",
    fields: [
      {
        name: "stage",
        label: "Startup Stage",
        type: "select",
        options: [
          "Idea Stage",
          "MVP Development",
          "Pre-Seed",
          "Seed Stage",
          "Series A",
          "Growth Stage",
          "Pivot/Restructure",
        ],
        required: true,
      },
      {
        name: "industry",
        label: "Industry/Sector",
        type: "select",
        options: [
          "SaaS/Software",
          "E-commerce",
          "FinTech",
          "HealthTech",
          "EdTech",
          "AI/ML",
          "IoT",
          "Blockchain",
          "GreenTech",
          "FoodTech",
          "Other",
        ],
        required: true,
      },
      {
        name: "problem",
        label: "Problem Statement",
        type: "textarea",
        placeholder: "What problem does your startup solve?",
        required: true,
      },
      {
        name: "solution",
        label: "Your Solution",
        type: "textarea",
        placeholder: "How does your product/service solve this problem?",
        required: true,
      },
      {
        name: "market",
        label: "Target Market",
        type: "textarea",
        placeholder: "Who are your customers? Market size and demographics",
        required: true,
      },
      {
        name: "competition",
        label: "Competition Analysis",
        type: "textarea",
        placeholder: "Who are your main competitors? What's your competitive advantage?",
      },
      {
        name: "funding",
        label: "Funding Goal",
        type: "select",
        options: [
          "Under $50K",
          "$50K - $100K",
          "$100K - $500K",
          "$500K - $1M",
          "$1M - $5M",
          "$5M+",
          "Not seeking funding",
        ],
      },
      {
        name: "traction",
        label: "Current Traction",
        type: "textarea",
        placeholder: "Users, revenue, partnerships, or other metrics you have",
      },
    ],
  },
  "social-media": {
    title: "Social Media Manager",
    description: "Viral content, captions, and social media strategy",
    icon: "📱",
    fields: [
      {
        name: "platform",
        label: "Social Platform",
        type: "select",
        options: [
          "Instagram",
          "TikTok",
          "Twitter/X",
          "LinkedIn",
          "YouTube",
          "Facebook",
          "Pinterest",
          "Snapchat",
          "Multiple Platforms",
        ],
        required: true,
      },
      {
        name: "contentType",
        label: "Content Type",
        type: "select",
        options: [
          "Posts/Captions",
          "Stories",
          "Reels/Short Videos",
          "Long-form Videos",
          "Threads/Carousels",
          "Live Content",
          "User-Generated Content",
          "Influencer Content",
        ],
        required: true,
      },
      {
        name: "niche",
        label: "Content Niche",
        type: "select",
        options: [
          "Lifestyle",
          "Tech/Programming",
          "Business/Entrepreneurship",
          "Fitness/Health",
          "Food/Cooking",
          "Travel",
          "Fashion/Beauty",
          "Education",
          "Entertainment",
          "Art/Design",
          "Other",
        ],
        required: true,
      },
      {
        name: "audience",
        label: "Target Audience",
        type: "textarea",
        placeholder: "Age group, interests, demographics of your ideal followers",
        required: true,
      },
      {
        name: "tone",
        label: "Brand Voice/Tone",
        type: "select",
        options: [
          "Fun & Playful",
          "Professional",
          "Inspirational",
          "Educational",
          "Humorous",
          "Authentic & Personal",
          "Trendy & Hip",
          "Motivational",
        ],
        required: true,
      },
      {
        name: "goals",
        label: "Content Goals",
        type: "select",
        options: [
          "Increase Followers",
          "Drive Engagement",
          "Generate Leads",
          "Build Brand Awareness",
          "Drive Website Traffic",
          "Increase Sales",
          "Build Community",
          "Establish Authority",
        ],
      },
      {
        name: "topics",
        label: "Content Topics",
        type: "textarea",
        placeholder: "What topics/themes do you want to cover?",
        required: true,
      },
      {
        name: "frequency",
        label: "Posting Frequency",
        type: "select",
        options: ["Daily", "3-4 times per week", "2-3 times per week", "Weekly", "Bi-weekly", "As needed"],
      },
    ],
  },
  "ai-automation": {
    title: "AI Automation Expert",
    description: "Workflow automation and AI tools integration",
    icon: "🤖",
    fields: [
      {
        name: "automationType",
        label: "Automation Type",
        type: "select",
        options: [
          "Business Process Automation",
          "Content Creation Workflow",
          "Data Processing",
          "Customer Service",
          "Marketing Automation",
          "Development Workflow",
          "Personal Productivity",
          "E-commerce Automation",
        ],
        required: true,
      },
      {
        name: "currentProcess",
        label: "Current Manual Process",
        type: "textarea",
        placeholder: "Describe the process you want to automate",
        required: true,
      },
      {
        name: "tools",
        label: "Preferred AI Tools",
        type: "select",
        options: [
          "ChatGPT/OpenAI",
          "Claude",
          "Zapier",
          "Make.com",
          "n8n",
          "Airtable",
          "Notion",
          "Google Workspace",
          "Microsoft Power Automate",
          "Custom Solution",
        ],
      },
      {
        name: "complexity",
        label: "Technical Complexity",
        type: "select",
        options: [
          "Beginner (No-code)",
          "Intermediate (Low-code)",
          "Advanced (Some coding)",
          "Expert (Full development)",
        ],
        required: true,
      },
      {
        name: "timeframe",
        label: "Implementation Timeframe",
        type: "select",
        options: ["1-2 weeks", "1 month", "2-3 months", "3-6 months", "6+ months", "Ongoing project"],
      },
      {
        name: "budget",
        label: "Budget Range",
        type: "select",
        options: [
          "Free tools only",
          "Under $100/month",
          "$100-500/month",
          "$500-1000/month",
          "$1000+/month",
          "One-time investment",
        ],
      },
      {
        name: "goals",
        label: "Automation Goals",
        type: "textarea",
        placeholder: "What do you want to achieve? (time saved, accuracy, scale, etc.)",
        required: true,
      },
      {
        name: "constraints",
        label: "Constraints/Requirements",
        type: "textarea",
        placeholder: "Any technical limitations, security requirements, or specific needs?",
      },
    ],
  },
}

export function PromptForm({ categoryId, onGenerate }) {
  const { dispatch } = usePromptContext()
  const [formData, setFormData] = useState({})
  const [isGenerating, setIsGenerating] = useState(false)

  const category = categoryForms[categoryId]
  if (!category) return null

  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsGenerating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const prompt = generatePrompt(categoryId, formData)

    dispatch({
      type: "ADD_PROMPT",
      payload: {
        id: Date.now().toString(),
        category: categoryId,
        title: `${category.title} Prompt`,
        content: prompt,
        formData,
        createdAt: new Date().toISOString(),
      },
    })

    dispatch({
      type: "UPDATE_ANALYTICS",
      payload: {
        totalGenerated: 1,
        categoryUsed: categoryId,
      },
    })

    onGenerate(prompt)
    setIsGenerating(false)
  }

  const generatePrompt = (categoryId, data) => {
    // This would typically call an AI service
    // For now, we'll generate a structured prompt based on the form data

    const templates = {
      "photo-generation": () => {
        let prompt = `Create ${data.style || "a photorealistic"} image of ${data.subject || "the subject"}`
        if (data.setting) prompt += ` in ${data.setting}`
        if (data.mood) prompt += `, with a ${data.mood.toLowerCase()} mood`
        if (data.lighting) prompt += `, using ${data.lighting.toLowerCase()}`
        if (data.camera) prompt += `, shot from a ${data.camera.toLowerCase()}`
        if (data.resolution) prompt += `, ${data.resolution.toLowerCase()} quality`
        if (data.additional) prompt += `. Additional details: ${data.additional}`
        return prompt + ". Highly detailed, professional quality, award-winning photography."
      },

      "resume-builder": () => {
        return `Create a professional ${data.experience || "experienced"} resume for a ${data.position || "professional"} position in the ${data.industry || "relevant"} industry. 

Key Skills: ${data.skills || "List relevant technical and soft skills"}

Major Achievements: ${data.achievements || "Include quantifiable accomplishments"}

Education: ${data.education || "Relevant educational background"}

${data.certifications ? `Certifications: ${data.certifications}` : ""}

Career Objective: ${data.objective || "Seeking to leverage expertise and drive results in a challenging role"}

Format the resume with:
- Professional summary highlighting key qualifications
- Skills section with relevant technical and soft skills
- Work experience with quantifiable achievements
- Education and certifications
- Clean, ATS-friendly formatting
- Action verbs and industry keywords
- Tailored content for the target position`
      },

      coding: () => {
        return `Create ${data.complexity || "intermediate"} level ${data.language || "programming"} code for a ${data.projectType || "application"}.

Requirements: ${data.requirements || "Build a functional solution"}

${data.framework ? `Framework/Library: ${data.framework}` : ""}

Please include:
- Clean, well-structured code
- ${data.errorHandling || "Basic"} error handling
- ${data.documentation || "Basic"} documentation and comments
- Best practices and design patterns
- Modular and maintainable architecture

${data.context ? `Additional Context: ${data.context}` : ""}

Provide complete, working code with explanations of key concepts and implementation decisions.`
      },

      writing: () => {
        return `Write a ${data.contentType || "blog post"} about "${data.topic || "the specified topic"}" for ${data.audience || "the target audience"}.

Tone: ${data.tone || "Professional"}
Objective: ${data.objective || "Inform and engage"}
Target Length: ${data.wordCount || "Medium (300-800 words)"}

Key Points to Cover:
${data.keyPoints || "Main topics and arguments"}

${data.seo ? `SEO Keywords: ${data.seo}` : ""}
${data.cta ? `Call to Action: ${data.cta}` : ""}

Structure the content with:
- Compelling headline and introduction
- Clear, logical flow of ideas
- Engaging and informative body content
- Strong conclusion with call to action
- Appropriate formatting (headers, bullet points, etc.)
- SEO optimization if keywords provided`
      },

      business: () => {
        return `Develop a comprehensive business strategy for a ${data.stage || "growing"} ${data.businessType || "business"} in the ${data.industry || "specified"} industry.

Target Market: ${data.targetMarket || "Define ideal customers and market opportunity"}

Business Model: ${data.businessModel || "Revenue generation approach"}

Competitive Advantage: ${data.competitive || "Key differentiators and unique value proposition"}

Business Goals: ${data.goals || "Short and long-term objectives"}

${data.challenges ? `Current Challenges: ${data.challenges}` : ""}
${data.budget ? `Budget Range: ${data.budget}` : ""}
${data.timeline ? `Timeline: ${data.timeline}` : ""}

Provide:
- Market analysis and opportunity assessment
- Competitive landscape evaluation
- Strategic recommendations and action plan
- Financial projections and resource requirements
- Risk assessment and mitigation strategies
- Implementation roadmap with milestones`
      },

      marketing: () => {
        return `Create a comprehensive ${data.campaignType || "marketing"} campaign strategy for ${data.product || "the product/service"}.

Target Audience: ${data.audience || "Define demographics and psychographics"}

Marketing Platforms: ${data.platforms || "Selected channels"}

Campaign Goals: ${data.goals || "Specific, measurable objectives"}

Unique Selling Proposition: ${data.usp || "Key differentiators"}

${data.budget ? `Budget: ${data.budget}` : ""}
${data.competitors ? `Competitors: ${data.competitors}` : ""}
${data.timeline ? `Timeline: ${data.timeline}` : ""}

Develop:
- Campaign messaging and positioning
- Content strategy and creative concepts
- Channel-specific tactics and execution
- Budget allocation and resource planning
- Success metrics and KPIs
- Timeline and implementation schedule
- Performance tracking and optimization plan`
      },

      education: () => {
        return `Design a comprehensive ${data.duration || "45-60 minute"} lesson plan for teaching ${data.subject || "the specified subject"} to ${data.level || "students"}.

Target Audience: ${data.audience || "Student demographics and background"}

Learning Objectives: ${data.objectives || "What students will be able to do"}

Teaching Format: ${data.format || "Classroom instruction"}

Teaching Methods: ${data.methods || "Interactive and engaging approaches"}

${data.prerequisites ? `Prerequisites: ${data.prerequisites}` : ""}
${data.assessment ? `Assessment Method: ${data.assessment}` : ""}

Include:
- Detailed lesson structure with timing
- Engaging opening and introduction
- Clear explanation of concepts
- Interactive activities and exercises
- Real-world examples and applications
- Assessment and evaluation methods
- Resources and materials needed
- Differentiation for various learning styles`
      },

      productivity: () => {
        return `Create a personalized productivity system for someone focused on ${data.focusArea || "general productivity improvement"} with a ${data.workStyle || "professional"} work style.

Current Challenges: ${data.challenges || "Productivity obstacles to address"}

Available Time: ${data.timeAvailable || "Time commitment for implementation"}

Productivity Goals: ${data.goals || "Specific outcomes desired"}

${data.currentTools ? `Current Tools: ${data.currentTools}` : ""}
${data.obstacles ? `Main Obstacles: ${data.obstacles}` : ""}
${data.preferences ? `Learning Preferences: ${data.preferences}` : ""}

Provide:
- Customized productivity framework
- Step-by-step implementation guide
- Recommended tools and techniques
- Daily/weekly routines and habits
- Progress tracking methods
- Troubleshooting common issues
- Optimization strategies for long-term success
- Specific action items to get started`
      },

      "portfolio-builder": () => {
        return `Create a comprehensive ${data.style || "modern and professional"} portfolio for a ${data.profession || "developer"} with ${data.experience || "mid-level"} experience.

Technical Skills: ${data.skills || "List your main technical skills"}

Key Projects: ${data.projects || "Describe your best projects"}

Target Audience: ${data.target || "Potential employers and clients"}

Portfolio Goals: ${data.goals || "Showcase skills and attract opportunities"}

${data.sections ? `Sections to Include: ${data.sections}` : ""}

Create a portfolio that includes:
- Compelling hero section with professional introduction
- Skills showcase with visual representations
- Project gallery with detailed case studies
- About section highlighting your journey and expertise
- Contact information and call-to-action
- Responsive design considerations
- SEO optimization for discoverability
- Performance optimization tips
- Personal branding elements
- Professional photography/design recommendations

Focus on creating a portfolio that stands out, tells your story effectively, and converts visitors into opportunities.`
      },

      "startup-advisor": () => {
        return `Develop a comprehensive startup strategy and pitch deck for a ${data.stage || "early-stage"} ${data.industry || "technology"} startup.

Problem Statement: ${data.problem || "Define the problem you're solving"}

Solution: ${data.solution || "Describe your innovative solution"}

Target Market: ${data.market || "Define your ideal customers and market size"}

${data.competition ? `Competition Analysis: ${data.competition}` : ""}
${data.funding ? `Funding Goal: ${data.funding}` : ""}
${data.traction ? `Current Traction: ${data.traction}` : ""}

Create a comprehensive startup package including:
- Executive summary and elevator pitch
- Market analysis and opportunity assessment
- Business model and revenue streams
- Competitive analysis and differentiation
- Go-to-market strategy
- Financial projections and funding requirements
- Team structure and hiring plan
- Risk assessment and mitigation strategies
- Investor pitch deck (10-15 slides)
- Product roadmap and development timeline
- Marketing and customer acquisition strategy

Focus on creating compelling, data-driven content that attracts investors and validates your business concept.`
      },

      "social-media": () => {
        return `Create a comprehensive ${data.platform || "multi-platform"} social media strategy for ${data.niche || "your niche"} content targeting ${data.audience || "your ideal audience"}.

Content Type: ${data.contentType || "Mixed content formats"}
Brand Voice: ${data.tone || "Authentic and engaging"}
Content Goals: ${data.goals || "Build audience and engagement"}

Content Topics: ${data.topics || "Relevant and engaging topics"}

${data.frequency ? `Posting Frequency: ${data.frequency}` : ""}

Develop a complete social media strategy including:
- Content calendar with post ideas and themes
- Platform-specific optimization strategies
- Hashtag research and strategy
- Engagement tactics and community building
- Visual content guidelines and templates
- Caption templates and writing formulas
- Trending topics and viral content ideas
- Influencer collaboration opportunities
- Analytics and performance tracking
- Growth hacking techniques
- User-generated content campaigns
- Cross-platform promotion strategies

Focus on creating authentic, engaging content that builds a loyal community and drives meaningful results.`
      },

      "ai-automation": () => {
        return `Design a comprehensive AI automation solution for ${data.automationType || "business process automation"} at ${data.complexity || "intermediate"} technical level.

Current Process: ${data.currentProcess || "Manual process to be automated"}

Automation Goals: ${data.goals || "Improve efficiency and reduce manual work"}

${data.tools ? `Preferred Tools: ${data.tools}` : ""}
${data.timeframe ? `Implementation Timeline: ${data.timeframe}` : ""}
${data.budget ? `Budget Range: ${data.budget}` : ""}
${data.constraints ? `Constraints: ${data.constraints}` : ""}

Create a complete automation strategy including:
- Process analysis and optimization opportunities
- AI tool selection and integration plan
- Workflow design and automation architecture
- Step-by-step implementation guide
- Cost-benefit analysis and ROI projections
- Risk assessment and fallback procedures
- Training and change management plan
- Performance monitoring and optimization
- Scalability considerations
- Security and compliance requirements
- Maintenance and update procedures
- Integration with existing systems

Focus on creating practical, implementable automation solutions that deliver measurable value and efficiency gains.`
      },
    }

    const generator = templates[categoryId]
    return generator ? generator() : "Please provide more details to generate a customized prompt."
  }

  const requiredFields = category.fields.filter((field) => field.required)
  const isFormValid = requiredFields.every((field) => formData[field.name])

  return (
    <Card className="w-full bg-white/80 backdrop-blur-sm border-2">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-xl sm:text-2xl">
            {category.icon}
          </div>
          <div>
            <CardTitle className="text-lg sm:text-2xl">{category.title}</CardTitle>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">{category.description}</p>
          </div>
        </div>
        <Badge variant="secondary" className="mx-auto text-xs">
          {category.fields.length} customizable fields
        </Badge>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {category.fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name} className="flex items-center gap-2 text-sm sm:text-base">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </Label>

                {field.type === "text" && (
                  <Input
                    id={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    required={field.required}
                    className="h-12 sm:h-10 text-base sm:text-sm touch-manipulation"
                  />
                )}

                {field.type === "textarea" && (
                  <Textarea
                    id={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    required={field.required}
                    rows={3}
                    className="text-base sm:text-sm touch-manipulation resize-none"
                  />
                )}

                {field.type === "select" && (
                  <select
                    id={field.name}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    required={field.required}
                    className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base sm:text-sm touch-manipulation"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-4 sm:pt-6">
            <Button
              type="submit"
              disabled={!isFormValid || isGenerating}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 h-12 sm:h-auto touch-manipulation"
            >
              {isGenerating ? (
                <>
                  <Wand2 className="h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Optimized Prompt
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
