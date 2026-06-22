import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'
import { jsonPlaceholderApi } from '../../api/ky.jsonPlaceHolder'
import type { Comment as CommentItem } from '../../types/jsonPlaceHolder'
import type { CommentsInfiniteData } from './useDeleteComment'

interface CommentEditPayload {
  commentId: number
  data: Partial<CommentItem>
}

const editComment = ({ commentId, data }: CommentEditPayload) =>
  jsonPlaceholderApi.put<CommentItem, Partial<CommentItem>>(`/comments/${commentId}`, data)

export const useEditComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['editComment'],
    mutationFn: editComment,
    onSuccess: (_, { commentId, data }) => {
      queryClient.setQueriesData({ queryKey: ['comments'] }, (oldData?: CommentsInfiniteData) => {
        if (!oldData) {
          return oldData
        }

        return {
          ...oldData,
          pages: oldData.pages.map((page) =>
            page.map((comment) =>
              comment.id === commentId ? { ...comment, ...data, id: commentId } : comment,
            ),
          ),
        }
      })
      notification.success({
        message: 'Comment updated successfully',
        description: `Comment with ID ${commentId} has been updated.`,
        placement: 'bottomLeft',
      })
    },
    onError: (error) => {
      notification.error({
        message: 'Failed to update comment',
        description: `An error occurred while trying to update the comment: ${error}`,
        placement: 'bottomLeft',
      })
    },
  })
}
