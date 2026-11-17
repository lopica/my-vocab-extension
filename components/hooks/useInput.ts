import { useEffect, useRef, useState } from "react"

import { db } from "~db"
import type { VocabularyWord } from "~types"

export default function useInput<
  T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement
>(vocabWord: VocabularyWord, field: keyof VocabularyWord) {
  const [isEditing, setIsEditing] = useState(false)
  // Trạng thái lưu trữ nội dung đang nhập (ép kiểu về string để dùng cho input)
  const [word, setWord] = useState(String(vocabWord[field] ?? ""))

  const inputRef = useRef<T>(null)

  // Đồng bộ lại state nếu dữ liệu từ bên ngoài (như useLiveQuery của Dexie) thay đổi
  useEffect(() => {
    setWord(String(vocabWord[field] ?? ""))
  }, [vocabWord, field])

  // Tự động focus vào thẻ input khi chuyển sang chế độ sửa
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      const length = inputRef.current.value.length
      inputRef.current.setSelectionRange(length, length)
    }
  }, [isEditing])

  const saveToDb = async (newWord: string) => {
    const trimmedWord = newWord.trim()

    if (!trimmedWord && field === "word") {
      setWord(String(vocabWord[field] ?? ""))
      return
    }

    // Nếu text không đổi hoặc bị xóa trắng thì không làm gì cả
    if (trimmedWord === String(vocabWord[field] ?? "")) {
      setWord(String(vocabWord[field] ?? "")) // Trả lại chữ cũ nếu gõ khoảng trắng
      return
    }

    try {
      // Cập nhật trực tiếp trường [field] của bản ghi theo id trong IndexedDB (Dexie)
      await db.words.update(vocabWord.id, {
        [field]: trimmedWord || ""
      })

      console.log(`Đã cập nhật thành công thành: ${trimmedWord}`)
    } catch (error) {
      // Nếu vi phạm ràng buộc (&word unique constraint), Dexie sẽ quăng ConstraintError
      console.error("Lỗi khi cập nhật database (có thể từ đã tồn tại):", error)
      // Hoàn tác lại giá trị cũ trên UI nếu lưu thất bại
      setWord(String(vocabWord[field] ?? ""))
    }
  }

  // Hàm xử lý khi click ra ngoài (blur)
  const handleBlur = () => {
    if (isEditing) {
      setIsEditing(false)
      saveToDb(word)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<T>) => {
    if (e.key === "Enter") {
      setIsEditing(false)
      saveToDb(word)
    } else if (e.key === "Escape") {
      // Khi nhấn Escape: hủy chỉnh sửa và khôi phục lại giá trị ban đầu
      setIsEditing(false)
      setWord(String(vocabWord[field] ?? ""))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<T>) => setWord(e.target.value)

  const handleInputClick = () => setIsEditing(true)

  return {
    isEditing,
    word,
    inputRef,
    handleBlur,
    handleKeyDown,
    handleInputChange,
    handleInputClick
  }
}
