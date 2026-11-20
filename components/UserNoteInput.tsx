import type { VocabularyCard } from "~types"

import useInput from "./hooks/useInput"

const DEFAULT_MEANING = "Nhấp để thêm nghĩa hoặc ghi chú của bạn..."

/**
 * Phần hiển thị ghi chú của người dùng
 * @param vocabCard thẻ từ
 */
export default function UserNoteInput({
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
  } = useInput<HTMLTextAreaElement>(vocabCard, "userNote")

  if (isEditing) {
    return (
      <textarea
        ref={inputRef}
        value={word}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={DEFAULT_MEANING}
        maxLength={200}
        rows={1}
        className="editable-text -mx-1.5 mt-1 w-full cursor-text resize-none overflow-hidden rounded-lg border border-primary/30 bg-surface-container-lowest/80 p-1.5 font-body-md text-body-md leading-relaxed text-on-surface shadow-inner outline-none [field-sizing:content] focus:ring-1 focus:ring-primary"
      />
    )
  }

  return (
    <p
      onClick={handleInputClick}
      className={`editable-text -mx-1 mt-2 w-full cursor-pointer whitespace-pre-wrap break-words px-1 font-body-md text-body-md leading-relaxed ${
        vocabCard.userNote ? "text-on-surface/90" : "italic text-on-surface/50"
      }`}
      title="Click to edit meaning directly">
      {vocabCard.userNote || DEFAULT_MEANING}
    </p>
  )
}
