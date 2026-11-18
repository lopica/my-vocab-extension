import { useState } from "react" // 1. Import useState
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
  // 2. Thêm state quản lý trạng thái loading
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true) // Bắt đầu trạng thái loading
    try {
      await deleteAll()
      hide()
    } catch (error) {
      console.error("Lỗi khi xóa toàn bộ từ:", error)
    } finally {
      setIsDeleting(false) // Kết thúc trạng thái loading (phòng trường hợp lỗi không ẩn modal)
    }
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
                className="flex w-full items-center justify-center gap-space-xs rounded-xl bg-surface-container px-space-md py-3 font-label-md text-label-md text-on-surface shadow-sm transition-all duration-150 hover:bg-surface-container-high active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
                onClick={hide}
                type="button"
                disabled={isDeleting} // 3. Disable khi đang xóa
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
                <span>Hủy giữ lại</span>
              </button>
              {/* <!-- Destructive Confirm Button --> */}
              <button
                className="flex w-full items-center justify-center gap-space-xs rounded-xl bg-primary px-space-md py-3 font-label-md text-label-md text-on-primary shadow-md shadow-primary/20 transition-all duration-150 hover:bg-primary-container active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
                type="button"
                onClick={handleDelete}
                disabled={isDeleting} // 4. Disable khi đang xóa
              >
                {/* 5. Đổi icon và text dựa trên state */}
                <span
                  className={`material-symbols-outlined text-[18px] ${isDeleting ? "animate-spin" : ""}`}>
                  {isDeleting ? "progress_activity" : "delete"}
                </span>
                <span>{isDeleting ? "Đang xóa..." : "Xóa toàn bộ"}</span>
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
