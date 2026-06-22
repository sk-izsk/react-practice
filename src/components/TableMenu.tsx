import { MoreOutlined } from '@ant-design/icons'
import Dropdown from 'antd/es/dropdown'
import type { MenuProps } from 'antd/es/menu'
import React, { useMemo, useState } from 'react'
import { useDeleteComment } from '../hooks/web/useDeleteComment'
import type { Comment } from '../types/jsonPlaceHolder'
import { EditCommentDrawer } from './EditCommentDrawer'

interface Props {
  data: Comment
}

export const TableMenu: React.FC<Props> = ({ data }) => {
  const { mutate: deleteComment, isPending } = useDeleteComment()
  const [isOpen, setIsOpen] = useState(false)

  const items: MenuProps['items'] = useMemo(
    () => [
      {
        label: 'Edit',
        key: '0',
        onClick: () => setIsOpen(true),
        isLoading: isPending,
      },
      {
        label: 'Delete',
        key: '1',
        onClick: () => {
          deleteComment(data.id!)
        },
        isLoading: isPending,
      },
    ],
    [data, isPending],
  )
  return (
    <>
      <Dropdown menu={{ items }} trigger={['click']}>
        <MoreOutlined />
      </Dropdown>
      <EditCommentDrawer data={data} onClose={() => setIsOpen(false)} isOpen={isOpen} />
    </>
  )
}
