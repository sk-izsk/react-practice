import { useQuery } from '@tanstack/react-query'
import { dummyJsonApi } from '../../api/ky.dummyJson'
import type { DummyProductCategory } from '../../types/dummyJsonApi'

const getDummyProductCategory = () => {
  return dummyJsonApi.get<DummyProductCategory[]>('/products/categories')
}

export const useGetDummyProductCategory = () => {
  return useQuery({
    queryKey: ['dummyProductCategory'],
    queryFn: () => getDummyProductCategory(),
  })
}
