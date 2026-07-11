import { type TableColumnType } from 'antd'
import { ProductDummyActionRenderer } from '../../components/ProductDummyActionRenderer'
import type { DummyProduct } from '../../types/dummyJsonApi'

interface UseBigListProductColumnProps {
  setPendingRowId: (id: number | null) => void
}

export const useBigListProductColumn = ({
  setPendingRowId,
}: UseBigListProductColumnProps): TableColumnType<DummyProduct>[] => {
  return [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'id',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      key: 'action',
      render: (record) => (
        <ProductDummyActionRenderer record={record} setPendingRowId={setPendingRowId} />
      ),
    },
  ]
}
