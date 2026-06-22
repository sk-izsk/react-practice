import { useInfiniteQuery } from '@tanstack/react-query'
import { jsonPlaceholderApi } from '../../api/ky.jsonPlaceHolder'
import type { Comment } from '../../types/jsonPlaceHolder'

interface UseGetCommentsProps {
  search?: string
}

const PAGE_SIZE = 10

const getComments = (page: number, search?: string) => {
  const searchQuery = search ? `&q=${search}` : ''
  return jsonPlaceholderApi.get<Comment[]>(
    `/comments?_page=${page}&_limit=${PAGE_SIZE}${searchQuery}`,
  )
}

export const useGetComments = ({ search }: UseGetCommentsProps = {}) => {
  return useInfiniteQuery({
    queryKey: ['comments', search],
    queryFn: ({ pageParam = 1 }) => getComments(pageParam, search),

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) {
        return undefined
      }
      return allPages.length + 1
    },
    initialPageParam: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
