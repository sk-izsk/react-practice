import React, { useMemo } from 'react'
import { ManualVirtualizedList } from './ManualVirtualizedList'

interface Props {}

export const TanstackVirtualManualTab: React.FC<Props> = () => {
  const items = useMemo(
    () =>
      Array.from({ length: 50000 }, (_, i) => ({
        id: i + 1,
        title: `Row ${i + 1}`,
        description: `This is item number ${i + 1}`,
      })),
    [],
  )

  return (
    <div>
      <ManualVirtualizedList numberOfItems={items.length} />
    </div>
  )
}
