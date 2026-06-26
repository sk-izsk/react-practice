import { useQuery } from '@tanstack/react-query'
import { dummyJsonApi } from '../../api/ky.dummyJson'
import type { DummyProductsResponse } from '../../types/dummyJsonApi'

const getDummyProducts = async (category?: string) => {
  let url = `/products${category ? `/category/${category}` : ''}`
  // if (search) {
  //   url = `/products/search?q=${search}`
  // } else if (category) {
  //   url = `/products/category/${category}`
  // } else {
  //   url = '/products'
  // }
  return dummyJsonApi.get<DummyProductsResponse>(url)
}

export const useGetDummyProducts = (category?: string) => {
  return useQuery({
    queryKey: ['dummyProducts', category],
    queryFn: () => getDummyProducts(category),
  })
}
