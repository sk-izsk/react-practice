import React, { useMemo } from 'react'

interface Props {}

export const TanstackNormalTab: React.FC<Props> = () => {
  const items = useMemo(
    () =>
      Array.from({ length: 100000 }, (_, i) => ({
        id: i + 1,
        title: `Row ${i + 1}`,
        description: `This is item number ${i + 1}`,
      })),
    [],
  )
  return (
    <div style={{ height: '70vh', overflow: 'auto', border: '1px solid #ddd', padding: '10px' }}>
      {items.map((item) => (
        <div
          style={{
            padding: 16,
            borderBottom: '1px solid #eee',
            marginBottom: 8,
            borderRadius: 4,
            backgroundColor: '#f9f9f9',
          }}
          key={item.id}
        >
          <div
            style={{
              fontWeight: 'bold',
            }}
          >
            {item.title}
          </div>
          <div>{item.description}</div>
        </div>
      ))}
    </div>
  )
}
