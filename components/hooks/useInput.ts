import { useEffect, useRef, useState } from "react"

import { db } from "~db"
import type { VocabularyCard } from "~types"

/**
 * Logic cập nhật dữ liệu trong thẻ từ vựng
 * @param vocabWord thẻ từ
 * @param field trường muốn cập nhật
 */
export default function useInput<
  T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement
>(vocabWord: VocabularyCard, field: keyof VocabularyCard) {
  const [isEditing, setIsEditing] = useState(false)
  const [word, setWord] = useState(String(vocabWord[field] ?? ""))

  const inputRef = useRef<T>(null)

  useEffect(() => {
    setWord(String(vocabWord[field] ?? ""))
  }, [vocabWord, field])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      const length = inputRef.current.value.length
      inputRef.current.setSelectionRange(length, length)
    }
  }, [isEditing])

  const saveToDb = async (newWord: string) => {
    const trimmedWord = newWord.trim()

    if (!trimmedWord && field === "wordOrPhrase") {
      setWord(String(vocabWord[field] ?? ""))
      return
    }

    if (trimmedWord === String(vocabWord[field] ?? "")) {
      setWord(String(vocabWord[field] ?? ""))
      return
    }

    try {
      await db.words.update(vocabWord.id, {
        [field]: trimmedWord || ""
      })

      console.log(`Đã cập nhật thành công thành: ${trimmedWord}`)
    } catch (error) {
      console.error("Lỗi khi cập nhật database (có thể từ đã tồn tại):", error)
      setWord(String(vocabWord[field] ?? ""))
    }
  }

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
