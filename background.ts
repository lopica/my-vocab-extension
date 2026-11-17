import { Storage } from "@plasmohq/storage"

import { db } from "~db"
import type { VocabularyWord } from "~types"
import { addWord } from "~utils"

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

    addWord(selectedWord, info, tab)
  }
})

export {}
