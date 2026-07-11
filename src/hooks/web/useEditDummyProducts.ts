import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { dummyJsonApi } from '../../api/ky.dummyJson'
import type { DummyProduct, DummyProductsResponse } from '../../types/dummyJsonApi'

const editDummyProduct = (data: Partial<DummyProduct>) => {
  return dummyJsonApi.put<DummyProduct, Partial<DummyProduct>>(`/products/${data.id}`, data)
}

export const useEditDummyProduct = () => {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category') || undefined

  return useMutation({
    mutationFn: editDummyProduct,
    onSuccess: (data) => {
      const updateProducts = (oldData: DummyProductsResponse | undefined) => {
        if (!oldData) {
          return oldData
        }

        return {
          ...oldData,
          products: oldData.products.map((product) =>
            product.id === data.id ? { ...product, ...data } : product,
          ),
        }
      }

      queryClient.setQueryData(['dummyProducts', category], updateProducts)

      queryClient.setQueriesData(
        {
          predicate: (query) => query.queryKey[0] === 'dummyProductsBigList',
        },
        updateProducts,
      )
    },
  })
}
