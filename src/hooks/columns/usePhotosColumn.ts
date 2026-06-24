import type { TableColumnType } from 'antd'
import type { Photo } from '../../types/jsonPlaceHolder'

export const usePhotosColumn = (): TableColumnType<Photo>[] => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Thumbnail URL',
      dataIndex: 'thumbnailUrl',
      key: 'thumbnailUrl',
    },
  ]
}
