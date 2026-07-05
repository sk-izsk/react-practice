import { SmileOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { Space, Table, type TableProps } from 'antd'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router'
import { useBreweryColumns } from '../hooks/columns/useBreweryColumns'
import { useTriggerError } from '../hooks/useTriggerError'
import { useGetBrewery, type BrewerySort } from '../hooks/web/useGetBrewery'
import type { Brewery } from '../types/breweryApi'
import { BreweryReadDrawer } from './BreweryReadDrawer'

interface Props {}

export const BreweryTableContainer: React.FC<Props> = () => {
  const queryClient = useQueryClient()
  const [selectedBrewery, setSelectedBrewery] = useState<Brewery | null>(null)
  const columns = useBreweryColumns({ setSelectedBrewery })
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('name') || ''
  const type = searchParams.get('type') || ''
  const state = searchParams.get('state') || ''
  const country = searchParams.get('country') || ''
  const page = Number(searchParams.get('page')) || 1
  const total = Number(searchParams.get('total')) || 0
  const sort = searchParams.get('sort') || ''
  const order = searchParams.get('order') || ''
  const apiOrder = order === 'ascend' ? 'asc' : order === 'descend' ? 'desc' : undefined

  const metaData = queryClient.getQueryData(['breweryMeta', country])
  console.log('metaData: ', metaData)

  const {
    data: breweries,
    isLoading,
    isError,
  } = useGetBrewery({
    search,
    byType: type,
    byState: state,
    byCountry: country,
    page,
    sort: sort && apiOrder ? (`${sort}:${apiOrder}` as BrewerySort) : undefined,
  })
  console.log('breweries: ', breweries)

  const handleTableChange: TableProps<Brewery>['onChange'] = (pagination, _, sorter) => {
    if (Array.isArray(sorter)) {
      return
    }

    setSearchParams((params) => {
      if (pagination.current) {
        params.set('page', String(pagination.current))
      } else {
        params.delete('page')
      }

      if (typeof sorter.columnKey === 'string' && sorter.order) {
        params.set('sort', sorter.columnKey)
        params.set('order', sorter.order)
      } else {
        params.delete('sort')
        params.delete('order')
      }

      return params
    })
  }

  useTriggerError({
    isError,
    title: 'Error',
    description: 'Failed to fetch breweries',
  })

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
        locale={{
          emptyText: (
            <div style={{ textAlign: 'center' }}>
              <SmileOutlined style={{ fontSize: 20 }} />
              <p>Data Not Found</p>
            </div>
          ),
        }}
      />
      {selectedBrewery && (
        <BreweryReadDrawer
          data={selectedBrewery}
          open={!!selectedBrewery}
          onClose={() => setSelectedBrewery(null)}
        />
      )}
    </Space>
  )
}
