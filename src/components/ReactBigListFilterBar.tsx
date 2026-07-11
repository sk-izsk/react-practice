import { Input, Select, Space } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { useDebounce } from '../hooks/useDebounce'
import { useGetDummyProductCategory } from '../hooks/web/useGetDummyProductCategory'

interface Props {}

export const ReactBigListFilterBar: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const category = searchParams.get('category') || ''
  const debouncedSearch = useDebounce(search, 500)
  const { data: categories, isLoading } = useGetDummyProductCategory()
  const categoryOptions = useMemo(() => {
    return categories?.map((category) => {
      return { label: category.name, value: category.slug }
    })
  }, [categories])

  useEffect(() => {
    setSearchParams((params) => {
      if (debouncedSearch) {
        params.set('search', debouncedSearch)
      } else {
        params.delete('search')
      }

      return params
    })
  }, [debouncedSearch, setSearchParams])

  const handleCategoryChange = useCallback(
    (value: string) => {
      setSearchParams((params) => {
        if (value) {
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
    <Space
      orientation="horizontal"
      style={{
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Input
        placeholder="Search..."
        style={{ width: 200 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        allowClear
      />
      <Select
        placeholder="Category"
        loading={isLoading}
        options={categoryOptions}
        style={{ width: 200 }}
        onChange={handleCategoryChange}
        value={category || undefined}
        allowClear
      />
    </Space>
  )
}
