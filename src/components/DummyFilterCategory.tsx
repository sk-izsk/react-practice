import { Select } from 'antd'
import React, { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { useTriggerError } from '../hooks/useTriggerError'
import { useGetDummyProductCategory } from '../hooks/web/useGetDummyProductCategory'

interface Props {}

export const DummyFilterCategory: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { data: categories, isLoading, isError } = useGetDummyProductCategory()

  const data = useMemo(() => {
    return categories?.map((category) => ({
      label: category.name,
      value: category.slug,
    }))
  }, [categories])

  useTriggerError({
    isError,
    title: 'Error',
    description: 'Failed to fetch categories',
  })

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
    <Select
      style={{
        width: '200px',
      }}
      allowClear
      placeholder="Select category"
      options={data}
      onChange={handleCategoryChange}
      loading={isLoading}
      value={searchParams.get('category') || undefined}
    />
  )
}
