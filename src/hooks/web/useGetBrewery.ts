import { useQuery } from '@tanstack/react-query'
import { breweryApi } from '../../api/ky.openBreweryDb'
import type { Brewery } from '../../types/breweryApi'

export type BrewerySort = 'name:asc' | 'name:desc' | 'state_province:asc' | 'state_province:desc'

interface GetBreweryFilterProps {
  search?: string
  perPage?: number
  page?: number
  byState?: string
  byType?: string
  byCountry?: string
  sort?: BrewerySort
}
const getBrewery = ({
  search,
  perPage,
  page,
  byState,
  byType,
  byCountry,
  sort,
}: GetBreweryFilterProps) => {
  const params = new URLSearchParams()

  if (search) {
    params.set('by_name', search)
  }

  if (perPage) {
    params.set('per_page', perPage.toString())
  }

  if (page) {
    params.set('page', page.toString())
  }

  if (byState) {
    params.set('by_state', byState)
  }

  if (byType) {
    params.set('by_type', byType)
  }

  if (byCountry) {
    params.set('by_country', byCountry)
  }

  if (sort) {
    params.set('sort', sort)
  }

  return breweryApi.get<Brewery[]>(`breweries?${params.toString()}`)
}

export const useGetBrewery = ({
  search,
  perPage = 20,
  page,
  byState,
  byType,
  byCountry,
  sort,
}: GetBreweryFilterProps) => {
  return useQuery({
    queryKey: ['breweries', { search, perPage, page, byState, byType, byCountry, sort }],
    queryFn: () => getBrewery({ search, perPage, page, byState, byType, byCountry, sort }),
  })
}
