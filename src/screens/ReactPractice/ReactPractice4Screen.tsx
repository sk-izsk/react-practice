import { Space } from 'antd'
import React from 'react'
import { BreweryFilterBar } from '../../components/BreweryFilterBar'
import { BreweryTableContainer } from '../../components/BreweryTableContainer'

interface Props {}

const ReactPractice4Screen: React.FC<Props> = () => {
  return (
    <Space orientation="vertical" style={{ width: '100%' }}>
      <BreweryFilterBar />
      <BreweryTableContainer />
    </Space>
  )
}

export default ReactPractice4Screen
