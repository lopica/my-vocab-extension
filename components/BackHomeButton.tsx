import { useContext } from "react"

import { RouteContext } from "./contexts/RouteContext"

export default function BackHomeButton() {
  const context = useContext(RouteContext)
  const setRoute = context?.setRoute
  return (
    <div className="flex items-center justify-between pt-space-xs">
      <div className="flex items-center gap-space-sm">
        <button
          aria-label="Quay lại"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container/70 text-on-surface-variant shadow-sm transition-all duration-200 hover:bg-primary-fixed/50 hover:text-primary active:scale-95"
          onClick={() => setRoute("home")}>
          <span className="material-symbols-outlined text-[20px]">
            arrow_back
          </span>
        </button>
        <div className="flex flex-col">
          <h1 className="font-headline-sm text-headline-sm font-semibold tracking-tight text-on-surface">
            Cài đặt
          </h1>
          <span className="font-label-sm text-label-sm text-on-surface-variant/80">
            Tùy chỉnh tiện ích đọc sách
          </span>
        </div>
      </div>
      {/* <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 shadow-sm">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"></span>
        <span className="font-label-sm text-label-sm font-medium text-primary">
        Đã đồng bộ
        </span>
        </div> */}
    </div>
  )
}
