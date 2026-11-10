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
        className="[field-sizing:content] editable-text outline-none font-headline-md text-headline-md text-primary font-semibold cursor-text px-1 -mx-1 bg-primary-fixed/20 rounded border-b-2 border-primary"
      />
    )
  }

  return (
    <span
      onClick={handleInputClick}
      className="editable-text font-headline-md text-headline-md text-on-surface font-semibold cursor-pointer px-1 -mx-1">
      {vocabWord.word}
    </span>
  )
}
