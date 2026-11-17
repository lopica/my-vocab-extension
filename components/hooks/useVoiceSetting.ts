import React, { useEffect, useMemo, useRef, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

export interface VoiceOption {
  voice: SpeechSynthesisVoice
  flag: string
  langLabel: string
  group: string
}

function getLangLabel(lang: string): string {
  try {
    return new Intl.DisplayNames(["vi"], { type: "language" }).of(lang) ?? lang
  } catch {
    return lang
  }
}

function getFlag(lang: string): string {
  const code = lang.split("-")[1]?.toUpperCase()
  if (!code || code.length !== 2) return "🌐"
  return String.fromCodePoint(
    ...code.split("").map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  )
}

const SAMPLE_TEXTS: Record<string, string> = {
  en: "The quick brown fox jumps over the lazy dog.",
  vi: "Học từ vựng mỗi ngày giúp bạn tiến bộ nhanh hơn.",
  fr: "Le renard brun rapide saute par-dessus le chien paresseux.",
  de: "Der schnelle braune Fuchs springt über den faulen Hund.",
  es: "El zorro marrón rápido salta sobre el perro perezoso.",
  it: "La volpe marrone veloce salta sopra il cane pigro.",
  pt: "A raposa marrom rápida pula sobre o cachorro preguiçoso.",
  ja: "素早い茶色のキツネが怠け者の犬を飛び越えます。",
  ko: "빠른 갈색 여우가 게으른 개를 뛰어 넘습니다.",
  zh: "敏捷的棕色狐狸跳过了懒惰的狗。",
  ru: "Быстрая коричневая лиса прыгает через ленивую собаку.",
  ar: "الثعلب البني السريع يقفز فوق الكلب الكسول.",
  hi: "तेज़ भूरी लोमड़ी आलसी कुत्ते के ऊपर से कूदती है।",
  nl: "De snelle bruine vos springt over de luie hond.",
  pl: "Szybki brązowy lis przeskakuje nad leniwym psem.",
  sv: "Den snabba bruna räven hoppar över den lata hunden.",
  tr: "Hızlı kahverengi tilki tembel köpeğin üzerinden atlar."
}

function getSampleText(lang: string): string {
  const base = lang.split("-")[0].toLowerCase()
  return SAMPLE_TEXTS[base] ?? SAMPLE_TEXTS["en"]
}

function getGroup(lang: string): string {
  const base = lang.split("-")[0].toLowerCase()
  if (base === "en") return "Tiếng Anh (Khuyên dùng)"
  if (base === "vi") return "Tiếng Việt"
  return "Đa ngôn ngữ"
}

export default function useVoiceSetting() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoiceName, setSelectedVoiceName] = useStorage<string>(
    "voice_name",
    ""
  )
  const [speechRate, setSpeechRate] = useStorage<number>("speech_rate", 1.0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Load voices từ Web Speech API
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

  // Đóng dropdown khi click ra ngoài
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

  // Câu mẫu theo ngôn ngữ đang chọn
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
