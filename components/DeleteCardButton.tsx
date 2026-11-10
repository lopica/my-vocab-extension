import type { VocabularyWord } from "~types"

import DeleteCardModal from "./DeleteCardModal"
import useToggle from "./hooks/useToggle"

export default function DeleteCardButton({
  vocabWord
}: {
  vocabWord?: VocabularyWord
}) {
  const { isShowing, toggle } = useToggle()

  return (
    <>
      <button
        className="delete-word-btn flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant/70 transition-colors hover:bg-error-container/40 hover:text-error"
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
