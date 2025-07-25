export function generatePrompt(category: string, formData: Record<string, string>): string {
  switch (category) {
    case "coding":
      return `You are an expert ${formData.language || "programming"} developer. I need help with the following coding task:

Problem: ${formData.problem || "Not specified"}
Skill Level: ${formData.level || "intermediate"}
Programming Language: ${formData.language || "any suitable language"}

Please provide:
1. A clear, well-commented solution
2. Explanation of the approach and logic
3. Best practices and optimization tips
4. Alternative approaches if applicable
5. Common pitfalls to avoid

Make sure the code is production-ready and follows industry standards.`

    case "resume":
      return `You are a professional career coach and resume expert. Help me create a compelling resume for the following position:

Job Title: ${formData.jobTitle || "Not specified"}
Industry: ${formData.industry || "Not specified"}
Experience Level: ${formData.experience || "Not specified"}
Key Skills: ${formData.skills || "Not specified"}

Please provide:
1. A professional summary that highlights my strengths
2. Optimized work experience descriptions with quantifiable achievements
3. Skills section tailored to the target role
4. Industry-specific keywords for ATS optimization
5. Formatting and structure recommendations
6. Tips for customizing the resume for specific job applications

Focus on making the resume stand out while maintaining professionalism and relevance to the target position.`

    case "social-media":
      return `You are a social media marketing expert specializing in ${formData.platform || "various platforms"}. Create engaging content for:

Platform: ${formData.platform || "Not specified"}
Topic/Theme: ${formData.topic || "Not specified"}
Tone: ${formData.tone || "professional"}
Target Audience: ${formData.audience || "general audience"}

Please provide:
1. ${formData.platform === "twitter" ? "3-5 tweet variations" : "Multiple post variations"}
2. Relevant hashtags for maximum reach
3. Engagement strategies (questions, calls-to-action)
4. Visual content suggestions
5. Best posting times and frequency recommendations
6. Platform-specific optimization tips

Make the content authentic, engaging, and aligned with current trends while maintaining the specified tone.`

    case "blogging":
      return `You are a professional content writer and SEO expert. Help me create a comprehensive blog post about:

Topic: ${formData.topic || "Not specified"}
Target Keywords: ${formData.keywords || "Not specified"}
Article Length: ${formData.length || "medium"}
Writing Style: ${formData.style || "informative"}

Please provide:
1. An attention-grabbing headline and 3-5 alternative titles
2. A detailed outline with H2 and H3 headings
3. An engaging introduction that hooks readers
4. Key points to cover in each section
5. SEO optimization suggestions (meta description, internal linking opportunities)
6. A compelling conclusion with call-to-action
7. Content promotion strategies

Ensure the content is valuable, well-researched, and optimized for both readers and search engines.`

    case "marketing":
      return `You are a marketing strategist and copywriter. Create compelling marketing content for:

Product/Service: ${formData.topic || "Not specified"}
Target Audience: ${formData.audience || "general audience"}
Tone: ${formData.tone || "professional"}
Marketing Goal: ${formData.goal || "increase awareness"}

Please provide:
1. Compelling headlines and taglines
2. Value proposition statements
3. Key benefits and features to highlight
4. Customer pain points to address
5. Call-to-action suggestions
6. Multi-channel marketing copy (email, ads, landing page)
7. A/B testing recommendations

Focus on persuasive, benefit-driven copy that converts prospects into customers.`

    case "creative":
      return `You are a creative writing mentor and storyteller. Help me develop creative content for:

Genre/Type: ${formData.genre || "general creative writing"}
Theme: ${formData.topic || "Not specified"}
Tone: ${formData.tone || "engaging"}
Target Audience: ${formData.audience || "general readers"}

Please provide:
1. Creative concept and premise development
2. Character development (if applicable)
3. Plot structure and story arc suggestions
4. Dialogue and narrative voice guidance
5. Setting and world-building elements
6. Conflict and resolution ideas
7. Editing and refinement tips

Focus on originality, emotional engagement, and compelling storytelling techniques.`

    case "business":
      return `You are a business consultant and strategic advisor. Help me develop professional business content for:

Business Context: ${formData.topic || "Not specified"}
Industry: ${formData.industry || "Not specified"}
Document Type: ${formData.type || "business document"}
Target Audience: ${formData.audience || "stakeholders"}

Please provide:
1. Executive summary framework
2. Key business objectives and strategies
3. Market analysis and competitive positioning
4. Financial projections and metrics
5. Risk assessment and mitigation strategies
6. Implementation timeline and milestones
7. Professional formatting and presentation tips

Ensure the content is data-driven, strategic, and professionally presented.`

    case "education":
      return `You are an educational specialist and curriculum developer. Create educational content for:

Subject/Topic: ${formData.topic || "Not specified"}
Grade Level: ${formData.level || "Not specified"}
Learning Objectives: ${formData.objectives || "Not specified"}
Teaching Method: ${formData.method || "interactive"}

Please provide:
1. Clear learning objectives and outcomes
2. Lesson structure and timeline
3. Engaging activities and exercises
4. Assessment methods and rubrics
5. Differentiation strategies for various learning styles
6. Resource recommendations and materials
7. Extension activities for advanced learners

Focus on student engagement, comprehension, and practical application of knowledge.`

    default:
      return `You are an expert assistant specializing in ${category}. Please help me with the following:

Topic: ${formData.topic || "Not specified"}
Tone: ${formData.tone || "professional"}
Keywords: ${formData.keywords || "Not specified"}

Please provide comprehensive, well-structured, and actionable content that addresses the topic thoroughly. Include relevant examples, best practices, and practical tips where applicable.`
  }
}
