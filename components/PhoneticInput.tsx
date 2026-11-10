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
        className="editable-text -mx-1 cursor-text rounded border-b-2 border-primary bg-primary-fixed/20 px-1 font-phonetic-display text-phonetic-display italic text-on-surface-variant/80 outline-none [field-sizing:content]"
      />
    )
  }

  return (
    <span
      onClick={handleInputClick}
      className="editable-text -mx-1 cursor-pointer px-1 font-phonetic-display text-phonetic-display italic text-on-surface-variant/80">
      {vocabWord.phonetic ?? DEFAULT_PHONETICS}
    </span>
  )
}
