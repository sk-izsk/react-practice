import { notification, Popconfirm } from 'antd'
import React, { useCallback } from 'react'
import { useSearchParams } from 'react-router'
import { useDeleteDummyProduct } from '../hooks/web/useDeleteDummyProduct'
import type { DummyProduct } from '../types/dummyJsonApi'

interface Props {
  handleProductDelete?: (data: DummyProduct) => void
  data: DummyProduct
  setPendingRowId: (id: number | null) => void
}

export const DummyProductDeletePopConfirm: React.FC<Props> = ({
  handleProductDelete,
  data,
  setPendingRowId,
}) => {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category') || undefined
  const { mutate: deleteProduct } = useDeleteDummyProduct(category)

  const handleDelete = useCallback(
    (id: number) => {
      setPendingRowId(id)
      deleteProduct(
        { id },
        {
          onSuccess: () => {
            notification.success({
              message: 'Product deleted successfully',
              description: `Product with ID ${id} has been deleted.`,
            })
            if (handleProductDelete) {
              handleProductDelete(data)
            }
          },
          onError: () => {
            notification.error({
              message: 'Error deleting product',
              description: `There was an error deleting the product with ID ${id}. Please try again.`,
            })
          },
          onSettled: () => {
            setPendingRowId(null)
          },
        },
      )
    },
    [deleteProduct, setPendingRowId, handleProductDelete, data],
  )

  return (
    <Popconfirm
      title="Delete product?"
      description={`Delete ${data.title}?`}
      okText="Delete"
      cancelText="Cancel"
      onConfirm={() => handleDelete(data.id)}
    >
      <span>Delete</span>
    </Popconfirm>
  )
}
