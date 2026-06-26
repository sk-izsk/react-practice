import { type TableColumnType } from 'antd'
import { ProductDummyActionRenderer } from '../../components/ProductDummyActionRenderer'
import { ProductDummyTitleRenderer } from '../../components/ProductDummyTitleRenderer'
import type { DummyProduct } from '../../types/dummyJsonApi'

export const useDummyProductColumn = (
  totalPrice: number,
  setPendingRowId: (id: number | null) => void,
): TableColumnType<DummyProduct>[] => {
  return [
    {
      title: () => <ProductDummyTitleRenderer totalPrice={totalPrice} />,
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
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      key: 'action',
      render: (record) => (
        <ProductDummyActionRenderer record={record} setPendingRowId={setPendingRowId} />
      ),
    },
  ]
}
