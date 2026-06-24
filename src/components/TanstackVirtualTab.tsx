import { useVirtualizer } from '@tanstack/react-virtual'
import React, { useMemo, useRef } from 'react'

interface Props {}

export const TanstackVirtualTab: React.FC<Props> = () => {
  const items = useMemo(
    () =>
      Array.from({ length: 50000 }, (_, i) => ({
        id: i + 1,
        title: `Row ${i + 1}`,
        description: `This is item number ${i + 1}`,
      })),
    [],
  )

  const scrollRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: items?.length || 0,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 73,
    overscan: 8,
  })

  const virtualItems = virtualizer.getVirtualItems()

  return (
    <div
      style={{ height: '70vh', overflow: 'auto', border: '1px solid #ddd', padding: '10px' }}
      ref={scrollRef}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualItems.map((virtualItem) => {
          const item = items[virtualItem.index]

          return (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualItem.start}px)`,
                height: `${virtualItem.size}px`,
                padding: 16,
                borderBottom: '1px solid #eee',
                marginBottom: 8,
                borderRadius: 4,
                backgroundColor: '#f9f9f9',
              }}
              key={item.id}
              data-index={virtualItem.index}
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
          )
        })}
      </div>
    </div>
  )
}
