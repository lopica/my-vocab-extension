import { useEffect, useRef, useState } from "react"
import { Storage } from "@plasmohq/storage"
import type { VocabularyWord } from "~types"

const storage = new Storage()

export default function useInput(vocabWord: VocabularyWord, field: keyof VocabularyWord) {
    const [isEditing, setIsEditing] = useState(false)
      // Trạng thái lưu trữ nội dung đang nhập
      const [word, setWord] = useState(vocabWord[field])
    
      const inputRef = useRef(null)
    
      // Tự động focus vào thẻ input khi chuyển sang chế độ sửa
      useEffect(() => {
        if (isEditing && inputRef.current) {
          inputRef.current.focus()
        }
      }, [isEditing])
    
      const saveToStorage = async (newWord) => {
        const trimmedWord = newWord.trim()
        // Nếu text không đổi hoặc bị xóa trắng thì không làm gì cả
        if (trimmedWord === vocabWord[field] || !trimmedWord) {
          setWord(vocabWord[field]) // Trả lại chữ cũ nếu gõ khoảng trắng
          return
        }
    
        try {
          // 1. Lấy danh sách từ hiện tại
          const existingWords =
            (await storage.get<VocabularyWord[]>("vocab_list")) || []
    
          // 2. Tìm và cập nhật từ có id trùng khớp
          const updatedWords = existingWords.map((item) =>
            item.id === vocabWord.id ? { ...item, [field]: trimmedWord } : item
          )
    
          // 3. Lưu mảng mới trở lại storage
          await storage.set("vocab_list", updatedWords)
    
          console.log(`Đã cập nhật thành công thành: ${trimmedWord}`)
        } catch (error) {
          console.error("Lỗi khi cập nhật storage:", error)
          // Hoàn tác lại giá trị cũ trên UI nếu lưu thất bại
          setWord(vocabWord[field])
        }
      }
    
      // Hàm xử lý khi click ra ngoài (blur)
      const handleBlur = () => {
        setIsEditing(false)
        saveToStorage(word)
      }
    
      const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === "Escape") {
          setIsEditing(false);
          saveToStorage(word);
        }
      };

      const handleInputChange = (e) => setWord(e.target.value)

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