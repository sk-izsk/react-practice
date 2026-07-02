import { Input, Select, Space, type SelectProps } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { useDebounce } from '../hooks/useDebounce'
import { useGetBreweryMeta } from '../hooks/web/useGetBreweryMeta'

interface Props {}

export const BreweryFilterBar: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const countryParam = searchParams.get('country') || ''
  const typeParam = searchParams.get('type') || ''
  const stateParam = searchParams.get('state') || ''
  const [search, setSearch] = useState<string>(searchParams.get('name') || '')
  const debouncedSearch = useDebounce(search, 500)
  const { data, isLoading: isMetaLoading } = useGetBreweryMeta({
    byCountry: countryParam || undefined,
  })
  const { types, states, countries } = useMemo(() => {
    const types: SelectProps['options'] = Object.keys(data?.by_type ?? {}).map((type) => ({
      label: type,
      value: type,
    }))

    const states: SelectProps['options'] = Object.keys(data?.by_state ?? {}).map((state) => ({
      label: state,
      value: state,
    }))

    const countries: SelectProps['options'] = Object.keys(data?.by_country ?? {}).map(
      (country) => ({
        label: country,
        value: country,
      }),
    )

    return { types, states, countries }
  }, [data])

  const handleSelect = useCallback(
    (key: string, value: string) => {
      setSearchParams((params) => {
        if (value) {
          params.set(key, value)
          params.set('page', '1')
        } else {
          params.delete(key)
          params.delete('page')
        }
        return params
      })
    },
    [setSearchParams],
  )

  useEffect(() => {
    setSearchParams((params) => {
      if (debouncedSearch) {
        params.set('name', debouncedSearch)
        params.set('page', '1')
      } else {
        params.delete('name')
        params.delete('page')
      }
      return params
    })
  }, [debouncedSearch, setSearchParams])

  useEffect(() => {
    setSearchParams((params) => {
      if (data?.total) {
        params.set('total', String(data.total))
      } else {
        params.delete('total')
      }
      return params
    })
  }, [data?.total, setSearchParams])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  return (
    <Space orientation="horizontal" style={{ width: '100%', justifyContent: 'space-between' }}>
      <Input
        placeholder="Search by name"
        style={{ width: 300 }}
        allowClear
        value={search}
        onChange={handleSearchChange}
      />
      <Space>
        <Select
          placeholder="Filter by type"
          options={types}
          onChange={(value) => handleSelect('type', value)}
          allowClear
          style={{ width: 200 }}
          showSearch
          loading={isMetaLoading}
          value={typeParam || undefined}
        />
        <Select
          placeholder="Filter by state"
          options={states}
          onChange={(value) => handleSelect('state', value)}
          allowClear
          style={{ width: 200 }}
          showSearch
          loading={isMetaLoading}
          value={stateParam || undefined}
        />
        <Select
          placeholder="Filter by country"
          options={countries}
          onChange={(value) => handleSelect('country', value)}
          allowClear
          style={{ width: 200 }}
          showSearch
          loading={isMetaLoading}
          value={countryParam || undefined}
        />
      </Space>
    </Space>
  )
}
