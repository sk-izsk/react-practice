import { MoreOutlined } from '@ant-design/icons'
import { Dropdown, type MenuProps } from 'antd'
import { useMemo, useState } from 'react'
import type { DummyProduct } from '../types/dummyJsonApi'
import { DummyProductDeletePopConfirm } from './DummyProductDeletePopConfirm'
import { DummyProductEditForm } from './DummyProductEditForm'

export const ProductDummyActionRenderer: React.FC<{
  record: DummyProduct
  setPendingRowId: (id: number | null) => void
}> = ({ record, setPendingRowId }) => {
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false)

  const items: MenuProps['items'] = useMemo(() => {
    return [
      {
        key: '1',
        label: 'Edit',
        onClick: () => {
          setIsEditDrawerOpen(true)
        },
      },
      {
        key: '2',
        label: <DummyProductDeletePopConfirm data={record} setPendingRowId={setPendingRowId} />,
      },
    ]
  }, [record, setPendingRowId])

  return (
    <>
      <Dropdown menu={{ items }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <MoreOutlined />
        </a>
      </Dropdown>
      <DummyProductEditForm
        data={record}
        isOpen={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        setPendingRowId={setPendingRowId}
      />
    </>
  )
}
