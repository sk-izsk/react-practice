import { Space } from 'antd'
import React from 'react'
import { ProductFilterBar } from '../../components/ProductFilterBar'
import { ProductTable } from '../../components/ProductTable'

interface Props {}

const ReactPractice1Screen: React.FC<Props> = () => {
  return (
    <Space
      orientation="vertical"
      size="large"
      style={{
        width: '100%',
        marginTop: '20px',
      }}
    >
      <ProductFilterBar />
      <ProductTable />
    </Space>
  )
}
export default ReactPractice1Screen
