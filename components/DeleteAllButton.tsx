import { useState } from "react"
import type { VocabularyWord } from "~types"
import DeleteAllModal from "./DeleteAllModal"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "~db"

export default function DeleteAllButton() {
    const [isShowing, setIsShowing] = useState(false)
    const wordCount = useLiveQuery(() => db.words.count(), [], 0)

  function toggle() {
    setIsShowing(!isShowing)
  }

    return (
      <>
        <button
          className="w-10 h-10 flex items-center justify-center text-on-surface-variant rounded-xl transition-all hover:text-error hover:bg-error-container/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-on-surface-variant"
          onClick={toggle}
          disabled={wordCount === 0}>
          <span className="material-symbols-outlined text-[20px]">
            delete_outline
          </span>
        </button>
        <DeleteAllModal isShowing={isShowing} hide={toggle} />
      </>
    )
}