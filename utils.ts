import { db } from "~db"
import type { VocabularyWord } from "~types"

const ONE_SECOND = 1000
const ONE_MINUTE = 60 * ONE_SECOND
const ONE_HOUR = 60 * ONE_MINUTE
const ONE_DAY = 24 * ONE_HOUR
const ONE_MONTH = 30 * ONE_DAY
const ONE_YEAR = 365 * ONE_DAY

export default function getCreateTimeDisplay(time: number): string {
  const current = Date.now()
  const gap = current - time

  // Nếu thời gian trôi qua chưa tới 1 phút
  if (gap < ONE_MINUTE) {
    return "Vài giây trước"
  }

  // Nếu thời gian trôi qua chưa tới 1 giờ -> Hiển thị phút
  if (gap < ONE_HOUR) {
    const gapMinute = Math.floor(gap / ONE_MINUTE)
    return `${gapMinute} phút trước`
  }

  // Nếu thời gian trôi qua chưa tới 1 ngày -> Hiển thị giờ
  if (gap < ONE_DAY) {
    const gapHour = Math.floor(gap / ONE_HOUR)
    return `${gapHour} giờ trước`
  }

  // Nếu thời gian trôi qua chưa tới 1 tháng -> Hiển thị ngày
  if (gap < ONE_MONTH) {
    const gapDay = Math.floor(gap / ONE_DAY)
    return `${gapDay} ngày trước`
  }

  // Nếu thời gian trôi qua chưa tới 1 năm -> Hiển thị tháng
  if (gap < ONE_YEAR) {
    const gapMonth = Math.floor(gap / ONE_MONTH)
    return `${gapMonth} tháng trước`
  }

  // Nếu lớn hơn 1 năm -> Hiển thị năm
  const gapYear = Math.floor(gap / ONE_YEAR)
  return `${gapYear} năm trước`
}

const SAMPLE_WORDS = [
  "serendipity",
  "ephemeral",
  "ubiquitous",
  "mellifluous",
  "ineffable",
  "labyrinth",
  "eloquent",
  "resilience",
  "paradigm",
  "pragmatic",
  "solitude",
  "ethereal",
  "luminescence",
  "nostalgia",
  "euphoria"
]

const SAMPLE_DOMAINS = [
  "gemini.google.com",
  "github.com",
  "stackoverflow.com",
  "medium.com",
  "dev.to",
  "wikipedia.org",
  "nytimes.com"
]

const SAMPLE_MEANINGS = [
  "Sự tình cờ may mắn phát hiện ra điều thú vị.",
  "Phù du, ngắn ngủi, chỉ tồn tại trong chốc lát.",
  "Có mặt ở khắp mọi nơi cùng một lúc.",
  "Ngọt ngào, êm dịu, du dương (âm thanh, giọng nói).",
  "Không thể diễn tả được bằng lời vì quá tuyệt vời."
]

/**
 * Hàm bơm dữ liệu giả lập vào IndexedDB theo từng lô (Batch/Chunk)
 * @param total Số lượng từ muốn tạo (VD: 100_000 hoặc 1_000_000)
 * @param onProgress Callback trả về % tiến độ để hiển thị lên UI
 */
export async function seedMillionWords(
  total: number = 1_000_000,
  onProgress?: (inserted: number, total: number) => void
) {
  const BATCH_SIZE = 10_000 // Chèn mỗi lần 10.000 từ để không bị tràn RAM
  const now = Date.now()

  console.time(`Seed ${total} words`)

  for (let i = 0; i < total; i += BATCH_SIZE) {
    const chunk: VocabularyWord[] = []
    const currentBatchSize = Math.min(BATCH_SIZE, total - i)

    for (let j = 0; j < currentBatchSize; j++) {
      const index = i + j
      const baseWord = SAMPLE_WORDS[index % SAMPLE_WORDS.length]
      const domain = SAMPLE_DOMAINS[index % SAMPLE_DOMAINS.length]

      chunk.push({
        id: `seed-${index}`,
        // Gắn thêm hậu tố số thứ tự để không bị lỗi trùng lặp (&word unique index)
        word: `${baseWord}_${index + 1}`,
        phonetic: "/ˌser.ənˈdɪp.ə.ti/",
        meaning: SAMPLE_MEANINGS[index % SAMPLE_MEANINGS.length],
        // Trải đều thời gian tạo để test sắp xếp createdAt chuẩn xác
        createdAt: now - (total - index) * 1000,
        sourceDomain: domain,
        sourceUrl: `https://${domain}/articles/${index}`
      })
    }

    // Dùng bulkPut thay vì bulkAdd để nếu chạy lại không bị văng lỗi trùng ID
    await db.words.bulkPut(chunk)

    if (onProgress) {
      onProgress(i + currentBatchSize, total)
    }

    // Nhường luồng chính (main thread) 10ms giữa các batch để UI không bị đơ
    await new Promise((resolve) => setTimeout(resolve, 10))
  }

  console.timeEnd(`Seed ${total} words`)
}

export const deleteAll = async () => {
  try {
    await db.words.clear()

    console.log(`Đã xóa thành công toàn bộ từ`)
    return
  } catch (error) {
    console.error("Lỗi khi cập nhật storage:", error)
    // Hoàn tác lại giá trị cũ trên UI nếu lưu thất bại
  }
}

export const deleteWord = async (vocabWord: VocabularyWord) => {
  try {
    // Xóa trực tiếp bản ghi theo khóa chính (id) trong IndexedDB
    await db.words.delete(vocabWord.id)

    console.log(`Đã xóa thành công từ: ${vocabWord.word}`)
  } catch (error) {
    console.error("Lỗi khi xóa từ trong IndexedDB:", error)
  }
}
