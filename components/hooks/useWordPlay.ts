import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import { SPEECH_RATE_KEY, VOICE_NAME_KEY } from "~constants"
import type { VocabularyCard } from "~types"

const storage = new Storage()

/**
 * hook tự tao đẻ xử lý việc phát giọng đọc từ hoặc cụm từ
 */
export default function useWordPlay() {
  const [isPlaying, setIsPlaying] = useState(false)

  const [voiceName] = useStorage<string>(VOICE_NAME_KEY, "")
  const [speechRate] = useStorage<number>(SPEECH_RATE_KEY, 1.0)

  useEffect(() => {
    // Chỉ cần gọi hàm này 1 lần khi mount để "đánh thức" (warm-up)
    // engine giọng đọc của Chrome. Không cần lưu vào state.
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices()
    }
  }, [])

  const playWord = async (vocabWord: VocabularyCard) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      console.warn("Trình duyệt không hỗ trợ phát âm.")
      return
    }

    window.speechSynthesis.cancel()

    const currentVoices = window.speechSynthesis.getVoices()

    const currentVoiceName = await storage.get("voice_name")
    const currentRate = await storage.get("speech_rate")

    const activeVoiceName = currentVoiceName || voiceName
    const activeRate =
      (typeof currentRate === "number" ? currentRate : speechRate) ?? 1.0

    const utterance = new SpeechSynthesisUtterance(vocabWord.wordOrPhrase)

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
