import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'
import { dummyJsonApi } from '../../api/ky.dummyJson'
import type { DummyProduct, DummyProductsResponse } from '../../types/dummyJsonApi'

const deleteDummyProduct = ({ id }: { id: number }) => {
  return dummyJsonApi.delete(`/products/${id}`)
}

export const useDeleteDummyProduct = (category?: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['dummyProducts'],
    mutationFn: deleteDummyProduct,
    onSuccess: (_, variables) => {
      const { id } = variables
      queryClient.setQueryData(
        ['dummyProducts', category],
        (oldData: DummyProductsResponse | undefined) => {
          if (!oldData) {
            return oldData
          }
          const updatedProducts = oldData.products.filter(
            (product: DummyProduct) => product.id !== id,
          )
          return {
            ...oldData,
            products: updatedProducts,
            total: updatedProducts.length,
          }
        },
      )
    },
    onError: () => {
      notification.error({
        title: 'Error',
        description: 'Failed to delete the product. Please try again.',
      })
    },
  })
}
