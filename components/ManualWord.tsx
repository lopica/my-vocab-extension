import { useState } from "react"

import { addWord } from "~utils"

export default function ManualWord() {
  const [word, setWord] = useState("")

  // Xử lý khi bấm nút Add hoặc nhấn Enter
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedWord = word.trim()
    if (!trimmedWord) return

    if (trimmedWord.length > 24) {
      alert("Từ hoặc cụm từ quá dài (tối đa 24 ký tự).")
      return
    }

    try {
      // 1. Lấy thông tin tab đang mở (để hàm addWord có thể lấy URL/Domain)
      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true
      })
      const currentTab = tabs[0]

      // 2. Gọi hàm addWord (truyền undefined cho info, truyền currentTab cho tab)
      await addWord(trimmedWord, undefined, currentTab)

      // 3. Reset ô input sau khi lưu thành công
      setWord("")
    } catch (error) {
      console.error("Lỗi khi thêm từ thủ công:", error)
    }
  }
  return (
    <div className="glass-input-bar fixed bottom-6 left-1/2 z-30 w-[calc(100%-2rem)] max-w-[420px] -translate-x-1/2 rounded-2xl p-space-xs shadow-xl">
      <form
        className="flex items-center gap-space-xs"
        id="quick-add-form"
        onSubmit={handleSubmit}>
        <div className="relative flex-1">
          <input
            className="w-full rounded-xl border border-white/60 bg-white/70 py-2.5 pl-3.5 pr-8 font-body-sm text-body-sm text-on-surface shadow-inner transition-all placeholder:text-outline/70 focus:bg-white focus:outline-none"
            id="new-word-input"
            placeholder="Thêm tay..."
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            maxLength={24}
          />
          {/* <button
            className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors hover:text-primary"
            id="auto-detect-btn"
            title="Detect from active tab selection"
            type="button">
            <span className="material-symbols-outlined text-[16px]">
              magic_button
            </span>
          </button> */}
        </div>
        <button
          className="flex h-10 items-center gap-1 rounded-xl bg-gradient-to-r from-primary to-primary-container px-4 font-label-md text-label-md text-on-primary shadow-md transition-all hover:brightness-105 active:scale-95"
          disabled={!word.trim()}
          type="submit">
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span className="">Thêm</span>
        </button>
      </form>
    </div>
  )
}
