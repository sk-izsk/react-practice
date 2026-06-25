import { Input } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { useDebounce } from '../hooks/useDebounce'

interface Props {}

export const ProductFilterInput: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState<string>(searchParams.get('search') ?? '')

  const debouncedSearch = useDebounce(search, 500)

  const handleSearch = useCallback(
    (value: string) => {
      setSearchParams((params) => {
        if (value.trim()) {
          setSearch(value)
        } else {
          setSearch('')
        }
        return params
      })
    },
    [setSearchParams],
  )

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

  return (
    <Input
      style={{ width: '300px' }}
      size="large"
      value={search}
      onChange={(event) => handleSearch(event.target.value)}
    />
  )
}
