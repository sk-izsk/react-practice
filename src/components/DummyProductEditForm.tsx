import { notification } from 'antd'
import React, { useCallback } from 'react'
import { useEditDummyProduct } from '../hooks/web/useEditDummyProducts'
import type { DummyProduct } from '../types/dummyJsonApi'
import { DummyProductForm } from './DummyProductForm'

interface Props {
  data: DummyProduct
  isOpen: boolean
  onClose: () => void
  setPendingRowId: (id: number | null) => void
}

export const DummyProductEditForm: React.FC<Props> = ({
  data,
  isOpen,
  onClose,
  setPendingRowId,
}) => {
  const { mutate: editProduct } = useEditDummyProduct()

  const handleEdit = useCallback(
    (data: Partial<DummyProduct>) => {
      setPendingRowId(data.id || null)
      editProduct(data, {
        onSuccess: () => {
          notification.success({
            message: 'Product updated successfully',
            description: `Product with ID ${data.id} has been updated.`,
          })
        },
        onError: () => {
          notification.error({
            message: 'Error updating product',
            description: `There was an error updating the product with ID ${data.id}. Please try again.`,
          })
        },
        onSettled: () => {
          setPendingRowId(null)
        },
      })
    },
    [editProduct, setPendingRowId],
  )

  return (
    <>
      <DummyProductForm isOpen={isOpen} onClose={onClose} data={data} onSubmit={handleEdit} />
    </>
  )
}
