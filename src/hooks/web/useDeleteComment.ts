import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'
import { jsonPlaceholderApi } from '../../api/ky.jsonPlaceHolder'
import type { Comment } from '../../types/jsonPlaceHolder'

export interface CommentsInfiniteData {
  pages: Comment[][]
  pageParams: number[]
}

const deleteComment = (id: number) => {
  return jsonPlaceholderApi.delete<{}>(`/comments/${id}`)
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteComment'],
    mutationFn: deleteComment,
    onSuccess: (_, id) => {
      queryClient.setQueriesData(
        { queryKey: ['comments'] },
        (oldData: CommentsInfiniteData | undefined) => {
          if (!oldData) {
            return oldData
          }

          return {
            ...oldData,
            pages: oldData.pages.map((page) => page.filter((comment) => comment.id !== id)),
          }
        },
      )

      notification.success({
        title: 'Comment deleted successfully',
        description: `Comment with ID ${id} has been deleted.`,
        placement: 'bottomLeft',
      })
    },
    onError: (error) => {
      notification.error({
        title: 'Failed to delete comment',
        description: `An error occurred while trying to delete the comment: ${error}`,
        placement: 'bottomLeft',
      })
    },
  })
}
