import React from 'react'
import { useEditComment } from '../hooks/web/useEditComment'
import type { Comment } from '../types/jsonPlaceHolder'
import { CommentDrawer } from './CommentDrawer'

interface Props {
  data?: Comment
  onClose: () => void
  isOpen: boolean
}

export const EditCommentDrawer: React.FC<Props> = ({ data, onClose, isOpen }) => {
  const { mutate: editComment, isPending } = useEditComment()

  const handleEditComment = (formData: Comment) => {
    if (!data?.id) {
      return
    }
    editComment(
      {
        commentId: data.id,
        data: formData,
      },
      {
        onSuccess: () => {
          onClose()
        },
      },
    )
  }

  return (
    <CommentDrawer
      data={data}
      onClose={onClose}
      isOpen={isOpen}
      isLoading={isPending}
      onSubmit={handleEditComment}
    />
  )
}
