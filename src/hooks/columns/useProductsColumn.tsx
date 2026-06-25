import { type TableColumnType } from 'antd'
import type { SortOrder } from 'antd/es/table/interface'
import { useSearchParams } from 'react-router'
import { ProductTitleRenderer } from '../../components/ProductTitleRenderer'
import type { Product } from '../../types/fakeStoreApi'

export const useProductsColumn = (totalPrice?: number): TableColumnType<Product>[] => {
  const [searchParams] = useSearchParams()
  const sortBy = searchParams.get('sort-by')
  const sortOrder = (searchParams.get('sort-order') as SortOrder) || undefined

  return [
    {
      title: () => <ProductTitleRenderer totalPrice={totalPrice} />,
      dataIndex: 'title',
      key: 'id',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (prevItem, nextItem) => prevItem.price - nextItem.price,
      sortOrder: sortBy === 'price' ? sortOrder : undefined,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      sorter: (a, b) => a.rating.rate - b.rating.rate,
      render: (_, record) => record.rating.rate,
      sortOrder: sortBy === 'rating' ? sortOrder : undefined,
    },
  ]
}
