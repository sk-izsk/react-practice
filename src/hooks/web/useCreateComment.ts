import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'
import { jsonPlaceholderApi } from '../../api/ky.jsonPlaceHolder'
import type { Comment as CommentItem } from '../../types/jsonPlaceHolder'

const createComment = (comment: CommentItem) => {
  return jsonPlaceholderApi.post<CommentItem, CommentItem>('/comments', comment)
}

export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createComment'],
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      notification.success({
        message: 'Comment created successfully',
        description: 'Your comment has been created.',
        placement: 'bottomLeft',
      })
    },
    onError: (error) => {
      notification.error({
        message: 'Failed to create comment',
        description: `An error occurred while trying to create the comment: ${error}`,
        placement: 'bottomLeft',
      })
    },
  })
}
