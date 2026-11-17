import { useLiveQuery } from "dexie-react-hooks"

import { useStorage } from "@plasmohq/storage/hook"

import EmptyWordPlaceholder from "~/components/EmptyWordPlaceholder"
import WordCard from "~/components/WordCard"
import { db } from "~db"

import useVirtual from "./hooks/useVirtual"

export default function WordSection() {
  const [searchQuery] = useStorage("search_query", "")

  // 1. Lấy toàn bộ data trong một lần query duy nhất
  const { totalCount, words, isLoaded } = useLiveQuery(
    async () => {
      const totalCount = await db.words.count()
      const query = (searchQuery || "").trim().toLowerCase()

      // Không dùng offset hay limit, lấy toàn bộ ra bằng .toArray()
      const words = !query
        ? await db.words.orderBy("createdAt").reverse().toArray()
        : await db.words.where("word").startsWithIgnoreCase(query).toArray()

      return { totalCount, words, isLoaded: true }
    },
    [searchQuery],
    { totalCount: 0, words: [], isLoaded: false }
  )

  const matchCount = words.length
  const { virtualContainerRef, virtualizer, virtualItems } = useVirtual(
    matchCount,
    150
  )

  return (
    <div
      ref={virtualContainerRef}
      className="-mr-1 h-[410px] overflow-y-auto pb-20 pr-1 pt-4">
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
          <div
            style={{
              position: "absolute",
              transform: `translate3d(0px, ${virtualItems[0]?.start ?? 0}px, 0px)`,
              top: 0,
              left: 0,
              width: "100%"
            }}>
            {virtualItems.map((virtualItem) => {
              // Vì đã lấy TOÀN BỘ mảng, ta chỉ việc map trực tiếp qua index của virtual item
              const word = words[virtualItem.index]
              const isLastItem = virtualItem.index === words.length - 1

              return (
                <div
                  key={virtualItem.key}
                  data-index={virtualItem.index}
                  ref={virtualizer.measureElement}
                  className={isLastItem ? "" : "pb-3"}>
                  <WordCard word={word} />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
