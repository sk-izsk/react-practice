import { DollarOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import React from 'react'
import { useSearchParams } from 'react-router'

interface Props {
  totalPrice?: number
}

export const ProductTitleRenderer: React.FC<Props> = ({ totalPrice }) => {
  const [searchParams] = useSearchParams()
  const selectedItems = searchParams.get('selected-items')
  return (
    <Space orientation="horizontal">
      Title
      <span style={{ color: 'gray', fontSize: '12px', marginLeft: '5px' }}>
        <ShoppingOutlined /> Number of items : {selectedItems?.split(',').length || 0}
      </span>
      <span style={{ color: 'gray', fontSize: '12px', marginLeft: '5px' }}>
        <DollarOutlined /> Total Price : $ {totalPrice?.toFixed(2) || 0}
      </span>
    </Space>
  )
}
