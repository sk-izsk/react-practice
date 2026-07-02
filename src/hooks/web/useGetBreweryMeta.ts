import { useQuery } from '@tanstack/react-query'
import { breweryApi } from '../../api/ky.openBreweryDb'
import type { BreweryMetaData } from '../../types/breweryApi'

interface GetBreweryMetaProps {
  byCountry?: string
}

const getBreweryMeta = ({ byCountry }: GetBreweryMetaProps) => {
  const params = new URLSearchParams()

  if (byCountry) {
    params.set('by_country', byCountry)
  }
  return breweryApi.get<BreweryMetaData>(`/breweries/meta?${params.toString()}`)
}

export const useGetBreweryMeta = ({ byCountry }: GetBreweryMetaProps) => {
  return useQuery({
    queryKey: ['breweryMeta', byCountry],
    queryFn: () => getBreweryMeta({ byCountry }),
  })
}
