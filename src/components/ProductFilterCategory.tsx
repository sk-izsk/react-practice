import { notification, Select, type SelectProps } from 'antd'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { useGetCategoriesProducts } from '../hooks/web/useGetCategories'

interface Props {}

export const ProductFilterCategory: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { data: categories, isLoading, isError, error } = useGetCategoriesProducts()
  const options = useMemo<SelectProps['options']>(
    () => categories?.map((category) => ({ value: category, label: category })),
    [categories],
  )

  useEffect(() => {
    if (isError) {
      notification.error({
        title: 'Error In category list',
        description: error.message,
      })
    }
  }, [isError, error])

  const handleCategory: SelectProps['onChange'] = useCallback(
    (value) => {
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
      placeholder="Select a category"
      loading={isLoading}
      allowClear
      options={options}
      size="large"
      onChange={handleCategory}
      value={searchParams.get('category')}
      style={{ width: '200px' }}
    />
  )
}
