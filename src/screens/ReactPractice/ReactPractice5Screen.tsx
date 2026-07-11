import { Space } from 'antd'
import React from 'react'
import { ReactBigListFilterBar } from '../../components/ReactBigListFilterBar'
import { ReactBigListTableContainer } from '../../components/ReactBigListTableContainer'

interface Props {}

const ReactPractice5Screen: React.FC<Props> = () => {
  return (
    <Space orientation="vertical" style={{ width: '100%' }}>
      <ReactBigListFilterBar />
      <ReactBigListTableContainer />
    </Space>
  )
}

export default ReactPractice5Screen
