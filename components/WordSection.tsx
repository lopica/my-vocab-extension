import { useVirtualizer } from "@tanstack/react-virtual"
import { useLiveQuery } from "dexie-react-hooks"
import { useDeferredValue, useRef } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import EmptyWordPlaceholder from "~/components/EmptyWordPlaceholder"
import WordCard from "~/components/WordCard"
import { db } from "~db"

const CHUNK_STEP = 50 // Chỉ query lại DB khi cuộn qua mỗi 50 từ
const FETCH_LIMIT = 120 // Mỗi lần lấy dư ra 120 từ để cuộn mượt không cần chờ
const GAP_PX = 12

export default function WordSection() {
  const [searchQuery] = useStorage("search_query", "")
  const deferredQuery = useDeferredValue(searchQuery)
  const parentRef = useRef<HTMLDivElement>(null)

  // 1. Đếm tổng số record (có giá trị mặc định để KHÔNG return null làm mất parentRef)
  const countData = useLiveQuery(
    async () => {
      const totalCount = await db.words.count()
      const query = (deferredQuery || "").trim().toLowerCase()

      const matchCount = query
        ? await db.words.where("word").startsWithIgnoreCase(query).count()
        : totalCount

      return { totalCount, matchCount, isLoaded: true }
    },
    [deferredQuery],
    { totalCount: 0, matchCount: 0, isLoaded: false }
  )

  const { totalCount, matchCount, isLoaded } = countData

  // 2. Khởi tạo Virtualizer (estimateSize ~135px sát với chiều cao thật của WordCard hơn)
  const virtualizer = useVirtualizer({
    count: matchCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 135,
    overscan: 5,
    gap: GAP_PX
  })

  const virtualItems = virtualizer.getVirtualItems()
  const firstVisibleIndex = virtualItems[0]?.index ?? 0

  // Neo offset theo từng bậc 50 (0, 50, 100, 150...) để tránh spam DB từng pixel cuộn
  const chunkOffset = Math.max(
    0,
    Math.floor(Math.max(0, firstVisibleIndex - 15) / CHUNK_STEP) * CHUNK_STEP
  )

  // 3. Load 1 cụm 120 từ và trả về kèm đúng offset của lần query đó
  const pageData = useLiveQuery(
    async () => {
      if (matchCount === 0) return { offset: 0, items: [] }

      const query = (deferredQuery || "").trim().toLowerCase()

      const items = !query
        ? await db.words
            .orderBy("createdAt")
            .reverse()
            .offset(chunkOffset)
            .limit(FETCH_LIMIT)
            .toArray()
        : await db.words
            .where("word")
            .startsWithIgnoreCase(query)
            .offset(chunkOffset)
            .limit(FETCH_LIMIT)
            .toArray()

      // Trả về cả offset gắn liền với mảng items này để chống lệch nhịp bất đồng bộ
      return { offset: chunkOffset, items }
    },
    [deferredQuery, chunkOffset, matchCount],
    { offset: 0, items: [] }
  )

  // Luôn giữ thẻ <div ref={parentRef}> trong DOM để Virtualizer đo được chiều cao ngay từ đầu
  return (
    <div
      ref={parentRef}
      className="-mr-1 h-[410px] overflow-y-auto pb-4 pr-1 pt-2">
      {isLoaded && totalCount === 0 && <EmptyWordPlaceholder />}

      {isLoaded && totalCount > 0 && matchCount === 0 && (
        <div className="py-8 text-center font-label-md text-on-surface-variant">
          Không tìm thấy từ nào khớp với "{searchQuery}"
        </div>
      )}

      {matchCount > 0 && (
        <div
          style={{
            height: virtualizer.getTotalSize(),
            position: "relative",
            width: "100%"
          }}>
          {virtualItems.map((virtualItem) => {
            // Dùng pageData.offset (của đúng mảng items đang có) thay vì biến bên ngoài
            const itemIndexInPage = virtualItem.index - pageData.offset
            const word = pageData.items[itemIndexInPage]

            return (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={virtualizer.measureElement}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualItem.start}px)`
                }}>
                {word ? (
                  <WordCard word={word} />
                ) : (
                  // Skeleton giữ chỗ cao 135px khi người dùng kéo thanh cuộn siêu nhanh
                  <div className="h-[135px] w-full animate-pulse rounded-2xl bg-surface-container-low/50" />
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
