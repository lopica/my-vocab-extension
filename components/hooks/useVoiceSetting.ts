import React, { useEffect, useMemo, useRef, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { SPEECH_RATE_KEY, VOICE_NAME_KEY } from "~constants"
import type { VoiceOption } from "~types"
import { getFlag, getGroup, getLangLabel, getSampleText } from "~utils"

/**
 * hook tự tạo xử lý logic cài đặt voice (cần tách ra)
 */
export default function useVoiceSetting() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoiceName, setSelectedVoiceName] = useStorage<string>(
    VOICE_NAME_KEY,
    ""
  )
  const [speechRate, setSpeechRate] = useStorage<number>(SPEECH_RATE_KEY, 1.0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function loadVoices() {
      const list = window.speechSynthesis.getVoices()
      if (list.length > 0) setVoices(list)
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices

    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Chuyển đổi danh sách voices sang VoiceOption
  const voiceOptions: VoiceOption[] = useMemo(() => {
    return voices.map((v) => ({
      voice: v,
      flag: getFlag(v.lang),
      langLabel: getLangLabel(v.lang),
      group: getGroup(v.lang)
    }))
  }, [voices])

  // Filter theo search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return voiceOptions
    const q = searchQuery.toLowerCase()
    return voiceOptions.filter(
      (o) =>
        o.voice.name.toLowerCase().includes(q) ||
        o.voice.lang.toLowerCase().includes(q) ||
        o.langLabel.toLowerCase().includes(q)
    )
  }, [voiceOptions, searchQuery])

  // Voice đang chọn — phải khai báo TRƯỚC groupedOptions vì groupedOptions phụ thuộc vào selectedOption
  const selectedVoice = useMemo(() => {
    return voices.find((v) => v.name === selectedVoiceName) ?? voices[0]
  }, [voices, selectedVoiceName])

  const selectedOption: VoiceOption | undefined = useMemo(() => {
    if (!selectedVoice) return undefined
    return {
      voice: selectedVoice,
      flag: getFlag(selectedVoice.lang),
      langLabel: getLangLabel(selectedVoice.lang),
      group: getGroup(selectedVoice.lang)
    }
  }, [selectedVoice])

  // Group các options
  const groupedOptions = useMemo(() => {
    const groups: Record<string, VoiceOption[]> = {}
    for (const opt of filteredOptions) {
      if (!groups[opt.group]) groups[opt.group] = []
      groups[opt.group].push(opt)
    }
    // Sắp xếp: Tiếng Anh đầu tiên, Tiếng Việt thứ hai, còn lại theo thứ tự
    const order = ["Tiếng Anh (Khuyên dùng)", "Tiếng Việt", "Đa ngôn ngữ"]
    return order
      .filter((g) => groups[g])
      .map((g) => ({ group: g, options: groups[g] }))
  }, [filteredOptions])

  function selectVoice(voice: SpeechSynthesisVoice) {
    setSelectedVoiceName(voice.name)
    setIsDropdownOpen(false)
    setSearchQuery("")
  }

  function handleRateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSpeechRate(parseFloat(e.target.value))
  }

  function previewSpeech() {
    if (!("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()

    const lang = selectedVoice?.lang ?? "en-US"
    const text = getSampleText(lang)
    const utterance = new SpeechSynthesisUtterance(text)
    if (selectedVoice) utterance.voice = selectedVoice
    utterance.lang = lang
    utterance.rate = speechRate ?? 1.0

    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => setIsPlaying(false)

    window.speechSynthesis.speak(utterance)
  }

  /**
   * Câu mẫu theo ngôn ngữ đang chọn
   */
  const sampleText = getSampleText(selectedVoice?.lang ?? "en-US")

  return {
    voices,
    voiceOptions,
    groupedOptions,
    selectedOption,
    selectedVoice,
    speechRate: speechRate ?? 1.0,
    isDropdownOpen,
    setIsDropdownOpen,
    searchQuery,
    setSearchQuery,
    isPlaying,
    sampleText,
    selectVoice,
    handleRateChange,
    previewSpeech,
    dropdownRef
  }
}
