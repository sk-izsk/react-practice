import { Table } from 'antd'
import React, { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { useBigListProductColumn } from '../hooks/columns/useBigListProductColumn'
import { useGetDummyProductsBigList } from '../hooks/web/useGetDummyProductsBigList'

interface Props {}

export const ReactBigListTableContainer: React.FC<Props> = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const columns = useBigListProductColumn({
    setPendingRowId: (id) => {},
  })

  const { data, isLoading } = useGetDummyProductsBigList({
    category,
  })

  const productList = useMemo(() => {
    return data?.products.filter((product) => {
      return product.title.toLowerCase().includes(search.toLowerCase())
    })
  }, [search, data?.products])

  return (
    <Table
      virtual
      scroll={{ y: 700 }}
      dataSource={productList}
      columns={columns}
      pagination={false}
      rowKey="id"
      loading={isLoading}
    />
  )
}
