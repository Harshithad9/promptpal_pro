"use client"

import { Card, CardContent } from "@/components/ui/card"

interface Category {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

interface CategoryCardProps {
  category: Category
  onClick: () => void
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 hover:border-purple-200"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div
          className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center text-white text-xl mb-4`}
        >
          {category.icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
        <p className="text-gray-600 text-sm">{category.description}</p>
      </CardContent>
    </Card>
  )
}
