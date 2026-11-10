import { useState } from "react"

import type { VocabularyWord } from "~types"

export default function useWordPlay() {
  const [isPlaying, setIsPlaying] = useState(false)

  const playWord = (vocabWord: VocabularyWord) => {
    if (!("speechSynthesis" in window)) {
      console.warn("Trình duyệt không hỗ trợ phát âm.")
      return
    }

    // Dừng âm thanh cũ nếu người dùng bấm liên tục
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(vocabWord.word)
    utterance.lang = "en-US" // Đặt ngôn ngữ tiếng Anh (hoặc "en-GB")
    utterance.rate = 0.85 // Tốc độ đọc chậm lại một chút cho rõ chữ
    utterance.pitch = 1.0

    // Bật/tắt hiệu ứng sóng âm theo sự kiện đọc
    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => setIsPlaying(false)

    window.speechSynthesis.speak(utterance)
  }

  return { isPlaying, playWord }
}
