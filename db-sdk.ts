import { db } from "~db"
import type { VocabularyCard } from "~types"

/**
 * Xóa toàn bộ thẻ từ đang lưu trong indexDB
 */
export const deleteAll = async () => {
  try {
    await db.words.clear()

    console.log(`Đã xóa thành công toàn bộ từ`)
    return
  } catch (error) {
    console.error("Lỗi khi cập nhật storage:", error)
  }
}

/**
 * Xóa 1 thẻ từ trong indexDB
 * @param vocabCard thẻ từ định xóa
 */
export const deleteWord = async (vocabCard: VocabularyCard) => {
  try {
    await db.words.delete(vocabCard.id)

    console.log(`Đã xóa thành công từ: ${vocabCard.wordOrPhrase}`)
  } catch (error) {
    console.error("Lỗi khi xóa từ trong IndexedDB:", error)
  }
}

/**
 * Thêm từ hoặc cụm từ vào giỏ
 * @param wordOrPhrase từ hoặc cụm từ
 * @param info cục thông tin trình duyệt cung cấp
 * @param tab cục thông tin trình duyệt cung cấp
 */
export const addWord = async (
  wordOrPhrase: string,
  info?: chrome.contextMenus.OnClickData,
  tab?: chrome.tabs.Tab
) => {
  if (wordOrPhrase.length > 24) {
    console.error("Không thể thêm từ, hoặc cụm từ dài quá 24 ký tự")
    return
  }

  const rawUrl = info?.pageUrl || tab?.url || ""
  let domain = ""

  if (rawUrl) {
    try {
      domain = new URL(rawUrl).hostname.replace(/^www\./, "")
    } catch (error) {
      console.error("Không thể phân tích URL:", error)
    }
  }

  try {
    await db.words.add({
      id: crypto.randomUUID(),
      wordOrPhrase: wordOrPhrase,
      createdAt: Date.now(),
      sourceDomain: domain,
      sourceUrl: rawUrl
    })

    console.log("Lưu từ thành công")
  } catch (error) {
    console.log("Từ đã tồn tại hoặc lỗi khi lưu:", error)
  }
}

/**
 * Lấy các thẻ từ dựa trên chuỗi tìm kiếm
 * @param searchQuery giá trị người dùng nhập, nếu không nhập gì coi như tra toàn bộ
 */
export const getVocabCards = async (searchQuery: string) => {
  const totalCount = await db.words.count()
  const query = (searchQuery || "").trim().toLowerCase()

  const words = !query
    ? await db.words.orderBy("createdAt").reverse().toArray()
    : await db.words.where("wordOrPhrase").startsWithIgnoreCase(query).toArray()

  return { totalCount, words, isLoaded: true }
}
