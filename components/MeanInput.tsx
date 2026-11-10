import type { VocabularyWord } from "~types"

import useInput from "./hooks/useInput"

const DEFAULT_MEANING = "Nhấp để thêm nghĩa hoặc ghi chú của bạn..."

export default function MeanInput({
  vocabWord
}: {
  vocabWord: VocabularyWord
}) {
  const {
    isEditing,
    inputRef,
    word,
    handleInputClick,
    handleBlur,
    handleInputChange,
    handleKeyDown
  } = useInput(vocabWord, "meaning")

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={word}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={DEFAULT_MEANING}
        className="editable-text -mx-1.5 cursor-text rounded-lg border border-primary/30 bg-surface-container-lowest/80 p-1.5 font-body-md text-body-md leading-relaxed text-on-surface shadow-inner outline-none [field-sizing:content] focus:ring-1 focus:ring-primary"
      />
    )
  }

  return (
    <p
      onClick={handleInputClick}
      className="editable-text -mx-1 mt-2 cursor-pointer px-1 font-body-md text-body-md leading-relaxed text-on-surface/90"
      title="Click to edit meaning directly">
      {vocabWord.meaning ?? DEFAULT_MEANING}
    </p>
  )
}
