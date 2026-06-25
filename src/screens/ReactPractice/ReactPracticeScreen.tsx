import React from 'react'
import { Outlet } from 'react-router'

interface Props {}

const ReactPracticeScreen: React.FC<Props> = () => {
  return (
    <div>
      <h1>React Practice</h1>
      <Outlet />
    </div>
  )
}

export default ReactPracticeScreen
