import { useQuery } from '@tanstack/react-query'
import { fakeStoreApi } from '../../api/ky.fakeStoreApi'
import type { Category, Product } from '../../types/fakeStoreApi'

const getProducts = (category?: Category) =>
  fakeStoreApi.get<Product[]>(category ? `/products/category/${category || ''}` : '/products')

export const useGetProducts = (category?: Category) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: () => getProducts(category),
  })
}
