import type { TableColumnType } from 'antd'
import { TableMenu } from '../../components/TableMenu'
import type { Comment } from '../../types/jsonPlaceHolder'

export const useCommentColumn = (): TableColumnType<Comment>[] => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
    },
    {
      key: 'action',
      render: (comment: Comment) => <TableMenu data={comment} />,
    },
  ]
}
