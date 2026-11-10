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
        className="[field-sizing:content] editable-text outline-none font-body-md text-body-md text-on-surface cursor-text p-1.5 -mx-1.5 rounded-lg bg-surface-container-lowest/80 border border-primary/30 shadow-inner leading-relaxed focus:ring-1 focus:ring-primary"
      />
    )
  }

  return (
    <p
      onClick={handleInputClick}
      className="editable-text font-body-md text-body-md text-on-surface/90 mt-2 px-1 -mx-1 cursor-pointer leading-relaxed"
        title="Click to edit meaning directly">
      {vocabWord.meaning ?? DEFAULT_MEANING}
    </p>
  )
}
