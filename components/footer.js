"use client"

import { Heart, Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 mt-auto">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PP</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                PROMPTPAL PRO
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Your AI-powered prompt generation assistant. Create professional, optimized prompts for any AI tool.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                className="w-8 h-8 bg-gray-100 hover:bg-purple-100 rounded-full flex items-center justify-center transition-colors"
              >
                <Github className="h-4 w-4 text-gray-600 hover:text-purple-600" />
              </a>
              <a
                href="https://twitter.com"
                className="w-8 h-8 bg-gray-100 hover:bg-purple-100 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="h-4 w-4 text-gray-600 hover:text-purple-600" />
              </a>
              <a
                href="https://linkedin.com"
                className="w-8 h-8 bg-gray-100 hover:bg-purple-100 rounded-full flex items-center justify-center transition-colors"
              >
                <Linkedin className="h-4 w-4 text-gray-600 hover:text-purple-600" />
              </a>
              <a
                href="mailto:hello@promptpal.pro"
                className="w-8 h-8 bg-gray-100 hover:bg-purple-100 rounded-full flex items-center justify-center transition-colors"
              >
                <Mail className="h-4 w-4 text-gray-600 hover:text-purple-600" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">AI Assistants</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span>📸</span>
                <span>AI Photo Generator</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📄</span>
                <span>Resume Builder</span>
              </li>
              <li className="flex items-center gap-2">
                <span>💻</span>
                <span>Code Assistant</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✍️</span>
                <span>Content Writer</span>
              </li>
              <li className="flex items-center gap-2">
                <span>💼</span>
                <span>Business Strategist</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📈</span>
                <span>Marketing Expert</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🎓</span>
                <span>Learning Coach</span>
              </li>
              <li className="flex items-center gap-2">
                <span>⚡</span>
                <span>Productivity Guru</span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">
                  Prompt Library
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">
                  Best Practices
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">
                  AI Tool Guides
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">
                  Feature Requests
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 text-center sm:text-left">© 2024 PromptPal Pro. All rights reserved.</p>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>for AI enthusiasts</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
