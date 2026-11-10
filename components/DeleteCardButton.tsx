import { useState } from "react"

import type { VocabularyWord } from "~types"

import DeleteCardModal from "./DeleteCardModal"

export default function DeleteCardButton({
  vocabWord
}: {
  vocabWord?: VocabularyWord
}) {
  const [isShowing, setIsShowing] = useState(false)

  function toggle() {
    setIsShowing(!isShowing)
  }

  return (
    <>
      <button
        className="delete-word-btn w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant/70 hover:text-error hover:bg-error-container/40 transition-colors"
        onClick={toggle}>
        <span className="material-symbols-outlined text-[17px]">close</span>
      </button>
      <DeleteCardModal
        vocabWord={vocabWord}
        isShowing={isShowing}
        hide={toggle}
      />
    </>
  )
}
