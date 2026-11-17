import { useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import type { VocabularyWord } from "~types"

export default function useWordPlay() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [voiceName] = useStorage<string>("voice_name", "")
  const [speechRate] = useStorage<number>("speech_rate", 1.0)

  const playWord = (vocabWord: VocabularyWord) => {
    if (!("speechSynthesis" in window)) {
      console.warn("Trình duyệt không hỗ trợ phát âm.")
      return
    }

    // Dừng âm thanh cũ nếu người dùng bấm liên tục
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(vocabWord.word)

    // Áp dụng giọng đọc đã lưu (nếu có)
    const voices = window.speechSynthesis.getVoices()
    const savedVoice = voices.find((v) => v.name === voiceName)
    if (savedVoice) {
      utterance.voice = savedVoice
      utterance.lang = savedVoice.lang
    } else {
      utterance.lang = "en-US"
    }

    utterance.rate = speechRate ?? 1.0
    utterance.pitch = 1.0

    // Bật/tắt hiệu ứng sóng âm theo sự kiện đọc
    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => setIsPlaying(false)

    window.speechSynthesis.speak(utterance)
  }

  return { isPlaying, playWord }
}
