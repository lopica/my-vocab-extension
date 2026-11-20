import { useLiveQuery } from "dexie-react-hooks"

import { useStorage } from "@plasmohq/storage/hook"

import EmptyWordPlaceholder from "~components/EmptyWordPlaceholder"
import VocabCard from "~components/VocabCard"
import { SEARCH_KEY } from "~constants"
import { getVocabCards } from "~db-sdk"

import useVirtual from "./hooks/useVirtual"

/**
 * Phần hiển thị các thẻ từ
 */
export default function VocabCardSection() {
  const [searchQuery] = useStorage(SEARCH_KEY, "")

  const { totalCount, words, isLoaded } = useLiveQuery(
    async () => getVocabCards(searchQuery),
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
              const word = words[virtualItem.index]
              const isLastItem = virtualItem.index === words.length - 1

              return (
                <div
                  key={virtualItem.key}
                  data-index={virtualItem.index}
                  ref={virtualizer.measureElement}
                  className={isLastItem ? "" : "pb-3"}>
                  <VocabCard vocabCard={word} />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
