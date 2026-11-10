import { useStorage } from "@plasmohq/storage/hook"
import { useLiveQuery } from "dexie-react-hooks"

import EmptyWordPlaceholder from "~/components/EmptyWordPlaceholder"
import WordCard from "~/components/WordCard"
import { db } from "~db"

export default function WordSection() {
  const [searchQuery] = useStorage("search_query", "")

  // Truy vấn trực tiếp từ IndexedDB mỗi khi searchQuery thay đổi
  const data = useLiveQuery(
    async () => {
      const totalCount = await db.words.count()
      const query = (searchQuery || "").trim().toLowerCase()

      let items
      if (!query) {
        // Nếu không tìm kiếm: Lấy 100 từ mới nhất để tránh render hàng ngàn DOM node cùng lúc
        items = await db.words
          .orderBy("createdAt")
          .reverse()
          .limit(100)
          .toArray()
      } else {
        // Nếu có từ khóa: Lọc trực tiếp dưới IndexedDB
        items = await db.words
          .orderBy("createdAt")
          .reverse()
          .filter((item) => item.word.toLowerCase().includes(query))
          .limit(100)
          .toArray()
      }

      return { totalCount, items }
    },
    [searchQuery] // Chạy lại query mỗi khi searchQuery thay đổi
  )

  // Khi IndexedDB đang đọc dữ liệu ở mili-giây đầu tiên (data === undefined),
  // return null để tránh bị nháy (flicker) cái EmptyWordPlaceholder lên màn hình
  if (!data) return null

  const { totalCount, items: filteredWords } = data

  return (
    <div className="flex flex-col gap-space-md">
      {/* TH1: Giỏ từ thực sự trống (chưa lưu từ nào) */}
      {totalCount === 0 && <EmptyWordPlaceholder />}

      {/* TH2: Có từ trong giỏ, nhưng gõ tìm kiếm không khớp từ nào */}
      {totalCount > 0 && filteredWords.length === 0 && (
        <div className="py-8 text-center text-on-surface-variant font-label-md">
          Không tìm thấy từ nào khớp với "{searchQuery}"
        </div>
      )}

      {/* TH3: Hiển thị danh sách từ (nhớ thêm key={item.id}) */}
      {filteredWords.map((item) => (
        <WordCard key={item.id} word={item} />
      ))}
    </div>
  )
}