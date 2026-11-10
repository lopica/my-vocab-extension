import ReactDOM from "react-dom"

import type { VocabularyWord } from "~types"
import getCreateTimeDisplay from "~utils"
import { db } from "~db"


export default function DeleteCardModal({
  vocabWord,
  isShowing,
  hide
}: {
  vocabWord: VocabularyWord
  isShowing: boolean
  hide: () => void
}) {
  const handleDelete = async () => {
    try {
      // Xóa trực tiếp bản ghi theo khóa chính (id) trong IndexedDB
      await db.words.delete(vocabWord.id)

      console.log(`Đã xóa thành công từ: ${vocabWord.word}`)
      hide()
    } catch (error) {
      console.error("Lỗi khi xóa từ trong IndexedDB:", error)
    }
  }

  return isShowing
    ? ReactDOM.createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-margin bg-[#2d1b14]/50 backdrop-blur-md transition-opacity duration-300"
          id="delete-modal-overlay">
          {/* <!-- Modal Dialog Window --> */}
          <div className="w-full max-w-[390px] bg-surface-container-lowest/95 backdrop-blur-2xl rounded-3xl p-space-lg shadow-2xl relative flex flex-col items-center text-center overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* <!-- Top Subtle Warm Glow Accent --> */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-44 h-44 bg-primary-fixed-dim/35 rounded-full blur-2xl pointer-events-none"></div>
            {/* <!-- Modal Badge Icon --> */}
            <div className="relative w-16 h-16 rounded-2xl bg-error-container/60 text-error flex items-center justify-center shadow-inner mb-space-md mt-space-xs">
              <div className="absolute inset-0 rounded-2xl bg-error/10 animate-ping opacity-30"></div>
              <span className="material-symbols-outlined text-[32px]">
                delete_forever
              </span>
            </div>
            {/* <!-- Header & Headline --> */}
            <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
              Xóa khỏi Giỏ Từ?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1.5 px-space-xs leading-snug">
              Từ này sẽ bị gỡ vĩnh viễn khỏi danh sách lưu trữ của bạn. Thao tác
              này không thể hoàn tác.
            </p>
            {/* <!-- Target Word Detail Card --> */}
            <div className="w-full bg-surface-container-low/90 rounded-2xl p-space-md mt-space-md mb-space-lg text-left shadow-sm flex flex-col gap-space-xs relative overflow-hidden">
              {/* <!-- Terracotta Accent Indicator --> */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              <div className="flex items-center justify-between pl-2">
                <div className="flex items-baseline gap-space-xs">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    {vocabWord.word}
                  </span>
                  <span className="font-phonetic-display text-phonetic-display text-on-surface-variant italic">
                    {vocabWord.phonetic}
                  </span>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant pl-2 line-clamp-2">
                {vocabWord.meaning}
              </p>
              {/* <!-- Source & Date Metadata --> */}
              <div className="flex items-center gap-space-xs pt-1.5 pl-2 mt-0.5 text-outline font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px]">
                  link
                </span>
                <span className="truncate">{vocabWord.sourceDomain}</span>
                <span className="text-outline-variant">•</span>
                <span>{getCreateTimeDisplay(vocabWord.createdAt)}</span>
              </div>
            </div>
            {/* <!-- Action Buttons Row --> */}
            <div className="w-full flex flex-col-reverse gap-space-xs sm:flex-row sm:gap-space-sm">
              {/* <!-- Cancel Button --> */}
              <button
                className="w-full py-3 px-space-md rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-space-xs shadow-sm"
                onClick={hide}
                type="button">
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
                <span>Hủy giữ lại</span>
              </button>
              {/* <!-- Destructive Confirm Button --> */}
              <button
                className="w-full py-3 px-space-md rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-space-xs shadow-md shadow-primary/20"
                type="button"
                onClick={handleDelete}>
                <span className="material-symbols-outlined text-[18px]">
                  delete
                </span>
                <span>Xóa từ này</span>
              </button>
            </div>
            {/* <!-- Tiny Helper Footnote --> */}
            <div className="mt-space-md flex items-center gap-1 text-outline font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px]">
                lightbulb
              </span>
              <span>
                Mẹo: Bạn vẫn có thể quét bôi đen lại từ trên web bất cứ lúc nào.
              </span>
            </div>
          </div>
        </div>,
        document.body
      )
    : null
}
