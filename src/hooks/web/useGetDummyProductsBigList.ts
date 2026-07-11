import { useQuery } from '@tanstack/react-query'
import { dummyJsonApi } from '../../api/ky.dummyJson'
import type { DummyProduct, DummyProductsResponse } from '../../types/dummyJsonApi'

interface GetDummyProducts {
  category?: string
  limit?: number
  select?: (keyof DummyProduct)[]
}

const getDummyProducts = (params: GetDummyProducts = {}) => {
  const { category, limit = 0, select } = params

  const url = new URLSearchParams()

  if (typeof limit === 'number') {
    url.set('limit', limit.toString())
  }

  if (select?.length) {
    url.set('select', select.join(','))
  }

  const path = category ? `/products/category/${category}` : '/products'

  const query = url.toString()

  return dummyJsonApi.get<DummyProductsResponse>(`${path}${query ? `?${query}` : ''}`)
}

export const useGetDummyProductsBigList = (params: GetDummyProducts = {}) => {
  const { category, limit = 0, select } = params
  return useQuery({
    queryKey: ['dummyProductsBigList', category, limit, select],
    queryFn: () =>
      getDummyProducts({
        category,
        limit,
        select,
      }),
  })
}
