import { useQuery } from '@tanstack/react-query'
import { jsonPlaceholderApi } from '../../api/ky.jsonPlaceHolder'
import type { Photo } from '../../types/jsonPlaceHolder'

const getPhotos = () => {
  return jsonPlaceholderApi.get<Photo[]>('/photos')
}

export const useGetPhotos = ({ key }: { key: string }) => {
  return useQuery({
    queryKey: ['photos', key],
    queryFn: getPhotos,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
