import { Space } from 'antd'
import React from 'react'
import { DummyAddProductContainer } from './DummyAddProductContainer'
import { DummyFilterCategory } from './DummyFilterCategory'
import { DummyFilterInputField } from './DummyFilterInputField'

interface Props {}

export const DummyProductFilterBar: React.FC<Props> = () => {
  return (
    <Space
      orientation="horizontal"
      style={{ width: '100%', justifyContent: 'space-between' }}
      size="large"
    >
      <DummyFilterInputField />
      <Space>
        <DummyAddProductContainer />
        <DummyFilterCategory />
      </Space>
    </Space>
  )
}
