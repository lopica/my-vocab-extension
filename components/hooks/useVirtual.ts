import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef } from "react"

/**
 * Hook tự tạo lấy các giá trị cần để làm virtual scroll
 * @param itemNumber số phần tử cần hiển thị (bao gồm cả ngoài viewport)
 * @param estimateSize chiều cao ước tính của một phần tử
 */
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
