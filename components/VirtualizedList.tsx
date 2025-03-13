import React, { useCallback } from 'react'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

interface Item {
  id: number
  content: string
}

interface VirtualizedListProps {
  items: Item[]
  itemHeight: number
}

const VirtualizedList: React.FC<VirtualizedListProps> = ({ items, itemHeight }) => {
  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => (
      <div style={style} className="p-4 border-b">
        {items[index].content}
      </div>
    ),
    [items]
  )

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          itemCount={items.length}
          itemSize={itemHeight}
          width={width}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  )
}

export default VirtualizedList

