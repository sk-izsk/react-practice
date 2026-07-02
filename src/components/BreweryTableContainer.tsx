import { useQueryClient } from '@tanstack/react-query'
import { Space, Table, type TableProps } from 'antd'
import React from 'react'
import { useSearchParams } from 'react-router'
import { useBreweryColumns } from '../hooks/columns/useBreweryColumns'
import { useGetBrewery } from '../hooks/web/useGetBrewery'
import type { Brewery } from '../types/breweryApi'

interface Props {}

export const BreweryTableContainer: React.FC<Props> = () => {
  const queryClient = useQueryClient()
  const columns = useBreweryColumns()
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('name') || ''
  const type = searchParams.get('type') || ''
  const state = searchParams.get('state') || ''
  const country = searchParams.get('country') || ''
  const page = Number(searchParams.get('page')) || 1
  const total = Number(searchParams.get('total')) || 0

  const metaData = queryClient.getQueryData(['breweryMeta', country])
  console.log('metaData: ', metaData)

  const { data: breweries, isLoading } = useGetBrewery({
    search,
    byType: type,
    byState: state,
    byCountry: country,
    page,
  })
  console.log('breweries: ', breweries)

  const handleTableChange: TableProps<Brewery>['onChange'] = (pagination) => {
    setSearchParams((params) => {
      if (pagination.current) {
        params.set('page', String(pagination.current))
      } else {
        params.delete('page')
      }
      return params
    })
  }
  return (
    <Space orientation="vertical" style={{ width: '100%' }}>
      <Table
        columns={columns}
        dataSource={breweries}
        onChange={handleTableChange}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: 20,
          total,
        }}
        loading={isLoading}
      />
    </Space>
  )
}
