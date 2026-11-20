import { useContext, useEffect, useState } from "react"
import ReactDOM from "react-dom"

import type { Route } from "~types"

import { RouteContext } from "./contexts/RouteContext"

/**
 * Phần hiển thị khi bấm avatar
 */
export default function AvatarPopup({
  isShowing,
  hide
}: {
  isShowing: boolean
  hide: () => void
}) {
  const [targetNode, setTargetNode] = useState<HTMLElement | null>(null)
  const context = useContext(RouteContext)
  const setRoute = context?.setRoute

  const handleRoute = (route: Route) => {
    setRoute(route)
    hide()
  }

  useEffect(() => {
    setTargetNode(document.getElementById("main-portal-target"))
  }, [])

  if (!targetNode) return null

  return isShowing
    ? ReactDOM.createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d1b14]/50 p-margin backdrop-blur-md transition-opacity duration-300"
          id="delete-modal-overlay"
          onClick={hide}>
          <div
            className="fixed right-margin top-14 z-50 w-[290px] max-w-[calc(100vw-2rem)] translate-y-0 transform opacity-100 transition-all duration-200 ease-out"
            id="user-popover-menu"
            onClick={(e) => e.stopPropagation()}>
            <div className="pointer-events-none flex w-full justify-end pr-4">
              <div className="-mb-2 h-3.5 w-3.5 rotate-45 rounded-sm bg-surface-container-lowest shadow-sm"></div>
            </div>
            <div className="relative flex flex-col gap-space-sm overflow-hidden rounded-2xl bg-surface-container-lowest/95 p-space-md shadow-xl backdrop-blur-2xl">
              {/* <div className="relative flex flex-col gap-space-xs overflow-hidden rounded-xl bg-gradient-to-b from-primary-fixed/40 to-primary-fixed/15 p-space-md text-center">
                <div className="mb-0.5 flex items-center justify-center gap-space-xs">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-[17px]">
                      account_circle
                    </span>
                  </div>
                  <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                    Tài khoản
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Đồng bộ từ vựng &amp; sao lưu đám mây liên tục
                </p>
                <button className="mt-1 flex w-full items-center justify-center gap-space-xs rounded-xl bg-primary px-3 py-2 font-label-md text-label-md text-on-primary shadow-sm transition-all hover:bg-primary-container active:scale-[0.98]">
                  <span className="material-symbols-outlined text-[18px]">
                    login
                  </span>
                  <span>Đăng nhập / Đăng ký</span>
                </button>
              </div> */}
              <div className="flex flex-col gap-0.5 pt-1">
                {/* <button className="group flex w-full items-center justify-between rounded-xl p-2 text-left transition-colors hover:bg-surface-container-high/60">
                  <div className="flex min-w-0 items-center gap-space-sm">
                    <div className="bg-secondary-fixed/40 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-secondary">
                      <span className="material-symbols-outlined text-[18px]">
                        cloud_sync
                      </span>
                    </div>
                    <span className="truncate font-label-md text-label-md font-medium text-on-surface">
                      Đồng bộ Google Drive
                    </span>
                  </div>
                  <span className="scale-90 whitespace-nowrap rounded-full bg-surface-container-highest px-1.5 py-0.5 font-label-sm text-label-sm text-on-surface-variant">
                    Khóa
                  </span>
                </button> */}
                <button
                  className="flex w-full items-center gap-space-sm rounded-xl p-2 text-left transition-colors hover:bg-surface-container-high/60"
                  onClick={() => handleRoute("setting")}>
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-surface-container text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">
                      tune
                    </span>
                  </div>
                  <span className="font-label-md text-label-md font-medium text-on-surface">
                    Hồ sơ &amp; Cài đặt
                  </span>
                </button>
                {/* <button className="group flex w-full items-center gap-space-sm rounded-xl p-2 text-left transition-colors hover:bg-surface-container-high/60">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-surface-container text-on-surface-variant group-hover:text-primary">
                    <span className="material-symbols-outlined text-[18px]">
                      file_download
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate font-label-md text-label-md font-medium text-on-surface">
                      Xuất dữ liệu
                    </span>
                    <span className="font-body-sm text-body-sm text-outline">
                      .csv, Anki deck
                    </span>
                  </div>
                </button>
                <button className="flex w-full items-center justify-between rounded-xl p-2 text-left transition-colors hover:bg-surface-container-high/60">
                  <div className="flex items-center gap-space-sm">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-surface-container text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">
                        keyboard
                      </span>
                    </div>
                    <span className="font-label-md text-label-md font-medium text-on-surface">
                      Phím tắt tiện ích
                    </span>
                  </div>
                  <kbd className="rounded bg-surface-container px-1.5 py-0.5 font-label-sm text-label-sm text-outline">
                    Alt+S
                  </kbd>
                </button>
                <div className="mx-1 my-1 h-px bg-surface-container-highest"></div>
                <a
                  className="flex w-full items-center gap-space-sm rounded-xl p-2 text-left transition-colors hover:bg-surface-container-high/60"
                  href="#">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-surface-container text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">
                      chat_bubble_outline
                    </span>
                  </div>
                  <span className="font-label-md text-label-md font-medium text-on-surface">
                    Góp ý &amp; Báo lỗi
                  </span>
                </a> */}
              </div>
              <div className="flex items-center justify-between px-2 pt-1 text-outline">
                {/* <span className="flex items-center gap-1 font-body-sm text-body-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary"></span>
                  Giỏ Từ Companion
                </span> */}
                {/* <span className="font-label-sm text-label-sm font-semibold tracking-wider">
                  v1.2.0
                </span> */}
              </div>
            </div>
          </div>
        </div>,
        targetNode
      )
    : null
}
