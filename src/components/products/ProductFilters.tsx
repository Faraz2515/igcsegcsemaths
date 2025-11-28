'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { X } from 'lucide-react'

interface ProductFiltersProps {
  examBoards?: string[]
  levels?: string[]
  tiers?: string[]
  years?: string[]
}

export function ProductFilters({
  examBoards = ['Edexcel', 'Cambridge'],
  levels = ['GCSE', 'IGCSE'],
  tiers = ['Foundation', 'Higher', 'Core', 'Extended'],
  years = ['2024', '2023', '2022', '2021', '2020'],
}: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentExamBoard = searchParams.get('exam_board') || ''
  const currentLevel = searchParams.get('level') || ''
  const currentTier = searchParams.get('tier') || ''
  const currentYear = searchParams.get('year') || ''

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push(window.location.pathname)
  }

  const hasFilters = currentExamBoard || currentLevel || currentTier || currentYear

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Exam Board</Label>
          <Select value={currentExamBoard || 'all'} onValueChange={(v) => updateFilter('exam_board', v)}>
            <SelectTrigger>
              <SelectValue placeholder="All Exam Boards" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Exam Boards</SelectItem>
              {examBoards.map((board) => (
                <SelectItem key={board} value={board}>{board}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Level</Label>
          <Select value={currentLevel || 'all'} onValueChange={(v) => updateFilter('level', v)}>
            <SelectTrigger>
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Tier</Label>
          <Select value={currentTier || 'all'} onValueChange={(v) => updateFilter('tier', v)}>
            <SelectTrigger>
              <SelectValue placeholder="All Tiers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              {tiers.map((tier) => (
                <SelectItem key={tier} value={tier}>{tier}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Year</Label>
          <Select value={currentYear || 'all'} onValueChange={(v) => updateFilter('year', v)}>
            <SelectTrigger>
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
