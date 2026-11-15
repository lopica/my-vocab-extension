import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef } from "react"

export default function useVirtual(itemNumber: number, estimateSize: number) {
  const virtualContainerRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: itemNumber,
    estimateSize: () => estimateSize,
    getScrollElement: () => virtualContainerRef.current
  })

  const virtualItems = virtualizer.getVirtualItems()

  return {
    virtualItems,
    virtualizer,
    virtualContainerRef
  }
}
