export const ONE_SECOND = 1000
export const ONE_MINUTE = 60 * ONE_SECOND
export const ONE_HOUR = 60 * ONE_MINUTE
export const ONE_DAY = 24 * ONE_HOUR
export const ONE_MONTH = 30 * ONE_DAY
export const ONE_YEAR = 365 * ONE_DAY

export const SAMPLE_WORDS = [
  "serendipity",
  "ephemeral",
  "ubiquitous",
  "mellifluous",
  "ineffable",
  "labyrinth",
  "eloquent",
  "resilience",
  "paradigm",
  "pragmatic",
  "solitude",
  "ethereal",
  "luminescence",
  "nostalgia",
  "euphoria"
]

export const SAMPLE_DOMAINS = [
  "gemini.google.com",
  "github.com",
  "stackoverflow.com",
  "medium.com",
  "dev.to",
  "wikipedia.org",
  "nytimes.com"
]

export const SAMPLE_MEANINGS = [
  "Sự tình cờ may mắn phát hiện ra điều thú vị.",
  "Phù du, ngắn ngủi, chỉ tồn tại trong chốc lát.",
  "Có mặt ở khắp mọi nơi cùng một lúc.",
  "Ngọt ngào, êm dịu, du dương (âm thanh, giọng nói).",
  "Không thể diễn tả được bằng lời vì quá tuyệt vời."
]

export const SAMPLE_TEXTS: Record<string, string> = {
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

/**
 * id cho option của extension
 */
export const MENU_OPTION_ID = "add-word-action"
/**
 * key để lưu giá trị search trên đám mây gắn với tài khoản google, fallback về local nếu ko có mạng
 */
export const SEARCH_KEY = "search_query"
/**
 * key để lưu giá trị cài đặt tự động mở trên đám mây gắn với tài khoản google, fallback về local nếu ko có mạng
 */
export const AUTO_OPEN_SETTING_KEY = "autoOpenExtension"
export const VOICE_NAME_KEY = "voice_name"
export const SPEECH_RATE_KEY = "speech_rate"
