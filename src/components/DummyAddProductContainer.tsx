import { Button, notification } from 'antd'
import React, { useCallback, useState } from 'react'
import { useAddDummyProduct } from '../hooks/web/useAddDummyProducts'
import type { DummyProduct } from '../types/dummyJsonApi'
import { DummyProductForm } from './DummyProductForm'

interface Props {}

export const DummyAddProductContainer: React.FC<Props> = () => {
  const { mutate: addProduct } = useAddDummyProduct()
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  const handleAddProduct = useCallback(
    (data: Partial<DummyProduct>) => {
      addProduct(data, {
        onSuccess: () => {
          notification.success({
            message: 'Product added successfully',
            description: 'A new product has been added.',
          })
          setIsOpenDrawer(false)
        },
      })
    },
    [addProduct],
  )
  return (
    <>
      <Button type="primary" onClick={() => setIsOpenDrawer(true)}>
        Add Product
      </Button>
      <DummyProductForm
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        onSubmit={handleAddProduct}
      />
    </>
  )
}
