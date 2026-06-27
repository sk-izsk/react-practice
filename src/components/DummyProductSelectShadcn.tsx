import React, { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { useGetDummyProductCategory } from '../hooks/web/useGetDummyProductCategory'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface Props {}

export const DummyProductSelectShadcn: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category') || ''

  const { data: categories } = useGetDummyProductCategory()

  const data = useMemo(() => {
    return categories?.map((category) => ({
      label: category.name,
      value: category.slug,
    }))
  }, [categories])

  const handleCategoryChange = useCallback(
    (value: string) => {
      setSearchParams((params) => {
        if (value && value !== 'none') {
          params.set('category', value)
        } else {
          params.delete('category')
        }
        return params
      })
    },
    [setSearchParams],
  )

  return (
    <Select onValueChange={handleCategoryChange} value={selectedCategory}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent className="w-[240px] bg-white">
        <SelectItem value={'none'}>Select a category</SelectItem>
        <SelectGroup>
          {data?.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
