import { Space, Table } from 'antd'
import React from 'react'
import { useSearchParams } from 'react-router'
import { CommentFilterBar } from '../../components/CommentFilterBar'
import { useCommentColumn } from '../../hooks/columns/useCommentColumn'
import { useDebounce } from '../../hooks/useDebounce'
import { usePagination } from '../../hooks/usePagination'
import { useGetComments } from '../../hooks/web/useGetComments'
import type { Comment } from '../../types/jsonPlaceHolder'

interface Props {}

const CrudTableScreen: React.FC<Props> = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const debouncedSearch = useDebounce(search, 500)
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } = useGetComments({
    search: debouncedSearch,
  })
  const columns = useCommentColumn()

  const tableData: Comment[] = data?.pages.flat() ?? []

  const loadMoreRef = usePagination({
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage: isFetchingNextPage ?? false,
    fetchNextPage: fetchNextPage ?? (() => {}),
  })

  return (
    <Space orientation="vertical" size="large" style={{ width: '100%' }}>
      <CommentFilterBar />
      <Table<Comment>
        dataSource={tableData}
        columns={columns}
        pagination={false}
        rowKey="id"
        loading={isLoading}
      />
      {hasNextPage && (
        <Space ref={loadMoreRef}>
          {isFetchingNextPage && <span className="text-primary">Loading more...</span>}
        </Space>
      )}
    </Space>
  )
}

export default CrudTableScreen
