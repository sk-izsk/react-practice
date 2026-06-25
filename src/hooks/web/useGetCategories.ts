import { useQuery } from '@tanstack/react-query'
import { fakeStoreApi } from '../../api/ky.fakeStoreApi'
import type { Category } from '../../types/fakeStoreApi'

const getProductCategories = () => fakeStoreApi.get<Category[]>('/products/categories')

export const useGetCategoriesProducts = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getProductCategories,
  })
}
