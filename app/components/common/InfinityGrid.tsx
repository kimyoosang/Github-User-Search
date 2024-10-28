'use client'

import React from 'react'
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import AutoSizer from 'react-virtualized-auto-sizer'

interface InfiniteGridProps<T> {
  items: T[]
  isItemLoaded: (index: number) => boolean
  loadMoreItems: () => Promise<void>
  itemCount: number
  renderItem: (props: GridChildComponentProps<T[]>) => React.ReactElement | null
  maxColumnCount: number
  rowHeight: number
  maxColumnWidth: number
  gap?: number
}

export function InfiniteGrid<T>({
  items,
  isItemLoaded,
  loadMoreItems,
  itemCount,
  renderItem,
  maxColumnCount,
  rowHeight,
  maxColumnWidth,
  gap = 0,
}: InfiniteGridProps<T>) {
  return (
    <AutoSizer>
      {({ height, width }) => {
        // 화면 너비에 따라 컬럼 수 계산
        const columnCount = Math.min(
          maxColumnCount,
          Math.max(1, Math.floor(width / (maxColumnWidth + gap))),
        )

        // 실제 컬럼 너비 계산 (gap 고려)
        const columnWidth = Math.min(
          maxColumnWidth,
          (width - (columnCount - 1) * gap) / columnCount,
        )

        const adjustedColumnWidth = columnWidth - gap
        const adjustedRowHeight = rowHeight - gap

        // 전체 그리드의 실제 너비 계산
        const totalGridWidth =
          columnCount * columnWidth + (columnCount - 1) * gap
        // 중앙 정렬을 위한 왼쪽 여백 계산
        const leftOffset = Math.max(0, (width - totalGridWidth) / 2)

        return (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <Grid<T[]>
                ref={ref}
                height={height}
                width={width}
                rowCount={Math.ceil(itemCount / columnCount)}
                columnCount={columnCount}
                rowHeight={rowHeight}
                columnWidth={columnWidth}
                onItemsRendered={({
                  visibleRowStartIndex,
                  visibleRowStopIndex,
                  overscanRowStartIndex,
                  overscanRowStopIndex,
                }) => {
                  onItemsRendered({
                    overscanStartIndex: overscanRowStartIndex * columnCount,
                    overscanStopIndex: overscanRowStopIndex * columnCount,
                    visibleStartIndex: visibleRowStartIndex * columnCount,
                    visibleStopIndex: visibleRowStopIndex * columnCount,
                  })
                }}
                itemData={items}
              >
                {({ columnIndex, rowIndex, style, data }) => {
                  const adjustedStyle = {
                    ...style,
                    left: leftOffset + Number(style.left) + columnIndex * gap,
                    top: Number(style.top) + rowIndex * gap,
                    width: adjustedColumnWidth,
                    height: adjustedRowHeight,
                  }
                  return renderItem({
                    columnIndex,
                    rowIndex,
                    style: adjustedStyle,
                    data,
                  })
                }}
              </Grid>
            )}
          </InfiniteLoader>
        )
      }}
    </AutoSizer>
  )
}
