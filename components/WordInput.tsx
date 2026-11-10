import type { VocabularyWord } from "~types"

import useInput from "./hooks/useInput"

export default function WordInput({
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
  } = useInput(vocabWord, "word")

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={word}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="editable-text -mx-1 cursor-text rounded border-b-2 border-primary bg-primary-fixed/20 px-1 font-headline-md text-headline-md font-semibold text-primary outline-none [field-sizing:content]"
      />
    )
  }

  return (
    <span
      onClick={handleInputClick}
      className="editable-text -mx-1 cursor-pointer px-1 font-headline-md text-headline-md font-semibold text-on-surface">
      {vocabWord.word}
    </span>
  )
}
