import { useLiveQuery } from "dexie-react-hooks"
import { useState } from "react"

import { db } from "~db"
import { seedMillionWords } from "~utils"

/**
 * Tạm thời chứa logic mock data
 */
export default function useHeader() {
  const wordCount = useLiveQuery(() => db.words.count(), [], 0)
  const [seedingText, setSeedingText] = useState("")

  const handleSeed = async () => {
    if (seedingText) return
    await seedMillionWords(1_000_000, (inserted, total) => {
      setSeedingText(`${Math.round((inserted / total) * 100)}%`)
    })
    setSeedingText("")
  }

  return {
    wordCount,
    handleSeed,
    seedingText
  }
}
