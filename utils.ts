import { Storage } from "@plasmohq/storage"

import {
  MENU_OPTION_ID,
  ONE_DAY,
  ONE_HOUR,
  ONE_MINUTE,
  ONE_MONTH,
  ONE_YEAR,
  SAMPLE_DOMAINS,
  SAMPLE_MEANINGS,
  SAMPLE_TEXTS,
  SAMPLE_WORDS
} from "~constants"
import { db } from "~db"
import { addWord } from "~db-sdk"
import type { VocabularyCard } from "~types"

/**
 * Hàm tính thời gian từ lúc thẻ từ được tạo đến hiện tại
 * @param time mốc thời gian thẻ từ đã tạo (lấy theo milisecond từ 1 tháng 1 1970)
 * @returns chuỗi thông báo thời gian thẻ được tạo
 */
export default function getCreateTimeDisplay(time: number): string {
  const current = Date.now()
  const gap = current - time

  if (gap < ONE_MINUTE) {
    return "Vài giây trước"
  }

  if (gap < ONE_HOUR) {
    const gapMinute = Math.floor(gap / ONE_MINUTE)
    return `${gapMinute} phút trước`
  }

  if (gap < ONE_DAY) {
    const gapHour = Math.floor(gap / ONE_HOUR)
    return `${gapHour} giờ trước`
  }

  if (gap < ONE_MONTH) {
    const gapDay = Math.floor(gap / ONE_DAY)
    return `${gapDay} ngày trước`
  }

  if (gap < ONE_YEAR) {
    const gapMonth = Math.floor(gap / ONE_MONTH)
    return `${gapMonth} tháng trước`
  }

  const gapYear = Math.floor(gap / ONE_YEAR)
  return `${gapYear} năm trước`
}

/**
 * Hàm bơm dữ liệu giả lập vào IndexedDB theo từng lô (Batch/Chunk)
 * @param total Số lượng từ muốn tạo (VD: 100_000 hoặc 1_000_000)
 * @param onProgress Callback trả về % tiến độ để hiển thị lên UI
 */
export async function seedMillionWords(
  total: number = 1_000_000,
  onProgress?: (inserted: number, total: number) => void
) {
  const BATCH_SIZE = 10_000
  const now = Date.now()

  console.time(`Seed ${total} words`)

  for (let i = 0; i < total; i += BATCH_SIZE) {
    const chunk: VocabularyCard[] = []
    const currentBatchSize = Math.min(BATCH_SIZE, total - i)

    for (let j = 0; j < currentBatchSize; j++) {
      const index = i + j
      const baseWord = SAMPLE_WORDS[index % SAMPLE_WORDS.length]
      const domain = SAMPLE_DOMAINS[index % SAMPLE_DOMAINS.length]

      chunk.push({
        id: `seed-${index}`,
        wordOrPhrase: `${baseWord}_${index + 1}`,
        phonetic: "/ˌser.ənˈdɪp.ə.ti/",
        userNote: SAMPLE_MEANINGS[index % SAMPLE_MEANINGS.length],
        createdAt: now - (total - index) * 1000,
        sourceDomain: domain,
        sourceUrl: `https://${domain}/articles/${index}`
      })
    }

    await db.words.bulkPut(chunk)

    if (onProgress) {
      onProgress(i + currentBatchSize, total)
    }

    await new Promise((resolve) => setTimeout(resolve, 10))
  }

  console.timeEnd(`Seed ${total} words`)
}

/**
 * Thêm lựa chọn custom khi bôi đen từ hoặc cụm từ rồi chuột phải
 */
export const addExtensionOption = () => {
  chrome.contextMenus.create({
    id: MENU_OPTION_ID,
    title: 'Thêm vào giỏ từ: "%s"',
    contexts: ["selection"]
  })
}

const storage = new Storage()

export const onMenuClickHandler: Parameters<
  typeof chrome.contextMenus.onClicked.addListener
>[0] = async (info, tab) => {
  if (info.menuItemId === MENU_OPTION_ID && info.selectionText) {
    const selectedWord = info.selectionText.trim()

    console.log("Từ vừa bôi đen là:", selectedWord)

    const isAutoOpen = await storage.get("autoOpenExtension")
    console.log("Setting autoOpen:", isAutoOpen)

    // MỞ UI TRƯỚC (Để không bị mất quyền User Gesture)
    if (isAutoOpen && tab && tab.windowId) {
      try {
        if (chrome.action && chrome.action.openPopup) {
          await chrome.action.openPopup({ windowId: tab.windowId })
        }
      } catch (err) {
        console.error("Lỗi khi mở UI:", err)
      }
    }

    addWord(selectedWord, info, tab)
  }
}

export function getLangLabel(lang: string): string {
  try {
    return new Intl.DisplayNames(["vi"], { type: "language" }).of(lang) ?? lang
  } catch {
    return lang
  }
}

export function getFlag(lang: string): string {
  const code = lang.split("-")[1]?.toUpperCase()
  if (!code || code.length !== 2) return "🌐"
  return String.fromCodePoint(
    ...code.split("").map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  )
}

export function getSampleText(lang: string): string {
  const base = lang.split("-")[0].toLowerCase()
  return SAMPLE_TEXTS[base] ?? SAMPLE_TEXTS["en"]
}

export function getGroup(lang: string): string {
  const base = lang.split("-")[0].toLowerCase()
  if (base === "en") return "Tiếng Anh (Khuyên dùng)"
  if (base === "vi") return "Tiếng Việt"
  return "Đa ngôn ngữ"
}
