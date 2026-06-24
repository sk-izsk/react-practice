import React from 'react'

interface Props {
  index: number
  itemHeight: number
}

export const ListItem: React.FC<Props> = ({ index, itemHeight }) => {
  return (
    <li
      style={{
        height: `${itemHeight}px`,
        top: `${index * itemHeight}px`,
        backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e9e9e9',
      }}
      data-index={index}
    >
      List item {index}
    </li>
  )
}
