import { Space } from 'antd'
import React from 'react'
import { DummyProductFilterBar } from '../../components/DummyProductFilterBar'
import { DummyProductTableContainer } from '../../components/DummyProductTableContainer'

interface Props {}

const ReactPractice2Screen: React.FC<Props> = () => {
  return (
    <Space style={{ width: '100%' }} size="large" orientation="vertical">
      <DummyProductFilterBar />
      <DummyProductTableContainer />
    </Space>
  )
}

export default ReactPractice2Screen
