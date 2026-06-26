import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { dummyJsonApi } from '../../api/ky.dummyJson'
import type { DummyProduct, DummyProductsResponse } from '../../types/dummyJsonApi'

const addDummyProduct = (data: Partial<DummyProduct>) => {
  return dummyJsonApi.post<DummyProduct, Partial<DummyProduct>>('/products/add', data)
}

export const useAddDummyProduct = () => {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category') || undefined

  return useMutation({
    mutationFn: addDummyProduct,
    onSuccess: (data) => {
      queryClient.setQueryData(['dummyProducts', category], (oldData: DummyProductsResponse) => {
        if (!oldData) {
          return oldData
        }

        if (category && data.category !== category) {
          return oldData
        }

        return {
          ...oldData,
          products: [data, ...oldData.products],
          total: oldData.total + 1,
        }
      })
    },
  })
}
