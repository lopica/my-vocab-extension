import type { VocabularyWord } from "~types"
import useInput from "./hooks/useInput"

const DEFAULT_PHONETICS = "/...thêm phiên âm.../"

export default function PhoneticInput({
  vocabWord
}: {
  vocabWord: VocabularyWord
}) {
  const {
      isEditing,
      inputRef,
      word: phonetic,
      handleInputClick,
      handleBlur,
      handleInputChange,
      handleKeyDown
    } = useInput(vocabWord, "phonetic")

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={phonetic}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={DEFAULT_PHONETICS}
        className="[field-sizing:content] editable-text outline-none font-phonetic-display text-phonetic-display text-on-surface-variant/80 italic cursor-text px-1 -mx-1 bg-primary-fixed/20 rounded border-b-2 border-primary"
      />
    )
  }

  return (
    <span
      onClick={handleInputClick}
      className="editable-text font-phonetic-display text-phonetic-display text-on-surface-variant/80 italic cursor-pointer px-1 -mx-1">
      {vocabWord.phonetic ?? DEFAULT_PHONETICS}
    </span>
  )
}
