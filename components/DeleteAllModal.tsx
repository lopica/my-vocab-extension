import ReactDOM from "react-dom"

import { db } from "~db"
import { deleteAll } from "~utils"

export default function DeleteAllModal({
  isShowing,
  hide
}: {
  isShowing: boolean
  hide: () => void
}) {
  const handleDelete = async () => {
    await deleteAll()
    hide()
  }

  return isShowing
    ? ReactDOM.createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d1b14]/50 p-margin backdrop-blur-md transition-opacity duration-300"
          id="delete-modal-overlay">
          {/* <!-- Modal Dialog Window --> */}
          <div className="animate-in fade-in zoom-in-95 relative flex w-full max-w-[390px] flex-col items-center overflow-hidden rounded-3xl bg-surface-container-lowest/95 p-space-lg text-center shadow-2xl backdrop-blur-2xl duration-200">
            {/* <!-- Top Subtle Warm Glow Accent --> */}
            <div className="bg-primary-fixed-dim/35 pointer-events-none absolute -top-12 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full blur-2xl"></div>
            {/* <!-- Modal Badge Icon --> */}
            <div className="relative mb-space-md mt-space-xs flex h-16 w-16 items-center justify-center rounded-2xl bg-error-container/60 text-error shadow-inner">
              <div className="absolute inset-0 animate-ping rounded-2xl bg-error/10 opacity-30"></div>
              <span className="material-symbols-outlined text-[32px]">
                delete_forever
              </span>
            </div>
            {/* <!-- Header & Headline --> */}
            <h2 className="font-headline-md text-headline-md tracking-tight text-on-surface">
              Xóa khỏi Giỏ Từ?
            </h2>
            <p className="mt-1.5 px-space-xs pb-5 font-body-md text-body-md leading-snug text-on-surface-variant">
              Toàn bộ từ sẽ bị gỡ vĩnh viễn khỏi danh sách lưu trữ của bạn. Thao
              tác này không thể hoàn tác.
            </p>

            {/* <!-- Action Buttons Row --> */}
            <div className="flex w-full flex-col-reverse gap-space-xs sm:flex-row sm:gap-space-sm">
              {/* <!-- Cancel Button --> */}
              <button
                className="flex w-full items-center justify-center gap-space-xs rounded-xl bg-surface-container px-space-md py-3 font-label-md text-label-md text-on-surface shadow-sm transition-all duration-150 hover:bg-surface-container-high active:scale-[0.98]"
                onClick={hide}
                type="button">
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
                <span>Hủy giữ lại</span>
              </button>
              {/* <!-- Destructive Confirm Button --> */}
              <button
                className="flex w-full items-center justify-center gap-space-xs rounded-xl bg-primary px-space-md py-3 font-label-md text-label-md text-on-primary shadow-md shadow-primary/20 transition-all duration-150 hover:bg-primary-container active:scale-[0.98]"
                type="button"
                onClick={handleDelete}>
                <span className="material-symbols-outlined text-[18px]">
                  delete
                </span>
                <span>Xóa toàn bộ</span>
              </button>
            </div>
            {/* <!-- Tiny Helper Footnote --> */}
            <div className="mt-space-md flex items-center gap-1 font-label-sm text-label-sm text-outline">
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
