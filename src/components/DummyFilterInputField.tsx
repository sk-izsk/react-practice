import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { useSearchParams } from 'react-router'

interface Props {}

export const DummyFilterInputField: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const debouncedSearch = useDebounce(search, 500)

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
    <Input
      placeholder="Search by title"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      allowClear
      style={{
        width: '300px',
      }}
    />
  )
}
