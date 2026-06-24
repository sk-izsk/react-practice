import React, { useState, type JSX } from 'react'
import { ListItem } from './ListItem'

interface Props {
  numberOfItems: number
}

const itemHeight = 35
const windowHeight = 500
const overScan = 10

export const ManualVirtualizedList: React.FC<Props> = ({ numberOfItems }) => {
  const [scrollTop, setScrollTop] = useState(0)
  const startIndex = Math.max(Math.floor(scrollTop / itemHeight) - overScan)
  const endIndex = Math.min(Math.floor((scrollTop + windowHeight) / itemHeight) + overScan)
  let renderedNodesCount = Math.floor(windowHeight / itemHeight + 2 * overScan)
  renderedNodesCount = Math.min(renderedNodesCount, numberOfItems - startIndex)

  const generateRows = () => {
    let items: JSX.Element[] = []
    for (let i = startIndex; i <= renderedNodesCount; i++) {
      const index = i + startIndex
      items.push(<ListItem key={index} index={index} itemHeight={itemHeight} />)
    }
    return items
  }

  const listItems = Array.from({ length: numberOfItems }, (_, index) => (
    <ListItem key={index} index={index} itemHeight={itemHeight} />
  ))
  return (
    <ul
      style={{
        height: `${windowHeight}px`,
        overflowY: 'scroll',
        width: '100%',
        border: '1px solid #ccc',
      }}
      onScroll={(e) => {
        setScrollTop(e.currentTarget.scrollTop)
      }}
    >
      <div style={{ height: `${numberOfItems * itemHeight}px` }}>
        <div
          style={{
            transform: `translateY(${startIndex * itemHeight}px)`,
          }}
        >
          {generateRows()}
        </div>
      </div>
    </ul>
  )
}
