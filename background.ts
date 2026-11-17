import { Storage } from "@plasmohq/storage"

import { db } from "~db"
import type { VocabularyWord } from "~types"

const storage = new Storage()

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "add-word-action",
    title: 'Thêm từ: "%s"', // %s sẽ tự động thay thế bằng đoạn text bị bôi đen
    contexts: ["selection"] // Thuộc tính này giúp menu CHỈ hiện khi bôi đen text
  })
})

// Lắng nghe sự kiện khi user click vào menu của bạn
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "add-word-action" && info.selectionText) {
    const selectedWord = info.selectionText.trim()

    console.log("Từ vừa bôi đen là:", selectedWord)

    const isAutoOpen = await storage.get("autoOpenExtension")
    console.log("Setting autoOpen:", isAutoOpen) // Debug xem đã lấy được true/false chưa

    // 2. MỞ UI TRƯỚC (Để không bị mất quyền User Gesture)
    if (isAutoOpen && tab && tab.windowId) {
      try {
        // Ưu tiên mở Side Panel
        if (chrome.action && chrome.action.openPopup) {
          await chrome.action.openPopup({ windowId: tab.windowId })
        }
        // Nếu bạn dùng Popup thay vì Side panel thì comment Side Panel lại và dùng dòng dưới:
      } catch (err) {
        console.error("Lỗi khi mở UI:", err)
      }
    }

    // Lấy danh sách từ cũ (nếu chưa có thì trả về mảng rỗng)

    const rawUrl = info.pageUrl || tab?.url || ""
    let domain = ""

    // 2. Tách lấy tên miền (domain) và xóa chữ "www." ở đầu cho gọn đẹp
    if (rawUrl) {
      try {
        domain = new URL(rawUrl).hostname.replace(/^www\./, "")
      } catch (error) {
        console.error("Không thể phân tích URL:", error)
      }
    }

    // Thêm từ mới
    try {
      // Ghi trực tiếp 1 bản ghi vào IndexedDB, không cần đọc lại mảng cũ
      await db.words.add({
        id: crypto.randomUUID(),
        word: selectedWord,
        createdAt: Date.now(),
        sourceDomain: domain,
        sourceUrl: rawUrl
      })

      console.log("Lưu từ thành công")
    } catch (error) {
      // Nếu từ đã tồn tại (&word unique constraint), Dexie sẽ tự quăng lỗi ConstraintError
      console.log("Từ đã tồn tại hoặc lỗi khi lưu:", error)
    }
  }
})

export {}
