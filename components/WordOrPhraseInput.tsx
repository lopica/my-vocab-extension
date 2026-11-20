import type { VocabularyCard } from "~types"

import useInput from "./hooks/useInput"

/**
 * Phần hiển thị của từ hoặc cụm từ trong thẻ
 * @param vocabCard thẻ từ
 */
export default function WordOrPhraseInput({
  vocabCard
}: {
  vocabCard: VocabularyCard
}) {
  const {
    isEditing,
    inputRef,
    word,
    handleInputClick,
    handleBlur,
    handleInputChange,
    handleKeyDown
  } = useInput(vocabCard, "wordOrPhrase")

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={word}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        maxLength={24}
        className="editable-text -mx-1 cursor-text rounded border-b-2 border-primary bg-primary-fixed/20 px-1 font-headline-md text-headline-md font-semibold text-primary outline-none [field-sizing:content]"
      />
    )
  }

  return (
    <span
      onClick={handleInputClick}
      className="editable-text -mx-1 cursor-pointer px-1 font-headline-md text-headline-md font-semibold text-on-surface">
      {vocabCard.wordOrPhrase}
    </span>
  )
}
