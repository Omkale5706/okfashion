"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export function SearchBar({ placeholder = "Search...", onSearch, className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query)
    }
  }

  const handleClear = () => {
    setQuery("")
    if (onSearch) {
      onSearch("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  )
}
