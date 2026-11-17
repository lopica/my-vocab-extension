import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import type { VocabularyWord } from "~types"

// Khởi tạo instance Storage để đọc dữ liệu realtime
const storage = new Storage()

export default function useWordPlay() {
  const [isPlaying, setIsPlaying] = useState(false)

  // Vẫn giữ useStorage để component re-render nếu cần
  const [voiceName] = useStorage<string>("voice_name", "")
  const [speechRate] = useStorage<number>("speech_rate", 1.0)

  useEffect(() => {
    // Chỉ cần gọi hàm này 1 lần khi mount để "đánh thức" (warm-up)
    // engine giọng đọc của Chrome. Không cần lưu vào state.
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices()
    }
  }, [])

  // Đổi hàm playWord thành async để chờ lấy setting từ storage
  const playWord = async (vocabWord: VocabularyWord) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      console.warn("Trình duyệt không hỗ trợ phát âm.")
      return
    }

    window.speechSynthesis.cancel()

    // 1. Lấy danh sách voices MỚI NHẤT ngay tại thời điểm click
    const currentVoices = window.speechSynthesis.getVoices()

    // 2. Lấy setting trực tiếp từ database (để tránh lỗi delay của state)
    const currentVoiceName = await storage.get("voice_name")
    const currentRate = await storage.get("speech_rate")

    // Ưu tiên giá trị realtime, nếu undefined thì fallback về state
    const activeVoiceName = currentVoiceName || voiceName
    const activeRate =
      (typeof currentRate === "number" ? currentRate : speechRate) ?? 1.0

    const utterance = new SpeechSynthesisUtterance(vocabWord.word)

    // Tìm giọng đọc trong danh sách realtime
    const savedVoice = currentVoices.find((v) => v.name === activeVoiceName)

    if (savedVoice) {
      utterance.voice = savedVoice
      utterance.lang = savedVoice.lang
    } else {
      utterance.lang = "en-US"
    }

    utterance.rate = activeRate
    utterance.pitch = 1.0

    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => setIsPlaying(false)

    window.speechSynthesis.speak(utterance)
  }

  return { isPlaying, playWord }
}
