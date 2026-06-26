import { SmileOutlined } from '@ant-design/icons'
import { Table } from 'antd'
import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { useDummyProductColumn } from '../hooks/columns/useDummyProductColumn'
import { useTriggerError } from '../hooks/useTriggerError'
import { useGetDummyProducts } from '../hooks/web/useGetDummyProducts'

interface Props {}

export const DummyProductTableContainer: React.FC<Props> = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || undefined
  const category = searchParams.get('category') || undefined
  const [pendingRowId, setPendingRowId] = useState<number | null>(null)
  const { data, isLoading, isError } = useGetDummyProducts(category)

  const products = useMemo(() => {
    return data?.products.filter((product) => {
      const matchesSearch = search
        ? product.title.toLowerCase().includes(search.toLowerCase())
        : true
      return matchesSearch
    })
  }, [data?.products, search])

  const totalPrice = useMemo(() => {
    return products?.reduce((acc, product) => acc + product.price * product.stock, 0) || 0
  }, [products])

  const columns = useDummyProductColumn(totalPrice, setPendingRowId)

  useTriggerError({
    isError,
    title: 'Error',
    description: 'Failed to fetch products',
  })

  return (
    <Table
      loading={isLoading}
      dataSource={products}
      columns={columns}
      rowKey="id"
      rowClassName={(record) => (record.id === pendingRowId ? 'table-row-loading' : '')}
      pagination={false}
      locale={{
        emptyText: (
          <div style={{ textAlign: 'center' }}>
            <SmileOutlined style={{ fontSize: 20 }} />
            <p>Data Not Found</p>
          </div>
        ),
      }}
    />
  )
}
