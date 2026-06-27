import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { useDebounce } from '../hooks/useDebounce'
import { Input } from './ui/input'

interface Props {}

export const DummyProductInputShadcn: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const debouncedSearch = useDebounce(search, 500)

  console.log('first')

  useEffect(() => {
    setSearchParams((params) => {
      const value = debouncedSearch.trim()
      if (value) {
        params.set('search', value)
      } else {
        params.delete('search')
      }
      return params
    })
  }, [debouncedSearch, searchParams, setSearchParams])
  return (
    <>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
      />
    </>
  )
}
