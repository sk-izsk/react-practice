import { Space } from 'antd'
import React from 'react'
import { DummyProductInputShadcn } from './DummyProductInputShadcn'
import { DummyProductSelectShadcn } from './DummyProductSelectShadcn'

interface Props {}

export const DummyProductFilterBarShadcn: React.FC<Props> = () => {
  return (
    <Space
      orientation="horizontal"
      style={{ width: '100%', justifyContent: 'space-between' }}
      size="large"
    >
      <DummyProductInputShadcn />
      <DummyProductSelectShadcn />
    </Space>
  )
}
