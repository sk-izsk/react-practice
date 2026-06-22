import { Button, Input, Space } from 'antd'
import React, { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router'
import { useCreateComment } from '../hooks/web/useCreateComment'
import type { Comment as CommentItem } from '../types/jsonPlaceHolder'
import { CommentDrawer } from './CommentDrawer'

interface Props {}

export const CommentFilterBar: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [openDrawer, setOpenDrawer] = useState(false)

  const { mutate: createComment, isPending } = useCreateComment()

  const handleSearch = useCallback(
    (value: string) => {
      setSearchParams((params) => {
        if (value.trim()) {
          params.set('search', value)
          setSearch(value)
        } else {
          params.delete('search')
          setSearch('')
        }
        return params
      })
    },
    [setSearchParams],
  )

  const handleCreateComment = (data: CommentItem) => {
    createComment(data, {
      onSuccess: () => {
        setOpenDrawer(false)
      },
    })
  }

  return (
    <Space
      orientation="horizontal"
      size="large"
      style={{ width: '100%', justifyContent: 'space-between' }}
    >
      <Input
        style={{
          width: '300px',
        }}
        placeholder="Search comments"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Button color="cyan" variant="outlined" onClick={() => setOpenDrawer(true)}>
        Add comment
      </Button>
      <CommentDrawer
        isLoading={isPending}
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onSubmit={handleCreateComment}
      />
    </Space>
  )
}
