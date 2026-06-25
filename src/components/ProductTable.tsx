import { SmileOutlined } from '@ant-design/icons'
import { notification, Table, type TableProps } from 'antd'
import type { TableRowSelection } from 'antd/es/table/interface'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { useProductsColumn } from '../hooks/columns/useProductsColumn'
import { useGetProducts } from '../hooks/web/useGetProducts'
import type { Category, Product } from '../types/fakeStoreApi'

interface Props {}

export const ProductTable: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search')
  const category = searchParams.get('category')
  const selectedItems = searchParams.get('selected-items')

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetProducts(category as Category | undefined)

  const filteredProduct = useMemo(
    () =>
      products?.filter((product) =>
        product.title.toLowerCase().includes(search?.toLowerCase() || ''),
      ),
    [search, products],
  )

  useEffect(() => {
    if (isError) {
      notification.error({
        title: 'Error In product list',
        description: error.message,
      })
    }
  }, [isError, error])

  const handleTableChange: TableProps<Product>['onChange'] = useCallback(
    (pagination, _, sorter) => {
      if (Array.isArray(sorter)) {
        return
      }

      setSearchParams((params) => {
        if (typeof sorter.columnKey === 'string' && sorter.order) {
          params.set('sort-by', sorter.columnKey)
          params.set('sort-order', sorter.order)
        } else {
          params.delete('sort-by')
          params.delete('sort-order')
        }

        if (pagination.current && pagination.pageSize) {
          params.set('page', String(pagination.current))
        } else {
          params.delete('page')
        }

        return params
      })
    },
    [setSearchParams],
  )

  const onSelectChange = useCallback(
    (newSelectedRowKeys: React.Key[]) => {
      setSearchParams((params) => {
        if (newSelectedRowKeys.length > 0) {
          params.set('selected-items', newSelectedRowKeys.join(','))
        } else {
          params.delete('selected-items')
        }
        return params
      })
    },
    [setSearchParams],
  )

  const selectedRowKeys = useMemo(
    () => selectedItems?.split(',').map(Number) ?? [],
    [selectedItems],
  )

  const totalPrice = useMemo(() => {
    if (!filteredProduct?.length || !selectedRowKeys.length) {
      return 0
    }

    const selectedSet = new Set(selectedRowKeys)

    return filteredProduct.reduce((sum, product) => {
      return selectedSet.has(product.id) ? sum + product.price : sum
    }, 0)
  }, [filteredProduct, selectedRowKeys])

  const columns = useProductsColumn(totalPrice)

  const rowSelection: TableRowSelection<Product> = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  return (
    <Table<Product>
      rowSelection={rowSelection}
      columns={columns}
      loading={isLoading}
      dataSource={filteredProduct}
      rowKey="id"
      pagination={{
        total: filteredProduct?.length,
        current: Number(searchParams.get('page')) || 1,
      }}
      onChange={handleTableChange}
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
